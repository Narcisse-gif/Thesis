import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Adresse e-mail</label>
              <input 
                className="block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-primary focus:border-primary transition duration-150 outline-none" 
                id="email" 
                name="email" 
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
                <a className="font-medium text-primary hover:underline hover:text-blue-800 transition-colors" href="#">Mot de passe oublié ?</a>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-200 transform active:scale-[0.98]" 
              type="button"
              onClick={() => {
                // Determine redirect basically randomly for prototype/demo
                // We'll navigate to student dashboard by default
                navigate('/etudiant/dashboard');
              }}
            >
              Se connecter
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
    </main>
  );
}
