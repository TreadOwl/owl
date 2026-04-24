import { AnimatedMusicBar } from './music-bar'

export const SongStatus = ({ nowPlaying }: { nowPlaying: boolean }) => (
  <div className="flex items-center gap-2 mb-1.5">
    {nowPlaying ? (
      <div className="flex items-center gap-2">
        <AnimatedMusicBar />
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Now Playing
        </span>
      </div>
    ) : (
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Last Played
        </span>
      </div>
    )}
  </div>
)
