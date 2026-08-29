export type SupabaseConfig = { url:string; anonKey:string };

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  return url && anonKey ? {url,anonKey} : null;
}

export async function supabaseRest<T>(path:string, options:RequestInit = {}):Promise<T> {
  const config=getSupabaseConfig();
  if(!config) throw new Error("Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.");
  const response=await fetch(`${config.url}/rest/v1/${path}`,{...options,headers:{apikey:config.anonKey,Authorization:`Bearer ${config.anonKey}`,'Content-Type':'application/json',Prefer:'return=representation',...(options.headers??{})}});
  if(!response.ok) throw new Error(`Supabase: ${response.status}`);
  return response.status===204 ? (undefined as T) : await response.json() as T;
}
