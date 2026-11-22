/* Shared helpers: icons, image/placeholder, audio player. No dependencies. */
(function () {
  'use strict';

  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    water: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
    uses: '<path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"/><path d="M6 17h12"/>',
    sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pause: '<rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/>',
    next: '<path d="m15 18-6-6 6-6"/>',
    prev: '<path d="m9 18 6-6-6-6"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    volume: '<path d="M11 4.7 6.5 9H3v6h3.5l4.5 4.3Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
    printer: '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>'
  };
  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONS[name] + '</svg>';
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- character image or elegant line-art placeholder (single colour strokes, no fills) ---- */
  var INK = '#14332D', GOLD = '#14332D';
  function leaf(x, y, angle, len) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + angle + ')">' +
      '<ellipse cx="0" cy="' + (-len / 2) + '" rx="' + (len * 0.3).toFixed(1) + '" ry="' + (len / 2) + '" fill="none" stroke="' + INK + '" stroke-width="1.5"/>' +
      '<path d="M0 0V' + (-len * 0.9).toFixed(1) + '" stroke="' + INK + '" stroke-width="1.5" fill="none"/></g>';
  }
  function placeholder(p, withName) {
    var plant = '<path d="M100 168V64" stroke="' + INK + '" stroke-width="1.5" stroke-linecap="round" fill="none"/>' +
      leaf(100, 150, -58, 40) + leaf(100, 138, 58, 40) +
      leaf(100, 118, -52, 44) + leaf(100, 104, 52, 44) +
      leaf(100, 88, -46, 38) + leaf(100, 76, 46, 38) + leaf(100, 66, 0, 30);
    var name = withName ?
      '<text class="ph-name" x="100" y="40" text-anchor="middle" font-size="22">' + esc(p.name) + '</text>' +
      '<path d="M78 52h44" stroke="' + GOLD + '" stroke-width="1.5" stroke-linecap="round"/>' : '';
    return '<svg class="ph" viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + esc(p.name) + '">' +
      '<path d="M0 262C50 252 90 258 130 250S180 246 200 244M0 272C50 262 90 268 130 260S180 256 200 254" stroke="' + GOLD + '" stroke-width="1.5" fill="none"/>' +
      plant +
      '<path d="M58 178H142L132 244Q131 248 126 248H74Q69 248 68 244Z" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<path d="M52 166H148V182H52Z" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<path d="M66 204h6v-5h6v-5h12v5h6v5h6M100 204h6v-5h6v-5h12v5h6v5h6" stroke="' + GOLD + '" stroke-width="1.5" fill="none" stroke-linejoin="miter" transform="translate(-6 8)"/>' +
      name + '</svg>';
  }
  function figure(p, opts) {
    opts = opts || {};
    var cls = 'frame' + (p.image ? ' has-img' : '');
    var inner = (opts.video && p.video && p.image)
      ? '<video class="talk" src="' + esc(p.video) + '" poster="' + esc(p.image) + '" playsinline webkit-playsinline preload="auto" disablepictureinpicture disableremoteplayback aria-label="' + esc('شخصية نبتة ' + p.name + ' تتحدث') + '" width="600" height="900"></video>'
      : p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc('شخصية نبتة ' + p.name) + '" ' + (opts.eager ? '' : 'loading="lazy" ') + 'decoding="async" width="683" height="1024">'
      : placeholder(p, opts.name);
    return '<div class="' + cls + '">' + inner + '</div>';
  }

  /* ---- audio player (one audio at a time) ---- */
  var active = null;
  function fmt(t) {
    t = Math.max(0, Math.floor(t || 0));
    return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2);
  }
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function createPlayer(root, item, opt) {
    var video = opt && opt.video || null;
    var phrases = item.phrases;
    root.classList.add('player');
    root.innerHTML =
      '<div class="ptop">' +
      '<button type="button" class="pbtn" aria-label="تشغيل حكاية ' + esc(item.name) + '">' + icon('play', 'i-play') + icon('pause', 'i-pause') + '</button>' +
      '<div class="pmain"><div class="pbar"><div class="ptrack"><div class="pfill"></div></div><div class="pthumb"></div>' +
      '<input type="range" min="0" max="1000" value="0" step="1" aria-label="موضع التشغيل"></div>' +
      '<div class="ptime" aria-hidden="true"><span class="cur">0:00</span><span class="tot">' + fmt(item.duration) + '</span></div></div></div>' +
      '<p class="perr" role="alert">تعذّر تحميل الصوت. تحقّق من الاتصال ثم حاول مرة أخرى.</p>' +
      '<div class="transcript" tabindex="0" aria-label="نص الحكاية">' +
      phrases.map(function (p, i) { return '<span class="ph-s" data-i="' + i + '">' + esc(p.t) + '</span> '; }).join('') +
      '</div>';

    var btn = root.querySelector('.pbtn'), range = root.querySelector('input'),
      cur = root.querySelector('.cur'), tot = root.querySelector('.tot'),
      box = root.querySelector('.transcript'), spans = root.querySelectorAll('.ph-s');
    /* With a talking video, the video itself carries the voice and is the only clock: it plays
       untouched and the transcript follows it. Otherwise a plain audio element is used. */
    var audio = video || new Audio();
    if (!video) { audio.preload = 'metadata'; audio.src = item.audio; }
    var idx = -1, raf = 0, dragging = false;

    function dur() { return isFinite(audio.duration) && audio.duration > 0 ? audio.duration : item.duration; }
    function setIdx(i) {
      if (i === idx) return;
      idx = i;
      for (var k = 0; k < spans.length; k++) {
        spans[k].classList.toggle('is-active', k === i);
        spans[k].classList.toggle('is-past', k < i);
      }
      if (i >= 0 && box.scrollHeight > box.clientHeight + 2) {
        var el = spans[i];
        var top = el.offsetTop - box.clientHeight / 2 + el.offsetHeight / 2;
        box.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
      }
    }
    function indexAt(t) {
      var r = -1;
      for (var i = 0; i < phrases.length; i++) { if (phrases[i].s <= t + 0.02) r = i; else break; }
      return r;
    }
    function render() {
      var t = audio.currentTime, d = dur(), pct = d ? Math.min(100, t / d * 100) : 0;
      root.style.setProperty('--p', pct.toFixed(2));
      if (!dragging) range.value = Math.round(pct * 10);
      cur.textContent = fmt(t);
      if (!audio.paused || t > 0) setIdx(indexAt(t)); else setIdx(-1);
    }
    function loop() { render(); if (!audio.paused) raf = requestAnimationFrame(loop); }

    function setPlaying(on) {
      root.classList.toggle('is-playing', on);
      btn.setAttribute('aria-label', (on ? 'إيقاف مؤقت لحكاية ' : 'تشغيل حكاية ') + item.name);
    }
    function pauseOthers() { if (active && active !== api) active.pause(); active = api; }

    /* play(): call synchronously inside a user gesture. Resolves/rejects like audio.play(). */
    function play() {
      pauseOthers(); root.classList.remove('has-error');
      var pr;
      try { pr = audio.play(); } catch (e) { pr = Promise.reject(e); }
      return pr && pr.then ? pr : Promise.resolve();
    }
    var api = { pause: function () { audio.pause(); }, play: play };
    btn.addEventListener('click', function () {
      if (audio.paused) { play().catch(function () { root.classList.add('has-error'); }); }
      else audio.pause();
    });
    audio.addEventListener('play', function () { pauseOthers(); setPlaying(true); cancelAnimationFrame(raf); loop();
      if (video) root.classList.add('has-video');
      if ('mediaSession' in navigator && window.MediaMetadata) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: item.name, artist: 'حكايات الواحة' });
      } });
    audio.addEventListener('pause', function () { setPlaying(false); cancelAnimationFrame(raf); render(); });
    audio.addEventListener('ended', function () { setPlaying(false); cancelAnimationFrame(raf); audio.currentTime = 0; setIdx(-1); render(); });
    audio.addEventListener('timeupdate', render);
    audio.addEventListener('loadedmetadata', function () { tot.textContent = fmt(dur()); });
    audio.addEventListener('error', function () { root.classList.add('has-error'); setPlaying(false); });
    range.addEventListener('input', function () {
      dragging = true;
      audio.currentTime = range.value / 1000 * dur();
      render();
    });
    range.addEventListener('change', function () { dragging = false; });
    range.addEventListener('pointerup', function () { dragging = false; });
    range.setAttribute('aria-valuetext', '');
    box.addEventListener('click', function (e) {
      var s = e.target.closest('.ph-s'); if (!s) return;
      audio.currentTime = phrases[+s.dataset.i].s + 0.02;
      if (audio.paused) btn.click(); else render();
    });
    return api;
  }

  /* ---- tap-to-listen start screen ----
     Browsers block audio without a user gesture. startWithGesture() tries to autoplay; if the browser
     refuses (NotAllowedError) it shows a full-screen overlay whose tap starts playback. */
  var ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
  function tapToListen(o) {
    var prevFocus = document.activeElement;
    var ov = document.createElement('div');
    ov.className = 'tts';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', o.label);
    ov.innerHTML =
      '<div class="tts-in">' +
      (o.media || '') +
      '<h2 class="tts-name">' + esc(o.title) + '</h2>' +
      '<button type="button" class="tts-btn" aria-label="' + esc(o.label) + '"><span class="tts-ring" aria-hidden="true"></span>' + ICON_PLAY + '</button>' +
      '<p class="tts-cta">' + esc(o.cta) + '</p></div>';
    var btn = ov.querySelector('.tts-btn');
    var siblings = Array.prototype.slice.call(document.body.children).filter(function (n) { return n.tagName !== 'SCRIPT'; });
    siblings.forEach(function (n) { n.setAttribute('inert', ''); });
    document.body.appendChild(ov);
    document.body.classList.add('tts-open');
    try { btn.focus({ preventScroll: true }); } catch (e) { btn.focus(); }
    var closed = false;
    function close() {
      if (closed) return; closed = true;
      document.removeEventListener('keydown', onKey, true);
      siblings.forEach(function (n) { n.removeAttribute('inert'); });
      document.body.classList.remove('tts-open');
      var done = function () { if (ov.parentNode) ov.parentNode.removeChild(ov); };
      if (reduced) done(); else { ov.classList.add('is-out'); setTimeout(done, 380); }
      if (prevFocus && prevFocus.focus && document.contains(prevFocus)) { try { prevFocus.focus({ preventScroll: true }); } catch (e) {} }
    }
    function start(e) {
      if (e) e.preventDefault();
      /* play() runs synchronously inside the tap/keypress handler so the browser accepts it */
      o.onStart();
      close();
    }
    function onKey(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }   /* dismiss without playing */
      else if (e.key === 'Tab') { e.preventDefault(); btn.focus(); } /* single focusable control */
    }
    ov.addEventListener('click', start);
    document.addEventListener('keydown', onKey, true);
    return { close: close, el: ov };
  }

  /* Try to autoplay; fall back to the overlay only when the browser blocks it. */
  function startWithGesture(api, o) {
    var pr;
    try { pr = api.play(); } catch (e) { pr = Promise.reject(e); }
    pr.catch(function (err) {
      if (err && err.name === 'NotAllowedError') {
        tapToListen({
          title: o.title, label: o.label, cta: o.cta, media: o.media,
          onStart: function () { api.play().catch(function () { var r = o.root; if (r) r.classList.add('has-error'); }); }
        });
      } else if (err && err.name !== 'AbortError' && o.root) {
        o.root.classList.add('has-error');
      }
    });
  }

  window.Oasis = { icon: icon, esc: esc, figure: figure, placeholder: placeholder, createPlayer: createPlayer, fmt: fmt, tapToListen: tapToListen, startWithGesture: startWithGesture };
})();
