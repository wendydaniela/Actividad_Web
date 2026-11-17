export default function MonsterCard({ monster, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-[#1a1714] border border-stone-800 rounded-lg p-5 hover:border-red-800/80 transition-colors duration-200 cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="text-lg font-serif font-bold text-[#f4efe6] group-hover:text-red-400 transition-colors">
            {monster.name}
          </h3>
          <span className="bg-red-950/50 text-red-400 text-xs font-semibold px-2.5 py-0.5 rounded border border-red-900/50 shrink-0">
            CR {monster.challenge_rating ?? "?"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-stone-800/80 text-xs">
        <div className="bg-[#12100e] p-2.5 rounded border border-stone-800/60">
          <span className="text-stone-400 block mb-0.5">Clase Armadura</span>
          <span className="font-bold text-[#e7e2d8] text-sm">
            {monster.armor_class?.[0]?.value ?? monster.armor_class ?? "N/A"}
          </span>
        </div>
        <div className="bg-[#12100e] p-2.5 rounded border border-stone-800/60">
          <span className="text-stone-400 block mb-0.5">Puntos Golpe</span>
          <span className="font-bold text-[#e7e2d8] text-sm">
            {monster.hit_points ?? "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}