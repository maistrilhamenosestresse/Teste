const fs = require('fs');
let content = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');

// 1. Fix Cartão Masks
content = content.replace(
  `onChange={(e) => setCardData({...cardData, number: e.target.value})}`,
  `onChange={(e) => {
                      let val = e.target.value.replace(/\\D/g, '');
                      val = val.replace(/(\\d{4})(?=\\d)/g, '$1 ').trim();
                      setCardData({...cardData, number: val});
                    }} maxLength={19}`
);

content = content.replace(
  `onChange={(e) => setCardData({...cardData, holderName: e.target.value.toUpperCase()})}`,
  `onChange={(e) => {
                      let val = e.target.value.replace(/[^a-zA-ZÀ-ÿ\\s]/g, '').toUpperCase();
                      setCardData({...cardData, holderName: val});
                    }}`
);

content = content.replace(
  `maxLength={4} placeholder="000"`,
  `maxLength={3} placeholder="000"`
);

// 2. Add Info panels
const cardTarget = `{paymentMethod === 'CREDIT_CARD' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 mb-6">`;
const cardReplacement = `{paymentMethod === 'CREDIT_CARD' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 mb-6">
                  <div className="bg-[#1C2534] p-4 rounded-xl border border-white/5 flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Total no Cartão:</span>
                    <span className="font-bold text-white text-lg">R$ {calculateGrossPrice(getTotalPrice(), 'CREDIT_CARD', cardData.installments).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>`;
content = content.replace(cardTarget, cardReplacement);

// PIX info panel
const pixTarget = `{paymentMethod === 'CREDIT_CARD' && (`; // Inject before this
const pixReplacement = `{paymentMethod === 'PIX' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6">
                  <div className="bg-[#25D366]/10 p-4 rounded-xl border border-[#25D366]/20 flex items-center justify-between">
                    <span className="text-sm text-[#25D366]">Total no PIX:</span>
                    <span className="font-bold text-[#25D366] text-lg">R$ {calculateGrossPrice(getTotalPrice(), 'PIX').toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </motion.div>
              )}
              {paymentMethod === 'CREDIT_CARD' && (`
content = content.replace(pixTarget, pixReplacement);

// BOLETO info panel
const boletoTarget = `{(paymentMethod === 'CREDIT_CARD' || paymentMethod === 'BOLETO') && (`;
const boletoReplacement = `{paymentMethod === 'BOLETO' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4 mt-2">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                    <span className="text-sm text-white">Total no Boleto:</span>
                    <span className="font-bold text-white text-lg">R$ {calculateGrossPrice(getTotalPrice(), 'BOLETO', cardData.installments).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </motion.div>
              )}
              {(paymentMethod === 'CREDIT_CARD' || paymentMethod === 'BOLETO') && (`
content = content.replace(boletoTarget, boletoReplacement);

fs.writeFileSync('src/app/checkout/page.tsx', content);
console.log("Success checkout");
