# GitHub Auto-Deploy to New Domain

This guide sets up a workflow so that every time you push updates to your GitHub repository, the site is automatically deployed to your VPS and reflected on your new domain.

## Overview

- Deploy from `main` (or another branch) to your VPS.
- Use SSH and GitHub Actions to build and copy the site.
- Restart the Next.js app automatically after deployment.
- Use your custom domain via Nginx.

## Step 1: Prepare the VPS

1. Install `git`, `node`, `npm`, `nginx`, and `rsync`.
2. Clone the repo into the site folder, for example:

```bash
sudo mkdir -p /var/www/tavlinx
sudo chown -R $USER:$USER /var/www/tavlinx
cd /var/www/tavlinx
git clone YOUR_REPO_URL .
```

3. Create or verify the `systemd` service for the app.
4. Configure Nginx for your domain.

## Step 2: Create a deploy SSH key

On your local machine or any safe environment:

```bash
ssh-keygen -t ed25519 -f github_deploy_key -C "github-deploy@tavlinx" -N ""
```

- Add `github_deploy_key.pub` to `/home/YOUR_USER/.ssh/authorized_keys` on the VPS.
- Keep `github_deploy_key` private.

## Step 3: Add GitHub secrets

In the GitHub repository, add these secrets:

- `VPS_HOST` — your VPS IP or hostname
- `VPS_PORT` — usually `22`
- `VPS_USER` — the SSH user on VPS
- `SSH_PRIVATE_KEY` — the contents of `github_deploy_key`
- `DEPLOY_PATH` — e.g. `/var/www/tavlinx`
- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_ANON_KEY` — your Supabase anon public key

> Keep secret values in GitHub only. Do not put them in the repo.

## Step 4: Example GitHub Actions workflow

Create `.github/workflows/deploy.yml` with this example:

```yaml
name: Deploy Tavlinx

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v5
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      - name: Copy files to VPS
        run: |
          rsync -av --delete --exclude='.git' --exclude='node_modules' ./ ${{ secrets.DEPLOY_PATH }}/
        env:
          DEPLOY_PATH: ${{ secrets.DEPLOY_PATH }}

      - name: Restart app on VPS
        run: |
          ssh -o StrictHostKeyChecking=no ${{ secrets.VPS_USER }}@${{ secrets.VPS_HOST }} -p ${{ secrets.VPS_PORT }} \
            'cd ${{ secrets.DEPLOY_PATH }} && npm ci && npm run build && sudo systemctl restart tavlinx'
```

## Step 5: Use your domain

- Configure Nginx to serve your `NEW_DOMAIN` and proxy to `http://127.0.0.1:3000`.
- Use HTTPS via Certbot / Let’s Encrypt.
- After every successful push to `main`, the workflow will deploy the latest code to the same VPS serving your domain.

## Step 6: Verify deployment

- Push a small change to GitHub.
- Confirm the workflow succeeds in Actions.
- Visit your domain and verify the website is updated.

## Important notes

- If your domain changes, update `server_name` in the Nginx config.
- If you need the site to deploy from another branch, update the branch name in `on.push.branches`.
- If you want the site to always use the newest domain URL in metadata, update `metadataBase` in `app/layout.tsx`.

## Quick summary

1. Add SSH deploy key to the VPS.
2. Store secrets in GitHub.
3. Create workflow that builds and deploys on push.
4. Restart the Next.js service after deploy.
5. Test by pushing to GitHub.
