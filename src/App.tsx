import { useState, useEffect, useRef, useCallback } from 'react';
import { planets, Planet } from './data/planets';
import PlanetInfo from './components/PlanetInfo';
import Controls from './components/Controls';

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [angles, setAngles] = useState<number[]>(planets.map(() => Math.random() * 360));
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive scaling
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const minDim = Math.min(w, h);
      if (minDim < 500) {
        setScale(0.45);
      } else if (minDim < 700) {
        setScale(0.6);
      } else if (minDim < 900) {
        setScale(0.75);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.code === 'Escape') {
        setSelectedPlanet(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setAngles((prevAngles) =>
        prevAngles.map((angle, i) => {
          const increment = planets[i].orbitalSpeed * speed * (delta / 16);
          return (angle + increment) % 360;
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    },
    [speed]
  );

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, animate]);

  const getPlanetPosition = (planet: Planet, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * planet.orbitRadius;
    const y = Math.sin(rad) * planet.orbitRadius;
    return { x, y };
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden flex flex-col">
      {/* Background gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10,10,40,1) 0%, rgba(0,0,0,1) 70%)',
        }}
      />

      {/* Header */}
      <header className="text-center py-3 px-4 relative z-10">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-blue-300 bg-clip-text text-transparent">
          🌌 Solar System Explorer
        </h1>
        <p className="text-gray-400 text-xs md:text-sm mt-1">Click on any planet to learn about it</p>
      </header>

      {/* Main Content */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onClick={() => setSelectedPlanet(null)}
      >
        {/* Solar System Visualization */}
        <div
          ref={containerRef}
          className="relative flex items-center justify-center"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 150 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 2 + 0.5}px`,
                  height: `${Math.random() * 2 + 0.5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.6 + 0.2,
                  animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Solar System Container - scaled */}
          <div
            className="relative transition-transform duration-300"
            style={{
              width: '900px',
              height: '900px',
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Orbit paths */}
            {planets.map((planet) => (
              <div
                key={`orbit-${planet.id}`}
                className="absolute rounded-full"
                style={{
                  width: `${planet.orbitRadius * 2}px`,
                  height: `${planet.orbitRadius * 2}px`,
                  left: `calc(50% - ${planet.orbitRadius}px)`,
                  top: `calc(50% - ${planet.orbitRadius}px)`,
                  border: `1px solid ${hoveredPlanet === planet.id ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.07)'}`,
                  transition: 'border-color 0.3s',
                }}
              />
            ))}

            {/* Sun */}
            <div
              className="absolute rounded-full cursor-pointer z-10"
              style={{
                width: '50px',
                height: '50px',
                left: 'calc(50% - 25px)',
                top: 'calc(50% - 25px)',
                background: 'radial-gradient(circle at 35% 35%, #fffbe6 0%, #ffd700 25%, #ff8c00 55%, #ff4500 100%)',
                boxShadow: '0 0 30px #ff8c00, 0 0 60px #ff450088, 0 0 100px #ff8c0044, 0 0 150px #ff450022',
              }}
              onClick={() => setSelectedPlanet(null)}
            >
              <div
                className="absolute inset-[-8px] rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle, #ff8c0066 0%, transparent 70%)',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            </div>

            {/* Planets */}
            {planets.map((planet, index) => {
              const pos = getPlanetPosition(planet, angles[index]);
              const isSelected = selectedPlanet?.id === planet.id;
              const isHovered = hoveredPlanet === planet.id;

              return (
                <div
                  key={planet.id}
                  className="absolute cursor-pointer z-10"
                  style={{
                    width: `${planet.size + 8}px`,
                    height: `${planet.size + 8}px`,
                    left: `calc(50% - ${(planet.size + 8) / 2}px + ${pos.x}px)`,
                    top: `calc(50% - ${(planet.size + 8) / 2}px + ${pos.y}px)`,
                    transition: 'transform 0.15s ease-out',
                    transform: isHovered ? 'scale(1.4)' : 'scale(1)',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlanet(planet);
                  }}
                  onMouseEnter={() => setHoveredPlanet(planet.id)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                  title={planet.name}
                >
                  {/* Planet body */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: `${planet.size}px`,
                      height: `${planet.size}px`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: `radial-gradient(circle at 30% 30%, ${planet.color}ff, ${planet.color}99 60%, ${planet.color}55)`,
                      boxShadow: isSelected
                        ? `0 0 12px ${planet.color}, 0 0 25px ${planet.color}88, inset -3px -3px 6px rgba(0,0,0,0.3)`
                        : isHovered
                        ? `0 0 10px ${planet.color}88, inset -2px -2px 4px rgba(0,0,0,0.3)`
                        : `0 0 4px ${planet.color}44, inset -2px -2px 4px rgba(0,0,0,0.3)`,
                      border: isSelected ? `2px solid rgba(255,255,255,0.8)` : 'none',
                    }}
                  />

                  {/* Saturn's ring */}
                  {planet.id === 'saturn' && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        width: `${planet.size * 1.8}px`,
                        height: `${planet.size * 0.6}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%) rotateX(75deg)',
                        border: `2px solid ${planet.color}99`,
                        borderRadius: '50%',
                        boxShadow: `inset 0 0 3px ${planet.color}44`,
                      }}
                    />
                  )}

                  {/* Earth's moon hint */}
                  {planet.id === 'earth' && (
                    <div
                      className="absolute rounded-full bg-gray-300"
                      style={{
                        width: '3px',
                        height: '3px',
                        right: '-2px',
                        top: '2px',
                        boxShadow: '0 0 3px rgba(255,255,255,0.5)',
                      }}
                    />
                  )}

                  {/* Planet label */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none font-semibold"
                    style={{
                      top: `${planet.size + 6}px`,
                      fontSize: '9px',
                      color: isSelected || isHovered ? 'white' : 'rgba(255,255,255,0.6)',
                      textShadow: '0 0 6px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.9)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {planet.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Panel */}
        {selectedPlanet && (
          <PlanetInfo planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
        )}
      </div>

      {/* Controls */}
      <Controls
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onSpeedChange={setSpeed}
      />
    </div>
  );
}

export default App;
