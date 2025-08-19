import LoginForm from '@/components/LoginForm'

export default function AdminLoginPage() {
  return (
    <main className="mx-auto max-w-sm p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
      <LoginForm />
    </main>
  )
}
export default function AdminHome() {
  return (
    <section className="p-6">
      <h2 className="text-xl font-semibold">Welcome, Admin</h2>
      <p className="text-sm text-gray-600">You are authenticated and authorized.</p>
    </section>
  )
}
