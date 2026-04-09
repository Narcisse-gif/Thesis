import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/student-dashboard/Layout';

/* ─── Données de la maquette Stitch ──────────────────────── */
const JOBS = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'Tech Faso Solutions',
    location: 'Ouagadougou',
    type: 'Full-time',
    level: 'Senior',
    salary: 'FCFA 400,000–600,000/month',
    posted: '1 day ago',
    deadline: '30 Oct 2024',
    logo: 'TF',
    color: 'bg-blue-100 text-blue-700',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    desc: 'Looking for an experienced full-stack developer to lead our product engineering team.',
    saved: false,
    match: 88,
  },
  {
    id: 2,
    title: 'UI/UX Design Intern',
    company: 'Creative Hub Agency',
    location: 'Ouagadougou',
    type: 'Internship',
    level: 'Entry',
    salary: 'FCFA 80,000–120,000/month',
    posted: '3 days ago',
    deadline: '15 Nov 2024',
    logo: 'CH',
    color: 'bg-purple-100 text-purple-700',
    tags: ['Figma', 'Adobe XD', 'Prototyping'],
    desc: 'Join our creative team and help design digital products used by thousands of users across Burkina Faso.',
    saved: true,
    match: 95,
  },
  {
    id: 3,
    title: 'Agri-Tech Project Manager',
    company: 'Ferme du Sahel',
    location: 'Bobo-Dioulasso',
    type: 'Full-time',
    level: 'Mid',
    salary: 'FCFA 300,000–450,000/month',
    posted: '5 days ago',
    deadline: '20 Nov 2024',
    logo: 'FS',
    color: 'bg-green-100 text-green-700',
    tags: ['Project Management', 'Agri-Tech', 'French'],
    desc: 'Managing innovative agricultural technology projects across the Sahel region.',
    saved: false,
    match: 72,
  },
  {
    id: 4,
    title: 'Data Analyst',
    company: 'SONABEL',
    location: 'Ouagadougou',
    type: 'Full-time',
    level: 'Mid',
    salary: 'FCFA 350,000–500,000/month',
    posted: '1 week ago',
    deadline: '25 Nov 2024',
    logo: 'SN',
    color: 'bg-amber-100 text-amber-700',
    tags: ['Python', 'SQL', 'Power BI'],
    desc: 'Analyze operational data to improve energy distribution efficiency across Burkina Faso.',
    saved: false,
    match: 81,
  },
  {
    id: 5,
    title: 'Mobile App Developer',
    company: 'Orange Burkina Faso',
    location: 'Remote',
    type: 'CDD',
    level: 'Mid',
    salary: 'FCFA 280,000–380,000/month',
    posted: '2 weeks ago',
    deadline: '1 Dec 2024',
    logo: 'OB',
    color: 'bg-orange-100 text-orange-700',
    tags: ['Flutter', 'Dart', 'Firebase'],
    desc: 'Develop and maintain mobile applications for Orange Money and other digital services.',
    saved: true,
    match: 76,
  },
];

const TYPES = ['All', 'Full-time', 'Internship', 'CDD', 'Remote'];
const LEVELS = ['All Levels', 'Entry', 'Mid', 'Senior'];

