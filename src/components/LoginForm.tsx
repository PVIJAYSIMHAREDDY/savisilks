'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { signInWithPassword, type AuthState } from '@/app/(auth)/actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="w-full rounded bg-black text-white py-2 disabled:opacity-50" disabled={pending}>
      {pending ? 'Working...' : 'Login'}
    </button>
  )
}

export default function LoginForm() {
  const [state, action] = useFormState<AuthState, FormData>(signInWithPassword, undefined)
  return (
    <form action={action} className="space-y-3">
      <input name="email" type="email" required placeholder="Email" className="w-full border rounded p-2" defaultValue="buntypeddi0@gmail.com" />
      <input name="password" type="password" required placeholder="Password" className="w-full border rounded p-2" />
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <SubmitButton />
    </form>
  )
}
