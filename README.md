# ONE O — Meaningful Gifting Commerce

ONE O is a customer-facing gifting storefront and a Supabase-backed commerce foundation. Brand promise: **Made with you in mind.**

## Included in this development branch
- Responsive editorial storefront, story, gifting occasions and corporate gifting pages.
- Catalogue browsing and product discovery, cart and personalisation notes.
- Checkout request with customer, recipient and Nigerian delivery address fields.
- Supabase database migration for catalogue, collections, roles, addresses, enquiries, newsletter, orders and order lines.
- Server-side order creation function that calculates prices from the database, validates quantities and does not trust browser-submitted prices.
- Protected staff sign-in area with order list and basic catalogue creation UI.
- Newsletter and enquiry persistence when Supabase is configured.

## Stack
React 19, TypeScript, Vite, Supabase Auth/Postgres/Edge Functions. The initial repository had Vite/TanStack Start dependencies but no application source files. This implementation deliberately uses a conventional Vite React entry point; TanStack Start is removed from dependencies to avoid retaining an unused server framework. Confirm this choice in Google AI Studio before introducing another framework.

## Local setup
Use Node 20.19+ or 22.12+.

```bash
cp .env.example .env
npm install
npm run dev
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to a Supabase project. Without them, the storefront displays sample catalogue data, but checkout and administration are unavailable.

## Supabase setup
1. Create a Supabase project.
2. Review and apply `supabase/migrations/202611050001_one_o_commerce.sql`.
3. Deploy the Edge Function: `supabase functions deploy create-order`.
4. Set the Edge Function secrets `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and optionally `SITE_ORIGIN`.
5. Create the first administrator using Supabase Auth, then insert their role using the SQL editor:
   `insert into public.user_roles(user_id,role) values ('AUTH_USER_UUID','admin');`
6. Add the public project URL and publishable key to the frontend environment.

Never put the service-role key in a `VITE_` variable or commit it to Git.

## Operational and launch decisions still required
- Product photography, exact SKUs, stock levels, final prices and personalisation lead times.
- Delivery zones, courier partners, delivery pricing and dispatch service-level targets.
- Business contact details, social links, final privacy/terms/returns/cancellation policies.
- Payment gateway selection and verified merchant credentials. The current checkout deliberately creates an order request with payment status `unpaid`; the team confirms delivery cost and sends official payment instructions. It does not pretend payment has been collected.
- Email/SMS provider and transactional templates for order received, confirmation, dispatch and delivery.
- Admin invitation and staff role management workflow; initial admin role is provisioned securely in SQL.
- Rate limiting, CAPTCHA/bot controls, monitoring, backups, audit logging and production security review.

## Important security notes
- Public customers cannot directly insert or read orders through table policies. They submit through the Edge Function, which uses the service role server-side and derives prices from active database products.
- The Edge Function currently has basic input validation but should be protected with a CAPTCHA/rate-limit provider before public launch.
- Staff dashboard access requires a Supabase Auth account and a row in `user_roles`; never make the first admin role publicly assignable.
- This is a functional development foundation, not a certified production launch. Run typecheck/build, test migrations and Edge Functions against a non-production Supabase project, and complete the operational items above.

## Git branches
This work is on `development/one-o-commerce`. The existing `main` branch has not been changed.
