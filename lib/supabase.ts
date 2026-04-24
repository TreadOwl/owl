import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_PUBLISHABLE_KEY

if (!url || !key) throw new Error('Missing Supabase env vars')

export const supabase = createClient(url, key)
