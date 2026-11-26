import sys; sys.path.insert(0, __import__('os').path.dirname(__import__('os').path.abspath(__file__)))
from arte import *
R=''+RAIZ+'/img/posts/natal/'
mono=fonte('mono',30); monop=fonte('mono',27)
def itens_preco(d, y, itens, tam=62, nota_f=None):
    """Linhas 'nome ......... preço'."""
    for nome, preco, nota in itens:
        d.text((M, y), nome, font=fonte('anton',tam), fill=OSSO)
        tw=d.textlength(preco,font=fonte('anton',tam))
        d.text((W-M-tw, y), preco, font=fonte('anton',tam), fill=SANGUE)
        y+=int(tam*1.3)
        if nota:
            y=bloco(d, nota, nota_f or fonte('mono',30), M, y, MAXW, SEPIA, 1.22)+10
        y+=24
    return y

# ===== 1. LOJA / NATAL DO LOBO (12/12) =====
P=R+'loja'
im=card_capa('src/img/lobo/lobo-toca-discos.webp','LOJA DO LOBO',[('NATAL',OSSO),('DO LOBO',SANGUE)],'PRESENTE COM UIVO · ARRASTA →',tam=170)
salvar(im,P,'01.jpg')
for n,(arq,nome,preco,txt) in enumerate([
    ('src/img/loja-lobo-da-lua-cheia.webp','CAMISETA LOBO DA LUA CHEIA','R$ 79,90','Preta, com o lobo tocando guitarra diante da lua cheia.'),
    ('src/img/loja-caneca-awhuuu.webp','CANECA AWHUUU!','R$ 59,90','Branca, com o letreiro do lobo dos dois lados.')],2):
    im=base(); cabecalho(im,'LOJA DO LOBO'); d=ImageDraw.Draw(im)
    foto_quadro(im, arq, 250, 190, 580, 580)
    d=ImageDraw.Draw(im)
    y=titulo(d,[(nome,OSSO)],830,72)
    d.text((M,y+26),preco,font=fonte('anton',84),fill=SANGUE)
    bloco(d, txt+' Feita sob demanda pela Uma Penca, com entrega para todo o Brasil.', monop, M, y+140, MAXW, SEPIA, 1.2)
    rodape(im,f'{n}/5'); salvar(im,P,f'0{n}.jpg')
im=base(); lua(im, 940, 1075, 100); cabecalho(im,'CARTA DO LOBO'); d=ImageDraw.Draw(im)
d.text((M,226),'PARA A VÉSPERA',font=fonte('ops',46),fill=SANGUE)
y=titulo(d,[('O PRESENTE QUE',OSSO),('CHEGA POR E-MAIL',OSSO)],300,96,centro=False)
lista(d,['Assinatura de presente da Carta do Lobo: dois textos longos por mês sobre rock.',
         'R$ 15 por mês ou R$ 150 por ano.',
         'Primeira Fila, R$ 330 por ano: a pessoa ainda recebe em casa a camiseta do lobo, no tamanho dela.',
         'Sem frete e sem tamanho errado.'], y+44, f=fonte('mono',32), maxw=720)
