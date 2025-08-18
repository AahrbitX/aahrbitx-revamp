'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/utils/supabase/server'
import getCurrUser from '../user/getCurrUser'

export async function login(formData: FormData) {
  try {
    const supabase = await createClient()

    // Clear any existing session first to avoid refresh token conflicts
    await supabase.auth.signOut()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    console.log('Login data:', data)

    // Validate input data
    if (!data.email || !data.password) {
      return { error: 'Email and password are required', appUser: null }
    }

    const { data: loginData, error } = await supabase.auth.signInWithPassword(data)

    console.log('Login response:', { loginData, error })

    if (error) {
      console.error('Supabase auth error:', error)
      
      // Handle specific refresh token errors
      if (error.message.includes('refresh_token') || error.code === 'refresh_token_not_found') {
        return { error: 'Session expired. Please try logging in again.', appUser: null }
      }
      
      return { error: error.message, appUser: null }
    }

    if (!loginData.user) {
      console.error('No user data returned from Supabase')
      return { error: 'Authentication failed: No user data', appUser: null }
    }

    try {
      const appUser = await getCurrUser(loginData.user.id);
      
      if (!appUser) {
        console.error('Failed to get user data from database')
        return { error: 'Failed to retrieve user profile', appUser: null }
      }

      revalidatePath('/', 'layout')
      
      return {
        error: null,
        appUser
      };
    } catch (err) {
      console.error('Error getting user data:', err)
      return { error: 'Failed to retrieve user profile', appUser: null }
    }
  } catch (err) {
    console.error('Unexpected login error:', err)
    return { error: 'An unexpected error occurred during login', appUser: null }
  }
}

