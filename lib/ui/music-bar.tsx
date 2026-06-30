export const AnimatedMusicBar = () => (
  <>
    <div className="flex items-end gap-0.75 h-3 overflow-hidden">
      <span
        className="w-0.75 h-full bg-emerald-500 rounded-sm"
        style={{
          animation: 'music-bar 0.8s ease-in-out infinite alternate',
          transformOrigin: 'bottom',
        }}
      />
      <span
        className="w-0.75 h-full bg-emerald-500 rounded-sm"
        style={{
          animation: 'music-bar 0.8s ease-in-out infinite alternate 0.2s',
          transformOrigin: 'bottom',
        }}
      />
      <span
        className="w-0.75 h-full bg-emerald-500 rounded-sm"
        style={{
          animation: 'music-bar 0.8s ease-in-out infinite alternate 0.4s',
          transformOrigin: 'bottom',
        }}
      />
    </div>
  </>
)
