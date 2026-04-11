import { useEffect, useState } from 'react';
import StudentDashboardLayout from '../components/StudentDashboardLayout';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function StudentSettingsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    location: '',
    studyLevel: '',
    fieldOfStudy: '',
    university: '',
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setProfile(response.data);
        setFormData({
          email: response.data.email || '',
          phoneNumber: response.data.studentProfile?.phoneNumber || '',
          location: response.data.studentProfile?.location || '',
          studyLevel: response.data.studentProfile?.studyLevel || '',
          fieldOfStudy: response.data.studentProfile?.fieldOfStudy || '',
          university: response.data.studentProfile?.university || '',
        });
      } catch (error) {
        console.error('Failed to load profile:', error);
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
      await api.patch('/users/profile', formData);
      setStatus('Informations mises a jour.');
    } catch (error) {
      console.error('Failed to update profile:', error);
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
      localStorage.setItem('token', response.data.access_token);
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

  return (
    <StudentDashboardLayout>
      <section className="space-y-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Paramètres</h2>
          <p className="text-slate-500 text-sm">Gérez vos informations de connexion et la sécurité de votre compte.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Informations de connexion</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email de connexion</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Téléphone</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Ville</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Niveau d'etude</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="studyLevel" value={formData.studyLevel} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Domaine d'etude</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Universite</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="university" value={formData.university} onChange={handleChange} />
                </div>
              </div>
              {status && <p className="text-sm text-slate-500">{status}</p>}
              {emailStatus && <p className="text-sm text-slate-500">{emailStatus}</p>}
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-800 transition-all" onClick={handleSave} disabled={saving}>
                  {saving ? 'Mise a jour...' : 'Mettre a jour les informations'}
                </button>
                <button className="px-6 py-3 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-300 transition-all" onClick={handleEmailSave} disabled={saving}>
                  {saving ? 'Mise a jour...' : 'Mettre a jour l email'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Mot de passe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Mot de passe actuel" type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} />
                <input className="rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Nouveau mot de passe" type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
              </div>
              <input className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" placeholder="Confirmer le nouveau mot de passe" type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
              {passwordStatus && <p className="text-sm text-slate-500">{passwordStatus}</p>}
              <button className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all" onClick={handlePasswordSave} disabled={saving}>
                {saving ? 'Mise a jour...' : 'Modifier mon mot de passe'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Session</h3>
              <p className="text-sm text-slate-500 mt-2">Vous pouvez vous déconnecter de votre compte à tout moment.</p>
              <button
                className="mt-4 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-all"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user_role');
                  navigate('/connexion');
                }}
              >
                Se deconnecter
              </button>
            </div>
          </div>
        </div>
      </section>
    </StudentDashboardLayout>
  );
}