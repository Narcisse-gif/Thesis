const fs = require('fs');
let text = fs.readFileSync('src/components/AdminDashboardLayout.jsx', 'utf8');

text = text.replace(/Ã©/g, 'é')
           .replace(/Ã¨/g, 'è')
           .replace(/Ã/g, 'à')

fs.writeFileSync('src/components/AdminDashboardLayout.jsx', text, 'utf8');
console.log('Fixed encoding.')
