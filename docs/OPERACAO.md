# Operação do Awhuuu!: como o site e as redes andam toda semana

Este arquivo é o ponto de partida de qualquer conversa nova de trabalho no Awhuuu!. Quem abrir uma conversa nova lê este arquivo, o `GUIA-DE-REDACAO.md` e o `PAUTAS-DIVERSIDADE.md` antes de fazer qualquer coisa.

## O princípio: produzir em lote, publicar sozinho

Produzir aos pouquinhos, todo dia, gasta mais do que produzir de uma vez. Cada conversa nova começa do zero e cada mensagem numa conversa longa reprocessa tudo o que veio antes. Por isso:

- **Uma conversa de produção por mês**, aberta nova, com uma lista fechada de entregas.
- **Uma conversa curta por semana** só se aparecer algo que não estava previsto.
- **O resto roda sozinho**, em tarefas agendadas e no próprio site, que publica as matérias no dia marcado.

## O que roda sozinho

| Quando | O quê | Onde |
|---|---|---|
| Todo dia | O site publica a matéria do dia (a data fica no cabeçalho da matéria) | GitHub Actions |
| Segunda, 7h23 | Agenda de shows, casas novas, vídeos e fotos das matérias da semana, relatório do Clube | Tarefa agendada "Último Bonde" |
| No horário marcado | Posts do Instagram e do TikTok | Buffer (plano grátis: até 10 agendados por rede) |

O limite de 10 agendados por rede no Buffer é o gargalo: os rascunhos aprovados precisam ser agendados aos poucos, conforme as vagas abrem.

## A conversa de produção do mês

Abrir uma conversa nova e pedir: "Produção do mês de <mês>: leia docs/OPERACAO.md". A entrega do mês:

1. **Pauta do mês** (8 a 12 matérias), equilibrando as editorias e seguindo `PAUTAS-DIVERSIDADE.md`. O Evandro aprova a lista antes de escrever.
2. **As matérias**, com data de publicação, achados (produtos) e fontes.
3. **Os posts das redes** de cada matéria, como rascunho no Buffer, com a data e o horário.
4. **Dois textos longos do Substack** (um aberto, um pago), como rascunho.
5. **Playlists** no Spotify e no YouTube para os textos sobre música.
6. **Um lançamento da loja**, quando houver produto novo.
7. **Checagem final:** fatos contra as fontes e o site compilando com `MOSTRAR_FUTURO=1`.

## O que só o Evandro faz

- Aprovar a pauta do mês e os rascunhos (no Buffer e no Substack).
- Publicar no Substack e trocar link de bio.
- Responder comentários e mensagens.
- Fotos de pessoas reais e do acervo, pelo editor do site.
- Qualquer decisão sobre dinheiro: preços, anúncios, compras.

## Calendário fixo

- **Sexta de Lua Cheia:** playlist especial na sexta mais próxima da lua cheia.
- **Último Bonde:** agenda do fim de semana, toda sexta de manhã.
- **Substack:** um texto na primeira quinzena e outro na segunda.
- **Loja:** no máximo uma peça nova por mês, lançada junto de uma matéria que tenha a ver com ela.

## Loja

- Produtos próprios: Uma Penca, loja `umapenca.com/awhuuu`. Artes-fonte e vetores ficam com o Evandro (não no site).
- No site: `src/_data/loja.json`, editável no CMS em "Loja do lobo". A área "Coisas do Awhuuu!" só é ligada quando os produtos estiverem aprovados na Uma Penca.
- Ideias na fila: caneca preta com a marca; série de camisetas com as capas das editorias (precisa de artes em alta resolução).
