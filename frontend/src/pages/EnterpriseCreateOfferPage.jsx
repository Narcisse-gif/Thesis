import EnterpriseDashboardLayout from '../components/EnterpriseDashboardLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../services/api';

export default function EnterpriseCreateOfferPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [contractType, setContractType] = useState('CDI');
  
  const [formData, setFormData] = useState({
    title: '',
    salaryOrStipend: '',
    location: '',
    durationMonths: '',
    possibleHiring: 'À définir',
    minExperience: 'Débutant (0 - 1 an)',
    description: '',
    candidateProfile: '',
    benefits: '',
    requiredSkills: '',
    applicationDeadline: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    setFormData({ ...formData, requiredSkills: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        contractType,
        salaryOrStipend: formData.salaryOrStipend ? parseInt(formData.salaryOrStipend, 10) : null,
        requiredSkills: formData.requiredSkills ? formData.requiredSkills.split(',').map(s => s.trim()) : [],
        requiredDocuments: ['CV'], // Mock for now, can be updated later
        applicationDeadline: formData.applicationDeadline ? new Date(formData.applicationDeadline).toISOString() : null,
      };
      
      await api.post('/offers', payload);
      navigate('/entreprise/offres');
    } catch (err) {
      console.error(err);
      const status = err.response?.status;
      const apiMessage = err.response?.data?.message;
      if (status === 403) {
        if (apiMessage && apiMessage.toLowerCase().includes('suspendu')) {
          setError('Votre compte entreprise est suspendu. Vous ne pouvez pas publier d\'offres.');
        } else {
          setError('Votre entreprise doit etre verifiee par un admin avant de publier des offres.');
        }
      } else {
        setError(apiMessage || 'Erreur lors de la creation de l\'offre');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <EnterpriseDashboardLayout>
      {/* Header Section */}
      <div className="flex flex-col mb-10 text-center sm:text-left">
        <span className="text-primary font-bold tracking-tight text-xl mb-1">Nouvelle Offre</span>
        <h2 className="text-slate-600 font-medium">Création de l'annonce étape {step}/3</h2>
      </div>

      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="mb-8 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-[14px] font-semibold text-rose-700">
            {error}
          </div>
        )}
        {/* Stepper Navigation */}
        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-8 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {/* Step 1 */}
          <div className={`flex items-center gap-3 flex-shrink-0 cursor-pointer transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-40'}`} onClick={() => setStep(1)}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 1 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400'}`}>1</div>
            <div className="hidden sm:block">
              <p className={`text-[10px] uppercase tracking-widest font-bold ${step >= 1 ? 'text-primary' : 'text-slate-500'}`}>Étape 1</p>
              <p className={`text-sm font-semibold ${step >= 1 ? 'text-slate-900' : 'text-slate-500'}`}>Détails du poste</p>
            </div>
          </div>
          <div className={`h-px w-8 sm:w-12 transition-colors ${step >= 2 ? 'bg-primary/50' : 'bg-slate-200'}`}></div>
          
          {/* Step 2 */}
          <div className={`flex items-center gap-3 flex-shrink-0 cursor-pointer transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-40'}`} onClick={() => setStep(2)}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 2 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400'}`}>2</div>
            <div className="hidden sm:block">
              <p className={`text-[10px] uppercase tracking-widest font-bold ${step >= 2 ? 'text-primary' : 'text-slate-500'}`}>Étape 2</p>
              <p className={`text-sm font-semibold ${step >= 2 ? 'text-slate-900' : 'text-slate-500'}`}>Description</p>
            </div>
          </div>
          <div className={`h-px w-8 sm:w-12 transition-colors ${step >= 3 ? 'bg-primary/50' : 'bg-slate-200'}`}></div>
          
          {/* Step 3 */}
          <div className={`flex items-center gap-3 flex-shrink-0 cursor-pointer transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-40'}`} onClick={() => setStep(3)}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 3 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-100 text-slate-400'}`}>3</div>
            <div className="hidden sm:block">
              <p className={`text-[10px] uppercase tracking-widest font-bold ${step >= 3 ? 'text-primary' : 'text-slate-500'}`}>Étape 3</p>
              <p className={`text-sm font-semibold ${step >= 3 ? 'text-slate-900' : 'text-slate-500'}`}>Compétences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          
          {/* Main Form Section */}
          <div className="max-w-3xl mx-auto space-y-8 w-full">
            
            {step === 1 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100/50 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Informations de base</h3>
                
                <div className="grid grid-cols-1 gap-8">
                  {/* Job Title */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Titre de l'offre</label>
                    <input className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700" placeholder="Ex: Développeur Fullstack Senior" type="text" />
                  </div>
                  
                  {/* Contract Type */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Type de contrat</label>
                    <div className="grid grid-cols-3 gap-3">
                      <button onClick={() => setContractType('CDI')} className={`py-3 px-2 rounded-xl border-2 font-bold text-[14px] transition-all shadow-sm ${contractType === 'CDI' ? 'border-primary bg-blue-50/50 text-primary' : 'border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>CDI</button>
                      <button onClick={() => setContractType('CDD')} className={`py-3 px-2 rounded-xl border-2 font-bold text-[14px] transition-all shadow-sm ${contractType === 'CDD' ? 'border-primary bg-blue-50/50 text-primary' : 'border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>CDD</button>
                      <button onClick={() => setContractType('Stage')} className={`py-3 px-2 rounded-xl border-2 font-bold text-[14px] transition-all shadow-sm ${contractType === 'Stage' ? 'border-primary bg-blue-50/50 text-primary' : 'border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>Stage</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Salary or Stipend */}
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">{contractType === 'Stage' ? "Indemnité mensuelle (Optionnel)" : "Salaire mensuel (Optionnel)"}</label>
                      <div className="relative">
                        <input className="w-full pl-5 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700" placeholder={contractType === 'Stage' ? "50 000" : "450 000"} type="number" />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-[13px]">FCFA</span>
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div className="space-y-3">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Localisation</label>
                      <div className="relative">
                        <input className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700" placeholder="Ouagadougou" type="text" />
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 !text-[20px]">location_on</span>
                      </div>
                    </div>
                  </div>

                  {/* Stage specifics */}
                  {contractType === 'Stage' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pt-6 border-t border-slate-100/60">
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Durée du stage</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[15px] font-medium text-slate-700 cursor-pointer appearance-none">
                          <option>Moins de 3 mois</option>
                          <option>3 à 6 mois</option>
                          <option>Plus de 6 mois</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Embauche possible ?</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[15px] font-medium text-slate-700 cursor-pointer appearance-none">
                          <option>À définir</option>
                          <option>Oui</option>
                          <option>Non</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CDD & CDI Specifics */}
                  {(contractType === 'CDD' || contractType === 'CDI') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pt-6 border-t border-slate-100/60">
                      {contractType === 'CDD' && (
                        <div className="space-y-3">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Durée du CDD (Mois)</label>
                          <input className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700" placeholder="Ex: 12" type="number" />
                        </div>
                      )}
                      <div className={`space-y-3 ${contractType === 'CDI' ? 'md:col-span-2' : ''}`}>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Expérience minimale requise</label>
                        <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-[15px] font-medium text-slate-700 cursor-pointer appearance-none">
                          <option>Débutant (0 - 1 an)</option>
                          <option>Junior (1 - 3 ans)</option>
                          <option>Confirmé (3 - 5 ans)</option>
                          <option>Senior (+ 5 ans)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100/50 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Description de l'offre {contractType === 'Stage' ? 'de stage' : "d'emploi"}</h3>
                
                <div className="grid grid-cols-1 gap-8">
                  {/* Detailed Description */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                      {contractType === 'Stage' ? 'Objectifs pédagogiques & Missions' : 'À propos du poste & Responsabilités'}
                    </label>
                    <textarea rows="5" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700 resize-none" placeholder={contractType === 'Stage' ? "Décrivez ce que le stagiaire va apprendre, ses tâches..." : "Décrivez les responsabilités principales, le contexte de l'équipe..."}></textarea>
                  </div>
                  
                  {/* Profil recherché */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                      {contractType === 'Stage' ? "Niveau d'études & Profil recherché" : 'Profil recherché (Pré-requis)'}
                    </label>
                    <textarea rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700 resize-none" placeholder={contractType === 'Stage' ? "Ex: Étudiant(e) en Licence/Master Informatique..." : "Ex: Bac+5 en Informatique, 3 ans d'expérience..."}></textarea>
                  </div>

                  {/* Avantages */}
                  {contractType !== 'Stage' && (
                    <div className="space-y-3 pt-6 border-t border-slate-100/60">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Avantages & Bénéfices</label>
                      <textarea rows="3" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700 resize-none" placeholder="Assurance santé, primes, télétravail..."></textarea>
                    </div>
                  )}

                  {/* Convention Info */}
                  {contractType === 'Stage' && (
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100/50 mt-4">
                      <span className="material-symbols-outlined text-amber-500">info</span>
                      <p className="text-[13px] font-medium text-amber-800">Une convention de stage signée par l'établissement sera exigée lors de l'embauche du candidat.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100/50 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Compétences & Finalisation</h3>
                
                <div className="grid grid-cols-1 gap-8">
                  {/* Skills tags */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Compétences souhaitées</label>
                    <div className="relative">
                      <input className="w-full pl-5 pr-16 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 outline-none text-[15px] font-medium text-slate-700" placeholder="Ex: React, Node.js, Gestion de projet..." type="text" />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-200 text-slate-600 rounded-xl hover:bg-slate-300 transition-colors">
                        <span className="material-symbols-outlined !text-[20px]">add</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-3">
                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-[13px]">React <button><span className="material-symbols-outlined !text-[14px]">close</span></button></span>
                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-[13px]">Node.js <button><span className="material-symbols-outlined !text-[14px]">close</span></button></span>
                       <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-[13px]">TypeScript <button><span className="material-symbols-outlined !text-[14px]">close</span></button></span>
                    </div>
                  </div>

                  {/* Documents Requirement */}
                  <div className="space-y-3 pt-6 border-t border-slate-100/60">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Pièces demandées à la candidature</label>
                    <div className="flex flex-wrap gap-4">
                      {/* Standard Requirements */}
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                        <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
                        <span className="text-[13px] font-semibold text-slate-700">CV (Obligatoire)</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                        <input type="checkbox" defaultChecked className="accent-primary w-4 h-4 rounded" />
                        <span className="text-[13px] font-semibold text-slate-700">Lettre de motivation</span>
                      </label>

                      {/* Stage Specifics */}
                      {contractType === 'Stage' && (
                        <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                          <input type="checkbox" className="accent-primary w-4 h-4 rounded" />
                          <span className="text-[13px] font-semibold text-slate-700">Portfolio / Travaux d'école</span>
                        </label>
                      )}

                      {/* CDD / CDI Specifics */}
                      {(contractType === 'CDI' || contractType === 'CDD') && (
                         <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                           <input type="checkbox" className="accent-primary w-4 h-4 rounded" />
                           <span className="text-[13px] font-semibold text-slate-700">Références ou attestations de travail</span>
                         </label>
                      )}
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="space-y-3 pt-4">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Date limite de candidature</label>
                    <div className="relative">
                      <input className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-slate-500 outline-none text-[15px] font-medium" type="date" />
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 !text-[20px]">calendar_month</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
              {step > 1 ? (
                 <button className="w-full sm:w-auto px-8 py-3.5 text-slate-500 font-bold hover:text-slate-800 transition-colors bg-white sm:bg-transparent rounded-2xl sm:rounded-none border border-slate-200 sm:border-transparent flex items-center justify-center gap-2" onClick={() => setStep(step - 1)}>
                   <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
                   Précédent
                 </button>
              ) : (
                 <button className="w-full sm:w-auto px-8 py-3.5 text-slate-500 font-bold hover:text-slate-800 transition-colors bg-white sm:bg-transparent rounded-2xl sm:rounded-none border border-slate-200 sm:border-transparent" onClick={() => navigate('/entreprise/offres')}>Annuler</button>
              )}
              
              {step < 3 ? (
                <button className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/25 hover:bg-blue-800 transition-all flex items-center justify-center gap-2" onClick={() => setStep(step + 1)}>
                  Continuer
                  <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                </button>
              ) : (
                <button disabled={loading} className="w-full sm:w-auto px-10 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/25 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70" onClick={handleSubmit}>
                  <span className="material-symbols-outlined !text-[18px]">{loading ? 'sync' : 'check_circle'}</span>
                  {loading ? 'Publication...' : "Publier l'offre"}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </EnterpriseDashboardLayout>  );
}
