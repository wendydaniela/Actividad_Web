import { useState, useEffect } from 'react';
import { fetchEquipment, fetchMagicItems, fetchItemDetails } from '../services/dndApi';

export default function LootModule() {
  const [challengeRating, setChallengeRating] = useState('0-4');
  const [equipmentList, setEquipmentList] = useState([]);
  const [magicItemsList, setMagicItemsList] = useState([]);
  const [lootResult, setLootResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar catálogos al montar el módulo
  useEffect(() => {
    async function loadCatalogs() {
      const [equip, magic] = await Promise.all([
        fetchEquipment(),
        fetchMagicItems()
      ]);
      setEquipmentList(equip);
      setMagicItemsList(magic);
    }
    loadCatalogs();
  }, []);

  const generateLoot = async () => {
    if (equipmentList.length === 0) return;
    setLoading(true);

    // 1. Generar monedas aleatorias según el nivel de desafío
    let coins = { cp: 0, sp: 0, gp: 0, pp: 0 };
    let itemCount = 1;
    let useMagicPool = false;

    if (challengeRating === '0-4') {
      coins.cp = Math.floor(Math.random() * 100) + 20;
      coins.sp = Math.floor(Math.random() * 50) + 10;
      coins.gp = Math.floor(Math.random() * 15) + 1;
      itemCount = 1;
      useMagicPool = false;
    } else if (challengeRating === '5-10') {
      coins.sp = Math.floor(Math.random() * 200) + 50;
      coins.gp = Math.floor(Math.random() * 150) + 30;
      itemCount = Math.floor(Math.random() * 2) + 1; // 1 a 2 objetos
      useMagicPool = Math.random() > 0.4; // 60% probabilidad de ítem mágico
    } else if (challengeRating === '11-16') {
      coins.gp = Math.floor(Math.random() * 800) + 200;
      coins.pp = Math.floor(Math.random() * 50) + 10;
      itemCount = 2;
      useMagicPool = true;
    } else {
      // CR 17+
      coins.gp = Math.floor(Math.random() * 3000) + 1000;
      coins.pp = Math.floor(Math.random() * 300) + 50;
      itemCount = 3;
      useMagicPool = true;
    }

    // 2. Seleccionar objetos aleatorios reales de la API
    const pool = useMagicPool && magicItemsList.length > 0 ? magicItemsList : equipmentList;
    const selectedItems = [];

    for (let i = 0; i < itemCount; i++) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      const randomItem = pool[randomIndex];
      const details = await fetchItemDetails(randomItem.url);
      if (details) {
        selectedItems.push(details);
      }
    }

    setLootResult({
      cr: challengeRating,
      coins,
      items: selectedItems,
      isMagic: useMagicPool
    });
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-400 mb-2">Generador de Loot (Botín)</h2>
        <p className="text-sm text-slate-400">
          Selecciona el Nivel de Desafío (CR) del encuentro para generar monedas y objetos reales de la API.
        </p>
      </div>

      {/* Panel de Configuración */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Rango de Nivel de Desafío (Challenge Rating)
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { id: '0-4', label: 'CR 0 - 4', desc: 'Encuentro Menor' },
            { id: '5-10', label: 'CR 5 - 10', desc: 'Desafío Moderado' },
            { id: '11-16', label: 'CR 11 - 16', desc: 'Peligro Alto' },
            { id: '17+', label: 'CR 17+', desc: 'Tesoro Legendario' }
          ].map((tier) => (
            <button
              key={tier.id}
              onClick={() => setChallengeRating(tier.id)}
              className={`p-3 rounded-xl border text-left transition ${
                challengeRating === tier.id
                  ? 'bg-amber-500/15 border-amber-500 text-amber-400'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-bold text-sm">{tier.label}</div>
              <div className="text-xs opacity-75">{tier.desc}</div>
            </button>
          ))}
        </div>

        <button
          onClick={generateLoot}
          disabled={loading || equipmentList.length === 0}
          className="w-full py-3.5 px-6 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/10 cursor-pointer"
        >
          {loading ? 'Generando recompensa...' : 'Generar Recompensa Aleatoria'}
        </button>
      </div>

      {/* Resultados del Botín */}
      {lootResult && (
        <div className="space-y-6 animate-fade-in">
          {/* Sección de Monedas */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Monedas Obtenidas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <span className="text-xs text-amber-700 font-bold block">COBRE (CP)</span>
                <span className="text-2xl font-bold text-slate-200">{lootResult.coins.cp}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <span className="text-xs text-slate-400 font-bold block">PLATA (SP)</span>
                <span className="text-2xl font-bold text-slate-200">{lootResult.coins.sp}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                <span className="text-xs text-amber-400 font-bold block">ORO (GP)</span>
                <span className="text-2xl font-bold text-amber-400">{lootResult.coins.gp}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/30">
                <span className="text-xs text-cyan-400 font-bold block">PLATINO (PP)</span>
                <span className="text-2xl font-bold text-cyan-300">{lootResult.coins.pp}</span>
              </div>
            </div>
          </div>

          {/* Sección de Objetos */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Objetos Encontrados ({lootResult.items.length})
              </h3>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                {lootResult.isMagic ? 'Catálogo Mágico' : 'Equipamiento Estándar'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lootResult.items.map((item, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="font-bold text-amber-400 text-base">{item.name}</h4>
                      {item.rarity?.name && (
                        <span className="text-xs bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-0.5 rounded">
                          {item.rarity.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      {item.equipment_category?.name || 'Objeto Especial'}
                    </p>
                    {item.desc && item.desc.length > 0 && (
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {item.desc[0]}
                      </p>
                    )}
                  </div>
                  {item.cost && (
                    <div className="mt-3 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                      Valor estimado: <span className="text-slate-200 font-semibold">{item.cost.quantity} {item.cost.unit}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}