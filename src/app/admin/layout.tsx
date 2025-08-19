import { ReactNode } from 'react'
import { getServerSupabase } from '@/lib/supabase'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = getServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role, full_name, email')
    .eq('id', user.id)
    .maybeSingle()

  if (error || !profile || profile.role !== 'admin') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <header className="border-b p-4 flex items-center justify-between">
        <span className="font-medium">Admin Panel</span>
        <nav className="space-x-4">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <form action={async () => {
            'use server'
            const { signOut } = await import('@/app/(auth)/actions')
            return signOut()
          }}>
            <button type="submit" className="underline">Sign out</button>
          </form>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
