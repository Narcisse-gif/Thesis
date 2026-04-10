const fs = require('fs');

let content = fs.readFileSync('src/components/EnterpriseDashboardLayout.jsx', 'utf-8');

const navStart = content.indexOf('<nav className="flex-1 space-y-1">');
const navEnd = content.indexOf('</nav>', navStart) + 6;

const newNav = `<nav className="flex-1 space-y-2">
  <Link to="/entreprise/dashboard" className={\`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group \${isActive('/entreprise/dashboard') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}\`}>
    <span className={\`material-symbols-outlined text-xl \${isActive('/entreprise/dashboard') ? '' : 'text-slate-400 group-hover:text-slate-600'}\`}>grid_view</span>
    <span className="text-[14px]">Tableau de bord</span>
    {isActive('/entreprise/dashboard') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>
  
  <Link to="/entreprise/offres" className={\`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group \${isActive('/entreprise/offres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}\`}>
    <span className={\`material-symbols-outlined text-xl \${isActive('/entreprise/offres') ? '' : 'text-slate-400 group-hover:text-slate-600'}\`}>work</span>
    <span className="text-[14px]">Offres</span>
    {isActive('/entreprise/offres') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>

  <Link to="/entreprise/candidats" className={\`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group \${isActive('/entreprise/candidats') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}\`}>
    <span className={\`material-symbols-outlined text-xl \${isActive('/entreprise/candidats') ? '' : 'text-slate-400 group-hover:text-slate-600'}\`}>groups</span>
    <span className="text-[14px]">Candidatures</span>
    {isActive('/entreprise/candidats') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>

  <Link to="/entreprise/messages" className={\`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group \${isActive('/entreprise/messages') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}\`}>
    <span className={\`material-symbols-outlined text-xl \${isActive('/entreprise/messages') ? '' : 'text-slate-400 group-hover:text-slate-600'}\`}>mail</span>
    <span className="text-[14px]">Messages</span>
    {isActive('/entreprise/messages') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>

  <Link to="/entreprise/parametres" className={\`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group \${isActive('/entreprise/parametres') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}\`}>
    <span className={\`material-symbols-outlined text-xl \${isActive('/entreprise/parametres') ? '' : 'text-slate-400 group-hover:text-slate-600'}\`}>settings</span>
    <span className="text-[14px]">Paramètres</span>
    {isActive('/entreprise/parametres') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}
  </Link>
</nav>`;

content = content.substring(0, navStart) + newNav + content.substring(navEnd);

const bottomStart = content.indexOf('<div className="mt-auto pt-6 border-t border-slate-200">');
if (bottomStart !== -1) {
  let bottomEnd = content.indexOf('</aside>', bottomStart);
  const newBottom = `<div className="mt-auto pt-8 border-t border-slate-50">
  <Link to="/entreprise/offres/nouvelle" className="w-full bg-primary hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 shadow-sm shadow-primary/20 active:scale-95 mb-4">
    <span className="material-symbols-outlined !text-sm">add</span>
    Nouvelle Offre
  </Link>
  <Link to="/conseils" className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 hover:bg-blue-50 transition-colors group">
    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm group-hover:text-primary transition-colors">
      <span className="material-symbols-outlined !text-xl">help_outline</span>
    </div>
    <div>
      <p className="text-[12px] font-semibold text-slate-700 group-hover:text-primary transition-colors">Aide & Support</p>
      <p className="text-[10px] text-slate-400">Centre d'aide</p>
    </div>
  </Link>
</div>\n      `;
  content = content.substring(0, bottomStart) + newBottom + content.substring(bottomEnd);
}

content = content.replace('<main className="flex-1 md:ml-64 min-h-screen relative w-full">', '<main className="flex-1 md:ml-72 min-h-screen relative w-full">');
content = content.replace('className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] h-16 bg-white/70 backdrop-blur-xl border-b border-primary/5 z-40 flex items-center justify-between px-4 sm:px-8"', 'className="fixed top-0 right-0 w-full md:w-[calc(100%-18rem)] z-40 bg-[#fafbfc]/80 backdrop-blur-xl h-24 px-10 flex justify-between items-center border-b border-slate-100/50"');
content = content.replace(/ParamÃ¨tres/g, "Paramètres");

fs.writeFileSync('src/components/EnterpriseDashboardLayout.jsx', content);
console.log("Done successfully!");
