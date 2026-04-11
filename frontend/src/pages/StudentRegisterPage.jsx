import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';

export default function StudentRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    university: '',
    study_level: 'licence1',
    study_field: '',
    city: '',
    password: '',
    password_confirmation: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      setErrorMsg('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        role: 'STUDENT',
        firstName: formData.first_name,
        lastName: formData.last_name,
      };
      
      const response = await api.post('/auth/register', payload);
      
      // Update additional profile info if needed (city, phone, field)
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      localStorage.setItem('user_role', 'STUDENT');

      await api.patch('/users/profile', {
        phoneNumber: formData.phone,
        location: formData.city,
        fieldOfStudy: formData.study_field,
        studyLevel: formData.study_level,
        university: formData.university
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/etudiant/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 h-screen overflow-hidden bg-white text-gray-900 font-display">
      {/* Left Visual Side */}
      <section className="hidden lg:flex relative bg-primary flex-col justify-center p-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Étudiant africain travaillant sur un ordinateur portable" 
            className="w-full h-full object-cover opacity-30 mix-blend-multiply" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuByNt2RUZBDzQ5w1zR7g3XW8QLXB20WrgL3naM4o1IdUybriee2X-aXisfrm8A4KYgNGPeMlDrGr3A0XQKNS7pPv3piDIq_Nuyf6ry9PI9GY1T4DnjH5gVmn0LZ3MSw1nJ-BRPX1CAYFM5Ls7LpBQSnq8GJogmCgDVSVPzqhrhqTalPWheck-ar9YRFrFnT5vEiTjh6h2bw13mgRo6TgBsR-eqwBgrsd2nHSReNAGOSg9V6YcE42LVYxMLO7aSgkMUqNMPEXiRq3xjw" 
          />
        </div>
        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
            Propulsez votre carrière au Burkina Faso.
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Rejoignez la plus grande plateforme de mise en relation entre étudiants et entreprises innovantes.
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
            <h2 className="text-3xl font-bold text-primary mb-2">Créer un compte étudiant</h2>
            <p className="text-gray-500">Veuillez renseigner vos informations pour vous inscrire.</p>
          </header>

          <form className="space-y-6" onSubmit={handleRegister}>
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                {errorMsg}
              </div>
            )}
            {/* Informations Personnelles Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-2 text-primary">Informations Personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="first_name">Prénom</label>
                  <input value={formData.first_name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm outline-none" id="first_name" name="first_name" placeholder="Ex: Moussa" required type="text" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="last_name">Nom</label>
                  <input value={formData.last_name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm outline-none" id="last_name" name="last_name" placeholder="Ex: Traoré" required type="text" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="email">Email</label>
                  <input value={formData.email} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm outline-none" id="email" name="email" placeholder="moussa@exemple.bf" required type="email" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="phone">Téléphone</label>
                  <input value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm outline-none" id="phone" name="phone" placeholder="+226 XX XX XX XX" required type="tel" />
                </div>
              </div>
            </div>

            {/* Parcours Académique Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-2 text-primary">Parcours Académique</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="university">Université / Institut</label>
                  <select value={formData.university} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors appearance-none bg-white text-sm outline-none cursor-pointer" id="university" name="university" required>
                    <option disabled value="">Sélectionner</option>
                    <option value="bit">BIT Ouaga</option>
                    <option value="unb">UNB Bobo</option>
                    <option value="uo">Université Joseph Ki-Zerbo</option>
                    <option value="u-aube">Aube Nouvelle</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="study_level">Niveau d'étude</label>
                  <select value={formData.study_level} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors appearance-none bg-white text-sm outline-none cursor-pointer" id="study_level" name="study_level" required>
                    <option value="licence1">Licence 1</option>
                    <option value="licence2">Licence 2</option>
                    <option value="licence3">Licence 3</option>
                    <option value="master1">Master 1</option>
                    <option value="master2">Master 2</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="study_field">Domaine d'étude</label>
                  <input value={formData.study_field} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm outline-none" id="study_field" name="study_field" placeholder="Ex: Informatique, Gestion..." required type="text" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="city">Ville</label>
                  <input value={formData.city} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm outline-none" id="city" name="city" placeholder="Ouagadougou" required type="text" />
                </div>
              </div>
            </div>

            {/* Sécurité Section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 border-b pb-2 text-primary">Sécurité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="password">Mot de passe</label>
                  <input value={formData.password} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm outline-none" id="password" name="password" placeholder="••••••••" required type="password" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-1" htmlFor="password_confirmation">Confirmer le mot de passe</label>
                  <input value={formData.password_confirmation} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-sm outline-none" id="password_confirmation" name="password_confirmation" placeholder="••••••••" required type="password" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                className={`w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                type="submit" 
                disabled={loading}
              >
                <span className="text-sm">{loading ? 'Création de votre compte...' : 'S\'inscrire'}</span>
                {!loading && <span className="material-symbols-outlined text-sm">arrow_forward</span>}
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
              Déjà inscrit ? <Link className="text-primary font-bold hover:underline hover:text-blue-800 ml-1" to="/connexion">Connectez-vous</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
