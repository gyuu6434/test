'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AuthState, getUserProfile } from '@/lib/types/auth'

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  const supabase = createClient()

  // Initialize auth state and listen to auth changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setState({ user: null, loading: false, error })
      } else {
        setState({ user: session?.user ?? null, loading: false, error: null })
      }
    })

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, loading: false, error: null })
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  // Sign in with Google
  const signInWithGoogle = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      setState((prev) => ({ ...prev, loading: false, error }))
      console.error('Login error:', error)
    }
    // Loading state will be updated by onAuthStateChange after redirect
  }

  // Sign out
  const signOut = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    const { error } = await supabase.auth.signOut()

    if (error) {
      setState((prev) => ({ ...prev, loading: false, error }))
      console.error('Logout error:', error)
    } else {
      setState({ user: null, loading: false, error: null })
      // Redirect to homepage after logout
      window.location.href = '/'
    }
  }

  return {
    user: state.user,
    profile: getUserProfile(state.user),
    loading: state.loading,
    error: state.error,
    signInWithGoogle,
    signOut,
  }
}
