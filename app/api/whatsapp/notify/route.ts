import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  buildWhatsappFallbackUrl,
  getStatusLabel,
} from '@/lib/whatsapp/messages'
import {
  previewNotificationMessage,
  sendWhatsappNotification,
} from '@/lib/whatsapp/send-message'

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: {
    customerPhone?: string
    customerName?: string
    trackingId?: string
    status?: string
    description?: string | null
    location?: string | null
    packageDescription?: string | null
  }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const {
    customerPhone,
    customerName,
    trackingId,
    status,
    description,
    location,
    packageDescription,
  } = body

  if (!customerPhone || !customerName || !trackingId || !status) {
    return NextResponse.json(
      { error: 'customerPhone, customerName, trackingId, and status are required' },
      { status: 400 },
    )
  }

  const notificationInput = {
    customerName,
    trackingId,
    status,
    statusLabel: getStatusLabel(status),
    description,
    location,
    packageDescription,
  }

  const messagePreview = previewNotificationMessage(notificationInput)
  const fallbackUrl = buildWhatsappFallbackUrl(customerPhone, messagePreview)

  const result = await sendWhatsappNotification(customerPhone, notificationInput)

  if (result.sent) {
    return NextResponse.json({
      sent: true,
      mode: result.mode,
      messageId: result.messageId,
      isPickupAlert: status === 'ready_pickup',
      fallbackUrl,
    })
  }

  return NextResponse.json({
    sent: false,
    mode: 'none',
    reason: result.reason,
    isPickupAlert: status === 'ready_pickup',
    fallbackUrl,
    messagePreview,
  })
}
