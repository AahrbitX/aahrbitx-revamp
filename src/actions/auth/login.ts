'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/utils/supabase/server'

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
    return  { data : null, error: error.message }
  }

  revalidatePath('/', 'layout')
  
  return {
    data: loginData,
    error: null,
  };
}

