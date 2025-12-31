import { User } from '@supabase/supabase-js'

// Re-export Supabase User type
export type { User } from '@supabase/supabase-js'

// Auth state interface for the hook
export interface AuthState {
  user: User | null
  loading: boolean
  error: Error | null
}

// User profile data extracted from Google OAuth
export interface UserProfile {
  id: string
  email: string
  name: string
  avatar_url: string | null
}

// Helper function to extract profile from Supabase User
export function getUserProfile(user: User | null): UserProfile | null {
  if (!user) return null

  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
    avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
  }
}
