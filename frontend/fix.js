const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboardLayout.jsx', 'utf8');

const regex = /<Link to="\/admin\/moderation"[\s\S]*?<\/Link>/;
let newLink = "            <Link to=\"/admin/moderation\" className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${isActive('/admin/moderation') ? 'text-primary bg-primary/[0.03] nav-active font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'}`}>\n              <span className={`material-symbols-outlined text-xl ${isActive('/admin/moderation') ? '' : 'text-slate-400 group-hover:text-slate-600'}`}>gavel</span>\n              <span className=\"text-[14px]\">Modération</span>\n              {isActive('/admin/moderation') && <div className=\"absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[14px] bg-primary rounded-l-md\"></div>}\n            </Link>";

code = code.replace(regex, newLink);

fs.writeFileSync('src/components/AdminDashboardLayout.jsx', code);
