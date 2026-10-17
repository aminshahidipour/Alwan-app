-- Run once in Supabase > SQL Editor.
alter table public.projects add column if not exists subcategory text;
create index if not exists projects_category_subcategory_idx on public.projects(category, subcategory);
