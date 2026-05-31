export interface NotifyCustomerPayload {
  customerPhone: string
  customerName: string
  trackingId: string
  status: string
  description?: string | null
  location?: string | null
  packageDescription?: string | null
}

export interface NotifyCustomerResponse {
  sent: boolean
  mode?: 'template' | 'text' | 'none'
  reason?: string
  messageId?: string
  isPickupAlert?: boolean
  fallbackUrl?: string
  messagePreview?: string
  error?: string
}

export async function notifyCustomerWhatsApp(
  payload: NotifyCustomerPayload,
): Promise<NotifyCustomerResponse> {
  const response = await fetch('/api/whatsapp/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as NotifyCustomerResponse

  if (!response.ok) {
    return {
      sent: false,
      mode: 'none',
      reason: data.error || 'Failed to send WhatsApp notification',
    }
  }

  return data
}
