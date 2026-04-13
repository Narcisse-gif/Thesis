import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirm, setResetConfirm] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;
      
      // Stocker le token pour axios
      localStorage.setItem('token', access_token);
      localStorage.setItem('user_role', user.role);
      
      // Redirection dynamique
      if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else if (user.role === 'ENTERPRISE') navigate('/entreprise/dashboard');
      else navigate('/etudiant/dashboard');
    } catch (err) {
      if (err.response?.status === 503) {
        setErrorMsg('Plateforme en maintenance. Connexion reservee aux administrateurs.');
      } else {
        setErrorMsg(err.response?.data?.message || 'Erreur lors de la connexion. Vérifiez vos identifiants.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReset = async () => {
    setResetStatus('');
    try {
      const response = await api.post('/auth/request-password-reset', { email: resetEmail });
      setResetToken(response.data.resetToken || '');
      setResetStatus('Un code a ete genere. Utilisez-le pour reinitialiser votre mot de passe.');
    } catch (err) {
      setResetStatus(err.response?.data?.message || 'Erreur lors de la demande.');
    }
  };

  const handleResetPassword = async () => {
    if (!resetToken || !resetPassword) {
      setResetStatus('Token et nouveau mot de passe requis.');
      return;
    }
    if (resetPassword !== resetConfirm) {
      setResetStatus('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      await api.post('/auth/reset-password', { token: resetToken, newPassword: resetPassword });
      setResetStatus('Mot de passe mis a jour. Vous pouvez vous connecter.');
      setResetPassword('');
      setResetConfirm('');
    } catch (err) {
      setResetStatus(err.response?.data?.message || 'Erreur lors de la reinitialisation.');
    }
  };

  return (
    <main className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-gray-50 text-gray-900 font-display">
      {/* Left Column - Brand Imagery avec overlay bleu (fidèle à la maquette) */}
      <section className="hidden md:flex md:w-1/2 relative bg-primary overflow-hidden">
        {/* Photo de fond */}
        <img 
          alt="Young African Professional" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxS1O1_0-ZJzmosZLKXPXNFnU8rsSInsl6ZiimcwDIlbObJRWxkP-XuPx3kVzfFwzuO7WlDJ38MWhLM9EZVf6j73uATfdJ8E0LmSTygU4Uo-usj8_7tgQyiTvFd6vvNKCRGTtNhKZVUceN5kRAsHNLwPEx13O9G5dhEWdhedCncDz0-1KdkJBEOEPM0tjvs9MysMsz0ylYEhJZHTHHz-w4GGiPrRN65r7qzYdr4g5HGP9ZG1eIVM-okSvdvX6JDo_P7RuufxJI9_ho" 
        />
        {/* Overlay bleu à 80% sans texte */}
        <div 
          className="absolute inset-0 z-10"
          style={{ background: 'rgba(30, 64, 175, 0.8)' }}
        />

      </section>

      {/* Right Column - Login Form */}
      <section className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 md:p-12 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">Connexion</h2>
            <p className="text-gray-500">Ravi de vous revoir ! Veuillez vous connecter à votre compte.</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                {errorMsg}
              </div>
            )}
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Adresse e-mail</label>
              <input 
                className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary transition duration-150 outline-none" 
                id="email" 
                name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="moussa@exemple.bf" 
                required 
                type="email" 
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Mot de passe</label>
              <div className="relative">
                <input 
                  className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary transition duration-150 outline-none" 
                  id="password" 
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? 'text' : 'password'} 
                />
                <button 
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${showPassword ? 'text-primary' : 'text-gray-400'} hover:text-gray-600`} 
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer" 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                />
                <label className="ml-2 block text-sm text-gray-700 cursor-pointer" htmlFor="remember-me">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <button className="font-medium text-primary hover:underline hover:text-blue-800 transition-colors" type="button" onClick={() => setShowReset(true)}>
                  Mot de passe oublié ?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className={`w-full py-3 px-4 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 transform active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ? 
              <Link className="font-semibold text-primary hover:underline hover:text-blue-800 transition-colors ml-1" to="/inscription">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </section>

      {showReset && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">Reinitialiser le mot de passe</h3>
              <button
                onClick={() => setShowReset(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined !text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
                <input
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              <button
                className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all text-sm"
                type="button"
                onClick={handleRequestReset}
              >
                Generer un code
              </button>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Token</label>
                <input
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nouveau mot de passe</label>
                <input
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]"
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirmer le mot de passe</label>
                <input
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium text-[15px]"
                  type="password"
                  value={resetConfirm}
                  onChange={(e) => setResetConfirm(e.target.value)}
                />
              </div>
              {resetStatus && <p className="text-sm text-slate-600">{resetStatus}</p>}
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setShowReset(false)}
                className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-colors text-sm"
                type="button"
              >
                Fermer
              </button>
              <button
                onClick={handleResetPassword}
                className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm"
                type="button"
              >
                Reinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
