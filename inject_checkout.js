const fs = require('fs');

let content = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');

// Inject Import
if (!content.includes('calculateGrossPrice')) {
  content = content.replace('import { supabase } from "@/lib/supabase";', 'import { supabase } from "@/lib/supabase";\nimport { calculateGrossPrice } from "@/lib/fees";');
}

// Target 1: Subtotal
const target1 = `<span>R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
const replacement1 = `<span>R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`; // No change to subtotal! Subtotal is the NET price.

// Target 2: Total a Pagar
const target2 = `<span className="text-2xl font-black text-[#25D366]">R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
const replacement2 = `<span className="text-2xl font-black text-[#25D366]">R$ {calculateGrossPrice(getTotalPrice(), paymentMethod, paymentMethod === 'CREDIT_CARD' ? cardData.installments : 1).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <div className="text-[10px] text-gray-500 mt-1 text-right w-full block font-medium">Taxas incluídas</div>`;

// Target 3: Installments Dropdown
const target3 = /\{num\}x de R\$ \{\(getTotalPrice\(\) \/ num\)\.toLocaleString\('pt-BR', \{ minimumFractionDigits: 2, maximumFractionDigits: 2 \}\)\} \{num === 1 \? '.(?:\\x[0-9a-fA-F]+)? vista' : 'sem juros'\}/;
const replacement3 = `{num}x de R$ {(calculateGrossPrice(getTotalPrice(), paymentMethod, num) / num).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {num === 1 ? 'à vista' : ''}`;


// Target 4: ProcessPayment payload calculation
// I need to send the GROSS price to Asaas API, but Asaas API does that automatically via API? No, the checkout-asaas API expects the `amount` property.
// Wait, I need to see where `amount` is in `src/app/checkout/page.tsx`!
// I'll skip Target 4 for now and check how `amount` is sent in `src/app/checkout/page.tsx`.

if (content.includes(target2) && target3.test(content)) {
  content = content.replace(target2, replacement2);
  content = content.replace(target3, replacement3);
  fs.writeFileSync('src/app/checkout/page.tsx', content);
  console.log("Success");
} else {
  console.log("Targets not found. Target2:", content.includes(target2), "Target3:", target3.test(content));
}
