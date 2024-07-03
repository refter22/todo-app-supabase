import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://exxbzizzstyadfrgaumt.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4eGJ6aXp6c3R5YWRmcmdhdW10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk5ODE4OTcsImV4cCI6MjAzNTU1Nzg5N30.CjKYAeIRMVYjyvvB3WptbJb2aBGmfiB_r2v_QDzhzpE'

export const supabase = createClient(supabaseUrl, supabaseKey)
