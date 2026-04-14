import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';
import api from '../services/api';
import { clearAuthSession, setAuthSession } from '../utils/authStorage';

export default function EnterpriseSettingsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    location: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    shortDescription: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [emailStatus, setEmailStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setProfile(response.data);
        const enterprise = response.data.enterpriseProfile || {};
        setFormData({
          email: response.data.email || '',
          companyName: enterprise.companyName || '',
          industry: enterprise.industry || '',
          companySize: enterprise.companySize || '',
          website: enterprise.website || '',
          location: enterprise.location || '',
          phoneNumber: enterprise.phoneNumber || '',
          address: enterprise.address || '',
          postalCode: enterprise.postalCode || '',
          shortDescription: enterprise.shortDescription || '',
        });
      } catch (error) {
        console.error('Failed to load enterprise profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus('');
    try {
      await api.patch('/users/profile', {
        companyName: formData.companyName,
        industry: formData.industry,
        companySize: formData.companySize,
        website: formData.website,
        location: formData.location,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        postalCode: formData.postalCode,
        shortDescription: formData.shortDescription,
      });
      const refreshed = await api.get('/users/profile');
      setProfile(refreshed.data);
      window.dispatchEvent(new CustomEvent('profile:updated', { detail: refreshed.data }));
      setStatus('Informations mises a jour.');
    } catch (error) {
      console.error('Failed to update enterprise profile:', error);
      setStatus('Erreur lors de la mise a jour.');
    } finally {
      setSaving(false);
    }
  };

  const handleEmailSave = async () => {
    setSaving(true);
    setEmailStatus('');
    try {
      const response = await api.post('/auth/change-email', { email: formData.email });
      setAuthSession(response.data.access_token, 'ENTERPRISE');
      setProfile((prev) => ({ ...prev, email: formData.email }));
      setEmailStatus('Email mis a jour.');
    } catch (error) {
      console.error('Failed to update email:', error);
      setEmailStatus('Erreur lors de la mise a jour de l email.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSave = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setPasswordStatus('Veuillez renseigner tous les champs.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus('Les mots de passe ne correspondent pas.');
      return;
    }

    setSaving(true);
    setPasswordStatus('');
    try {
      await api.post('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordStatus('Mot de passe mis a jour.');
    } catch (error) {
      console.error('Failed to update password:', error);
      setPasswordStatus('Erreur lors de la mise a jour du mot de passe.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogoChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    setStatus('');
    try {
      const payload = new FormData();
      payload.append('file', file);
      await api.post('/users/logo', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const refreshed = await api.get('/users/profile');
      setProfile(refreshed.data);
      window.dispatchEvent(new CustomEvent('profile:updated', { detail: refreshed.data }));
      setStatus('Logo mis a jour.');
    } catch (error) {
      console.error('Failed to upload logo:', error);
      setStatus('Erreur lors du chargement du logo.');
    } finally {
      setLogoUploading(false);
    }
  };

  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveFileUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };


  return (
    <EnterpriseDashboardLayout>
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Paramètres entreprise</h2>
            <p className="text-slate-500 text-sm font-medium">Gérez vos accès et la sécurité de votre compte.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Informations de connexion</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="email" value={formData.email} onChange={handleChange} />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Nom de l'entreprise" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="industry" value={formData.industry} onChange={handleChange} placeholder="Secteur" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="companySize" value={formData.companySize} onChange={handleChange} placeholder="Taille" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="website" value={formData.website} onChange={handleChange} placeholder="Site web" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="location" value={formData.location} onChange={handleChange} placeholder="Ville" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Telephone" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Code postal" />
            </div>
            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Logo entreprise</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all bg-white" type="file" accept="image/*" onChange={handleLogoChange} disabled={logoUploading} />
              {resolveFileUrl(profile?.enterpriseProfile?.logoUrl) && (
                <img src={resolveFileUrl(profile?.enterpriseProfile?.logoUrl)} alt="Logo" className="mt-3 h-20 w-full rounded-xl object-contain border border-slate-200 bg-white" />
              )}
            </div>
            <textarea className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="Description courte" rows={3}></textarea>
            {status && <p className="text-sm text-slate-500">{status}</p>}
            {emailStatus && <p className="text-sm text-slate-500">{emailStatus}</p>}
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3.5 rounded-xl bg-primary text-white text-[15px] font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all" onClick={handleSave} disabled={saving}>
                {saving ? 'Mise a jour...' : 'Mettre a jour'}
              </button>
              <button className="px-6 py-3.5 rounded-xl bg-slate-200 text-slate-700 text-[15px] font-bold shadow-lg shadow-slate-200/25 hover:bg-slate-300 transition-all" onClick={handleEmailSave} disabled={saving}>
                {saving ? 'Mise a jour...' : 'Mettre a jour l email'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Sécurité</h3>
            <input className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Mot de passe actuel" type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Nouveau mot de passe" type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
              <input className="rounded-xl border border-slate-200 px-4 py-3 text-[15px] font-medium outline-none focus:ring-4 focus:ring-primary/10 transition-all" placeholder="Confirmer le mot de passe" type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
            </div>
            {passwordStatus && <p className="text-sm text-slate-500">{passwordStatus}</p>}
            <button className="px-6 py-3.5 rounded-xl bg-primary text-white text-[15px] font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all" onClick={handlePasswordSave} disabled={saving}>
              {saving ? 'Mise a jour...' : 'Changer le mot de passe'}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Session</h3>
                <p className="text-sm text-slate-500 font-medium">Déconnectez-vous de l'espace entreprise en toute sécurité.</p>
              </div>
              <button
                className="px-6 py-3.5 rounded-xl bg-red-50 text-red-600 text-[15px] font-bold hover:bg-red-100 transition-all shrink-0 flex items-center gap-2"
                onClick={() => {
                  clearAuthSession();
                  navigate('/connexion');
                }}
              >
                <span className="material-symbols-outlined !text-[18px]">logout</span>
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </section>
    </EnterpriseDashboardLayout>
  );
}
