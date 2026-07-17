import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf-8');
const getEnv = (key) => env.split('\n').find(l => l.startsWith(key))?.split('=')[1]?.trim()?.replace(/"/g, '');

const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL');
const supabaseKey = getEnv('SUPABASE_SERVICE_ROLE_KEY') || getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase.from('clients').select('*').limit(1);
  console.log("CLIENTS:", data);
  
  const { data: d2 } = await supabase.from('agendas').select('*').limit(1);
  console.log("AGENDAS:", d2);
}

checkSchema();
