import { Planet, planets } from '../data/planets';

interface PlanetInfoProps {
  planet: Planet;
  onClose: () => void;
}

export default function PlanetInfo({ planet, onClose }: PlanetInfoProps) {
  const planetIndex = planets.findIndex((p) => p.id === planet.id);

  return (
    <div className="absolute right-4 top-4 lg:right-8 lg:top-8 z-20 w-80 max-w-[90vw] animate-slide-in">
      <div
        className="rounded-2xl p-6 backdrop-blur-xl border border-white/10 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${planet.color}ee, ${planet.color}88)`,
                boxShadow: `0 0 20px ${planet.color}66`,
              }}
            >
              {planet.emoji}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{planet.name}</h2>
              <p className="text-xs text-gray-400">Planet #{planetIndex + 1} from the Sun</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">{planet.description}</p>

        {/* Stats */}
        <div className="space-y-3">
          <StatRow
            icon="📏"
            label="Diameter"
            value={`${planet.diameter.toLocaleString()} km`}
            color={planet.color}
          />
          <StatRow
            icon="🌞"
            label="Distance from Sun"
            value={`${planet.distanceFromSun.toLocaleString()} million km`}
            color={planet.color}
          />
          <StatRow
            icon="🔄"
            label="Orbital Period"
            value={formatOrbitalPeriod(planet.orbitalPeriod)}
            color={planet.color}
          />
          <StatRow
            icon="⚡"
            label="Relative Speed"
            value={`${planet.orbitalSpeed.toFixed(3)}x Earth`}
            color={planet.color}
          />
        </div>

        {/* Fun fact bar */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Orbit speed:</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(planet.orbitalSpeed * 25, 100)}%`,
                  background: `linear-gradient(90deg, ${planet.color}, ${planet.color}88)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-semibold" style={{ color }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function formatOrbitalPeriod(days: number): string {
  if (days < 365) {
    return `${days} Earth days`;
  }
  const years = (days / 365.25).toFixed(1);
  return `${years} Earth years (${days.toLocaleString()} days)`;
}
