'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/utils/supabase/server'
import getCurrUser from '../user/getCurrUser'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log('Login data:', data)

  const { data: loginData, error } = await supabase.auth.signInWithPassword(data)

  console.log('Login error:', error)

  if (error) {
    return { error: error.message, appUser: null }
  }

  const appUser = await getCurrUser(loginData.user!.id);

  revalidatePath('/', 'layout')
  
  return {
    error: null,
    appUser
  };
}

