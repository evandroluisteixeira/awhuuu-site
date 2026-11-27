# Operação do Awhuuu!: como o site e as redes andam toda semana

Este arquivo é o ponto de partida de qualquer conversa nova de trabalho no Awhuuu!. Quem abrir uma conversa nova lê este arquivo, o `GUIA-DE-REDACAO.md` e o `PAUTAS-DIVERSIDADE.md` antes de fazer qualquer coisa.

## Onde se trabalha (uma conversa só para a operação)

- **Operação do dia a dia:** a conversa "Administração da Awhuuu!". É a única que mexe no site, no Buffer, no Metricool, no Substack e na loja. Ela tem as rodadas de segunda e quinta até 28/12.
- **Produção do mês:** uma conversa nova por mês, aberta com "Produção do mês de <mês>: leia docs/OPERACAO.md".
- **Conversas de assunto próprio** (LinkedIn, por exemplo) não mexem na operação: se algo mudar lá, anotar aqui.
- A conversa antiga de criação do site e da marca está encerrada para a operação. Tudo o que ela decidiu está neste arquivo e no `GUIA-DE-REDACAO.md`.
- Toda decisão nova entra neste arquivo no mesmo dia. Se uma conversa disser algo diferente deste arquivo, vale o arquivo até o Evandro decidir.

## Pendências abertas (atualizar a cada rodada)

| O quê | Situação | Quem |
|---|---|---|
| Matérias de dezembro curtas demais | O guia pede 1.200 a 2.000 palavras por reportagem, e 13 das 14 de 30/11 a 30/12 têm 250 a 500 (só a do Queen está no padrão). A do CBGB sai em 30/11 | Decidir: reescrever todas aos poucos, só as maiores, ou criar um formato "nota" curto para as outras |
| Post do LinkedIn de 1/12 | Fala em "caneca preta"; a caneca à venda é branca com o letreiro | Corrigir antes de 1/12 |
| Prazo de entrega da Uma Penca antes do Natal | Não conferido; afeta o post de 12/12 | Evandro |
| Playlist de Natal no Spotify pública | Até 21/12 (lembrete na agenda) | Evandro |
| "Raul, Exu" volta a ser pago | 17/12 (lembrete na agenda) | Evandro |
| Rascunhos de dezembro do Substack | Prontos; conferir os trechos em 1ª pessoa e publicar | Evandro |
| Lembrete antigo de 28/11 (agendar Keith Moon e Zeppelin no Buffer) | Sem função: os posts foram para o Metricool. Desligar | Evandro autoriza |
| Link do site no canal do YouTube | Não feito | Operação |
| Link na bio do TikTok | Só com 1.000 seguidores ou conta comercial | Esperar |
| Produtos novos (caneca preta, série das editorias) | Fila; camisetas ficam pretas | Produção do mês |
| Clube físico e caixas de presente | Esperando 20 a 30 inscritos e o contador | Evandro |
| Plano de crescimento (bandas e casas em Collab, Canal do WhatsApp, vídeo) | Proposto em 26/11, sem decisão | Evandro responde: topa vídeo? vai a shows? tem verba? |

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
| No horário marcado | Posts do Instagram e do TikTok | Buffer até 7/12 (grátis: 10 agendados por rede) e Metricool de 8/12 em diante (grátis: cerca de 20 por rede por mês) |

Desde 26/11 os posts estão divididos: o Buffer guarda a fila curta (até 7/12) e o Metricool (marca AWHUUU!, Instagram, TikTok e YouTube conectados) recebeu todos os posts de 8 a 30/12, já agendados e automáticos. Como o Metricool não tem o limite de 10, os posts novos de cada mês vão direto para lá, e as rodadas de segunda e quinta servem só para revisar e encaixar o Último Bonde. O agendamento continua sendo feito numa conversa, com o Evandro autorizando na hora.

No TikTok todos os posts saem sozinhos (modo automático, desde 26/11). O "Notify Me" foi abandonado porque a confirmação pelo celular falhou no primeiro dia e nada foi publicado. O som entra depois: abrir o post publicado no app do TikTok e adicionar a música. Os três posts que ficaram presos (manifesto, Uivos e Krig-ha) foram refeitos no automático para 26/11 21h15, 27/11 e 28/11 às 20h30.

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
3. **Os posts das redes** de cada matéria, agendados no Metricool, com a data e o horário.
4. **Dois textos longos do Substack** (um aberto, um pago), como rascunho.
5. **Playlists** no Spotify e no YouTube para os textos sobre música.
6. **Um lançamento da loja**, quando houver produto novo.
7. **Checagem final:** fatos contra as fontes e o site compilando com `MOSTRAR_FUTURO=1`.

## O que só o Evandro faz

- Aprovar a pauta do mês e os rascunhos (no Metricool, no Buffer e no Substack).
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
