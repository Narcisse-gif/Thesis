import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ListFilter, ArrowUpDown, Eye, X, Send, Clock, CheckCircle2, XCircle, SearchX, ChevronLeft, ChevronRight } from 'lucide-react';

const STATUS_STYLES = {
  Envoyee: { 
    bg: 'bg-slate-100/80', 
    text: 'text-slate-600', 
    border: 'border-slate-200/50',
    icon: Send
  },
  'En cours': { 
    bg: 'bg-amber-50/80', 
    text: 'text-amber-700', 
    border: 'border-amber-200/50',
    icon: Clock
  },
  Accepte: { 
    bg: 'bg-emerald-50/80', 
    text: 'text-emerald-700', 
    border: 'border-emerald-200/50',
    icon: CheckCircle2
  },
  Refuse: { 
    bg: 'bg-rose-50/80', 
    text: 'text-rose-700', 
    border: 'border-rose-200/50',
    icon: XCircle
  }
};

const PAGE_SIZE = 5;

export default function CandidaturesTable({ rows, showWithdraw = false, title = 'Mes candidatures recentes' }) {
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  const filteredRows = useMemo(() => {
    const base = statusFilter === 'Tous' ? rows : rows.filter((row) => row.status === statusFilter);

    return [...base].sort((a, b) => {
      const multiplier = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'date') {
        return multiplier * (new Date(a.date).getTime() - new Date(b.date).getTime());
      }
      return multiplier * String(a[sortKey]).localeCompare(String(b[sortKey]), 'fr', { sensitivity: 'base' });
    });
  }, [rows, statusFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedRows = filteredRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <section className="overflow-hidden rounded-[24px] border border-white bg-white/60 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100/60 bg-white/40 px-8 py-6">
        <h3 className="text-xl font-black tracking-tight text-slate-900">{title}</h3>
        
        <div className="flex items-center gap-3">
          <div className="relative flex items-center gap-2 rounded-xl border border-slate-200/60 bg-white/80 px-3 py-2 shadow-sm transition-colors hover:border-slate-300">
            <ListFilter className="h-4 w-4 text-slate-400" />
            <select
              id="status-filter"
              className="appearance-none bg-transparent pl-1 pr-4 text-sm font-bold text-slate-700 outline-none cursor-pointer focus:ring-0"
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
            >
              <option>Tous</option>
              <option>Envoyee</option>
              <option>En cours</option>
              <option>Accepte</option>
              <option>Refuse</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {paginatedRows.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center">
             <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[24px] bg-slate-50 border border-slate-100 shadow-inner">
                <SearchX className="h-8 w-8 text-slate-300" />
             </div>
             <p className="text-base font-bold text-slate-900">Aucune candidature trouvée</p>
             <p className="mt-1 text-sm font-medium text-slate-500">Ajustez vos filtres pour voir plus de résultats.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/30 text-[11px] font-black uppercase tracking-wider text-slate-400">
                <th className="px-8 py-5 cursor-pointer hover:text-slate-600 transition-colors" onClick={() => toggleSort('offer')}>
                  <div className="flex items-center gap-2">Offre {sortKey === 'offer' && <ArrowUpDown className="h-3 w-3" />}</div>
                </th>
                <th className="px-8 py-5 cursor-pointer hover:text-slate-600 transition-colors" onClick={() => toggleSort('company')}>
                   <div className="flex items-center gap-2">Entreprise {sortKey === 'company' && <ArrowUpDown className="h-3 w-3" />}</div>
                </th>
                <th className="px-8 py-5 cursor-pointer hover:text-slate-600 transition-colors" onClick={() => toggleSort('date')}>
                   <div className="flex items-center gap-2">Date {sortKey === 'date' && <ArrowUpDown className="h-3 w-3" />}</div>
                </th>
                <th className="px-8 py-5 cursor-pointer hover:text-slate-600 transition-colors" onClick={() => toggleSort('status')}>
                   <div className="flex items-center gap-2">Statut {sortKey === 'status' && <ArrowUpDown className="h-3 w-3" />}</div>
                </th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60">
              <AnimatePresence mode="popLayout">
                {paginatedRows.map((row) => {
                  const style = STATUS_STYLES[row.status] || STATUS_STYLES.Envoyee;
                  const StatusIcon = style.icon;
                  
                  return (
                    <motion.tr 
                      key={row.id} 
                      layout
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="group bg-transparent transition-colors hover:bg-white"
                    >
                      <td className="px-8 py-5">
                         <p className="text-[14px] font-bold text-slate-900 group-hover:text-primary transition-colors">{row.offer}</p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-slate-200/60 bg-white shadow-sm text-[11px] font-black text-slate-500">
                               {row.logo || row.company.substring(0,2).toUpperCase()}
                           </div>
                           <p className="text-[13px] font-bold text-slate-600">{row.company}</p>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                         <span className="text-[13px] font-semibold text-slate-500">{row.displayDate}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 box-border ${style.bg} ${style.border}`}>
                          <StatusIcon className={`h-3.5 w-3.5 ${style.text}`} strokeWidth={3} />
                          <span className={`text-[11px] font-black uppercase tracking-wide ${style.text}`}>
                            {row.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="inline-flex items-center justify-end gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-2">
                          <button className="flex h-[34px] w-[34px] items-center justify-center rounded-xl bg-white text-slate-400 border border-slate-200/60 shadow-sm transition-all hover:scale-110 hover:border-primary/30 hover:text-primary hover:bg-primary/5">
                            <Eye className="h-4 w-4" />
                          </button>
                          {showWithdraw && row.status === 'Envoyee' && (
                            <button className="flex h-[34px] w-[34px] items-center justify-center rounded-xl bg-white text-rose-400 border border-slate-200/60 shadow-sm transition-all hover:scale-110 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50">
                               <X className="h-4 w-4" strokeWidth={2.5} />
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col gap-4 border-t border-slate-100/60 bg-white/40 px-8 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-semibold text-slate-500">Page <span className="text-slate-900 font-bold">{currentPage}</span> sur <span className="font-bold">{totalPages}</span></p>
          <div className="flex items-center gap-2">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/60 bg-white text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:pointer-events-none disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/60 bg-white text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:pointer-events-none disabled:opacity-40"
              disabled={currentPage === totalPages}
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
