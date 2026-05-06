import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const getExcerpt = (text, maxLength = 180) => {
    const clean = (text || '').toString().replace(/\s+/g, ' ').trim();
    if (!clean) return '';
    if (clean.length <= maxLength) return clean;
    return `${clean.slice(0, maxLength).trim()}...`;
  };

  const getReadTime = (text) => {
    const words = (text || '').toString().trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(3, Math.round(words / 200));
    return `${minutes} min de lecture`;
  };

  const paragraphs = useMemo(() => {
    const content = (article?.content || '').toString().trim();
    if (!content) return [];
    return content
      .split(/\n{2,}/)
      .map((block) => block.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
  }, [article]);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setErrorMsg('');
        const [detailResponse, listResponse] = await Promise.all([
          api.get(`/articles/${id}`),
          api.get('/articles'),
        ]);
        const fetchedArticle = detailResponse.data || null;
        if (!fetchedArticle) {
          setArticle(null);
          setRelatedArticles([]);
          setErrorMsg('Article introuvable');
          return;
        }
        setArticle(fetchedArticle);
        const allArticles = Array.isArray(listResponse.data) ? listResponse.data : [];
        const related = allArticles
          .filter((item) => item?.id && item.id !== fetchedArticle.id)
          .filter((item) =>
            fetchedArticle.category
              ? item.category === fetchedArticle.category
              : true,
          )
          .slice(0, 2);
        setRelatedArticles(related);
      } catch (error) {
        console.error('Failed to load article:', error);
        setArticle(null);
        setRelatedArticles([]);
        setErrorMsg('Impossible de charger cet article.');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1 min-h-[60vh] flex items-center justify-center px-6 text-center">
          <p className="text-slate-600">Chargement de l'article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1 min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-black mb-4">Article introuvable</h1>
          <p className="text-slate-600 max-w-md mb-8">
            {errorMsg || 'Le lien ne correspond a aucun article disponible pour le moment.'}
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
            {article.image ? (
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-slate-900" />
            )}
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
                {article.category || 'Conseils'}
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                {article.title}
              </h1>
              <p className="mt-6 text-lg text-white/85 leading-relaxed">
                {getExcerpt(article.content)}
              </p>
              <div className="mt-8">
                <p className="text-sm font-semibold text-white/80">{getReadTime(article.content)}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-10">
            <article className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-10">
              {paragraphs.length === 0 ? (
                <p className="text-lg leading-8 text-slate-700">
                  Le contenu de cet article sera bientot disponible.
                </p>
              ) : (
                <div className="space-y-6">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-slate-700 leading-8">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </article>

            <aside className="space-y-6">
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
