# Hosting Tavlinx on a Namecheap VPS (Next.js + Supabase)

This guide explains how to deploy this project on a Namecheap VPS so it works the same way as it does locally.

## What you will end up with

- A production build of the Next.js app running on the VPS (Node.js)
- Nginx reverse proxy in front
- HTTPS (Let’s Encrypt) for Google-friendly search results
- Your Supabase tables + RLS set up from the provided SQL in `scripts/001_create_packages_table.sql`
- Required environment variables configured so the Supabase client works

## Prerequisites

You need:

- A Namecheap VPS instance (Linux; guide assumes Ubuntu/Debian-like)
- A domain pointing to the VPS public IP (A/AAAA DNS record in Namecheap)
- Your Supabase project:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY` (the “anon public” key)
- SSH access to the VPS

## Step 1: Provision the VPS + open ports

1. Confirm your VPS has public IP and you can SSH:
   - Example: `ssh ubuntu@YOUR_VPS_IP`
2. In VPS firewall (or `ufw`), allow:
   - `80/tcp` (HTTP)
   - `443/tcp` (HTTPS)
   - `22/tcp` (SSH)

Example using `ufw` (if installed):

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

## Step 2: Install system dependencies

```bash
sudo apt-get update
sudo apt-get install -y git curl build-essential unzip
```

## Step 3: Install Node.js (Node 20 LTS recommended)

### Option A: Use NodeSource

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

## Step 4: Install Nginx

```bash
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

## Step 5: Setup Supabase database (required)

1. In Supabase Dashboard:
   - Go to: **SQL Editor**
2. Execute the SQL file:
   - `scripts/001_create_packages_table.sql`

This creates:

- `public.packages`
- `public.package_events`
- RLS policies for select/insert/update/delete
- tracking_id generation + triggers

### Auth requirement for admin (/orders)

Your `/orders` page is protected by middleware and uses Supabase email/password auth:

- Enable **Email** auth provider in Supabase
- Create an admin user in Supabase (or just use any authenticated user; current RLS policies allow any authenticated user to manage these tables)

## Step 6: Clone and install this repo on the VPS

Choose a deploy directory, e.g.:

```bash
sudo mkdir -p /var/www/tavlinx
sudo chown -R $USER:$USER /var/www/tavlinx
cd /var/www/tavlinx
git clone YOUR_REPO_URL .
```

Install dependencies:

```bash
npm ci
```

## Step 7: Configure environment variables (.env)

This app requires these environment variables for Supabase:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Create `/var/www/tavlinx/.env.production`:

```bash
cat > .env.production <<'EOF'
NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_PUBLIC_KEY"
EOF
```

### Where to get the Supabase keys

In Supabase:

1. **Project Settings** -> **API**
2. Copy:
   - `Project URL` -> goes to `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` -> goes to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Important notes

- Do not commit real keys to git. The repo already ignores `/.env*`.
- These are `NEXT_PUBLIC_*` variables, so they must be present during `next build`.

## Step 8: Build the Next.js app

```bash
npm run build
```

If the build succeeds, proceed.

## Step 9: Run the app (production)

### Recommended: systemd service

1. Create a systemd unit:

```bash
sudo nano /etc/systemd/system/tavlinx.service
```

2. Paste this (adjust `User=` if you deploy under a different user):

```ini
[Unit]
Description=Tavlinx Next.js app
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/tavlinx
EnvironmentFile=/var/www/tavlinx/.env.production
ExecStart=/usr/bin/npm run start -- -p 3000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

3. Reload systemd and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable tavlinx
sudo systemctl start tavlinx
sudo systemctl status tavlinx --no-pager
```

4. Logs:

```bash
sudo journalctl -u tavlinx -f
```

## Step 10: Configure Nginx reverse proxy

Replace `YOUR_DOMAIN` with your domain.

Create:

```bash
sudo nano /etc/nginx/sites-available/tavlinx
```

Paste:

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name YOUR_DOMAIN www.YOUR_DOMAIN;

  client_max_body_size 20m;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/tavlinx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 11: Enable HTTPS with Let’s Encrypt (recommended)

Install certbot:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
```

Request cert:

```bash
sudo certbot --nginx -d YOUR_DOMAIN -d www.YOUR_DOMAIN
```

Then:

```bash
sudo systemctl reload nginx
```

## Step 12: Verify everything

1. Open:
   - `http://YOUR_DOMAIN` (should redirect to HTTPS)
2. Test public pages:
   - `/tracking` (selects from Supabase packages)
   - `/contact` (WhatsApp link and form opens WhatsApp with prefilled message)
3. Test admin:
   - Go to `/orders`
   - Login with a Supabase email/password user
   - Create a package (inserts into `packages` and creates an initial `package_events` row)

## Optional (recommended) SEO/metadata domain alignment

Your `app/layout.tsx` currently includes a hardcoded `metadataBase` domain.

If your VPS domain differs from the current one, you may want to update:

- `metadataBase`
- `alternates.canonical`

This does not change UI functionality, but helps Google show correct canonical URLs.

## Troubleshooting

### 1) App won’t start

Check:

```bash
sudo journalctl -u tavlinx --no-pager | tail -n 200
```

Most common cause: missing `NEXT_PUBLIC_SUPABASE_*` variables.

### 2) Nginx shows 502 Bad Gateway

Check if Next.js server is listening:

```bash
sudo systemctl status tavlinx --no-pager
sudo ss -ltnp | grep 3000
```

Then check Nginx error logs:

```bash
sudo tail -n 200 /var/log/nginx/error.log
```

