import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
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
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
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

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()


  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()


    // const {
    //   data: { user },
    // } = await supabase.auth.getUser()
    // if (
    //   !user &&
    //   !request.nextUrl.pathname.startsWith('/login') &&
    //   !request.nextUrl.pathname.startsWith('/auth')
    // ) {
    //   // no user, potentially respond by redirecting the user to the login page
    //   const url = request.nextUrl.clone()
    //   url.pathname = '/signin'
    //   return NextResponse.redirect(url)
    // }
    // Handle refresh token errors gracefully
    if (error && (error.message.includes('refresh_token') || error.code === 'refresh_token_not_found')) {
      // Clear invalid session cookies
      const response = NextResponse.next({ request })
      response.cookies.delete('sb-access-token')
      response.cookies.delete('sb-refresh-token')
      return response
    }

    if (
      !user &&
      !request.nextUrl.pathname.startsWith('/signin') &&
      !request.nextUrl.pathname.startsWith('/signup') &&
      !request.nextUrl.pathname.startsWith('/auth')
    ) {
      // no user, potentially respond by redirecting the user to the login page
      const url = request.nextUrl.clone()
      url.pathname = '/signin'
      return NextResponse.redirect(url)
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse
  } catch (error) {
    console.error('Middleware error:', error)
    // Return the response even if there's an error to avoid blocking the request
    return supabaseResponse
  }
}