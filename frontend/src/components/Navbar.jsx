import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { getToken, getUserRole } from '../utils/authStorage';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200/70 bg-white/85 px-6 py-4 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/75 dark:border-slate-800/70 dark:bg-background-dark/85 dark:supports-[backdrop-filter]:bg-background-dark/75 lg:px-20">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="h-10 w-auto">
            <img alt="StageLink Burkina Logo" className="h-full w-auto object-contain" src={logo} />
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
            StageLink <span className="text-primary">Burkina</span>
          </h2>
        </div>
        <div className="hidden md:flex flex-1 justify-center gap-8">
          <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/">Accueil</Link>
          <div className="group relative">
            <button className="flex items-center gap-1 text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors">
              Offres
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <div className="absolute left-0 top-full hidden w-48 pt-2 group-hover:block z-50">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                <Link className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" to="/stages">Offres de stage</Link>
                <Link className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800 transition-colors" to="/emplois">Offres d'emplois</Link>
              </div>
            </div>
          </div>
          <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/entreprises">Entreprises</Link>
          <Link className="text-slate-700 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" to="/conseils">Conseils</Link>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/inscription')} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold flex-shrink-0 hover:bg-primary/90 transition-all">
            <span>S'inscrire</span>
          </button>
          <button
            onClick={() => {
              const token = getToken();
              const role = getUserRole();
              if (token && role) {
                if (role === 'ADMIN') navigate('/admin/dashboard');
                else if (role === 'ENTERPRISE') navigate('/entreprise/dashboard');
                else navigate('/etudiant/dashboard');
              } else {
                navigate('/connexion');
              }
            }}
            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold flex-shrink-0 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <span>Connexion</span>
          </button>
        </div>
      </header>
      <div aria-hidden="true" className="h-[73px] shrink-0" />
    </>
  );
}
