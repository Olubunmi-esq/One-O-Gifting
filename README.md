# ONE O — Website

A responsive storefront foundation for ONE O, built with TanStack Start, React, TypeScript and Supabase-ready configuration.

## Current scope

- Editorial-style homepage and responsive navigation
- Product catalogue starter with sample product records
- Occasion/collection discovery section
- Brand story page
- Corporate gifting page with indicative package ranges
- Contact/enquiry page (currently prepares an email using the visitor's email application)
- Draft privacy and terms pages clearly marked for owner/legal review
- Local SVG placeholder artwork
- Supabase environment-variable template
- Database migration based on the supplied ONE O schema, with a separate security-hardening migration

## Important: this is a redevelopment starter, not a production launch

The supplied materials contained the database schema and Supabase type definitions, but not the original frontend source. This repository therefore establishes a fresh frontend structure and uses sample product presentation data. It does not claim to reproduce the missing original components or live application behaviour.

Before launch:
1. Replace placeholder SVG artwork with approved ONE O product photography. Do not present concept imagery as photographs of finished products.
2. Confirm the legal business name, contact information, delivery coverage, customer service workflow and final policies.
3. Connect a Supabase project and apply migrations in order.
4. Implement the authenticated admin dashboard and secure server-side enquiry/order workflows.
5. Configure email delivery, spam protection/rate limiting, analytics and backups.
6. Test keyboard accessibility, mobile layouts, browser compatibility, forms, RLS and admin permissions.
7. Review package versions and run a clean install/build in the target deployment environment.

## Local development

Requirements: Node.js 20.19+ or 22.12+, and npm.

```bash
cp .env.example .env
npm install
npm run dev
```

Open the local URL printed by Vite.

```bash
npm run typecheck
npm run build
```

## Supabase setup

The migration in `supabase/migrations/` creates the ONE O catalogue, collections, enquiries, order-request tables, newsletter table, roles and supporting functions. Apply it to a new Supabase project only after reviewing it. If you already have live data in another project, do not run this migration blindly; prepare a data-preserving migration plan first.

Client-side code may use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. A Supabase service-role key must remain server-only and must never be committed or exposed through a `VITE_` variable.

The public contact form is intentionally an email handoff at this stage. It does not claim to store enquiries in Supabase. The production enquiry workflow should be implemented through a validated server function or Edge Function, with abuse protection and consent records.

## GitHub

Create an empty GitHub repository named `one-o-web`, then connect this folder using Git:

```bash
git init
git add .
git commit -m "Initial ONE O website foundation"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/one-o-web.git
git push -u origin main
```

Do not commit `.env` or any real credentials.

## Easiest way to publish

1. Download and extract `one-o-web-starter.zip`.
2. In GitHub, create a new empty repository named `one-o-web` (do not initialise it with a README or licence).
3. Open the extracted `one-o-web` folder in GitHub Desktop, choose **Add an Existing Repository**, then publish it to GitHub; or use the Git commands above.
4. Add deployment secrets in your hosting provider's environment settings, not in GitHub source files.

The archive is a source-code starter. A dependency installation and production build still need to be run in your development environment after extraction.
