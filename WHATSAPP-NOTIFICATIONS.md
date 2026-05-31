# WhatsApp Notifications Setup

This app sends customer WhatsApp alerts when an admin updates a package status in `/orders`.

- **All status updates** trigger a shipment status notification.
- **`Ready for Pickup`** uses a dedicated pickup-ready message with collection details.

## How it works

1. Admin updates a package status in `/orders`.
2. The app calls `POST /api/whatsapp/notify` (admin must be logged in).
3. The server sends the message through the **WhatsApp Cloud API** (Meta).
4. If WhatsApp API credentials are not configured yet, the app opens a prefilled `wa.me` chat as a fallback so staff can send manually.

## Required environment variables

Add these to your VPS `.env` file (same folder as the app):

```env
WHATSAPP_ACCESS_TOKEN=your_meta_permanent_or_system_user_token
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
WHATSAPP_API_VERSION=v21.0
WHATSAPP_TEMPLATE_LANGUAGE=en

# Optional but recommended
WHATSAPP_TEMPLATE_STATUS=shipment_status_update
WHATSAPP_TEMPLATE_PICKUP=shipment_ready_pickup
WHATSAPP_TRACKING_URL=https://www.tavlinxfreight.com/tracking
WHATSAPP_PICKUP_LOCATION=Tavlinx Harare warehouse — Zimex Mall, Shop C15, 1st Floor

# template = production (recommended), text = testing only inside 24h reply window
WHATSAPP_MESSAGE_MODE=template
```

Restart the app after updating env vars:

```bash
pm2 restart tavlinx
```

## Meta WhatsApp Cloud API setup

1. Go to [Meta for Developers](https://developers.facebook.com/) and create an app.
2. Add the **WhatsApp** product.
3. In **WhatsApp > API Setup**, copy:
   - **Phone number ID** → `WHATSAPP_PHONE_NUMBER_ID`
   - **Temporary access token** (for testing) or create a **System User token** (for production) → `WHATSAPP_ACCESS_TOKEN`
4. Add your business phone number and complete Meta business verification for production use.

## Create WhatsApp message templates

Meta requires approved templates for automated outbound messages.

### Template 1: `shipment_status_update`

Category: **Utility**

Body example:

```text
Hello {{1}},

Your Tavlinx shipment {{2}} has been updated.

Status: {{3}}
Package: {{4}}
Note: {{5}}

Track here: {{6}}
```

Parameters:

1. Customer name  
2. Tracking ID  
3. Status label  
4. Package description  
5. Note / location  
6. Tracking URL  

### Template 2: `shipment_ready_pickup`

Category: **Utility**

Body example:

```text
Hello {{1}},

Your shipment {{2}} is READY FOR PICKUP.

Pickup location: {{3}}

Please bring your tracking ID when collecting your goods.

Track here: {{4}}
```

Parameters:

1. Customer name  
2. Tracking ID  
3. Pickup location  
4. Tracking URL  

Submit both templates in Meta Business Manager and wait for approval. Template names must match your `.env` values.

## Testing

1. Log in to `/orders`.
2. Update any package status with **Notify customer on WhatsApp** checked.
3. Confirm the customer receives the message on WhatsApp.

For pickup alerts, set status to **Ready for Pickup** — the pickup template/message is used automatically.

## Troubleshooting

| Issue | Fix |
|------|-----|
| `WhatsApp API is not configured` | Add `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` to `.env` and restart the app |
| Template send fails | Ensure template name/language matches Meta exactly and template is approved |
| Message not delivered | Customer phone must include country code (e.g. `263...`, `971...`) |
| Only manual WhatsApp opens | API not configured or template rejected — use fallback until Meta setup is complete |
| `fetch failed` on VPS | Check outbound HTTPS access from VPS to `graph.facebook.com` |

## Security notes

- Never commit `.env` or WhatsApp tokens to GitHub.
- Only authenticated admins can call `/api/whatsapp/notify`.
- Keep your Meta access token on the server only.
