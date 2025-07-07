import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('🔗 Supabase URL:', supabaseUrl) // ← ДОБАВЬ ЭТО
console.log('🔑 Supabase Key:', supabaseAnonKey ? 'Key exists' : 'No key') // ← ДОБАВЬ ЭТО

export const supabase = createClient(supabaseUrl, supabaseAnonKey)