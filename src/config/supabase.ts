export const SUPABASE_URL = 'https://wnzfhqwejcvhfhqzckcn.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduemZocXdlamN2aGZocXpja2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMTA4MjEsImV4cCI6MjA5OTY4NjgyMX0.EKzR5ZQzTIRKdYqEYknjJauTfwgL-sgCDRRgz2bnfSE';


export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'apikey': SUPABASE_ANON_KEY,
});