-- Clube da Lua Cheia: fase 1 (lista de espera com preferências)
-- Rodar no Supabase: SQL Editor > colar tudo > Run.

create table if not exists public.interessados (
  id            uuid primary key default gen_random_uuid(),
  criado_em     timestamptz not null default now(),
  nome          text not null check (char_length(nome) between 1 and 120),
  email         text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  caminho       text check (char_length(caminho) <= 120),      -- História do Rock, Complete a coleção, Assine um estilo, caixa...
  escolha       text check (char_length(escolha) <= 200),      -- banda ou estilo (texto livre)
  versao        text check (char_length(versao) <= 60),        -- digital, disco em casa, ainda não sei
  formato       text check (char_length(formato) <= 60),       -- CD, vinil, tanto faz
  teto_mensal   numeric(8,2) check (teto_mensal is null or teto_mensal between 0 and 99999),
  ja_tenho      text check (char_length(ja_tenho) <= 2000),    -- discos que a pessoa já tem
  cidade        text check (char_length(cidade) <= 120),       -- para estimar frete
  observacoes   text check (char_length(observacoes) <= 2000),
  consentimento boolean not null default false check (consentimento),
  origem        text check (char_length(origem) <= 200)
);

create unique index if not exists interessados_email_unico on public.interessados (lower(email));

alter table public.interessados enable row level security;

-- O site (chave pública) só pode INSERIR. Ninguém de fora consegue ler a lista.
drop policy if exists "site insere" on public.interessados;
create policy "site insere" on public.interessados
  for insert to anon, authenticated
  with check (consentimento = true);

-- Garante que a chave pública não tem leitura, edição nem exclusão.
revoke select, update, delete on public.interessados from anon, authenticated;
grant insert on public.interessados to anon, authenticated;
