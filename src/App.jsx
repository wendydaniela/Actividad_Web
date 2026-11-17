import { useState } from 'react';
import BestiaryModule from './modules/BestiaryModule';

export default function App() {
  const [currentTab, setCurrentTab] = useState('bestiary');

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      
      {/* Barra de navegación superior */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-wider text-amber-400">
              DM Assistant <span className="text-xs font-normal text-slate-400">D&D 5e</span>
            </h1>
          </div>
          
          <nav className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-sm">
            <button
              onClick={() => setCurrentTab('bestiary')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentTab === 'bestiary'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bestiario
            </button>
            <button
              onClick={() => setCurrentTab('loot')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentTab === 'loot'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Loot / Botín
            </button>
            <button
              onClick={() => setCurrentTab('dice')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentTab === 'dice'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dados
            </button>
          </nav>
        </div>
      </header>

      {/* Contenido principal según la pestaña activa */}
      <main className="flex-1 py-6 px-4">
        {currentTab === 'bestiary' && <BestiaryModule />}
        
        {currentTab === 'loot' && (
          <div className="max-w-4xl mx-auto text-center py-20 text-slate-400">
            <h2 className="text-2xl font-bold text-amber-400 mb-2">Generador de Loot (Próximamente)</h2>
            <p className="text-sm">Aquí generaremos recompensas basadas en el nivel del monstruo.</p>
          </div>
        )}

        {currentTab === 'dice' && (
          <div className="max-w-4xl mx-auto text-center py-20 text-slate-400">
            <h2 className="text-2xl font-bold text-amber-400 mb-2">Bandeja de Dados (Próximamente)</h2>
            <p className="text-sm">Aquí implementaremos el lanzador de dados interactivo (d4 a d100).</p>
          </div>
        )}
      </main>

      {/* Pie de página */}
      <footer className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-500">
        Dungeon Master Assistant - D&D 5e Web & Mobile App
      </footer>
    </div>
  );
}