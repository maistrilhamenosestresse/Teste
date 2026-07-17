import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf-8');
const getEnv = (key) => env.split('\n').find(l => l.startsWith(key))?.split('=')[1]?.trim()?.replace(/"/g, '');

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnv('SUPABASE_SERVICE_ROLE_KEY') || getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
  const { data, error } = await supabase.rpc('get_tables'); // Or query information_schema
  
  // Since we might not have the RPC, let's query a known table, or just use raw postgres REST if possible.
  // Actually, Supabase JS doesn't have a direct way to list tables without RPC. Let's just fetch a single row from likely tables.
  const tables = ['produtos', 'products', 'pedidos', 'orders', 'loja'];
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    if (!error) {
      console.log(`Table exists: ${t}`);
    } else {
      console.log(`Table does not exist or error: ${t}`, error.message);
    }
  }
}
listTables();
