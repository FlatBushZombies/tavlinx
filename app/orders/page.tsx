import OrdersPageClient from '@/components/orders/orders-page'

export default function OrdersPage() {
  // Auth is handled client-side inside `OrdersPageClient` to avoid relying on
  // middleware or server-side cookie-syncing which can timeout on some hosts.
  return <OrdersPageClient />
}
