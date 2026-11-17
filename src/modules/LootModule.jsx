import { useState, useEffect } from 'react';
import { fetchEquipment, fetchMagicItems, fetchItemDetails } from '../services/dndApi';

export default function LootModule() {
  const [challengeRating, setChallengeRating] = useState('0-4');
  const [equipmentList, setEquipmentList] = useState([]);
  const [magicItemsList, setMagicItemsList] = useState([]);
  const [lootResult, setLootResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
      itemCount = Math.floor(Math.random() * 2) + 1;
      useMagicPool = Math.random() > 0.4;
    } else if (challengeRating === '11-16') {
      coins.gp = Math.floor(Math.random() * 800) + 200;
      coins.pp = Math.floor(Math.random() * 50) + 10;
      itemCount = 2;
      useMagicPool = true;
    } else {
      coins.gp = Math.floor(Math.random() * 3000) + 1000;
      coins.pp = Math.floor(Math.random() * 300) + 50;
      itemCount = 3;
      useMagicPool = true;
    }

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
    <div>
      <div className="mb-6 border-b border-stone-800 pb-4">
        <h2 className="text-2xl font-serif font-bold text-[#f4efe6] mb-1">Tesoro y Botín</h2>
        <p className="text-sm text-stone-400">Calcula monedas y reliquias según el desafío del encuentro</p>
      </div>

      {/* Panel de Configuración */}
      <div className="bg-[#1a1714] border border-stone-800 rounded-lg p-6 mb-8">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
          Nivel de Desafío (CR)
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
              className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                challengeRating === tier.id
                  ? 'bg-red-950/40 border-red-700 text-[#f4efe6]'
                  : 'bg-[#12100e] border-stone-800 text-stone-400 hover:border-stone-700'
              }`}
            >
              <div className={`font-bold text-sm ${challengeRating === tier.id ? 'text-red-400' : ''}`}>
                {tier.label}
              </div>
              <div className="text-xs opacity-75">{tier.desc}</div>
            </button>
          ))}
        </div>

        <button
          onClick={generateLoot}
          disabled={loading || equipmentList.length === 0}
          className="w-full py-3.5 px-6 bg-red-800 hover:bg-red-700 disabled:bg-stone-800 disabled:text-stone-500 text-[#f4efe6] font-semibold rounded-lg transition-colors cursor-pointer"
        >
          {loading ? 'Buscandoo ...' : 'Generar Recompensa'}
        </button>
      </div>

      {/* Resultados del Botín */}
      {lootResult && (
        <div className="space-y-6">
          {/* Monedas */}
          <div className="bg-[#1a1714] border border-stone-800 rounded-lg p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              Monedas Acuñadas
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#12100e] p-4 rounded border border-stone-800">
                <span className="text-[11px] text-stone-400 font-bold block">COBRE (CP)</span>
                <span className="text-2xl font-serif font-bold text-[#f4efe6]">{lootResult.coins.cp}</span>
              </div>
              <div className="bg-[#12100e] p-4 rounded border border-stone-800">
                <span className="text-[11px] text-stone-400 font-bold block">PLATA (SP)</span>
                <span className="text-2xl font-serif font-bold text-[#f4efe6]">{lootResult.coins.sp}</span>
              </div>
              <div className="bg-[#12100e] p-4 rounded border border-red-900/50">
                <span className="text-[11px] text-red-400 font-bold block">ORO (GP)</span>
                <span className="text-2xl font-serif font-bold text-[#f4efe6]">{lootResult.coins.gp}</span>
              </div>
              <div className="bg-[#12100e] p-4 rounded border border-stone-800">
                <span className="text-[11px] text-stone-300 font-bold block">PLATINO (PP)</span>
                <span className="text-2xl font-serif font-bold text-[#f4efe6]">{lootResult.coins.pp}</span>
              </div>
            </div>
          </div>

          {/* Objetos */}
          <div className="bg-[#1a1714] border border-stone-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Objetos Hallados ({lootResult.items.length})
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#12100e] border border-stone-800 text-stone-300">
                {lootResult.isMagic ? 'Reliquias Mágicas' : 'Equipo Estándar'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lootResult.items.map((item, idx) => (
                <div key={idx} className="bg-[#12100e] border border-stone-800 rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-serif font-bold text-red-400 text-base">{item.name}</h4>
                      {item.rarity?.name && (
                        <span className="text-[11px] bg-red-950/40 text-red-300 border border-red-900/40 px-2 py-0.5 rounded">
                          {item.rarity.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mb-3">
                      {item.equipment_category?.name || 'Objeto Especial'}
                    </p>
                    {item.desc && item.desc.length > 0 && (
                      <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed">
                        {item.desc[0]}
                      </p>
                    )}
                  </div>
                  {item.cost && (
                    <div className="mt-3 pt-2 border-t border-stone-800/80 text-xs text-stone-400">
                      Valor: <span className="text-[#f4efe6] font-semibold">{item.cost.quantity} {item.cost.unit}</span>
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