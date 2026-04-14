import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';
import api from '../services/api';

export default function EnterpriseStudentProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/applications/${id}/profile`);
        setProfile(response.data);
      } catch (err) {
        setError('Impossible de charger le profil etudiant.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);
  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveAssetUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };


  // Toujours définir les variables et hooks, même si loading ou erreur
  const student = profile?.studentProfile || profile?.student || {};
  const profileEmail = profile?.email || student?.user?.email || 'Email non renseigne';
  const fullName = [student?.firstName, student?.lastName].filter(Boolean).join(' ') || profileEmail || 'Candidat';
  const avatarUrl = resolveAssetUrl(profile?.avatarUrl || student?.user?.avatarUrl);
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'ET';
  const skills = Array.isArray(student?.skills) ? student.skills : [];
  const academicEntries = Array.isArray(student?.academicEntries) ? student.academicEntries : [];
  const cvUrl = resolveAssetUrl(student?.cvUrl);
  const coverLetterUrl = resolveAssetUrl(student?.coverLetterUrl);

  const academicSummary = useMemo(() => {
    if (academicEntries.length > 0) return academicEntries;
    if (student?.studyLevel || student?.university || student?.fieldOfStudy) {
      return [{
        studyLevel: student?.studyLevel || 'Niveau',
        university: student?.university || 'Universite',
        fieldOfStudy: student?.fieldOfStudy || 'Domaine',
        status: 'En cours',
      }];
    }
    return [];
  }, [academicEntries, student]);

  if (loading) {
    return (
      <EnterpriseDashboardLayout>
        <div className="text-center py-20 text-slate-500 font-bold">Chargement du profil...</div>
      </EnterpriseDashboardLayout>
    );
  }

  if (error || !profile) {
    return (
      <EnterpriseDashboardLayout>
        <div className="text-center py-20 text-rose-600 font-bold">{error || 'Profil introuvable.'}</div>
      </EnterpriseDashboardLayout>
    );
  }

    return (
      <EnterpriseDashboardLayout>
        <div className="max-w-6xl mx-auto py-8">
          <button
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-8"
            onClick={() => navigate('/entreprise/candidats')}
          >
            <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
            Retour aux candidatures
          </button>

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
                    <span className="text-sm font-medium">{student?.location || 'Localisation non renseignee'}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person_outline</span>
                  A propos de moi
                </h3>
                <p className="text-slate-600 leading-relaxed text-[15px] sm:text-[16px] mb-8">
                  {student ? `Etudiant en ${student?.fieldOfStudy || 'Domaine'} a ${student?.university || 'Universite'}.` : 'Profil non charge.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 border-t border-slate-100 pt-8">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Email</span>
                    <p className="text-slate-900 font-semibold mt-1">{profileEmail}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Telephone</span>
                    <p className="text-slate-900 font-semibold mt-1">{student?.phoneNumber || 'Telephone non renseigne'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Langues</span>
                    <p className="text-slate-900 font-semibold mt-1">{student?.languages || 'Non renseigne'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Disponibilite</span>
                    <p className="text-slate-900 font-semibold mt-1">{student?.availability || 'Non renseignee'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary">school</span>
                  Parcours Academique
                </h3>
                {academicSummary.length > 0 ? (
                  <div className="relative space-y-10 sm:space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-100">
                    {academicSummary.map((entry, index) => (
                      <div key={`${entry.studyLevel}-${entry.university}-${index}`} className="relative flex items-start pl-12">
                        <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary ring-8 ring-white">
                          <span className="material-symbols-outlined !text-xl">workspace_premium</span>
                        </div>
                        <div className="flex-1 bg-slate-50 border border-slate-100/60 p-5 rounded-2xl">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                            <h4 className="text-lg font-bold text-slate-900">{entry.studyLevel || 'Niveau'}</h4>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit">{entry.status || 'En cours'}</span>
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
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-8">
                    <span className="material-symbols-outlined">psychology</span>
                    Competences
                  </h3>
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
                  Documents
                </h3>
                <div className="space-y-4">
                  {student?.cvUrl ? (
                    <a
                      className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 cursor-pointer"
                      href={cvUrl}
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
                      href={coverLetterUrl}
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
            </div>
          </div>
        </div>
      </EnterpriseDashboardLayout>
    );
}
