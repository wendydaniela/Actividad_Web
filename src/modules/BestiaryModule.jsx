import { useState, useEffect } from 'react';
import { fetchMonsters, fetchMonsterDetails } from '../services/dndApi';
import MonsterCard from '../components/MonsterCard';

export default function BestiaryModule() {
  const [monsters, setMonsters] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMonster, setSelectedMonster] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar la lista inicial de monstruos
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchMonsters();
      setMonsters(data);
      setLoading(false);
    }
    loadData();
  }, []);

  // Manejar clic en un monstruo para ver detalles completos
  const handleSelectMonster = async (index) => {
    setLoading(true);
    const details = await fetchMonsterDetails(index);
    setSelectedMonster(details);
    setLoading(false);
  };

  // Filtrar monstruos por el buscador
  const filteredMonsters = monsters.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-400 mb-2">Bestiario y Enemigos</h2>
        <p className="text-sm text-slate-400">Consulta los monstruos oficiales de D&D 5e para tus partidas.</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar monstruo por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
        />
      </div>

      {/* Modal o detalle del monstruo seleccionado */}
      {selectedMonster && (
        <div className="mb-8 bg-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative">
          <button 
            onClick={() => setSelectedMonster(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-semibold bg-slate-800 px-3 py-1 rounded-lg transition"
          >
            Cerrar [X]
          </button>
          
          <h3 className="text-2xl font-bold text-amber-400 mb-1">{selectedMonster.name}</h3>
          <p className="text-xs text-slate-400 mb-4">Tipo: {selectedMonster.type} | Tamaño: {selectedMonster.size} | Alineamiento: {selectedMonster.alignment}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs">Clase de Armadura</span>
              <span className="font-bold text-slate-200">{selectedMonster.armor_class?.[0]?.value}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs">Puntos de Golpe</span>
              <span className="font-bold text-slate-200">{selectedMonster.hit_points}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs">Nivel de Desafío (CR)</span>
              <span className="font-bold text-amber-400">{selectedMonster.challenge_rating}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-xs">Experiencia (XP)</span>
              <span className="font-bold text-slate-200">{selectedMonster.xp}</span>
            </div>
          </div>
        </div>
      )}

      {/* Grid de Monstruos */}
      {loading && !selectedMonster ? (
        <div className="text-center py-20 text-slate-400">Cargando bestiario desde la API...</div>
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