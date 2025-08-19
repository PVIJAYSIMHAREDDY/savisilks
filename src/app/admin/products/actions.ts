'use server'

import { revalidatePath } from 'next/cache'
import { getServerSupabase } from '@/lib/supabase'

async function ensureAdmin() {
  const supabase = getServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { data: isAdmin } = await supabase.rpc('is_admin', { uid: user.id })
  if (!isAdmin) throw new Error('Forbidden')
  return supabase
}

export async function createProduct(formData: FormData) {
  const supabase = await ensureAdmin()
  const name = String(formData.get('name') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const price = Number(formData.get('price') || 0)
  const stock = Number(formData.get('stock') || 0)
  const image_url = String(formData.get('image_url') || '').trim()
  const is_published = formData.get('is_published') === 'on'

  const { error } = await supabase.from('products').insert({
    name, description, price, stock, image_url, is_published
  })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
}

export async function updateProduct(formData: FormData) {
  const supabase = await ensureAdmin()
  const id = String(formData.get('id') || '')
  const name = String(formData.get('name') || '').trim()
  const description = String(formData.get('description') || '').trim()
  const price = Number(formData.get('price') || 0)
  const stock = Number(formData.get('stock') || 0)
  const image_url = String(formData.get('image_url') || '').trim()
  const is_published = formData.get('is_published') === 'on'

  const { error } = await supabase.from('products')
    .update({ name, description, price, stock, image_url, is_published })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
}

export async function deleteProduct(formData: FormData) {
  const supabase = await ensureAdmin()
  const id = String(formData.get('id') || '')
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/products')
}
