const fs = require('fs');

let content = fs.readFileSync('src/app/admin/page.tsx', 'utf-8');

const oldMobileNavRegex = /\{\/\* 4\. MENU INFERIOR \(BOTTOM NAVIGATION\) TIPO APP \*\/\}[\s\S]*?<nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full z-30 pb-safe print:hidden md:hidden shadow-\[0_-10px_20px_rgba\(0,0,0,0\.03\)\]">[\s\S]*?<\/nav>/;

const newMobileNav = `
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
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"><X className="h-5 w-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  <button onClick={() => { setMainTab('trilhas'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'trilhas' ? 'bg-orange-50 text-[#F17B37]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}><CalendarDays className="h-5 w-5" /> Trilhas</button>
                  <button onClick={() => { setMainTab('clientes'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'clientes' ? 'bg-orange-50 text-[#F17B37]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}><FileText className="h-5 w-5" /> Clientes</button>
                  <button onClick={() => { setMainTab('reservas'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'reservas' ? 'bg-orange-50 text-[#F17B37]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}><CheckCircle2 className="h-5 w-5" /> Reservas</button>
                  <button onClick={() => { setMainTab('financas'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'financas' ? 'bg-green-50 text-[#25D366]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}><DollarSign className="h-5 w-5" /> Finanças</button>
                  <button onClick={() => { setMainTab('cobrancas'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'cobrancas' ? 'bg-red-50 text-red-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}><FileSignature className="h-5 w-5" /> Cobranças (Asaas)</button>
                  <button onClick={() => { setMainTab('loja'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'loja' ? 'bg-blue-50 text-blue-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}><Gift className="h-5 w-5" /> Loja Virtual</button>
                  <button onClick={() => { setMainTab('gamificacao'); setIsMobileMenuOpen(false); }} className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all \${mainTab === 'gamificacao' ? 'bg-purple-50 text-purple-500' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}\`}><Trophy className="h-5 w-5" /> Gamificação</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 4. MENU INFERIOR (BOTTOM NAVIGATION) TIPO APP */}
        <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full z-30 pb-safe print:hidden md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
          <div className="flex justify-around items-center max-w-lg mx-auto relative px-2">
            
            <button 
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
            
            {/* BOTÃO ASSISTENTE IA CENTRALIZADO */}
            <div className="relative -top-6 flex justify-center w-[70px] shrink-0 mx-1">
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 w-[56px] h-[56px] bg-[#F17B37] rounded-full z-30 pointer-events-none" />
              <motion.button
                onClick={() => setIsAssistantOpen(true)}
                animate={{ y: [0, -4, 0] }} transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9, rotate: -5 }}
                className="absolute bg-white rounded-full shadow-[0_0_20px_rgba(241,123,55,0.6)] z-40 border-[3px] border-[#F17B37] overflow-hidden flex items-center justify-center p-0.5" style={{ width: '56px', height: '56px' }}
              >
                <img src="/logo.png" alt="IA" className="h-full w-full object-cover scale-110 rounded-full" />
              </motion.button>
            </div>
  
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
            </button>
  
          </div>
        </nav>
`;

if (content.match(oldMobileNavRegex)) {
  content = content.replace(oldMobileNavRegex, newMobileNav);
  fs.writeFileSync('src/app/admin/page.tsx', content);
  console.log("Success mobile nav refactor");
} else {
  console.log("Failed to match mobile nav.");
}
