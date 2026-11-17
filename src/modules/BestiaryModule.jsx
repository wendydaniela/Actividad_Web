import { useState, useEffect } from 'react';
import { fetchMonsters, fetchMonsterDetails } from '../services/dndApi';
import MonsterCard from '../components/MonsterCard';

export default function BestiaryModule() {
  const [monsters, setMonsters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchMonsters();
      setMonsters(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSelectMonster = async (index) => {
    setLoading(true);
    const details = await fetchMonsterDetails(index);
    setSelectedMonster(details);
    setLoading(false);
  };

  const filteredMonsters = monsters.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 border-b border-stone-800 pb-4">
        <h2 className="text-2xl font-serif font-bold text-[#f4efe6] mb-1">Bestiario y Enemigos</h2>
        <p className="text-sm text-stone-400">Consulta criaturas y estadísticas de combate</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar criatura por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1a1714] border border-stone-800 rounded-lg px-4 py-3 text-[#f4efe6] placeholder-stone-500 focus:outline-none focus:border-red-700 transition-colors"
        />
      </div>

      {/* Ficha detallada del monstruo */}
      {selectedMonster && (
        <div className="mb-8 bg-[#1a1714] border-2 border-red-900/60 rounded-lg p-6 shadow-xl relative">
          <button 
            onClick={() => setSelectedMonster(null)}
            className="absolute top-4 right-4 text-stone-400 hover:text-[#f4efe6] text-xs font-semibold bg-[#12100e] border border-stone-800 px-3 py-1.5 rounded transition-colors cursor-pointer"
          >
            Cerrar
          </button>
          
          <h3 className="text-2xl font-serif font-bold text-red-400 mb-1">{selectedMonster.name}</h3>
          <p className="text-xs italic text-stone-400 mb-5">
            {selectedMonster.size} • {selectedMonster.type} • {selectedMonster.alignment}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm border-t border-stone-800 pt-4">
            <div className="bg-[#12100e] p-3 rounded border border-stone-800/80">
              <span className="text-stone-400 block text-xs">Clase de Armadura</span>
              <span className="font-bold text-[#f4efe6] text-base">{selectedMonster.armor_class?.[0]?.value}</span>
            </div>
            <div className="bg-[#12100e] p-3 rounded border border-stone-800/80">
              <span className="text-stone-400 block text-xs">Puntos de Golpe</span>
              <span className="font-bold text-[#f4efe6] text-base">{selectedMonster.hit_points}</span>
            </div>
            <div className="bg-[#12100e] p-3 rounded border border-stone-800/80">
              <span className="text-stone-400 block text-xs">Nivel de Desafío</span>
              <span className="font-bold text-red-400 text-base">CR {selectedMonster.challenge_rating}</span>
            </div>
            <div className="bg-[#12100e] p-3 rounded border border-stone-800/80">
              <span className="text-stone-400 block text-xs">Experiencia</span>
              <span className="font-bold text-[#f4efe6] text-base">{selectedMonster.xp} XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Monstruos */}
      {loading && !selectedMonster ? (
        <div className="text-center py-16 text-stone-400 text-sm">Buscando en archivos del bestiario...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMonsters.slice(0, 30).map((monster) => (
            <MonsterCard 
              key={monster.index} 
              monster={monster} 
              onClick={() => handleSelectMonster(monster.index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}