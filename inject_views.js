const fs = require('fs');

let content = fs.readFileSync('src/app/admin/page.tsx', 'utf-8');

// The exact string to find:
const targetString = `</motion.div>
              )}
          </AnimatePresence>
          </div>
          <PinModal`;

// But formatting might differ. Using Regex around PinModal.
const regex = /<\/AnimatePresence>\s*<\/div>\s*<PinModal/;

const replacement = `
              {/* --- VISÃO DE COBRANÇAS --- */}
              {mainTab === 'cobrancas' && (
                <motion.div key="cobrancas" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
                  <CobrancasDashboard />
                </motion.div>
              )}

              {/* --- VISÃO DE LOJA --- */}
              {mainTab === 'loja' && (
                <motion.div key="loja" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <h2 className="text-2xl font-black text-gray-800 mb-2">Loja Virtual</h2>
                    <p className="text-gray-500 max-w-sm">Venda barracas, botas e acessórios. Em breve!</p>
                  </div>
                </motion.div>
              )}

              {/* --- VISÃO DE GAMIFICAÇÃO --- */}
              {mainTab === 'gamificacao' && (
                <motion.div key="gamificacao" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                    <h2 className="text-2xl font-black text-gray-800 mb-2">Ranking e Gamificação</h2>
                    <p className="text-gray-500 max-w-sm">Sistema de pontos e cashback. Em breve!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <PinModal`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/app/admin/page.tsx', content);
  console.log("Success injecting views");
} else {
  console.log("Failed to match PinModal regex");
}
