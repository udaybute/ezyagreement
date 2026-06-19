create extension if not exists pgcrypto;

create table public.profiles (
  id                     uuid references auth.users on delete cascade primary key,
  email                  text not null,
  phone                  text,
  full_name              text not null,
  role                   text default 'retail' check (role in ('retail','broker','ca','admin')),
  firm_name              text,
  gstin                  text,
  state                  text,
  city                   text,
  consent_doc_generation boolean default false,
  consent_esign          boolean default false,
  consent_whatsapp       boolean default false,
  consent_marketing      boolean default false,
  consent_given_at       timestamptz,
  consent_withdrawn      boolean default false,
  consent_withdrawn_at   timestamptz,
  documents_count        integer default 0,
  created_at             timestamptz default now(),
  updated_at             timestamptz default now()
);

create table public.documents (
  id                uuid default gen_random_uuid() primary key,
  user_id           uuid references public.profiles(id) on delete cascade not null,
  ref_number        text unique,
  document_type     text not null,
  state_code        text not null,
  city              text,
  language          text default 'en',
  status            text default 'draft',
  form_data         jsonb,
  pdf_path          text,
  signed_pdf_path   text,
  stamp_duty_amount numeric,
  estamp_id         text,
  esign_id          text,
  whatsapp_sent     boolean default false,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now(),
  expires_at        timestamptz,
  delete_after      timestamptz default (now() + interval '30 days')
);

create table public.payments (
  id                    uuid default gen_random_uuid() primary key,
  user_id               uuid references public.profiles(id) not null,
  document_id           uuid references public.documents(id),
  plan_type             text not null,
  amount                numeric not null,
  gst_amount            numeric not null default 0,
  currency              text default 'INR',
  razorpay_order_id     text unique,
  razorpay_payment_id   text,
  status                text default 'pending',
  invoice_url           text,
  created_at            timestamptz default now()
);

create table public.audit_logs (
  id              bigserial primary key,
  user_id         uuid,
  event_type      text not null,
  resource_id     text,
  ip_hash         text,
  user_agent_hash text,
  metadata        jsonb,
  created_at      timestamptz default now()
);

create table public.broker_clients (
  id          uuid default gen_random_uuid() primary key,
  broker_id   uuid references public.profiles(id) on delete cascade not null,
  name        text not null,
  phone       text,
  email       text,
  state       text,
  city        text,
  notes       text,
  created_at  timestamptz default now()
);

alter table public.profiles        enable row level security;
alter table public.documents       enable row level security;
alter table public.payments        enable row level security;
alter table public.audit_logs      enable row level security;
alter table public.broker_clients  enable row level security;

create policy "Users view own profile"   on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users view own documents"   on public.documents for select using (auth.uid() = user_id);
create policy "Users insert own documents" on public.documents for insert with check (auth.uid() = user_id);
create policy "Users update own documents" on public.documents for update using (auth.uid() = user_id);

create policy "Users view own payments" on public.payments for select using (auth.uid() = user_id);

create policy "Service role audit access" on public.audit_logs for all using (auth.role() = 'service_role');

create policy "Brokers view own clients" on public.broker_clients for all using (auth.uid() = broker_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', 'User'));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();