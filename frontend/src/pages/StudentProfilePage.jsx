import StudentDashboardLayout from '../components/StudentDashboardLayout';

export default function StudentProfilePage() {
  return (
    <StudentDashboardLayout>
      {/* Hero Header Section */}
      <section className="mb-12 flex flex-col md:flex-row items-end justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-8 text-center sm:text-left">
          <div className="relative">
            <img
              className="w-40 h-40 rounded-3xl object-cover shadow-xl border-4 border-white"
              alt="Awa TraorÃ©"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG-R6Zhc_bpWtkMpLl5OGoqziwHa5L1YpWjeTXCF5lXgGJm1FS-ISArUttp-09xNlqALNKoyGpn0dBZ7kz41LjEXZZtsZg3hD6ie1kpVb4e88hAEY-oPVBKQA3PsouUHKS5BzXk9i-QedE4qZi_No1PQ6DXPsPOz5UVUeCLHlNXqeCkOzEJUD8DHda6Tfg4PW2n46sdThx0rX2HVcnxkcqH66hU85lJnXOsdSjDHvp-km6EhotqhdoOUFA_T5qEDosGdJS4EtRecdc"
            />
            <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2.5 rounded-xl shadow-lg hover:bg-blue-800 transition-colors">
              <span className="material-symbols-outlined !text-sm">edit</span>
            </button>
          </div>
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 block">Ã‰tudiant en Master II</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">Awa TraorÃ©</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined !text-sm">location_on</span>
                <span className="text-sm font-medium">Ouagadougou, Burkina Faso</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined !text-sm text-blue-500" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-sm font-medium text-blue-600">Profil VÃ©rifiÃ©</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-primary text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-800 transition-all hover:-translate-y-0.5">
            Modifier le profil
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person_outline</span>
              Ã€ propos de moi
            </h3>
            <p className="text-slate-600 leading-relaxed text-[15px] sm:text-[16px] mb-8">
              Ã‰tudiante passionnÃ©e par le dÃ©veloppement logiciel et l'intelligence artificielle. Actuellement en Master 2 Ã  l'UniversitÃ© Joseph Ki-Zerbo, je recherche un stage de fin d'Ã©tudes pour mettre mes compÃ©tences au service de l'innovation numÃ©rique au Burkina Faso.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 border-t border-slate-100 pt-8">
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Email</span>
                <p className="text-slate-900 font-semibold mt-1">awa.traore@email.bf</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">TÃ©lÃ©phone</span>
                <p className="text-slate-900 font-semibold mt-1">+226 70 00 00 00</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Langues</span>
                <p className="text-slate-900 font-semibold mt-1">FranÃ§ais (Natif), Anglais (B2), MoorÃ©</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">DisponibilitÃ©</span>
                <p className="text-slate-900 font-semibold mt-1">ImmÃ©diate (6 mois)</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">school</span>
                Parcours AcadÃ©mique
              </h3>
              <button className="text-primary hover:bg-blue-50 p-2 rounded-xl transition-colors">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>

            <div className="relative space-y-10 sm:space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-100">
              <div className="relative flex items-start pl-12">
                <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary ring-8 ring-white">
                  <span className="material-symbols-outlined !text-xl">workspace_premium</span>
                </div>
                <div className="flex-1 bg-slate-50 border border-slate-100/60 p-5 rounded-2xl">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <h4 className="text-lg font-bold text-slate-900">Master en Informatique (GÃ©nie Logiciel)</h4>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit">En cours</span>
                  </div>
                  <p className="text-blue-600 font-semibold mb-3 text-sm">UniversitÃ© Joseph Ki-Zerbo</p>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-4">SpÃ©cialisation dans les architectures microservices et le Cloud Computing. Major de promotion au premier semestre.</p>
                  <p className="text-slate-400 text-[11px] font-bold tracking-widest uppercase">2022 â€” PrÃ©sent</p>
                </div>
              </div>

              <div className="relative flex items-start pl-12">
                <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-8 ring-white">
                  <span className="material-symbols-outlined !text-xl">history_edu</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-[16px] font-bold text-slate-900 mb-1">Licence en Sciences Informatiques</h4>
                  <p className="text-blue-600 font-semibold mb-3 text-sm">ESI (Ã‰cole SupÃ©rieure d'Informatique)</p>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-3">Formation polyvalente en algorithmique, bases de donnÃ©es et rÃ©seaux. Projet de fin de cycle : Application mobile de gestion agricole.</p>
                  <p className="text-slate-400 text-[11px] font-bold tracking-widest uppercase">2019 â€” 2022</p>
                </div>
              </div>

              <div className="relative flex items-start pl-12">
                <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-8 ring-white">
                  <span className="material-symbols-outlined !text-xl">done_all</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-[16px] font-bold text-slate-900 mb-1">BaccalaurÃ©at SÃ©rie C</h4>
                  <p className="text-blue-600 font-semibold mb-2 text-sm">LycÃ©e Philippe Zinda KaborÃ©</p>
                  <p className="text-slate-400 text-[11px] font-bold tracking-widest uppercase">2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-primary p-8 rounded-[2rem] shadow-xl shadow-primary/20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">psychology</span>
                  CompÃ©tences
                </h3>
                <button className="text-white/60 hover:bg-white/10 p-2 rounded-xl transition-all">
                  <span className="material-symbols-outlined !text-xl">edit</span>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block mb-3">DÃ©veloppement</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">Java / Spring Boot</span>
                    <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">React.js</span>
                    <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">Python</span>
                    <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">Flutter</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block mb-3">Outils & Cloud</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">Docker</span>
                    <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">Git / GitHub</span>
                    <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">AWS Essentials</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block mb-3">Soft Skills</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">AgilitÃ© Scrum</span>
                    <span className="bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10">Travail en Ã©quipe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">folder_open</span>
              Mes Documents
            </h3>
            <div className="space-y-4">
              <div className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined !text-xl">picture_as_pdf</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Curriculum Vitae</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Mis Ã  jour hier</p>
                  </div>
                </div>
                <button className="text-slate-300 group-hover:text-primary group-hover:bg-blue-50 p-2 rounded-lg transition-colors">
                  <span className="material-symbols-outlined !text-[20px]">download</span>
                </button>
              </div>

              <div className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center">
                    <span className="material-symbols-outlined !text-xl">description</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Lettre de Motivation</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">PDF â€¢ 120 KB</p>
                  </div>
                </div>
                <button className="text-slate-300 group-hover:text-primary group-hover:bg-blue-50 p-2 rounded-lg transition-colors">
                  <span className="material-symbols-outlined !text-[20px]">visibility</span>
                </button>
              </div>

              <div className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center">
                    <span className="material-symbols-outlined !text-xl">military_tech</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Certificats & DiplÃ´mes</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">ZIP â€¢ 4.5 MB</p>
                  </div>
                </div>
                <button className="text-slate-300 group-hover:text-primary group-hover:bg-blue-50 p-2 rounded-lg transition-colors">
                  <span className="material-symbols-outlined !text-[20px]">download</span>
                </button>
              </div>
            </div>

            <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 text-[11px] font-bold uppercase tracking-widest hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all">
              + Ajouter un document
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-3xl shadow-sm border border-blue-100/50 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-center mb-4 relative z-10">
              <span className="text-sm font-bold text-slate-800">ComplÃ©tion du profil</span>
              <span className="text-primary font-black">85%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200/50 rounded-full overflow-hidden relative z-10">
              <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-[12px] text-slate-600 mt-4 leading-relaxed relative z-10">
              ComplÃ©tez vos <strong className="text-primary">rÃ©fÃ©rences professionnelles</strong> pour atteindre 100% et booster votre visibilitÃ© auprÃ¨s des recruteurs.
            </p>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}

