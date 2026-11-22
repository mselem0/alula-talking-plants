(function () {
  'use strict';
  var O = window.Oasis, app = document.getElementById('app');
  var list = window.PLANTS.slice().sort(function (a, b) { return a.n - b.n; });
  var id = new URLSearchParams(location.search).get('p');
  var i = list.findIndex(function (p) { return p.id === id; });

  if (i < 0) {
    document.title = 'النبتة غير موجودة - حكايات الواحة';
    app.innerHTML = '<div class="notfound"><div class="frame">' + O.placeholder({ name: '؟', cat: 'شتلات' }, false) + '</div>' +
      '<h1>لم نعثر على هذه النبتة</h1><p>قد يكون الرمز قديمًا أو الرابط غير مكتمل. تصفّح كل النباتات واختر حكايتك.</p>' +
      '<a class="btn primary" href="index.html#plants">' + O.icon('grid') + 'كل النباتات</a></div>';
    return;
  }

  var p = list[i], prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
  document.title = p.name + ' - حكايات الواحة';
  var seeds = p.cat === 'بذور';
  function info(ic, label, val, cls) {
    return '<div class="info-card ' + (cls || '') + '"><span class="ic">' + O.icon(ic) + '</span><div><h3>' + label + '</h3><p>' + O.esc(val) + '</p></div></div>';
  }
  app.innerHTML =
    '<div class="plant-grid">' +
    '<div class="media">' + O.figure(p, { eager: true, name: true, video: true }) + '</div>' +
    '<div class="body">' +
    '<div class="plant-meta"><h1>' + O.esc(p.name) + '</h1>' +
    (p.sci ? '<p class="sci">' + O.esc(p.sci) + '</p>' : '') +
    '<span class="badge">' + O.icon('sprout') + O.esc(p.cat) + '</span></div>' +
    '<div class="panel" style="margin-top:20px"><div id="player"></div></div>' +
    (p.warning ? '<div class="safety" role="note">' + O.icon('alert') + '<span>للنظر فقط، لا تلمس ولا تتذوق</span></div>' : '') +
    '<div class="info">' +
    info('sun', 'الشمس', p.sun) + info('water', 'السقي', p.water) +
    (p.warning ? info('alert', 'الاستخدامات', p.uses, 'warn wide') : info('uses', 'الاستخدامات', p.uses, 'wide')) +
    info('sprout', 'النوع', seeds ? 'بذور، تُزرع من البذرة' : 'شتلات، جاهزة للزراعة', 'wide') +
    '</div>' +
    '<div class="ask" aria-disabled="true"><span class="ic">' + O.icon('chat') + '</span><div><strong>اسأل النبتة <span class="soon">قريبًا</span></strong><small>قريبًا ستتمكّن من محادثة النبتة وطرح أسئلتك عليها.</small></div></div>' +
    '<nav class="pn" aria-label="التنقل بين النباتات">' +
    '<a class="prev" href="plant.html?p=' + encodeURIComponent(prev.id) + '" rel="prev">' + O.icon('prev') + '<span><small>السابقة</small>' + O.esc(prev.name) + '</span></a>' +
    '<a class="next" href="plant.html?p=' + encodeURIComponent(next.id) + '" rel="next"><span><small>التالية</small>' + O.esc(next.name) + '</span>' + O.icon('next') + '</a>' +
    '<a class="all" href="index.html#plants">' + O.icon('grid') + 'كل النباتات</a></nav>' +
    '</div></div>';
  var root = document.getElementById('player');
  var api = O.createPlayer(root, p, { video: app.querySelector('video.talk') });
  /* QR codes open this page directly: try to play now, show the tap-to-listen screen if blocked. */
  O.startWithGesture(api, {
    root: root, title: p.name, label: 'المس الشاشة لتسمع حكايتي', cta: 'المس الشاشة لتسمع حكايتي',
    media: O.figure(p, { eager: true, name: false }).replace('class="frame', 'class="tts-frame frame')
  });
})();
