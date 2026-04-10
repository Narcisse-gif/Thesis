import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

export default function EnterpriseDashboardProfilePage() {
  return (
    <EnterpriseDashboardLayout>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Profil Entreprise</h2>
            <p className="text-slate-500 text-sm font-medium">Aperçu public de votre entreprise tel que vu par les talents.</p>
          </div>
          <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all flex items-center gap-2 shrink-0">
            <span className="material-symbols-outlined !text-[18px]">edit</span>
            Modifier le profil
          </button>
        </div>

        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Main Company Card */}
          <article className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Banner Image */}
            <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-slate-100">
              <img alt="Corporate Building" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIHnjE4-Uo9pTSvdIyMVkwI65GS_1bz4NFknVby0DoqfFSeNWq1eRN_pDl7QuzQvkvXu4QbdnR0TCLAZ4Owj8ODKnqNxa701y65xT_4x1KeqzUHMUvuJW3ickYyCPtITugjYXnIilzR2VfV9gHO1ldxNXZESpIbpj4QMSgAASscs_2OnCJADx_4DQ-LYcPBCLErBEEBz55aZsrd6ECy0loI9U_LMVQECNIUgdms0xAw3o7nonVBbKeaX-U3TY-8A_KuJCj1wZe7RmV" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-black/10"></div>
            </div>
            
            {/* Card Content */}
            <div className="p-6 sm:p-10 md:p-12 space-y-12 relative">
              {/* Prominent Header */}
              <header className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 border-b border-slate-100 pb-10">
                <div className="h-28 w-28 rounded-2xl border border-slate-200 bg-white p-3 shadow-md flex-shrink-0 -mt-20 relative z-10 group hover:shadow-lg transition-all">
                  <img alt="Coris Bank Logo" className="w-full h-full object-contain group-hover:scale-105 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj2xFMs6eDjKMCKEpPTLS-pjpgSKACScinfp7LAHxtlg-UpiaLpc6SwnOJgZ-l307e8BmXv6GvKsHPuRnEMOxp4IMiNH81aBcjZ0Z4jsjwjnAsrXkqPNpRJuK7iPzrDIlJTL6t7bsnj4f-T3QhVW5ItP_1ZhAo6w6T9xKFMNG488GKiFXVJgSIBWLSe6e0goFF_gGZViijWQPebOnN-jd2X8wqXBwEXJt-vKsJesdLc_N2Tflb0BsqqeQeJE0WSYrWiMP6jv7tCjGp" />
                </div>
                
                <div className="text-center md:text-left space-y-3 flex-1">
                  <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Coris Bank International</h1>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 text-[14px]">
                      <span className="material-symbols-outlined text-primary !text-[20px]">corporate_fare</span>
                      Secteur Bancaire &amp; Finance
                    </span>
                    <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1.5 text-[14px]">
                      <span className="material-symbols-outlined text-primary !text-[20px]">location_on</span>
                      Ouagadougou, Burkina Faso
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
                  Ã€ propos de nous
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-4 text-[15px]">
                  <p>FondÃ© au Burkina Faso, <strong>Coris Bank International</strong> s'est imposÃ© comme un acteur majeur du paysage financier ouest-africain. Notre vision repose sur l'innovation constante et l'accompagnement personnalisÃ© des PME/PMI, des grandes entreprises et des particuliers.</p>
                  <p>Nous croyons fermement que le dÃ©veloppement Ã©conomique passe par une inclusion financiÃ¨re forte et des solutions adaptÃ©es aux rÃ©alitÃ©s locales.</p>
                </div>
              </section>

              {/* Core Values */}
              <section className="space-y-6">
                <h2 className="text-[12px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined !text-[18px]">diamond</span>
                  Valeurs Fondamentales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 transition-colors shadow-sm flex items-start gap-5 group cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0">
                      <span className="material-symbols-outlined">lightbulb</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[16px] text-slate-900 mb-1.5">Innovation</h3>
                      <p className="text-[14px] text-slate-500 leading-relaxed">Pionnier de la digitalisation bancaire, nous rÃ©inventons chaque jour les services de demain.</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500/30 transition-colors shadow-sm flex items-start gap-5 group cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                      <span className="material-symbols-outlined">handshake</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[16px] text-slate-900 mb-1.5">IntÃ©gritÃ©</h3>
                      <p className="text-[14px] text-slate-500 leading-relaxed">La confiance est le socle de notre relation client. Nous opÃ©rons avec une transparence absolue.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Key Information & Socials */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                <section className="md:col-span-2 space-y-6">
                  <h2 className="text-[12px] font-black uppercase tracking-widest text-primary">Informations ClÃ©s</h2>
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Taille de l'entreprise</p>
                      <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary !text-[18px]">groups</span>
                        1 000+ EmployÃ©s
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">FondÃ© en</p>
                      <p className="font-black text-[15px] text-slate-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary !text-[18px]">calendar_month</span>
                        2008
                      </p>
                    </div>
                    <div className="col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Site Web</p>
                      <a className="font-bold text-[15px] text-primary hover:text-blue-800 transition-colors flex items-center gap-2" href="#">
                        <span className="material-symbols-outlined !text-[18px]">language</span>
                        www.coris.bank
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </article>

          {/* Current Opportunities Section */}
          <section className="space-y-8 mt-16">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900">OpportunitÃ©s Actuelles</h2>
              <button className="text-primary font-bold text-[14px] flex items-center gap-1 hover:gap-2 transition-all">
                Tout voir <span className="material-symbols-outlined !text-[20px]">arrow_forward</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Card 1 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-5">
                  <span className="bg-amber-50 text-amber-600 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border border-amber-100/50">Finance</span>
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Il y a 2 j</span>
                </div>
                <h3 className="text-[18px] font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">Stagiaire Analyste CrÃ©dit</h3>
                <p className="text-slate-500 text-[13px] mt-2 mb-6 line-clamp-2 leading-relaxed">Rejoignez notre Ã©quipe d'analyse pour Ã©valuer les dossiers de financement PME dans un environnement dynamique...</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                    <span className="material-symbols-outlined !text-[16px]">schedule</span> 6 mois
                  </div>
                  <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-200">
                    <span className="material-symbols-outlined !text-[18px]">bookmark</span>
                  </button>
                </div>
              </div>

              {/* Job Card 2 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-5">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border border-blue-100/50">Tech</span>
                  <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Il y a 5 j</span>
                </div>
                <h3 className="text-[18px] font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">DÃ©veloppeur Fullstack (H/F)</h3>
                <p className="text-slate-500 text-[13px] mt-2 mb-6 line-clamp-2 leading-relaxed">Support au dÃ©veloppement de nouvelles fonctionnalitÃ©s pour notre plateforme digitale de banque en ligne...</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                  <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                    <span className="material-symbols-outlined !text-[16px]">schedule</span> CDI
                  </div>
                  <button className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-200">
                    <span className="material-symbols-outlined !text-[18px]">bookmark</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
    </EnterpriseDashboardLayout>
  );
}

