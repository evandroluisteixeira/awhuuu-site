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

O limite de 10 agendados por rede no Buffer é o gargalo: os rascunhos precisam ser agendados aos poucos, conforme as vagas abrem. Uma tarefa automática para isso foi barrada (publicaria sem supervisão). Combinado: o agendamento é feito numa conversa, com o Evandro autorizando na hora; a tag "segurar" marca rascunho que não deve sair. Rodadas fixas de agendamento: **segunda e quinta de manhã** (lembretes marcados na conversa de operação).

No TikTok há dois modos: os posts de 26/11 a 2/12 estão em "Notify Me" (o Buffer avisa às 20h30, o Evandro escolhe o som e publica pelo celular); os de 3/12 em diante, e todos os novos, saem sozinhos. Para pôr som num post automático, trocar o modo no Buffer antes da hora.

## Produtos: adequar ao cliente

Vender melhor é deixar a pessoa escolher: cor da malha, tamanho, modelo (camiseta, regata, moletom, caneca) e versões da mesma arte para fundo claro e escuro. Cada arte nova sai pelo menos em duas versões de cor.

## Datas marcadas

- **17/12/2026:** voltar "Raul, Exu e o rock de encruzilhada" (Substack) para só assinantes pagantes.
- **Antes de 25/12/2026:** deixar pública no Spotify a playlist "Awhuuu! Noite Feliz Lua Cheia" (ID 3tJgms9XOykwUzHDM3Z8G3), que está na matéria de Natal, e conferir as 11 faixas. Se não ficar pública, tirar o `spotify_playlist` da matéria.

## Campanha de Natal 2026

| Data | Rede | Site |
|---|---|---|
| Sáb 12/12, 12h | Carrossel "Natal do lobo" (camiseta, caneca, assinatura de presente) | Loja do lobo |
| Sáb 19/12, 11h | Carrossel "Presente de lobo" | Matéria `presente-de-lobo` (guia por bolso) |
| Qua 23/12, 19h | Post da superlua (22h28, a lua cheia mais perto da Terra em 2026) | — |
| Sex 25/12, 20h | Carrossel da fita de Natal | Matéria `noite-feliz-lua-cheia` (Fita Gasta #2, Sexta de Lua Cheia) |

Artes em `img/posts/natal/`. O Último Bonde de 11 e 18/12 é escrito na rodada de segunda (7 e 14/12), com a agenda já atualizada pela busca semanal.

## Assinaturas (Substack)

- A newsletter se chama **Carta do Lobo** e é de **dois textos longos por mês**. Nenhum post pode prometer carta semanal.

- Grátis: um ensaio aberto por mês. Pago: R$ 15/mês ou R$ 150/ano (é o Clube da Lua Cheia digital). Fundador "Primeira Fila": R$ 330/ano, com a camiseta do lobo no tamanho da pessoa a cada ano e voto na pauta do mês. (Nada de "alfa": a marca se afasta da imagem de dominação.)
- A camiseta do fundador é comprada pelo Evandro na Uma Penca (preço base) e enviada ao endereço do assinante, que é pedido por e-mail junto com o tamanho: o Substack não coleta endereço.
- Clube físico (disco em casa, caixas de presente): só depois de a lista de espera (tabela `interessados`) passar de 20 a 30 pessoas e de falar com o contador. Plano em `supabase/CLUBE-FASE2.md`.

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
