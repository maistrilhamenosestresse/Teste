const fs = require('fs');

let content = fs.readFileSync('src/app/admin/page.tsx', 'utf-8');

// 1. Update mainTab state to include new tabs
const mainTabTarget = `const [mainTab, setMainTab] = useState<'trilhas' | 'clientes' | 'reservas' | 'financas'>('trilhas');`;
const mainTabReplacement = `const [mainTab, setMainTab] = useState<'trilhas' | 'clientes' | 'reservas' | 'financas' | 'cobrancas' | 'loja' | 'gamificacao'>('trilhas');
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);`;

if (content.includes(mainTabTarget)) {
  content = content.replace(mainTabTarget, mainTabReplacement);
} else {
  console.log("Could not find mainTab state declaration.");
}

// 2. Add new buttons to Desktop Sidebar
const desktopSidebarTarget = `<button 
              onClick={() => setMainTab('financas')}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'financas' ? 'bg-green-50 text-[#25D366]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}
            >
              <DollarSign className="h-5 w-5" />
              Finanças
            </button>`;

const desktopSidebarReplacement = `<button 
              onClick={() => setMainTab('financas')}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'financas' ? 'bg-green-50 text-[#25D366]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}
            >
              <DollarSign className="h-5 w-5" />
              Finanças
            </button>

            <button 
              onClick={() => setMainTab('cobrancas')}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'cobrancas' ? 'bg-red-50 text-red-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}
            >
              <ExternalLink className="h-5 w-5" />
              Cobranças (Asaas)
            </button>

            <button 
              onClick={() => setMainTab('loja')}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'loja' ? 'bg-blue-50 text-blue-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}
            >
              <Gift className="h-5 w-5" />
              Loja Virtual
            </button>

            <button 
              onClick={() => setMainTab('gamificacao')}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'gamificacao' ? 'bg-purple-50 text-purple-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}
            >
              <Trophy className="h-5 w-5" />
              Gamificação
            </button>`;

// Some files might have 'Finanas' due to encoding. So I'll use regex.
const regexDesktop = /<button[\s\S]*?onClick=\{\(\) => setMainTab\('financas'\)\}[\s\S]*?<\/button>/;
const matchDesktop = content.match(regexDesktop);
if (matchDesktop) {
  content = content.replace(matchDesktop[0], matchDesktop[0] + `
            <button 
              onClick={() => setMainTab('cobrancas')}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'cobrancas' ? 'bg-red-50 text-red-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}
            >
              <FileSignature className="h-5 w-5" />
              Cobranças (Asaas)
            </button>

            <button 
              onClick={() => setMainTab('loja')}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'loja' ? 'bg-blue-50 text-blue-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}
            >
              <Gift className="h-5 w-5" />
              Loja
            </button>

            <button 
              onClick={() => setMainTab('gamificacao')}
              className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'gamificacao' ? 'bg-purple-50 text-purple-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}
            >
              <Trophy className="h-5 w-5" />
              Gamificação
            </button>
`);
}

// 3. Update the Mobile Layout. Instead of Bottom Navigation, let's just replace the Bottom Navigation completely with a Header Hamburger Drawer.
// Or wait, keep the Bottom Navigation but add a "Menu" button that opens a Drawer.
const mobileNavTarget = `<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-end justify-between px-2 pb-5 pt-2 z-40 md:hidden print:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">`;
const mobileNavReplacement = `
        {/* MOBILE DRAWER MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
              <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 bottom-0 left-0 w-72 bg-white z-50 md:hidden flex flex-col shadow-2xl">
                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#1D2A3A] p-2 rounded-xl shadow-md"><ShieldCheck className="h-6 w-6 text-white" /></div>
                    <div><h1 className="text-lg font-black text-gray-900 leading-tight">Admin</h1></div>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500"><X className="h-5 w-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  <button onClick={() => { setMainTab('trilhas'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold \${mainTab === 'trilhas' ? 'bg-orange-50 text-[#F17B37]' : 'text-gray-500'}\`}><CalendarDays className="h-5 w-5" /> Trilhas</button>
                  <button onClick={() => { setMainTab('clientes'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold \${mainTab === 'clientes' ? 'bg-orange-50 text-[#F17B37]' : 'text-gray-500'}\`}><FileText className="h-5 w-5" /> Clientes</button>
                  <button onClick={() => { setMainTab('reservas'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold \${mainTab === 'reservas' ? 'bg-orange-50 text-[#F17B37]' : 'text-gray-500'}\`}><CheckCircle2 className="h-5 w-5" /> Reservas</button>
                  <button onClick={() => { setMainTab('financas'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold \${mainTab === 'financas' ? 'bg-green-50 text-[#25D366]' : 'text-gray-500'}\`}><DollarSign className="h-5 w-5" /> Finanças</button>
                  <button onClick={() => { setMainTab('cobrancas'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold \${mainTab === 'cobrancas' ? 'bg-red-50 text-red-500' : 'text-gray-500'}\`}><FileSignature className="h-5 w-5" /> Cobranças (Asaas)</button>
                  <button onClick={() => { setMainTab('loja'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold \${mainTab === 'loja' ? 'bg-blue-50 text-blue-500' : 'text-gray-500'}\`}><Gift className="h-5 w-5" /> Loja</button>
                  <button onClick={() => { setMainTab('gamificacao'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold \${mainTab === 'gamificacao' ? 'bg-purple-50 text-purple-500' : 'text-gray-500'}\`}><Trophy className="h-5 w-5" /> Gamificação</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-end justify-between px-2 pb-5 pt-2 z-40 md:hidden print:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">`;

if (content.includes(mobileNavTarget)) {
  content = content.replace(mobileNavTarget, mobileNavReplacement);
}

