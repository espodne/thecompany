import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('🔗 Supabase URL:', supabaseUrl) 
console.log('🔑 Supabase Key:', supabaseAnonKey ? 'Key exists' : 'No key')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)