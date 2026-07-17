const fs = require('fs');
let content = fs.readFileSync('src/app/carrinho/page.tsx', 'utf-8');

if (!content.includes('getLowestGrossPrice')) {
  content = content.replace('import { useCartStore } from "@/store/cartStore";', 'import { useCartStore } from "@/store/cartStore";\nimport { getLowestGrossPrice } from "@/lib/fees";');
}

const target1 = `<p className="font-black text-white text-xl">R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;
const replacement1 = `<p className="font-black text-white text-xl"><span className="text-xs font-normal text-gray-400 mr-2">a partir de</span>R$ {(getLowestGrossPrice(item.price) * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>`;

// We also need to change the total price in the footer of the cart page
const target2 = `<span>R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
const replacement2 = `<span>R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`; // Keep subtotal as is or change? The user said "Total a pagar Pix", maybe I should change `getTotalPrice()` everywhere to PIX price if it's the total.
// "no meu carrinho, tem que estar escrito as informações a partir de 150, a partir do valor do Pix"
// Let's modify the total at the bottom of the cart to show the PIX Gross price.
const target3 = `<span className="font-bold text-gray-300">Total a Pagar</span>
                <span className="text-2xl font-black text-[#25D366]">R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;
const replacement3 = `<span className="font-bold text-gray-300">Total a Pagar (PIX)</span>
                <span className="text-2xl font-black text-[#25D366]">R$ {getLowestGrossPrice(getTotalPrice()).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>`;

if (content.includes(target1)) {
  content = content.replace(target1, replacement1);
  if (content.includes(target3)) {
    content = content.replace(target3, replacement3);
  }
  fs.writeFileSync('src/app/carrinho/page.tsx', content);
  console.log("Success carrinho/page.tsx");
} else {
  console.log("carrinho/page.tsx Target not found.");
}
