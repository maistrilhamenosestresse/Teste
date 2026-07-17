const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf-8');

// 1. Wrap the fee preview popup items with conditionals based on acceptedPaymentMethods state
const popupTarget = `<div className="flex justify-between items-center text-gray-600"><span>PIX</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'PIX'))}</span></div>
        <div className="flex justify-between items-center text-gray-600"><span>Boleto (1x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'BOLETO'))}</span></div>
        <div className="flex justify-between items-center text-gray-600"><span>Boleto Parcelado (12x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'BOLETO', 12))}</span></div>
        <div className="flex justify-between items-center text-gray-600"><span>Cartão (1x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'CREDIT_CARD', 1))}</span></div>
        <div className="flex justify-between items-center text-gray-600"><span>Cartão (12x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'CREDIT_CARD', 12))}</span></div>`;

const popupReplacement = `{acceptedPaymentMethods.includes('PIX') && <div className="flex justify-between items-center text-gray-600"><span>PIX</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'PIX'))}</span></div>}
        {acceptedPaymentMethods.includes('BOLETO') && <div className="flex justify-between items-center text-gray-600"><span>Boleto (1x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'BOLETO'))}</span></div>}
        {acceptedPaymentMethods.includes('BOLETO') && <div className="flex justify-between items-center text-gray-600"><span>Boleto Parcelado (12x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'BOLETO', 12))}</span></div>}
        {acceptedPaymentMethods.includes('CREDIT_CARD') && <div className="flex justify-between items-center text-gray-600"><span>Cartão (1x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'CREDIT_CARD', 1))}</span></div>}
        {acceptedPaymentMethods.includes('CREDIT_CARD') && <div className="flex justify-between items-center text-gray-600"><span>Cartão (12x)</span><span className="font-bold text-gray-800">{formatCurrency(calculateGrossPrice(parseFloat(watchPrice.replace(',', '.')), 'CREDIT_CARD', 12))}</span></div>}`;

if (content.includes(popupTarget)) {
  content = content.replace(popupTarget, popupReplacement);
}

// 2. Add badges to Trail Cards
const cardTarget = `<div className="flex items-center gap-4 text-xs font-bold text-gray-500 mt-1">
                                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {occupied}/{maxCap}</span>
                                    <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {formatCurrency(agenda.price)}</span>
                                  </div>`;

const cardReplacement = `<div className="flex items-center gap-4 text-xs font-bold text-gray-500 mt-1">
                                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {occupied}/{maxCap}</span>
                                    <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> {formatCurrency(agenda.price)}</span>
                                  </div>
                                  <div className="flex gap-1 mt-2">
                                    {(!agenda.accepted_payment_methods || agenda.accepted_payment_methods.includes('PIX')) && <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold">PIX</span>}
                                    {(!agenda.accepted_payment_methods || agenda.accepted_payment_methods.includes('CREDIT_CARD')) && <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold">Cartão</span>}
                                    {(!agenda.accepted_payment_methods || agenda.accepted_payment_methods.includes('BOLETO')) && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">Boleto</span>}
                                  </div>`;

if (content.includes(cardTarget)) {
  content = content.replace(cardTarget, cardReplacement);
}

fs.writeFileSync('src/app/admin/page.tsx', content);
console.log("Success admin ui tweaks");
