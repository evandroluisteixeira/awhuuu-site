"""Renderizador dos carrosséis do Awhuuu! (1080x1350 e versão TikTok 1080x1920)."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import numpy as np, os, random

RAIZ = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
F = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fontes') + '/'
W, H = 1080, 1350
M = 72
MAXW = W - 2 * M
OSSO = (244, 212, 154)
SANGUE = (213, 6, 12)
SEPIA = (217, 158, 98)
CINZA = (150, 138, 118)
FUNDO = (11, 11, 11)

_fc = {}
def fonte(nome, tam):
    arq = {'anton': 'Anton-Regular.ttf', 'mono': 'SpaceMono-Regular.ttf',
           'monob': 'SpaceMono-Bold.ttf', 'ops': 'BlackOpsOne-Regular.ttf'}[nome]
    k = (arq, tam)
    if k not in _fc:
        _fc[k] = ImageFont.truetype(F + arq, tam)
    return _fc[k]

def img(rel):
    return Image.open(os.path.join(RAIZ, rel)).convert('RGBA')

def base(semente=1):
    """Fundo preto com leve calor no alto."""
    y = np.linspace(0, 1, H)[:, None]
    x = np.linspace(-1, 1, W)[None, :]
    r = np.sqrt(x ** 2 + (y - 0.15) ** 2 * 1.6)
    calor = np.clip(1 - r, 0, 1) ** 2
    arr = np.zeros((H, W, 3))
    arr[..., 0] = 9 + 8 * calor
    arr[..., 1] = 9 + 5 * calor
    arr[..., 2] = 9 + 2 * calor
    return Image.fromarray(arr.astype('uint8')).convert('RGBA')

def capa(rel, escurecer=0.82, foco_y=0.5):
    """Imagem de fundo ocupando o card, com sombra embaixo para o título."""
    im = Image.open(os.path.join(RAIZ, rel)).convert('RGB')
    esc = max(W / im.width, H / im.height)
    im = im.resize((int(im.width * esc + 0.5), int(im.height * esc + 0.5)), Image.LANCZOS)
    top = int((im.height - H) * foco_y)
    left = (im.width - W) // 2
    im = im.crop((left, top, left + W, top + H)).convert('RGBA')
    g = np.zeros((H, W, 4), dtype='uint8')
    alfa = np.clip((np.linspace(0, 1, H) - 0.45) / 0.55, 0, 1) ** 1.3 * 255 * escurecer
    g[..., 3] = alfa[:, None].astype('uint8')
    im.alpha_composite(Image.fromarray(g))
    topo = np.zeros((H, W, 4), dtype='uint8')
    topo[..., 3] = (np.clip(1 - np.linspace(0, 1, H) / 0.16, 0, 1) * 150)[:, None].astype('uint8')
    im.alpha_composite(Image.fromarray(topo))
    return im

_emb = None
def emblema(im, x=924, y=52, tam=84):
    global _emb
    if _emb is None:
        e = img('src/img/awhuuu-icone.png').resize((tam * 4, tam * 4), Image.LANCZOS)
        mask = Image.new('L', e.size, 0)
        ImageDraw.Draw(mask).ellipse((0, 0, e.width - 1, e.height - 1), fill=255)
        e.putalpha(mask)
        _emb = e.resize((tam, tam), Image.LANCZOS)
    im.alpha_composite(_emb, (x, y))

def cabecalho(im, texto, cor=SEPIA):
    d = ImageDraw.Draw(im)
    d.text((M, 79), texto.upper(), font=fonte('ops', 38), fill=cor)
    emblema(im)

_logo = None
def rodape(im, pag=None):
    global _logo
    d = ImageDraw.Draw(im)
    d.line((M, 1220, W - M, 1220), fill=(48, 44, 38), width=2)
    d.text((M, 1240), '@awhuuu.rock', font=fonte('mono', 26), fill=CINZA)
    if pag:
        tw = d.textlength(pag, font=fonte('mono', 24))
        d.text(((W - tw) / 2, 1241), pag, font=fonte('mono', 24), fill=(110, 100, 86))
    if _logo is None:
        l = img('src/img/awhuuu-palavra.webp')
        _logo = l.resize((184, int(184 * l.height / l.width)), Image.LANCZOS)
    im.alpha_composite(_logo, (W - M - 184, 1214))

def quebra(d, txt, f, maxw):
    linhas = []
    for parte in txt.split('\n'):
        atual = ''
        for p in parte.split():
            t = (atual + ' ' + p).strip()
            if d.textlength(t, font=f) <= maxw:
                atual = t
            else:
                if atual:
                    linhas.append(atual)
                atual = p
        linhas.append(atual)
    return linhas

def bloco(d, txt, f, x, y, maxw, cor, entre=1.05, centro=False):
    """Escreve texto quebrado em linhas e devolve o y seguinte."""
    asc, desc = f.getmetrics()
    alt = int((asc + desc) * entre)
    for ln in quebra(d, txt, f, maxw):
        xx = x
        if centro:
            xx = x + (maxw - d.textlength(ln, font=f)) / 2
        d.text((xx, y), ln, font=f, fill=cor)
        y += alt
    return y

def caber(d, txt, nome, tam, maxw, max_linhas):
    """Diminui a fonte até o texto caber no número de linhas."""
    while tam > 40:
        if len(quebra(d, txt, fonte(nome, tam), maxw)) <= max_linhas:
            return fonte(nome, tam)
        tam -= 4
    return fonte(nome, tam)

def lista(d, itens, y, f=None, cor=OSSO, maxw=MAXW - 28, gap=14):
    f = f or fonte('mono', 30)
    for it in itens:
        d.rectangle((M, y + 14, M + 11, y + 25), fill=SANGUE)
        y = bloco(d, it, f, M + 28, y, maxw, cor, 1.18) + gap
    return y

_lua = None
def lua(im, cx, cy, r, cor=(226, 196, 140), semente=3):
    """Lua cheia com a textura da lua dos cards da Carta do Lobo."""
    global _lua
    if _lua is None:
        _lua = Image.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lua.png')).convert('RGBA')
    halo = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(halo).ellipse((cx - r * 1.2, cy - r * 1.2, cx + r * 1.2, cy + r * 1.2), fill=cor + (34,))
    im.alpha_composite(halo.filter(ImageFilter.GaussianBlur(r * 0.18)))
    l = _lua.resize((2 * r, 2 * r), Image.LANCZOS)
    camada = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    camada.paste(l, (cx - r, cy - r), l)
    im.alpha_composite(camada)

def vinil(im, cx, cy, r):
    d = ImageDraw.Draw(im)
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(18, 18, 18, 255))
    for k in range(8, int(r), 7):
        d.ellipse((cx - k, cy - k, cx + k, cy + k), outline=(30, 30, 30, 255), width=1)
    rl = int(r * 0.33)
    d.ellipse((cx - rl, cy - rl, cx + rl, cy + rl), fill=SANGUE + (255,))
    d.ellipse((cx - 8, cy - 8, cx + 8, cy + 8), fill=(10, 10, 10, 255))

def foto_quadro(im, rel_ou_img, x, y, w, h, borda=OSSO):
    f = rel_ou_img if isinstance(rel_ou_img, Image.Image) else img(rel_ou_img)
    esc = max(w / f.width, h / f.height)
    f = f.resize((int(f.width * esc + .5), int(f.height * esc + .5)), Image.LANCZOS)
    l = (f.width - w) // 2; t = (f.height - h) // 2
    f = f.crop((l, t, l + w, t + h))
    d = ImageDraw.Draw(im)
    d.rectangle((x - 6, y - 6, x + w + 5, y + h + 5), fill=borda + (255,))
    im.alpha_composite(f, (x, y))

def grao(im, forca=11, semente=7):
    rng = np.random.default_rng(semente)
    a = np.asarray(im.convert('RGB')).astype(np.int16)
    n = rng.normal(0, forca, (H, W, 1))
    a = np.clip(a + n, 0, 255).astype('uint8')
    return Image.fromarray(a)

def salvar(im, pasta, nome, com_grao=True):
    """Grava a versão do Instagram e a do TikTok (card no meio de 1080x1920)."""
    rgb = grao(im) if com_grao else im.convert('RGB')
    os.makedirs(os.path.join(pasta, 'tiktok'), exist_ok=True)
    rgb.save(os.path.join(pasta, nome), quality=90)
    tt = Image.new('RGB', (1080, 1920), FUNDO)
    tt.paste(rgb, (0, 285))
    tt.save(os.path.join(pasta, 'tiktok', nome), quality=90)

def folha(pasta, saida, colunas=5):
    fs = sorted(f for f in os.listdir(pasta) if f.endswith('.jpg'))
    th = [Image.open(os.path.join(pasta, f)).resize((324, 405)) for f in fs]
    linhas = (len(th) + colunas - 1) // colunas
    s = Image.new('RGB', (colunas * 334 + 10, linhas * 415 + 10), (40, 40, 40))
    for i, t in enumerate(th):
        s.paste(t, (10 + (i % colunas) * 334, 10 + (i // colunas) * 415))
    s.save(saida, quality=85)

def remendar(orig, y0, y1, desenho):
    """Troca a faixa y0:y1 de um card pronto por fundo novo com o texto de desenho(im, d)."""
    novo = base(); d = ImageDraw.Draw(novo); desenho(novo, d)
    novo = grao(novo)
    im = Image.open(orig).convert('RGB')
    im.paste(novo.crop((0, y0, W, y1)), (0, y0))
    return im

def titulo(d, linhas, y, tam, centro=True, x=M, entre=1.06):
    """Linhas do título em Anton: [(texto, cor)], com y no topo das maiúsculas. Devolve o y de baixo."""
    f = fonte('anton', tam)
    cap = f.getbbox('H')[3] - f.getbbox('H')[1]
    for t, c in linhas:
        xx = (W - d.textlength(t, font=f)) / 2 if centro else x
        d.text((xx, y + cap), t, font=f, fill=c, anchor='ls')
        y += int(tam * entre)
    return y - int(tam * entre) + cap

def card_capa(rel, kicker, linhas, sub, tam=150, foco_y=0.5, cor_kicker=SANGUE):
    """Capa: ilustração de fundo, título embaixo, chamada em mono."""
    im = capa(rel, foco_y=foco_y)
    cabecalho(im, kicker, OSSO)
    d = ImageDraw.Draw(im)
    f = fonte('anton', tam)
    cap = f.getbbox('H')[3] - f.getbbox('H')[1]
    passo = int(tam * 1.06)
    y = 1180 - 34 - cap - passo * (len(linhas) - 1)
    titulo(d, linhas, y, tam, centro=False)
    d.text((M, 1180), sub, font=fonte('mono', 28), fill=SEPIA)
    return im

def card_texto(kicker, rotulo, linhas_titulo, pag, tam=110, cor_kicker=SEPIA):
    im = base(); cabecalho(im, kicker, cor_kicker)
    d = ImageDraw.Draw(im)
    if rotulo:
        d.text((M, 226), rotulo, font=fonte('ops', 46), fill=SANGUE)
    y = titulo(d, linhas_titulo, 300, tam, centro=False)
    rodape(im, pag)
    return im, d, y
