import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.REACT_APP_SUBABASE_URL
const supabaseKey = import.meta.env.REACT_APP_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
