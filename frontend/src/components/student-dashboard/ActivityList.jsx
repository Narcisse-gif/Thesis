import { motion } from 'framer-motion';
import { Ghost } from 'lucide-react';

export default function ActivityList({ activities }) {
  if (!activities?.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-slate-200 bg-white/50 p-10 text-center backdrop-blur-xl">
        <div className="rounded-full bg-slate-100 p-4 mb-4">
            <Ghost className="h-8 w-8 text-slate-300" />
        </div>
        <p className="text-sm font-bold text-slate-700">Aucune activitÃ© rÃ©cente.</p>
        <p className="mt-1.5 text-xs font-medium text-slate-500">Commencez Ã  explorer les offres pour gÃ©nÃ©rer de l'activitÃ©.</p>
      </div>
    );
  }

  const getIconColor = (type) => {
    switch (type) {
      case 'match': return 'text-amber-500 bg-amber-50 border-amber-200';
      case 'update': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'action': return 'text-purple-500 bg-purple-50 border-purple-200';
      case 'success': return 'text-blue-500 bg-blue-50 border-blue-200';
      default: return 'text-slate-500 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="relative pl-3 mt-2">
      {/* Ligne verticale de la timeline */}
      <div className="absolute left-[27px] top-4 bottom-4 w-px bg-slate-100 line-dashed"></div>
      
      <ul className="space-y-6">
        {activities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.li 
                key={item.id} 
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5, type: 'spring' }}
                className="group relative flex items-start gap-4"
            >
                {/* L'icÃ´ne (point sur la timeline) */}
                <div className={`relative z-10 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border ${getIconColor(item.type)} shadow-sm bg-white ring-4 ring-white/50 transition-transform duration-300 group-hover:scale-110`}>
                {Icon && <Icon className="h-4 w-4" strokeWidth={2.5} />}
                </div>
                
                {/* Contenu */}
                <div className="flex-1 rounded-[20px] border border-transparent hover:border-slate-100 bg-transparent hover:bg-slate-50/80 p-3 pt-2 shadow-none transition-all duration-300">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-[14px] font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{item.title}</p>
                    <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-slate-400 whitespace-nowrap bg-slate-100 rounded-md px-2 py-0.5">{item.time}</span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium text-slate-500 leading-relaxed">{item.description}</p>
                </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

