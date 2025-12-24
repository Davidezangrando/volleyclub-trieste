-- Tabella per i giocatori
create table public.giocatori (
  id uuid not null default gen_random_uuid (),
  squadra_id uuid not null,
  nome character varying(100) not null,
  cognome character varying(100) not null,
  numero_maglia integer null,
  ruolo character varying(50) null,
  foto_url text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint giocatori_pkey primary key (id),
  constraint giocatori_squadra_id_fkey foreign key (squadra_id) references squadre (id) on delete cascade
) TABLESPACE pg_default;

-- Indice per velocizzare le query per squadra
create index giocatori_squadra_id_idx on public.giocatori using btree (squadra_id);

-- Trigger per aggiornare updated_at automaticamente
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Elimina i trigger se esistono già e li ricrea
drop trigger if exists update_giocatori_updated_at on public.giocatori;
create trigger update_giocatori_updated_at
  before update on public.giocatori
  for each row
  execute function update_updated_at_column();

-- Aggiungi anche il trigger per la tabella squadre se non esiste
drop trigger if exists update_squadre_updated_at on public.squadre;
create trigger update_squadre_updated_at
  before update on public.squadre
  for each row
  execute function update_updated_at_column();

-- Aggiungi campo slug alla tabella squadre per URL SEO-friendly
alter table public.squadre add column if not exists slug character varying(150) unique;

-- Crea un indice sul campo slug
create index if not exists squadre_slug_idx on public.squadre using btree (slug);
