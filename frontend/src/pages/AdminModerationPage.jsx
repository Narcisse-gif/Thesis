import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminDashboardLayout from '../components/AdminDashboardLayout';
import api from '../services/api';

export default function AdminModerationPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('offres');

  const [offers, setOffers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingProfiles, setLoadingProfiles] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'offres' || tab === 'kyc') {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const [offersRes, usersRes] = await Promise.all([
          api.get('/admin/offers'),
          api.get('/admin/users'),
        ]);

        const pending = (offersRes.data || []).filter((offer) => offer.status === 'EN_ATTENTE');
        const mapped = pending.map((offer) => ({
          id: offer.id,
          title: offer.title,
          company: offer.enterprise?.companyName || 'Entreprise',
          type: offer.contractType === 'STAGE' ? 'Offre de stage' : 'Offre d\'emploi',
          date: offer.createdAt ? new Date(offer.createdAt).toLocaleDateString('fr-FR') : '—',
        }));
        setOffers(mapped);

        const apiBaseUrl = api.defaults.baseURL || '';
        const resolveLogoUrl = (value) => {
          if (!value) return '';
          if (value.startsWith('http')) return value;
          if (value.startsWith('/uploads/')) return `${apiBaseUrl}${value}`;
          return value;
        };

        const pendingEnterprises = (usersRes.data || [])
          .filter((user) => user.role === 'ENTERPRISE' && !user.isVerified)
          .map((user) => {
            const enterprise = user.enterpriseProfile || {};
            const name = enterprise.companyName || user.email;
            return {
              id: user.id,
              name,
              sector: enterprise.industry || 'Secteur',
              date: user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : '—',
              logo: resolveLogoUrl(enterprise.logoUrl),
            };
          });

        setProfiles(pendingEnterprises);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingOffers(false);
        setLoadingProfiles(false);
      }
    };

    fetchPending();
  }, []);

  const handleVerifyEnterprise = async (userId) => {
    try {
      await api.patch(`/admin/enterprises/${userId}/verify`, { isVerified: true, isSuspended: false });
      setProfiles((prev) => prev.filter((profile) => profile.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectEnterprise = async (userId) => {
    try {
      await api.patch(`/admin/enterprises/${userId}/verify`, { isVerified: false, isSuspended: true });
      setProfiles((prev) => prev.filter((profile) => profile.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleModerateOffer = async (offerId, status) => {
    try {
      await api.patch(`/admin/moderate/${offerId}`, { status });
      setOffers((prev) => prev.filter((offer) => offer.id !== offerId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Modération</h2>
          <p className="text-slate-500 mt-1.5 text-[15px]">Approuvez ou rejetez les contenus soumis avant leur publication.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button 
          onClick={() => setActiveTab('offres')} 
          className={`py-3 px-6 text-[14px] font-bold ${activeTab === 'offres' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Offres en attente {offers.length > 0 && <span className="ml-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{offers.length}</span>}
        </button>
        <button 
          onClick={() => setActiveTab('kyc')} 
          className={`py-3 px-6 text-[14px] font-bold ${activeTab === 'kyc' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Entreprises {profiles.length > 0 && <span className="ml-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full">{profiles.length}</span>}
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden w-full">
        {activeTab === 'offres' && (
          <div className="divide-y divide-slate-100">
            {loadingOffers ? (
              <div className="p-6 text-slate-500">Chargement...</div>
            ) : offers.length === 0 ? (
              <div className="p-6 text-slate-500">Aucune offre en attente.</div>
            ) : offers.map(o => (
              <div key={o.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100 shrink-0">
                    <span className="material-symbols-outlined !text-[24px]">work</span>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-slate-900">{o.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[13px] font-medium text-slate-500">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">apartment</span> {o.company}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">category</span> {o.type}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">schedule</span> {o.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleModerateOffer(o.id, 'EXPIREE')}
                    className="px-5 py-2.5 bg-white border border-rose-200 text-rose-600 font-bold text-[13px] rounded-xl hover:bg-rose-50 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined !text-[18px]">close</span> Rejeter
                  </button>
                  <button
                    onClick={() => handleModerateOffer(o.id, 'ACTIVE')}
                    className="px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[13px] rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-2 flex-1 md:flex-auto justify-center"
                  >
                    <span className="material-symbols-outlined !text-[18px]">check</span> Approuver
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'kyc' && (
          <div className="divide-y divide-slate-100">
            {loadingProfiles ? (
              <div className="p-6 text-slate-500">Chargement...</div>
            ) : profiles.length === 0 ? (
              <div className="p-6 text-slate-500">Aucun profil en attente.</div>
            ) : profiles.map(p => (
              <div key={p.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shrink-0">
                      <span className="material-symbols-outlined !text-[24px]">apartment</span>
                    </div>
                  )}
                  <div>
                    <h4 className="text-[16px] font-bold text-slate-900">{p.name}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[13px] font-medium text-slate-500">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">category</span> {p.sector}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined !text-[16px]">schedule</span> {p.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRejectEnterprise(p.id)}
                    className="px-5 py-2.5 bg-white border border-rose-200 text-rose-600 font-bold text-[13px] rounded-xl hover:bg-rose-50 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined !text-[18px]">close</span> Rejeter
                  </button>
                  <button
                    onClick={() => handleVerifyEnterprise(p.id)}
                    className="px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[13px] rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined !text-[18px]">check</span> Valider
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
