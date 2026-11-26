// Estrada 666: corrida arcade do Awhuuu!. Canvas puro, sem bibliotecas.
(function () {
  var cv = document.getElementById('e6'), g = cv.getContext('2d');
  var W = 540, H = 960, HZ = H * 0.40, CX = W / 2, CAM = 7, FAR = 120, LANE = 150;
  cv.width = W; cv.height = H;
  var COR = { noite: '#0A0A0A', osso: '#F4D49A', sepia: '#D99E62', sangue: '#D5060C' };

  // som: bipes sintetizados + trilha opcional (campo do CMS)
  var AC = null, mudo = false, trilha = null;
  try { mudo = localStorage.getItem('awhuuu-e6-mudo') === '1'; } catch (e) {}
  function bip(f, t, tipo, vol) {
    if (mudo) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var o = AC.createOscillator(), v = AC.createGain();
      o.type = tipo || 'square'; o.frequency.setValueAtTime(f, AC.currentTime);
      o.frequency.exponentialRampToValueAtTime(Math.max(40, f * (tipo === 'sawtooth' ? 0.3 : 1.6)), AC.currentTime + t);
      v.gain.setValueAtTime(vol || 0.08, AC.currentTime); v.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + t);
      o.connect(v); v.connect(AC.destination); o.start(); o.stop(AC.currentTime + t);
    } catch (e) {}
  }
  if (window.E6_TRILHA) { trilha = new Audio(window.E6_TRILHA); trilha.loop = true; trilha.volume = 0.5; }

  var est, recorde = 0;
  try { recorde = +localStorage.getItem('awhuuu-e6-recorde') || 0; } catch (e) {}
  function novo() {
    est = { modo: 'inicio', t: 0, vel: 30, dist: 0, discos: 0, vidas: 3, lane: 0, x: 0, objs: [], prox: 2, inv: 0, tremor: 0, faiscas: [] };
  }
  novo();

  function proj(d) { var s = CAM / (CAM + Math.max(d, -CAM + 0.5)); return { s: s, y: HZ + (H - HZ) * s }; }

  var TIPOS = [
    { n: 'disco', p: 0.42, bom: true },
    { n: 'palheta', p: 0.06, bom: true },
    { n: 'lapide', p: 0.2 },
    { n: 'cacto', p: 0.17 },
    { n: 'barril', p: 0.15 }
  ];
  function sorteia() {
    var r = Math.random(), a = 0;
    for (var i = 0; i < TIPOS.length; i++) { a += TIPOS[i].p; if (r < a) return TIPOS[i]; }
    return TIPOS[0];
  }
  function gera() {
    var livres = [-1, 0, 1].sort(function () { return Math.random() - 0.5; });
    var n = Math.random() < 0.25 + Math.min(0.35, est.dist / 6000) ? 2 : 1;
    for (var i = 0; i < n; i++) {
      var tp = sorteia();
      if (i === 1 && !tp.bom && est.objs.some(function (o) { return o.d > FAR - 5 && !o.bom; })) tp = TIPOS[0];
      est.objs.push({ tipo: tp.n, bom: !!tp.bom, lane: livres[i], d: FAR, giro: Math.random() * 6 });
    }
    // nunca fecha as três pistas
    est.prox = Math.max(0.35, 1.25 - est.dist / 5000) * (0.7 + Math.random() * 0.6);
  }

  // ---------- desenho ----------
  function ceu() {
    var gr = g.createLinearGradient(0, 0, 0, HZ);
    gr.addColorStop(0, '#050505'); gr.addColorStop(1, '#2a0a06');
    g.fillStyle = gr; g.fillRect(0, 0, W, HZ + 2);
    for (var i = 0; i < 60; i++) {
      var sx = (i * 97.3) % W, sy = (i * 53.1) % (HZ * 0.8);
      g.fillStyle = 'rgba(244,212,154,' + (0.2 + (i % 5) / 10) + ')'; g.fillRect(sx, sy, 2, 2);
    }
    var mx = CX + Math.sin(est.t * 0.05) * 6, my = HZ * 0.42, mr = 92;
    var gl = g.createRadialGradient(mx, my, mr * 0.6, mx, my, mr * 2.4);
    gl.addColorStop(0, 'rgba(213,6,12,0.45)'); gl.addColorStop(1, 'rgba(213,6,12,0)');
    g.fillStyle = gl; g.fillRect(0, 0, W, HZ);
    g.fillStyle = '#c2280f'; g.beginPath(); g.arc(mx, my, mr, 0, 7); g.fill();
    g.fillStyle = 'rgba(80,10,5,0.35)';
    [[-30, -20, 18], [25, 15, 24], [-10, 35, 12], [40, -35, 10]].forEach(function (c) { g.beginPath(); g.arc(mx + c[0], my + c[1], c[2], 0, 7); g.fill(); });
    // mesas do deserto (parallax lento)
    var off = (est.dist * 0.02) % W;
    g.fillStyle = '#140504';
    for (var k = -1; k < 3; k++) {
      var bx = k * W - off;
      g.beginPath(); g.moveTo(bx, HZ);
      g.lineTo(bx + 40, HZ - 50); g.lineTo(bx + 150, HZ - 50); g.lineTo(bx + 175, HZ - 18); g.lineTo(bx + 260, HZ - 18);
      g.lineTo(bx + 290, HZ - 70); g.lineTo(bx + 380, HZ - 70); g.lineTo(bx + 420, HZ); g.closePath(); g.fill();
    }
  }
  function estrada() {
    var passo = 2, fase = est.dist % (passo * 2);
    var chao = g.createLinearGradient(0, HZ, 0, HZ + 60); chao.addColorStop(0, '#120604'); chao.addColorStop(1, '#24120a');
    g.fillStyle = chao; g.fillRect(0, HZ, W, H - HZ);
    for (var d = FAR; d > -CAM + 1; d -= passo) {
      var a = proj(d), b = proj(d - passo);
      var faixa = Math.floor((d + fase) / passo) % 2 === 0;
      g.fillStyle = faixa ? '#2b1608' : '#24120a'; g.fillRect(0, a.y, W, b.y - a.y + 1);
      var ra = 330 * a.s, rb = 330 * b.s, ba = 360 * a.s, bb = 360 * b.s;
      quad(CX - ba, a.y, CX + ba, a.y, CX + bb, b.y, CX - bb, b.y, faixa ? COR.sangue : COR.osso);
      quad(CX - ra, a.y, CX + ra, a.y, CX + rb, b.y, CX - rb, b.y, faixa ? '#1a1a1a' : '#151515');
      if (faixa) {
        [-0.5, 0.5].forEach(function (l) {
          var xa = CX + l * LANE * a.s, xb = CX + l * LANE * b.s, wa = 6 * a.s, wb = 6 * b.s;
          quad(xa - wa, a.y, xa + wa, a.y, xb + wb, b.y, xb - wb, b.y, 'rgba(244,212,154,0.75)');
        });
      }
    }
  }
  function quad(x1, y1, x2, y2, x3, y3, x4, y4, c) { g.fillStyle = c; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.lineTo(x3, y3); g.lineTo(x4, y4); g.closePath(); g.fill(); }

  function objeto(o) {
    var p = proj(o.d), s = p.s, x = CX + o.lane * LANE * s, y = p.y;
    g.save(); g.translate(x, y); g.scale(s, s);
    if (o.tipo === 'disco') {
      g.translate(0, -70); g.scale(Math.abs(Math.cos(o.giro)) * 0.9 + 0.1, 1);
      g.fillStyle = '#050505'; g.beginPath(); g.arc(0, 0, 55, 0, 7); g.fill();
      g.strokeStyle = '#333'; g.lineWidth = 2; for (var r = 22; r < 54; r += 7) { g.beginPath(); g.arc(0, 0, r, 0, 7); g.stroke(); }
      g.fillStyle = COR.sangue; g.beginPath(); g.arc(0, 0, 18, 0, 7); g.fill();
      g.fillStyle = COR.osso; g.beginPath(); g.arc(0, 0, 4, 0, 7); g.fill();
    } else if (o.tipo === 'palheta') {
      g.translate(0, -70); g.rotate(o.giro);
      g.fillStyle = COR.osso; g.beginPath(); g.moveTo(0, 45); g.quadraticCurveTo(-48, -10, -30, -38); g.quadraticCurveTo(0, -55, 30, -38); g.quadraticCurveTo(48, -10, 0, 45); g.fill();
      g.fillStyle = COR.sangue; g.font = '30px Anton, Impact, sans-serif'; g.textAlign = 'center'; g.fillText('666', 0, 6);
    } else if (o.tipo === 'lapide') {
      g.fillStyle = '#6d665a'; g.beginPath(); g.moveTo(-50, 0); g.lineTo(-50, -100); g.arc(0, -100, 50, Math.PI, 0); g.lineTo(50, 0); g.closePath(); g.fill();
      g.fillStyle = '#4b463d'; g.fillRect(-8, -120, 16, 70); g.fillRect(-28, -100, 56, 14);
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(-60, -6, 120, 10);
    } else if (o.tipo === 'cacto') {
      g.fillStyle = '#2f5a2a'; rr(-16, -170, 32, 170, 16); rr(-62, -120, 22, 60, 11); rr(-62, -72, 50, 20, 10); rr(40, -140, 22, 70, 11); rr(14, -80, 48, 20, 10);
    } else if (o.tipo === 'barril') {
      g.fillStyle = COR.sangue; rr(-45, -110, 90, 110, 10);
      g.fillStyle = '#7a0306'; g.fillRect(-45, -82, 90, 10); g.fillRect(-45, -36, 90, 10);
      g.fillStyle = COR.osso; g.font = '34px Anton, Impact, sans-serif'; g.textAlign = 'center'; g.fillText('☠', 0, -46);
    }
    g.restore();
  }
  function rr(x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); g.fill(); }

  function moto() {
    if (est.inv > 0 && Math.floor(est.t * 12) % 2 === 0) return;
    var x = CX + est.x * LANE * proj(0).s, y = H - 70, inc = (est.lane - est.x) * 0.5;
    g.save(); g.translate(x + (est.tremor ? (Math.random() - 0.5) * 10 : 0), y); g.rotate(inc * 0.35);
    // sombra
    g.fillStyle = 'rgba(0,0,0,.5)'; g.beginPath(); g.ellipse(0, 18, 70, 14, 0, 0, 7); g.fill();
    // pneu traseiro
    g.fillStyle = '#111'; rr(-22, -40, 44, 62, 14);
    // escapamentos
    g.fillStyle = '#9a9a9a'; rr(-58, -34, 18, 34, 6); rr(40, -34, 18, 34, 6);
    g.fillStyle = 'rgba(213,6,12,' + (0.4 + Math.random() * 0.4) + ')'; g.beginPath(); g.arc(-49, 4, 7, 0, 7); g.arc(49, 4, 7, 0, 7); g.fill();
    // banco e lanterna
    g.fillStyle = '#1c1c1c'; rr(-40, -70, 80, 36, 12);
    g.fillStyle = COR.sangue; rr(-18, -48, 36, 12, 4);
    // jaqueta
    g.fillStyle = '#121212'; g.beginPath(); g.moveTo(-46, -66); g.quadraticCurveTo(-52, -150, 0, -160); g.quadraticCurveTo(52, -150, 46, -66); g.closePath(); g.fill();
    g.strokeStyle = '#2c2c2c'; g.lineWidth = 3; g.beginPath(); g.moveTo(0, -150); g.lineTo(0, -72); g.stroke();
    g.fillStyle = COR.osso; g.font = '16px "Saira Stencil One", sans-serif'; g.textAlign = 'center'; g.fillText('AWHUUU', 0, -110);
    // braços para o guidão
    g.strokeStyle = '#121212'; g.lineWidth = 16; g.lineCap = 'round';
    g.beginPath(); g.moveTo(-40, -135); g.lineTo(-74, -98); g.moveTo(40, -135); g.lineTo(74, -98); g.stroke();
    g.fillStyle = '#9a9a9a'; g.fillRect(-90, -104, 180, 8);
    // juba de lobo (de costas): pelo arrepiado sobre a gola
    g.fillStyle = '#4a4138';
    g.beginPath(); g.moveTo(-40, -150);
    for (var k = 0; k <= 8; k++) { var ax = -40 + k * 10; g.lineTo(ax + 5, -176 - (k % 2 ? 4 : 14)); g.lineTo(ax + 10, -150); }
    g.closePath(); g.fill();
    // cabeça
    g.fillStyle = '#5b5248'; g.beginPath(); g.ellipse(0, -188, 32, 30, 0, 0, 7); g.fill();
    // orelhas longas, abertas para fora
    g.beginPath(); g.moveTo(-30, -198); g.lineTo(-40, -252); g.lineTo(-8, -212); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(30, -198); g.lineTo(40, -252); g.lineTo(8, -212); g.closePath(); g.fill();
    g.fillStyle = '#2e2823'; g.beginPath(); g.moveTo(-24, -206); g.lineTo(-34, -240); g.lineTo(-13, -212); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(24, -206); g.lineTo(34, -240); g.lineTo(13, -212); g.closePath(); g.fill();
    // tufos laterais (bochechas)
    g.fillStyle = '#5b5248';
    g.beginPath(); g.moveTo(-30, -196); g.lineTo(-46, -178); g.lineTo(-30, -176); g.lineTo(-44, -162); g.lineTo(-22, -166); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(30, -196); g.lineTo(46, -178); g.lineTo(30, -176); g.lineTo(44, -162); g.lineTo(22, -166); g.closePath(); g.fill();
    // risca escura no topo da cabeça
    g.fillStyle = '#3e3731'; g.beginPath(); g.ellipse(0, -200, 8, 16, 0, 0, 7); g.fill();
    g.restore();
  }
  function hud() {
    g.fillStyle = 'rgba(10,10,10,.6)'; g.fillRect(0, 0, W, 64);
    g.fillStyle = COR.osso; g.font = '34px Anton, Impact, sans-serif'; g.textAlign = 'left';
    g.fillText(Math.floor(est.dist / 10) + ' m', 20, 46);
    g.textAlign = 'center'; g.fillStyle = COR.sepia; g.font = '26px Anton, Impact, sans-serif';
    g.fillText('● ' + est.discos + (est.discos === 1 ? ' disco' : ' discos'), CX, 44);
    g.textAlign = 'right'; g.fillStyle = COR.sangue; g.font = '30px sans-serif';
    g.fillText('♥'.repeat(Math.max(0, est.vidas)), W - 20, 44);
  }
  function tela(titulo, linhas, rodape) {
    g.fillStyle = 'rgba(10,10,10,.72)'; g.fillRect(0, 0, W, H);
    g.textAlign = 'center'; g.fillStyle = COR.osso; g.font = '78px Anton, Impact, sans-serif'; g.fillText(titulo, CX, H * 0.36);
    g.font = '24px "Space Mono", monospace'; g.fillStyle = COR.sepia;
    linhas.forEach(function (l, i) { g.fillText(l, CX, H * 0.36 + 70 + i * 40); });
    g.fillStyle = COR.sangue; g.font = '30px "Saira Stencil One", sans-serif'; g.fillText(rodape, CX, H * 0.72);
  }
  function faiscas() {
    est.faiscas = est.faiscas.filter(function (f) { return f.v > 0; });
    est.faiscas.forEach(function (f) { g.fillStyle = f.c; g.globalAlpha = f.v; g.fillRect(f.x, f.y, 5, 5); g.globalAlpha = 1; });
  }
  function explode(x, y, c, n) { for (var i = 0; i < n; i++) est.faiscas.push({ x: x, y: y, vx: (Math.random() - 0.5) * 500, vy: -Math.random() * 500, v: 1, c: c }); }

  // ---------- lógica ----------
  function passo(dt) {
    est.t += dt;
    est.faiscas.forEach(function (f) { f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 900 * dt; f.v -= dt * 1.6; });
    if (est.modo !== 'jogo') return;
    est.vel = Math.min(95, 30 + est.dist / 120);
    var dd = est.vel * dt; est.dist += dd * 10 / 3;
    est.x += (est.lane - est.x) * Math.min(1, dt * 14);
    est.inv = Math.max(0, est.inv - dt); est.tremor = Math.max(0, est.tremor - dt);
    est.prox -= dt; if (est.prox <= 0) gera();
    est.objs.forEach(function (o) { o.d -= dd; o.giro += dt * 4; });
    est.objs = est.objs.filter(function (o) {
      if (o.d < 2.2 && o.d > -1.2 && Math.abs(o.lane - est.x) < 0.45 && !o.pego) {
        o.pego = true;
        var px = CX + est.x * LANE, py = H - 150;
        if (o.bom) {
          if (o.tipo === 'disco') { est.discos++; bip(660, 0.12); explode(px, py, COR.osso, 10); }
          else { est.discos += 5; est.dist += 300; bip(880, 0.25, 'triangle'); explode(px, py, COR.sangue, 18); }
          return false;
        }
        if (est.inv <= 0) {
          est.vidas--; est.inv = 1.6; est.tremor = 0.4; bip(140, 0.5, 'sawtooth', 0.15); explode(px, py, COR.sangue, 24);
          if (navigator.vibrate) try { navigator.vibrate(120); } catch (e) {}
          if (est.vidas <= 0) fim();
        }
      }
      return o.d > -CAM + 1;
    });
  }
  function pontos() { return Math.floor(est.dist / 10) + est.discos * 10; }
  function fim() {
    est.modo = 'fim';
    if (trilha) trilha.pause();
    var p = pontos();
    if (p > recorde) { recorde = p; try { localStorage.setItem('awhuuu-e6-recorde', p); } catch (e) {} }
    document.getElementById('e6-comp').hidden = false;
  }
  function comeca() {
    novo(); est.modo = 'jogo'; document.getElementById('e6-comp').hidden = true;
    if (trilha && !mudo) { trilha.currentTime = 0; trilha.play().catch(function () {}); }
    bip(330, 0.2, 'triangle');
  }
  function desenha() {
    ceu(); estrada();
    est.objs.slice().sort(function (a, b) { return b.d - a.d; }).forEach(objeto);
    moto(); faiscas();
    if (est.modo !== 'inicio') hud();
    if (est.modo === 'inicio') tela('ESTRADA 666', ['Junte discos ● e palhetas', 'Desvie de lápide, cacto e barril', '← → ou toque nos lados da tela', 'Recorde: ' + recorde], 'TOQUE PARA ACELERAR');
    if (est.modo === 'pausa') tela('PAUSA', ['Toque para voltar'], '');
    if (est.modo === 'fim') tela('FIM DA ESTRADA', [Math.floor(est.dist / 10) + ' m · ' + est.discos + ' discos', 'Pontos: ' + pontos(), 'Recorde: ' + recorde], 'TOQUE PARA TENTAR DE NOVO');
  }
  var ult = performance.now();
  function laco(agora) {
    var dt = Math.min(0.05, (agora - ult) / 1000); ult = agora;
    passo(dt); desenha(); requestAnimationFrame(laco);
  }
  requestAnimationFrame(laco);

  // ---------- controles ----------
  function muda(l) { if (est.modo !== 'jogo') return; est.lane = Math.max(-1, Math.min(1, est.lane + l)); }
  function acao() {
    if (est.modo === 'inicio' || est.modo === 'fim') comeca();
    else if (est.modo === 'pausa') { est.modo = 'jogo'; if (trilha && !mudo) trilha.play().catch(function () {}); }
  }
  document.addEventListener('keydown', function (e) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', ' ', 'a', 'd', 'A', 'D'].indexOf(e.key) < 0) return;
    if (document.activeElement && /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    e.preventDefault();
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') muda(-1);
    else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') muda(1);
    else acao();
    if (est.modo !== 'jogo') acao();
  });
  var toque = null;
  cv.addEventListener('pointerdown', function (e) {
    e.preventDefault();
    if (est.modo !== 'jogo') { acao(); return; }
    toque = { x: e.clientX, t: Date.now() };
    var r = cv.getBoundingClientRect(); muda(e.clientX - r.left < r.width / 2 ? -1 : 1);
  });
  cv.addEventListener('pointerup', function () { toque = null; });
  document.addEventListener('visibilitychange', function () { if (document.hidden && est.modo === 'jogo') { est.modo = 'pausa'; if (trilha) trilha.pause(); } });
  var bm = document.getElementById('e6-som');
  function rotuloSom() { bm.textContent = mudo ? 'Som: desligado' : 'Som: ligado'; }
  rotuloSom();
  bm.onclick = function () {
    mudo = !mudo; rotuloSom(); try { localStorage.setItem('awhuuu-e6-mudo', mudo ? '1' : '0'); } catch (e) {}
    if (trilha) { if (mudo) trilha.pause(); else if (est.modo === 'jogo') trilha.play().catch(function () {}); }
  };
  document.getElementById('e6-comp').onclick = function () {
    cartaoAwhuuu({ img: '/img/capas/rota-666.webp', rotulo: 'ESTRADA 666', titulo: pontos() + ' PONTOS', linha: Math.floor(est.dist / 10) + ' metros e ' + est.discos + ' discos na estrada do lobo.', arquivo: 'awhuuu-estrada-666.png', texto: 'Fiz ' + pontos() + ' pontos na Estrada 666 do Awhuuu!. Bate?', url: location.href });
  };
})();
