(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════════════════
     STYLES – injected once
  ═══════════════════════════════════════════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('pf-styles')) return;
    const s = document.createElement('style');
    s.id = 'pf-styles';
    s.textContent = `
      /* ── Scroll Progress Bar ── */
      #pf-progress {
        position: fixed; top: 0; left: 0; height: 3px; width: 0;
        z-index: 99999; pointer-events: none;
        background: linear-gradient(90deg, #a855f7 0%, #00ffff 100%);
        box-shadow: 0 0 10px rgba(0,255,255,0.55), 0 0 4px rgba(168,85,247,0.5);
        transition: width 0.08s linear;
      }

      /* ── Typing cursor ── */
      .pf-cursor {
        color: #00ffff;
        animation: pf-blink 0.75s step-end infinite;
        font-weight: 300;
      }
      @keyframes pf-blink { 0%,100%{opacity:1} 50%{opacity:0} }

      /* ── Modern Stat Cards (CGPA / %) ── */
      .pf-stat-card {
        position: relative;
        padding: 18px 20px 16px;
        border-radius: 16px;
        background: rgba(255,255,255,0.035);
        border: 1px solid rgba(255,255,255,0.09);
        backdrop-filter: blur(14px);
        overflow: hidden;
        transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.25s ease;
        min-width: 130px;
        flex-shrink: 0;
      }
      .pf-stat-card:hover {
        border-color: rgba(168,85,247,0.45);
        box-shadow: 0 0 28px rgba(168,85,247,0.14);
        transform: translateY(-2px);
      }
      .pf-stat-card::before {
        content: '';
        position: absolute; inset: 0;
        background: linear-gradient(140deg, rgba(168,85,247,0.07) 0%, rgba(0,255,255,0.03) 60%, transparent 100%);
        pointer-events: none;
      }
      .pf-stat-label {
        font-size: 9px; font-weight: 700; letter-spacing: 0.13em;
        text-transform: uppercase; color: rgba(255,255,255,0.32);
        margin: 0 0 9px; display: block;
      }
      .pf-stat-num-wrap { display: flex; align-items: baseline; gap: 3px; margin-bottom: 3px; }
      .pf-stat-num {
        font-size: 36px; font-weight: 900; line-height: 1;
        font-family: 'Segoe UI', system-ui, sans-serif;
        letter-spacing: -1.5px;
        background: linear-gradient(135deg, #c084fc 0%, #00ffff 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .pf-stat-unit {
        font-size: 13px; font-weight: 600;
        color: rgba(255,255,255,0.28);
        -webkit-text-fill-color: rgba(255,255,255,0.28);
      }
      .pf-stat-sub {
        font-size: 10px; color: rgba(255,255,255,0.38);
        margin: 2px 0 10px; display: block;
      }
      .pf-bar-track {
        height: 3px; border-radius: 99px;
        background: rgba(255,255,255,0.07);
        overflow: hidden;
      }
      .pf-bar-fill {
        height: 100%; border-radius: 99px; width: 0%;
        background: linear-gradient(90deg, #a855f7, #00ffff);
        box-shadow: 0 0 6px rgba(0,255,255,0.35);
        transition: width 1.5s cubic-bezier(0.16,1,0.3,1);
      }

      /* ── Project Story Drawer ── */
      #pf-overlay {
        position: fixed; inset: 0; z-index: 9990;
        background: rgba(0,0,0,0.55);
        backdrop-filter: blur(5px);
        opacity: 0; pointer-events: none;
        transition: opacity 0.32s ease;
      }
      #pf-overlay.open { opacity: 1; pointer-events: all; }

      #pf-drawer {
        position: fixed; top: 0; right: 0; bottom: 0;
        width: min(460px, 94vw);
        z-index: 9991;
        background: rgba(10,10,14,0.92);
        backdrop-filter: blur(28px) saturate(1.5);
        border-left: 1px solid rgba(168,85,247,0.22);
        box-shadow: -16px 0 56px rgba(0,0,0,0.7);
        transform: translateX(105%);
        transition: transform 0.38s cubic-bezier(0.32,0.72,0,1);
        display: flex; flex-direction: column;
        overflow: hidden;
      }
      #pf-drawer.open { transform: translateX(0); }

      .pfd-head {
        position: sticky; top: 0;
        padding: 18px 22px 14px;
        background: rgba(10,10,14,0.97);
        border-bottom: 1px solid rgba(255,255,255,0.06);
        display: flex; align-items: center; justify-content: space-between;
        flex-shrink: 0;
      }
      .pfd-tag {
        font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
        text-transform: uppercase; padding: 4px 11px; border-radius: 20px;
        color: var(--dc, #00ffff);
        background: color-mix(in srgb, var(--dc, #00ffff) 10%, transparent);
        border: 1px solid color-mix(in srgb, var(--dc, #00ffff) 28%, transparent);
      }
      .pfd-close {
        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09);
        color: rgba(255,255,255,0.7); width: 32px; height: 32px;
        border-radius: 8px; cursor: pointer; font-size: 16px;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s, color 0.2s;
      }
      .pfd-close:hover { background: rgba(255,255,255,0.1); color: #fff; }

      .pfd-body { padding: 22px 22px 28px; overflow-y: auto; flex: 1; }

      .pfd-title {
        font-size: 24px; font-weight: 800; color: #fff;
        margin: 0 0 12px; line-height: 1.2;
        background: linear-gradient(125deg, #fff 40%, var(--dc, #00ffff));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .pfd-desc {
        font-size: 14px; line-height: 1.75; color: rgba(255,255,255,0.65);
        margin: 0 0 22px;
      }
      .pfd-section-label {
        font-size: 9px; font-weight: 700; letter-spacing: 0.13em;
        text-transform: uppercase; color: rgba(255,255,255,0.28);
        margin: 0 0 9px; display: block;
      }
      .pfd-highlights {
        list-style: none; margin: 0 0 22px; padding: 0;
        display: flex; flex-direction: column; gap: 8px;
      }
      .pfd-highlights li {
        font-size: 13.5px; color: rgba(255,255,255,0.78);
        padding: 11px 13px; line-height: 1.5;
        background: rgba(255,255,255,0.035);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 10px;
      }
      .pfd-pills {
        display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 28px;
      }
      .pfd-pill {
        font-size: 11.5px; font-weight: 600;
        padding: 4px 11px; border-radius: 20px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        color: rgba(255,255,255,0.72);
      }
      .pfd-btn {
        display: flex; align-items: center; justify-content: center; gap: 8px;
        width: 100%; padding: 13px; border-radius: 11px;
        font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
        text-decoration: none; color: #fff;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.11);
        transition: background 0.2s, transform 0.2s, border-color 0.2s;
        cursor: pointer;
      }
      .pfd-btn:hover {
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.2);
        transform: translateY(-1px);
      }

      /* ── Section fade-up reveal ── */
      .pf-reveal {
        opacity: 0;
        transform: translateY(28px);
        transition: opacity 0.75s ease, transform 0.75s ease;
      }
      .pf-reveal.pf-in { opacity: 1; transform: translateY(0); }
    `;
    document.head.appendChild(s);
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     1. SCROLL PROGRESS BAR
  ═══════════════════════════════════════════════════════════════════════════ */
  function initScrollProgress() {
    if (document.getElementById('pf-progress')) return;
    const bar = document.createElement('div');
    bar.id = 'pf-progress';
    document.body.prepend(bar);
    window.addEventListener('scroll', function () {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = Math.min((window.scrollY / max) * 100, 100) + '%';
    }, { passive: true });
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     2. TYPING ANIMATION  (hero-sub)
  ═══════════════════════════════════════════════════════════════════════════ */
  var PHRASES = [
    'exploring data science, machine learning & full-stack development.',
    'building AI models that think and adapt.',
    'turning raw data into smart decisions.',
    'crafting full-stack apps with real purpose.',
  ];

  function initTyping() {
    var el = document.querySelector('.hero-sub');
    if (!el || el.dataset.pfTyped) return false;
    el.dataset.pfTyped = 'true';

    var phraseIdx = 0, charIdx = 0, isDeleting = false;

    var typed = document.createElement('span');
    var cursor = document.createElement('span');
    cursor.className = 'pf-cursor';
    cursor.textContent = '|';

    el.textContent = 'CS undergrad ';
    el.appendChild(typed);
    el.appendChild(cursor);

    // Start: show first phrase fully, then begin cycle
    typed.textContent = PHRASES[0];
    charIdx = PHRASES[0].length;
    isDeleting = true;

    function tick() {
      var phrase = PHRASES[phraseIdx];
      var delay;

      if (isDeleting) {
        charIdx--;
        typed.textContent = phrase.slice(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          delay = 380;
        } else {
          delay = 34;
        }
      } else {
        charIdx++;
        typed.textContent = phrase.slice(0, charIdx);
        if (charIdx === phrase.length) {
          isDeleting = true;
          delay = 2400;
        } else {
          delay = 60;
        }
      }
      setTimeout(tick, delay);
    }

    setTimeout(tick, 2600);
    return true;
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     3. MODERN STAT CARDS  (replace .score-ring)
  ═══════════════════════════════════════════════════════════════════════════ */
  function replaceScoreRings() {
    var rings = document.querySelectorAll('.score-ring:not([data-pf])');
    if (!rings.length) return false;

    rings.forEach(function (ring) {
      ring.dataset.pf = '1';

      var textEl = ring.querySelector('.ring-text');
      if (!textEl) return;

      var raw = textEl.textContent.trim();          // e.g. "8.23 CGPA" or "90.83%"
      var isCgpa = raw.includes('CGPA');
      var numStr = raw.replace(' CGPA', '').replace('%', '').trim();
      var numVal  = parseFloat(numStr);
      var pct     = isCgpa ? (numVal / 10) * 100 : numVal;  // scale to 100
      var unit    = isCgpa ? '/10' : '%';
      var sub     = isCgpa ? 'University CGPA' : 'Percentage';
      var decimals = (numStr.indexOf('.') >= 0) ? numStr.split('.')[1].length : 0;

      // Build the modern card
      var card = document.createElement('div');
      card.className = 'pf-stat-card';
      card.innerHTML =
        '<span class="pf-stat-label">' + sub + '</span>' +
        '<div class="pf-stat-num-wrap">' +
          '<span class="pf-stat-num" data-target="' + numVal + '" data-dec="' + decimals + '">0</span>' +
          '<span class="pf-stat-unit">' + unit + '</span>' +
        '</div>' +
        '<span class="pf-stat-sub">' + (isCgpa ? 'Out of 10 · SVCE' : 'Academic Score') + '</span>' +
        '<div class="pf-bar-track"><div class="pf-bar-fill" data-pct="' + pct + '"></div></div>';

      ring.parentNode.insertBefore(card, ring);
      ring.style.display = 'none';

      // Animate on scroll into view
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();

        // Animate number
        var numEl = card.querySelector('.pf-stat-num');
        var target = parseFloat(numEl.dataset.target);
        var dec    = parseInt(numEl.dataset.dec, 10);
        var dur    = 1500, t0 = performance.now();

        (function animate(now) {
          var p = Math.min((now - t0) / dur, 1);
          var v = (1 - Math.pow(1 - p, 3)) * target;
          numEl.textContent = v.toFixed(dec);
          if (p < 1) requestAnimationFrame(animate);
          else numEl.textContent = target.toFixed(dec);
        })(performance.now());

        // Animate bar
        var fill = card.querySelector('.pf-bar-fill');
        requestAnimationFrame(function () {
          fill.style.width = Math.min(pct, 100) + '%';
        });
      }, { threshold: 0.4 });
      io.observe(card);
    });

    return true;
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     4. PROJECT STORYTELLING DRAWER
  ═══════════════════════════════════════════════════════════════════════════ */
  var STORIES = [
    {
      title: 'HealthForesight',
      tag: 'AI · Health Tech',
      color: '#00ffff',
      desc: 'An AI-driven health risk prediction platform that analyses real-time patient data using machine learning models to deliver personalised early-warning health insights.',
      highlights: [
        '🧠 Multi-model ML pipeline for disease risk scoring',
        '📊 Real-time data ingestion & interactive visualisation',
        '🔒 Privacy-first architecture with secure data handling'
      ],
      stack: ['Python', 'Machine Learning', 'React', 'Flask', 'Data Viz'],
      github: 'https://github.com/THARUN-GOWDA-K/HealthForesight'
    },
    {
      title: 'Annual Report Portal',
      tag: 'Web · Data Viz',
      color: '#a855f7',
      desc: 'A full-featured web platform to generate, manage, and beautifully visualise annual reports with interactive charts and one-click automated PDF export.',
      highlights: [
        '📈 Interactive dashboard with multi-chart reporting',
        '📄 Automated PDF generation & export pipeline',
        '👥 Multi-user collaboration with role-based access'
      ],
      stack: ['React', 'Node.js', 'Chart.js', 'MongoDB', 'REST API'],
      github: 'https://github.com/THARUN-GOWDA-K/Annual-report-portal'
    },
    {
      title: 'Self-Healing Blockchain',
      tag: 'Blockchain · Distributed Systems',
      color: '#f59e0b',
      desc: 'A resilient blockchain system that automatically detects faulty or tampered nodes and triggers cryptographic self-repair protocols — no manual intervention required.',
      highlights: [
        '🔗 Autonomous fault detection across distributed nodes',
        '🛡️ Cryptographic integrity restoration on breach',
        '⚡ Sub-second consensus recovery mechanism'
      ],
      stack: ['Python', 'Blockchain', 'Distributed Systems', 'Cryptography'],
      github: 'https://github.com/THARUN-GOWDA-K/Self-Healing-Blockchain'
    },
    {
      title: 'Employee Management Chatbot',
      tag: 'NLP · HR Tech',
      color: '#22c55e',
      desc: 'A conversational AI assistant that handles employee HR queries, leave requests, and policy lookups — reducing HR workload while delivering instant, accurate responses 24/7.',
      highlights: [
        '💬 Natural language understanding for 50+ HR query types',
        '🕐 24/7 automated responses with escalation fallback',
        '📋 Integrated leave & payroll query resolution'
      ],
      stack: ['Python', 'NLP', 'LLM / Rasa', 'React', 'REST API'],
      github: 'https://github.com/THARUN-GOWDA-K/employee-chatbot'
    },
    {
      title: 'Smart Farming Assistant',
      tag: 'IoT · Agriculture AI',
      color: '#86efac',
      desc: 'An intelligent farming companion that fuses IoT sensor data with AI models to monitor crop health in real-time, predict yield, and dispatch precision-agriculture recommendations.',
      highlights: [
        '🌱 Real-time crop health monitoring via IoT sensors',
        '🤖 AI-powered yield prediction & anomaly detection',
        '📡 Remote dashboard for farmers with offline support'
      ],
      stack: ['Python', 'IoT', 'Machine Learning', 'React', 'Flask', 'MQTT'],
      github: 'https://github.com/THARUN-GOWDA-K/smart-farming-assistant'
    }
  ];

  function buildDrawerDOM() {
    if (document.getElementById('pf-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'pf-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeDrawer);

    var drawer = document.createElement('div');
    drawer.id = 'pf-drawer';
    document.body.appendChild(drawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  function openDrawer(story) {
    var overlay = document.getElementById('pf-overlay');
    var drawer  = document.getElementById('pf-drawer');
    if (!overlay || !drawer) return;

    drawer.style.setProperty('--dc', story.color);

    drawer.innerHTML =
      '<div class="pfd-head">' +
        '<span class="pfd-tag">' + story.tag + '</span>' +
        '<button class="pfd-close" aria-label="Close">✕</button>' +
      '</div>' +
      '<div class="pfd-body">' +
        '<h3 class="pfd-title">' + story.title + '</h3>' +
        '<p class="pfd-desc">' + story.desc + '</p>' +
        '<span class="pfd-section-label">Key Highlights</span>' +
        '<ul class="pfd-highlights">' +
          story.highlights.map(function (h) { return '<li>' + h + '</li>'; }).join('') +
        '</ul>' +
        '<span class="pfd-section-label">Tech Stack</span>' +
        '<div class="pfd-pills">' +
          story.stack.map(function (t) { return '<span class="pfd-pill">' + t + '</span>'; }).join('') +
        '</div>' +
        '<a href="' + story.github + '" target="_blank" rel="noreferrer" class="pfd-btn">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>' +
          'View on GitHub' +
        '</a>' +
      '</div>';

    drawer.querySelector('.pfd-close').addEventListener('click', closeDrawer);

    requestAnimationFrame(function () {
      overlay.classList.add('open');
      drawer.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    var overlay = document.getElementById('pf-overlay');
    var drawer  = document.getElementById('pf-drawer');
    if (!overlay || !drawer) return;
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  function attachProjectStory() {
    var container = document.querySelector('.bounceCardsContainer');
    if (!container || container.dataset.pfStory) return false;
    container.dataset.pfStory = '1';

    var cards = container.querySelectorAll('[class*="card-"]');
    cards.forEach(function (card, i) {
      if (!STORIES[i]) return;
      var story = STORIES[i];
      // Capture phase so we intercept before React's GitHub-open click
      card.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        openDrawer(story);
      }, { capture: true });
    });

    return true;
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     5. SECTION REVEAL ANIMATIONS
  ═══════════════════════════════════════════════════════════════════════════ */
  var REVEAL_SELECTORS = [
    '.about-section', '.skills-section', '.projects-section',
    '.resume-section', '.contact-section'
  ];

  function initReveal() {
    REVEAL_SELECTORS.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el || el.dataset.pfReveal) return;
      el.dataset.pfReveal = '1';
      el.classList.add('pf-reveal');
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          el.classList.add('pf-in');
          io.disconnect();
        }
      }, { threshold: 0.08 });
      io.observe(el);
    });
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     ORIGINAL FIXES (preserved)
  ═══════════════════════════════════════════════════════════════════════════ */
  function updateCgpa() {
    document.querySelectorAll('*').forEach(function (el) {
      if (!el.children.length && el.textContent && el.textContent.indexOf('8.1 CGPA') !== -1)
        el.textContent = el.textContent.replace(/8\.1 CGPA/g, '8.23 CGPA');
    });
  }

  function organizeSkills() {
    var cards = Array.from(document.querySelectorAll('#tech .skill-card'));
    if (!cards.length || document.querySelector('#tech .skill-card[data-organized]')) return false;
    var webCard  = cards.find(function (c) { return c.querySelector('.cat-title') && c.querySelector('.cat-title').textContent.trim() === 'Web Development'; });
    var dataCard = cards.find(function (c) { return c.querySelector('.cat-title') && c.querySelector('.cat-title').textContent.trim() === 'Data Science'; });
    if (!webCard || !dataCard) return false;
    webCard.dataset.organized = '1';
    dataCard.querySelector('.cat-title').textContent = 'Data Analytics';
    webCard.querySelectorAll('.skill-box').forEach(function (box) {
      if (box.querySelector('.skill-name') && box.querySelector('.skill-name').textContent.trim() === 'JavaScript') box.remove();
    });
    var backend = webCard.cloneNode(false);
    backend.dataset.organized = '1';
    backend.innerHTML = '<div class="card-header"><span class="cat-icon">⌘</span><h3 class="cat-title">Backend</h3></div><div class="card-divider"></div><div class="card-items"></div>';
    var bi = backend.querySelector('.card-items');
    webCard.querySelectorAll('.skill-box').forEach(function (box) {
      var n = box.querySelector('.skill-name') && box.querySelector('.skill-name').textContent.trim();
      if (n === 'Flask' || n === 'FastAPI') bi.appendChild(box);
    });
    webCard.insertAdjacentElement('afterend', backend);
    return true;
  }

  function useAjaxContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form || form.dataset.ajaxReady) return false;
    form.dataset.ajaxReady = '1';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn  = form.querySelector('button[type="submit"]');
      var orig = btn.innerHTML;
      btn.disabled = true; btn.textContent = 'SENDING...';
      var values = Object.fromEntries(new FormData(form).entries());
      fetch('https://formsubmit.co/ajax/tharungowda0369@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values)
      }).then(function (r) {
        if (!r.ok) throw new Error();
        form.reset(); btn.textContent = '✓ MESSAGE SENT!';
      }).catch(function () {
        btn.textContent = 'TRY AGAIN';
      }).finally(function () {
        setTimeout(function () { btn.disabled = false; btn.innerHTML = orig; }, 4000);
      });
    });
    return true;
  }


  /* ═══════════════════════════════════════════════════════════════════════════
     BOOTSTRAP
  ═══════════════════════════════════════════════════════════════════════════ */
  injectStyles();
  initScrollProgress();
  buildDrawerDOM();

  var done = { skills: false, form: false, rings: false, story: false, typing: false };

  function runAll() {
    updateCgpa();
    if (!done.skills)  done.skills  = organizeSkills();
    if (!done.form)    done.form    = useAjaxContactForm();
    if (!done.rings)   done.rings   = replaceScoreRings();
    if (!done.story)   done.story   = attachProjectStory();
    if (!done.typing)  done.typing  = initTyping();
    initReveal();
    if (done.skills && done.form && done.rings && done.story && done.typing) mo.disconnect();
  }

  var mo = new MutationObserver(runAll);
  mo.observe(document.documentElement, { childList: true, subtree: true });
  runAll();

}());
