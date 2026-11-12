interface ControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export default function Controls({ isPlaying, speed, onTogglePlay, onSpeedChange }: ControlsProps) {
  const speedOptions = [0.25, 0.5, 1, 2, 5, 10];

  return (
    <div className="relative z-20 px-4 pb-4 pt-2">
      <div
        className="max-w-2xl mx-auto rounded-2xl px-6 py-4 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-wrap items-center justify-center gap-4"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.85) 100%)',
        }}
      >
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #f97316, #ef4444)'
              : 'linear-gradient(135deg, #22c55e, #16a34a)',
            boxShadow: isPlaying
              ? '0 0 20px rgba(239,68,68,0.4)'
              : '0 0 20px rgba(34,197,94,0.4)',
          }}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          )}
        </button>

        {/* Speed Label */}
        <span className="text-sm text-gray-400 font-medium">Speed:</span>

        {/* Speed Buttons */}
        <div className="flex items-center gap-1">
          {speedOptions.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                speed === s
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Current speed indicator */}
        <div className="flex items-center gap-2 ml-2">
          <div className="text-xs text-gray-500">
            {isPlaying ? (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Running at {speed}x
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                Paused
              </span>
            )}
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="w-full text-center">
          <span className="text-[10px] text-gray-600">
            <kbd className="px-1 py-0.5 bg-white/5 rounded text-gray-500 border border-white/10">Space</kbd> play/pause
            &nbsp;·&nbsp;
            <kbd className="px-1 py-0.5 bg-white/5 rounded text-gray-500 border border-white/10">Esc</kbd> close panel
          </span>
        </div>
      </div>
    </div>
  );
}
