import { getRecentTracksData, formatTimeAgo } from '@/lib/lastfm'
import { AlbumArtwork } from '@/lib/ui/artwork'
import { SongStatus } from '@/lib/ui/song-status'
import { HoverArrowIndicator } from '@/lib/ui/hover-arrow'
import { AutoRefresh } from '@/app/_components/auto-refresh'

export const HeroSection = async () => {
  const { current: song, previous: previousSongs } = await getRecentTracksData()

  return (
    <section className="w-full relative p-6">
      <AutoRefresh />
      <div className="grid grid-cols gap-6 items-start">
        {/* Current / Last Played Song */}
        <div className="flex justify-center items-center w-full">
          {song && (
            <a
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 p-4 hover:bg-zinc-800/80 bg-zinc-900/50 border border-white/10 transition-all duration-300 overflow-hidden backdrop-blur-md w-full"
            >
              <AlbumArtwork image={song.image} album={song.album} />

              <div className="flex flex-col min-w-0 z-10 w-full">
                <SongStatus nowPlaying={song.nowPlaying} />

                <h3 className="font-semibold text-xl text-white truncate max-w-full leading-tight">
                  {song.name}
                </h3>
                <p className="text-gray-500 truncate mt-0.5">
                  {song.artist}
                  <br />
                  {song.album}
                </p>
              </div>

              <HoverArrowIndicator />
            </a>
          )}
        </div>

        {/* Previously Played List */}
        <div className="flex flex-col h-[250px] overflow-y-auto w-full space-y-2 scrollbar-thin">
          <style>{`
            .scrollbar-thin::-webkit-scrollbar { width: 4px; }
            .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
            .scrollbar-thin::-webkit-scrollbar-thumb { background: #3f3f46; }
          `}</style>
          {previousSongs.map((prevSong, i) => (
            <a
              key={`prev-${prevSong.uts || i}`}
              href={prevSong.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center p-2 rounded-lg bg-zinc-900/30 border border-white/5 hover:bg-zinc-800/80 transition-colors group"
            >
              <span className="font-medium text-white truncate pr-4">
                {prevSong.name} - {prevSong.artist}
              </span>
              <span className="text-sm text-white whitespace-nowrap shrink-0 group-hover:text-gray-300 transition-colors">
                {formatTimeAgo(prevSong.uts, prevSong.date)}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="w-full mt-6 flex items-center justify-center">
        <a href="https://www.last.fm/user/treadowl" target="_blank" rel="noopener noreferrer">
          <button className="group flex relative overflow-hidden items-center justify-center min-w-[160px] py-3 bg-zinc-900/30 border border-white/5 hover:bg-zinc-800/80 transition-colors hover:cursor-pointer">
            <span className="font-medium transform transition-transform duration-300 group-hover:-translate-x-5">
              Show More
            </span>
            <HoverArrowIndicator />
          </button>
        </a>
      </div>
    </section>
  )
}
