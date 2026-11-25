# Clube da Lua Cheia: fase 2

Fase 1 (no ar): lista de espera com preferências (tabela `interessados`) e trilhas editáveis no CMS.

Fase 2: a oferta se monta sozinha para cada assinante, ele escolhe a variação e paga; Evandro compra e manda entregar no endereço dele.

## Quando ligar

Quando a lista tiver umas 20 a 30 pessoas. Até lá, a lista mostra o que o público quer (caminho, banda, formato, quanto gasta).

## Peças

| Peça | O que faz | Status |
|---|---|---|
| Banco (`0002_clube_fase2.sql`) | assinantes, ofertas do mês, pedidos | escrito, não aplicado |
| Área do assinante (`/clube/conta/`) | login por link no e-mail, cadastro, endereço, escolha da oferta | a fazer |
| Montagem das ofertas (função agendada no Supabase, todo dia 1) | lê `/clube/trilhas.json`, pega o próximo disco de cada assinante, busca preços no Mercado Livre, monta CD / vinil / edição especial com preço final | a fazer, depende do item 1 abaixo |
| Pagamento (Mercado Pago) | gera o link de pagamento da variação escolhida e confirma o pagamento | a fazer, depende do item 2 |
| Aviso de pedido | e-mail para o Evandro com o link do produto e o endereço de entrega | a fazer |

## O que só o Evandro pode fazer

1. **Aplicativo no Mercado Livre** (para a busca de preços): entrar em developers.mercadolivre.com.br com a conta do Awhuuu!, criar um aplicativo e copiar o *App ID* e a *Secret Key*. Colar no Supabase, em Edge Functions > Secrets, com os nomes `ML_CLIENT_ID` e `ML_CLIENT_SECRET`. Ninguém mais vê essas chaves.
2. **Mercado Pago**: na conta do Awhuuu!, em Seu negócio > Configurações > Credenciais, copiar o *Access Token de produção* e colar no Supabase como `MP_ACCESS_TOKEN`.
3. **Taxa do clube por disco**: valor fixo (ex.: R$ 15) ou porcentagem. É o ganho, porque compra para revenda não gera comissão de afiliado.
4. **Conversa com o contador** (perguntas abaixo).

## Perguntas para o contador

- O MEI atual tem atividade que permite **vender discos, CDs e livros ao consumidor** (comércio varejista)? Se não, dá para incluir?
- Como fica a **nota fiscal** nessas vendas para pessoa física?
- O valor dos discos entra inteiro no **faturamento do MEI** (e no teto anual), ou só a taxa?
- As **comissões de afiliado** (Amazon, Mercado Livre, Magalu) entram em qual atividade?
- **Direito de arrependimento** de 7 dias nas compras online: quem paga o frete de volta quando o disco foi comprado em outra loja e entregue direto ao assinante?
- **Assinatura digital** (playlist + texto): como emitir e tributar?

## Riscos já mapeados

- Preço muda entre a oferta e a compra: oferta vale 48 horas e a taxa tem folga.
- Loja sem estoque depois do pagamento: oferecer outra variação ou devolver o valor.
- Atraso na entrega: o prazo é o da loja; a oferta mostra isso.
