-- Clube da Lua Cheia: fase 2 (assinantes, ofertas mensais e pedidos)
-- AINDA NÃO APLICADA. Rodar só quando a fase 2 for ligada.
-- Fluxo: assinante escolhe trilha -> todo dia 1 o sistema monta a oferta do mês
-- com variações -> assinante escolhe e paga (Mercado Pago) -> Evandro compra e
-- manda entregar no endereço do assinante -> registra o rastreio.

create table if not exists public.assinantes (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid unique references auth.users(id) on delete cascade,
  criado_em     timestamptz not null default now(),
  nome          text not null,
  email         text not null,
  caminho       text,              -- História do Rock, Complete a coleção, Assine um estilo
  trilha        text,              -- nome da trilha em /clube/trilhas.json (texto livre)
  versao        text,              -- digital, disco em casa
  formato       text,              -- CD, vinil, tanto faz
  teto_mensal   numeric(8,2),
  ja_tenho      text,              -- discos que o assinante já tem (o sistema pula)
  posicao       int not null default 0,   -- próximo disco da trilha
  status        text not null default 'ativo',  -- ativo, pausado, cancelado
  -- endereço de entrega (só para a versão em casa)
  cep text, rua text, numero text, complemento text, bairro text, cidade text, uf text
);

create table if not exists public.ofertas (
  id            uuid primary key default gen_random_uuid(),
  assinante_id  uuid not null references public.assinantes(id) on delete cascade,
  mes           date not null,     -- primeiro dia do mês
  artista       text, album text, ano text,
  variacoes     jsonb not null default '[]',
  -- cada variação: {tipo: "CD"|"Vinil"|"Edição especial", loja, url, produto, frete, taxa, total}
  escolha       int,               -- índice da variação escolhida
  valida_ate    timestamptz,
  status        text not null default 'aberta',  -- aberta, paga, pulada, expirada
  criado_em     timestamptz not null default now(),
  unique (assinante_id, mes)
);

create table if not exists public.pedidos (
  id            uuid primary key default gen_random_uuid(),
  oferta_id     uuid not null references public.ofertas(id) on delete restrict,
  pagamento_id  text,              -- id do pagamento no Mercado Pago
  valor         numeric(10,2),
  pago_em       timestamptz,
  comprado_em   timestamptz,       -- quando o Evandro fez a compra na loja
  rastreio      text,
  status        text not null default 'aguardando_pagamento'
  -- aguardando_pagamento, pago, comprado, enviado, entregue, cancelado, reembolsado
);

alter table public.assinantes enable row level security;
alter table public.ofertas    enable row level security;
alter table public.pedidos    enable row level security;

-- Cada assinante vê e edita só o próprio cadastro; vê só as próprias ofertas e pedidos.
create policy "assinante le o seu"    on public.assinantes for select using (user_id = auth.uid());
create policy "assinante edita o seu" on public.assinantes for update using (user_id = auth.uid());
create policy "assinante cria o seu"  on public.assinantes for insert with check (user_id = auth.uid());
create policy "assinante ve ofertas"  on public.ofertas for select
  using (assinante_id in (select id from public.assinantes where user_id = auth.uid()));
create policy "assinante ve pedidos"  on public.pedidos for select
  using (oferta_id in (select o.id from public.ofertas o join public.assinantes a on a.id = o.assinante_id where a.user_id = auth.uid()));
-- Escolher variação, pagar e mudar status: só pelas funções do servidor (service role), nunca direto do navegador.
