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
  const [selectedDie, setSelectedDie] = useState(DICE_TYPES[5]);
  const [currentRoll, setCurrentRoll] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState([]);

  const rollDice = () => {
    setIsRolling(true);

    setTimeout(() => {
      const result = Math.floor(Math.random() * selectedDie.sides) + 1;
      const newEntry = {
        id: Date.now(),
        die: selectedDie.label,
        sides: selectedDie.sides,
        result,
      };

      setCurrentRoll(newEntry);
      setHistory((prev) => [newEntry, ...prev.slice(0, 9)]);
      setIsRolling(false);
    }, 180);
  };

  const isCriticalSuccess = currentRoll?.sides === 20 && currentRoll?.result === 20;
  const isCriticalFail = currentRoll?.sides === 20 && currentRoll?.result === 1;

  return (
    <div>
      <div className="mb-6 border-b border-stone-800 pb-4">
        <h2 className="text-2xl font-serif font-bold text-[#f4efe6] mb-1">Bandeja de Dados</h2>
        <p className="text-sm text-stone-400">Elige un dado y procede a ejetucar tu tirada</p>
      </div>

      {/* Selector de Dados */}
      <div className="bg-[#1a1714] border border-stone-800 rounded-lg p-6 mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
          Seleccionar Dado
        </label>
        
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 mb-6">
          {DICE_TYPES.map((die) => (
            <button
              key={die.id}
              onClick={() => {
                setSelectedDie(die);
                setCurrentRoll(null);
              }}
              className={`py-3 px-2 rounded-lg border font-bold text-sm transition-colors cursor-pointer ${
                selectedDie.id === die.id
                  ? 'bg-red-900/50 text-[#f4efe6] border-red-600'
                  : 'bg-[#12100e] text-stone-400 border-stone-800 hover:border-stone-600 hover:text-stone-200'
              }`}
            >
              {die.label}
            </button>
          ))}
        </div>

        <button
          onClick={rollDice}
          disabled={isRolling}
          className="w-full py-3.5 px-6 bg-red-800 hover:bg-red-700 active:scale-[0.99] text-[#f4efe6] font-semibold text-base rounded-lg transition-colors cursor-pointer"
        >
          {isRolling ? 'Lanzando...' : `Lanzar ${selectedDie.label}`}
        </button>
      </div>

      {/* Resultado Destacado */}
      <div className="bg-[#1a1714] border border-stone-800 rounded-lg p-8 mb-6 flex flex-col items-center justify-center min-h-[200px]">
        {currentRoll ? (
          <div className={`text-center transition-opacity duration-200 ${isRolling ? 'opacity-30' : 'opacity-100'}`}>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 block mb-1">
              Tirada de {currentRoll.die}
            </span>
            
            <div
              className={`text-7xl sm:text-8xl font-serif font-bold my-2 ${
                isCriticalSuccess
                  ? 'text-emerald-400'
                  : isCriticalFail
                  ? 'text-red-500'
                  : 'text-[#f4efe6]'
              }`}
            >
              {currentRoll.result}
            </div>

            {isCriticalSuccess && (
              <span className="inline-block mt-2 px-3 py-1 bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold rounded">
                Crítico Natural (20)
              </span>
            )}
            {isCriticalFail && (
              <span className="inline-block mt-2 px-3 py-1 bg-red-950/60 border border-red-800 text-red-400 text-xs font-semibold rounded">
                Pifia Natural (1)
              </span>
            )}
          </div>
        ) : (
          <div className="text-center text-stone-500">
            <div className="text-4xl font-serif font-bold text-stone-700 mb-2">{selectedDie.label}</div>
            <p className="text-sm">Ya puedes lanzar :D</p>
          </div>
        )}
      </div>

      {/* Historial */}
      {history.length > 0 && (
        <div className="bg-[#1a1714] border border-stone-800 rounded-lg p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Historial de Tiradas con Dados
            </h3>
            <button
              onClick={() => setHistory([])}
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors cursor-pointer"
            >
              Limpiar
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-[#12100e] border border-stone-800 px-3 py-1.5 rounded flex items-center gap-2 text-xs"
              >
                <span className="text-stone-400">{item.die}:</span>
                <span className="font-bold text-[#f4efe6]">{item.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}