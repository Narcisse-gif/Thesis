import StudentDashboardLayout from '../components/StudentDashboardLayout';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  return (
    <StudentDashboardLayout>
      {/* Stats Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50 flex items-center justify-between group hover:shadow-md transition-all duration-500">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Candidatures</p>
            <h3 className="text-4xl font-extrabold text-slate-900">12</h3>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-primary transition-all duration-300">
            <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: "'wght' 300" }}>send</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50 flex items-center justify-between group hover:shadow-md transition-all duration-500">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">En attente</p>
            <h3 className="text-4xl font-extrabold text-slate-900">05</h3>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 transition-all duration-300">
            <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: "'wght' 300" }}>hourglass_empty</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50 flex items-center justify-between group hover:shadow-md transition-all duration-500">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Acceptées</p>
            <h3 className="text-4xl font-extrabold text-slate-900">02</h3>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-all duration-300">
            <span className="material-symbols-outlined !text-2xl" style={{ fontVariationSettings: "'wght' 300, 'FILL' 1" }}>verified</span>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100/50 flex items-center justify-between group hover:shadow-md transition-all duration-500">
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">Refusées</p>
            <h3 className="text-4xl font-extrabold text-slate-900">03</h3>
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
              <span className="bg-primary/5 text-primary text-[10px] py-1.5 px-3.5 rounded-full font-bold tracking-widest">3 ACTIVES</span>
            </div>
            <button className="text-[13px] font-bold text-primary hover:text-blue-700 transition-colors" onClick={() => navigate('/etudiant/candidatures')}>Tout voir</button>
          </div>
          
          <div className="space-y-4">
            {/* Job Card 1 */}
            <div className="bg-white p-7 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-500 border border-slate-50 flex flex-col sm:flex-row items-start sm:items-center gap-4 group cursor-pointer">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 p-3 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-primary/20 transition-colors duration-500">
                <img alt="Orange" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzQFQ3MVuViO1GCsXkSY4V4Mf7C6unAifZZ2JQ5O5bLXINVIRVVNHAvd-Dzy3cptvzRgBtvxpeUVC4Ut1Wqb1JNfio7ciwr_pq3VN5rQFZN2xaiGQLyVrfLRUuhE-C9XkDp0kUYTVkbNzAVTCQvyQ7T51iyESlDSmz_mwnDK_h8YOYQ7wlZXjFb3HDPzncHILft5N62OZZyqNHSYUBP5lDqWxRwS4FbJqj0E1ZxVaqRaTYes-v-A7f2cjkbYo5TdgAcXGKrTBX8mN-" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-primary transition-colors">D├®veloppeur Full-stack</h4>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-[13px] text-slate-500 font-medium">Orange Burkina</span>
                  <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-[13px] text-slate-400 font-medium">Ouagadougou</span>
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="material-symbols-outlined text-slate-400 !text-[14px]">event</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Postul├® le 12 Oct.</span>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-primary text-[10px] font-bold uppercase tracking-widest border border-blue-100/50">Entretien</span>
                <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className="bg-white p-7 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-500 border border-slate-50 flex flex-col sm:flex-row items-start sm:items-center gap-4 group cursor-pointer">
              <div className="h-16 w-16 rounded-2xl bg-slate-50 p-3 flex items-center justify-center shrink-0 border border-slate-100 group-hover:border-primary/20 transition-colors duration-500">
                <img alt="Coris" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyhNLKSLEXs_zRybNPmVvoRpGyMTf_amlkhNMWw0oljHw25srKuqFlstIvGF8oDH68ZGRG7sWhNXTXX3e7XrpNL_MJCllacyp34L2Krat9n9cS_WWgEktgpG0lRI96V1xkzhnFLQb7t79EgY_nHxr-qyvQ1Yv3tGz5Arj6Z4TXVImmFwvqY-A9HwxdgPNypC0QUQgskKOvia4AtGRJM9VnppFx9J5mJKdu2mThmP40O3FQnx6lgkF_8sUeD8laF2HoHXOb-8TkvXc_" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-primary transition-colors">Analyste Financier Junior</h4>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <span className="text-[13px] text-slate-500 font-medium">Coris Bank</span>
                  <span className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-[13px] text-slate-400 font-medium">Bobo-Dioulasso</span>
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="material-symbols-outlined text-slate-400 !text-[14px]">event</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Postul├® le 05 Oct.</span>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                <span className="px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-200/40">En cours</span>
                <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
            </div>

            {/* Job Card 3 (Expired) */}
            <div className="bg-slate-50/40 p-7 rounded-[2rem] border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 opacity-70 grayscale">
              <div className="h-16 w-16 rounded-2xl bg-slate-100/50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-slate-400 !text-2xl">business</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-500 text-[16px]">Marketing Digital</h4>
                <p className="text-[13px] text-slate-400 font-medium mt-1">Digital Agency ÔÇó Ouagadougou</p>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0">
                <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Expir├®</span>
                <button className="p-2 text-slate-200">
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>
            </div>
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
              <p className="text-[13px] text-blue-100/70 mb-10 leading-relaxed font-medium">Ton profil est compl├®t├® ├á <span className="font-bold text-white">85%</span>. Ajoute une certification pour te d├®marquer.</p>
              
              <div className="relative mb-10">
                <div className="overflow-hidden h-2 flex rounded-full bg-white/10">
                  <div className="bg-white rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: '85%' }}>
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
                Compl├®ter mon profil
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
              {/* Recommendation 1 */}
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100/50 hover:border-primary/20 transition-all duration-300 group cursor-pointer" onClick={() => navigate('/emplois/1')}>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <img alt="Moov" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQK1UykHeauswjuQ95yZURUFBZI1JXsZWYZ1lhPGOB_4Hfzlse7GosvXeYBmjqzsD3HNuxQagWPeSZyFzkMptt_8firAEszIv_uOtOh6YQ_waDy8ZywWKTMXX1wCzOdwT6Y7gO9sZY1WZSvTxwHJhNCXbUco95zv_Kj5rmPIWtrSihRk4xOFiHScUIhc8OgswFhxAvW7YEoS6NcVn3LFBXEK7LV-U-0_TG5ufm_324poKT3TJolBWP_uf9UKZdV0vVg1_jGpN493S6" />
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="font-bold text-[14px] text-slate-900 group-hover:text-primary transition-colors">Ing├®nieur R├®seaux</h4>
                    <p className="text-[12px] text-slate-500 font-medium">Moov Africa ÔÇó Ouaga</p>
                    <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Il y a 2j</span>
                      <div className="text-[12px] font-bold text-primary flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Voir l'offre
                        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation 2 */}
              <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100/50 hover:border-primary/20 transition-all duration-300 group cursor-pointer" onClick={() => navigate('/emplois/1')}>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <img alt="SONABEL" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVOE6JpfiHtP57rCG1WBYcXFUg_MKNtojXxuLowbjkfIPZ6M2BHqeHEXfB8-LkJyYmunWNse1kBEIyMEMxBUUJY4qnqcuLQNP1HCFP305jtSKQ5EH2AqEKPm0uoQ-8_UGdQXustaAlJ0E2XMPnNWNcXfnhLlFfWoEzWMbvLEkck3J8kRVWaVzC90FIneXt04JBAfCyMeIXEZS95fmdi-OuNuMQ6QMT4SRZFDcndxR9E9ouWji3FUBzQ_pwJ5Pjs9cBaM--tJ2BsEk3" />
                  </div>
                  <div className="flex-1 w-full">
                    <h4 className="font-bold text-[14px] text-slate-900 group-hover:text-primary transition-colors">Tech Maintenance</h4>
                    <p className="text-[12px] text-slate-500 font-medium">SONABEL ÔÇó Koudougou</p>
                    <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-slate-50">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">Nouveau</span>
                      <div className="text-[12px] font-bold text-primary flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        Voir l'offre
                        <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
