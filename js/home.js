(function () {
  'use strict';
  var O = window.Oasis;
  var w = document.getElementById('welcome');
  var wapi = O.createPlayer(w, window.WELCOME);
  /* Only when arriving from the general entrance QR (?scan=1) */
  if (new URLSearchParams(location.search).get('scan') === '1') {
    O.startWithGesture(wapi, {
      root: w, title: 'حكايات الواحة', label: 'المس الشاشة لتسمع الترحيب', cta: 'المس الشاشة لتسمع الترحيب',
      media: '<span class="tts-leaf">' + O.icon('sprout') + '</span>'
    });
  }
  w.insertAdjacentHTML('afterbegin', '<p class="pt">' + O.icon('volume') + 'اسمع التحية الترحيبية</p>');

  function card(p) {
    return '<a class="card" href="plant.html?p=' + encodeURIComponent(p.id) + '" aria-label="' + O.esc(p.name + '، استمع لحكايتها') + '">' +
      O.figure(p) +
      '<h3>' + O.esc(p.name) + '</h3>' +
      (p.sci ? '<p class="sci">' + O.esc(p.sci) + '</p>' : '') +
      '<span class="hint"><span class="dot">' + O.icon('play') + '</span>اضغط للاستماع</span></a>';
  }
  var seeds = window.PLANTS.filter(function (p) { return p.cat === 'بذور'; });
  var seedlings = window.PLANTS.filter(function (p) { return p.cat === 'شتلات'; });
  document.getElementById('g-seeds').innerHTML = seeds.map(card).join('');
  document.getElementById('g-seedlings').innerHTML = seedlings.map(card).join('');
  document.getElementById('c-seeds').textContent = seeds.length + ' نباتات';
  document.getElementById('c-seedlings').textContent = seedlings.length + ' نباتات';
})();
