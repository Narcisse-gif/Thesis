import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkX, Building2, MapPin, Clock, ArrowRight, Search } from 'lucide-react';
import Layout from '../components/student-dashboard/Layout';
import { useDarkMode } from '../components/student-dashboard/DarkModeContext';

const INIT_FAVS = [
  { id: 1, title: 'DÃ©veloppeur React.js (Stage)', company: 'FasoTech', city: 'Ouagadougou', type: 'Stage', contract: 'PrÃ©sentiel', daysLeft: 5, logo: 'FT', color: 'from-blue-400 to-indigo-500' },
  { id: 2, title: 'Assistant Marketing Digital', company: 'Canal+', city: 'Ouagadougou', type: 'CDD', contract: 'Hybride', daysLeft: 12, logo: 'C+', color: 'from-rose-400 to-pink-500' },
  { id: 3, title: 'Data Analyst Junior', company: 'Ecobank BF', city: 'Remote', type: 'CDI', contract: 'Remote', daysLeft: 20, logo: 'EB', color: 'from-cyan-400 to-sky-500' },
  { id: 4, title: 'UX/UI Designer', company: 'Digital Hub BF', city: 'Bobo-Dioulasso', type: 'Stage', contract: 'PrÃ©sentiel', daysLeft: 3, logo: 'DH', color: 'from-purple-400 to-violet-500' },
  { id: 5, title: 'Chef de Projet Digital', company: 'ONATEL', city: 'Ouagadougou', type: 'CDI', contract: 'PrÃ©sentiel', daysLeft: 30, logo: 'ON', color: 'from-blue-400 to-blue-500' },
  { id: 6, title: 'Technicien RÃ©seau', company: 'ARCEP Burkina', city: 'Ouagadougou', type: 'Stage', contract: 'PrÃ©sentiel', daysLeft: 7, logo: 'AR', color: 'from-amber-400 to-orange-500' },
];

export default function StudentFavoritesPage() {
  const { dark } = useDarkMode();
  const [favs, setFavs] = useState(INIT_FAVS);
  const [search, setSearch] = useState('');
  const [removing, setRemoving] = useState(null);

  const handleRemove = (id) => {
    setRemoving(id);
    setTimeout(() => {
      setFavs(prev => prev.filter(f => f.id !== id));
      setRemoving(null);
    }, 400);
  };

  const filtered = favs.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout pageTitle="Offres sauvegardÃ©es" pageSubtitle="Favoris">
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl px-6 py-5 border ${dark ? 'bg-slate-800/80 border-slate-700/60' : 'bg-white/80 border-white backdrop-blur-xl'} shadow-sm`}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md shadow-amber-400/30">
              <Bookmark className="h-5 w-5 text-white" fill="white" />
            </div>
            <div>
              <h2 className={`text-xl font-black tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>Mes favoris</h2>
              <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{favs.length} offres sauvegardÃ©es</p>
            </div>
          </div>
          {/* Search */}
          <div className={`relative w-full sm:w-80 flex items-center gap-2 rounded-2xl border px-4 py-2.5 ${dark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
            <Search className={`h-4 w-4 shrink-0 ${dark ? 'text-slate-400' : 'text-slate-400'}`} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un favori..."
              className={`flex-1 bg-transparent text-sm font-semibold outline-none ${dark ? 'text-white placeholder:text-slate-500' : 'text-slate-800 placeholder:text-slate-400'}`}
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((fav, idx) => (
                <motion.article
                  key={fav.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: removing === fav.id ? 0 : 1, scale: removing === fav.id ? 0.9 : 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.04, type: 'spring', bounce: 0.2 }}
                  className={`group relative overflow-hidden rounded-3xl border p-5 transition-all cursor-default hover:-translate-y-1 hover:shadow-xl ${dark ? 'bg-slate-800/80 border-slate-700 hover:shadow-slate-900/30' : 'bg-white/80 border-white backdrop-blur-xl hover:shadow-primary/5'}`}
                >
                  {/* Urgency banner */}
                  {fav.daysLeft <= 5 && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-rose-500 px-2.5 py-1 text-[9px] font-black text-white">
                      <Clock className="h-2.5 w-2.5" /> {fav.daysLeft}j restants
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${fav.color} text-white text-[12px] font-black shadow-md`}>
                      {fav.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[14px] font-black leading-tight truncate group-hover:text-primary transition-colors ${dark ? 'text-white' : 'text-slate-900'}`}>{fav.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Building2 className={`h-3 w-3 ${dark ? 'text-slate-400' : 'text-slate-400'}`} />
                        <p className={`text-[12px] font-semibold ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{fav.company}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className={`h-3 w-3 ${dark ? 'text-slate-500' : 'text-slate-400'}`} />
                        <p className={`text-[11px] ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{fav.city}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <span className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase ${dark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>{fav.type}</span>
                    <span className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase ${dark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>{fav.contract}</span>
                    {fav.daysLeft > 5 && (
                      <span className="flex items-center gap-1 ml-auto text-[10px] font-semibold text-slate-400">
                        <Clock className="h-3 w-3" /> {fav.daysLeft}j restants
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 duration-300">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[12px] font-black text-white hover:bg-primary-dark transition-colors shadow-md shadow-primary/20">
                      Postuler <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleRemove(fav.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                    >
                      <BookmarkX className="h-4 w-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`rounded-3xl border p-20 text-center ${dark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-white'}`}
          >
            <div className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <Bookmark className="h-9 w-9 text-slate-300" />
            </div>
            <p className={`text-lg font-black ${dark ? 'text-white' : 'text-slate-900'}`}>
              {search ? 'Aucun favori trouvÃ©' : 'Aucune offre sauvegardÃ©e'}
            </p>
            <p className={`mt-1.5 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              {search ? 'Essayez un autre mot-clÃ©.' : 'Explorez les offres et cliquez sur â™¥ pour sauvegarder.'}
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

