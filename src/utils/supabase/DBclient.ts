import { Database } from '@/types/database.types'
import { createClient } from '@supabase/supabase-js'

export const createDBClient =  () => createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)