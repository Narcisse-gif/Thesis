import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { getToken, getUserRole } from '../utils/authStorage';

export default function ApplicationFormContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cvUrl: '',
    coverLetterText: '',
    portfolioUrl: '',
  });
  const [cvFile, setCvFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = getToken();
    const role = getUserRole();

    if (!token || role !== 'STUDENT') {
      alert("Vous devez etre inscrit en tant qu'etudiant pour postuler a une offre.");
      navigate('/inscription/etudiant');
      return;
    }

    if (id) {
      api.get(`/offers/${id}`).then(res => {
        setOffer(res.data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      const payload = new FormData();
      payload.append('fullName', formData.fullName || '');
      payload.append('email', formData.email || '');
      payload.append('phone', formData.phone || '');
      payload.append('portfolioUrl', formData.portfolioUrl || '');
      payload.append('coverLetterText', formData.coverLetterText || '');
      if (cvFile) payload.append('cv', cvFile);
      if (coverLetterFile) payload.append('coverLetter', coverLetterFile);
      

      await api.post(`/applications/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/etudiant/candidatures');
    } catch (err) {
      const status = err.response?.status;
      const apiMessage = err.response?.data?.message;
      if (status === 403) {
        setErrorMessage('Votre compte est suspendu. Vous ne pouvez plus postuler.');
        return;
      }
      if (status === 400 && apiMessage === 'Offre non disponible') {
        setErrorMessage('Cette offre n\'est pas disponible pour candidature.');
        return;
      }
      setErrorMessage(`Erreur lors de la candidature: ${apiMessage || err.message}`);
    }
  };

  if (loading) return <div className="text-center py-20 text-slate-500 font-bold">Chargement...</div>;
  if (!offer) return <div className="text-center py-20 text-red-500 font-bold">Offre introuvable</div>;

  const requiredDocuments = Array.isArray(offer.requiredDocuments) ? offer.requiredDocuments : [];
  const normalizedDocuments = requiredDocuments.filter((doc) => !doc.toLowerCase().includes('reference') && !doc.toLowerCase().includes('référence'));
  const hasRequiredDocuments = normalizedDocuments.length > 0;
  const requiresCv = normalizedDocuments.some((doc) => doc.toLowerCase().includes('cv'));
  const requiresCoverLetter = normalizedDocuments.some((doc) => doc.toLowerCase().includes('lettre'));
  const requiresPortfolio = normalizedDocuments.some((doc) => doc.toLowerCase().includes('portfolio'));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex items-center gap-2">
        <button
          className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
          Retour a l'offre
        </button>
      </div>

      <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Postuler a cette offre</h1>
          <p className="text-slate-500 max-w-lg mx-auto font-medium">Completez les informations ci-dessous pour soumettre votre candidature au poste de <strong className="text-slate-700">{offer.title}</strong> chez <strong className="text-primary">{offer.enterprise?.companyName || "L'entreprise"}</strong>.</p>
        </header>

        {errorMessage && (
          <div className="mb-8 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-[14px] font-semibold text-rose-700">
            {errorMessage}
          </div>
        )}

        <form className="space-y-12" onSubmit={handleSubmit}>
          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px]">Informations Personnelles</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 ml-1">Nom Complet <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Jean-Baptiste Kabore"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 ml-1">Adresse E-mail <span className="text-red-500">*</span></label>
                <input
                  name="email" value={formData.email} onChange={handleChange} type="email"
                  placeholder="jean.k@domain.bf"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[13px] font-bold text-slate-600 ml-1">Numero de Telephone <span className="text-red-500">*</span></label>
                <input
                  name="phone" value={formData.phone} onChange={handleChange} type="tel"
                  placeholder="+226 -- -- -- --"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                  required
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <span className="material-symbols-outlined text-primary">school</span>
              <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px]">Profil Academique &amp; Professionnel</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[13px] font-bold text-slate-600 ml-1">Universite / Ecole <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Universite Joseph Ki-Zerbo"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 ml-1">Domaine d'Etudes <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Genie Logiciel"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 ml-1">Niveau d'Experience <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium appearance-none" required>
                    <option value="">Selectionnez un niveau</option>
                    <option value="1">Etudiant de premier cycle</option>
                    <option value="2">Etudiant en Master / Doctorat</option>
                    <option value="3">Debutant (0-2 ans)</option>
                    <option value="4">Professionnel (2+ ans)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <span className="material-symbols-outlined text-primary">upload_file</span>
              <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px]">Documents Requis</h3>
            </div>

            {hasRequiredDocuments ? (
              <div className="space-y-6">
                {requiresCv && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1 mb-2">
                      <label className="text-[13px] font-bold text-slate-600">CV (Fichier) <span className="text-red-500">*</span></label>
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">PDF, DOCX (Max: 5Mo)</span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(event) => setCvFile(event.target.files?.[0] || null)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[14px]"
                      required
                    />
                  </div>
                )}

                {requiresCoverLetter && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1 mb-2">
                      <label className="text-[13px] font-bold text-slate-600">Lettre de motivation (Fichier) <span className="text-red-500">*</span></label>
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">PDF, DOCX (Max: 5Mo)</span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(event) => setCoverLetterFile(event.target.files?.[0] || null)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[14px]"
                      required
                    />
                  </div>
                )}

                {requiresPortfolio && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1 mb-2">
                      <label className="text-[13px] font-bold text-slate-600">Portfolio (Lien) <span className="text-red-500">*</span></label>
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Site, Drive, Behance</span>
                    </div>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                      required
                    />
                  </div>
                )}

              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-[14px] font-semibold text-slate-500">
                Aucun document requis pour cette offre.
              </div>
            )}

            {!requiresCoverLetter && (
              <div className="space-y-2 pt-4">
                <label className="text-[13px] font-bold text-slate-600 ml-1">Message optionnel a l'entreprise</label>
                <textarea
                  rows={4}
                  name="coverLetterText"
                  value={formData.coverLetterText}
                  onChange={handleChange}
                  placeholder="Exprimez brievement votre motivation ou precisez votre disponibilite..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>
            )}
          </section>

          <div className="pt-6">
            <button type="submit" className="w-full bg-primary text-white py-4 sm:py-5 rounded-2xl font-black text-[16px] shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-blue-800 flex items-center justify-center gap-3">
              Soumettre ma candidature
              <span className="material-symbols-outlined">send</span>
            </button>
            <p className="text-center text-[12px] font-medium text-slate-400 mt-4">
              En soumettant cette candidature, vous acceptez nos conditions d'utilisation et notre politique de confidentialite.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
