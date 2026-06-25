alter table public.profiles
  add column onboarding_completed boolean not null default true;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, onboarding_completed)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', 'User'), false);
  return new;
end;
$$;
