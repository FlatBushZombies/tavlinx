import { formatWhatsappPhone, isValidWhatsappPhone } from '@/lib/whatsapp/format-phone'
import {
  buildNotificationMessage,
  buildPickupReadyMessage,
  buildStatusUpdateMessage,
  getStatusLabel,
  type StatusNotificationInput,
} from '@/lib/whatsapp/messages'

export type WhatsappSendResult =
  | { sent: true; mode: 'template' | 'text'; messageId?: string }
  | { sent: false; mode: 'none'; reason: string }

function getApiVersion(): string {
  return process.env.WHATSAPP_API_VERSION || 'v21.0'
}

function isWhatsappConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID,
  )
}

function getTemplateName(status: string): string | null {
  if (status === 'ready_pickup') {
    return process.env.WHATSAPP_TEMPLATE_PICKUP || process.env.WHATSAPP_TEMPLATE_STATUS || null
  }

  return process.env.WHATSAPP_TEMPLATE_STATUS || null
}

function buildTemplateComponents(input: StatusNotificationInput) {
  const statusLabel = input.statusLabel || getStatusLabel(input.status)

  if (input.status === 'ready_pickup') {
    const pickupLocation =
      input.location ||
      process.env.WHATSAPP_PICKUP_LOCATION ||
      'Tavlinx Harare warehouse'

    return [
      {
        type: 'body',
        parameters: [
          { type: 'text', text: input.customerName },
          { type: 'text', text: input.trackingId },
          { type: 'text', text: pickupLocation },
          { type: 'text', text: process.env.WHATSAPP_TRACKING_URL || 'https://www.tavlinxfreight.com/tracking' },
        ],
      },
    ]
  }

  const note = input.description || input.location || 'No additional notes'
  const packageInfo = input.packageDescription || 'Your shipment'

  return [
    {
      type: 'body',
      parameters: [
        { type: 'text', text: input.customerName },
        { type: 'text', text: input.trackingId },
        { type: 'text', text: statusLabel },
        { type: 'text', text: packageInfo },
        { type: 'text', text: note },
        { type: 'text', text: process.env.WHATSAPP_TRACKING_URL || 'https://www.tavlinxfreight.com/tracking' },
      ],
    },
  ]
}

async function sendWhatsappRequest(body: Record<string, unknown>): Promise<WhatsappSendResult> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN

  if (!phoneNumberId || !accessToken) {
    return { sent: false, mode: 'none', reason: 'WhatsApp API is not configured' }
  }

  const response = await fetch(
    `https://graph.facebook.com/${getApiVersion()}/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    const reason =
      typeof payload?.error?.message === 'string'
        ? payload.error.message
        : `WhatsApp API request failed (${response.status})`
    return { sent: false, mode: 'none', reason }
  }

  return {
    sent: true,
    mode: body.type === 'template' ? 'template' : 'text',
    messageId: payload?.messages?.[0]?.id,
  }
}

export async function sendWhatsappNotification(
  phone: string,
  input: StatusNotificationInput,
): Promise<WhatsappSendResult> {
  if (!isValidWhatsappPhone(phone)) {
    return { sent: false, mode: 'none', reason: 'Invalid customer phone number' }
  }

  if (!isWhatsappConfigured()) {
    return { sent: false, mode: 'none', reason: 'WhatsApp API is not configured' }
  }

  const to = formatWhatsappPhone(phone)
  const templateName = getTemplateName(input.status)
  const messageMode = process.env.WHATSAPP_MESSAGE_MODE || 'template'

  if (templateName && messageMode !== 'text') {
    const templateResult = await sendWhatsappRequest({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: {
        name: templateName,
        language: { code: process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en' },
        components: buildTemplateComponents(input),
      },
    })

    if (templateResult.sent) {
      return templateResult
    }

    if (messageMode === 'template') {
      return templateResult
    }
  }

  const textBody = buildNotificationMessage(input)

  return sendWhatsappRequest({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: textBody },
  })
}

export function previewNotificationMessage(input: StatusNotificationInput): string {
  if (input.status === 'ready_pickup') {
    return buildPickupReadyMessage(input)
  }

  return buildStatusUpdateMessage(input)
}
