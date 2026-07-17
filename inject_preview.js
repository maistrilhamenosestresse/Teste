const fs = require('fs');

let content = fs.readFileSync('src/app/admin/page.tsx', 'utf-8');

// Adicionar state hideFeePreview
if (!content.includes('hideFeePreview')) {
  content = content.replace(
    'const [acceptedPaymentMethods, setAcceptedPaymentMethods] = useState<string[]>([\'PIX\', \'CREDIT_CARD\', \'BOLETO\']);',
    'const [acceptedPaymentMethods, setAcceptedPaymentMethods] = useState<string[]>([\'PIX\', \'CREDIT_CARD\', \'BOLETO\']);\n  const [hideFeePreview, setHideFeePreview] = useState<boolean>(false);'
  );
}

// Alterar o input e o popup do preview
const target1 = `<input {...register("price", { required: true })} inputMode="decimal" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F17B37]" placeholder="150.00" />
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
)}`;

const replacement1 = `<input {...register("price", { required: true })} onFocus={() => setHideFeePreview(false)} inputMode="decimal" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F17B37]" placeholder="150.00" />
{watchPrice && !isNaN(parseFloat(watchPrice.replace(',', '.'))) && !hideFeePreview && (
  <div className="absolute top-full mt-2 left-0 w-72 z-50 bg-white shadow-2xl border border-orange-100 rounded-xl p-4 text-sm animate-in fade-in slide-in-from-top-2">
    <div className="flex justify-between items-center border-b border-orange-100 pb-2 mb-3">
      <p className="font-bold text-[#F17B37] flex items-center gap-2"><DollarSign className="w-4 h-4"/> Preço Final no Site</p>
      <button type="button" onClick={() => setHideFeePreview(true)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4"/></button>
    </div>
    <p className="text-[10px] text-gray-500 mb-3 leading-tight">O sistema cobrará estes valores automaticamente. Você receberá o valor líquido digitado.</p>
    <div className="space-y-2">
      <div className="flex justify-between items-center text-gray-600"><span>PIX</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'PIX'))}</span></div>
      <div className="flex justify-between items-center text-gray-600"><span>Boleto (1x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'BOLETO'))}</span></div>
      <div className="flex justify-between items-center text-gray-600"><span>Boleto Parcelado (12x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'BOLETO', 12))}</span></div>
      <div className="flex justify-between items-center text-gray-600"><span>Cartão (1x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'CREDIT_CARD', 1))}</span></div>
      <div className="flex justify-between items-center text-gray-600"><span>Cartão (12x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'CREDIT_CARD', 12))}</span></div>
    </div>
  </div>
)}`;

if (content.includes(target1)) {
  content = content.replace(target1, replacement1);
  fs.writeFileSync('src/app/admin/page.tsx', content);
  console.log("Success admin/page.tsx");
} else {
  console.log("admin/page.tsx Target not found.");
}
