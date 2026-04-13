import { useEffect, useState } from 'react';
import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';
import api from '../services/api';

export default function EnterpriseDashboardProfilePage() {
  const [profile, setProfile] = useState(null);
  const [offers, setOffers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    shortDescription: '',
    location: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    bannerUrl: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        const enterprise = response.data.enterpriseProfile || {};
        setProfile(response.data);
        setFormData({
          companyName: enterprise.companyName || '',
          industry: enterprise.industry || '',
          companySize: enterprise.companySize || '',
          website: enterprise.website || '',
          shortDescription: enterprise.shortDescription || '',
          location: enterprise.location || '',
          phoneNumber: enterprise.phoneNumber || '',
          address: enterprise.address || '',
          postalCode: enterprise.postalCode || '',
          bannerUrl: enterprise.bannerUrl || '',
        });
      } catch (error) {
        console.error('Failed to load enterprise profile:', error);
      }
    };

    const fetchOffers = async () => {
      try {
        const response = await api.get('/offers/mine');
        setOffers(response.data);
      } catch (error) {
        console.error('Failed to load offers:', error);
      }
    };

    fetchProfile();
    fetchOffers();
  }, []);

  const enterprise = profile?.enterpriseProfile;
  const companyName = enterprise?.companyName || 'Entreprise';
  const industry = enterprise?.industry || 'Secteur non renseigne';
  const location = enterprise?.location || 'Localisation non renseignee';
  const phoneNumber = enterprise?.phoneNumber || 'Telephone non renseigne';
  const address = enterprise?.address || 'Adresse non renseignee';
  const postalCode = enterprise?.postalCode || 'Code postal non renseigne';
  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveFileUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };
  const logoUrl = resolveFileUrl(enterprise?.logoUrl);
  const bannerUrl = resolveFileUrl(enterprise?.bannerUrl);
  const initials = companyName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'ENT';
  const aboutText = enterprise?.shortDescription || 'Aucune description disponible.';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus('');
    try {
      await api.patch('/users/profile', formData);
      const refreshed = await api.get('/users/profile');
      setProfile(refreshed.data);
      window.dispatchEvent(new CustomEvent('profile:updated', { detail: refreshed.data }));
      setStatus('Profil mis a jour.');
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update enterprise profile:', error);
      setStatus('Erreur lors de la mise a jour.');
    } finally {
      setSaving(false);
    }
  };

  const handleBannerFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setBannerUploading(true);
    setStatus('');
    try {
      const payload = new FormData();
      payload.append('file', file);
      const response = await api.post('/users/banner', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updated = response.data;
      setProfile(updated);
      setFormData((prev) => ({ ...prev, bannerUrl: updated?.enterpriseProfile?.bannerUrl || prev.bannerUrl }));
      window.dispatchEvent(new CustomEvent('profile:updated', { detail: updated }));
      setStatus('Banniere mise a jour.');
    } catch (error) {
      console.error('Failed to upload banner:', error);
      setStatus('Erreur lors du chargement de la banniere.');
    } finally {
      setBannerUploading(false);
    }
  };

  const handleLogoFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    setStatus('');
    try {
      const payload = new FormData();
      payload.append('file', file);
      const response = await api.post('/users/logo', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updated = response.data;
      setProfile(updated);
      window.dispatchEvent(new CustomEvent('profile:updated', { detail: updated }));
      setStatus('Logo mis a jour.');
    } catch (error) {
      console.error('Failed to upload logo:', error);
      setStatus('Erreur lors du chargement du logo.');
    } finally {
      setLogoUploading(false);
    }
  };

  return (
    <EnterpriseDashboardLayout>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Profil Entreprise</h2>
            <p className="text-slate-500 text-sm font-medium">Aperçu public de votre entreprise tel que vu par les talents.</p>
          </div>
          <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all flex items-center gap-2 shrink-0" onClick={() => setEditMode((prev) => !prev)}>
            <span className="material-symbols-outlined !text-[18px]">edit</span>
            {editMode ? 'Annuler' : 'Modifier le profil'}
          </button>
        </div>

        {editMode && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4 max-w-5xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900">Edition du profil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Nom de l'entreprise" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="industry" value={formData.industry} onChange={handleChange} placeholder="Secteur" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="companySize" value={formData.companySize} onChange={handleChange} placeholder="Taille" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="website" value={formData.website} onChange={handleChange} placeholder="Site web" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="location" value={formData.location} onChange={handleChange} placeholder="Ville" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Telephone" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Code postal" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Banniere (fichier)</label>
                <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white" type="file" accept="image/*" onChange={handleBannerFileChange} disabled={bannerUploading} />
                {resolveFileUrl(formData.bannerUrl) && (
                  <img src={resolveFileUrl(formData.bannerUrl)} alt="Apercu" className="mt-3 h-20 w-full rounded-xl object-cover border border-slate-200" />
                )}
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Logo (fichier)</label>
                <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white" type="file" accept="image/*" onChange={handleLogoFileChange} disabled={logoUploading} />
                {logoUrl && (
                  <img src={logoUrl} alt="Logo" className="mt-3 h-20 w-full rounded-xl object-contain border border-slate-200 bg-white" />
                )}
              </div>
            </div>
            <textarea className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={4} placeholder="Description courte"></textarea>
            {status && <p className="text-sm text-slate-500">{status}</p>}
            <button className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-800 transition-all" onClick={handleSave} disabled={saving}>
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        )}

        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Main Company Card */}
          <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Banner Image */}
            <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-slate-100">
              {bannerUrl ? (
                <img alt="Banniere entreprise" className="w-full h-full object-cover" src={bannerUrl} />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-blue-100" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-black/10"></div>
            </div>
            
            {/* Card Content */}
            <div className="p-6 sm:p-10 md:p-12 space-y-12 relative">
              {/* Prominent Header */}
              <header className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 border-b border-slate-100 pb-10">
                <div className="h-28 w-28 rounded-2xl border border-slate-200 bg-white p-3 shadow-md flex-shrink-0 -mt-20 relative z-10 group hover:shadow-lg transition-all flex items-center justify-center">
                  {logoUrl ? (
                    <img alt={companyName} className="w-full h-full object-contain group-hover:scale-105 transition-transform" src={logoUrl} />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-2xl font-black">
                      {initials}
                    </div>
                  )}
                </div>
                
                <div className="text-center md:text-left space-y-3 flex-1">
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{companyName}</h1>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 text-[14px]">
                      <span className="material-symbols-outlined text-primary !text-[20px]">corporate_fare</span>
                      {industry}
                    </span>
                    <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1.5 text-[14px]">
                      <span className="material-symbols-outlined text-primary !text-[20px]">location_on</span>
                      {location}
                    </span>
                  </div>
                </div>
                
                <div className="flex w-full md:w-auto gap-3 pt-4 md:pt-0">
                  {/* Buttons Removed for the dashboard view */}
                </div>
              </header>

              {/* About Us Section */}
              <section className="space-y-4">
                <h2 className="text-[12px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined !text-[18px]">info</span>
                  A propos de nous
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-4 text-[15px]">
                  <p>{aboutText}</p>
                </div>
              </section>

              {/* Key Information & Socials */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                <section className="md:col-span-2 space-y-6">
                  <h2 className="text-[12px] font-black uppercase tracking-widest text-primary">Informations Cles</h2>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Taille de l'entreprise</p>
                      <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary !text-[18px]">groups</span>
                        {enterprise?.companySize || 'Non renseigne'}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Telephone</p>
                      <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary !text-[18px]">call</span>
                        {phoneNumber}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Adresse</p>
                      <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary !text-[18px]">home</span>
                        {address}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Code postal</p>
                      <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary !text-[18px]">markunread_mailbox</span>
                        {postalCode}
                      </p>
                    </div>
                    <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Site Web</p>
                      <a className="font-bold text-[15px] text-primary hover:text-blue-800 transition-colors flex items-center gap-2" href={enterprise?.website || '#'}>
                        <span className="material-symbols-outlined !text-[18px]">language</span>
                        {enterprise?.website || 'Non renseigne'}
                      </a>
                    </div>
                    {enterprise?.cvUrl && (
                      <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Document entreprise</p>
                        <a className="font-bold text-[15px] text-primary hover:text-blue-800 transition-colors flex items-center gap-2" href={resolveFileUrl(enterprise.cvUrl)} target="_blank" rel="noreferrer">
                          <span className="material-symbols-outlined !text-[18px]">download</span>
                          Telecharger le document
                        </a>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </article>

          {/* Current Opportunities Section */}
          <section className="space-y-8 mt-16">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900">Opportunites actuelles</h2>
              <button className="text-primary font-bold text-[14px] flex items-center gap-1 hover:gap-2 transition-all">
                Tout voir <span className="material-symbols-outlined !text-[20px]">arrow_forward</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offers.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-slate-500">
                  Aucune offre publiee pour le moment.
                </div>
              ) : (
                offers.slice(0, 2).map((offer) => (
                  <div key={offer.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-5">
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border border-blue-100/50">
                        {offer.contractType === 'STAGE' ? 'Stage' : offer.contractType}
                      </span>
                      <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                        {new Date(offer.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <h3 className="text-[18px] font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{offer.title}</h3>
                    <p className="text-slate-500 text-[13px] mt-2 mb-6 line-clamp-2 leading-relaxed">{offer.description}</p>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                      <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                        <span className="material-symbols-outlined !text-[16px]">location_on</span> {offer.location}
                      </div>
                      <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-200">
                        <span className="material-symbols-outlined !text-[18px]">bookmark</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
    </EnterpriseDashboardLayout>
  );
}

