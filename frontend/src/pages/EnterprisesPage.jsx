import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function EnterprisesPage() {
  const navigate = useNavigate();
  const companies = [
    {
      name: 'Orange Burkina',
      sector: 'Télécoms',
      sectorColor: 'bg-blue-50 text-primary border-blue-100',
      location: 'Ouagadougou, Zone Commerciale',
      offers: 12
    },
    {
      name: 'Coris Bank International',
      sector: 'Finance',
      sectorColor: 'bg-blue-50 text-primary border-blue-100',
      location: 'Ouagadougou, Koulouba',
      offers: 8
    },
    {
      name: 'Moov Africa',
      sector: 'Télécoms',
      sectorColor: 'bg-blue-50 text-primary border-blue-100',
      location: 'Bobo-Dioulasso, Centre-ville',
      offers: 5
    },
    {
      name: 'SONABEL',
      sector: 'Énergie',
      sectorColor: 'bg-blue-50 text-primary border-blue-100',
      location: 'Ouagadougou, Gounghin',
      offers: 3
    },
    {
      name: 'Onatel',
      sector: 'Télécoms',
      sectorColor: 'bg-blue-50 text-primary border-blue-100',
      location: 'Ouagadougou, Zone Industrielle',
      offers: 7
    },
    {
      name: 'Wendkuni Bank',
      sector: 'Finance',
      sectorColor: 'bg-blue-50 text-primary border-blue-100',
      location: 'Ouagadougou, Projet ZACA',
      offers: 4
    }
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Navbar />
      
      {/* Hero Section & Search */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 z-0">
          <img alt="Modern Office" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvhrBD3oXh0ZJqllgyZwqOUIWrZWhQshV13xRs3pUG6_MyJU3C1p4horGQjhriH_o08GGu2BSaNG79hkcw1Pc4rmySWJ1YJExU7WXqiL7Z0A4GwkrAdrWyH-d8JD01lJsJgJCRcu8TTKBSei5mvRKnqht1UBqvFuiCeQhHICDQCE8m60p3u4CfMH5GWrpVlurC1Pw_zI7k9GIJoBQVuoe-nH4RlMYAYyVgv5QKijylPlH-st3RRRUmhqeqbBqhDizdPV3-BdZpMCpR" />
          <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/80"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
            Propulsez votre carrière au <span className="text-primary">Burkina Faso</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-800 dark:text-slate-300 mb-10 max-w-2xl mx-auto font-semibold drop-shadow-sm">
            Explorez les profils des entreprises leaders et trouvez l'environnement de travail qui vous correspond.
          </p>
          <div className="flex w-full max-w-2xl mx-auto items-stretch rounded-2xl h-14 md:h-16 shadow-2xl shadow-primary/20 border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm overflow-hidden p-1.5 transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <div className="text-slate-400 flex items-center justify-center pl-4 pr-2">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="flex-1 border-none focus:ring-0 bg-transparent outline-none text-slate-900 dark:text-white px-2 text-base placeholder:text-slate-500" placeholder="Rechercher une entreprise, un secteur..." />
            <button className="bg-primary text-white font-bold px-8 md:px-12 rounded-xl hover:bg-blue-800 transition-colors">
              Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* Grid of Companies */}
      <main className="container mx-auto px-4 lg:px-10 py-20 flex-1 w-full max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Entreprises vedettes</h3>
            <p className="text-slate-500 text-sm">Découvrez les recruteurs les plus actifs actuellement au Burkina</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold text-sm">
            <span className="material-symbols-outlined text-xl">tune</span>
            <span>Filtrer les résultats</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {companies.map((company, index) => (
            <div key={index} className="group hover-card-effect bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 p-6 flex flex-col h-full shadow-sm">
              <div className="flex items-start justify-between mb-5">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 p-2 shadow-sm flex items-center justify-center overflow-hidden font-bold text-primary text-xl">
                  {company.name.substring(0, 2).toUpperCase()}
                </div>
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest border ${company.sectorColor}`}>
                  {company.sector}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{company.name}</h4>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-primary bg-primary/5 px-3 py-2 rounded-lg inline-flex mb-6">
                  <span className="material-symbols-outlined text-base">work</span>
                  <span className="font-bold text-xs">{company.offers} offres disponibles</span>
                </div>
              </div>
              <button 
                className="w-full py-3 bg-slate-50 dark:bg-slate-800 group-hover:bg-primary text-slate-700 dark:text-slate-300 group-hover:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm mt-auto"
                onClick={() => navigate('/entreprises/1')}
              >
                Voir le profil
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-20 flex justify-center">
          <button className="px-10 py-4 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-all flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">sync</span>
            Charger plus d'entreprises
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
