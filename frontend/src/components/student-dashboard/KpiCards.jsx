import { motion } from 'framer-motion';
import { TrendingUp, Minus } from 'lucide-react';

export default function KpiCards({ items }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5, type: 'spring' }}
            className="group relative overflow-hidden rounded-[24px] border border-white/60 bg-white/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5"
          >
            {/* Soft backdrop glow */}
            <div className={`absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-to-br ${item.iconBg} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20`} />
            
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400 mb-2">{item.label}</p>
                <p className="text-4xl font-black tracking-tight text-slate-900">{item.value}</p>
                
                <div className="mt-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5">
                      {item.trend === 'up' && (
                        <span className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-[10px] font-black text-emerald-600">
                          <TrendingUp className="h-3 w-3" strokeWidth={3} />
                          +{idx + 2}%
                        </span>
                      )}
                      {item.trend === 'neutral' && (
                        <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-black text-slate-500">
                          <Minus className="h-3 w-3" strokeWidth={3} />
                        </span>
                      )}
                  </div>
                  <p className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">{item.caption}</p>
                </div>
              </div>
              
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br ${item.iconBg} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {Icon && <Icon className="h-5 w-5" strokeWidth={2.5} />}
              </div>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
