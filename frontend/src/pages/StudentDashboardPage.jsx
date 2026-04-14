import StudentDashboardLayout from '../components/StudentDashboardLayout';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import api from '../services/api';

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, rejected: 0 });
  const [applications, setApplications] = useState([]);
  const [offers, setOffers] = useState([]);
  const [profile, setProfile] = useState(null);
  const apiBaseUrl = api.defaults.baseURL || '';
  const resolveMediaUrl = (value) => {
    if (!value) return '';
    if (value.startsWith('http')) return value;
    if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
    return value;
  };

  useEffect(() => {
    api.get('/applications/my').then(res => {
      const apps = res.data;
      setApplications(apps.slice(0, 3));
      setStats({
        total: apps.length,
        pending: apps.filter(a => a.status === 'PENDING').length,
        accepted: apps.filter(a => a.status === 'ACCEPTED').length,
        rejected: apps.filter(a => a.status === 'REJECTED').length,
      });
    }).catch(console.error);

    api.get('/offers').then(res => {
      const active = res.data.filter((offer) => offer.status === 'ACTIVE');
      setOffers(active.slice(0, 2));
    }).catch(console.error);

    api.get('/users/profile').then(res => {
      setProfile(res.data);
    }).catch(console.error);
  }, []);

  const completion = useMemo(() => {
    const student = profile?.studentProfile;
    const hasAcademic = Array.isArray(student?.academicEntries) && student.academicEntries.length > 0
      ? 'academic'
      : (student?.studyLevel || student?.university || student?.fieldOfStudy)
        ? 'academic'
        : null;
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
  }, [profile]);

  return (
    <StudentDashboardLayout>
      {/* Stats Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50 flex items-center justify-between group hover:shadow-md transition-all duration-500">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Candidatures</p>
            <h3 className="text-4xl font-extrabold text-slate-900">{stats.total < 10 ? "0"+stats.total : stats.total}</h3>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary transition-all duration-300">
            <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: "'wght' 300" }}>send</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50 flex items-center justify-between group hover:shadow-md transition-all duration-500">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">En attente</p>
            <h3 className="text-4xl font-extrabold text-slate-900">{stats.pending < 10 ? "0"+stats.pending : stats.pending}</h3>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 transition-all duration-300">
            <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: "'wght' 300" }}>hourglass_empty</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50 flex items-center justify-between group hover:shadow-md transition-all duration-500">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Acceptées</p>
            <h3 className="text-4xl font-extrabold text-slate-900">{stats.accepted < 10 ? "0"+stats.accepted : stats.accepted}</h3>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-all duration-300">
            <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: "'wght' 300, 'FILL' 1" }}>verified</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50 flex items-center justify-between group hover:shadow-md transition-all duration-500">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Refusées</p>
            <h3 className="text-4xl font-extrabold text-slate-900">{stats.rejected < 10 ? "0"+stats.rejected : stats.rejected}</h3>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 transition-all duration-300">
            <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: "'wght' 300" }}>cancel</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Candidatures */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-slate-900">Candidatures en cours</h2>
              <span className="bg-primary/5 text-primary text-[10px] py-1.5 px-3.5 rounded-full font-bold tracking-widest">{stats.pending} ACTIVES</span>
            </div>
            <button className="text-[13px] font-bold text-primary hover:text-blue-700 transition-colors" onClick={() => navigate('/etudiant/candidatures')}>Tout voir</button>
          </div>
          
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-50 text-slate-500">
                Aucune candidature pour le moment.
              </div>
            ) : (
              applications.map((application) => {
                const offer = application.offer;
                const status = application.status || 'PENDING';
                const statusLabel = status === 'PENDING'
                  ? 'En attente'
                  : status === 'ACCEPTED'
                    ? 'Acceptee'
                    : 'Rejetee';
                const badgeColor = status === 'ACCEPTED'
                  ? 'bg-blue-50 text-primary border-blue-100/50'
                  : status === 'REJECTED'
                    ? 'bg-rose-50 text-rose-600 border-rose-100/50'
                    : 'bg-slate-50 text-slate-500 border-slate-200/40';
                const appliedAt = application.appliedAt
                  ? new Date(application.appliedAt).toLocaleDateString('fr-FR')
                  : 'Date inconnue';

                const offerDetailPath = offer?.contractType === 'STAGE' ? `/etudiant/stages/${offer?.id}` : `/etudiant/emplois/${offer?.id}`;

                return (
                  <div key={application.id} className="bg-white p-7 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-500 border border-slate-50 flex flex-col sm:flex-row items-start sm:items-center gap-4 group cursor-pointer" onClick={() => navigate(offerDetailPath)}>
                    <div className="h-16 w-16 rounded-2xl bg-slate-50 p-3 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-primary/20 transition-colors duration-500">
                      <img alt={offer?.enterprise?.companyName || 'Entreprise'} className="w-full h-full object-contain" src={resolveMediaUrl(offer?.enterprise?.logoUrl) || 'https://ui-avatars.com/api/?name=Entreprise&background=e0ecff&color=1d4ed8&bold=true'} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-primary transition-colors">{offer?.title || 'Offre'}</h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="text-[13px] text-slate-500 font-medium">{offer?.enterprise?.companyName || 'Entreprise'}</span>
                        <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="text-[13px] text-slate-400 font-medium">{offer?.location || 'Lieu non specifie'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-3">
                        <span className="material-symbols-outlined text-slate-400 !text-[14px]">event</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Postule le {appliedAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${badgeColor}`}>{statusLabel}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Progress & Recommendations */}
        <div className="lg:col-span-4 space-y-10">
          {/* Profile Progress */}
          <div className="bg-primary p-10 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-[18px] font-bold tracking-tight">Presque fini !</h3>
                <span className="material-symbols-outlined text-white/40 !text-xl">help</span>
              </div>
              <p className="text-[13px] text-blue-100/70 mb-10 leading-relaxed font-medium">Ton profil est complete a <span className="font-bold text-white">{completion}%</span>. Ajoute des informations pour te demarquer.</p>
              
              <div className="relative mb-10">
                <div className="overflow-hidden h-2 flex rounded-full bg-white/10">
                  <div className="bg-white rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: `${completion}%` }}>
                    {/* Shimmer effect simulation using tailwind classes */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                  <span className="text-white/60">Novice</span>
                  <span className="text-white">Expert</span>
                </div>
              </div>
              
              <button className="w-full bg-white text-primary font-bold py-4 rounded-2xl hover:bg-blue-50 transition-all active:scale-[0.98] text-[14px] shadow-lg shadow-black/5" onClick={() => navigate('/etudiant/profil')}>
                Completer mon profil
              </button>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[16px] font-bold text-slate-900">Pour vous</h2>
              <span className="material-symbols-outlined text-primary !text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            
            <div className="space-y-4">
              {offers.length === 0 ? (
                <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100/50 text-slate-500">
                  Aucune offre recente.
                </div>
              ) : (
                offers.map((offer) => {
                  const detailPath = offer.contractType === 'STAGE' ? `/etudiant/stages/${offer.id}` : `/etudiant/emplois/${offer.id}`;
                  return (
                    <div key={offer.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100/50 hover:border-primary/20 transition-all duration-300 group cursor-pointer" onClick={() => navigate(detailPath)}>
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                        <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform duration-500">
                          <img alt={offer.enterprise?.companyName || 'Entreprise'} className="w-full h-full object-contain" src={resolveMediaUrl(offer.enterprise?.logoUrl) || 'https://ui-avatars.com/api/?name=Entreprise&background=e0ecff&color=1d4ed8&bold=true'} />
                        </div>
                        <div className="flex-1 w-full">
                          <h4 className="font-bold text-[14px] text-slate-900 group-hover:text-primary transition-colors">{offer.title}</h4>
                          <p className="text-[12px] text-slate-500 font-medium">{offer.enterprise?.companyName || 'Entreprise'} - {offer.location || 'Lieu non specifie'}</p>
                          <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-slate-50">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(offer.createdAt).toLocaleDateString('fr-FR')}</span>
                            <div className="text-[12px] font-bold text-primary flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                              Voir l'offre
                              <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}

