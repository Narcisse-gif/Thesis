const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/LoginPage.jsx', 'utf8');

content = content.replace(/<div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">[\s\S]*?<\/div>\s*<form/, '<form');

fs.writeFileSync('frontend/src/pages/LoginPage.jsx', content);
console.log('Removed test buttons');
