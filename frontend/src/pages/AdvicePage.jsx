import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdvicePage() {
  const pillars = [
    {
      icon: 'description',
      title: 'Le CV Impactant',
      description: 'Structurez vos expériences pour captiver l\'attention des recruteurs au Burkina en moins de 10 secondes.',
    },
    {
      icon: 'forum',
      title: 'Maîtriser l\'Entretien',
      description: 'Préparez vos réponses aux questions les plus fréquentes et adoptez la bonne posture professionnelle.',
    },
    {
      icon: 'mail',
      title: 'Lettre de Motivation',
      description: 'Apprenez à personnaliser vos candidatures pour démontrer votre valeur ajoutée spécifique aux entreprises.',
    },
    {
      icon: 'hub',
      title: 'Réseautage Local',
      description: 'Comment activer son réseau à Ouagadougou et Bobo pour accéder au marché caché de l\'emploi.',
    }
  ];

  const articles = [
    {
      category: 'Carrière',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQjiNF-F_aOZCrnItOhKKne2ABLvmoDa1_-WZv89yXnz0orABFvp3IKez4RvM8wsl3mGwg4sfMoJHXtz2CNPOC4mMSgfmzSlCx9HpmDPPuXIP2R671CTN_fqNzaMCh6DxW46Sx36SX6zw4iLMt_9Eo-ouIUQR7eYFcC-pww1a6VSDCw21Y0-AExdzOVvKGot90uvzff9a9jaeqPdHoJ3xY3RNoJg-hN-Ef0Jq4f-1t6KMp6Scnl23dU1JqloXPlWgQS4sslRd1itYE',
      title: 'Les soft skills les plus recherchées par les entreprises burkinabè en 2024',
      description: 'L\'intelligence émotionnelle et l\'adaptabilité deviennent des critères de sélection majeurs pour les recruteurs locaux.',
      authorInitials: 'SL',
      author: 'Équipe StageLink',
      readTime: '5 min de lecture'
    },
    {
      category: 'Numérique',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5yz8GEJWc5j0PL4H6GbChTznR5pOy7V1t0vvAYr1deMSmpJgsC71XCyyy2sDVmKHovHfMwNxYFhnu2C7R0RCjF0t5A32WcuOfFgo8eCUuWJTultW8k9QJ9STsTV4lOGaISyvbVhqvOngfnPtm55rTMENX1CUZTXOPCjDvwr0X27wmYSu93rZmKb-oET2f05CB53AvZEbwKhkS1ECBIOLwpn0vOVp5-1boPJSBGJ-XOg_wkEHbZ-XSZx_BPOw7KhQlWONOTYkvCDx5',
      title: 'LinkedIn : Optimiser son profil pour attirer les chasseurs de têtes',
      description: 'Comment transformer votre présence en ligne en un véritable aimant à opportunités professionnelles dès aujourd\'hui.',
      authorInitials: 'JS',
      author: 'Jean S.',
      readTime: '8 min de lecture'
    },
    {
      category: 'Stage',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqWWJaLZBvaKKvGmBYH09iOs88ORiadNzZJE6ASU6SYAkv6WgcrbRILWrMOqyMdIa69EAmwCIfqLrUR6zKMzvpoRawYF2H1DdvoqcwPkwo9xpDFCzK-VER4JwGf-0uQKdn1zjkg9B1T8nixQGfc3xFxIiKKQ4Bal5bHr1pmgrLnJvAP5S5tqCQqtG5k2r4WZzEsgIxOcBkVdADObH_uWWIJdgn2IOVMO7SS_8XFarQmGIcMWzoptthEzyzKt35OQhJ7dFrTvJ6AqkA',
      title: 'Réussir son premier stage : De stagiaire à employé permanent',
      description: 'Les secrets pour se rendre indispensable au sein d\'une organisation dès les premières semaines de votre stage.',
      authorInitials: 'AM',
      author: 'Aminata M.',
      readTime: '6 min de lecture'
    }
  ];

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-slate-900 font-display transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[550px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0 border-b border-primary/20">
            <img alt="Modern business environment" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVptdVuKenROB0DwMvnIaV5NmtQgmzgcdOUrKCHvfZmTdW1Fn9Sk6tOvt0b5SaYMijolc8rkKlBQCPXf3rFO2xrpWI8ViGrHSbAa6Y_21SMqf3hv5SH4lHp66YMuQQuvYkh4yzPIJNLBK3THK9kwj3gyB53XrpJL2DC8WJQaYJ0pXSFPDvMhOvJ5l2g04q9isvr0Wdi4OHwjheuucEYu_hVQGUqa8QJhaJnk-bOLn82M8zHFeuzKTYdDPRNOneydllug9wK7tRheGV" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/60 dark:from-slate-900/95 dark:to-slate-900/80"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                Booste ta carrière au <span className="text-blue-200">Burkina Faso</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-medium mb-10 leading-relaxed max-w-lg">
                Découvre nos guides et conseils stratégiques pour réussir ton insertion professionnelle dans le marché local avec des experts du domaine.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-white text-primary font-bold rounded-full flex items-center gap-2 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                  Explorer les guides
                  <span className="material-symbols-outlined font-bold">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Advice Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto dark:bg-slate-900">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Piliers de Réussite</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-md text-lg">Des ressources actionnables conçues pour le contexte professionnel d'Afrique de l'Ouest.</p>
            </div>
            <div className="hidden md:block h-[2px] flex-grow mx-12 bg-slate-100 dark:bg-slate-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="group bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/40 transition-all duration-300 flex flex-col h-full">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl font-light dark:text-slate-300 group-hover:text-white">{pillar.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">{pillar.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{pillar.description}</p>
                <a href="#" className="inline-flex items-center text-primary font-bold text-sm group-hover:gap-3 transition-all dark:text-blue-400">
                  Lire la suite
                  <span className="material-symbols-outlined ml-1 text-lg">arrow_right_alt</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Articles */}
        <section className="bg-slate-50 dark:bg-slate-800/50 py-24 px-6 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Articles récents</h2>
              <button className="flex items-center gap-2 text-primary dark:text-blue-400 font-bold hover:gap-3 transition-all">
                Tout voir
                <span className="material-symbols-outlined">trending_flat</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {articles.map((article, idx) => (
                <article key={idx} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[16/10] bg-slate-200 dark:bg-slate-700">
                    <img alt={article.category} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={article.image} />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {article.category}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-6">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary dark:text-blue-400">
                      {article.authorInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{article.author}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{article.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto rounded-[2rem] bg-primary relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-900 dark:from-primary/80 dark:to-slate-900"></div>
            <div className="relative z-10 px-8 py-16 md:px-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl text-white">
                <h2 className="text-4xl font-bold mb-4 tracking-tight">Prêt à transformer ton parcours ?</h2>
                <p className="text-blue-100 text-lg opacity-90 leading-relaxed">
                  Rejoins des milliers d'étudiants et professionnels qui ont trouvé leur voie grâce à StageLink Burkina.
                </p>
              </div>
              <div>
                <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 whitespace-nowrap">
                  Créer mon profil
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
