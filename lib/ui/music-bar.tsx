export const AnimatedMusicBar = () => (
  <>
    <style>{`
      @keyframes music-bar {
        0% { transform: scaleY(0.3); }
        100% { transform: scaleY(1); }
      }
    `}</style>
    <div className="flex items-end gap-[3px] h-3 overflow-hidden">
      <span
        className="w-[3px] h-full bg-emerald-500 rounded-sm"
        style={{
          animation: 'music-bar 0.8s ease-in-out infinite alternate',
          transformOrigin: 'bottom',
        }}
      />
      <span
        className="w-[3px] h-full bg-emerald-500 rounded-sm"
        style={{
          animation: 'music-bar 0.8s ease-in-out infinite alternate 0.2s',
          transformOrigin: 'bottom',
        }}
      />
      <span
        className="w-[3px] h-full bg-emerald-500 rounded-sm"
        style={{
          animation: 'music-bar 0.8s ease-in-out infinite alternate 0.4s',
          transformOrigin: 'bottom',
        }}
      />
    </div>
  </>
)
