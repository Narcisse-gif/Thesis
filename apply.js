const fs = require('fs');
let content = fs.readFileSync('frontend/src/pages/ApplicationFormPage.jsx', 'utf8');

content = content.replace(
  "import { useNavigate } from 'react-router-dom';",
  "import { useNavigate, useParams } from 'react-router-dom';\nimport { useState, useEffect } from 'react';\nimport api from '../services/api';"
);

content = content.replace(
  /export default function ApplicationFormPage\(\) \{\s*const navigate = useNavigate\(\);\s*const handleSubmit = \(e\) => \{\s*e\.preventDefault\(\);\s*navigate\('\/etudiant\/candidatures'\);\s*};\s*return \(/,
  `export default function ApplicationFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', cvUrl: '', coverLetterText: '', portfolioUrl: '' });

  useEffect(() => {
    if (id) {
      api.get(\`/offers/\${id}\`).then(res => {
        setOffer(res.data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    } else { setLoading(false); }
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(\`/applications/\${id}\`, formData);
      navigate('/etudiant/candidatures');
    } catch (err) {
      alert('Erreur lors de la candidature: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div className="text-center py-20 text-slate-500 font-bold">Chargement...</div>;
  if (!offer) return <div className="text-center py-20 text-red-500 font-bold">Offre introuvable</div>;

  return (`
);

content = content.replace(/Développeur Fullstack Senior/g, '{offer.title}');
content = content.replace(/Coris Tech Solutions/g, "{offer.enterprise?.companyName || 'L\\'entreprise'}");
content = content.replace(/Développeur\s*Fullstack Senior/g, '{offer.title}');
content = content.replace(/Coris Tech\s*Solutions/g, "{offer.enterprise?.companyName || 'L\\'entreprise'}");

content = content.replace('placeholder="Jean-Baptiste Kaboré"', 'name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Jean-Baptiste Kaboré"');
content = content.replace('placeholder="Jean-Baptiste KaborÃ©"', 'name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Jean-Baptiste Kaboré"');
content = content.replace('type="email"', 'name="email" value={formData.email} onChange={handleChange} type="email"');
content = content.replace('type="tel"', 'name="phone" value={formData.phone} onChange={handleChange} type="tel"');
content = content.replace('placeholder="https://mon-portfolio.com (Optionnel)"', 'name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} placeholder="https://mon-portfolio.com (Optionnel)"');
content = content.replace('placeholder="Madame, Monsieur..."', 'name="coverLetterText" value={formData.coverLetterText} onChange={handleChange} placeholder="Madame, Monsieur..."');

fs.writeFileSync('frontend/src/pages/ApplicationFormPage.jsx', content);
console.log('Done apply form.');
