window.COURSE = {
  id: "crm-mod3",
  title: "Crew Resource Management",
  module: "Human Error and Reliability",
  passMark: 80,
  screens: [
    {
      id: "welcome",
      menu: "Welcome",
      type: "hero",
      kicker: "Online course",
      title: "Human Error and Reliability",
      lead: "Human Error and Reliability looks at how error really works: early research, the modern systems view, how we classify slips and violations, and why the same lapse can be harmless in one context and catastrophic in another.",
      narration:
        "Welcome to Human Error and Reliability, part of this Crew Resource Management course. I'm Brandon, your course facilitator. In this module we look at human error and reliability. You will see how early research shaped the idea of human error, why the modern view is more about systems than blame, how to tell slips, lapses, mistakes and violations apart, and why context decides the consequence. When you are ready, start the module.",
      objectives: [
        "Explain Heinrich’s findings and the modern systems view of accident causes.",
        "Define human error and distinguish errors from violations.",
        "Categorise slips, lapses, mistakes and violations in operations.",
        "Show how context and the error chain change outcomes — then apply avoid, trap and mitigate."
      ],
      host: { img: "images/host-brandon.png", name: "Brandon", role: "Course Facilitator" }
    },
    {
      id: "objectives",
      menu: "Learning objectives",
      type: "acknowledge",
      kicker: "Before you begin",
      title: "What this module asks of you",
      lead: "Tick each outcome once you have read it. These capabilities come from the Human Error and Reliability brief.",
      require: "all",
      narration:
        "Take a moment with the four outcomes for this module. First, explain early research on human error and the modern systems view. Second, define human error and separate errors from violations. Third, categorise slips, lapses, mistakes and violations. Fourth, show how context and the error chain change outcomes, then apply avoid, trap and mitigate. Select each objective to confirm you have it in mind. Then continue.",
      items: [
        { title: "Know the research", body: "Place Heinrich’s triangle and the 70 to 90 percent claim beside the modern consensus that causes are systemic." },
        { title: "Define error", body: "State the University of Texas definition and tell error apart from violation." },
        { title: "Classify the types", body: "Recognise slips, lapses, mistakes and routine, situational or exceptional violations." },
        { title: "Manage the chain", body: "Use context, the error chain, design and CRM skills to avoid, trap and mitigate." }
      ]
    },
    {
      id: "heinrich",
      menu: "Early research",
      type: "timeline",
      kicker: "Foundations",
      title: "Human error — early research",
      lead: "Heinrich’s triangle became a fixture of industrial safety. Read each step to see what it claimed — and what later research added.",
      narration:
        "Herbert William Heinrich published Industrial Accident Prevention in 1931. His empirical finding became Heinrich's Law: in a workplace, for every accident that causes a major injury, there are 29 causing minor injuries and 300 causing no injuries. He also stated that 88 percent of workplace accidents and injuries are caused by man-failure. That was the first scientific study to report the often quoted 70 to 90 percent incidence of human error. Many later studies in aviation and other industries reached similar numbers. Next we will look at why the modern view is more careful.",
      definition:
        "Heinrich’s triangle: 1 major injury, 29 minor injuries, 300 no-injury events — and 88% attributed to ‘man-failure’.",
      items: [
        {
          year: "1931",
          title: "Heinrich’s Law",
          body: "For every major-injury accident there are 29 minor injuries and 300 events with no injury. The pyramid became a staple of industrial safety training."
        },
        {
          year: "88%",
          title: "Man-failure",
          body: "Heinrich concluded that most workplace accidents were caused by unsafe acts after reviewing thousands of supervisor reports — reports that often blamed the worker without a deep root-cause investigation."
        },
        {
          year: "Later",
          title: "70–90% human error",
          body: "Aviation and other industries repeated the finding: a large majority of accidents list human error. The figure is famous — and easy to over-read."
        }
      ]
    },
    {
      id: "modern-view",
      menu: "Modern consensus",
      type: "cards",
      kicker: "Further research",
      title: "Causes are more than ‘human error’",
      lead: "Dekker, IOSH and many regulators now treat the 70–90% figure as a starting point, not an explanation.",
      narration:
        "Heinrich's work was the first scientific study to report that 70 to 90 percent figure. Many accident studies in aviation and other industries have concluded the same. However, the modern consensus — formed by Dekker, the Institution of Occupational Safety and Health, and many regulatory bodies — is that the causes of accidents are far more complex than just human error. They involve the interaction of the human with the system, the environment, the equipment, the procedures, and competing goals. Human error is a label, not a cause.",
      items: [
        {
          title: "A useful statistic, a weak explanation",
          body: "Saying an event was ‘due to human error’ restates that a person was in the loop. It does not tell you which interface failed."
        },
        {
          title: "Systems, not sinners",
          body: "People work inside equipment, procedures, time pressure and organisational goals. The interaction is where risk actually lives."
        },
        {
          title: "Why this matters for CRM",
          body: "If we stop at blame, we never redesign the conditions. CRM and TEM exist to manage those conditions, not to hunt for a guilty party."
        }
      ]
    },
    {
      id: "not-always-bad",
      menu: "Are errors always bad?",
      type: "cards",
      kicker: "A useful surprise",
      title: "Not every unintended act is an ‘error’",
      lead: "We attach the word error to shortfalls. Unintended actions that turn out well are usually called accidents of discovery — not mistakes.",
      figure: "images/fleming.jpg",
      narration:
        "Errors are almost always associated with a negative outcome: a performance shortfall. But people also perform unintended actions that turn out for the better, and those are rarely designated as errors. Alexander Fleming's discovery of penicillin in 1928 is often described as accidental, and almost never as erroneous. A petri dish was left off the incubator; a mould spore grew; the bacteria did not. LOSA data makes a related point in the cockpit: 75 percent of errors had no consequences. Error is common. Catastrophe is not automatic.",
      items: [
        {
          title: "Fleming, 1928",
          body: "A staphylococcus culture was left on the bench. A Penicillium spore grew. The outcome was penicillin — accidental, not ‘erroneous’."
        },
        {
          title: "LOSA: 75% no consequence",
          body: "Line observations show most errors do not bite. Outcome depends on defences, timing and what else is going on — not on the word ‘error’ alone."
        }
      ]
    },
    {
      id: "definition",
      menu: "What is human error?",
      type: "cards",
      kicker: "Definition",
      title: "A deviation from intention",
      lead: "The University of Texas wording is the one this course uses. Error is about mismatch — not about character.",
      figure: "images/deviation.png",
      narration:
        "Human error can be defined, following the University of Texas, as a consequence of human involvement which causes deviation from an individual's or organisational intentions or expectations. It refers to mistakes, actions or decisions that lead to undesirable or unintended outcomes. It occurs in personal life and in professional work. Aviation sits at the front of efforts to reduce it, because the same error can harm many lives. Understanding error matters so we can design systems, procedures and environments that fit human limits — that is the human-factors task.",
      items: [
        {
          title: "University of Texas",
          body: "A consequence of human involvement which causes deviation from an individual’s or organisational intentions or expectations."
        },
        {
          title: "Everywhere, not only aviation",
          body: "Error shows up in every industry. Aviation is notable because the probability of severe harm is high — so the industry has led the work on reduction."
        },
        {
          title: "Design around people",
          body: "Human factors and ergonomics improve the fit between people and systems, rather than asking people to be superhuman."
        }
      ]
    },
    {
      id: "errors-vs-violations",
      menu: "Errors and violations",
      type: "compare",
      kicker: "Categorising",
      title: "Two families, one umbrella",
      lead: "Open each card. Everyday talk lumps both under ‘human error’. Operations need the distinction.",
      require: "all",
      goodTitle: "Errors",
      badTitle: "Violations",
      narration:
        "Here we need to keep two ideas apart. Errors are actions or inactions that fail to achieve their intended outcomes. Violations are intentional actions or inactions that break known rules, procedures or norms. The negative consequences are not intentional. The term human error is often used to cover both. Keep the distinction: a slip is not a decision to break a rule, and a routine speed-limit breach is not a memory failure. Open every card.",
      good: [
        { title: "Failed outcome", why: "The plan or the action misses what the person meant to achieve." },
        { title: "Not a choice to break a rule", why: "The person is trying to do the job as they understand it." },
        { title: "Slips, lapses, mistakes", why: "These are the usual error types you will classify next." }
      ],
      bad: [
        { title: "Known rule is broken", why: "The person knows the procedure, limit or norm and steps outside it." },
        { title: "Consequence is still unintended", why: "Nobody sets out to crash. The violation is the shortcut, not the harm." },
        { title: "Routine, situational, exceptional", why: "Violations have their own pattern — habit, pressure, or a one-off emergency." }
      ]
    },
    {
      id: "error-types",
      menu: "Slips to violations",
      type: "tiles",
      kicker: "Human error types",
      title: "Slips, lapses, mistakes — and violations",
      lead: "Open every tile. The labels decide how you detect the problem and how you design the defence.",
      require: "all",
      narration:
        "Human errors are often categorised into slips, lapses, mistakes and violations. A slip is not doing what you meant to do — operating the flap lever instead of the gear lever. A lapse is forgetting: a checklist item left unchecked. Slips are often caught quickly by system protections. Lapses are harder to see, so they are more likely to have consequences. A mistake is doing the wrong thing believing it to be right. The plan itself is wrong, so correct execution still fails, and the person often continues despite growing signs. Violations look like mistakes but raise the chance of abnormal operation. Open each type.",
      items: [
        {
          title: "Slips",
          body: "Actions that do not go as planned. Example: selecting flap instead of gear. Usually easy to detect; built-in protections often catch them."
        },
        {
          title: "Lapses",
          body: "Memory failures — forgetting a checklist item or a configuration. Harder to detect, and therefore more likely to carry consequence."
        },
        {
          title: "Mistakes",
          body: "Failures in the plan. Even perfect execution cannot reach the intended outcome. Rule-based or knowledge-based — and dangerous because the person believes they are right."
        },
        {
          title: "Violations",
          body: "Intentional departure from a known rule or norm, with unintended harm. Tempting because the benefit is immediate and the drawback is not obvious."
        }
      ]
    },
    {
      id: "violation-types",
      menu: "Violation types",
      type: "tiles",
      kicker: "Three patterns",
      title: "Routine, situational, exceptional",
      lead: "Open every pattern. Each one lives at a different performance level and needs a different organisational response.",
      require: "all",
      narration:
        "Routine violations are strong but wrong habits. The workgroup treats them as normal, and the organisation often tolerates them — driving ten kilometres an hour over the airside limit, for example. They sit at the skill-based level. Situational violations come from the job itself: time pressure, missing supervisors, poor light, not enough people. A technician signs off without the required cross-check because there is nobody to do it. These sit at the rule-based level. Exceptional violations are rare: emergencies or equipment failure. A crew may land with an excessive tailwind after a hydraulic failure rather than delay for the preferred runway. They sit at the knowledge-based level. Open each pattern.",
      items: [
        {
          title: "Routine",
          body: "Habitual, often unconscious, accepted as ‘how we do it’. Seen as low risk by the people who do them. Skill-based."
        },
        {
          title: "Situational",
          body: "The environment makes compliance hard: time, supervision, resources, culture. People violate to get the job done. Rule-based."
        },
        {
          title: "Exceptional",
          body: "Unusual circumstances — failure or emergency. A conscious trade-off or an instinctive safer path. Knowledge-based."
        }
      ]
    },
    {
      id: "losa-stats",
      menu: "Error in line flying",
      type: "stat",
      kicker: "University of Texas LOSA",
      title: "Errors are not limited to accidents",
      lead: "Not all errors cause accidents, and not all accidents are caused by errors. Line data shows how ordinary error really is.",
      narration:
        "Not all errors cause accidents, and not all accidents are caused by errors. University of Texas LOSA studies found that in 60 percent of flights at least one error or violation was observed, with an average of 1.5 per flight. A quarter of those errors and violations had consequences — an undesired aircraft state or a further error. Human error is all around us. That is why Threat and Error Management matters.",
      stat: "60%",
      statPct: 60,
      caption: "Flights with at least one observed error or violation — average 1.5 per flight. 25% of those events had consequences."
    },
    {
      id: "detection",
      menu: "Detection",
      type: "tiles",
      kicker: "What happened next",
      title: "Most errors are not even seen",
      lead: "Open every outcome. If an error is committed — by the crew or by someone outside — detecting it is everyone’s duty.",
      require: "all",
      narration:
        "Of the errors in the LOSA data, about 33 percent were detected and corrected. About 4 percent were detected but made worse. Over 60 percent went undetected. Monitoring, cross-checking, verification, and evaluating the quality of decisions are how crews find error. Human error is normal and prevalent in flight operations. Open the tiles.",
      items: [
        { title: "Detected and corrected", body: "~33%. The recovery we train for: see it, name it, put the aircraft or the procedure back where it belongs." },
        { title: "Detected but made worse", body: "~4%. Seeing the problem is not enough if the next action adds a new error or an undesired state." },
        { title: "Went undetected", body: "~60%. The largest slice. This is why independent monitoring and challenge are not optional extras." },
        { title: "Everyone’s duty", body: "Crew or external — once an error exists, detection is a shared task: monitor, cross-check, verify, and test the decision." }
      ]
    },
    {
      id: "consequences",
      menu: "Cause and consequence",
      type: "cards",
      kicker: "Not linear",
      title: "The same slip, two different worlds",
      lead: "An error in a benign setting may do almost nothing. The same error beside a threat can be grave. Magnitude does not travel in a straight line.",
      uncrop: true,
      narration:
        "The causes and consequences of operational errors are not linear in their magnitude. An error committed in a benign area may have very little consequence. The same error committed where there is a threat may have a much graver outcome. Think of a flowerpot: knocked inward onto a carpet, it is a mess. Knocked outward above a pavement, the context has changed everything. Then we will look at a flight-deck lapse that depended on the same idea.",
      items: [
        {
          img: "images/flowerpot-miss.png",
          title: "Benign setting",
          body: "The action is the same — the pot leaves the sill — but with nobody underneath, the outcome stays small."
        },
        {
          img: "images/flowerpot-context.png",
          title: "Same action, new context",
          body: "Add a person on the pavement and the identical lapse becomes a serious event. Context writes the consequence."
        }
      ]
    },
    {
      id: "spanair",
      menu: "Context · Spanair 5022",
      type: "cards",
      kicker: "A lapse in context",
      title: "Forgotten flaps, many factors",
      lead: "It is usually wrong to assume a catastrophe was preceded by an equally ‘serious’ error. More often it is the number of errors — and whether the system can contain them. For Spanair 5022 the lapse was forgotten take-off flaps; the outcome depended on type and performance, weight, runway, obstacles and the configuration warning.",
      narration:
        "The consequences of a human error are unpredictable and depend on context. In a complex system with multiple defences, an accident usually involves several contributing factors, some visible and some distant. For Spanair Flight 5022 the error was a lapse: setting the flaps correctly for take-off was forgotten. Factors that shaped the outcome included aircraft type and performance, actual take-off weight, runway length and obstructions ahead, and the take-off configuration warning. One hundred and forty-six people died. The lapse was ordinary. The context was not.",
      items: [
        {
          title: "Same lapse, different outcome",
          body: "The same forgotten flap setting can be a go-around, a warning, or a disaster — depending on the rest of the system."
        },
        {
          title: "Do not match size to size",
          body: "Do not look for one ‘big’ error to match a big outcome. Count the links and the defences."
        },
        {
          title: "Warnings still need a crew",
          body: "Configuration warnings only help if they fire, are heard, and are believed."
        }
      ]
    },
    {
      id: "error-chain",
      menu: "The error chain",
      type: "tiles",
      kicker: "Accident causation",
      title: "Very few events have a single link",
      lead: "Open every tile. Break any one link and you may prevent the mishap. Crews need to see the chain while it is still forming.",
      require: "all",
      figure: "images/error-chain.png",
      narration:
        "Very few incidents are caused by a single error. In most cases there are multiple links. Some have been present for years — latent failures. Others are immediate — active failures. The error chain describes a sequence that culminates in a mishap. Researchers examined more than 30 accidents and asked: if the crew had been trained to recognise those links, would the outcome have changed? In each event, yes. The fewest links in any accident were four; the average was seven. Recognising only one link can be enough. The chain is easier to reconstruct after the fact than to see in the moment — which is why we teach it. Open every tile.",
      items: [
        { title: "Latent failures", body: "Links that may sit in design, culture, documentation or rostering for years before they meet an active error." },
        { title: "Active failures", body: "The immediate actions or inactions close to the event — the ones investigation notices first." },
        { title: "Average of seven", body: "In the study set, no accident had fewer than four links. More links should make recognition easier, not harder." },
        { title: "Break one link", body: "No chain is stronger than its weakest link. One timely challenge can change the outcome." },
        { title: "Hard to see live", body: "Hindsight rebuilds the chain. In the moment, crews need practised cues and permission to speak up." },
        { title: "Train the concept", body: "Familiarising crews with the error chain improves the chance they will interrupt it before the mishap." }
      ]
    },
    {
      id: "manage",
      menu: "Avoid · Trap · Mitigate",
      type: "tiles",
      kicker: "Managing error",
      title: "You cannot prevent every error",
      lead: "Open every layer. In a complex system, error management is the strategy — and CRM skills are how crews apply it.",
      require: "all",
      narration:
        "In a complex system, errors cannot be completely prevented. You need strategies: prevention where design allows it; reduction of likelihood and size; detection that makes error obvious; recovery back to a safe state; and tolerance so the system can live with the miss. From a T E M standpoint, avoid errors when you can — prepare and plan. Trap them before they have adverse consequences — monitor and challenge. Mitigate if they were not trapped — manage, take action, limit the consequences. C R M principles and skills are how crews stop error chains from developing. Open every tile.",
      items: [
        { title: "Avoid — prepare, plan", body: "Identify the conditions that induce error and change them before the sector or the task begins." },
        { title: "Trap — monitor, challenge", body: "Make error visible quickly. Cross-check, verify, and speak up while the aircraft is still easy to recover." },
        { title: "Mitigate — manage and limit", body: "If the error has already bitten, contain the damage and restore safety margins." },
        { title: "Design and CRM together", body: "Some prevention is only possible in design. Crews still need behaviours that detect, recover and tolerate what remains." }
      ]
    },
    {
      id: "design",
      menu: "Design for error",
      type: "cards",
      kicker: "Prevention in the metal",
      title: "Assume every possible error will occur",
      lead: "Don Norman: if an error is possible, someone will make it. Shape the control so the wrong grab is harder — and back it with interlocks.",
      narration:
        "Don Norman wrote: if an error is possible, someone will make it. The designer must assume that all possible errors will occur and design so as to minimise the chance of the error. Aviation already does this in many places. Flap, spoiler and gear levers are shaped to symbolise their functions, which reduces slips involving the wrong lever. An air-ground sensor system prevents incorrect deployment of thrust reversers, and guards against raising the gear on the ground.",
      items: [
        {
          img: "images/flap-lever.jpg",
          title: "Shaped flap lever",
          body: "The handle says what it is. Shape coding makes a slip onto the neighbouring control less likely."
        },
        {
          img: "images/gear-lever.jpg",
          title: "Wheel-shaped gear handle",
          body: "A control that looks like a wheel is harder to confuse with flap or spoiler when workload is high."
        },
        {
          img: "images/thrust-reverser.jpg",
          title: "Air/ground interlock",
          body: "Sensors block thrust-reverser deployment — and some gear selections — unless the aircraft is in the right state."
        }
      ]
    },
    {
      id: "blame",
      menu: "Blaming and fault",
      type: "acknowledge",
      kicker: "A thinking trap",
      title: "Fundamental attribution error",
      lead: "Tick each statement. People do not intentionally commit errors. The story is almost always in the circumstances.",
      require: "all",
      narration:
        "When we hear of a person committing an error, we tend to attach stupidity, laziness or carelessness to that person. We ask how someone could be so silly. That attribution is an error in itself. People do not intentionally commit errors. The circumstances, background, training, culture and many other factors provide the true reasons. Select each point, then we will look at reliability — the factors that make performance wobble, and the ones that steady it.",
      items: [
        { title: "The first story is character", body: "We reach for labels — careless, lazy, stupid — because they are quick and they keep the system looking clean." },
        { title: "Attribution is itself an error", body: "Errors are unintended. If someone meant the outcome, we are no longer talking about error." },
        { title: "Look at the conditions", body: "Training, culture, time, tools and competing goals explain more than a verdict on the person." }
      ]
    },
    {
      id: "reliability",
      menu: "Reliability",
      type: "compare",
      kicker: "Human performance varies",
      title: "What steadies us — and what does not",
      lead: "Open all the cards. Performance changes from day to day and from person to person. Good systems tolerate the normal range.",
      require: "all",
      goodTitle: "May improve reliability",
      badTitle: "May reduce reliability",
      narration:
        "What affects our reliability to perform safely? Age can blunt memory, hearing, sight and the ease of learning new skills. A negative state of mind makes a good outcome harder to picture. Physical health can restrict the job and colour mood. Attitude shifts across a career — keen at first, sometimes resistant later — and culture shapes it. Emotions arrive from incidents, bereavement, money or job security. Cognitive biases are systematic departures from rational judgement: anchoring, confirmation, hindsight, continuation. What helps? Experience, focused attention, good health, emotions in check, a positive attitude, training and reporting, and knowing your biases. Human performance is constantly variable. Ideally the system tolerates that range. Open all the cards.",
      good: [
        { title: "Experience", why: "Practised patterns help you recognise a threat earlier and choose a known option." },
        { title: "Focused attention", why: "The task that has your attention is the one you can still trap." },
        { title: "Health — physical and mental", why: "Fitness to fly is a reliability control, not a personal luxury." },
        { title: "Emotions in check", why: "You cannot delete feeling, but you can notice it and add a cross-check." },
        { title: "Positive attitude", why: "Willingness to learn and to accept challenge keeps defences alive." },
        { title: "Training and reporting", why: "Skills stay current, and the organisation sees the latent links." },
        { title: "Awareness of bias", why: "Naming anchoring, confirmation, hindsight or continuation bias makes them easier to challenge." }
      ],
      bad: [
        { title: "Age-related change", why: "Memory, hearing, sight and new learning can all decline. The system must not assume a 25-year-old profile." },
        { title: "State of mind", why: "An ‘everything is bad’ bias makes a workable plan harder to see." },
        { title: "Physical health", why: "Restriction on the job feeds fatigue and mood — and both feed error." },
        { title: "Attitude drift", why: "Established operators can become resistant to change; culture can lock that in." },
        { title: "Emotions", why: "Investigations, bereavement, money or job threat all sit in the flight deck with you." },
        { title: "Cognitive biases", why: "Systematic errors in perception, memory and decision-making — not random stupidity." }
      ]
    },
    {
      id: "summary",
      menu: "Summary",
      type: "cards",
      kicker: "Bring it together",
      title: "Prevent the sequence, not the person",
      lead: "The issue is not how we define human error, or even who is to blame. It is how we recognise and interrupt the chain.",
      figure: "images/error-chain.png",
      narration:
        "The issue is not how we define human error, or even who is to blame, but rather how to prevent errors. It is essential to flight safety that we keep a proper focus on how to recognise and interrupt the hazardous sequence of events that precedes a mishap. Threats require crew attention and management if safety margins are to be maintained. Threats can be countered, and errors managed, by the defences provided by C R M skills. Next, a short quiz on the ideas from this module.",
      items: [
        {
          title: "Focus on the sequence",
          body: "Recognise and interrupt the events that precede a mishap. One broken link can be enough."
        },
        {
          title: "Threats still need management",
          body: "Context writes consequence. TEM and CRM skills are the operational defences."
        },
        {
          title: "Ready for the quiz",
          body: "Six questions, immediate feedback, pass mark 80%. You can retry. Your best score is stored on this device."
        }
      ]
    },
    {
      id: "quiz",
      menu: "Summary quiz",
      type: "quiz",
      kicker: "End of module",
      title: "Summary quiz",
      lead: "A brief check of Human Error and Reliability. Feedback appears after each question. Pass mark 80%.",
      figure: "images/quiz-close.jpg",
      narration:
        "Please complete this short end-of-module quiz. It replaces the L M S placeholder from the original lesson. Answer each question, read the feedback, and aim for eighty percent or better.",
      questions: [
        {
          q: "Heinrich’s triangle claimed that for every major-injury accident there are…",
          multi: false,
          options: [
            "3 minor injuries and 30 no-injury events",
            "29 minor injuries and 300 no-injury events",
            "90 minor injuries and 9 no-injury events",
            "Equal numbers of minor and major injuries"
          ],
          answer: [1],
          explain: "Heinrich’s Law: 1 major, 29 minor, 300 no-injury events. He also attributed 88% of workplace accidents to ‘man-failure’."
        },
        {
          q: "The modern consensus (Dekker, IOSH and many regulators) is that…",
          multi: false,
          options: [
            "Human error is a complete explanation of most accidents",
            "Accident causes are more complex than ‘human error’ and involve the person interacting with system, environment, equipment, procedures and goals",
            "Heinrich has been disproved and human performance is rarely involved",
            "Only technical failure matters"
          ],
          answer: [1],
          explain: "The 70–90% figure is a starting point. Causes sit in the interaction, not in a label on the person."
        },
        {
          q: "Select every statement that matches this course’s view of error and violation.",
          multi: true,
          options: [
            "Errors are actions or inactions that fail to achieve their intended outcomes",
            "Violations are intentional departures from known rules, with unintended negative consequences",
            "People commit errors because they intend the harm",
            "Everyday language often uses ‘human error’ to cover both errors and violations"
          ],
          answer: [0, 1, 3],
          explain: "Errors miss the intended outcome. Violations break a known rule; the harm is still unintended. The umbrella term often covers both."
        },
        {
          q: "Forgetting to set take-off flaps is best classified as…",
          multi: false,
          options: [
            "A slip — the wrong lever was moved",
            "A lapse — a memory failure",
            "A routine violation — the crew chose to skip the checklist",
            "An exceptional violation in an emergency"
          ],
          answer: [1],
          explain: "Spanair 5022 is taught here as a lapse: the correct flap setting was forgotten. A slip would be acting on the wrong control."
        },
        {
          q: "University of Texas LOSA data found that…",
          multi: false,
          options: [
            "Errors almost never occur on uneventful flights",
            "About 60% of flights had at least one error or violation, and over 60% of errors went undetected",
            "Every observed error produced an undesired aircraft state",
            "Detection always made the situation better"
          ],
          answer: [1],
          explain: "Error is ordinary: ~60% of flights, average 1.5 events. About a third were corrected; ~4% were made worse; over 60% were not seen."
        },
        {
          q: "The preferred TEM order for managing error is…",
          multi: false,
          options: [
            "Mitigate, then avoid, then trap",
            "Avoid, trap, mitigate",
            "Blame, retrain, dismiss",
            "Detect only — avoidance is not used"
          ],
          answer: [1],
          explain: "Prepare and plan to avoid; monitor and challenge to trap; manage and limit consequences if the error still gets through."
        }
      ]
    },
    {
      id: "complete",
      menu: "Complete",
      type: "complete",
      kicker: "Human Error and Reliability",
      title: "You have finished the lesson",
      lead: "Error is normal. Context writes the outcome. CRM skills — and systems that tolerate people — are how we break the chain.",
      narration:
        "That is the end of Human Error and Reliability. You can now place Heinrich beside the modern systems view, define human error, classify slips, lapses, mistakes and violations, and use context, the error chain, and avoid, trap, mitigate. Review any screen from the menu, or retry the quiz to raise your best score."
    }
  ]
};
