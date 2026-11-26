# Guia de redação do Awhuuu!

Vale para tudo o que o site publica: matérias, legendas, carrosséis, agenda, casas, newsletter. Também vale para quem escrever com a gente no futuro, e para as rotinas automáticas.

## 1. A diversidade mora em todas as editorias

- Não existe "editoria da diversidade". As histórias de gente negra, indígena, LGBTQIA+, de mulheres, da periferia e de pessoas com deficiência entram na Rota 666, na Hora do Lobo, no Mondo Bizarro, na Pedrada, no Remendo, em As Imortais e em todas as outras.
- Meta de pauta: **pelo menos uma matéria por mês** que traga uma dessas histórias para o centro. O calendário está em `docs/PAUTAS-DIVERSIDADE.md`.
- Fita Gasta: toda playlist temática passa por uma pergunta antes de fechar: quem está faltando aqui?

## 2. Como chamar as pessoas

- **Do jeito que elas se chamam.** Nome, pronomes e identidade que a própria pessoa usa hoje. Pessoa trans: só o nome atual, inclusive quando se fala do passado. Não citar o nome antigo.
- **Orientação e identidade só quando importam para a história**, e com fonte: a pessoa falou publicamente sobre isso. Nunca especular sobre a vida de ninguém.
- **Povos indígenas pelo nome do povo**: Xavante, Guarani Kaiowá, Kaingang, Maori. Dizer "indígena" (e não "índio") quando o termo for geral.
- **Raça com precisão**: "negro", "pessoa negra", "artista negra". Nada de eufemismo ("de cor", "moreno") nem de destaque gratuito.
- **Deficiência**: "pessoa com deficiência", e só quando for parte da história. Ninguém é "exemplo de superação" por existir.

## 3. Como contar a história

- **A música vem primeiro.** Ninguém entra na matéria só como "a primeira X do rock". O que a pessoa tocou, gravou, inventou?
- **Nada de exotismo.** Cultura indígena, periferia ou religião de matriz africana não são cenário nem fantasia.
- **Diga quem ficou com o crédito e com o dinheiro.** Quando uma música de artista negro virou sucesso na voz de um branco, a matéria conta isso.
- **Ouça e cite vozes de dentro**: artistas, pesquisadoras e pesquisadores, jornalistas e veículos das próprias comunidades.
- **Temas pesados** (violência, racismo, morte, doença) com cuidado: fato com fonte, sem detalhe gratuito, sem tom de piada.

## 4. Palavras

| Use | Evite |
|---|---|
| pessoa negra, artista negra | de cor, moreno (como eufemismo), "mulata" |
| indígena, povo Xavante, Guarani Kaiowá | índio, tribo (no sentido de "atrasado"), "aldeia" como xingamento |
| pessoa trans, mulher trans, homem trans | "travesti" como ofensa, "nasceu homem/mulher", nome antigo |
| pessoa LGBTQIA+, gay, lésbica, bi | "opção sexual", "homossexualismo" |
| pessoa com deficiência | deficiente, portador, "aleijado", "doente" |
| periferia, quebrada (quando a própria cena usa) | "comunidade carente" como rótulo genérico |
| mulher no rock, guitarrista | "guitarrista mulher" como se fosse exceção, comentários sobre aparência |

## 5. Imagens e personagens

- Os monstros (o lobo, a vampira, a criatura costurada) são os de fora que viraram anfitriões. Eles nunca riem de quem está de fora.
- Ilustrações com pessoas: variedade de corpos, cores e estilos, sem caricatura.

## 6. Antes de publicar

- [ ] A matéria chama cada pessoa como ela se chama?
- [ ] Algum termo da coluna "Evite" escapou?
- [ ] Se fala de uma comunidade, cita pelo menos uma fonte dessa comunidade?
- [ ] A música está no centro, e não só o rótulo?
- [ ] Alguém dessa história leria e se reconheceria com respeito?

## 7. Errou?

Corrige no ato, com uma linha no fim da matéria dizendo o que mudou e quando. A página pública `/pra-quem/` convida o leitor a apontar os erros.

## Como escrever uma reportagem

Vale para Rota 666, Hora do Lobo, Mondo Bizarro e As Imortais. Pedrada, Remendo, guias da Garagem e Fita Gasta seguem formatos próprios, mais curtos. Modelo: a matéria do Queen no Rock in Rio (`src/materias/queen-rock-in-rio-1985.md`).

**Tamanho:** de 1.200 a 2.000 palavras. Menos que isso vira lista de fatos; mais que isso vai para o Substack.

