# ONE O — Meaningful Gifting

**Brand promise:** Made with you in mind.

ONE O is a considered gifting house. Personalisation and curated gifting experiences are the core of the brand; handcrafted resin is a distinctive medium within the offer, not the entire identity. The visual direction is warm, personal, contemporary and editorial, using an ivory, espresso, clay and champagne palette.

## Current development scope

- Responsive storefront, brand story, gifting occasions, catalogue and corporate gifting enquiry journey.
- Shopping bag and checkout request with Nigerian customer, recipient and delivery details.
- Product catalogue sourced from Supabase; the repository deliberately contains no invented sample merchandise or assumed retail prices.
- Product photography upload through the staff console. New products remain unpublished until an original photograph is uploaded.
- Supabase Auth staff access, role verification, order management, product catalogue and customer enquiry views.
- Supabase Postgres migration, Row Level Security, public image storage policies, Edge Functions and database-backed request rate limiting.
- Server-side price and inventory checks; order header and line items are written atomically in one database transaction.
- Dependency audit, TypeScript, unit tests and production build in GitHub Actions.

## Technology

React 19, TypeScript, Vite, Supabase Auth, Postgres, Storage and Edge Functions.

The application uses a conventional Vite React frontend. The earlier repository contained framework dependencies but did not include the original frontend source; this implementation does not pretend to reproduce missing source code.

## Local development

Use Node 22.12+.

```bash
cp .env.example .env
npm install
npm run dev
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for the project. Without these values, the storefront can render its brand content, but live catalogue, ordering, newsletter, enquiry and administration services will not operate.

## Supabase deployment

1. Create or select the ONE O Supabase project. Do not apply the initial migration to a project containing important existing data without first reviewing its schema and preparing a migration plan.
2. Apply `supabase/migrations/202611050001_one_o_commerce.sql` using the Supabase CLI or SQL editor. This creates the commerce schema, access policies, image bucket, atomic order function and rate-limit function.
3. Deploy the public Edge Functions:
   `supabase functions deploy create-order`
   `supabase functions deploy create-enquiry`
   `supabase functions deploy subscribe-newsletter`
4. Set the Edge Function secret `SITE_ORIGIN` to the exact production storefront origin, for example `https://your-domain.example`. The default origin is local development only.
5. Configure the frontend build environment with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
6. Create the first administrator in Supabase Auth. Then grant the role from the SQL editor using that Auth user's UUID:
   `insert into public.user_roles(user_id,role) values ('AUTH_USER_UUID','admin');`
7. Sign in at `/admin`. The console checks the authenticated user's `admin` or `staff` role before showing operational data.
8. Upload actual product photographs and owner-approved product descriptions, prices, personalisation rules and stock information before publishing catalogue items.

Supabase Edge Functions use the project-provided server environment. Never expose a service-role key in frontend code, a `VITE_` variable, or Git.

## Photography standard

The storefront must use original photographs of actual ONE O products. AI-generated product images, stock photographs and CSS product illustrations are not substitutes. Product records are not seeded with fabricated product names or prices. The staff console accepts JPG, PNG and WebP files up to 8 MB, stores them in the public-read `one-o-product-images` bucket, and only publishes a new item after its photograph has been uploaded. Until genuine photographs are supplied, the storefront shows a neutral, explicit photography-pending state.

For a coherent catalogue, photograph the actual finished item and its packaging in natural, diffused light; capture a clean front/three-quarter product view, a close-up of material and personalisation, a scale/context view, and a complete gift-set flat lay. Keep backgrounds, lighting and crop treatment consistent across the collection. Do not digitally add product features that are not present on the physical item.

## Order and payment behaviour

Checkout currently creates an **order request**, not a paid order. The database derives product prices from the catalogue and creates the order and its lines atomically. Inventory is checked as an advisory availability check, but stock is not reserved or deducted for an unpaid request. ONE O must confirm availability before accepting the order. Delivery is not guessed. ONE O confirms delivery cost, production timing and availability before sending official payment instructions.

No payment gateway is represented as connected. Before launch, select and configure a verified Nigerian-market payment provider, implement server-side payment initialisation and webhook verification, and only mark an order paid after a verified provider event. Do not accept screenshots or browser-submitted claims as proof of payment.

## Launch items still requiring owner decisions or external setup

- Actual product photographs and approval of each product's name, price, SKU, description, stock and personalisation options.
- Production Supabase project, migration application, deployed Edge Functions, first administrator and exact production `SITE_ORIGIN`.
- Payment gateway credentials and verified webhook integration.
- Delivery zones, courier arrangements, delivery fees and production/dispatch service levels.
- Approved business contact details, social links, privacy notice, terms, returns, cancellations and customer communications.
- Transactional email/SMS provider, message templates, CAPTCHA or stronger bot controls, backups, monitoring and production security review.
- Browser/device QA, accessibility review and an end-to-end test order against a non-production Supabase project.

## Git workflow

Development is taking place on `development/one-o-commerce` through pull request #1. The existing `main` branch remains unchanged until the owner approves the finished implementation.
