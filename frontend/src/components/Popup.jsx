import React from 'react';

export default function Popup({ open, onClose, title, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative border-2 border-blue-100 animate-fade-in">
        <span className="material-symbols-outlined text-blue-500 text-5xl mb-4">info</span>
        <h2 className="text-2xl font-extrabold mb-3 text-blue-700">{title}</h2>
        <p className="mb-8 text-slate-700 text-base leading-relaxed">{message}</p>
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/30"
          onClick={onClose}
        >
          Continuer vers l'inscription
        </button>
      </div>
      <style>{`.animate-fade-in{animation:fadeIn .2s ease}`}
      </style>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}
