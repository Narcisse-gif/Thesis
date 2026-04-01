import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-white/10 pt-12 pb-8 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img alt="StageLink Burkina Logo" className="h-10 w-auto object-contain" src={logo} />
            <h2 className="text-white text-xl font-bold">StageLink Burkina</h2>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">
            La première plateforme de mise en relation entre étudiants et entreprises au Burkina Faso. Ensemble pour l'excellence professionnelle.
          </p>
        </div>

        {/* Plateforme Column */}
        <div>
          <h4 className="font-bold text-white mb-6 text-base">Plateforme</h4>
          <ul className="space-y-3 text-sm text-blue-100">
            <li><Link className="hover:text-white transition-colors" to="/emplois">Parcourir les offres</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/entreprises">Liste des entreprises</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/stages">Offres de stage</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/inscription">S'inscrire</Link></li>
          </ul>
        </div>

        {/* Ressources Column */}
        <div>
          <h4 className="font-bold text-white mb-6 text-base">Ressources</h4>
          <ul className="space-y-3 text-sm text-blue-100">
            <li><Link className="hover:text-white transition-colors" to="/conseils">Conseils d'entretien</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/conseils">Blog Carrière</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/conseils">Modèles de CV</Link></li>
            <li><Link className="hover:text-white transition-colors" to="/conseils">Success Stories</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-bold text-white mb-6 text-base">Contact</h4>
          <ul className="space-y-3 text-sm text-blue-100">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">mail</span>
              contact@stagelink.bf
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">phone</span>
              +226 25 XX XX XX
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">location_on</span>
              Ouagadougou, Burkina Faso
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-200/60">
        <p>© 2026 StageLink Burkina Faso. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link className="hover:text-white transition-colors" to="/">Mentions Légales</Link>
          <Link className="hover:text-white transition-colors" to="/">Confidentialité</Link>
          <Link className="hover:text-white transition-colors" to="/">CGU</Link>
        </div>
      </div>
    </footer>
  );
}
