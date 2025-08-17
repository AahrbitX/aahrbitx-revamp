import { createClient } from '@supabase/supabase-js'
import { config } from '@/lib/config'

// Custom Supabase client with custom auth URLs
export function createCustomAuthClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Override the default auth URLs to use your domain
      flowType: 'pkce',
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
}

// Server-side custom auth client
export function createCustomServerAuthClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Override the default auth URLs to use your domain
      flowType: 'pkce',
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
}

// Function to handle signup with custom redirect
export async function signUpWithCustomRedirect(email: string, password: string) {
  const supabase = createCustomAuthClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: config.verificationUrl,
    }
  })
  
  return { data, error }
}
