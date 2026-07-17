const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://yslikzkgiaxafcgrqvzh.supabase.co', 'sb_publishable_P08GCyftnuBDqcOaCdS92g_8AZYEWoj');

async function run() {
  const { data, error } = await supabase.from('clients').select('*').eq('id', '90abb730-99e5-43c4-a928-1319ea952f30');
  console.log('Error:', error);
  console.log('Data:', data);
}
run();
