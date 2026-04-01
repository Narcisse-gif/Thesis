import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function ApplicationFormPage() {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/etudiant/candidatures');
  };
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="mb-6 flex items-center gap-2">
            <button 
              className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
              onClick={() => navigate(-1)}
            >
              <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
              Retour à l'offre
            </button>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-200">
            <header className="mb-10 text-center">
              <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Postuler à cette offre</h1>
              <p className="text-slate-500 max-w-lg mx-auto font-medium">Complétez les informations ci-dessous pour soumettre votre candidature au poste de <strong className="text-slate-700">Développeur Fullstack Senior</strong> chez <strong className="text-primary">Coris Tech Solutions</strong>.</p>
            </header>

            <form className="space-y-12" onSubmit={handleSubmit}>
              {/* Section 1: Informations Personnelles */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <span className="material-symbols-outlined text-primary">person</span>
                  <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px]">Informations Personnelles</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-slate-600 ml-1">Nom Complet <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Jean-Baptiste Kaboré" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-slate-600 ml-1">Adresse E-mail <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      placeholder="jean.k@domain.bf" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[13px] font-bold text-slate-600 ml-1">Numéro de Téléphone <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      placeholder="+226 -- -- -- --" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Section 2: Profil Académique et Professionnel */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <span className="material-symbols-outlined text-primary">school</span>
                  <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px]">Profil Académique &amp; Professionnel</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[13px] font-bold text-slate-600 ml-1">Université / École <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Université Joseph Ki-Zerbo" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-slate-600 ml-1">Domaine d'Études <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Génie Logiciel" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-slate-600 ml-1">Niveau d'Expérience <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium appearance-none" required>
                        <option value="">Sélectionnez un niveau</option>
                        <option value="1">Étudiant de premier cycle</option>
                        <option value="2">Étudiant en Master / Doctorat</option>
                        <option value="3">Débutant (0-2 ans)</option>
                        <option value="4">Professionnel (2+ ans)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: Chargement de Documents */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <span className="material-symbols-outlined text-primary">upload_file</span>
                  <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px]">Documents Requis</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1 mb-2">
                      <label className="text-[13px] font-bold text-slate-600">Curriculum Vitae (CV) <span className="text-red-500">*</span></label>
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">PDF, DOCX (Max: 5Mo)</span>
                    </div>
                    <div className="relative group cursor-pointer">
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" required />
                      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center transition-all group-hover:bg-primary/5 group-hover:border-primary/50 group-hover:shadow-inner bg-slate-50">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary !text-[32px] mb-3 transition-colors">cloud_upload</span>
                        <p className="text-[15px] font-bold text-slate-700 group-hover:text-primary">Cliquez pour télécharger le CV</p>
                        <p className="text-[13px] font-medium text-slate-400 mt-1">ou glissez-déposez le fichier ici</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1 mb-2">
                      <label className="text-[13px] font-bold text-slate-600">Lettre de Motivation</label>
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">Optionnel</span>
                    </div>
                    <div className="relative group cursor-pointer">
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center transition-all group-hover:bg-primary/5 group-hover:border-primary/50 group-hover:shadow-inner bg-slate-50">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-primary !text-[32px] mb-3 transition-colors">description</span>
                        <p className="text-[15px] font-bold text-slate-700 group-hover:text-primary">Cliquez pour télécharger la lettre</p>
                        <p className="text-[13px] font-medium text-slate-400 mt-1">ou glissez-déposez le fichier ici</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="text-[13px] font-bold text-slate-600 ml-1">Message optionnel à l'entreprise</label>
                  <textarea 
                    rows={4}
                    placeholder="Exprimez brièvement votre motivation ou précisez votre disponibilité..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[15px] font-medium placeholder:text-slate-400 resize-none"
                  ></textarea>
                </div>
              </section>

              <div className="pt-6">
                <button type="submit" className="w-full bg-primary text-white py-4 sm:py-5 rounded-2xl font-black text-[16px] shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-blue-800 flex items-center justify-center gap-3">
                  Soumettre ma candidature
                  <span className="material-symbols-outlined">send</span>
                </button>
                <p className="text-center text-[12px] font-medium text-slate-400 mt-4">
                  En soumettant cette candidature, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
