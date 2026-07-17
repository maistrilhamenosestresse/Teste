const fs = require('fs');

let content = fs.readFileSync('src/app/admin/page.tsx', 'utf-8');

const target1 = `<div><label className="block text-sm font-bold mb-1">Valor</label><input {...register("price", { required: true })} inputMode="decimal" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F17B37]" placeholder="150.00" /></div>`;

const replacement1 = `<div className="relative"><label className="block text-sm font-bold mb-1">Valor (Líquido)</label><input {...register("price", { required: true })} inputMode="decimal" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F17B37]" placeholder="150.00" />
{watchPrice && !isNaN(parseFloat(watchPrice.replace(',', '.'))) && (
  <div className="absolute top-full mt-2 left-0 w-64 md:w-72 z-50 bg-white shadow-2xl border border-orange-100 rounded-xl p-4 text-sm animate-in fade-in slide-in-from-top-2">
    <p className="font-bold text-[#F17B37] border-b border-orange-100 pb-2 mb-3 flex items-center gap-2"><DollarSign className="w-4 h-4"/> Repasse Sugerido</p>
    <div className="space-y-2">
      <div className="flex justify-between items-center text-gray-600"><span>PIX</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'PIX'))}</span></div>
      <div className="flex justify-between items-center text-gray-600"><span>Boleto</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'BOLETO'))}</span></div>
      <div className="flex justify-between items-center text-gray-600"><span>Cartão (1x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'CREDIT_CARD', 1))}</span></div>
      <div className="flex justify-between items-center text-gray-600"><span>Cartão (12x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'CREDIT_CARD', 12))}</span></div>
    </div>
  </div>
)}
</div>`;

const target2 = /<option value="hard">Dif.cil<\/option>\s*<\/select>\s*<\/div>\s*<\/div>/;

const replacement2 = `<option value="hard">Difícil</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* FORMAS DE PAGAMENTO ACEITAS */}
                  <div className="mt-4 p-4 border border-gray-200 rounded-2xl bg-gray-50/50">
                    <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600"/> Formas de Pagamento Permitidas (Asaas)
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {['PIX', 'CREDIT_CARD', 'BOLETO'].map(method => (
                        <label key={method} className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-xl border border-gray-200 hover:border-orange-300 transition-colors">
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 text-[#F17B37] rounded focus:ring-[#F17B37]"
                            checked={acceptedPaymentMethods.includes(method)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setAcceptedPaymentMethods(prev => [...prev, method]);
                              } else {
                                setAcceptedPaymentMethods(prev => prev.filter(m => m !== method));
                              }
                            }}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {method === 'PIX' ? 'PIX' : method === 'CREDIT_CARD' ? 'Cartão de Crédito' : 'Boleto'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>`;

if (content.includes(target1) && target2.test(content)) {
  content = content.replace(target1, replacement1);
  content = content.replace(target2, replacement2);
  fs.writeFileSync('src/app/admin/page.tsx', content);
  console.log("Success");
} else {
  console.log("Targets not found. Target1:", content.includes(target1), "Target2:", target2.test(content));
}
