import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';

export default function EnterpriseDashboardPage() {
  return (
    <EnterpriseDashboardLayout>
      {/* Welcome Section */}
      <section className="mb-10 text-center sm:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-2">Bonjour, Cina Burkina SA</h2>
        <p className="text-slate-500 text-[16px] sm:text-lg">Voici l'état actuel de vos recrutements à Ouagadougou.</p>
      </section>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        {/* Widget 1 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-primary">
              <span className="material-symbols-outlined !text-[24px]">assignment</span>
            </div>
            <span className="text-[12px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-lg">+12%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Offres actives</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">24</h3>
        </div>

        {/* Widget 2 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <span className="material-symbols-outlined !text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>group_add</span>
            </div>
            <span className="text-[12px] font-bold text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-lg">+5</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Candidatures reçues</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">148</h3>
        </div>

        {/* Widget 3 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 text-slate-700 rounded-xl">
              <span className="material-symbols-outlined !text-[24px]">calendar_today</span>
            </div>
            <span className="text-[12px] font-bold text-slate-700 bg-slate-50 border border-slate-200/50 px-2.5 py-1 rounded-lg">Aujourd'hui</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Entretiens prévus</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">8</h3>
        </div>

        {/* Widget 4 */}
        <div className="bg-white p-6 rounded-[1.25rem] shadow-sm border border-slate-100/50 hover:shadow-md transition-all hover:border-primary/20 duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">
              <span className="material-symbols-outlined !text-[24px]">archive</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Offres archivées</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1.5">56</h3>
        </div>

      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Candidatures Récentes Section */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[20px] font-bold text-slate-900">Candidatures Récentes</h3>
            <button className="text-[14px] font-semibold text-primary hover:text-blue-800 transition-colors">Voir tout</button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
            <div className="overflow-x-auto min-w-full">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Candidat</th>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Poste</th>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img className="w-10 h-10 rounded-full object-cover" alt="Awa Ouédraogo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMdaQs9jDUAf3Mob27C2S78sKPEkKONJoNB2dHciWUs5ELxuhAh4urNyjb-k6ktzVVZGdMWzQZl42WNXSayw2c4xK4q-4StP_mN6dSreflose_YPN7_wEHrVePDCzfBAxFM8_bMWTOsdM8UWRFItuTZ1uVx1xki-odsB6_0evlmFP_pg7dwIyzmEbaVp3amtncE0YCg5Ij42uNjhJ_Q0CCpj1OfA2GsItfgciEKYWS84J_ZkZjKSu-hB0KCsVXC3RfHDJreoC6UXYy" />
                        <div>
                          <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Awa Ouédraogo</p>
                          <p className="text-[12px] text-slate-500">Ouagadougou, BF</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[14px] text-slate-600 font-medium">Développeur Backend</td>
                    <td className="px-6 py-5 text-[14px] text-slate-500">Il y a 2h</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100/50 uppercase tracking-wider">Nouveau</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm shadow-transparent hover:shadow-slate-200/50 border border-transparent hover:border-slate-100">
                        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img className="w-10 h-10 rounded-full object-cover" alt="Moussa Traoré" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBAWamYdotB-CXEtU_Qvswed_FhAkaoO8drPxQ1FAXcPIf8ERDHULMVCxlVABQOGGjmCYz4VAEd80KlD9N1ENCIZ-Z4fqFglGLaRp0ggue17Jor1K_lGsclZg3f2JqKk62Td0cV8xqMzV5fU5Xp7OkeheG14RG3AicaZNCDP6jotERF0x6_D6Lh8Wbjs4CwOpD69qS1ZmeVCDVpyvLZulzv6WZNXiVNWtgLHcMBySZPG0pJ0A7lfLioFaom5UBL-mHE86M0fCB5l2A" />
                        <div>
                          <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Moussa Traoré</p>
                          <p className="text-[12px] text-slate-500">Bobo-Dioulasso, BF</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[14px] text-slate-600 font-medium">Design UX/UI</td>
                    <td className="px-6 py-5 text-[14px] text-slate-500">Hier</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100/50 uppercase tracking-wider">En revue</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm shadow-transparent hover:shadow-slate-200/50 border border-transparent hover:border-slate-100">
                        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img className="w-10 h-10 rounded-full object-cover" alt="Fatimata Sanogo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBAYusWfLTe7HtY9FA-b2cXgYONYVFK5N7p1hhgFlR15BLI-Wm0XLSwo5EjG0_X6BSGV8Lf5rpWm3r20OuXjkzhKv4nSLXXE_pukI8n_VDNqsspsmgo-I1lFF7N8QTtizi1NPx_4ykxOmNN-J3Gjcrmlexi_pd8zNx9gLfp4DjDrS_rZWEnztd70exg1j6alYljM_lXwPs1R0pssXL-cZVXTtjTPcgHugnQtomtoIn6C2j1lH2pWffCYSFDWpGxWjtIpGvHkSPb9MM" />
                        <div>
                          <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Fatimata Sanogo</p>
                          <p className="text-[12px] text-slate-500">Ouagadougou, BF</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[14px] text-slate-600 font-medium">Data Analyst</td>
                    <td className="px-6 py-5 text-[14px] text-slate-500">Il y a 3j</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-primary text-white uppercase tracking-wider">Entretien</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm shadow-transparent hover:shadow-slate-200/50 border border-transparent hover:border-slate-100">
                        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img className="w-10 h-10 rounded-full object-cover" alt="Jean-Paul Sawadogo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCQ1TUsfHBBIitBUIS2wrWArKVKhXqccGoG1FB9RAlU_R1xTNUnjKc6KhmKTLK7Rv8sENNHfcirPmhnJms-0YLBNWCYxPS86l_4_SVtOsfTPPvaX-3E3NgjXborML0TPRZ2tdsAHgoICJo7JvAag0wpOkrxQSYglvzlWo5Qt2Wtakx1ysUVSGKBMkMAQ4e5g7MwCspALMornfifgfhDTCeXkUBtaLP-L-PJC1XcY4zmKrGWAZAYu9Rxf7jd0zaAhCh9j4JU0v53l1Z" />
                        <div>
                          <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Jean-Paul Sawadogo</p>
                          <p className="text-[12px] text-slate-500">Koudougou, BF</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[14px] text-slate-600 font-medium">Chef de Projet IT</td>
                    <td className="px-6 py-5 text-[14px] text-slate-500">Il y a 1 sem</td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500 text-white uppercase tracking-wider">Accepté</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-primary shadow-sm shadow-transparent hover:shadow-slate-200/50 border border-transparent hover:border-slate-100">
                        <span className="material-symbols-outlined !text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mes Offres Actives Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[20px] font-bold text-slate-900">Mes Offres Actives</h3>
            <button className="p-2.5 flex items-center justify-center bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined !text-[20px]">add</span>
            </button>
          </div>
          
          <div className="space-y-4">
            
            {/* Offre Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-primary transition-colors">Développeur Backend (Node.js)</h4>
                  <p className="text-[12px] text-slate-500 mt-1">Publié il y a 5 jours • Stage de 6 mois</p>
                </div>
                <span className="p-2 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl">
                  <span className="material-symbols-outlined !text-[18px]">rocket</span>
                </span>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZZIf7i7FBnR4n_wZoFQTfLojBJG8_uEsNdV-LTUdrAEwnFNWoRxgb8fIqM74o3amhfCJzDWr77c8FTqhAygqCuUaIxWwajRmks_LfJPZJ0F708qnWip9fKpHZ0uikqrIOdf6hR2i4beI_1KAVVZXlJCq_XZQjX44Y_mlyEQXsu3LV1g5LBQhNJ6zpPMN3PA7TX9OPtD50On442P6FF1MNrl_QxdZ-uR4DnhFJszP1r2p-uVl6kMVtFprWiF7cXrH9cTRAiJn_rZJ" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL65T_Loqg8ZeyfT62d_6-H80msIG4wppIAL2iv4DBdvZcse_6IkphbgyY1DdXmNn81a7u4-6IYY0IV7dpl-DTQxqqK5LtOU9x6AxpuRQYtgbzXiBpIqGkkyqlAcamQVb07OZPY8vDWC4y0nugZ2IH6iM-z2KWzZbaLfB3gUYzyaZJuLGqRg2WbbAJ5kH3kwAZ7OfA6Icas0LUH-rI0kuB9-umEhAIX1oueSrHWKYHhs2QO1IPsQgansqDnV2GUB8X4ojQ-9xTIxN1" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+12</div>
                </div>
                <span className="text-[13px] font-semibold text-slate-600">15 candidatures</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 text-[13px] font-bold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all">Gérer l'offre</button>
                <button className="px-3.5 py-2.5 flex items-center justify-center rounded-xl bg-slate-50 text-[13px] font-bold border border-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all">
                  <span className="material-symbols-outlined !text-[18px]">share</span>
                </button>
              </div>
            </div>

            {/* Offre Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h4 className="font-bold text-slate-900 text-[16px] group-hover:text-primary transition-colors">Assistant Marketing Digital</h4>
                  <p className="text-[12px] text-slate-500 mt-1">Publié il y a 10 jours • Stage de 3 mois</p>
                </div>
                <span className="p-2 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl">
                  <span className="material-symbols-outlined !text-[18px]">rocket</span>
                </span>
              </div>
              <div className="flex items-center gap-4 mb-5">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Edy12oajXz-EEyONo6WuLYX6AA4lSMhqnyrmRgfJozKAG101A_5021-2DgpsBLVgvTQcqD4LkovGWfi0_4wfBV72K2EOEpySJjhfBgqnmYAzCLySqPwEWzeWh88Uga1ucvr0b6BEGH3yM6wcWPHDgJlFsCxDURHtIdF1wmMP14AP0Lg3GBg_W5rsfoqmRfCIhxioUeqyT-oYxUxUp3FGSgk10zZlvnSb-GHCyGbBacdPi-jEX1Z4NR68alZme2T4Kpmd1o4G8LOf" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">+8</div>
                </div>
                <span className="text-[13px] font-semibold text-slate-600">9 candidatures</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 text-[13px] font-bold text-primary bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all">Gérer l'offre</button>
                <button className="px-3.5 py-2.5 flex items-center justify-center rounded-xl bg-slate-50 text-[13px] font-bold border border-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all">
                  <span className="material-symbols-outlined !text-[18px]">share</span>
                </button>
              </div>
            </div>

            {/* CTA New Post */}
            <button className="w-full border-2 border-dashed border-slate-200 hover:border-primary/40 hover:bg-primary/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 group transition-all">
              <div className="p-4 bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-sm rounded-full text-slate-400 group-hover:text-primary transition-all">
                <span className="material-symbols-outlined !text-3xl">post_add</span>
              </div>
              <p className="text-[14px] font-bold text-slate-500 group-hover:text-primary">Publier une nouvelle offre</p>
            </button>

          </div>
        </div>

      </div>
    </EnterpriseDashboardLayout>
  );
}
