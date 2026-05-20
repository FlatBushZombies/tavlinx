import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import OrdersPageClient from '@/components/orders/orders-page'

export default async function OrdersPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    },
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/auth/login')
  }

  return <OrdersPageClient />
}