**Quem assina:** campo `assina` da matéria, com o código de `src/_data/assinaturas.json` (página pública `/quem-escreve/`). Pode ser o Evandro, o Lobo, a Vampira, a Criatura ou um pseudônimo novo criado lá. Regras para personagens e pseudônimos:
- Aparecem sempre com o selo "personagem da casa" e estão listados em Quem escreve. Nunca se apresentam como jornalista real, nunca têm foto de pessoa real e nunca "entrevistam" ninguém.
- Podem ter voz, manias e humor próprios. Os fatos, não: mesma apuração, mesmas fontes, mesma lista no fim.
- Personagem não inventa lembrança de pessoa real nem põe fala na boca de ninguém. Citação é só a que tem fonte.
- Bom uso: o Lobo nas crônicas de madrugada e na Pedrada, a Vampira em As Imortais, a Criatura no Remendo, um pseudônimo para um tom bem diferente (o colunista rabugento, a cronista da noite de Floripa).

**Quem fala:** quando assina o Evandro, o repórter, em primeira pessoa. O "eu" serve para assumir leitura, dúvida e opinião ("o que me interessa nessa noite", "não vou fingir que sei"). Nunca para inventar lembrança ou presença: se o Evandro não estava lá, o texto não diz que estava.

**Estrutura:**
1. **Cena** no primeiro parágrafo: hora, lugar, clima, gente. Nada de "Em 1985, a banda X...".
2. **Por que importa**, no segundo ou terceiro parágrafo: a pergunta ou a tese da matéria, numa frase que o leitor consiga repetir. Não basta "foi histórico".
3. **Desenvolvimento** em 3 a 5 seções com intertítulo, cada uma com uma ideia (não um fato solto). Dentro da seção, parágrafos de 3 a 6 frases.
4. **A informação que quase ninguém conta.** Toda reportagem precisa de pelo menos uma: um dado de época, uma contradição entre fontes, um bastidor. É o que diferencia a matéria do verbete.
5. **Brasil e Sul no mapa**: quando a história permitir, o que ela tem a ver com o país, com SC, com quem lê aqui.
6. **Fecho** que amarra a tese, sem moral da história.

**Fontes:**
- Wikipédia, Last.fm e sites de curiosidades servem para achar o caminho, não para sustentar a matéria. Cada fato importante precisa de uma fonte de imprensa, de livro, de entrevista ou do arquivo oficial da banda.
- Procure pelo menos uma fonte **da época** (jornal, revista ou TV do ano do fato; capa de jornal citada já ajuda) e pelo menos uma fala **das pessoas envolvidas**, com quem disse, onde e quando.
- Quando as fontes divergem (público, data, horário), diga que divergem e dê as duas.
- Citação traduzida do inglês: traduza e diga onde a pessoa falou.
- Interpretação de terceiro vem atribuída ("segundo a Louder"). Interpretação sua vem assumida ("eu fico com...").

**Frase:**
- Verbo concreto, imagem que dá para ver. Nada de "lendário", "icônico", "épico", "o maior de todos os tempos" sem número por trás.
- Varie o tamanho das frases. Uma curta e seca depois de uma longa.
- Gíria só quando a cena pede; o tom marginal vem da franqueza e do ponto de vista, não do palavrão.

**Antes de publicar, além da lista da seção 6:**
- [ ] O primeiro parágrafo é uma cena?
- [ ] Dá para dizer a tese em uma frase?
- [ ] Tem a informação que quase ninguém conta?
- [ ] Cada número e cada citação têm fonte na lista?
- [ ] Algum "eu" afirma algo que o Evandro não viveu?
- [ ] Tem vídeo oficial ou foto de lugar no ponto certo do texto?

## Vídeos e fotos no meio do texto

Para pôr um vídeo do YouTube entre dois parágrafos, numa linha sozinha:

    {% video "LINK-OU-CÓDIGO-DO-VÍDEO", "Legenda curta dizendo o que é", "canal oficial de Fulano" %}

Prefira o canal oficial da banda, da gravadora ou do programa de TV. Upload de fã só quando não houver outro.

Para pôr uma foto com crédito:

    {% figura "LINK-DA-IMAGEM", "Legenda", "Autor, licença", "link da página da foto" %}

Fotos de lugares, objetos e documentos de licença livre (Wikimedia Commons) entram sempre com autor e licença. Fotos de divulgação das bandas: só as que a própria banda distribui para imprensa, com o crédito que ela pede.

## Substack: textos longos exclusivos

