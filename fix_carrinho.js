const fs = require('fs');

let content = fs.readFileSync('src/app/carrinho/page.tsx', 'utf-8');

// The fixed bottom mobile bar has the second "Pagar" button.
// Let's remove the entire block from "{items.length > 0 && (" to the end of that div.
const targetToRemove = `{items.length > 0 && (
         <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#0F1722]/95 backdrop-blur-xl border-t border-white/10 p-4 z-50">
           <div className="flex items-center justify-between gap-4">
             <div>
               <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Total</span>
               <p className="text-xl font-black text-white">R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
             </div>
             <button 
                onClick={() => router.push('/checkout')}
                disabled={hasMissingDependents}
                className="px-6 bg-gradient-to-r from-[#25D366] to-[#20b858] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
              >
                <ShieldCheck className="h-5 w-5" />
                Pagar
              </button>
           </div>
         </div>
      )}`;

if (content.includes(targetToRemove)) {
  content = content.replace(targetToRemove, '');
}

// Also make sure all instances of `getTotalPrice()` in the subtotal/total block use `getLowestGrossPrice`
const subtotalTarget = `<span>R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
const subtotalReplacement = `<span>R$ {getLowestGrossPrice(getTotalPrice()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;

if (content.includes(subtotalTarget)) {
  content = content.replace(subtotalTarget, subtotalReplacement);
}

const totalTarget = `<p className="text-2xl md:text-4xl font-black text-white leading-none">R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;
const totalReplacement = `<p className="text-2xl md:text-4xl font-black text-white leading-none">R$ {getLowestGrossPrice(getTotalPrice()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;

if (content.includes(totalTarget)) {
  content = content.replace(totalTarget, totalReplacement);
}


fs.writeFileSync('src/app/carrinho/page.tsx', content);
console.log("Success carrinho");
