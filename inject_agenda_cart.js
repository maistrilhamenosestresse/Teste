const fs = require('fs');
let content = fs.readFileSync('src/app/agenda/[id]/page.tsx', 'utf-8');

const target1 = /availableSpots: remaining\s*\}\);/;
const replacement1 = `availableSpots: remaining,
        acceptedPaymentMethods: agenda.accepted_payment_methods || ['PIX', 'CREDIT_CARD', 'BOLETO']
      });`;

if (target1.test(content)) {
  content = content.replace(target1, replacement1);
  fs.writeFileSync('src/app/agenda/[id]/page.tsx', content);
  console.log("Success agenda/[id]/page.tsx");
} else {
  console.log("agenda/[id]/page.tsx Target not found.");
}
