import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
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
        // Profile doesn't exist - redirect to signup page
        console.log('No profile found, redirecting to signup')
        return NextResponse.redirect(`${origin}/signup`)
      }

      // Profile exists - redirect to homepage
      console.log('Profile found, redirecting to home')
      return NextResponse.redirect(origin)
    }
  }

  // Fallback: redirect to homepage
  return NextResponse.redirect(origin)
}
