// Cartão vertical (1080x1920) para compartilhar resultado dos jogos nos Stories.
window.cartaoAwhuuu = function (o) {
  var W = 1080, H = 1920, c = document.createElement('canvas'); c.width = W; c.height = H;
  var g = c.getContext('2d');
  function fim() {
    c.toBlob(function (blob) {
      var arq = new File([blob], o.arquivo || 'awhuuu.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [arq] })) {
        navigator.share({ files: [arq], text: (o.texto || '') + ' ' + (o.url || '') }).catch(function () {});
      } else {
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = arq.name; a.click();
        if (navigator.clipboard && o.url) navigator.clipboard.writeText((o.texto || '') + ' ' + o.url).catch(function () {});
      }
    }, 'image/png');
  }
  function desenha(img) {
    g.fillStyle = '#0A0A0A'; g.fillRect(0, 0, W, H);
    if (img) { var s = Math.max(W / img.width, 1250 / img.height); g.drawImage(img, (W - img.width * s) / 2, 0, img.width * s, img.height * s); }
    var grad = g.createLinearGradient(0, 700, 0, 1400); grad.addColorStop(0, 'rgba(10,10,10,0)'); grad.addColorStop(1, 'rgba(10,10,10,1)');
    g.fillStyle = grad; g.fillRect(0, 700, W, 1220);
    g.fillStyle = '#0A0A0A'; g.fillRect(0, 1400, W, 520);
    g.textAlign = 'left';
    g.fillStyle = '#D5060C'; g.font = '700 40px "Space Mono", monospace'; g.fillText(o.rotulo || '', 80, 1330);
    g.fillStyle = '#F4D49A'; var t = String(o.titulo || '').toUpperCase(), tam = 190;
    do { g.font = tam + 'px Anton, Impact, sans-serif'; tam -= 6; } while (g.measureText(t).width > W - 160 && tam > 60);
    g.fillText(t, 80, 1530);
    g.fillStyle = '#D99E62'; g.font = '36px "Space Mono", monospace';
    var palavras = String(o.linha || '').split(' '), linha = '', y = 1620;
    palavras.forEach(function (p) { var tt = linha ? linha + ' ' + p : p; if (g.measureText(tt).width > W - 160) { g.fillText(linha, 80, y); y += 50; linha = p; } else linha = tt; });
    if (linha) g.fillText(linha, 80, y);
    g.fillStyle = '#F4D49A'; g.font = '44px "Saira Stencil One", sans-serif'; g.fillText('AWHUUU!', 80, 1840);
    g.textAlign = 'right'; g.fillStyle = '#8A8475'; g.font = '30px "Space Mono", monospace'; g.fillText('awhuuu.com.br', W - 80, 1840);
    fim();
  }
  var pronto = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  pronto.then(function () {
    if (!o.img) return desenha(null);
    var im = new Image(); im.onload = function () { desenha(im); }; im.onerror = function () { desenha(null); }; im.src = o.img;
  });
};
