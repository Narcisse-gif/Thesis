import { Link, useNavigate } from 'react-router-dom';

export default function EnterpriseRegisterPage() {
  const navigate = useNavigate();

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden bg-white text-gray-900 font-display">
      {/* Left Visual Side */}
      <section className="hidden lg:flex relative bg-primary flex-col justify-center p-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Entrepreneur africain professionnel dans un bureau moderne" 
            className="w-full h-full object-cover opacity-30 mix-blend-multiply" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_P3NMxUs_Y8s0oUjPLKonneUgvInOrn0emgc_Ch95HWykcegaaVsS2qrKN_KyuBqjUXMkkzznWFGFfNOt_Aw5Iq9BBpK1e18dwuiW-yfwAWIWe1_OT1APkgIch_060l01LTAdA4CZLNPSgTBUn4WK-PqNtE24E9htP3E1EUOZN5zAWOGtMOL3vcGirC54nVgC50okpLojKVrb7zs00k1e0uSITAmBK20BK7ESkSV7Yx7eTeuDLr2MbwIOvj1qr9_E6ehjRn6HvZfr" 
          />
        </div>
        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
            Développez votre impact au Burkina Faso.
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed">
            Rejoignez le réseau StageLink et connectez-vous avec les meilleurs talents émergents pour propulser votre entreprise vers de nouveaux sommets.
          </p>
        </div>
        <div className="absolute bottom-12 left-16 z-10">
          <div className="h-1 w-24 bg-white opacity-50"></div>
        </div>
      </section>

      {/* Right Form Side */}
      <section className="flex flex-col bg-white overflow-y-auto custom-scrollbar">
        <div className="max-w-xl w-full mx-auto px-8 md:px-12 py-10">
          {/* Header Section */}
          <header className="mb-8 text-left">
            <h2 className="text-3xl font-bold text-primary mb-2">Créer un compte entreprise</h2>
            <p className="text-gray-500">Veuillez renseigner vos informations pour vous inscrire.</p>
          </header>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
            {/* Informations Générales Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-2 text-primary">Informations Générales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="company_name">Nom de l'entreprise</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors text-sm outline-none" id="company_name" name="company_name" placeholder="Ex: Faso Tech Solutions" required type="text" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="email">Email Professionnel</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors text-sm outline-none" id="email" name="email" placeholder="contact@entreprise.bf" required type="email" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="phone">Téléphone</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors text-sm outline-none" id="phone" name="phone" placeholder="+226 XX XX XX XX" required type="tel" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="logo">Logo de l'entreprise</label>
                  <input accept="image/*" className="w-full px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors text-sm file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 cursor-pointer" id="logo" name="logo" type="file" />
                </div>
              </div>
            </div>

            {/* Informations de Localisation Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-2 text-primary">Informations de localisation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="address">Adresse</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors text-sm outline-none" id="address" name="address" placeholder="Rue ou Avenue, Secteur..." required type="text" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="city">Ville</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors appearance-none bg-white text-sm outline-none cursor-pointer" defaultValue="" id="city" name="city" required>
                    <option disabled value="">Sélectionner</option>
                    <option value="ouagadougou">Ouagadougou</option>
                    <option value="bobo">Bobo-Dioulasso</option>
                    <option value="koudougou">Koudougou</option>
                    <option value="banfora">Banfora</option>
                    <option value="ouahigouya">Ouahigouya</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="postal_code">Code Postal</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors text-sm outline-none" id="postal_code" name="postal_code" placeholder="BP / Code" type="text" />
                </div>
              </div>
            </div>

            {/* Activité & Sécurité Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-2 text-primary">Activité & Sécurité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="sector">Secteur d'activité</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors appearance-none bg-white text-sm outline-none cursor-pointer" defaultValue="" id="sector" name="sector" required>
                    <option disabled value="">Sélectionner</option>
                    <option value="it">Informatique / Technologie</option>
                    <option value="finance">Banque / Finance</option>
                    <option value="agro">Agro-industrie</option>
                    <option value="com">Communication / Marketing</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="password">Mot de passe</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors text-sm outline-none" id="password" name="password" placeholder="••••••••" required type="password" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="password_confirmation">Confirmer le mot de passe</label>
                  <input className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors text-sm outline-none" id="password_confirmation" name="password_confirmation" placeholder="••••••••" required type="password" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="description">Description de l'entreprise</label>
                  <textarea className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors text-sm outline-none" id="description" name="description" placeholder="Parlez-nous brièvement de votre activité..." rows="2"></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95" 
                type="button" 
                onClick={() => navigate('/entreprise/dashboard')}
              >
                <span className="text-sm">Créer mon compte entreprise</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Legal Notice */}
          <p className="mt-6 text-center text-[10px] text-gray-400 leading-relaxed">
            En cliquant sur s'inscrire, vous acceptez nos <a className="text-primary underline font-medium" href="#">Conditions d'Utilisation</a> et notre <a className="text-primary underline font-medium" href="#">Politique de Confidentialité</a>.
          </p>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Déjà inscrit ? <Link className="text-primary font-bold hover:underline ml-1" to="/connexion">Connectez-vous</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
