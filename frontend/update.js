const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboardLayout.jsx', 'utf8');

code = code.replace(/<span className="text-\[14px\]">Étudiants<\/span>/g, '<span className="text-[14px]">Gestion des étudiants</span>');
code = code.replace(/<span className="text-\[14px\]">Configuration<\/span>/g, '<span className="text-[14px]">Paramètres</span>');
code = code.replace(/\/admin\/settings/g, '/admin/parametres');

const matchBlock = /<Link to="\/admin\/matching"[\s\S]*?<\/Link>\s*/g;
code = code.replace(matchBlock, '');

const offresBlock = /<Link to="\/admin\/offres"[\s\S]*?<\/Link>\s*/g;
code = code.replace(offresBlock, '');

const moderationStr = '            <Link to="/admin/moderation" className={elative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group }>\n              <span className={material-symbols-outlined text-xl }>gavel</span>\n              <span className="text-[14px]">Modération</span>\n              {isActive(\'/admin/moderation\') && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md"></div>}\n            </Link>\n\n';
code = code.replace('<Link to="/admin/rapports"', moderationStr + '<Link to="/admin/rapports"');

fs.writeFileSync('src/components/AdminDashboardLayout.jsx', code);
