import sys; sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__)))
from arte import *
P=''+RAIZ+'/img/posts/semana2/carta2'
O=''+RAIZ+'/img/posts/semana2/carta/'
def c1(im,d):
    yb=titulo(d,[('DUAS CARTAS',OSSO),('POR MÊS',SANGUE)],826,140)
    s='A NEWSLETTER DO AWHUUU! · ARRASTA →'; fm=fonte('mono',26)
    d.text(((W-d.textlength(s,font=fm))/2,yb+34), s, font=fm, fill=SEPIA)
salvar(remendar(O+'01.jpg',815,1212,c1), P, '01.jpg', com_grao=False)
im = base(); vinil(im, 1100, 1010, 240); cabecalho(im, 'CARTA DO LOBO')
d = ImageDraw.Draw(im)
d.text((M,226), 'O QUE VEM NELA', font=fonte('ops',50), fill=SANGUE)
y = titulo(d,[('ROCK CONTADO',OSSO),('SEM PRESSA',OSSO)],308,116,centro=False)
lista(d, ['Dois textos longos por mês, com as fontes no fim.',
          'Um deles é aberto e chega de graça no seu e-mail.',
          'O outro é de quem assina e mantém o lobo uivando.',
          'Primeira Fila: o sócio fundador ganha a camiseta do lobo.'], y+40, maxw=760)
rodape(im,'2/3'); salvar(im, P, '02.jpg')
def c3(im,d):
    yb=titulo(d,[('UMA DE GRAÇA.',OSSO),('SEM SPAM. SÓ UIVO.',OSSO)],760,92)
    s='Assine: link na bio · awhuuu.substack.com'; fm=fonte('mono',26)
    d.text(((W-d.textlength(s,font=fm))/2,yb+30), s, font=fm, fill=SEPIA)
salvar(remendar(O+'03.jpg',700,1205,c3), P, '03.jpg', com_grao=False)
folha(P, '/tmp/carta.jpg', 3)
