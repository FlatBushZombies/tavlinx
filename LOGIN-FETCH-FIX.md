# Fix: Login fetch failed on /orders

## Problem

The `/auth/login` page uses Supabase via `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
If these values are missing, invalid, or not loaded in production, the Supabase client cannot complete `signInWithPassword`, and the login attempt fails with a fetch error.

This is especially common on a Namecheap VPS when the app is deployed but the environment variables are not available to the running Next.js process.

## Root cause

In this app:

- `app/auth/login/page.tsx` creates a Supabase client with `createClient()`.
- `lib/supabase/client.ts` reads the values from `process.env.NEXT_PUBLIC_SUPABASE_URL` and `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- If these values are undefined at build or runtime, the browser request fails.

## Solution

### 1. Configure production environment variables on the VPS

Create a production env file in the app folder, for example:

```bash
cd /var/www/tavlinx
cat > .env.production <<'EOF'
NEXT_PUBLIC_SUPABASE_URL="https://gqfjftidnqkrbpxsjhci.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxamZmdGlkbnFrcmJweHNqaGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjI2ODYsImV4cCI6MjA5MDQzODY4Nn0.EnZgFzzj97e_IBC588CnJhnKk-BR-q_kGcxzAH2xa0g"
EOF
```

> Do not commit real keys into git. Keep them in the VPS environment file only.

### 2. Make sure the Next.js process loads that file

If you are using a `systemd` unit, verify it points to the file:

```ini
EnvironmentFile=/var/www/tavlinx/.env.production
WorkingDirectory=/var/www/tavlinx
```

Then restart the service:

```bash
sudo systemctl restart tavlinx
```

### 3. Rebuild after updating env variables

Always rebuild after changing `.env.production`:

```bash
cd /var/www/tavlinx
npm run build
sudo systemctl restart tavlinx
```

### 4. Check the app and browser

- Visit `/auth/login`.
- Try signing in with a Supabase user.
- If the login still fails, open browser dev tools and confirm the network request is going to a valid Supabase URL.

## Validation checklist

- `NEXT_PUBLIC_SUPABASE_URL` is set to your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set to your Supabase anon public key
- The Next.js app was rebuilt after env file changes
- The running service has access to `.env.production`
- Nginx is proxying traffic to the Next.js app correctly

## Notes

If you are using a custom domain, the domain itself does not affect Supabase auth. The key issue is always the Supabase env values and the running app environment.

## Specific: "TypeError: Failed to fetch" at `signInWithPassword`

This stack trace means the browser attempted to contact Supabase but the network request failed before a JSON response could be read. Common direct causes:

- The client-side Supabase URL is missing or incorrect (often `undefined`) so the browser tried to fetch an invalid URL.
- The Supabase endpoint is unreachable from the user's network (DNS or firewall issues).
- CORS/network issues on the Supabase side (rare for Supabase-managed projects).

Follow these targeted steps to diagnose and fix:

1. Reproduce and inspect the failing network request

```bash
# Open browser devtools -> Network tab
# Submit login and look for a request to your Supabase project's /auth/v1/token or similar
```

- If the request URL is `undefined`, empty, or not your Supabase project URL, the public env variables were not present at build/runtime. See the rebuild steps above.
- If the request is to the correct Supabase domain but shows a network error, try `curl -I https://<your-supabase-project>.supabase.co` from the VPS to confirm reachability:

```bash
curl -I https://gqfjftidnqkrbpxsjhci.supabase.co
```

2. Confirm `NEXT_PUBLIC_*` variables were present at build time

- Next.js inlines `NEXT_PUBLIC_*` values into client bundles at build time. If `.env.production` was added after `npm run build`, the built client will still contain the wrong/empty values. Re-run `npm run build` on the VPS after the env file is in place.

3. Make the runtime failure explicit (already applied)

- The repository now throws a clear error in the browser console if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing. This replaces the vague "Failed to fetch" error and will point you to the missing environment variables.

4. Quick verification checklist

- Restart the `tavlinx` service: `sudo systemctl restart tavlinx`
- Rebuild: `cd /var/www/tavlinx && npm run build`
- Open the site and try login; if you now see an explicit error in the console about missing env vars, fix `.env.production` and rebuild.

If you prefer, I can add a short runtime diagnostic route that prints the embedded `NEXT_PUBLIC_SUPABASE_URL` (only enable temporarily for debugging). Would you like that? 
