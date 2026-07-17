const fs = require('fs');
let content = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');

// 1. Initial State for paymentMethod
const target1 = `const [paymentMethod, setPaymentMethod] = useState<'CREDIT_CARD' | 'PIX' | 'BOLETO'>('CREDIT_CARD');`;
const replacement1 = `const [paymentMethod, setPaymentMethod] = useState<'CREDIT_CARD' | 'PIX' | 'BOLETO'>('PIX');
  
  // Calculate allowed payment methods (intersection of all items in cart)
  const allowedMethods = items.reduce((acc, item) => {
    if (!item.acceptedPaymentMethods || item.acceptedPaymentMethods.length === 0) return acc;
    return acc.filter(method => item.acceptedPaymentMethods.includes(method));
  }, ['PIX', 'CREDIT_CARD', 'BOLETO']);

  useEffect(() => {
    if (!allowedMethods.includes(paymentMethod) && allowedMethods.length > 0) {
      setPaymentMethod(allowedMethods.includes('PIX') ? 'PIX' : allowedMethods[0] as any);
    }
  }, [allowedMethods, paymentMethod]);`;

// 2. Wrap buttons with condition
const target2 = `<button onClick={() => setPaymentMethod('CREDIT_CARD')} className={\`p-4 rounded-2xl border flex flex-col items-center gap-2 transition \${paymentMethod === 'CREDIT_CARD' ? 'bg-[#F17B37]/20 border-[#F17B37] text-white' : 'bg-[#0F1722]/50 border-white/10 text-gray-400'}\`}>
                  <CreditCard className="w-6 h-6" />
                  <span className="text-xs font-bold">Cartão</span>
                </button>
                <button onClick={() => setPaymentMethod('PIX')} className={\`p-4 rounded-2xl border flex flex-col items-center gap-2 transition \${paymentMethod === 'PIX' ? 'bg-[#25D366]/20 border-[#25D366] text-white' : 'bg-[#0F1722]/50 border-white/10 text-gray-400'}\`}>
                  <QrCode className="w-6 h-6" />
                  <span className="text-xs font-bold">PIX</span>
                </button>
                <button onClick={() => setPaymentMethod('BOLETO')} className={\`p-4 rounded-2xl border flex flex-col items-center gap-2 transition \${paymentMethod === 'BOLETO' ? 'bg-white/20 border-white text-white' : 'bg-[#0F1722]/50 border-white/10 text-gray-400'}\`}>
                  <FileText className="w-6 h-6" />
                  <span className="text-xs font-bold">Boleto</span>
                </button>`;

const replacement2 = `{allowedMethods.includes('CREDIT_CARD') && (
                  <button onClick={() => setPaymentMethod('CREDIT_CARD')} className={\`p-4 rounded-2xl border flex flex-col items-center gap-2 transition \${paymentMethod === 'CREDIT_CARD' ? 'bg-[#F17B37]/20 border-[#F17B37] text-white' : 'bg-[#0F1722]/50 border-white/10 text-gray-400'}\`}>
                    <CreditCard className="w-6 h-6" />
                    <span className="text-xs font-bold">Cartão</span>
                  </button>
                )}
                {allowedMethods.includes('PIX') && (
                  <button onClick={() => setPaymentMethod('PIX')} className={\`p-4 rounded-2xl border flex flex-col items-center gap-2 transition \${paymentMethod === 'PIX' ? 'bg-[#25D366]/20 border-[#25D366] text-white' : 'bg-[#0F1722]/50 border-white/10 text-gray-400'}\`}>
                    <QrCode className="w-6 h-6" />
                    <span className="text-xs font-bold">PIX</span>
                  </button>
                )}
                {allowedMethods.includes('BOLETO') && (
                  <button onClick={() => setPaymentMethod('BOLETO')} className={\`p-4 rounded-2xl border flex flex-col items-center gap-2 transition \${paymentMethod === 'BOLETO' ? 'bg-white/20 border-white text-white' : 'bg-[#0F1722]/50 border-white/10 text-gray-400'}\`}>
                    <FileText className="w-6 h-6" />
                    <span className="text-xs font-bold">Boleto</span>
                  </button>
                )}`;

// 3. Update 'Total a Pagar' dynamically based on PIX context or selected paymentMethod context
// The user says: "Total a pagar Pix. Informação do Pix. Avançar para pagamento. Aí, no pagamento seguro, cartão, Pix ou boleto, tem que estar as informações ali, com os valores correto..."
// Wait, the user wants the total to reflect the selected payment method.
// I already did this!
// `<span className="text-2xl font-black text-[#25D366]">R$ {calculateGrossPrice(getTotalPrice(), paymentMethod, paymentMethod === 'CREDIT_CARD' ? cardData.installments : 1).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`
// But maybe they want the label to explicitly say which payment method it's calculating for.
const target3 = `<span className="font-bold text-gray-300">Total a Pagar</span>`;
const replacement3 = `<span className="font-bold text-gray-300">Total a Pagar ({paymentMethod === 'PIX' ? 'PIX' : paymentMethod === 'CREDIT_CARD' ? 'Cartão' : 'Boleto'})</span>`;

if (content.includes(target1) && content.includes(target2)) {
  content = content.replace(target1, replacement1);
  content = content.replace(target2, replacement2);
  content = content.replace(target3, replacement3);
  fs.writeFileSync('src/app/checkout/page.tsx', content);
  console.log("Success checkout/page.tsx");
} else {
  console.log("checkout/page.tsx Target not found.");
}
