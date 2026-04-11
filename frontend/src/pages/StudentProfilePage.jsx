import { useEffect, useMemo, useState } from 'react';
import StudentDashboardLayout from '../components/StudentDashboardLayout';
import api from '../services/api';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
    studyLevel: '',
    fieldOfStudy: '',
    university: '',
    skills: '',
    cvUrl: '',
    avatarUrl: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setProfile(response.data);
        setFormData({
          firstName: response.data.studentProfile?.firstName || '',
          lastName: response.data.studentProfile?.lastName || '',
          phoneNumber: response.data.studentProfile?.phoneNumber || '',
          location: response.data.studentProfile?.location || '',
          studyLevel: response.data.studentProfile?.studyLevel || '',
          fieldOfStudy: response.data.studentProfile?.fieldOfStudy || '',
          university: response.data.studentProfile?.university || '',
          skills: Array.isArray(response.data.studentProfile?.skills) ? response.data.studentProfile.skills.join(', ') : '',
          cvUrl: response.data.studentProfile?.cvUrl || '',
          avatarUrl: response.data.avatarUrl || '',
        });
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const student = profile?.studentProfile;
  const fullName = [student?.firstName, student?.lastName].filter(Boolean).join(' ') || profile?.email || 'Profil';
  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveAvatarUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };
  const resolvedAvatarUrl = resolveAvatarUrl(profile?.avatarUrl);
  const avatarUrl = resolvedAvatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG-R6Zhc_bpWtkMpLl5OGoqziwHa5L1YpWjeTXCF5lXgGJm1FS-ISArUttp-09xNlqALNKoyGpn0dBZ7kz41LjEXZZtsZg3hD6ie1kpVb4e88hAEY-oPVBKQA3PsouUHKS5BzXk9i-QedE4qZi_No1PQ6DXPsPOz5UVUeCLHlNXqeCkOzEJUD8DHda6Tfg4PW2n46sdThx0rX2HVcnxkcqH66hU85lJnXOsdSjDHvp-km6EhotqhdoOUFA_T5qEDosGdJS4EtRecdc';
  const studyLevel = student?.studyLevel || 'Niveau non renseigne';
  const location = student?.location || 'Localisation non renseignee';
  const email = profile?.email || 'Email non renseigne';
  const phone = student?.phoneNumber || 'Telephone non renseigne';
  const university = student?.university || 'Universite non renseignee';
  const fieldOfStudy = student?.fieldOfStudy || 'Domaine non renseigne';
  const skills = Array.isArray(student?.skills) ? student.skills : [];
  const aboutText = student ? `Etudiant en ${fieldOfStudy} a ${university}.` : 'Profil non charge.';

  const completion = useMemo(() => {
    const fields = [
      student?.firstName,
      student?.lastName,
      student?.university,
      student?.fieldOfStudy,
      student?.studyLevel,
      student?.location,
      student?.phoneNumber,
      profile?.avatarUrl,
      student?.skills?.length ? 'skills' : null,
      student?.cvUrl,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }, [profile, student]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAvatarUploading(true);
    setStatus('');
    try {
      const payload = new FormData();
      payload.append('file', file);
      const response = await api.post('/users/avatar', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updated = response.data;
      setProfile(updated);
      setFormData((prev) => ({ ...prev, avatarUrl: updated?.avatarUrl || prev.avatarUrl }));
      window.dispatchEvent(new CustomEvent('profile:updated', { detail: updated }));
      setStatus('Avatar mis a jour.');
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      setStatus('Erreur lors du chargement de l\'avatar.');
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus('');
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        location: formData.location,
        studyLevel: formData.studyLevel,
        fieldOfStudy: formData.fieldOfStudy,
        university: formData.university,
        skills: formData.skills.split(',').map((item) => item.trim()).filter(Boolean),
        cvUrl: formData.cvUrl,
        avatarUrl: formData.avatarUrl,
      };
      await api.patch('/users/profile', payload);
      const refreshed = await api.get('/users/profile');
      setProfile(refreshed.data);
      setStatus('Profil mis a jour.');
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setStatus('Erreur lors de la mise a jour.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <StudentDashboardLayout>
      {loading && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 text-slate-500">Chargement du profil...</div>
      )}
      {/* Hero Header Section */}
      <section className="mb-12 flex flex-col md:flex-row items-end justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-8 text-center sm:text-left">
          <div className="relative">
            <img
              className="w-40 h-40 rounded-3xl object-cover shadow-xl border-4 border-white"
              alt={fullName}
              src={avatarUrl}
            />
          </div>
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 block">Etudiant en {studyLevel}</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">{fullName}</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined !text-sm">location_on</span>
                <span className="text-sm font-medium">{location}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined !text-sm text-blue-500" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-sm font-medium text-blue-600">Profil verifie</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-primary text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-800 transition-all hover:-translate-y-0.5" onClick={() => setEditMode((prev) => !prev)}>
            {editMode ? 'Annuler' : 'Modifier le profil'}
          </button>
        </div>
      </section>

      {editMode && (
        <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Edition du profil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Prenom</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nom</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Telephone</label>
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
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Avatar URL</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Avatar (fichier)</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white" type="file" accept="image/*" onChange={handleAvatarFileChange} disabled={avatarUploading} />
              {resolveAvatarUrl(formData.avatarUrl) && (
                <img src={resolveAvatarUrl(formData.avatarUrl)} alt="Apercu" className="mt-3 h-16 w-16 rounded-xl object-cover border border-slate-200" />
              )}
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Competences (separees par virgule)</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="skills" value={formData.skills} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Lien CV</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="cvUrl" value={formData.cvUrl} onChange={handleChange} />
            </div>
          </div>
          {status && <p className="text-sm text-slate-500 mt-4">{status}</p>}
          <button className="mt-6 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-800 transition-all" onClick={handleSave} disabled={saving}>
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person_outline</span>
              A propos de moi
            </h3>
            <p className="text-slate-600 leading-relaxed text-[15px] sm:text-[16px] mb-8">
              {aboutText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 border-t border-slate-100 pt-8">
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Email</span>
                <p className="text-slate-900 font-semibold mt-1">{email}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Telephone</span>
                <p className="text-slate-900 font-semibold mt-1">{phone}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Langues</span>
                <p className="text-slate-900 font-semibold mt-1">Non renseigne</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Disponibilite</span>
                <p className="text-slate-900 font-semibold mt-1">Non renseignee</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">school</span>
                Parcours Academique
              </h3>
              <button className="text-primary hover:bg-blue-50 p-2 rounded-xl transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>

            {student?.studyLevel || student?.university ? (
              <div className="relative space-y-10 sm:space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-100">
                <div className="relative flex items-start pl-12">
                  <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary ring-8 ring-white">
                    <span className="material-symbols-outlined !text-xl">workspace_premium</span>
                  </div>
                  <div className="flex-1 bg-slate-50 border border-slate-100/60 p-5 rounded-2xl">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <h4 className="text-lg font-bold text-slate-900">{studyLevel}</h4>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit">En cours</span>
                    </div>
                    <p className="text-blue-600 font-semibold mb-3 text-sm">{university}</p>
                    <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{fieldOfStudy}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Aucun parcours enregistre.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-primary p-8 rounded-[2rem] shadow-xl shadow-primary/20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">psychology</span>
                  Competences
                </h3>
                <button className="text-white/60 hover:bg-white/10 p-2 rounded-xl transition-all">
                  <span className="material-symbols-outlined !text-xl">edit</span>
                </button>
              </div>

              <div className="space-y-6">
                {skills.length > 0 ? (
                  <div>
                    <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block mb-3">Competences</span>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span key={skill} className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">{skill}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-blue-100 text-sm">Aucune competence enregistree.</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">folder_open</span>
              Mes Documents
            </h3>
            <div className="space-y-4">
              {student?.cvUrl ? (
                <a
                  className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 cursor-pointer"
                  href={student.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <span className="material-symbols-outlined !text-xl">picture_as_pdf</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Curriculum Vitae</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Disponible</p>
                    </div>
                  </div>
                  <span className="text-slate-300 group-hover:text-primary group-hover:bg-blue-50 p-2 rounded-lg transition-colors">
                    <span className="material-symbols-outlined !text-[20px]">download</span>
                  </span>
                </a>
              ) : (
                <p className="text-slate-500 text-sm">Aucun document ajoute.</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl shadow-sm border border-blue-100/50 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-center mb-4 relative z-10">
              <span className="text-sm font-bold text-slate-800">Completion du profil</span>
              <span className="text-primary font-black">{completion}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200/50 rounded-full overflow-hidden relative z-10">
              <div className="h-full bg-primary rounded-full" style={{ width: `${completion}%` }}></div>
            </div>
            <p className="text-[12px] text-slate-600 mt-4 leading-relaxed relative z-10">
              ComplÃ©tez votre profil pour atteindre 100% et booster votre visibilitÃ© auprÃ¨s des recruteurs.
            </p>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}

