import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = new URL(req.url)
  const isAdminPath = url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')
  if (!isAdminPath) return NextResponse.next()

  // Basic check for a Supabase session cookie; role is enforced in layout
  const hasSession = req.cookies.has('sb:token') || req.cookies.has('sb-access-token') || req.cookies.has('sb-access-token')
  if (!hasSession) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }
