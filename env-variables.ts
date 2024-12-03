export const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL ?? ""
export const SUPABASE_ANON_KEY =  import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""
export const COMPANIES_LIMIT = import.meta.env.VITE_COMPANIES_LIMIT ? parseInt(import.meta.env.VITE_COMPANIES_LIMIT) : 10