export default function StudentJobsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  const [savedJobs, setSavedJobs] = useState(new Set(JOBS.filter(j => j.saved).map(j => j.id)));
  const [selected, setSelected] = useState(JOBS[0]);

  const filtered = JOBS.filter(j => {
    const q = search.toLowerCase();
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.tags.some(t => t.toLowerCase().includes(q));
    const matchType = typeFilter === 'All' || j.type === typeFilter;
    const matchLevel = levelFilter === 'All Levels' || j.level === levelFilter;
    return matchQ && matchType && matchLevel;
  });

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedJobs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const typeBadge = t => {
    const map = { 'Full-time': 'bg-blue-50 text-blue-700', 'Internship': 'bg-purple-50 text-purple-700', 'CDD': 'bg-amber-50 text-amber-700', 'Remote': 'bg-green-50 text-green-700' };
    return map[t] || 'bg-gray-100 text-gray-600';
  };

  return (
    <Layout pageTitle="Search Jobs">
      <div className="space-y-4">

        {/* ── Search + Filters bar ─────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="flex flex-1 min-w-56 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-gray-400">search</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search jobs, companies, skills..."
              className="flex-1 bg-transparent text-[14px] outline-none text-gray-800 placeholder:text-gray-400"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-[13px] font-medium text-gray-700 shadow-sm outline-none cursor-pointer"
          >
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>

          {/* Level filter */}
          <select
            value={levelFilter}
            onChange={e => setLevelFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-[13px] font-medium text-gray-700 shadow-sm outline-none cursor-pointer"
          >
            {LEVELS.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        {/* ── Result count ───────────────────────────────── */}
        <p className="text-[13px] text-gray-500">
          Showing <span className="font-semibold text-gray-900">{filtered.length}</span> available jobs
        </p>

        {/* ── Split view: List + Detail ─────────────────── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

          {/* ─ Job list ──────────────────────────────────── */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((job, idx) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelected(job)}
                  className={`rounded-xl border bg-white p-4 cursor-pointer transition-all ${
                    selected?.id === job.id
                      ? 'border-primary shadow-md ring-1 ring-primary/30'
                      : 'border-gray-100 hover:border-gray-200 hover:shadow-sm shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Logo */}
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold ${job.color}`}>
                      {job.logo}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <p className={`text-[14px] font-semibold leading-tight ${selected?.id === job.id ? 'text-primary' : 'text-gray-900'}`}>
                          {job.title}
                        </p>
                        <button
                          onClick={e => toggleSave(job.id, e)}
                          className={`shrink-0 transition-colors ${savedJobs.has(job.id) ? 'text-primary' : 'text-gray-300 hover:text-gray-500'}`}
                        >
                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: savedJobs.has(job.id) ? '"FILL" 1' : '"FILL" 0' }}>
                            bookmark
                          </span>
                        </button>
                      </div>
                      <p className="text-[12px] text-gray-500 mt-0.5">{job.company} · {job.location}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeBadge(job.type)}`}>{job.type}</span>
                        <span className="text-[11px] text-gray-400 ml-auto">{job.posted}</span>
                        {job.match >= 85 && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{job.match}% match</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-200 bg-white p-10 text-center">
                <span className="material-symbols-outlined text-[40px] text-gray-300">search_off</span>
                <p className="mt-2 text-sm font-semibold text-gray-500">No jobs found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* ─ Job detail ────────────────────────────────── */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden sticky top-20"
                >
                  {/* Header */}
                  <div className="border-b border-gray-100 px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-[14px] font-bold ${selected.color}`}>
                        {selected.logo}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-[18px] font-bold text-gray-900">{selected.title}</h2>
                        <p className="text-[14px] text-gray-500 mt-0.5">{selected.company} · {selected.location}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${typeBadge(selected.type)}`}>{selected.type}</span>
                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">{selected.level} level</span>
                          <span className="flex items-center gap-1 text-[12px] text-gray-500">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            Posted {selected.posted}
                          </span>
                          <span className="flex items-center gap-1 text-[12px] text-gray-500">
                            <span className="material-symbols-outlined text-[14px]">event</span>
                            Deadline: {selected.deadline}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={e => toggleSave(selected.id, e)}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                          savedJobs.has(selected.id)
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-gray-200 text-gray-400 hover:border-primary hover:text-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: savedJobs.has(selected.id) ? '"FILL" 1' : '"FILL" 0' }}>
                          bookmark
                        </span>
                      </button>
                    </div>

                    {/* Salary */}
                    <div className="mt-4 flex items-center gap-1 rounded-lg bg-primary/5 px-4 py-3">
                      <span className="material-symbols-outlined text-[18px] text-primary">payments</span>
                      <span className="text-[13px] font-semibold text-primary">{selected.salary}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5 space-y-5">
                    {/* Description */}
                    <div>
                      <h3 className="text-[14px] font-semibold text-gray-900 mb-2">Job Description</h3>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{selected.desc}</p>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="text-[14px] font-semibold text-gray-900 mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selected.tags.map(tag => (
                          <span key={tag} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] font-medium text-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Match score */}
                    <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[13px] font-semibold text-gray-700">Profile Match</p>
                        <span className={`text-[13px] font-bold ${selected.match >= 85 ? 'text-primary' : 'text-amber-600'}`}>{selected.match}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <motion.div
                          className={`h-full rounded-full ${selected.match >= 85 ? 'bg-primary' : 'bg-amber-400'}`}
                          key={selected.id}
                          initial={{ width: 0 }}
                          animate={{ width: `${selected.match}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* FooterActions */}
                  <div className="border-t border-gray-100 px-6 py-4 flex items-center gap-3">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-3 text-[14px] font-semibold text-white hover:bg-primary-dark transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      Apply Now
                    </button>
                    <button
                      onClick={e => toggleSave(selected.id, e)}
                      className={`flex items-center gap-2 rounded-lg border px-5 py-3 text-[14px] font-semibold transition-colors ${
                        savedJobs.has(selected.id)
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: savedJobs.has(selected.id) ? '"FILL" 1' : '"FILL" 0' }}>bookmark</span>
                      {savedJobs.has(selected.id) ? 'Saved' : 'Save Job'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
}