// 4. Update the bottom navigation buttons to remove 'Clientes' and 'Reservas' to make space for 'Menu'
// Actually, let's keep 'Trilhas', 'Finanças', and replace the other two with 'Mais' (Menu)
const oldMobileButtons = /<button[\s\S]*?onClick=\{\(\) => setMainTab\('trilhas'\)\}[\s\S]*?<\/button>[\s\S]*?<button[\s\S]*?onClick=\{\(\) => setMainTab\('clientes'\)\}[\s\S]*?<\/button>[\s\S]*?\{!isAssistantOpen && \([\s\S]*?\}\)[\s\S]*?<button[\s\S]*?onClick=\{\(\) => setMainTab\('reservas'\)\}[\s\S]*?<\/button>[\s\S]*?<button[\s\S]*?onClick=\{\(\) => setMainTab\('financas'\)\}[\s\S]*?<\/button>/;

const newMobileButtons = `<button 
            onClick={() => setMainTab('trilhas')}
            className={\`flex flex-col items-center justify-center w-full py-3 transition-colors relative \${mainTab === 'trilhas' ? 'text-[#F17B37]' : 'text-gray-400 hover:text-gray-600'}\`}
          >
            {mainTab === 'trilhas' && <motion.div layoutId="nav-pill" className="absolute top-0 w-10 h-1 bg-[#F17B37] rounded-b-full" />}
            <CalendarDays className="h-5 w-5 mb-1" />
            <span className="text-[9px] font-bold tracking-wide">Trilhas</span>
          </button>

          <button 
            onClick={() => setMainTab('financas')}
            className={\`flex flex-col items-center justify-center w-full py-3 transition-colors relative \${mainTab === 'financas' ? 'text-[#25D366]' : 'text-gray-400 hover:text-gray-600'}\`}
          >
            {mainTab === 'financas' && <motion.div layoutId="nav-pill" className="absolute top-0 w-10 h-1 bg-[#25D366] rounded-b-full" />}
            <DollarSign className="h-5 w-5 mb-1" />
            <span className="text-[9px] font-bold tracking-wide">Finanças</span>
          </button>

          {!isAssistantOpen && (
            <button 
              onClick={() => setIsAssistantOpen(true)}
              className="flex flex-col items-center justify-center w-full py-2 -mt-6 group z-10"
            >
              <div className="bg-[#1D2A3A] text-white p-4 rounded-full shadow-xl shadow-blue-900/20 group-hover:scale-110 active:scale-95 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <Sparkles className="h-6 w-6 relative z-10" />
              </div>
            </button>
          )}

          <button 
            onClick={() => setMainTab('cobrancas')}
            className={\`flex flex-col items-center justify-center w-full py-3 transition-colors relative \${mainTab === 'cobrancas' ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}\`}
          >
            {mainTab === 'cobrancas' && <motion.div layoutId="nav-pill" className="absolute top-0 w-10 h-1 bg-red-500 rounded-b-full" />}
            <FileSignature className="h-5 w-5 mb-1" />
            <span className="text-[9px] font-bold tracking-wide">Asaas</span>
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center w-full py-3 transition-colors relative text-gray-400 hover:text-gray-600"
          >
            <Navigation className="h-5 w-5 mb-1" />
            <span className="text-[9px] font-bold tracking-wide">Mais</span>
          </button>`;

if (content.match(oldMobileButtons)) {
  content = content.replace(oldMobileButtons, newMobileButtons);
} else {
  console.log("Could not find mobile navigation block to replace.");
}

// 5. Add rendering stubs for the new views at the end of the AnimatePresence block
const contentEndTarget = `{/* --- FIM DAS VIEWS --- */}`;
// Wait, I need to find the AnimatePresence closing tag
const presenceEndTarget = `</AnimatePresence>
        </main>

      {/* 3. BOTÃO FLUTUANTE`;

const presenceEndReplacement = `
            {/* --- VISÃO DE COBRANÇAS --- */}
            {mainTab === 'cobrancas' && (
              <motion.div key="cobrancas" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <FileSignature className="h-16 w-16 text-red-200 mb-4" />
                  <h2 className="text-2xl font-black text-gray-800 mb-2">Painel de Cobranças</h2>
                  <p className="text-gray-500 max-w-sm">Aqui você poderá gerenciar os boletos, carnês e ver a situação de todos os pagamentos em tempo real sincronizados com o Asaas.</p>
                </div>
              </motion.div>
            )}

            {/* --- VISÃO DE LOJA --- */}
            {mainTab === 'loja' && (
              <motion.div key="loja" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <Gift className="h-16 w-16 text-blue-200 mb-4" />
                  <h2 className="text-2xl font-black text-gray-800 mb-2">Loja Virtual</h2>
                  <p className="text-gray-500 max-w-sm">Venda barracas, botas e acessórios. Uma nova forma de lucrar com o seu ecossistema.</p>
                </div>
              </motion.div>
            )}

            {/* --- VISÃO DE GAMIFICAÇÃO --- */}
            {mainTab === 'gamificacao' && (
              <motion.div key="gamificacao" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center min-h-[400px]">
                  <Trophy className="h-16 w-16 text-purple-200 mb-4" />
                  <h2 className="text-2xl font-black text-gray-800 mb-2">Ranking e Gamificação</h2>
                  <p className="text-gray-500 max-w-sm">Os clientes que mais compram sobem de nível e ganham cashback. Engaje sua comunidade!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

      {/* 3. BOTÃO FLUTUANTE`;

const regexPresence = /<\/AnimatePresence>\s*<\/main>\s*\{\/\* 3\. BOT/g;
content = content.replace(regexPresence, presenceEndReplacement.replace('BOTÃO', 'BOT'));


fs.writeFileSync('src/app/admin/page.tsx', content);
console.log("Success admin layout refactor");
