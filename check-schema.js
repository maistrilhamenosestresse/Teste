const { createClient } = require('@supabase/supabase-js');


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTables() {
  console.log("Checking tables...");
  
  const clientes = await supabase.from('clients').select('id, full_name, email').limit(1);
  console.log("Clientes:", clientes.error ? clientes.error.message : "Exists!");

  const reservas = await supabase.from('reservas').select('id, client_id, agenda_id, status_pagamento').limit(1);
  console.log("Reservas:", reservas.error ? reservas.error.message : "Exists!");
  
  const fotos_trilhas = await supabase.from('fotos_trilhas').select('agenda_id');
  const uniqueAgendas = [...new Set(fotos_trilhas.data?.map(f => f.agenda_id))];
  console.log("Agendas with photos:", uniqueAgendas);

  const agendas = await supabase.from('agendas').select('id, title');
  console.log("All agendas:", agendas.data);
}

checkTables();
