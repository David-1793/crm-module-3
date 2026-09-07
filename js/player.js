(() => {
  const STORAGE = "crm-mod3-state";
  const screens = COURSE.screens;
  const audioEl = document.getElementById("narration");
  const stage = document.getElementById("stage");
  const menuEl = document.getElementById("menu");
  const transcriptEl = document.getElementById("transcript-body");
  const backdrop = document.getElementById("backdrop");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const screenLabel = document.getElementById("screen-label");
  const btnPlay = document.getElementById("btn-play");
  const btnReplay = document.getElementById("btn-replay");
  const btnMute = document.getElementById("btn-mute");
  const btnSpeed = document.getElementById("btn-speed");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const lockNote = document.getElementById("lock-note");
  const audioStatus = document.getElementById("audio-status");

  let index = 0;
  let unlocked = false;
  let speeds = [1, 1.25, 1.5];
  let speedIdx = 0;
  let explored = {};
  let quiz = { i: 0, answers: [], submitted: [] };
  let bestScore = 0;
  let completed = false;
  let usingFallback = false;
  let fallbackPaused = false;

  const statePayload = () => ({
    index,
    explored,
    bestScore,
    completed,
    updated: Date.now()
  });

  const applyState = (data) => {
    if (!data) return;
    index = Math.min(data.index || 0, screens.length - 1);
    explored = data.explored || {};
    bestScore = data.bestScore || 0;
    completed = Boolean(data.completed);
  };

  const scormSetProgress = () => {
    const api = window.SCORM12;
    if (!api || !api.active) return;
    api.set("cmi.core.lesson_location", String(index));
    api.set("cmi.suspend_data", JSON.stringify(statePayload()));
    api.set("cmi.core.score.min", "0");
    api.set("cmi.core.score.max", "100");
    api.set("cmi.core.score.raw", String(bestScore));
    if (completed) {
      api.set("cmi.core.lesson_status", bestScore >= COURSE.passMark ? "passed" : "failed");
    } else {
      const status = api.get("cmi.core.lesson_status");
      if (!status || status === "not attempted") {
        api.set("cmi.core.lesson_status", "incomplete");
      }
    }
    api.commit();
  };

  const load = () => {
    const api = window.SCORM12;
    if (api && api.init()) {
      const suspend = api.get("cmi.suspend_data");
      if (suspend) {
        try {
          applyState(JSON.parse(suspend));
        } catch (_) {}
      } else {
        const loc = parseInt(api.get("cmi.core.lesson_location"), 10);
        if (!Number.isNaN(loc)) index = Math.min(loc, screens.length - 1);
      }
      scormSetProgress();
      return;
    }
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return;
      applyState(JSON.parse(raw));
    } catch (_) {}
  };

  const save = () => {
    localStorage.setItem(STORAGE, JSON.stringify(statePayload()));
    scormSetProgress();
  };

  const screen = () => screens[index];
  const exploredSet = (id) => new Set(explored[id] || []);

  const mark = (id, key) => {
    const set = exploredSet(id);
    set.add(String(key));
    explored[id] = [...set];
    save();
    updateNav();
  };

  const requirementMet = (s) => {
    if (!s.require) return true;
    const count = exploredSet(s.id).size;
    if (s.require === "all") {
      const total =
        (s.items && s.items.length) ||
        (s.nodes && s.nodes.length) ||
        (s.questions && s.questions.length) ||
        (s.good && s.good.length + s.bad.length) ||
        0;
      return count >= total;
    }
    return count >= s.require;
  };

  const playCurrentNarration = () => {
    const s = screen();
    const start = () => {
      const playPromise = audioEl.play();
      if (playPromise) playPromise.catch(() => speakFallback(s.narration));
    };
    if (audioEl.readyState >= 2) start();
    else audioEl.addEventListener("canplay", start, { once: true });
  };

  const unlockAudio = () => {
    if (unlocked) return false;
    unlocked = true;
    playCurrentNarration();
    return true;
  };

  const speakFallback = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    usingFallback = true;
    fallbackPaused = false;
    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /en-GB/i.test(v.lang) && /male|daniel|george|ryan/i.test(v.name)) ||
      voices.find((v) => /en-GB/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang));
    if (preferred) utter.voice = preferred;
    utter.rate = speeds[speedIdx] * 0.96;
    utter.onend = () => {
      fallbackPaused = true;
      updatePlayLabel();
    };
    window.speechSynthesis.speak(utter);
    audioStatus.textContent = "Browser voice — generate Leo MP3s when xAI credits are available";
    updatePlayLabel();
  };

  const setAudio = (s) => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    usingFallback = false;
    fallbackPaused = false;
    const src = `audio/${s.id}.mp3`;
    audioEl.pause();
    audioEl.src = src;
    audioEl.load();
    audioStatus.textContent = "Leo narration";
    if (unlocked) playCurrentNarration();
    updatePlayLabel();
  };

  const updatePlayLabel = () => {
    const paused = usingFallback ? fallbackPaused || !window.speechSynthesis.speaking : audioEl.paused;
    btnPlay.textContent = paused ? "▶" : "❚❚";
    btnPlay.title = paused ? "Play narration" : "Pause narration";
  };

  const renderMenu = () => {
    menuEl.innerHTML = `<div class="brand" style="color:var(--ink);margin-bottom:12px"><div><h1>Course menu</h1><p>Jump to a visited screen</p></div></div>`;
    screens.forEach((s, i) => {
      const b = document.createElement("button");
      b.className = "item" + (i === index ? " current" : "");
      b.textContent = `${String(i + 1).padStart(2, "0")}  ${s.menu}`;
      b.addEventListener("click", () => {
        go(i);
        closePanels();
      });
      menuEl.appendChild(b);
    });
  };

  const updateNav = () => {
    const s = screen();
    const total = screens.length;
    progressBar.style.width = `${((index + 1) / total) * 100}%`;
    progressText.textContent = `${index + 1} of ${total}`;
    screenLabel.textContent = s.menu;
    btnPrev.disabled = index === 0;
    const locked = !requirementMet(s) && s.type !== "complete" && s.type !== "quiz";
    btnNext.disabled = locked;
    lockNote.textContent = locked
      ? "Explore the required items on this screen to continue."
      : "";
    btnNext.textContent = s.type === "quiz" ? "Results" : index === total - 2 ? "Finish" : "Next";
    if (s.type === "quiz") {
      const done = quiz.submitted.length >= s.questions.length;
      btnNext.disabled = !done;
      btnNext.textContent = "See results";
    }
    if (s.type === "complete") {
      btnNext.disabled = false;
      btnNext.textContent = completed ? "Completed" : "Complete";
      lockNote.textContent = completed ? "Module marked complete on this device." : "";
    }
  };

  const el = (html) => {
    const wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    return wrap.firstElementChild;
  };

  const header = (s) => `
    <div class="kicker">${s.kicker}</div>
    <h2>${s.title}</h2>
    <p class="lead">${s.lead}</p>
  `;

  const renderHero = (s) => {
    stage.innerHTML = "";
    const node = el(`<article class="screen hero">
      <div class="hero-copy">
        ${header(s)}
        <div class="host">
          <img src="${s.host.img}" alt="${s.host.name}">
          <div><b>${s.host.name}</b><small>${s.host.role}</small></div>
        </div>
        <ul class="objectives">${s.objectives.map((o) => `<li>${o}</li>`).join("")}</ul>
        <button class="primary-btn" id="begin">Begin module</button>
      </div>
      <div class="hero-media">
        <img src="${s.host.img}" alt="${s.host.name}">
        <p>${s.host.name} · ${s.host.role}</p>
      </div>
    </article>`);
    stage.appendChild(node);
    node.querySelector("#begin").addEventListener("click", () => {
      if (!unlockAudio()) go(index + 1);
    });
  };

  const renderAcknowledge = (s) => {
    const done = exploredSet(s.id);
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}
      <div class="obj-row" id="objs"></div></div></article>`;
    const row = document.getElementById("objs");
    s.items.forEach((item, i) => {
      const b = el(`<button class="obj-card${done.has(String(i)) ? " done" : ""}" type="button">
        <span class="obj-index">${String(i + 1).padStart(2, "0")}</span>
        <span class="obj-copy">
          <strong class="obj-title">${item.title}</strong>
          <span class="obj-body">${item.body}</span>
        </span>
        <span class="tick" aria-hidden="true"></span>
      </button>`);
      b.addEventListener("click", () => {
        b.classList.add("done");
        mark(s.id, i);
      });
      row.appendChild(b);
    });
  };

  const renderTimeline = (s) => {
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}
      <blockquote class="check-banner">${s.definition}</blockquote>
      <div class="timeline" id="tl"></div></div></article>`;
    const tl = document.getElementById("tl");
    s.items.forEach((item, i) => {
      const b = el(`<button class="time-item" type="button">
        <strong>${item.year}</strong><div><h3>${item.title}</h3><p>${item.body}</p></div></button>`);
      b.addEventListener("click", () => {
        tl.querySelectorAll(".time-item").forEach((n) => n.classList.remove("active"));
        b.classList.add("active");
        mark(s.id, i);
      });
      tl.appendChild(b);
    });
  };

  const renderTiles = (s) => {
    const figure = s.figure
      ? `<div class="figure"><img src="${s.figure}" alt=""></div>`
      : "";
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}
      ${figure}
      <div class="grid-2" id="tiles"></div>
      <p class="hint">Opened ${exploredSet(s.id).size} of ${s.items.length}.</p></div></article>`;
    const box = document.getElementById("tiles");
    s.items.forEach((item, i) => {
      const open = exploredSet(s.id).has(String(i));
      const b = el(`<button class="tile${open ? " active" : ""}" type="button">
        <h3>${item.title}</h3>
        <p class="more">${item.body}</p>
        <p>${open ? "Hide detail" : "Open this area"}</p></button>`);
      b.addEventListener("click", () => {
        b.classList.toggle("active");
        mark(s.id, i);
        stage.querySelector(".hint").textContent = `Opened ${exploredSet(s.id).size} of ${s.items.length}.`;
      });
      box.appendChild(b);
    });
  };

  const renderCards = (s) => {
    const figure = s.figure
      ? `<div class="figure"><img src="${s.figure}" alt=""></div>`
      : "";
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}
      ${figure}
      <div class="grid-2">${s.items.map((item) => `<div class="card">
        ${item.img ? `<div class="card-media${s.uncrop || item.uncrop ? " uncrop" : ""}"><img src="${item.img}" alt=""></div>` : ""}
        <h3>${item.title}</h3><p>${item.body}</p></div>`).join("")}</div></div></article>`;
    s.items.forEach((_, i) => mark(s.id, i));
  };

  const renderStat = (s) => {
    const media = s.img
      ? `<img src="${s.img}" alt="Accident scene illustrating human-performance consequences">`
      : "";
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}
      <div class="stat-panel${s.img ? "" : " no-media"}">
        <div class="stat-num" style="--stat:${s.statPct || 75}"><span>${s.stat}</span></div>
        <div>
          <p class="lead">${s.caption}</p>
          ${media}
        </div>
      </div></div></article>`;
    mark(s.id, "viewed");
  };

  const renderCheck = (s) => {
    const done = exploredSet(s.id);
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}<div id="checks"></div></div></article>`;
    const box = document.getElementById("checks");
    s.questions.forEach((q, qi) => {
      const wrap = el(`<section class="quiz-q"><h3>${q.q}</h3><div class="choices"></div></section>`);
      const choices = wrap.querySelector(".choices");
      q.options.forEach((opt, oi) => {
        const b = el(`<button class="choice" type="button">${opt}</button>`);
        if (done.has(String(qi))) {
          b.classList.add(oi === q.answer ? "correct" : "wrong");
          b.disabled = true;
        }
        b.addEventListener("click", () => {
          if (exploredSet(s.id).has(String(qi))) return;
          [...choices.children].forEach((c, idx) => {
            c.classList.add(idx === q.answer ? "correct" : "wrong");
            c.disabled = true;
          });
          const fb = el(`<div class="feedback">${oi === q.answer ? "Correct. " : "Not quite. "}${q.explain}</div>`);
          wrap.appendChild(fb);
          mark(s.id, qi);
        });
        choices.appendChild(b);
      });
      box.appendChild(wrap);
    });
  };

  const renderCompare = (s) => {
    const all = [
      ...s.good.map((x, i) => ({ ...x, side: "good", key: `g${i}` })),
      ...s.bad.map((x, i) => ({ ...x, side: "bad", key: `b${i}` }))
    ];
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}
      <div class="compare">
        <div class="compare-col good"><h3>${s.goodTitle || "Requirements for success"}</h3><div id="good"></div></div>
        <div class="compare-col bad"><h3>${s.badTitle || "Blocks to success"}</h3><div id="bad"></div></div>
      </div></div></article>`;
    all.forEach((item) => {
      const open = exploredSet(s.id).has(item.key);
      const b = el(`<button class="compare-item${open ? " open" : ""}" type="button">
        <b>${item.title}</b><div class="why">${item.why}</div></button>`);
      b.addEventListener("click", () => {
        b.classList.toggle("open");
        mark(s.id, item.key);
      });
      document.getElementById(item.side === "good" ? "good" : "bad").appendChild(b);
    });
  };

  const renderShell = (s) => {
    const selected = exploredSet(s.id);
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}
      <div class="shell-board" id="shell"></div>
      <div class="shell-detail" id="shell-detail">Select a component to inspect the interface.</div>
      <p class="hint">Explored ${selected.size} of ${s.nodes.length}.</p>
    </div></article>`;
    const board = document.getElementById("shell");
    const detail = document.getElementById("shell-detail");
    s.nodes.forEach((node) => {
      const b = el(`<button class="shell-node${selected.has(node.key) ? " active" : ""}" data-key="${node.key}" type="button">
        <small>${node.letter}</small><h3>${node.title}</h3><p>${node.body}</p></button>`);
      b.addEventListener("click", () => {
        board.querySelectorAll(".shell-node").forEach((n) => n.classList.remove("active"));
        b.classList.add("active");
        detail.textContent = `${node.title}: ${node.body}`;
        mark(s.id, node.key);
        stage.querySelector(".hint").textContent = `Explored ${exploredSet(s.id).size} of ${s.nodes.length}.`;
      });
      board.appendChild(b);
    });
  };

  const renderSplit = (s) => {
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}
      <div class="split">
        <div class="split-photo${s.uncrop ? " uncrop" : ""}">
          <img src="${s.img}" alt="">
          <div class="chips">${s.chips.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
        </div>
        <div>
          <img class="split-tile" src="${s.tile}" alt="">
          ${s.points.map((p) => `<p class="lead">${p}</p>`).join("")}
        </div>
      </div></div></article>`;
    mark(s.id, "viewed");
  };

  const scoreQuiz = (s) => {
    let correct = 0;
    s.questions.forEach((q, i) => {
      const picked = (quiz.answers[i] || []).slice().sort().join(",");
      const need = q.answer.slice().sort().join(",");
      if (picked === need) correct += 1;
    });
    return Math.round((correct / s.questions.length) * 100);
  };

  const renderQuiz = (s) => {
    const qi = quiz.i;
    const q = s.questions[qi];
    const picked = new Set(quiz.answers[qi] || []);
    const figure = qi === 0 && s.figure
      ? `<div class="figure"><img src="${s.figure}" alt=""></div>`
      : "";
    stage.innerHTML = `<article class="screen"><div class="pad">${header(s)}
      ${figure}
      <p class="kicker">Question ${qi + 1} of ${s.questions.length}${q.multi ? " · Select all that apply" : ""}</p>
      <h3>${q.q}</h3>
      <div id="choices"></div>
      <button class="primary-btn" id="submit-q">${quiz.submitted.includes(qi) ? "Next question" : "Submit answer"}</button>
    </div></article>`;
    const box = document.getElementById("choices");
    q.options.forEach((opt, oi) => {
      const b = el(`<button class="choice${picked.has(oi) ? " selected" : ""}" type="button">${opt}</button>`);
      if (quiz.submitted.includes(qi)) {
        const should = q.answer.includes(oi);
        const did = picked.has(oi);
        if (should) b.classList.add("correct");
        if (did && !should) b.classList.add("wrong");
        b.disabled = true;
      }
      b.addEventListener("click", () => {
        if (quiz.submitted.includes(qi)) return;
        if (q.multi) {
          if (picked.has(oi)) picked.delete(oi);
          else picked.add(oi);
        } else {
          picked.clear();
          picked.add(oi);
        }
        quiz.answers[qi] = [...picked];
        renderQuiz(s);
      });
      box.appendChild(b);
    });
    if (quiz.submitted.includes(qi)) {
      stage.querySelector(".pad").insertBefore(
        el(`<div class="feedback">${q.explain}</div>`),
        document.getElementById("submit-q")
      );
    }
    document.getElementById("submit-q").addEventListener("click", () => {
      if (!quiz.submitted.includes(qi)) {
        if (!quiz.answers[qi] || quiz.answers[qi].length === 0) return;
        quiz.submitted.push(qi);
        renderQuiz(s);
        updateNav();
        return;
      }
      if (qi < s.questions.length - 1) {
        quiz.i = qi + 1;
        renderQuiz(s);
        updateNav();
      } else {
        const score = scoreQuiz(s);
        bestScore = Math.max(bestScore, score);
        save();
        go(index + 1);
      }
    });
    updateNav();
  };

  const renderComplete = (s) => {
    const quizScreen = screens.find((x) => x.type === "quiz");
    const score = quiz.submitted.length ? scoreQuiz(quizScreen) : bestScore;
    const passed = score >= COURSE.passMark;
    stage.innerHTML = `<article class="screen"><div class="pad" style="text-align:center">
      ${header(s)}
      <div class="score-ring" style="--score:${score}"><span>${score}%</span></div>
      <p class="lead">${passed ? "You met the 80% pass mark." : "Below 80%. Retry the quiz when you are ready."}</p>
      <p>Best score on this device: <b>${bestScore}%</b></p>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:18px">
        <button class="nav-btn" id="retry">Retry quiz</button>
        <button class="ghost-btn" id="restart" style="color:var(--navy);border-color:var(--line)">Review from start</button>
      </div>
    </div></article>`;
    document.getElementById("retry").addEventListener("click", () => {
      quiz = { i: 0, answers: [], submitted: [] };
      go(screens.findIndex((x) => x.type === "quiz"));
    });
    document.getElementById("restart").addEventListener("click", () => go(0));
  };

  const renderers = {
    hero: renderHero,
    acknowledge: renderAcknowledge,
    timeline: renderTimeline,
    tiles: renderTiles,
    cards: renderCards,
    stat: renderStat,
    check: renderCheck,
    compare: renderCompare,
    shell: renderShell,
    split: renderSplit,
    quiz: renderQuiz,
    complete: renderComplete
  };

  const go = (i) => {
    index = Math.max(0, Math.min(screens.length - 1, i));
    const s = screen();
    if (s.type === "quiz" && quiz.submitted.length >= s.questions.length && i === screens.findIndex((x) => x.type === "quiz")) {
      quiz = { i: 0, answers: [], submitted: [] };
    }
    transcriptEl.textContent = s.narration;
    renderers[s.type](s);
    setAudio(s);
    renderMenu();
    updateNav();
    save();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closePanels = () => {
    document.getElementById("menu").classList.remove("open");
    document.getElementById("transcript").classList.remove("open");
    backdrop.classList.remove("open");
  };

  const toggle = (id) => {
    const panel = document.getElementById(id);
    const willOpen = !panel.classList.contains("open");
    closePanels();
    if (willOpen) {
      panel.classList.add("open");
      backdrop.classList.add("open");
    }
  };

  btnPlay.addEventListener("click", () => {
    if (unlockAudio()) {
      updatePlayLabel();
      return;
    }
    if (usingFallback) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        fallbackPaused = true;
      } else if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        fallbackPaused = false;
      } else {
        speakFallback(screen().narration);
      }
      updatePlayLabel();
      return;
    }
    if (audioEl.paused) audioEl.play().catch(() => speakFallback(screen().narration));
    else audioEl.pause();
  });
  btnReplay.addEventListener("click", () => {
    unlockAudio();
    if (usingFallback) {
      speakFallback(screen().narration);
      return;
    }
    audioEl.currentTime = 0;
    audioEl.play().catch(() => speakFallback(screen().narration));
  });
  btnMute.addEventListener("click", () => {
    audioEl.muted = !audioEl.muted;
    btnMute.textContent = audioEl.muted ? "🔇" : "🔊";
  });
  btnSpeed.addEventListener("click", () => {
    speedIdx = (speedIdx + 1) % speeds.length;
    audioEl.playbackRate = speeds[speedIdx];
    btnSpeed.textContent = `${speeds[speedIdx]}×`;
  });
  btnPrev.addEventListener("click", () => go(index - 1));
  btnNext.addEventListener("click", () => {
    if (screen().id === "welcome" && !unlocked) {
      unlockAudio();
      return;
    }
    if (screen().type === "complete") {
      completed = true;
      save();
      if (window.SCORM12 && window.SCORM12.active) {
        window.SCORM12.set("cmi.core.score.raw", String(bestScore));
        window.SCORM12.set(
          "cmi.core.lesson_status",
          bestScore >= COURSE.passMark ? "passed" : "failed"
        );
        window.SCORM12.commit();
      }
      updateNav();
      return;
    }
    go(index + 1);
  });
  document.getElementById("btn-menu").addEventListener("click", () => toggle("menu"));
  document.getElementById("btn-transcript").addEventListener("click", () => toggle("transcript"));
  backdrop.addEventListener("click", closePanels);
  audioEl.addEventListener("play", updatePlayLabel);
  audioEl.addEventListener("pause", updatePlayLabel);
  audioEl.addEventListener("error", () => {
    audioStatus.textContent = "Audio pending — generate with scripts/generate_narration.py";
  });
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, video")) return;
    if (e.key === "ArrowRight" && !btnNext.disabled) {
      if (screen().id === "welcome" && !unlocked) unlockAudio();
      else go(index + 1);
    }
    if (e.key === "ArrowLeft" && !btnPrev.disabled) go(index - 1);
    if (e.key === " ") {
      e.preventDefault();
      btnPlay.click();
    }
  });
  document.body.addEventListener("click", unlockAudio, { once: true });
  const finishScorm = () => {
    if (window.SCORM12) window.SCORM12.finish(completed);
  };
  window.addEventListener("pagehide", finishScorm);
  window.addEventListener("beforeunload", finishScorm);

  load();
  const startId = new URLSearchParams(location.search).get("screen");
  if (startId) {
    const i = screens.findIndex((s) => s.id === startId);
    if (i >= 0) index = i;
  }
  go(index);
})();
