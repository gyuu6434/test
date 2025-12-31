import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const returnUrl = requestUrl.searchParams.get('returnUrl') || '/'
  const origin = requestUrl.origin

  // Handle OAuth callback
  if (code) {
    const supabase = await createClient()

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Error exchanging code for session:', error)
      // Redirect to home with error query param
      return NextResponse.redirect(`${origin}/?auth_error=true`)
    }

    // Get the logged-in user
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // Check if profile exists in profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

      if (profileError || !profile) {
        // Profile doesn't exist - redirect to signup page with returnUrl
        console.log('No profile found, redirecting to signup')
        const signupUrl = new URL('/signup', origin)
        if (returnUrl !== '/') {
          signupUrl.searchParams.set('returnUrl', returnUrl)
        }
        return NextResponse.redirect(signupUrl.toString())
      }

      // Profile exists - redirect to returnUrl or homepage
      console.log('Profile found, redirecting to:', returnUrl)
      return NextResponse.redirect(`${origin}${returnUrl}`)
    }
  }

  // Fallback: redirect to homepage
  return NextResponse.redirect(origin)
}
