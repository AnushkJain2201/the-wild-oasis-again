import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://nowepdlshtpdzrsjpvhy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vd2VwZGxzaHRwZHpyc2pwdmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNTE5OTEsImV4cCI6MjA2MTcyNzk5MX0.LGkPhGDXNeCdxc238GkRvJdr8uSMm5MpDDJXZv7BFQE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;