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



-- Public storefront images are uploaded only by authorised ONE O staff.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('one-o-product-images','one-o-product-images',true,8388608,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true, file_size_limit=8388608, allowed_mime_types=array['image/jpeg','image/png','image/webp'];

create policy "Public can view ONE O product photographs"
on storage.objects for select
using (bucket_id='one-o-product-images');

create policy "ONE O staff can upload product photographs"
on storage.objects for insert to authenticated
with check (bucket_id='one-o-product-images' and public.has_staff_role());

create policy "ONE O staff can update product photographs"
on storage.objects for update to authenticated
using (bucket_id='one-o-product-images' and public.has_staff_role())
with check (bucket_id='one-o-product-images' and public.has_staff_role());

create policy "ONE O staff can delete product photographs"
on storage.objects for delete to authenticated
using (bucket_id='one-o-product-images' and public.has_staff_role());

-- Atomic order creation: order and all line items commit together, or none do.
create or replace function public.create_order_with_items(p_order jsonb, p_items jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_item jsonb;
  v_product public.products%rowtype;
  v_quantity integer;
  v_subtotal numeric(12,2) := 0;
  v_order public.orders%rowtype;
begin
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) < 1 or jsonb_array_length(p_items) > 30 then
    raise exception 'Invalid order items';
  end if;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    if coalesce(v_item->>'product_id','') = '' then raise exception 'Invalid product'; end if;
    v_quantity := (v_item->>'quantity')::integer;
    if v_quantity < 1 or v_quantity > 20 then raise exception 'Invalid quantity'; end if;

    select * into v_product
    from public.products
    where id = (v_item->>'product_id')::uuid and is_active = true
    for update;

    if not found then raise exception 'A selected product is unavailable'; end if;
    if v_product.track_inventory and v_product.stock_quantity < v_quantity then
      raise exception 'Insufficient stock for %', v_product.name;
    end if;

    -- Checkout creates an unpaid order request, not a confirmed sale.
    -- Do not decrement stock here: staff must confirm availability before
    -- accepting the order. This check is advisory and does not reserve stock.
    v_subtotal := v_subtotal + (v_product.price * v_quantity);
  end loop;

  insert into public.orders (
    customer_name, customer_email, customer_phone, recipient_name, recipient_phone,
    address_line1, address_line2, city, state, postal_code, delivery_note, gift_message,
    subtotal, delivery_fee, total_amount, status, payment_status
  ) values (
    left(trim(p_order->>'customer_name'),160),
    lower(trim(p_order->>'customer_email')),
    left(trim(p_order->>'customer_phone'),40),
    left(trim(p_order->>'recipient_name'),160),
    left(trim(p_order->>'recipient_phone'),40),
    left(trim(p_order->>'address_line1'),240),
    left(coalesce(p_order->>'address_line2',''),240),
    left(trim(p_order->>'city'),100),
    left(trim(p_order->>'state'),100),
    left(coalesce(p_order->>'postal_code',''),30),
    left(coalesce(p_order->>'delivery_note',''),1000),
    left(coalesce(p_order->>'gift_message',''),1000),
    v_subtotal, 0, v_subtotal, 'received', 'unpaid'
  ) returning * into v_order;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    select * into v_product from public.products where id = (v_item->>'product_id')::uuid;
    v_quantity := (v_item->>'quantity')::integer;
    insert into public.order_items (
      order_id, product_id, product_name, unit_price, quantity, personalisation_note, line_total
    ) values (
      v_order.id, v_product.id, v_product.name, v_product.price, v_quantity,
      case when v_product.is_personalisable then left(coalesce(v_item->>'personalisation_note',''),1000) else null end,
      v_product.price * v_quantity
    );
  end loop;

  return jsonb_build_object('id',v_order.id,'order_number',v_order.order_number,'subtotal',v_subtotal);
end;
$$;

revoke all on function public.create_order_with_items(jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.create_order_with_items(jsonb,jsonb) to service_role;


-- Database-backed rate limiting for public Edge Functions.
create table public.request_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null,
  request_count integer not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.request_rate_limits enable row level security;

create or replace function public.consume_request_rate_limit(
  p_key_hash text,
  p_limit integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  insert into public.request_rate_limits(key_hash,window_started_at,request_count,updated_at)
  values(p_key_hash,now(),1,now())
  on conflict(key_hash) do update set
    window_started_at = case
      when public.request_rate_limits.window_started_at < now() - make_interval(secs => p_window_seconds)
      then now() else public.request_rate_limits.window_started_at end,
    request_count = case
      when public.request_rate_limits.window_started_at < now() - make_interval(secs => p_window_seconds)
      then 1 else public.request_rate_limits.request_count + 1 end,
    updated_at = now()
  returning request_count into v_count;

  return v_count <= p_limit;
end;
$$;

revoke all on function public.consume_request_rate_limit(text,integer,integer) from public, anon, authenticated;
grant execute on function public.consume_request_rate_limit(text,integer,integer) to service_role;
