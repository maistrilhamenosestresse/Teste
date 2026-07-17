const fs = require('fs');

let content = fs.readFileSync('src/app/admin/page.tsx', 'utf-8');

// 1. Add import
if (!content.includes('CobrancasDashboard')) {
  content = content.replace(
    'import { PinModal } from "@/components/PinModal";',
    'import { PinModal } from "@/components/PinModal";\nimport CobrancasDashboard from "@/components/admin/CobrancasDashboard";'
  );
}

// 2. Replace placeholder
const placeholderTarget = /{mainTab === 'cobrancas' && \([\s\S]*?<FileSignature className="h-16 w-16 text-red-200 mb-4" \/>[\s\S]*?<\/motion\.div>\s*\)}/;

const placeholderReplacement = `{mainTab === 'cobrancas' && (
              <motion.div key="cobrancas" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
                <CobrancasDashboard />
              </motion.div>
            )}`;

if (content.match(placeholderTarget)) {
  content = content.replace(placeholderTarget, placeholderReplacement);
  fs.writeFileSync('src/app/admin/page.tsx', content);
  console.log("Success replacing cobrancas placeholder");
} else {
  console.log("Failed to match cobrancas placeholder");
}
