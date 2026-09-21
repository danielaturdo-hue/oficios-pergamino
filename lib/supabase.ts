import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
process.env.NEXT_PUBLIC_SUPABASE_URL ||
'https://kosutptnxzqslsvpbhuc.supabase.co'

const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvc3V0cHRueHpxc2xzdnBiaHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTQ1MjcsImV4cCI6MjEwNDk5MDUyN30.TvYk9a6Rj9BhYsPzNMKKR30xFpRCZa_t_nHjbJ7Yt0M'

export const supabase = createClient(
supabaseUrl,
supabaseAnonKey
)