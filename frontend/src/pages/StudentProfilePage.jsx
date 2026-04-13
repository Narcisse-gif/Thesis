import { useEffect, useMemo, useState } from 'react';
import StudentDashboardLayout from '../components/StudentDashboardLayout';
import api from '../services/api';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [coverLetterUploading, setCoverLetterUploading] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [showAcademicForm, setShowAcademicForm] = useState(false);
  const [academicForm, setAcademicForm] = useState({
    studyLevel: '',
    university: '',
    fieldOfStudy: '',
    status: 'En cours',
  });
  const [deleteAcademicIndex, setDeleteAcademicIndex] = useState(null);
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
    studyLevel: '',
    fieldOfStudy: '',
    university: '',
    languages: '',
    availability: '',
    skills: '',
    cvUrl: '',
    coverLetterUrl: '',
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
          languages: response.data.studentProfile?.languages || '',
          availability: response.data.studentProfile?.availability || '',
          skills: Array.isArray(response.data.studentProfile?.skills) ? response.data.studentProfile.skills.join(', ') : '',
          cvUrl: response.data.studentProfile?.cvUrl || '',
          coverLetterUrl: response.data.studentProfile?.coverLetterUrl || '',
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
  const resolveFileUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };
  const avatarUrl = resolveAvatarUrl(profile?.avatarUrl);
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'ET';
  const studyLevel = student?.studyLevel || 'Niveau non renseigne';
  const location = student?.location || 'Localisation non renseignee';
  const email = profile?.email || 'Email non renseigne';
  const phone = student?.phoneNumber || 'Telephone non renseigne';
  const university = student?.university || 'Universite non renseignee';
  const fieldOfStudy = student?.fieldOfStudy || 'Domaine non renseigne';
  const skills = Array.isArray(student?.skills) ? student.skills : [];
  const languages = student?.languages || 'Non renseigne';
  const availability = student?.availability || 'Non renseignee';
  const academicEntries = Array.isArray(student?.academicEntries) ? student.academicEntries : [];
  const displayAcademicEntries = academicEntries.length > 0
    ? academicEntries
    : (student?.studyLevel || student?.university || student?.fieldOfStudy)
      ? [{
        studyLevel: student?.studyLevel || 'Niveau',
        university: student?.university || 'Universite',
        fieldOfStudy: student?.fieldOfStudy || 'Domaine',
        status: 'En cours',
      }]
      : [];
  const currentAcademic = displayAcademicEntries.find((entry) => entry.status === 'En cours') || displayAcademicEntries[0];
  const aboutField = currentAcademic?.fieldOfStudy || fieldOfStudy;
  const aboutUniversity = currentAcademic?.university || university;
  const aboutText = student
    ? `Etudiant en ${aboutField} a ${aboutUniversity}.`
    : 'Profil non charge.';

  const completion = useMemo(() => {
    const hasAcademic = displayAcademicEntries.length > 0 ? 'academic' : null;
    const fields = [
      student?.firstName,
      student?.lastName,
      hasAcademic,
      student?.location,
      student?.phoneNumber,
      profile?.avatarUrl,
      student?.skills?.length ? 'skills' : null,
      student?.cvUrl,
      student?.coverLetterUrl,
      student?.languages,
      student?.availability,
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

  const uploadDocument = async (endpoint, file, setUploading, fieldName, successMessage) => {
    setUploading(true);
    setStatus('');
    try {
      const payload = new FormData();
      payload.append('file', file);
      const response = await api.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updated = response.data;
      setProfile(updated);
      setFormData((prev) => ({ ...prev, [fieldName]: updated?.studentProfile?.[fieldName] || prev[fieldName] }));
      window.dispatchEvent(new CustomEvent('profile:updated', { detail: updated }));
      setStatus(successMessage);
    } catch (error) {
      console.error('Failed to upload document:', error);
      setStatus('Erreur lors du chargement du document.');
    } finally {
      setUploading(false);
    }
  };

  const handleCvFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadDocument('/users/cv', file, setCvUploading, 'cvUrl', 'CV mis a jour.');
  };

  const handleCoverLetterFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await uploadDocument('/users/cover-letter', file, setCoverLetterUploading, 'coverLetterUrl', 'Lettre de motivation mise a jour.');
  };

  const updateProfilePatch = async (patch, successMessage) => {
    setStatus('');
    try {
      await api.patch('/users/profile', patch);
      const refreshed = await api.get('/users/profile');
      setProfile(refreshed.data);
      setFormData((prev) => ({
        ...prev,
        studyLevel: refreshed.data.studentProfile?.studyLevel || prev.studyLevel,
        fieldOfStudy: refreshed.data.studentProfile?.fieldOfStudy || prev.fieldOfStudy,
        university: refreshed.data.studentProfile?.university || prev.university,
        skills: Array.isArray(refreshed.data.studentProfile?.skills) ? refreshed.data.studentProfile.skills.join(', ') : prev.skills,
        languages: refreshed.data.studentProfile?.languages || prev.languages,
        availability: refreshed.data.studentProfile?.availability || prev.availability,
      }));
      window.dispatchEvent(new CustomEvent('profile:updated', { detail: refreshed.data }));
      if (successMessage) setStatus(successMessage);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setStatus('Erreur lors de la mise a jour.');
    }
  };

  const handleOpenSkillForm = () => {
    setNewSkill('');
    setShowSkillForm(true);
  };

  const handleSubmitSkill = async (event) => {
    event.preventDefault();
    const cleaned = newSkill.trim();
    if (!cleaned) {
      setStatus('Veuillez saisir une competence.');
      return;
    }
    const currentSkills = Array.isArray(student?.skills) ? student.skills : [];
    const updatedSkills = [...new Set([...currentSkills, cleaned])];
    await updateProfilePatch({ skills: updatedSkills }, 'Competence ajoutee.');
    setShowSkillForm(false);
  };

  const handleOpenAcademicForm = () => {
    setAcademicForm({
      studyLevel: '',
      university: '',
      fieldOfStudy: '',
      status: 'En cours',
    });
    setShowAcademicForm(true);
  };

  const handleAcademicChange = (event) => {
    const { name, value } = event.target;
    setAcademicForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAcademic = async (event) => {
    event.preventDefault();
    const entry = {
      studyLevel: academicForm.studyLevel.trim(),
      university: academicForm.university.trim(),
      fieldOfStudy: academicForm.fieldOfStudy.trim(),
      status: academicForm.status,
    };
    if (!entry.studyLevel && !entry.university && !entry.fieldOfStudy) {
      setStatus('Veuillez saisir un parcours academique.');
      return;
    }
    const updatedEntries = [...displayAcademicEntries, entry];
    await updateProfilePatch(
      { academicEntries: updatedEntries },
      'Parcours academique mis a jour.',
    );
    setShowAcademicForm(false);
  };

  const handleDeleteAcademic = async (indexToRemove) => {
    setDeleteAcademicIndex(indexToRemove);
  };

  const handleConfirmDeleteAcademic = async () => {
    if (deleteAcademicIndex === null) return;
    const filtered = displayAcademicEntries.filter((_, index) => index !== deleteAcademicIndex);
    await updateProfilePatch({ academicEntries: filtered }, 'Parcours academique mis a jour.');
    setDeleteAcademicIndex(null);
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
        languages: formData.languages,
        availability: formData.availability,
        skills: formData.skills.split(',').map((item) => item.trim()).filter(Boolean),
        cvUrl: formData.cvUrl,
        coverLetterUrl: formData.coverLetterUrl,
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
            {avatarUrl ? (
              <img
                className="w-40 h-40 rounded-3xl object-cover shadow-xl border-4 border-white"
                alt={fullName}
                src={avatarUrl}
              />
            ) : (
              <div className="w-40 h-40 rounded-3xl shadow-xl border-4 border-white bg-slate-200 text-slate-600 flex items-center justify-center text-3xl font-bold">
                {initials}
              </div>
            )}
          </div>
          <div>
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Langues</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="languages" value={formData.languages} onChange={handleChange} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Disponibilite</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm" name="availability" value={formData.availability} onChange={handleChange} />
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">CV (fichier)</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white" type="file" accept=".pdf,.doc,.docx" onChange={handleCvFileChange} disabled={cvUploading} />
              {resolveFileUrl(formData.cvUrl) && (
                <a className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary" href={resolveFileUrl(formData.cvUrl)} target="_blank" rel="noreferrer">
                  Voir le CV charge
                </a>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Lettre de motivation (fichier)</label>
              <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white" type="file" accept=".pdf,.doc,.docx" onChange={handleCoverLetterFileChange} disabled={coverLetterUploading} />
              {resolveFileUrl(formData.coverLetterUrl) && (
                <a className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary" href={resolveFileUrl(formData.coverLetterUrl)} target="_blank" rel="noreferrer">
                  Voir la lettre chargee
                </a>
              )}
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
                <p className="text-slate-900 font-semibold mt-1">{languages}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Disponibilite</span>
                <p className="text-slate-900 font-semibold mt-1">{availability}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">school</span>
                Parcours Academique
              </h3>
              <button className="text-primary hover:bg-blue-50 p-2 rounded-xl transition-colors" onClick={handleOpenAcademicForm}>
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>

            {showAcademicForm && (
              <form className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5" onSubmit={handleSubmitAcademic}>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Niveau d'etude</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" name="studyLevel" value={academicForm.studyLevel} onChange={handleAcademicChange} />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Universite</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" name="university" value={academicForm.university} onChange={handleAcademicChange} />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Domaine d'etude</label>
                  <input className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" name="fieldOfStudy" value={academicForm.fieldOfStudy} onChange={handleAcademicChange} />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Statut</label>
                  <select className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" name="status" value={academicForm.status} onChange={handleAcademicChange}>
                    <option value="En cours">En cours</option>
                    <option value="Termine">Termine</option>
                    <option value="En pause">En pause</option>
                  </select>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white" type="submit">Enregistrer</button>
                  <button className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600" type="button" onClick={() => setShowAcademicForm(false)}>Annuler</button>
                </div>
              </form>
            )}

            {displayAcademicEntries.length > 0 ? (
              <div className="relative space-y-10 sm:space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-100">
                {displayAcademicEntries.map((entry, index) => (
                  <div key={`${entry.studyLevel}-${entry.university}-${index}`} className="relative flex items-start pl-12">
                    <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary ring-8 ring-white">
                      <span className="material-symbols-outlined !text-xl">workspace_premium</span>
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-100/60 p-5 rounded-2xl">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <h4 className="text-lg font-bold text-slate-900">{entry.studyLevel || 'Niveau'}</h4>
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit">{entry.status || 'En cours'}</span>
                          <button className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:bg-white" type="button" onClick={() => handleDeleteAcademic(index)}>
                            Supprimer
                          </button>
                        </div>
                      </div>
                      <p className="text-blue-600 font-semibold mb-3 text-sm">{entry.university || 'Universite'}</p>
                      <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{entry.fieldOfStudy || 'Domaine'}</p>
                    </div>
                  </div>
                ))}
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
                <button className="text-white/60 hover:bg-white/10 p-2 rounded-xl transition-all" onClick={handleOpenSkillForm}>
                  <span className="material-symbols-outlined !text-xl">add</span>
                </button>
              </div>

              <div className="space-y-6">
                {showSkillForm && (
                  <form className="rounded-2xl bg-white/10 p-4" onSubmit={handleSubmitSkill}>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Nouvelle competence</label>
                    <div className="mt-2 flex flex-wrap gap-3">
                      <input className="flex-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-blue-200" value={newSkill} onChange={(event) => setNewSkill(event.target.value)} placeholder="Ex: React, Excel..." />
                      <button className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-primary" type="submit">Ajouter</button>
                      <button className="rounded-xl border border-white/30 px-4 py-2 text-xs font-bold text-white" type="button" onClick={() => setShowSkillForm(false)}>Annuler</button>
                    </div>
                  </form>
                )}
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
                  href={resolveFileUrl(student.cvUrl)}
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
              ) : null}
              {student?.coverLetterUrl ? (
                <a
                  className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 cursor-pointer"
                  href={resolveFileUrl(student.coverLetterUrl)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <span className="material-symbols-outlined !text-xl">description</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Lettre de motivation</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Disponible</p>
                    </div>
                  </div>
                  <span className="text-slate-300 group-hover:text-primary group-hover:bg-blue-50 p-2 rounded-lg transition-colors">
                    <span className="material-symbols-outlined !text-[20px]">download</span>
                  </span>
                </a>
              ) : null}
              {!student?.cvUrl && !student?.coverLetterUrl ? (
                <p className="text-slate-500 text-sm">Aucun document ajoute.</p>
              ) : null}
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
              Completez votre profil pour atteindre 100% et booster votre visibilite aupres des recruteurs.
            </p>
          </div>
        </div>
      </div>

      {deleteAcademicIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <h4 className="text-lg font-bold text-slate-900">Supprimer ce parcours ?</h4>
            <p className="mt-2 text-sm text-slate-500">Cette action retirera l'entree selectionnee.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white" type="button" onClick={handleConfirmDeleteAcademic}>
                Supprimer
              </button>
              <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600" type="button" onClick={() => setDeleteAcademicIndex(null)}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </StudentDashboardLayout>
  );
}

