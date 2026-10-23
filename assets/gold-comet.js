/* O'Jeb – zlatý paprsek kolem tlačítka (varianta B). Bez závislostí.
   const fx = OJGold.attach(button);           // vloží překryv, efekt zatím neběží
   fx.setActive(true|false)                    // zapne / vypne hned
   fx.activateAfter(5000)                      // zapne po zpoždění (opakované volání nic nedělá)
   fx.cancel()                                 // zruší zpoždění i běh
   fx.refresh()                                // přepočítá tvar (volá se samo přes ResizeObserver)
   fx.destroy()                                // odstraní překryv a posluchače
   Efekt neběží, dokud má tlačítko disabled, aria-disabled="true" nebo aria-busy="true". */
(function (w) {
  'use strict';
  var uid = 0;
  var DUR = 5000;
  var STOPS = [[0,'#6a440f'],[.12,'#b7832a'],[.22,'#f1d28a'],[.27,'#fffaf0'],[.34,'#e3b250'],[.48,'#7a5212'],[.6,'#b98327'],[.71,'#f2cf7c'],[.76,'#fff3d4'],[.85,'#c9963a'],[1,'#6a440f']];
  var B = {
    inset: 1.5,        // odsazení paprsku od okraje tlačítka (px)
    width: 2.9,        // tloušťka paprsku (px), stejná po celé délce
    tail: 42,          // délka ocasu (% obvodu)
    head: 8,           // délka bílé hlavy (% obvodu)
    rail: .38,         // krytí tenké zlaté linky po obvodu
    bevel: .16,        // krytí jemného odlesku na horní hraně
    stat: 1.4,         // tloušťka statického obrysu (reduced motion)
    // záblesky: [odstup za hlavou %, velikost px, posun kolmo px, délka třpytu s, zpoždění s]
    sparks: [[1.5,8,-3,1.7,0],[4,6,2.5,2.3,.5],[7,7,-1.5,1.3,1.1],[10,5,3,2.9,.3],[14,6,-2.5,1.9,1.5],[18,4,1.5,2.6,.9]]
  };
  function r2(n) { return Math.round(n * 100) / 100; }
  function rr(W, H, r, i) {
    var x0 = i, y0 = i, x1 = W - i, y1 = H - i;
    r = Math.max(0, Math.min(r - i, (x1 - x0) / 2, (y1 - y0) / 2));
    var a = 'A' + r2(r) + ' ' + r2(r) + ' 0 0 1 ';
    return 'M' + r2(W / 2) + ' ' + y0 + 'H' + r2(x1 - r) + a + x1 + ' ' + r2(y0 + r) + 'V' + r2(y1 - r) + a + r2(x1 - r) + ' ' + y1 +
      'H' + r2(x0 + r) + a + x0 + ' ' + r2(y1 - r) + 'V' + r2(y0 + r) + a + r2(x0 + r) + ' ' + y0 + 'Z';
  }
  var STAR = '<svg viewBox="-5 -5 10 10"><path d="M0-5L.9-.9 5 0 .9.9 0 5-.9.9-5 0-.9-.9Z" fill="#fff4d2"/><circle r="1" fill="#fff"/></svg>';

  function attach(btn, opt) {
    opt = opt || {};
    var dur = opt.duration || DUR;
    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    var root = document.createElement('span');
    root.className = 'ojg'; root.setAttribute('aria-hidden', 'true');
    btn.appendChild(root);
    var want = false, timer = 0, key = '';

    function build() {
      var s = getComputedStyle(btn), W = btn.offsetWidth, H = btn.offsetHeight;
      if (!W || !H) return;
      var rs = s.borderTopLeftRadius, rad = parseFloat(rs) || 0;
      if (/%/.test(rs)) rad = Math.min(W, H) * rad / 100;
      var k = W + 'x' + H + 'r' + rad; if (k === key) return; key = k;
      var bl = parseFloat(s.borderLeftWidth) || 0, bt = parseFloat(s.borderTopWidth) || 0;
      root.style.cssText = 'left:' + (-bl) + 'px;top:' + (-bt) + 'px;width:' + W + 'px;height:' + H + 'px;--ojg-dur:' + dur + 'ms';
      var d = rr(W, H, rad, B.inset), id = 'ojgG' + (++uid), g = 'url(#' + id + ')', bid = id + 'b';
      var dash = function (L, c, o) {
        return '<path class="ojg-c" pathLength="100" d="' + d + '" stroke="' + c + '" stroke-width="' + B.width + '" opacity="' + o +
          '" stroke-linecap="butt" stroke-dasharray="0 ' + r2(100 - L) + ' ' + L + ' 0"/>';
      };
      var h = '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '"><defs><linearGradient id="' + id +
        '" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="' + W + '" y2="' + H + '">' +
        STOPS.map(function (t) { return '<stop offset="' + t[0] + '" stop-color="' + t[1] + '"/>'; }).join('') + '</linearGradient>' +
        '<linearGradient id="' + bid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="' + B.bevel + '"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#e8b860" stop-opacity="' + r2(B.bevel * .6) + '"/></linearGradient></defs>';
      h += '<path d="' + rr(W, H, rad, B.inset + 1.4) + '" fill="none" stroke="url(#' + bid + ')" stroke-width="1"/>';
      h += '<g class="ojg-anim" fill="none"><path d="' + d + '" stroke="' + g + '" stroke-width=".8" opacity="' + B.rail + '"/>';
      // Stejná tloušťka po celé délce; jas plynule klesá – překrývající se vrstvy, každá končí o ~1 mm dřív.
      var fade = function (L, n, A, pw, col) {
        var a = 1 - Math.pow(1 - A, 1 / n);
        for (var i = 1; i <= n; i++) {
          var x = L * (1 - Math.pow((1 - Math.pow(1 - a, i - .5)) / A, 1 / pw));
          h += dash(r2(Math.max(x, .05)), col, r2(a));
        }
      };
      fade(B.tail, 40, .95, 1.5, g);
      fade(B.head, 12, .9, 1, '#fffaf0');
      h += '</g><g class="ojg-static" fill="none"><path d="' + d + '" stroke="' + g + '" stroke-width="' + B.stat + '" opacity=".9"/>' +
        '<path pathLength="100" d="' + d + '" stroke="#fff3d4" stroke-width="' + B.stat + '" opacity=".35" stroke-linecap="round" stroke-dasharray="0 6 7 87"/>' +
        '<path pathLength="100" d="' + d + '" stroke="#fffaf0" stroke-width="' + B.stat + '" opacity=".7" stroke-linecap="round" stroke-dasharray="0 8 3 89"/></g></svg>';
      B.sparks.forEach(function (p) {
        h += '<span class="ojg-sp" style="offset-path:path(\'' + d + '\');--s:' + p[1] + 'px;animation-delay:' + Math.round(-(100 - p[0]) / 100 * dur) +
          'ms"><i style="--dy:' + p[2] + 'px;--tw:' + p[3] + 's;--twd:' + p[4] + 's">' + STAR + '</i></span>';
      });
      root.innerHTML = h;
    }
    function blocked() {
      return btn.disabled || btn.getAttribute('aria-busy') === 'true' || btn.getAttribute('aria-disabled') === 'true';
    }
    function update() { root.classList.toggle('is-on', want && !blocked()); }

    build();
    var raf = 0, ro = w.ResizeObserver ? new ResizeObserver(function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(build); }) : null;
    if (ro) ro.observe(btn);
    var mo = new MutationObserver(update);
    mo.observe(btn, { attributes: true, attributeFilter: ['disabled', 'aria-busy', 'aria-disabled'] });
    var io = w.IntersectionObserver ? new IntersectionObserver(function (e) { root.classList.toggle('is-paused', !e[0].isIntersecting); }) : null;
    if (io) io.observe(btn);

    return {
      el: root,
      setActive: function (v) { clearTimeout(timer); timer = 0; want = !!v; update(); },
      activateAfter: function (ms) { if (want || timer) return; timer = setTimeout(function () { timer = 0; want = true; update(); }, ms == null ? 5000 : ms); },
      cancel: function () { clearTimeout(timer); timer = 0; want = false; update(); },
      refresh: function () { key = ''; build(); },
      destroy: function () { clearTimeout(timer); cancelAnimationFrame(raf); if (ro) ro.disconnect(); if (io) io.disconnect(); mo.disconnect(); root.remove(); }
    };
  }
  w.OJGold = { attach: attach };
})(window);
