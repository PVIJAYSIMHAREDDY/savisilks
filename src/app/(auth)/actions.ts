'use server'

import { redirect } from 'next/navigation'
import { getServerSupabase } from '@/lib/supabase'

export type AuthState = { error?: string } | undefined

export async function signInWithPassword(_: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') || '')
  const password = String(formData.get('password') || '')
  const supabase = getServerSupabase()

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  redirect('/admin')
}

export async function signOut() {
  const supabase = getServerSupabase()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
