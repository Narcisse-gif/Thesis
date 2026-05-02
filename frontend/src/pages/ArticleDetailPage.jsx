import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { adviceArticles, getArticleById } from '../data/adviceArticles';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = getArticleById(id);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return adviceArticles
      .filter((item) => item.id !== article.id && item.category === article.category)
      .slice(0, 2);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1 min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-black mb-4">Article introuvable</h1>
          <p className="text-slate-600 max-w-md mb-8">
            Le lien ne correspond a aucun article disponible pour le moment.
          </p>
          <button
            onClick={() => navigate('/conseils')}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-bold"
            type="button"
          >
            Retour aux conseils
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/65 to-white"></div>
          </div>
          <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-28">
            <Link
              to="/conseils"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-semibold mb-10"
            >
              <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
              Retour aux conseils
            </Link>
            <div className="max-w-3xl">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-xs font-black uppercase tracking-[0.2em]">
                {article.category}
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                {article.title}
              </h1>
              <p className="mt-6 text-lg text-white/85 leading-relaxed">{article.description}</p>
              <div className="mt-8">
                <p className="text-sm font-semibold text-white/80">{article.readTime}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
            <article className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-10">
              <p className="text-lg leading-8 text-slate-700">{article.intro}</p>

              <div className="mt-10 space-y-10">
                {article.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-black text-slate-900 mb-4">{section.heading}</h2>
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-slate-700 leading-8">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </article>

            <aside className="space-y-6">
              <div className="bg-slate-50 rounded-[2rem] border border-slate-100 p-6">
                <h3 className="text-lg font-black text-slate-900 mb-4">A retenir</h3>
                <div className="space-y-3">
                  {article.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary !text-[18px] mt-0.5">
                        check_circle
                      </span>
                      <p className="text-sm text-slate-700 leading-6">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-[2rem] border border-slate-100 p-6 shadow-sm">
                  <h3 className="text-lg font-black text-slate-900 mb-4">A lire aussi</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((item) => (
                      <button
                        key={item.id}
                        className="w-full text-left rounded-2xl border border-slate-100 p-4 hover:border-primary/20 hover:bg-slate-50 transition-colors"
                        onClick={() => navigate(`/conseils/article/${item.id}`)}
                        type="button"
                      >
                        <p className="text-xs font-black uppercase tracking-[0.15em] text-primary mb-2">
                          {item.category}
                        </p>
                        <p className="text-sm font-bold text-slate-900 leading-6">{item.title}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
