(function () {
  'use strict';
  var O = window.Oasis;
  O.createPlayer(document.getElementById('welcome'), window.WELCOME);
  var w = document.getElementById('welcome');
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