O Substack (awhuuu.substack.com) não repete o site. Lá saem ensaios e reportagens longas que só existem lá, e é isso que faz alguém assinar.

- **Tamanho:** de 2.500 a 4.000 palavras. **Ritmo:** um a cada quinze dias, sempre no mesmo dia da semana.
- **Assinatura:** quase sempre o Evandro, em primeira pessoa. É onde entra o que só ele tem: o ouvido de quem canta e dá aula de canto, a cena de Floripa vista de dentro, a experiência de tocar rock no Brasil e de viver na França.
- **Estrutura:** a mesma das reportagens do site, com mais fôlego: mais de uma cena, mais vozes, e um argumento que se desenvolve.
- **Ligação com o site:** cada texto termina com dois ou três links para matérias, a agenda ou a página da banda no site. No site, a caixa da newsletter anuncia o texto da quinzena.
- **Fontes:** a lista de fontes no fim, como no site.
- **Configuração a fazer pelo Evandro no Substack:** ligar a opção que deixa o Google encontrar a publicação (hoje ela está escondida dos buscadores) e escrever a página "Sobre" com o que o leitor recebe e com que frequência.

Primeiras pautas (cada uma usa uma base que o Evandro já tem):
1. **Como se grita sem se machucar.** O que acontece na garganta do growl, do drive e do grito, contado por quem ensina canto. (Base: pesquisa de drives vocais.)
2. **Raul, Exu e o rock de encruzilhada.** O ponto de umbanda em "Mosca na Sopa" e o que o rock brasileiro fez com as religiões de matriz africana. (Seguir a seção 3 do guia: sem exotismo, com vozes de dentro.)
3. **Téléphone e Legião Urbana: o tédio em duas línguas.** Duas gerações que cantaram a mesma falta de saída, em Paris e em Brasília. (Base: série rock França-Brasil.)
4. **Floripa, 1983: rock numa ilha que ainda era vila.** A cena de *Nas Manhãs do Sul do Mundo* e os primeiros palcos de rock da cidade. (A apurar.)

## Redes: o carrossel nasce da reportagem

O carrossel do Instagram e o vídeo do TikTok saem da matéria já pronta, não o contrário.

- **Card 1:** a cena do primeiro parágrafo, em uma frase e uma imagem. Nada de "Você sabia?".
- **Card 2:** a tese, a pergunta que a matéria responde.
- **Cards 3 a 7:** um fato por card, na ordem da história, com a informação que quase ninguém conta no meio, não no fim.
- **Penúltimo card:** a fonte principal ("Fontes: Louder, Rolling Stone Brasil, arquivo oficial do Queen").
- **Último card:** o convite ("A história inteira está no site, link na bio") e a pergunta da matéria.
- **Legenda:** duas ou três frases que contam algo que não está nos cards, mais a pergunta. Hashtags no máximo cinco, específicas (#rockinrio #queen), nunca genéricas (#rock #music).
- **Quem assina a matéria assina o post:** se é do Lobo, a legenda tem a voz do Lobo.
- **Vídeo:** quando houver disco do acervo, o Evandro mostra o disco tocando por 15 a 30 segundos e o texto do carrossel vira legenda na tela.

## Produtos e playlists em toda publicação

Toda publicação que puder levar link leva produto: matéria do site, texto do Substack, carrossel, vídeo. O produto sai do próprio texto (o disco de que se fala, o livro que serviu de fonte, o instrumento do guia), nunca de um catálogo genérico.

- **No site:** os produtos vão no campo Achados da matéria, com o tipo no começo do nome ("Vinil: ...", "Livro: ...", "CD: ..."). Assim eles aparecem também na Loja do lobo, no filtro certo.
- **No Substack:** seção "Para levar pra casa" antes das Fontes, com 2 a 5 itens e uma frase dizendo por que cada um está ali. Embaixo, em itálico, o aviso de afiliados.
- **Nas redes:** o link vai na bio ou no primeiro comentário, apontando para a matéria ou para a Loja, nunca direto para a loja do produto.
- **Links:** Amazon com a tag `awhuuu-20`; Mercado Livre e Magalu com os links de afiliado do Awhuuu!. Conferir se o produto está disponível e tem preço antes de pôr o link.
- **Aviso:** onde houver link de afiliado, o aviso de comissão aparece no mesmo lugar.

Toda publicação sobre música também ganha playlist: no Spotify (perfil do Evandro, pública) e no YouTube (canal @awhuuurock, pública), só com vídeos de canais oficiais. As duas vão no fim do texto, em "Para ouvir".
