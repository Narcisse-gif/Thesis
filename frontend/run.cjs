const fs = require('fs');
const originalLogPath = 'C:\\Users\\Narcisse\\AppData\\Roaming\\Code\\User\\workspaceStorage\\f302875342c8b142648f92e3f5d35c9f\\GitHub.copilot-chat\\chat-session-resources\\5a0c8eb0-6540-4c60-8d95-8bba265e2553\\call_MHxpRnpVbGVPUk1Cb1RXSXNldXM__vscode-1775807795458\\content.txt';

let text = fs.readFileSync(originalLogPath, 'utf8');

if (text.charCodeAt(0) === 0xFEFF) {
  text = text.slice(1);
}

// Remove Modération OFFRES block correctly.
let offresRegex = /<Link to="\/admin\/offres"[\s\S]*?<\/Link>\s*/g;
text = text.replace(offresRegex, '');

fs.writeFileSync('src/components/AdminDashboardLayout.jsx', text, 'utf8');
console.log('RESTORE SUCCESS!');
