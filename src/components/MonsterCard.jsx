export default function MonsterCard({ monster, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 hover:border-amber-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-amber-500/10 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg font-bold text-slate-100 tracking-wide">
            {monster.name}
          </h3>
          <span className="bg-amber-500/10 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-amber-500/20">
            CR {monster.challenge_rating ?? "?"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800/80 text-xs">
        <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50">
          <span className="text-slate-400 block mb-0.5">Clase Armadura</span>
          <span className="font-bold text-slate-200 text-sm">
            {monster.armor_class?.[0]?.value ?? monster.armor_class ?? "N/A"}
          </span>
        </div>
        <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/50">
          <span className="text-slate-400 block mb-0.5">Puntos Golpe</span>
          <span className="font-bold text-slate-200 text-sm">
            {monster.hit_points ?? "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}