rodape(im,'4/5'); salvar(im,P,'04.jpg')
im=base(); lua(im, W//2, 470, 260); cabecalho(im,'LOJA DO LOBO'); d=ImageDraw.Draw(im)
y=titulo(d,[('LINK NA BIO',OSSO)],800,120)
bloco(d,'Camiseta e caneca são impressas depois do pedido: confira o prazo de entrega na loja antes de contar com elas para o dia 24.',monop,M+40,y+34,MAXW-80,SEPIA,1.25,centro=True)
rodape(im,'5/5'); salvar(im,P,'05.jpg')
folha(P,'/tmp/loja.jpg')

# ===== 2. GUIA PRESENTE DE LOBO (19/12) =====
P=R+'guia'
im=card_capa('src/img/capas/trapos-e-bugigangas.webp','TRAPOS E BUGIGANGAS',[('PRESENTE',OSSO),('DE LOBO',SANGUE)],'GUIA DE NATAL · ARRASTA →',tam=170)
salvar(im,P,'01.jpg')
im,d,y=card_texto('TRAPOS E BUGIGANGAS','ATÉ CEM REAIS',[('A BUGIGANGA CERTA',OSSO)],'2/7',96)
itens_preco(d,y+50,[('Corrente dupla para calça','R$ 19',None),('Choker de couro com spikes','R$ 47',None),
  ('Bracelete de spikes','R$ 52',None),('Caneca do Awhuuu!','R$ 59,90',None),('Cinto de pirâmides','R$ 75',None),
  ('Camiseta do lobo','R$ 79,90',None)])
d.text((M,1160),'Preços de quando as matérias saíram. Confira na loja.',font=fonte('mono',24),fill=CINZA)
salvar(im,P,'02.jpg')
im,d,y=card_texto('TRAPOS E BUGIGANGAS','DISCO EMBAIXO DA ÁRVORE',[('SE ABRE DUAS VEZES',OSSO)],'3/7',96)
vinil(im,1110,1040,230); d=ImageDraw.Draw(im)
y=y+50
for t,s in [('MTV Unplugged in New York','Nirvana, 1994'),('Love Gun','Kiss, 1977'),('Please Please Me','The Beatles, 1963'),('Krig-ha, Bandolo!','Raul Seixas, 1973')]:
    d.text((M,y),t,font=fonte('anton',72),fill=OSSO); y+=92
    d.text((M,y),s,font=fonte('mono',30),fill=SEPIA); y+=74
salvar(im,P,'03.jpg')
im,d,y=card_texto('TRAPOS E BUGIGANGAS','PARA QUEM LÊ',[('TRÊS LIVROS',OSSO)],'4/7',110)
y=y+50
for t,s in [('Mate-me por favor','A história do punk contada por quem estava lá. L&PM.'),('Eu sou Ozzy','A autobiografia, com a história do morcego. Belas Letras.'),('Rock in Rio, a história','De Luiz Felipe Carneiro, para quem estava em Jacarepaguá em 1985.')]:
    d.text((M,y),t,font=fonte('anton',72),fill=OSSO); y+=92
    y=bloco(d,s,fonte('mono',31),M,y,MAXW,SEPIA,1.22)+44
salvar(im,P,'04.jpg')
im,d,y=card_texto('TRAPOS E BUGIGANGAS','PARA TOCAR OU OUVIR ALTO',[('O PRESENTE GRANDE',OSSO)],'5/7',96)
itens_preco(d,y+60,tam=58,itens=[('Toca-discos AT-LP60X','R$ 1.190 a 1.400','Cápsula magnética, agulha trocável e pré-amplificador embutido. Fuja da maleta.'),
   ('Guitarra e ampli','R$ 2.100 a 2.500','Tagima TG-530 com Boss Katana Mini, que toca com pilha e tem saída de fone. Reserve uma regulagem com luthier.')])
salvar(im,P,'05.jpg')
im,d,y=card_texto('CARTA DO LOBO','PARA QUEM DEIXOU PARA A VÉSPERA',[('CHEGA POR E-MAIL',OSSO)],'6/7',100)
lua(im,900,1000,120); d=ImageDraw.Draw(im)
lista(d,['Assinatura de presente da Carta do Lobo: dois textos longos por mês.',
         'R$ 15 por mês ou R$ 150 por ano.',
         'Primeira Fila, R$ 330 por ano, com a camiseta do lobo na casa da pessoa.'], y+44, f=fonte('mono',32), maxw=720)
salvar(im,P,'06.jpg')
im=base(); lua(im, W//2, 470, 260); cabecalho(im,'TRAPOS E BUGIGANGAS'); d=ImageDraw.Draw(im)
y=titulo(d,[('GUIA COMPLETO',OSSO),('NO LINK DA BIO',SANGUE)],790,110)
bloco(d,'Com os links de cada loja. Preço muda rápido em dezembro: confira antes de fechar.',monop,M+40,y+34,MAXW-80,SEPIA,1.25,centro=True)
rodape(im,'7/7'); salvar(im,P,'07.jpg')
folha(P,'/tmp/guia.jpg',4)

# ===== 3. SUPERLUA (23/12) =====
P=R+'superlua'
im=base(); lua(im, W//2, 520, 360, semente=9); cabecalho(im,'SEXTA DE LUA CHEIA',SANGUE); d=ImageDraw.Draw(im)
d.text((M,940),'QUARTA, 23 DE DEZEMBRO',font=fonte('ops',44),fill=SANGUE)
y=titulo(d,[('HOJE, 22H28',OSSO)],1005,150,centro=False)
d.text((M,1162),'A lua cheia mais perto da Terra em 2026.',font=fonte('mono',28),fill=SEPIA)
salvar(im,P,'01.jpg')
im=base(); lua(im, W//2, 430, 220, semente=9); cabecalho(im,'SEXTA DE LUA CHEIA'); d=ImageDraw.Draw(im)
y=titulo(d,[('SUPERLUA NA',OSSO),('VÉSPERA DO NATAL',SANGUE)],720,112)
bloco(d,'Ela nasce no leste quase junto com o pôr do sol. Olha pra cima e uiva. Sexta tem fita de Natal.',monop,M+40,y+34,MAXW-80,SEPIA,1.25,centro=True)
rodape(im,'2/2'); salvar(im,P,'02.jpg')
folha(P,'/tmp/superlua.jpg',2)

# ===== 4. FITA DE NATAL (25/12) =====
P=R+'fita'
im=card_capa('src/img/capas/sexta-de-lua-cheia.webp','SEXTA DE LUA CHEIA',[('NOITE FELIZ,',OSSO),('LUA CHEIA',SANGUE)],'FITA GASTA #2 · ARRASTA →',tam=160,foco_y=0.3)
salvar(im,P,'01.jpg')
faixas=[('Christmas (Baby Please Come Home)','Darlene Love','1963'),('Back Door Santa','Clarence Carter','1968'),
 ('Little Drummer Boy / Silent Night','Jimi Hendrix','1969'),('Merry Xmas Everybody','Slade','1973'),
 ('Father Christmas','The Kinks','1977'),('Christmas Wrapping','The Waitresses','1981'),
 ('2000 Miles','Pretenders','1983'),("Thank God It's Christmas",'Queen','1984'),
 ('Papai Noel, Velho Batuta','Garotos Podres','1985'),('Fairytale of New York','The Pogues e Kirsty MacColl','1987'),
 ("Merry Christmas (I Don't Want to Fight Tonight)",'Ramones','1989')]
for pag,(ini,fim) in enumerate([(0,6),(6,11)],2):
    im,d,y=card_texto('FITA GASTA #2','LADO '+('A' if pag==2 else 'B'),[('ONZE FAIXAS' if pag==2 else 'DO GLAM AO ABC',OSSO)],f'{pag}/4',100)
    y+=40
    for i in range(ini,fim):
        m,a,ano=faixas[i]
        d.text((M,y+6),f'{i+1:02d}',font=fonte('anton',44),fill=SANGUE)
        y2=bloco(d,m,fonte('anton',44),M+80,y,MAXW-80,OSSO,1.0)
        d.text((M+80,y2+2),f'{a} · {ano}',font=fonte('mono',25),fill=SEPIA)
        y=y2+52
    salvar(im,P,f'0{pag}.jpg')
im,d,y=card_texto('FITA GASTA #2','NOTA DE RODAPÉ',[('O PAPAI NOEL',OSSO),('DO ABC',OSSO)],'4/4',110)
y=bloco(d,'Os Garotos Podres, de Mauá, gravaram "Papai Noel, Velho Batuta" no primeiro disco, de 1985. O título original era bem menos educado: a banda trocou o nome para passar pela censura.',fonte('mono',36),M,y+44,MAXW,OSSO,1.3)
bloco(d,'Playlist e matéria no link da bio.',fonte('mono',36),M,y+30,MAXW,SEPIA,1.25)
salvar(im,P,'04.jpg')
folha(P,'/tmp/fita.jpg',4)
print('ok')
