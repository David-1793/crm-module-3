window.SCORM12 = (() => {
  let api = null;
  let active = false;
  let finished = false;
  const started = Date.now();

  const findAPI = (win) => {
    let attempts = 0;
    while (win && attempts < 10) {
      if (win.API) return win.API;
      if (win.parent && win.parent !== win) {
        win = win.parent;
        attempts += 1;
        continue;
      }
      break;
    }
    try {
      if (win.opener && win.opener.API) return win.opener.API;
    } catch (_) {}
    return null;
  };

  const get = (el) => {
    if (!api) return "";
    try {
      return api.LMSGetValue(el) || "";
    } catch (_) {
      return "";
    }
  };

  const set = (el, value) => {
    if (!api) return false;
    try {
      return api.LMSSetValue(el, String(value)) === "true";
    } catch (_) {
      return false;
    }
  };

  const commit = () => {
    if (!api) return false;
    try {
      return api.LMSCommit("") === "true";
    } catch (_) {
      return false;
    }
  };

  const sessionTime = () => {
    const total = Math.max(0, Math.floor((Date.now() - started) / 1000));
    const h = String(Math.floor(total / 3600)).padStart(4, "0");
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const init = () => {
    api = findAPI(window);
    if (!api) return false;
    try {
      active = api.LMSInitialize("") === "true";
    } catch (_) {
      active = false;
    }
    return active;
  };

  const finish = (completed) => {
    if (!api || finished) return;
    finished = true;
    set("cmi.core.session_time", sessionTime());
    set("cmi.core.exit", completed ? "" : "suspend");
    commit();
    try {
      api.LMSFinish("");
    } catch (_) {}
  };

  return { init, get, set, commit, finish, get active() { return active; } };
})();
