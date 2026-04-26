/* ============================================================
   MedRad Clinics — script.js
   Vanilla JS, no dependencies
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. Nav scroll behavior
  ---------------------------------------------------------- */
  var nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled


  /* ----------------------------------------------------------
     2. Mobile nav toggle
  ---------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('nav__links--open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('nav__links--open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });


  /* ----------------------------------------------------------
     3. Smooth scroll for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var navHeight = nav ? nav.offsetHeight : 0;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  /* ----------------------------------------------------------
     4. Chat widget — Ask Dr. E (index.html only)
  ---------------------------------------------------------- */
  var chatInput    = document.getElementById('chatInput');
  var chatSend     = document.getElementById('chatSend');
  var chatMessages = document.getElementById('chatMessages');

  if (chatSend && chatInput && chatMessages) {

  var cannedResponses = [
    'That is a great question. In radiology, that term refers to how we describe tissue density or signal on imaging. The specific wording often follows standardised reporting language — your physician can provide clinical context based on your full history.',
    'MRI uses strong magnetic fields and radio waves — there is no ionising radiation involved. Most scans take 20 to 45 minutes. You will hear a series of loud knocking sounds from the machine, which is completely normal. Let me know if you have a specific scan type in mind.',
    'A radiology report is structured in two main sections: the Findings (what the radiologist observed) and the Impression (a summary of what those findings likely mean clinically). If a word in your report is confusing, feel free to share it and I can explain it in plain language.',
    'Follow-up imaging recommendations are common and do not necessarily indicate something is wrong. They are often used to confirm that a finding is benign and stable over time. Your referring physician can advise on the appropriate interval and next steps.',
    'Contrast agents such as gadolinium (for MRI) or iodinated contrast (for CT) are used to highlight certain structures and improve diagnostic accuracy. They are generally safe, though your care team will screen you for allergies and kidney function beforehand.'
  ];

  var responseIndex = 0;

  function appendMessage(text, type) {
    var msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--' + type;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  function sendChatMessage() {
    var text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, 'out');
    chatInput.value = '';
    chatInput.focus();

    var response = cannedResponses[responseIndex % cannedResponses.length];
    responseIndex++;

    // Show typing indicator
    var typingMsg = appendMessage('...', 'in');
    typingMsg.style.opacity = '0.5';
    typingMsg.style.fontStyle = 'italic';

    setTimeout(function () {
      chatMessages.removeChild(typingMsg);
      appendMessage(response, 'in');
    }, 800);
  }

  chatSend.addEventListener('click', sendChatMessage);

  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  });

  } // end chat widget guard


  /* ----------------------------------------------------------
     5. Assess Your Risk — Full-Screen Overlay
  ---------------------------------------------------------- */

  var CONDITIONS = [
    {
      id: 'carotid',
      name: 'Carotid Artery Stenosis',
      desc: 'Narrowing of the neck arteries that supply the brain',
      iconHtml: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="22" x2="12" y2="14"/><path d="M12 14 L8 5"/><path d="M12 14 L16 5"/><line x1="9.8" y1="11.5" x2="11.2" y2="10.2"/></svg>',
      questions: [
        'Do you currently smoke or have you done so in the past?',
        'Do you have diabetes mellitus, hypertension, or high cholesterol?',
        'Have you had a stroke or heart attack?'
      ],
      results: {
        low:      'Your responses do not identify significant cardiovascular risk factors at this time. Maintaining a healthy lifestyle and attending routine check-ups supports ongoing vascular health.',
        moderate: 'One of your responses is associated with carotid artery disease. A conversation with your physician about cardiovascular risk and appropriate screening is a sensible next step.',
        elevated: 'Your responses indicate multiple established risk factors for carotid artery stenosis. A consultation to discuss dedicated vascular imaging of the neck arteries is recommended.'
      }
    },
    {
      id: 'venous',
      name: 'Chronic Venous Hypertension',
      desc: 'Sustained elevated pressure within the leg veins',
      iconHtml: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3 L8 14 C8 18 9.5 21 12 21 C14.5 21 16 18 16 14 L15 3 Z"/><path d="M12 8 C11 11 13 13 12 17"/><polyline points="11 9.5 12 7.5 13 9.5"/></svg>',
      questions: [
        'Does your job or lifestyle involve long periods of standing, walking, or sitting?',
        'Do your legs feel tired, heavy, or tight during the day?',
        'Do you experience leg pain when standing or walking for long periods?',
        'Do you have swelling or visible varicose veins in your legs?',
        'Do you notice skin discoloration around your ankles?',
        'Do you have ulcers or wounds on your legs that are slow to heal?'
      ],
      results: {
        low:      'Your responses do not suggest significant venous insufficiency at this time. Staying physically active and avoiding prolonged static positions supports healthy circulation.',
        moderate: 'Several of your responses are consistent with early venous insufficiency. A vascular review may help determine whether further assessment or treatment is appropriate.',
        elevated: 'Your responses are consistent with chronic venous hypertension. A specialist consultation and venous duplex imaging is the appropriate next step.'
      }
    },
    {
      id: 'pelvic',
      name: 'Pelvic Congestion Syndrome',
      desc: 'Dilated pelvic veins causing chronic lower abdominal pain',
      iconHtml: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19 C4 12 7 7 12 7 C17 7 20 12 20 19"/><line x1="12" y1="7" x2="12" y2="13"/><path d="M12 13 C10 14 8 14 7 16"/><path d="M12 13 C14 14 16 14 17 16"/></svg>',
      questions: [
        'Do you know what pelvic congestion syndrome is?',
        'Do you have persistent lower abdominal pain without a clearly identified cause?',
        'Does the pain worsen when standing or tends to increase as the day progresses?',
        'Do you have varicose veins in the pelvic area or legs?',
        'Are your menstrual periods painful?'
      ],
      results: {
        low:      'Your responses do not suggest a pattern consistent with pelvic congestion syndrome at this time.',
        moderate: 'Some of your responses are associated with pelvic congestion syndrome. A gynaecological and vascular review may be appropriate.',
        elevated: 'Your responses are consistent with several features of pelvic congestion syndrome. A specialist consultation with dedicated pelvic imaging is recommended.'
      }
    },
    {
      id: 'vertebral',
      name: 'Vertebral Compression Fracture',
      desc: 'Collapse of a vertebral body, commonly due to osteoporosis',
      iconHtml: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="4" rx="1"/><rect x="5" y="10" width="14" height="2" rx="0.5"/><rect x="5" y="15" width="14" height="4" rx="1"/></svg>',
      questions: [
        'Do you know what a vertebral compression fracture is?',
        'Have you been diagnosed with osteoporosis?',
        'Are you considered at risk for osteoporotic fractures?',
        'Do you have back pain that may be related to a compression fracture?'
      ],
      results: {
        low:      'Your responses do not indicate significant risk for vertebral compression fracture at this time. Bone health screening at age-appropriate intervals remains advisable.',
        moderate: 'Your responses identify risk factors for vertebral compression fracture. A review of bone density and spinal health with your physician is recommended.',
        elevated: 'Your responses indicate meaningful risk for vertebral compression fracture. We recommend evaluation including bone density testing and possible spinal imaging.'
      }
    },
    {
      id: 'pad',
      name: 'Peripheral Arterial Disease',
      desc: 'Reduced blood flow to the limbs due to arterial narrowing',
      iconHtml: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3 L8 16 C8 19 9 21 12 21 L17 21"/><line x1="13" y1="4" x2="13" y2="12"/><line x1="13" y1="14" x2="13" y2="17" stroke-dasharray="1.5 1.5"/></svg>',
      questions: [
        'Are you older than 40 years?',
        'Do you feel pain, cramping, or fatigue in your legs or buttocks when walking or exercising?',
        'Do you need to hang your legs out of bed at night to relieve discomfort?',
        'Do your legs or feet feel cold, look pale, or have skin that appears shiny or thin?',
        'Do you have a history of smoking?',
        'Do you have diabetes, high cholesterol, or hypertension?',
        'Have you had a stroke or heart attack?',
        'Do you have chronic kidney disease?',
        'Do you have difficulty with circulation-related function?'
      ],
      results: {
        low:      'Your responses do not indicate significant arterial disease at this time. Managing cardiovascular risk factors remains important for long-term vascular health.',
        moderate: 'Several of your responses are associated with peripheral arterial disease. A vascular assessment including ankle-brachial index measurement is a reasonable next step.',
        elevated: 'Your responses indicate multiple risk factors and symptoms consistent with peripheral arterial disease. Prompt vascular evaluation is recommended.'
      }
    },
    {
      id: 'fibroids',
      name: 'Symptomatic Uterine Fibroids',
      desc: 'Non-cancerous uterine growths causing pelvic symptoms',
      iconHtml: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 18 C5 17 3 14 3 11 C3 7 7 5 12 5 C17 5 21 7 21 11 C21 14 19 17 16 18"/><path d="M8 11 C6 10 4 10 3 9"/><path d="M16 11 C18 10 20 10 21 9"/><line x1="12" y1="18" x2="12" y2="22"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="12" r="1"/></svg>',
      questions: [
        'Do you know what uterine fibroids are?',
        'Are your periods heavy, irregular, or painful?',
        'Do close relatives have a history of uterine fibroids?',
        'Do you experience lower abdominal pressure, bloating, or a sense of fullness?',
        'Do you experience frequent or urgent urination?'
      ],
      results: {
        low:      'Your responses do not suggest a pattern consistent with symptomatic uterine fibroids at this time.',
        moderate: 'Some of your responses are associated with uterine fibroids. A gynaecological review and pelvic ultrasound may help clarify your symptoms.',
        elevated: 'Your responses are consistent with symptomatic uterine fibroids. A specialist consultation and pelvic imaging is the recommended next step.'
      }
    }
  ];

  // DOM references (index.html only — guard before using)
  var assessOverlay      = document.getElementById('assessOverlay');
  if (!assessOverlay) { /* skip assess-your-risk init on inner pages */ } else {
  var assessCloseBtn     = document.getElementById('assessClose');
  var assessViewSelect   = document.getElementById('assessViewSelect');
  var assessViewQ        = document.getElementById('assessViewQ');
  var assessViewResult   = document.getElementById('assessViewResult');
  var assessConditions   = document.getElementById('assessConditions');
  var assessCondNameEl   = document.getElementById('assessCondName');
  var assessProgressEl   = document.getElementById('assessProgress');
  var assessQBodyEl      = document.getElementById('assessQBody');
  var assessBackCondBtn  = document.getElementById('assessBackCond');
  var assessBackQBtn     = document.getElementById('assessBackQ');
  var assessResultInner  = document.getElementById('assessResultInner');

  // State
  var assessState = {
    conditionIndex: -1,
    questionIndex:  0,
    answers:        []
  };

  // Build condition list
  CONDITIONS.forEach(function (cond, i) {
    var btn = document.createElement('button');
    btn.className = 'assess-cond-row';
    btn.type = 'button';
    btn.setAttribute('role', 'listitem');
    btn.innerHTML =
      '<span class="assess-cond-icon">' + cond.iconHtml + '</span>' +
      '<span class="assess-cond-text">' +
        '<span class="assess-cond-name">' + cond.name + '</span>' +
        '<span class="assess-cond-desc">' + cond.desc + '</span>' +
      '</span>' +
      '<span class="assess-cond-arrow" aria-hidden="true">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
      '</span>';
    btn.addEventListener('click', function () { selectCondition(i); });
    assessConditions.appendChild(btn);
  });

  // Open / close
  function openOverlay () {
    assessState.conditionIndex = -1;
    assessState.questionIndex  = 0;
    assessState.answers        = [];
    showView(assessViewSelect);
    assessOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    assessCloseBtn.focus();
  }

  function closeOverlay () {
    assessOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // View management
  function showView (targetView) {
    [assessViewSelect, assessViewQ, assessViewResult].forEach(function (v) {
      v.hidden = true;
    });
    targetView.hidden = false;
  }

  // Condition selection
  function selectCondition (i) {
    assessState.conditionIndex = i;
    assessState.questionIndex  = 0;
    assessState.answers        = [];
    assessCondNameEl.textContent = CONDITIONS[i].name;
    showView(assessViewQ);
    renderQuestion();
  }

  // Render one question
  function renderQuestion () {
    var cond  = CONDITIONS[assessState.conditionIndex];
    var qi    = assessState.questionIndex;
    var total = cond.questions.length;

    assessProgressEl.textContent = 'Question ' + (qi + 1) + ' of ' + total;

    if (qi > 0) {
      assessBackQBtn.classList.add('is-visible');
    } else {
      assessBackQBtn.classList.remove('is-visible');
    }

    var div = document.createElement('div');
    div.className = 'assess-question';

    var p = document.createElement('p');
    p.className   = 'assess-q-text';
    p.textContent = cond.questions[qi];

    var yn   = document.createElement('div');
    yn.className = 'assess-yn';

    var yBtn = document.createElement('button');
    yBtn.type        = 'button';
    yBtn.className   = 'assess-yn-btn';
    yBtn.textContent = 'Yes';

    var nBtn = document.createElement('button');
    nBtn.type        = 'button';
    nBtn.className   = 'assess-yn-btn';
    nBtn.textContent = 'No';

    // Restore prior answer when navigating back
    var prior = assessState.answers[qi];
    if (prior === true)  yBtn.classList.add('is-selected');
    if (prior === false) nBtn.classList.add('is-selected');

    function handleAnswer (isYes) {
      yBtn.disabled = true;
      nBtn.disabled = true;
      yBtn.classList.toggle('is-selected',  isYes);
      nBtn.classList.toggle('is-selected', !isYes);
      assessState.answers[qi] = isYes;

      setTimeout(function () {
        if (qi + 1 < cond.questions.length) {
          assessState.questionIndex = qi + 1;
          assessQBodyEl.innerHTML = '';
          renderQuestion();
        } else {
          showLoading();
        }
      }, 260);
    }

    yBtn.addEventListener('click', function () { handleAnswer(true);  });
    nBtn.addEventListener('click', function () { handleAnswer(false); });

    yn.appendChild(yBtn);
    yn.appendChild(nBtn);
    div.appendChild(p);
    div.appendChild(yn);

    assessQBodyEl.innerHTML = '';
    assessQBodyEl.appendChild(div);
  }

  // Loading state (pre-result)
  function showLoading () {
    assessQBodyEl.innerHTML =
      '<div class="assess-loading"><span></span><span></span><span></span></div>';
    assessProgressEl.textContent = '';
    assessBackQBtn.classList.remove('is-visible');
    setTimeout(showResult, 700);
  }

  // Calculate and render result
  function showResult () {
    var cond     = CONDITIONS[assessState.conditionIndex];
    var yesCount = assessState.answers.filter(Boolean).length;
    var total    = cond.questions.length;

    var level;
    if (yesCount <= Math.floor(total * 0.33)) {
      level = 'low';
    } else if (yesCount <= Math.floor(total * 0.66)) {
      level = 'moderate';
    } else {
      level = 'elevated';
    }

    var levelLabel = {
      low:      'Low risk profile.',
      moderate: 'Moderate risk indicators.',
      elevated: 'Elevated risk profile.'
    }[level];

    var wrapper = document.createElement('div');

    var condLabel = document.createElement('p');
    condLabel.className   = 'assess-result__cond';
    condLabel.textContent = cond.name;

    var headline = document.createElement('h2');
    headline.className   = 'assess-result__level';
    headline.textContent = levelLabel;

    var body = document.createElement('p');
    body.className   = 'assess-result__body';
    body.textContent = cond.results[level];

    var disclaimer = document.createElement('p');
    disclaimer.className   = 'assess-result__disclaimer';
    disclaimer.textContent =
      'This is not a diagnosis. These responses are intended as a starting point for a conversation with a qualified medical specialist. Please consult your physician for clinical assessment and advice.';

    var actions = document.createElement('div');
    actions.className = 'assess-result__actions';

    var ctaLink = document.createElement('a');
    ctaLink.className   = 'btn btn--primary';
    ctaLink.href        = '#contact';
    ctaLink.textContent = 'Schedule a Consultation';
    ctaLink.addEventListener('click', closeOverlay);

    var restartBtn = document.createElement('button');
    restartBtn.type        = 'button';
    restartBtn.className   = 'assess-result__restart';
    restartBtn.textContent = 'Start a new assessment';
    restartBtn.addEventListener('click', openOverlay);

    actions.appendChild(ctaLink);
    actions.appendChild(restartBtn);

    wrapper.appendChild(condLabel);
    wrapper.appendChild(headline);
    wrapper.appendChild(body);
    wrapper.appendChild(disclaimer);
    wrapper.appendChild(actions);

    assessResultInner.innerHTML = '';
    assessResultInner.appendChild(wrapper);
    showView(assessViewResult);
  }

  // Back: previous question
  assessBackQBtn.addEventListener('click', function () {
    if (assessState.questionIndex > 0) {
      assessState.questionIndex--;
      assessQBodyEl.innerHTML = '';
      renderQuestion();
    }
  });

  // Back: change condition
  assessBackCondBtn.addEventListener('click', function () {
    assessState.conditionIndex = -1;
    assessState.questionIndex  = 0;
    assessState.answers        = [];
    showView(assessViewSelect);
  });

  // Close button
  assessCloseBtn.addEventListener('click', closeOverlay);

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && assessOverlay.classList.contains('is-open')) {
      closeOverlay();
    }
  });

  // Entry points
  var startAssessmentBtn = document.getElementById('startAssessment');
  if (startAssessmentBtn) {
    startAssessmentBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openOverlay();
    });
  }

  // Legacy hero CTA hook kept for compatibility
  var heroCta = document.querySelector('.entry__cta');
  if (heroCta) {
    heroCta.addEventListener('click', function (e) {
      e.preventDefault();
      openOverlay();
    });
  }

  } // end assessOverlay guard


  /* ----------------------------------------------------------
     5b. Risk Diagram — Living Geometric Field (Canvas)
  ---------------------------------------------------------- */
  (function () {
    'use strict';

    var canvas  = document.getElementById('diagCanvas');
    var diagram = document.getElementById('assessDiagram');
    var riskBtn = document.getElementById('startAssessment');
    if (!canvas || !diagram) return;

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var raf, t = 0, last = 0;
    var activation = 0, targetActivation = 0, pulsePhase = 0;
    var supportsFilter = typeof ctx.filter !== 'undefined';

    /* ── Field definition ──────────────────────────────────── */

    // Tension poles (normalized 0–1 of canvas)
    var POLES = [
      { u: 0.38, v: 0.36, s: 1.0 },   // primary — upper-left zone
      { u: 0.62, v: 0.64, s: 0.72 }   // secondary — lower-right zone
    ];

    // Curve definitions.
    // r0  = base radius as fraction of min(W,H)/2
    // w   = stroke width px  (accent lines are heavier)
    // lay = depth layer: 0=atmosphere, 1=mid, 2=foreground, 3=core
    // p0  = breathing phase offset per curve
    // H   = harmonics [ {a, n, phi, om} ]
    var CURVES = [
      // Layer 0 — atmosphere (always blurred, lowest presence)
      { r0:0.88, w:0.65, lay:0, p0:0.00, H:[{a:0.038,n:2,phi:0.00,om:5.0e-4},{a:0.014,n:3,phi:1.80,om:3.6e-4}] },
      { r0:0.78, w:0.65, lay:0, p0:0.75, H:[{a:0.042,n:3,phi:0.60,om:5.8e-4},{a:0.017,n:4,phi:2.40,om:4.3e-4}] },
      { r0:0.68, w:0.70, lay:0, p0:1.40, H:[{a:0.048,n:2,phi:1.20,om:5.3e-4},{a:0.020,n:5,phi:0.40,om:4.0e-4}] },
      // Layer 1 — mid field
      { r0:0.58, w:0.90, lay:1, p0:0.30, H:[{a:0.055,n:3,phi:1.80,om:6.2e-4},{a:0.022,n:4,phi:0.80,om:4.8e-4},{a:0.009,n:6,phi:2.20,om:2.9e-4}] },
      { r0:0.50, w:1.60, lay:1, p0:1.80, H:[{a:0.060,n:4,phi:0.40,om:5.6e-4},{a:0.025,n:3,phi:1.40,om:4.6e-4},{a:0.010,n:5,phi:3.00,om:3.3e-4}] }, // accent
      { r0:0.42, w:0.95, lay:1, p0:0.90, H:[{a:0.064,n:3,phi:2.00,om:6.8e-4},{a:0.027,n:5,phi:0.60,om:5.0e-4},{a:0.012,n:2,phi:1.60,om:3.8e-4}] },
      { r0:0.34, w:0.90, lay:1, p0:2.50, H:[{a:0.068,n:4,phi:0.80,om:6.0e-4},{a:0.029,n:3,phi:2.60,om:4.3e-4}] },
      // Layer 2 — foreground (primary visual weight)
      { r0:0.27, w:1.10, lay:2, p0:1.20, H:[{a:0.070,n:3,phi:1.60,om:6.6e-4},{a:0.030,n:5,phi:0.20,om:5.3e-4},{a:0.014,n:4,phi:2.80,om:3.8e-4}] },
      { r0:0.19, w:1.45, lay:2, p0:2.10, H:[{a:0.066,n:4,phi:0.20,om:7.2e-4},{a:0.027,n:6,phi:1.00,om:5.6e-4}] }, // accent
      { r0:0.12, w:1.05, lay:2, p0:0.50, H:[{a:0.058,n:5,phi:2.80,om:7.8e-4},{a:0.023,n:3,phi:0.50,om:5.8e-4}] },
      // Layer 3 — core (sharpens and thickens on activation)
      { r0:0.07, w:1.35, lay:3, p0:1.60, H:[{a:0.044,n:3,phi:1.00,om:6.8e-4},{a:0.017,n:4,phi:2.20,om:5.3e-4}] }
    ];

    // [defaultOpacity, activatedOpacity] per depth layer
    // Boosted for visibility on the dark Interactive Tool gradient.
    var L_OP = [
      [0.22, 0.12],    // atmosphere — recedes on activation
      [0.45, 0.58],    // mid
      [0.78, 0.90],    // foreground
      [0.88, 0.96]     // core — most defined
    ];

    // Signal nodes: small points on or near specific curve paths.
    // ci  = CURVES index  (node sits on this curve's contour)
    // ang = polar angle in radians (starting position)
    // spd = angular velocity in rad/ms (0 = static; negative = clockwise)
    // r   = dot radius px
    // lay = depth layer (inherits from curve)
    // pf  = opacity breathing frequency rad/ms
    // pp  = opacity breathing phase offset
    // hov = true → hidden at rest, fades in on activation
    var NODES = [
      // Orbital: travel very slowly along accent curves
      { ci:4, ang:0.42, spd: 6.2e-5, r:1.2, lay:1, pf:8.5e-4, pp:0.0, hov:false },  // mid accent  r0=0.50
      { ci:8, ang:2.85, spd:-3.8e-5, r:1.0, lay:2, pf:7.0e-4, pp:1.8, hov:false },  // fg  accent  r0=0.19

      // Static: fixed angle on curve, moves with the curve's own breathing
      { ci:7, ang:1.15, spd:0,       r:1.0, lay:2, pf:9.0e-4, pp:0.9, hov:false },  // fg          r0=0.27
      { ci:5, ang:3.60, spd:0,       r:0.9, lay:1, pf:6.5e-4, pp:2.4, hov:false },  // mid         r0=0.42

      // Atmospheric: bg layer, drawn blurred, barely present
      { ci:2, ang:0.85, spd:0,       r:0.8, lay:0, pf:5.5e-4, pp:1.3, hov:false },  // atmosphere  r0=0.68

      // Hover-only: orbital, fades in only on activation
      { ci:9, ang:0.62, spd: 2.8e-5, r:1.0, lay:2, pf:8.0e-4, pp:3.1, hov:true  }   // fg          r0=0.12
    ];

    var AR = 130, AG = 170, AB = 205; // base colour: lifted blue for dark bg legibility

    /* ── Canvas resize ─────────────────────────────────────── */
    function resize() {
      var W = diagram.clientWidth  || 440;
      var H = diagram.clientHeight || 490;
      canvas.width        = W * dpr;
      canvas.height       = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
    }

    /* ── Point on a curve at given polar angle ─────────────── */
    function point(c, angle, W, H) {
      var hm  = Math.min(W, H) * 0.5;
      var act = activation;

      // Slow orbital center drift
      var cx = W * 0.5 + hm * 0.020 * Math.sin(t * 2.8e-4);
      var cy = H * 0.5 + hm * 0.015 * Math.cos(t * 3.2e-4 + 1.1);

      // Per-curve breathing (slow, restrained)
      var breathe = 0.013 * Math.sin(t * 3.5e-4 + c.p0 * 0.6);

      // Harmonic deformations — amplified on activation
      var d = breathe;
      for (var k = 0; k < c.H.length; k++) {
        var h = c.H[k];
        d += h.a * (1 + act * 0.80) * Math.sin(h.n * angle + h.phi + t * h.om);
      }

      // Tension pole Gaussian pull (localized deformation on activation)
      for (var p = 0; p < POLES.length; p++) {
        var pole   = POLES[p];
        var pAngle = Math.atan2(pole.v - 0.5, pole.u - 0.5);
        var diff   = angle - pAngle;
        diff -= Math.round(diff / (2 * Math.PI)) * 2 * Math.PI;
        var gauss  = Math.exp(-diff * diff * 5.5);
        var bump   = act * pole.s * 0.046 * Math.sin(t * 5.2e-4 + p * 1.3);
        d += gauss * bump;
      }

      // Inward pull — field contracts toward center on activation
      var r = c.r0 * hm * (1 + d) * (1 - act * 0.048);
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }

    /* ── Draw one contour curve ─────────────────────────────── */
    function drawCurve(c, W, H) {
      var lo = L_OP[c.lay];
      var op = lo[0] + (lo[1] - lo[0]) * activation;

      // Pulse brightness wave — travels outward from core through each layer
      if (activation > 0.25) {
        var pAmt = Math.min(1, (activation - 0.25) * 1.35);
        var waveR = 0.07 + pulsePhase * 0.81;
        var dist  = c.r0 - waveR;
        var boost = pAmt * 0.11 * Math.exp(-dist * dist * 52);
        op = Math.min(0.92, op + boost);
      }

      // Core line thickens slightly on activation
      var lw = c.lay === 3 ? c.w * (1 + activation * 0.38) : c.w;

      ctx.strokeStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + op.toFixed(3) + ')';
      ctx.lineWidth   = lw;

      var N = 160;
      ctx.beginPath();
      for (var i = 0; i <= N; i++) {
        var ang = (i / N) * Math.PI * 2;
        var pt  = point(c, ang, W, H);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else          ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    /* ── Draw signal nodes (fg and mid layers) ─────────────── */
    // Called after ctx.filter = 'none' — nodes are sharp
    function drawSignalNodes(W, H) {
      for (var i = 0; i < NODES.length; i++) {
        var n = NODES[i];
        if (n.lay === 0) continue; // bg nodes handled separately

        // Hover-only: invisible until activation crosses threshold
        if (n.hov && activation < 0.22) continue;

        var c  = CURVES[n.ci];
        var pt = point(c, n.ang, W, H);

        // Base opacity by layer
        var base = n.lay === 1 ? 0.28 : 0.36;

        // Activation boost
        var boost;
        if (n.hov) {
          boost = Math.max(0, (activation - 0.22) / 0.78) * 0.30;
        } else {
          boost = activation * (n.lay === 1 ? 0.18 : 0.22);
        }

        // Slow opacity breathing
        var breathe = 0.05 * Math.sin(t * n.pf + n.pp);

        var op = Math.max(0, Math.min(0.52, base + boost + breathe));

        // Subtle size breathing on fg nodes
        var r = n.r * 1.8;
        if (n.lay === 2) r = n.r * 1.8 * (0.88 + 0.12 * Math.sin(t * n.pf * 0.6 + n.pp));

        ctx.fillStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + op.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(0.3, r), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ── Draw atmospheric signal node (bg layer, blurred) ──── */
    // Called while blur filter is still active on the atmosphere pass
    function drawAtmosphericNode(W, H) {
      for (var i = 0; i < NODES.length; i++) {
        var n = NODES[i];
        if (n.lay !== 0) continue;

        var c  = CURVES[n.ci];
        var pt = point(c, n.ang, W, H);

        var breathe = 0.04 * Math.sin(t * n.pf + n.pp);
        var op = Math.max(0, Math.min(0.25, 0.07 + activation * 0.10 + breathe));

        ctx.fillStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + op.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ── Main tension node — primary diagnostic point ────────── */
    function drawNode(W, H) {
      var pole = POLES[0];
      var px   = pole.u * W;
      var py   = pole.v * H;

      // Dot — present at rest (very faint), solidifies on activation
      var dotOp = 0.07 + activation * 0.44;
      var dotR  = 1.1 + activation * 0.9
                + Math.sin(t * 5.8e-4) * 0.22 * activation;
      ctx.fillStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + dotOp.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(px, py, Math.max(0.4, dotR), 0, Math.PI * 2);
      ctx.fill();

      // Single orbit ring — fades in on activation
      if (activation > 0.08) {
        var ringOp = activation * 0.18;
        var ringR  = 7 + activation * 5;
        ctx.strokeStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + ringOp.toFixed(3) + ')';
        ctx.lineWidth   = 0.4;
        ctx.beginPath();
        ctx.arc(px, py, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Secondary tension node — emerges on stronger activation
      if (activation > 0.38) {
        var pole2 = POLES[1];
        var px2   = pole2.u * W;
        var py2   = pole2.v * H;
        var op2   = ((activation - 0.38) / 0.62) * 0.28;
        ctx.fillStyle = 'rgba(' + AR + ',' + AG + ',' + AB + ',' + op2.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(px2, py2, 1.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ── Main render loop ──────────────────────────────────── */
    function render(ts) {
      if (!last) last = ts;
      var dt = Math.min(ts - last, 50);
      last = ts;
      t   += dt;

      // Advance orbital node angles
      var twoPi = Math.PI * 2;
      for (var i = 0; i < NODES.length; i++) {
        if (NODES[i].spd !== 0) {
          NODES[i].ang = ((NODES[i].ang + dt * NODES[i].spd) % twoPi + twoPi) % twoPi;
        }
      }

      // Pulse phase — advances proportional to activation
      if (activation > 0.25) {
        var rate = Math.min(1, (activation - 0.25) * 4);
        pulsePhase = (pulsePhase + dt * 1.55e-4 * rate) % 1;
      }

      // Smooth activation: measured in, slow release
      var spd = activation < targetActivation ? 0.026 : 0.016;
      activation += (targetActivation - activation) * spd;

      var W = canvas.width  / dpr;
      var H = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // ── Atmosphere pass: blurred bg curves + atmospheric node
      if (supportsFilter) {
        ctx.filter = 'blur(' + (0.6 + activation * 1.1).toFixed(1) + 'px)';
      }
      for (var i = 0; i < 3; i++) drawCurve(CURVES[i], W, H);
      drawAtmosphericNode(W, H);   // drawn within the blur pass — inherits depth

      // ── Sharp pass: mid, foreground, core + signal nodes + tension nodes
      ctx.filter = 'none';
      for (var i = 3; i < CURVES.length; i++) drawCurve(CURVES[i], W, H);
      drawSignalNodes(W, H);
      drawNode(W, H);

      raf = requestAnimationFrame(render);
    }

    /* ── Hover cross-trigger ───────────────────────────────── */
    function setLevel(level) { targetActivation = level; }

    function leaveCheck(e) {
      var to = e.relatedTarget;
      if (!to) { setLevel(0); return; }
      var overDiag = diagram.contains(to) || diagram === to;
      var overBtn  = riskBtn && (riskBtn.contains(to) || riskBtn === to);
      if (!overDiag && !overBtn) setLevel(0);
    }

    diagram.addEventListener('mouseenter', function () { setLevel(0.62); });
    diagram.addEventListener('mouseleave', leaveCheck);

    if (riskBtn) {
      riskBtn.addEventListener('mouseenter', function () { setLevel(1.0); });
      riskBtn.addEventListener('mouseleave', leaveCheck);
    }

    /* ── Init ──────────────────────────────────────────────── */
    resize();
    window.addEventListener('resize', function () {
      cancelAnimationFrame(raf);
      resize();
      last = 0;
      raf = requestAnimationFrame(render);
    }, { passive: true });

    raf = requestAnimationFrame(render);

  }());



  /* ----------------------------------------------------------
     6. Contact form
  ---------------------------------------------------------- */

  var contactForm  = document.getElementById('contactForm');
  var formSuccess  = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactForm.style.display = 'none';
      formSuccess.style.display = 'flex';
    });
  }


  /* ----------------------------------------------------------
     7. Hero scroll choreography
     Left content  : fade out as scroll progresses
     Right media   : sticky (CSS), subtle scale for depth
     Float sections: gentle center-relative offset
  ---------------------------------------------------------- */

  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var heroContent = document.querySelector('.entry__content');
    var heroMediaBg = document.querySelector('.entry__media-bg');
    var heroSection = document.querySelector('.entry');
    var floatEls    = document.querySelectorAll('[data-parallax="float"]');
    var rafPending  = false;

    function runScroll() {
      var sy    = window.scrollY;
      var vh    = window.innerHeight;
      var heroH = heroSection ? heroSection.offsetHeight : vh * 1.6;

      // ── Left text: fade out cleanly ────────────────────────
      // Window: 40%–85% of viewport height scrolled
      if (heroContent && window.innerWidth > 640) {
        var eStart = vh * 0.40;
        var eEnd   = vh * 0.85;
        var prog   = Math.max(0, Math.min(1, (sy - eStart) / (eEnd - eStart)));
        // Ease-out: starts fading quickly, slows at the end
        var eased  = 1 - Math.pow(1 - prog, 2);
        heroContent.style.opacity = Math.max(0, 1 - eased).toFixed(3);
        heroContent.style.transform = '';
      }

      // ── Right media: subtle scale for depth ────────────────
      // Scale 1.000 → 1.018 across the full hero scroll
      if (heroMediaBg) {
        var heroProgress = Math.max(0, Math.min(1, sy / Math.max(1, heroH - vh)));
        var scale = 1 + heroProgress * 0.018;
        heroMediaBg.style.transform = 'scale(' + scale.toFixed(4) + ')';
      }

      // ── Below-hero float sections ───────────────────────────
      for (var i = 0; i < floatEls.length; i++) {
        var el   = floatEls[i];
        var rect = el.getBoundingClientRect();
        var mid  = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = 'translateY(' + (mid * 0.055).toFixed(1) + 'px)';
      }

      rafPending = false;
    }

    function scheduleScroll() {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(runScroll);
      }
    }

    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', scheduleScroll, { passive: true });
    runScroll();
  }



  /* ----------------------------------------------------------
     8. Scroll-reveal
     Two variants:
       will-reveal        — slide up from bottom (all page sections)
       will-reveal--left  — slide in from left   (hero text only)

     Hero elements are set up with explicit stagger order (0–4)
     because they live in different parent elements (h1 vs div)
     so sibling-counting can't give the right sequence.
  ---------------------------------------------------------- */

  // ── Entry text: left-slide, staircase order, fires on load ──
  var heroRevealEls = [
    document.querySelector('.entry__label'),
    document.querySelector('.entry__headline .entry__line:nth-child(1)'),
    document.querySelector('.entry__headline .entry__line:nth-child(2)'),
    document.querySelector('.entry__headline .entry__line:nth-child(3)'),
    document.querySelector('.entry__headline .entry__line:nth-child(4)'),
    document.querySelector('.entry__actions')
  ];

  heroRevealEls.forEach(function (el, i) {
    if (!el) return;
    el.classList.add('will-reveal--left');
    el.style.setProperty('--stagger-i', i);
  });

  // ── Rest of page: bottom-up reveal on scroll ─────────────
  var REVEAL_QUERY = [
    '.section__label',
    '.section__header h2',
    '.section__desc',
    '.split__text h2',
    '.split__text > p',
    '.split__text .btn',
    '.feature-list li',
    '.disclaimer',
    '.procedure-item',
    '.proc-card',
    '.proc-cat-item',
    '.edu-preview__card',
    '.case-card',
    '.edu-card',
    '.trust-strip__item',
    '.dr-block__text h2',
    '.dr-block__text > p',
    '.dr-block__credentials',
    '.dr-block__actions',
    '.contact__text h2',
    '.contact__text > p',
    '.entry__nav-item'
  ].join(', ');

  var revealEls = Array.prototype.slice.call(
    document.querySelectorAll(REVEAL_QUERY)
  );

  revealEls.forEach(function (el) {
    el.classList.add('will-reveal');
    var staggerI = 0;
    var sib = el.previousElementSibling;
    while (sib) {
      if (sib.classList.contains('will-reveal')) staggerI++;
      sib = sib.previousElementSibling;
    }
    el.style.setProperty('--stagger-i', staggerI);
  });

  // ── IntersectionObserver (shared for both sets) ───────────
  if (!prefersReducedMotion) {
    var allRevealEls = heroRevealEls.filter(Boolean).concat(revealEls);

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        } else {
          entry.target.classList.remove('revealed');
        }
      });
    }, { threshold: 0.15 });

    allRevealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

  } else {
    var allRevealEls = heroRevealEls.filter(Boolean).concat(revealEls);
    allRevealEls.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }


  /* ----------------------------------------------------------
     9. Stat counters — count from 00 to target on scroll-in,
        reset and replay each time the section re-enters view.
  ---------------------------------------------------------- */
  var COUNTER_DURATION = 2000; // ms

  function formatCount(value, target) {
    var targetStr = String(target);
    var valueStr  = String(value);
    while (valueStr.length < targetStr.length) {
      valueStr = '0' + valueStr;
    }
    return valueStr;
  }

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start  = null;
    var rafId;
    var last   = -1; // track last displayed integer to skip redundant DOM writes

    function step(timestamp) {
      if (!start) start = timestamp;
      var elapsed  = timestamp - start;
      var progress = Math.min(elapsed / COUNTER_DURATION, 1);

      // Sinusoidal ease-in-out: slow start, accelerates through middle,
      // eases out smoothly — each integer gets roughly equal screen time
      var eased   = 0.5 - 0.5 * Math.cos(Math.PI * progress);
      var current = Math.floor(eased * target);

      // Only write to the DOM when the displayed integer actually changes
      if (current !== last) {
        el.textContent = formatCount(current, target) + suffix;
        last = current;
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        // Guarantee the exact final value is always shown
        el.textContent = String(target) + suffix;
      }
    }

    rafId = requestAnimationFrame(step);
    el._counterRaf = rafId;
  }

  function resetCounter(el) {
    if (el._counterRaf) {
      cancelAnimationFrame(el._counterRaf);
      el._counterRaf = null;
    }
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    el.textContent = formatCount(0, target) + suffix;
  }

  var counterEls = document.querySelectorAll('[data-count]');

  if (!prefersReducedMotion && counterEls.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCounter(entry.target);
        } else {
          resetCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(function (el) {
      counterObserver.observe(el);
    });

  } else {
    // Reduced-motion or no JS observer: show final values immediately
    counterEls.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = String(target) + suffix;
    });
  }


  /* ----------------------------------------------------------
     10. Nav — Procedures Dropdown
  ---------------------------------------------------------- */
  var procTrigger  = document.getElementById('navProcTrigger');
  var procDropdown = document.getElementById('navProcDropdown');
  var procWrap     = document.getElementById('navProcDropWrap');

  if (procTrigger && procDropdown) {

    function openProcDropdown() {
      procTrigger.setAttribute('aria-expanded', 'true');
      procDropdown.classList.add('is-open');
    }

    function closeProcDropdown() {
      procTrigger.setAttribute('aria-expanded', 'false');
      procDropdown.classList.remove('is-open');
    }

    procTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (procTrigger.getAttribute('aria-expanded') === 'true') {
        closeProcDropdown();
      } else {
        openProcDropdown();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (procWrap && !procWrap.contains(e.target)) {
        closeProcDropdown();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeProcDropdown();
    });
  }


  /* ----------------------------------------------------------
     11. Accordion — All Procedures & Patient Education
  ---------------------------------------------------------- */
  var procAccordions = document.querySelectorAll('.proc-accordion');

  procAccordions.forEach(function (procAccordion) {
    var accordionTriggers = procAccordion.querySelectorAll('.proc-accordion__trigger');

    accordionTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item   = trigger.closest('.proc-accordion__item');
        var isOpen = item.classList.contains('is-open');

        // Close all items in this accordion
        accordionTriggers.forEach(function (t) {
          t.setAttribute('aria-expanded', 'false');
          t.closest('.proc-accordion__item').classList.remove('is-open');
        });

        // Open clicked item if it was closed
        if (!isOpen) {
          trigger.setAttribute('aria-expanded', 'true');
          item.classList.add('is-open');
        }
      });
    });
  });

  // Auto-open item that matches the URL hash on load
  if (procAccordions.length && window.location.hash) {
    var hashTarget = document.querySelector(window.location.hash);
    if (hashTarget && hashTarget.classList.contains('proc-accordion__item')) {
      hashTarget.classList.add('is-open');
      var hashTrigger = hashTarget.querySelector('.proc-accordion__trigger');
      if (hashTrigger) hashTrigger.setAttribute('aria-expanded', 'true');
    }
  }

  /* ----------------------------------------------------------
     11b. Inner expandable items (Stenting, Atherectomy, …)
     Independent toggles — multiple can be open at once.
  ---------------------------------------------------------- */
  var procItemTriggers = document.querySelectorAll('.proc-item__trigger');

  procItemTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var item   = trigger.closest('.proc-item');
      var isOpen = item.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });



  /* ----------------------------------------------------------
     Education page: scroll-spy for category tabs
  ---------------------------------------------------------- */
  var edTabs = document.getElementById('edTabs');
  if (edTabs) {
    var edTabLinks = edTabs.querySelectorAll('.ed-tab');
    var edGroups   = Array.from(document.querySelectorAll('.ed-group[id]'));
    var tabOffset  = (nav ? nav.offsetHeight : 0) + (edTabs.offsetHeight || 44) + 24;

    function updateEdTab() {
      var scrollY  = window.scrollY;
      var current  = edGroups[0] ? edGroups[0].id : '';

      edGroups.forEach(function (group) {
        if (group.getBoundingClientRect().top + scrollY - tabOffset <= scrollY) {
          current = group.id;
        }
      });

      edTabLinks.forEach(function (link) {
        var href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('is-active', href === current);
      });
    }

    window.addEventListener('scroll', updateEdTab, { passive: true });
    updateEdTab();
  }


  /* ----------------------------------------------------------
     Treatment Cases — search filter + sidenav scroll-spy
  ---------------------------------------------------------- */
  var tcArchive = document.getElementById('tcArchive');
  if (tcArchive) {

    // -- Search / filter ------------------------------------
    var tcSearch = document.getElementById('tcSearch');
    var tcCount  = document.getElementById('tcCount');
    var tcEmpty  = document.getElementById('tcEmpty');
    var tcCategories = Array.from(tcArchive.querySelectorAll('.tc-category'));

    function tcNormalize(s) { return (s || '').toLowerCase().trim(); }

    function tcFilter(query) {
      var q = tcNormalize(query);
      var visible = 0;
      var anyCategoryVisible = false;

      tcCategories.forEach(function (cat) {
        var catName = tcNormalize(cat.getAttribute('data-cat'));
        var cases   = Array.from(cat.querySelectorAll('.tc-case'));
        var catHasMatch = false;

        cases.forEach(function (row) {
          var title = tcNormalize(row.textContent);
          var match = !q || title.indexOf(q) !== -1 || catName.indexOf(q) !== -1;
          row.hidden = !match;
          if (match) { catHasMatch = true; visible++; }
        });

        cat.hidden = !catHasMatch;
        if (catHasMatch) anyCategoryVisible = true;
      });

      if (tcCount) tcCount.textContent = visible;
      if (tcEmpty) tcEmpty.hidden = anyCategoryVisible;
    }

    if (tcSearch) {
      tcSearch.addEventListener('input', function (e) {
        tcFilter(e.target.value);
      });
    }
  }

})();
