const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/StudentApplicationsPage.jsx', 'utf8');

content = content.replace(
  "import { useMemo, useState } from 'react';",
  "import { useMemo, useState, useEffect } from 'react';\nimport api from '../services/api';"
);

content = content.replace(
  /const applications = \[[^]*?\];/,
  ""
);

content = content.replace(
  /export default function StudentApplicationsPage\(\) \{/,
  `export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/my').then(res => {
      setApplications(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);`
);

content = content.replace(
  /const statusMatch = statusFilter === 'Tous' \? true : application\.status === statusFilter;/g,
  "const mapStatus = s => s === 'PENDING' ? 'En attente' : s === 'ACCEPTED' ? 'Acceptee' : 'Rejetee';\n      const statusMatch = statusFilter === 'Tous' ? true : mapStatus(application.status) === statusFilter;"
);

content = content.replace(
  /const typeMatch = typeFilter === 'Tous' \? true : application\.type === typeFilter;/g,
  "const mapType = t => t === 'STAGE' ? 'Stage' : 'Emploi';\n      const typeMatch = typeFilter === 'Tous' ? true : mapType(application.offer.contractType) === typeFilter;"
);

content = content.replace(
  /const cityMatch = cityFilter === 'Toutes' \? true : application\.city === cityFilter;/g,
  "const cityMatch = cityFilter === 'Toutes' ? true : application.offer.location === cityFilter;"
);

content = content.replace(
  /application\.offer\.toLowerCase\(\)\.includes\(search\.toLowerCase\(\)\) \|\|/g,
  "application.offer.title.toLowerCase().includes(search.toLowerCase()) ||"
);

content = content.replace(
  /application\.company\.toLowerCase\(\)\.includes\(search\.toLowerCase\(\)\);/g,
  "(application.offer.enterprise?.companyName || '').toLowerCase().includes(search.toLowerCase());"
);

content = content.replace(
  /\{row\.offer\}/g,
  "{row.offer.title}"
);
content = content.replace(
  /\{row\.logo\}/g,
  "{row.offer.enterprise?.logoUrl}"
);
content = content.replace(
  /\{row\.initials\}/g,
  "{(row.offer.enterprise?.companyName || 'Ent').substring(0, 2)}"
);
content = content.replace(
  /\{row\.company\}/g,
  "{row.offer.enterprise?.companyName}"
);
content = content.replace(
  /\{row\.type\}/g,
  "{row.offer.contractType === 'STAGE' ? 'Stage' : 'Emploi'}"
);
content = content.replace(
  /\{row\.city\}/g,
  "{row.offer.location}"
);
content = content.replace(
  /\{row\.date\}/g,
  "{new Date(row.createdAt).toLocaleDateString('fr-FR')}"
);
content = content.replace(
  /statusStyle\[row\.status\]/g,
  "statusStyle[row.status === 'PENDING' ? 'En attente' : row.status === 'ACCEPTED' ? 'Acceptee' : 'Rejetee']"
);
content = content.replace(
  /\{row\.status\}/g,
  "{row.status === 'PENDING' ? 'En attente' : row.status === 'ACCEPTED' ? 'Acceptee' : 'Rejetee'}"
);

fs.writeFileSync('frontend/src/pages/StudentApplicationsPage.jsx', content);
console.log('Done apply student applications form.');
