import { useState } from 'react';

export default function HeaderSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const submit = (event) => {
    event.preventDefault();
    onSearch?.(query.trim());
  };

  return (
    <form onSubmit={submit} className="w-full max-w-xl">
      <label className="sr-only" htmlFor="global-offer-search">Recherche globale d'offres</label>
      <div className="relative">
        <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 !text-[20px]">search</span>
        <input
          id="global-offer-search"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-12 text-sm font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="Rechercher une offre, une entreprise, un domaine..."
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          aria-label="Lancer la recherche"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-800"
          type="submit"
        >
          Go
        </button>
      </div>
    </form>
  );
}
