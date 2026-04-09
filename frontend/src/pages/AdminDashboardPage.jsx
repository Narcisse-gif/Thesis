import AdminDashboardLayout from '../components/AdminDashboardLayout';

export default function AdminDashboardPage() {
  return (
    <AdminDashboardLayout>
      {/* Dashboard Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">System Overview</h2>
          <p className="text-slate-500 mt-1.5 text-[15px]">Platform performance and activity metrics for <span className="text-primary font-bold">StageLink Burkina</span>.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white text-slate-700 text-[13px] border border-slate-200 font-bold rounded-xl flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined !text-[18px]">calendar_today</span>
            Last 30 Days
          </button>
          <button className="px-4 py-2 bg-primary text-white text-[13px] font-bold rounded-xl flex items-center gap-2 shadow-sm shadow-primary/20 hover:bg-blue-800 transition-colors">
            <span className="material-symbols-outlined !text-[18px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                <span className="material-symbols-outlined">person</span>
              </div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/50">+12.5%</span>
            </div>
            <p className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-1.5">Total Users</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">12,482</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
                <span className="material-symbols-outlined">apartment</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100/50">+8.2%</span>
            </div>
            <p className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-1.5">Companies</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">846</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center border border-amber-100">
                <span className="material-symbols-outlined">rocket_launch</span>
              </div>
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100/50">+24.1%</span>
            </div>
            <p className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-1.5">Active Offers</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">2,194</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center border border-purple-100">
                <span className="material-symbols-outlined">trending_up</span>
              </div>
              <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100/50">+4.3%</span>
            </div>
            <p className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-1.5">Growth Rate</p>
            <h3 className="text-[28px] leading-none font-bold text-slate-900">18.7%</h3>
          </div>
        </div>

      </div>

      {/* Charts and Main Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
            <div>
              <h4 className="text-[18px] font-bold text-slate-900">User &amp; Offer Growth</h4>
              <p className="text-[13px] font-medium text-slate-500 mt-1">Monthly trend analysis for the current year</p>
            </div>
            <div className="flex gap-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary shadow-sm"></span>
                <span className="text-[12px] font-bold text-slate-600">Users</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-300 shadow-sm"></span>
                <span className="text-[12px] font-bold text-slate-600">Offers</span>
              </div>
            </div>
          </div>
          
          {/* Mock Chart Area */}
          <div className="relative flex-1 min-h-[250px] w-full mt-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden group">
             {/* Decorative Grid Lines */}
             <div className="absolute inset-0 flex flex-col justify-between py-6 opacity-50">
                <div className="w-full h-px bg-slate-200"></div>
                <div className="w-full h-px bg-slate-200"></div>
                <div className="w-full h-px bg-slate-200"></div>
                <div className="w-full h-px bg-slate-200"></div>
             </div>
             {/* Fake Line Chart Representation using SVG */}
             <svg className="w-full h-full absolute inset-0 text-primary drop-shadow-xl" preserveAspectRatio="none" viewBox="0 0 800 300">
               <defs>
                 <linearGradient id="userGrad" x1="0" x2="0" y1="0" y2="1">
                   <stop offset="0%" stopColor="#1e40af" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
                 </linearGradient>
               </defs>
               <path d="M0,250 Q100,220 200,180 T400,140 T600,100 T800,60 L800,300 L0,300 Z" fill="url(#userGrad)" />
               <path d="M0,250 Q100,220 200,180 T400,140 T600,100 T800,60" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
               <path d="M0,280 Q100,260 200,230 T400,200 T600,160 T800,120" fill="none" stroke="#93c5fd" strokeDasharray="8 6" strokeLinecap="round" strokeWidth="4" />
             </svg>
             <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">
                <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
             </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col max-h-[450px]">
          <h4 className="text-[18px] font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400">history</span>
            Recent Activity
          </h4>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            
            {/* Activity Item */}
            <div className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 group-hover:border-primary/50 transition-colors">
                <img alt="Company" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJbvL4YccplYBX8TX3rPtdkHdbLio81xSJyIXFxPKmon2_vVyeMbG4gfen-F6y74iAcwgu0sICszmB0xpJgcaFU0N7UrPFUruG6nw4KDfWYa1uDifAGClUV9sdZT7BhzhaWg1rLE8t2PeKkOM-iTHs9NMEsuYJIXdsBd9Z5yPKroD-edqgk60Czhk79csgq_i6LOS_Wic-qNJKtMkueb7JtxN-Q52e6moVVkUlktdAzdTjRYVJ4fCX3VZhnY4J-e_VrKmSJt9P7_Ym" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">TechSolutions SARL</p>
                <p className="text-[13px] text-slate-500 font-medium leading-tight mt-1">Submitted 3 new internship offers for moderation.</p>
                <span className="text-[10px] font-black tracking-widest text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md mt-2 inline-block">PENDING</span>
              </div>
            </div>

            {/* Activity Item */}
            <div className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 group-hover:border-primary/50 transition-colors">
                <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgESvMY-v_4Rt43ZAfVwE5eyu9EDcNn1SRMG5gubaZb--MwzhwKe40H7rTHijWqK6MLxcRKbbX9fwElIfJHU2gyaolrVRL7VQpOkvAIz4jjg2rw7z8YkTfuYY8vqVTsskjUoi8ZqTTDF19YUhCtoSBWuS32VAsclvexgrU50v1ibjzBcERTE_OjuutxVozpuz72_eMeStIYLBWKYDOln16CUTr5Lo0MBWe7YaNjU-zX3X3u4G_HNBTe1v8DSPFno1qFzYOGtLvsmgB" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Moussa Traor├®</p>
                <p className="text-[13px] text-slate-500 font-medium leading-tight mt-1">Verified their student account via University ID.</p>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md mt-2 inline-block uppercase">2 Hours Ago</span>
              </div>
            </div>

            {/* Activity Item */}
            <div className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined !text-[20px]">verified</span>
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">New Verification</p>
                <p className="text-[13px] text-slate-500 font-medium leading-tight mt-1">Bank of Africa (BOA) completed identity verification.</p>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md mt-2 inline-block uppercase">4 Hours Ago</span>
              </div>
            </div>
            
            {/* Activity Item */}
            <div className="flex gap-4 items-start group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 group-hover:border-primary/50 transition-colors">
                <img alt="User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnqzy96NoOu2EFbi_UXoDM3hHBKdgwoAc8dIzEyHbiLntrkNYjLLZI7Rne9dINnJnWwu8TakzgsD0onCldfRbO90Qyv3z4E73HKlNoXJZFLx-On6KZM2zN7YZVB4SrkoyxL6iiK-hCz26nfbe1I85sWdTQ8-dG5BoV_dCdzLFF4jH9aILwL29wHBzYWJRB5eut0VlXzbaVtuvtk-8FbPEYrl_-nZ06ZQv8Zt_j8rVu7VPNrj2xt96AXebhhyQve4zNULYbzwo6ICIj" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Awa Coulibaly</p>
                <p className="text-[13px] text-slate-500 font-medium leading-tight mt-1">Updated profile with new certification in Project Mgmt.</p>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md mt-2 inline-block uppercase">Yesterday</span>
              </div>
            </div>

          </div>
          <button className="mt-6 w-full py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-[11px] font-extrabold text-blue-600 transition-colors uppercase tracking-widest border border-slate-100 focus:outline-none">View All Activity</button>
        </div>
      </div>

      {/* Tables & Health Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Data Table Section */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h4 className="text-[18px] font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-400">admin_panel_settings</span>
              Pending Moderation
            </h4>
            <span className="px-3 py-1 bg-amber-50 border border-amber-200/50 text-amber-700 text-[10px] font-black tracking-widest rounded-lg flex items-center gap-1.5 shadow-sm shadow-amber-100/50">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                12 ACTIONS REQUIRED
            </span>
          </div>
          <div className="overflow-x-auto min-w-full">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-white border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Title / Name</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5">Submitted Date</th>
                  <th className="px-8 py-5">Risk Level</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                
                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined !text-[20px]">description</span>
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Cloud Architect Intern</p>
                        <p className="text-[12px] font-medium text-slate-500 mt-0.5">Orange Burkina</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-[13px] font-semibold text-slate-600">IT &amp; Engineering</td>
                  <td className="px-8 py-4 text-[13px] font-medium text-slate-500">Oct 24, 2023</td>
                  <td className="px-8 py-4">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      LOW
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="px-4 py-2 bg-slate-50 text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-100 rounded-xl font-bold text-[12px] transition-all">Review</button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined !text-[20px]">description</span>
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Marketing Associate</p>
                        <p className="text-[12px] font-medium text-slate-500 mt-0.5">Burkina Gaz</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-[13px] font-semibold text-slate-600">Business</td>
                  <td className="px-8 py-4 text-[13px] font-medium text-slate-500">Oct 23, 2023</td>
                  <td className="px-8 py-4">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      LOW
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="px-4 py-2 bg-slate-50 text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-100 rounded-xl font-bold text-[12px] transition-all">Review</button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100 shadow-sm group-hover:bg-rose-600 group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined !text-[20px]">assignment_ind</span>
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">Profile: Ibrahim Sanou</p>
                        <p className="text-[12px] font-medium text-slate-500 mt-0.5">KYC Verification</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-[13px] font-semibold text-slate-600">User Identity</td>
                  <td className="px-8 py-4 text-[13px] font-medium text-slate-500">Oct 22, 2023</td>
                  <td className="px-8 py-4">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-100/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      HIGH
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 hover:border-rose-600 rounded-xl font-bold text-[12px] transition-all">Urgent Review</button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* System Health Card */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-3xl shadow-xl shadow-slate-900/30 flex flex-col justify-between text-white relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-48 h-48 bg-blue-500/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute left-0 bottom-0 w-32 h-32 bg-primary/30 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative z-10">
            <h4 className="text-[18px] font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined !text-[20px] text-emerald-400">check_circle</span>
              System Health
            </h4>
            <p className="text-slate-400 text-[13px] font-medium leading-relaxed mb-8">All core systems are operational across regional nodes.</p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-[13px] mb-2 font-medium">
                  <span className="text-slate-300">Server Load</span>
                  <span className="font-bold text-white">24%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/50">
                  <div className="bg-emerald-400 h-full w-[24%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center text-[13px] mb-2 font-medium">
                  <span className="text-slate-300">API Uptime</span>
                  <span className="font-bold text-white">99.98%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700/50">
                  <div className="bg-emerald-400 h-full w-[99%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 pt-6 border-t border-slate-700/50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-300">Live Cloud Sync</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">V.1.2.4</span>
          </div>
        </div>

      </div>

    </AdminDashboardLayout>
  );
}
