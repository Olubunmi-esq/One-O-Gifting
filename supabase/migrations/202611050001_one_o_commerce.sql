-- ONE O commerce foundation. Apply to a NEW Supabase project after review.
create extension if not exists pgcrypto;
create type public.order_status as enum ('received','awaiting_confirmation','confirmed','in_production','ready_for_dispatch','dispatched','delivered','cancelled');
create type public.payment_status as enum ('unpaid','awaiting_payment','paid','refunded','failed');
create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, full_name text, phone text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.user_roles (user_id uuid not null references auth.users(id) on delete cascade, role text not null check(role in ('admin','staff','customer')), primary key(user_id,role));
create function public.has_staff_role() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.user_roles where user_id=auth.uid() and role in ('admin','staff')) $$;
create function public.has_admin_role() returns boolean language sql stable security definer set search_path=public as $$ select exists(select 1 from public.user_roles where user_id=auth.uid() and role='admin') $$;
create table public.collections (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, description text, cover_image text, sort_order int not null default 0, is_active boolean not null default true, created_at timestamptz not null default now());
create table public.products (id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique, description text not null default '', price numeric(12,2) not null check(price>=0), compare_at_price numeric(12,2), category text not null default 'Curated gift sets', collection_id uuid references public.collections(id) on delete set null, image_urls text[] not null default '{}', occasions text[] not null default '{}', is_personalisable boolean not null default false, personalisation_instructions text, stock_quantity int not null default 0 check(stock_quantity>=0), track_inventory boolean not null default false, is_featured boolean not null default false, is_active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.customer_addresses (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null, full_name text not null, phone text not null, address_line1 text not null, address_line2 text, city text not null, state text not null, postal_code text, delivery_instructions text, is_default boolean not null default false, created_at timestamptz not null default now());
create table public.orders (id uuid primary key default gen_random_uuid(), order_number text not null unique default ('ONEO-'||upper(substr(encode(gen_random_bytes(6),'hex'),1,10))), user_id uuid references auth.users(id) on delete set null, customer_name text not null, customer_email text not null, customer_phone text not null, recipient_name text not null, recipient_phone text not null, address_line1 text not null, address_line2 text, city text not null, state text not null, postal_code text, delivery_note text, gift_message text, subtotal numeric(12,2) not null check(subtotal>=0), delivery_fee numeric(12,2) not null default 0 check(delivery_fee>=0), total_amount numeric(12,2) not null check(total_amount>=0), status public.order_status not null default 'received', payment_status public.payment_status not null default 'unpaid', payment_reference text, internal_note text, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.order_items (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade, product_id uuid references public.products(id) on delete set null, product_name text not null, unit_price numeric(12,2) not null, quantity int not null check(quantity>0), personalisation_note text, line_total numeric(12,2) not null);
create table public.enquiries (id uuid primary key default gen_random_uuid(), name text not null, email text not null, subject text, message text not null, status text not null default 'new' check(status in ('new','in_progress','resolved','spam')), created_at timestamptz not null default now());
create table public.newsletter_subscribers (id uuid primary key default gen_random_uuid(), email text not null unique, consented_at timestamptz not null default now(), is_active boolean not null default true);
create index products_active_category_idx on public.products(is_active,category);
create index orders_created_at_idx on public.orders(created_at desc);
create index orders_status_idx on public.orders(status);
create index order_items_order_id_idx on public.order_items(order_id);
alter table public.profiles enable row level security; alter table public.user_roles enable row level security; alter table public.collections enable row level security; alter table public.products enable row level security; alter table public.customer_addresses enable row level security; alter table public.orders enable row level security; alter table public.order_items enable row level security; alter table public.enquiries enable row level security; alter table public.newsletter_subscribers enable row level security;
create policy "Users read own profile" on public.profiles for select to authenticated using(id=auth.uid() or public.has_staff_role());
create policy "Users update own profile" on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
create policy "Staff manage profiles" on public.profiles for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Public read active collections" on public.collections for select using(is_active or public.has_staff_role());
create policy "Staff manage collections" on public.collections for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Public read active products" on public.products for select using(is_active or public.has_staff_role());
create policy "Staff manage products" on public.products for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Customers read own addresses" on public.customer_addresses for select to authenticated using(user_id=auth.uid() or public.has_staff_role());
create policy "Customers manage own addresses" on public.customer_addresses for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
create policy "Staff manage addresses" on public.customer_addresses for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Staff read orders" on public.orders for select to authenticated using(public.has_staff_role());
create policy "Staff update orders" on public.orders for update to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Staff read order items" on public.order_items for select to authenticated using(public.has_staff_role());
create policy "Staff manage order items" on public.order_items for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Staff manage enquiries" on public.enquiries for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "Staff read newsletter" on public.newsletter_subscribers for select to authenticated using(public.has_staff_role());
create policy "Staff manage newsletter" on public.newsletter_subscribers for all to authenticated using(public.has_staff_role()) with check(public.has_staff_role());
create policy "User read own role" on public.user_roles for select to authenticated using(user_id=auth.uid() or public.has_admin_role());
create policy "Admins manage roles" on public.user_roles for all to authenticated using(public.has_admin_role()) with check(public.has_admin_role());
insert into public.collections(name,slug,description,sort_order) values
('Curated gift sets','curated-gift-sets','Thoughtfully brought-together gifts for people and moments that matter.',1),
('Resin keepsakes','resin-keepsakes','Handcrafted keepsakes made personal.',2),
('Corporate gifting','corporate-gifting','Considered gifting for teams, clients and milestones.',3)
on conflict(slug) do nothing;
insert into public.products(name,slug,description,price,category,occasions,is_personalisable,is_featured,is_active) values
('The Keepsake Box','the-keepsake-box','A considered collection of little things, made personal and presented to be remembered.',45000,'Curated gift sets',array['Birthday','Anniversary','Thank you'],true,true,true),
('The Memory Heart','resin-memory-heart','A handcrafted resin keepsake created around a name, date or sentiment that matters.',18000,'Resin keepsakes',array['Anniversary','Wedding','Just because'],true,true,true),
('The Desk Edit','the-desk-edit','A thoughtful desk companion set for the people who make work meaningful.',52000,'Corporate gifting',array['Appreciation','Retirement','Corporate'],true,true,true),
('A Little Love','little-love-set','A small, personal gesture for the person who makes ordinary days feel special.',26000,'Curated gift sets',array['Birthday','Love','Just because'],true,false,true),
('Personalised Name Plaque','resin-name-plaque','A one-of-a-kind name plaque, finished by hand for a desk, shelf or bedside.',22000,'Resin keepsakes',array['Housewarming','Birthday','Appreciation'],true,false,true),
('The Signature Corporate Box','corporate-signature-box','A considered branded gifting experience for teams, clients and important milestones.',85000,'Corporate gifting',array['Corporate','Appreciation'],true,false,true)
on conflict(slug) do nothing;
