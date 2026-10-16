-- ALWAN v28 setup (run once in Supabase SQL Editor)
create table if not exists public.site_images (
  slot text primary key,
  image_url text not null,
  updated_at timestamptz default now()
);
alter table public.site_images enable row level security;
drop policy if exists "public read site images" on public.site_images;
create policy "public read site images" on public.site_images for select using (true);
drop policy if exists "authenticated manage site images" on public.site_images;
create policy "authenticated manage site images" on public.site_images for all to authenticated using (true) with check (true);

insert into storage.buckets (id,name,public) values ('site-images','site-images',true)
on conflict (id) do update set public=true;
drop policy if exists "public read site images" on storage.objects;
create policy "public read site images" on storage.objects for select using (bucket_id='site-images');
drop policy if exists "authenticated upload site images" on storage.objects;
create policy "authenticated upload site images" on storage.objects for insert to authenticated with check (bucket_id='site-images');
drop policy if exists "authenticated update site images" on storage.objects;
create policy "authenticated update site images" on storage.objects for update to authenticated using (bucket_id='site-images') with check (bucket_id='site-images');
drop policy if exists "authenticated delete site images" on storage.objects;
create policy "authenticated delete site images" on storage.objects for delete to authenticated using (bucket_id='site-images');
