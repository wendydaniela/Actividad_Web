import { useState } from 'react';

const DICE_TYPES = [
  { id: 'd4', sides: 4, label: 'D4' },
  { id: 'd6', sides: 6, label: 'D6' },
  { id: 'd8', sides: 8, label: 'D8' },
  { id: 'd10', sides: 10, label: 'D10' },
  { id: 'd12', sides: 12, label: 'D12' },
  { id: 'd20', sides: 20, label: 'D20' },
  { id: 'd100', sides: 100, label: 'D100' },
];

export default function DiceModule() {
  const [selectedDie, setSelectedDie] = useState(DICE_TYPES[5]); // D20 por defecto
  const [currentRoll, setCurrentRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState([]);

  const rollDice = () => {
    setIsRolling(true);

    // Pequeña animación de simulación de lanzamiento
    setTimeout(() => {
      const result = Math.floor(Math.random() * selectedDie.sides) + 1;
      const newEntry = {
        id: Date.now(),
        die: selectedDie.label,
        sides: selectedDie.sides,
        result,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setCurrentRoll(newEntry);
      setHistory((prev) => [newEntry, ...prev.slice(0, 9)]); // Guarda las últimas 10 tiradas
      setIsRolling(false);
    }, 200);
  };

  // Detectar si es éxito crítico o pifia en un D20
  const isCriticalSuccess = currentRoll?.sides === 20 && currentRoll?.result === 20;
  const isCriticalFail = currentRoll?.sides === 20 && currentRoll?.result === 1;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-400 mb-2">Bandeja de Dados</h2>
        <p className="text-sm text-slate-400">
          Selecciona el tipo de dado poliédrico y ejecuta tu lanzamiento en tiempo real.
        </p>
      </div>

      {/* Selector de Dados */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
          1. Elige tu dado
        </label>
        
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 mb-6">
          {DICE_TYPES.map((die) => (
            <button
              key={die.id}
              onClick={() => {
                setSelectedDie(die);
                setCurrentRoll(null);
              }}
              className={`py-3 px-2 rounded-xl border font-bold text-sm transition cursor-pointer ${
                selectedDie.id === die.id
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              {die.label}
            </button>
          ))}
        </div>

        {/* Botón de Lanzar */}
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="w-full py-4 px-6 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-extrabold text-base tracking-wide rounded-xl transition shadow-lg shadow-amber-500/15 cursor-pointer"
        >
          {isRolling ? 'Lanzando...' : `Lanzar ${selectedDie.label}`}
        </button>
      </div>

      {/* Resultado Destacado */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
        {currentRoll ? (
          <div className={`text-center transition-all duration-300 ${isRolling ? 'opacity-40 scale-90' : 'opacity-100 scale-100'}`}>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-2">
              Resultado ({currentRoll.die})
            </span>
            
            <div
              className={`text-7xl sm:text-8xl font-black tracking-tight my-2 ${
                isCriticalSuccess
                  ? 'text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                  : isCriticalFail
                  ? 'text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                  : 'text-amber-400'
              }`}
            >
              {currentRoll.result}
            </div>

            {isCriticalSuccess && (
              <span className="inline-block mt-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full">
                ¡ÉXITO CRÍTICO! (20 Natural)
              </span>
            )}
            {isCriticalFail && (
              <span className="inline-block mt-2 px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold rounded-full">
                ¡PIFIA CRÍTICA! (1 Natural)
              </span>
            )}
          </div>
        ) : (
          <div className="text-center text-slate-500">
            <div className="text-4xl font-bold text-slate-700 mb-2">{selectedDie.label}</div>
            <p className="text-sm">Presiona el botón superior para lanzar el dado</p>
          </div>
        )}
      </div>

      {/* Historial de Lanzamientos */}
      {history.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Historial Reciente
            </h3>
            <button
              onClick={() => setHistory([])}
              className="text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer"
            >
              Limpiar
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs"
              >
                <span className="text-slate-400 font-medium">{item.die}:</span>
                <span className="font-bold text-amber-400">{item.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}