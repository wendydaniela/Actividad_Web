import { useState } from 'react';
import BestiaryModule from './modules/BestiaryModule';
import LootModule from './modules/LootModule';
import DiceModule from './modules/DiceModule';

export default function App() {
  const [currentTab, setCurrentTab] = useState('bestiary');

  return (
    <div className="min-h-screen bg-[#12100e] text-[#e7e2d8] flex flex-col selection:bg-red-900 selection:text-white">
      
      {/* Encabezado estilo portada de manual */}
      <header className="border-b-2 border-red-900/60 bg-[#181512] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-[#f4efe6]">
              Dungeon Master & Dragons :p
            </h1>
          </div>
          
          <nav className="flex gap-1 border-b border-stone-800 sm:border-none w-full sm:w-auto justify-center">
            {[
              { id: 'bestiary', label: 'Bestiario' },
              { id: 'loot', label: 'Tesoro y Botín' },
              { id: 'dice', label: 'Dados' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
                  currentTab === tab.id
                    ? 'border-red-600 text-red-400 bg-red-950/20'
                    : 'border-transparent text-stone-400 hover:text-stone-200 hover:border-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 py-8 px-4 max-w-5xl w-full mx-auto">
        {currentTab === 'bestiary' && <BestiaryModule />}
        {currentTab === 'loot' && <LootModule />}
        {currentTab === 'dice' && <DiceModule />}
      </main>

      {/* Pie de página discreto */}
      <footer className="border-t border-stone-800/80 py-4 px-4 text-center text-xs text-stone-500">
        Gracias por ver :D
      </footer>
    </div>
  );
}