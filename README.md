# Shop Admin — Next.js 14 + Supabase (Auth + Admin + Products CRUD)

A production-ready admin auth system with Supabase + RLS, including a basic products CRUD.

## Features
- Email/password auth (Supabase)
- SSR session handling
- Admin-only guard for `/admin/*`
- Postgres RLS with `is_admin()` helper
- Products CRUD in `/admin/products` (create, update, delete, publish)
- Tailwind styling
- Optional middleware gate

## 1) Supabase Setup
1. Create a project at Supabase.
2. Enable Email/Password provider in **Auth → Providers**.
3. Open **SQL** and run `db.sql` from this repo (same as `db.sql` file here).
4. Create your first user (via Auth dashboard), then run:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'YOUR_ADMIN_EMAIL';
```

## 2) Local Dev
```bash
npm install
cp .env.example .env.local   # fill in your Supabase URL + anon key
npm run dev
```

Open http://localhost:3000/admin/login and sign in.

## 3) Deploy (Vercel)
- Push to GitHub and import repo in Vercel.
- Set environment variables in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Deploy. Visit `/admin/login`.

## Notes
- RLS ensures only admins can write to `products`. Non-admins can only read published items.
- Never expose `SUPABASE_SERVICE_ROLE` to the browser.
