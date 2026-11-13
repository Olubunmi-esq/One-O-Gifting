import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// In-memory mock store for fallback when live credentials are not yet configured
class MockSupabaseQuery {
  private data: any[] = []

  constructor(data: any[] = []) {
    this.data = data
  }

  select() { return this }
  insert(item: any) {
    this.data.push(item)
    return Promise.resolve({ data: item, error: null })
  }
  update() { return Promise.resolve({ data: null, error: null }) }
  delete() { return Promise.resolve({ data: null, error: null }) }
  eq() { return this }
  order() { return this }
  limit() { return this }
  single() {
    return Promise.resolve({ data: this.data[0] || null, error: null })
  }
  then(resolve: (value: { data: any[]; error: any }) => void) {
    resolve({ data: this.data, error: null })
  }
}

class MockSupabaseClient {
  from(tableName: string) {
    return new MockSupabaseQuery([])
  }
  auth = {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null }, error: new Error('Auth not configured') }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  }
}

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : (new MockSupabaseClient() as any)
