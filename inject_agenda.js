const fs = require('fs');
let content = fs.readFileSync('src/app/agenda/page.tsx', 'utf-8');

if (!content.includes('getLowestGrossPrice')) {
  content = content.replace('import { supabase } from "@/lib/supabase";', 'import { supabase } from "@/lib/supabase";\nimport { getLowestGrossPrice } from "@/lib/fees";');
}

const target = `<span className="font-semibold text-white">R$ {agenda.price}</span>`;
const replacement = `<span className="font-semibold text-white text-xs text-gray-400">a partir de</span> <span className="font-black text-white">R$ {getLowestGrossPrice(agenda.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/app/agenda/page.tsx', content);
  console.log("Success agenda/page.tsx");
} else {
  console.log("agenda/page.tsx Target not found.");
}
