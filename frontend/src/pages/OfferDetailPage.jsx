import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';

export default function OfferDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/offers/${id}`).then(res => {
      setOffer(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id]);

  const handleApplyClick = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('user_role');
    if (!token || role !== 'STUDENT') {
      alert("Vous devez Ãªtre inscrit en tant qu'Ã©tudiant pour postuler Ã  une offre.");
      navigate('/inscription/etudiant');
    } else {
      navigate(`/postuler/${id}`);
    }
  };

  if (loading) return <div className="text-center py-20 font-bold">Chargement...</div>;
  if (!offer) return <div className="text-center py-20 font-bold text-red-500">Offre introuvable</div>;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Main Form-Like Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          
          {/* Header Section of the Card */}
          <div className="p-6 sm:p-10 border-b border-slate-100 bg-slate-50/50">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-5">
                  <span className="px-3 py-1 rounded-md bg-blue-100/80 text-blue-700 text-[11px] font-black uppercase tracking-widest border border-blue-200/50">Active</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight uppercase tracking-tight mb-5">{offer.title}</h1>
                
                <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl border border-slate-200 p-1.5 bg-white flex items-center justify-center overflow-hidden shadow-sm">
                      <img alt="Coris Logo" className="object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRHT2NNrWpuk-W6HWlT2RV5lUqNvZTetTbdIC6Xt_sRVD3GIrgbnIIHmN-fC2w54ekeM6tukChqOZ7N18XrLhhob0ox1-rvEHhtPWYw_FLms0NyIN0kXrj4xRhjDszvTmXDXQrnyQ_6-IS5wRPAg7i3WU3mv7dLJr_0rwgsbBObQLCcCo8aBiFvOjWLX_UpO_PKFcjPTrnHqDUNbBcK5TFgu9ACydC15AUbEAakZkequxD0s8IH0kpEQ2_SkbW6quWTOjnxeRXKmvP" />
                    </div>
                    <span className="font-extrabold text-primary uppercase text-[15px] tracking-wide">{offer.enterprise?.companyName || 'L\'entreprise'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[14px] font-medium border-l border-slate-300 pl-5 sm:pl-8">
                    <span className="material-symbols-outlined text-primary !text-[20px]">location_on</span>
                    <span>Ouagadougou</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] font-medium">
                    <span className="material-symbols-outlined text-primary !text-[20px]">schedule</span>
                    <span>CDI (Temps plein)</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] font-bold text-slate-800">
                    <span className="material-symbols-outlined text-primary !text-[20px]">payments</span>
                    <span>5,4M - 7,2M FCFA</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-5 max-w-[240px] shadow-sm">
                  <p className="text-[11px] text-amber-800/80 font-black uppercase tracking-widest mb-1.5">Date limite</p>
                  <p className="text-[18px] font-black text-amber-900">15 / 03 / 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Body: Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* Left Column: Main Info */}
            <div className="lg:col-span-2 p-6 sm:p-10 lg:border-r border-slate-100 space-y-12">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">feed</span>
                  Description du poste
                </h3>
                <div className="text-slate-600 leading-relaxed space-y-4 text-[15px]">
                  <p>En tant que DÃ©veloppeur Fullstack chez <strong className="text-slate-800">{offer.enterprise?.companyName || 'L\'entreprise'}</strong> Ã  Ouagadougou, vous ferez partie d'une Ã©quipe agile et passionnÃ©e par l'innovation. Votre mission principale sera de concevoir, dÃ©velopper et maintenir des solutions de paiement robustes et scalables.</p>
                  <p>Nous recherchons un profil capable de s'adapter rapidement aux nouveaux dÃ©fis technologiques et de proposer des architectures modernes rÃ©pondant aux exigences du marchÃ© Ouest-Africain.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-5 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">target</span>
                  Missions et ResponsabilitÃ©s
                </h3>
                <ul className="space-y-4">
  {offer.requiredSkills ? offer.requiredSkills.map((skill, index) => (
    <li key={index} className="flex gap-4">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2.5"></div>
      <span className="text-slate-700 font-medium">{skill}</span>
    </li>
  )) : <li className="text-slate-500">Non spÃ©cifiÃ©</li>}
</ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">school</span>
                  Profil recherchÃ© &amp; Qualifications
                </h3>
                <div className="space-y-6">
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h4 className="font-extrabold text-slate-900 text-[14px] mb-2 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Formation
                    </h4>
                    <p className="text-slate-600 text-[15px] ml-3.5">Bac + 5 en Informatique, GÃ©nie Logiciel ou tout autre diplÃ´me Ã©quivalent.</p>
                  </div>
                  
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h4 className="font-extrabold text-slate-900 text-[14px] mb-2 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> ExpÃ©rience
                    </h4>
                    <p className="text-slate-600 text-[15px] ml-3.5">Minimum 3 Ã  5 ans d'expÃ©rience significative dans le dÃ©veloppement d'applications web complexes.</p>
                  </div>
                  
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                    <h4 className="font-extrabold text-slate-900 text-[14px] mb-3 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Exigences
                    </h4>
                    <ul className="space-y-2.5 text-[15px] text-slate-600 ml-3.5 list-disc pl-4 marker:text-slate-300">
                      <li>MaÃ®trise parfaite de JavaScript (ES6+), TypeScript, Node.js et React.</li>
                      <li>Excellente comprÃ©hension des architectures microservices et des conteneurs (Docker).</li>
                      <li>CapacitÃ© Ã  travailler en Ã©quipe dans un environnement agile.</li>
                      <li>Rigueur dans la qualitÃ© du code et les tests automatisÃ©s.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <div className="pt-8 border-t border-slate-100">
                <button 
                  className="w-full md:w-auto px-12 py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
                  onClick={handleApplyClick}
                >
                  <span className="material-symbols-outlined">send</span>
                  Postuler Ã  cette offre
                </button>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="bg-slate-50/50 p-6 sm:p-10 space-y-10">
              
              <div>
                <div className="bg-slate-900 px-6 py-2.5 -mx-6 sm:-mx-10 -mt-6 sm:-mt-10 mb-8 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-white !text-[18px]">corporate_fare</span>
                  <span className="text-white font-bold text-[12px] uppercase tracking-widest">Ã€ propos de l'entreprise</span>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-2xl border border-slate-200 p-3 bg-white flex items-center justify-center overflow-hidden mb-5 shadow-sm">
                    <img alt="Coris Logo" className="object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRHT2NNrWpuk-W6HWlT2RV5lUqNvZTetTbdIC6Xt_sRVD3GIrgbnIIHmN-fC2w54ekeM6tukChqOZ7N18XrLhhob0ox1-rvEHhtPWYw_FLms0NyIN0kXrj4xRhjDszvTmXDXQrnyQ_6-IS5wRPAg7i3WU3mv7dLJr_0rwgsbBObQLCcCo8aBiFvOjWLX_UpO_PKFcjPTrnHqDUNbBcK5TFgu9ACydC15AUbEAakZkequxD0s8IH0kpEQ2_SkbW6quWTOjnxeRXKmvP" />
                  </div>
                  <h4 className="font-black text-slate-900 text-lg uppercase tracking-tight">{offer.enterprise?.companyName || 'L\'entreprise'}</h4>
                  <p className="text-[13px] font-bold text-slate-400 mt-1">Groupe Coris Bank Int.</p>
                  
                  <p className="mt-5 text-[14px] text-slate-600 leading-relaxed font-medium">
                    {offer.enterprise?.companyName || 'L\'entreprise'} est l'entitÃ© technologique du Groupe Coris, dÃ©diÃ©e Ã  l'innovation financiÃ¨re et digitale dans la zone UEMOA.
                  </p>
                  
                  <div className="w-full mt-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 text-left">
                    <div className="flex items-center gap-3 text-[13px] font-semibold text-slate-700">
                      <span className="material-symbols-outlined text-primary !text-[18px]">location_on</span>
                      <span>{offer.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[13px] font-semibold text-slate-700">
                      <span className="material-symbols-outlined text-primary !text-[18px]">business_center</span>
                      <span>Fintech / IT</span>
                    </div>
                  </div>
                  
                  <button
                    className="w-full mt-8 py-3 bg-white border-2 border-primary text-primary text-[13px] font-bold rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                    onClick={() => navigate(`/entreprises/${offer.enterprise?.id}`)}
                  >
                    <span className="material-symbols-outlined !text-[18px]">visibility</span>
                    Voir le profil complet
                  </button>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined !text-[16px]">redeem</span>
                  Avantages inclus
                </h4>
                <div className="grid grid-cols-1 gap-3 text-left">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-colors cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined !text-[18px]">health_and_safety</span>
                    </div>
                    <span className="text-[14px] font-bold text-slate-700">Assurance SantÃ© 100%</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-colors cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined !text-[18px]">laptop</span>
                    </div>
                    <span className="text-[14px] font-bold text-slate-700">MatÃ©riel de pointe</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-colors cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined !text-[18px]">restaurant</span>
                    </div>
                    <span className="text-[14px] font-bold text-slate-700">Prise en charge dÃ©jeuner</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8 text-center">
                <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-5">Partagez cette offre</p>
                <div className="flex justify-center gap-4">
                  <button className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 hover:text-primary text-slate-500 transition-colors shadow-sm">
                    <span className="material-symbols-outlined !text-[18px]">link</span>
                  </button>
                  <button className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 hover:text-primary text-slate-500 transition-colors shadow-sm">
                    <span className="material-symbols-outlined !text-[18px]">share</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Jobs Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-bold text-slate-900">Offres Similaires</h3>
            <button className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all text-[14px]">
              Voir tout <span className="material-symbols-outlined !text-[20px]">arrow_right_alt</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Similar Job 1 */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                  <img alt="Orange" className="object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7RupCWQGvQElZ7Epn43Xc3o2K10bz9-Ph1DS9Dx_CbPSuN-HntJhnpOx0-nkTl4cyDSFFej17w89SJ5VfprjzjJtIwT6Ues3bgsgYoZ9nfmkq5Cbq30aSCWiRQkgCXr_gyDKPUKRY0cBTh2Bzcp0ZolUmxVDJjB-e77oI-VRSKMWWO4kBWHj9yzLGH6dsTFfvkrh7W5QZBJ4gtXNX_5hzbtGRV2NQadqf5MFu4-K_AlN7lOrfGJX6uPf6HAuIdaqyVqO44lTDPHgT" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-blue-50/80 text-primary border border-blue-100 rounded-md">CDI</span>
              </div>
              <h4 className="font-bold text-[16px] text-slate-900 group-hover:text-primary transition-colors line-clamp-1">Architecte Cloud</h4>
              <p className="text-[13px] font-medium text-slate-500 mt-1 mb-5">Orange Burkina Faso</p>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-[14px]">location_on</span> Ouaga 2000</span>
                <span>Il y a 2j</span>
              </div>
            </div>

            {/* Similar Job 2 */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                  <img alt="Moov" className="object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARVyZKbB6lJNakNqT_V7UCQKvHByUrAQKP35dffP_IXu1qd8QpyLuOZZyH7V0XqJPp1tK3O4veSL6szWp6VAIZWojU64px2P8-8sM06KDpmOoD-iPecIQYpy56aI56AXQszNQ3SW_BxWRiMtk1gi_h94psL9Ewxgb6QF0oAzl8HaQCNm2oBQoATQ1nXbHM-X84krB28k2rK2NKx57QVQY8FW17i-dExrg9iWfqARLfEzkSXt221xsCkHjRIcUKKIQDnBGbkGdL4D4f" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-md">Freelance</span>
              </div>
              <h4 className="font-bold text-[16px] text-slate-900 group-hover:text-primary transition-colors line-clamp-1">Expert CybersÃ©curitÃ©</h4>
              <p className="text-[13px] font-medium text-slate-500 mt-1 mb-5">Moov Africa BF</p>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-[14px]">location_on</span> Bobo-Dioulasso</span>
                <span>Il y a 1sem</span>
              </div>
            </div>

            {/* Similar Job 3 */}
            <div className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer hidden md:block">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                  <img alt="Sonabel" className="object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsDyneC4_VQjcoPN3GH8HFw6_LWKLiJy8mgUZ981Xh6tcSsbmoqT7gK7upewIO0H8VVIVSqvfYvFkvub6DdAioB-69-mU66S7t946NizdQkRB8FLAEg3bwfq8uNCcUGLKXGmIA7GTSI63yrIcwmUiwLs5_DdS1RdrP66uUgCk083B7nORK707inw5-1NCN3mqYrUnIA0O2nDUJndHCY6QmNt23zuOTueWecjI0b_m6BIKwjHnTSOOMkh2KbtD6c6UHdpT-GBuQJam7" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-blue-50 text-blue-600 border border-blue-200/50 rounded-md">Stage</span>
              </div>
              <h4 className="font-bold text-[16px] text-slate-900 group-hover:text-primary transition-colors line-clamp-1">DÃ©veloppeur Mobile</h4>
              <p className="text-[13px] font-medium text-slate-500 mt-1 mb-5">Digital Innovators Hub</p>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined !text-[14px]">location_on</span> Koudougou</span>
                <span className="text-primary">Ã€ l'instant</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

