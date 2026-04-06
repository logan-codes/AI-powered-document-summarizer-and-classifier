import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const JWT_MAX_AGE_S = 60 * 60; // 60 minutes

/**
 * Decode a JWT and return its iat (issued-at) claim.
 * This is safe to do without verification in middleware
 * because Supabase validates signatures on the server.
 */
function getJwtIatSeconds(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    return typeof decoded.iat === "number" ? decoded.iat : null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run middleware on public assets or auth pages
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/signup')
  ) {
    return supabaseResponse
  }

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // getUser(). A simple mistake can make it very hard to debug
  // why user sessions are being lost.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user || error) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Belt-and-suspenders: check JWT age via iat claim
  // Even if Supabase considers the session valid (refresh token still active),
  // we enforce our own 60-minute hard cap.
  const authHeader = request.cookies
    .getAll()
    .find((c) => c.name.includes('access-token') || c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))

  if (authHeader?.value) {
    try {
      // The cookie might be a JSON array from Supabase SSR — extract the access token
      const raw = decodeURIComponent(authHeader.value)
      const parsed = JSON.parse(raw)
      const accessToken: string | undefined = Array.isArray(parsed) ? parsed[0] : parsed?.access_token
      if (accessToken) {
        const iat = getJwtIatSeconds(accessToken)
        if (iat && Math.floor(Date.now() / 1000) - iat >= JWT_MAX_AGE_S) {
          await supabase.auth.signOut()
          const url = request.nextUrl.clone()
          url.pathname = '/login'
          url.searchParams.set('reason', 'session_expired')
          return NextResponse.redirect(url)
        }
      }
    } catch {
      // Cookie parsing failed — fall through (client-side guard will catch it)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
