const fs = require('fs');
let content = fs.readFileSync('src/app/agenda/[id]/page.tsx', 'utf-8');

if (!content.includes('getLowestGrossPrice')) {
  content = content.replace('import { supabase } from "@/lib/supabase";', 'import { supabase } from "@/lib/supabase";\nimport { getLowestGrossPrice } from "@/lib/fees";');
}

const target1 = `R$ {agenda.price.toFixed(2).replace('.', ',')}`;
const replacement1 = `a partir de R$ {getLowestGrossPrice(agenda.price).toFixed(2).replace('.', ',')}`;

const target2 = `<p className="font-bold text-2xl text-[#25D366]">R$ {agenda.price}</p>`;
const replacement2 = `<p className="font-bold text-2xl text-[#25D366]">
                <span className="text-xs font-medium text-gray-500 block mb-0.5">a partir de</span>
                R$ {getLowestGrossPrice(agenda.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>`;

if (content.includes(target1) || content.includes(target2)) {
  content = content.replace(target1, replacement1);
  content = content.replace(target2, replacement2);
  fs.writeFileSync('src/app/agenda/[id]/page.tsx', content);
  console.log("Success agenda/[id]/page.tsx");
} else {
  console.log("agenda/[id]/page.tsx Target not found.");
}
