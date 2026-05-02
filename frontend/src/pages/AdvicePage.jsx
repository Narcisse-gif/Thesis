import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  featuredPillars,
  getArticleById,
  recentArticleIds,
} from '../data/adviceArticles';

export default function AdvicePage() {
  const navigate = useNavigate();

  const pillars = useMemo(
    () =>
      featuredPillars
        .map((pillar) => ({
          ...pillar,
          article: getArticleById(pillar.articleId),
        }))
        .filter((pillar) => pillar.article),
    [],
  );

  const articles = useMemo(
    () => recentArticleIds.map((id) => getArticleById(id)).filter(Boolean),
    [],
  );

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-slate-900 font-display transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        <section className="relative min-h-[550px] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0 border-b border-primary/20">
            <img
              alt="Modern business environment"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVptdVuKenROB0DwMvnIaV5NmtQgmzgcdOUrKCHvfZmTdW1Fn9Sk6tOvt0b5SaYMijolc8rkKlBQCPXf3rFO2xrpWI8ViGrHSbAa6Y_21SMqf3hv5SH4lHp66YMuQQuvYkh4yzPIJNLBK3THK9kwj3gyB53XrpJL2DC8WJQaYJ0pXSFPDvMhOvJ5l2g04q9isvr0Wdi4OHwjheuucEYu_hVQGUqa8QJhaJnk-bOLn82M8zHFeuzKTYdDPRNOneydllug9wK7tRheGV"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/60"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                Booste ta carriere au <span className="text-blue-200">Burkina Faso</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 font-medium mb-10 leading-relaxed max-w-lg">
                Decouvre des articles concrets pour mieux candidater, reussir tes entretiens et
                accelerer ton insertion professionnelle.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Piliers de reussite
              </h2>
              <p className="text-slate-600 max-w-md text-lg">
                Des guides utiles, ecrits pour le contexte du recrutement et de l’emploi local.
              </p>
            </div>
            <div className="hidden md:block h-[2px] flex-grow mx-12 bg-slate-100"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.articleId}
                className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl font-light group-hover:text-white">
                    {pillar.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                  {pillar.description}
                </p>
                <button
                  className="inline-flex items-center text-primary font-bold text-sm group-hover:gap-3 transition-all"
                  onClick={() => navigate(`/conseils/article/${pillar.article.id}`)}
                  type="button"
                >
                  Lire l'article
                  <span className="material-symbols-outlined ml-1 text-lg">arrow_right_alt</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-24 px-6 border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Articles recents
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/conseils/article/${article.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      navigate(`/conseils/article/${article.id}`);
                    }
                  }}
                >
                  <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[16/10] bg-slate-200">
                    <img
                      alt={article.category}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={article.image}
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                      {article.category}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-6">
                    {article.description}
                  </p>
                  <div className="mt-auto">
                    <span className="text-[11px] text-slate-500 font-semibold">
                      {article.readTime}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto rounded-[2rem] bg-primary relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-900"></div>
            <div className="relative z-10 px-8 py-16 md:px-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl text-white">
                <h2 className="text-4xl font-bold mb-4 tracking-tight">
                  Pret a transformer ton parcours ?
                </h2>
                <p className="text-blue-100 text-lg opacity-90 leading-relaxed">
                  Cree ton profil et passe de la lecture a l’action avec StageLink Burkina.
                </p>
              </div>
              <div>
                <button
                  className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 whitespace-nowrap"
                  onClick={() => navigate('/inscription')}
                  type="button"
                >
                  Creer mon profil
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
