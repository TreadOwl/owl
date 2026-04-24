import { AnimatedMusicBar } from './ui/music-bar'

const LASTFM_USER = process.env.LASTFM_USER
const LASTFM_API_KEY = process.env.LASTFM_API_KEY

export type SongData = {
  name: string
  artist: string
  album: string
  image: string
  url: string
  nowPlaying: boolean
  date?: string
  uts?: string
}

// Data Fetching
export async function getRecentTracksData(): Promise<{
  current: SongData | null
  previous: SongData[]
}> {
  if (!LASTFM_USER || !LASTFM_API_KEY) {
    return {
      current: {
        name: 'Not Playing',
        artist: 'Not Playing',
        album: 'Not Playing',
        image: '',
        url: '',
        nowPlaying: false,
      },
      previous: [],
    }
  }
  try {
    const res = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=21`,
      { next: { revalidate: 15 } },
    )
    if (!res.ok) return { current: null, previous: [] }
    const data = await res.json()
    const tracks = data?.recenttracks?.track
    if (!tracks || tracks.length === 0) return { current: null, previous: [] }

    type LastFMTrack = {
      name: string
      artist: { '#text': string }
      album: { '#text': string }
      image?: { size: string; '#text': string }[]
      url: string
      '@attr'?: { nowplaying: string }
      date?: { '#text': string; uts: string }
    }

    const formatTrack = (track: LastFMTrack): SongData => ({
      name: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      image:
        track.image?.find((i) => i.size === 'extralarge')?.['#text'] ||
        track.image?.[2]?.['#text'] ||
        '',
      url: track.url,
      nowPlaying: track['@attr']?.nowplaying === 'true',
      date: track.date?.['#text'],
      uts: track.date?.uts,
    })

    const current = formatTrack(tracks[0])
    const previous = tracks.slice(1, 21).map(formatTrack)

    return { current, previous }
  } catch {
    return { current: null, previous: [] }
  }
}

// Subcomponents
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

export const AlbumArtwork = ({ image, album }: { image: string; album: string }) => {
  if (!image) {
    return (
      <div className="w-29 h-29 shrink-0 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-md ring-1 ring-inset ring-white/10">
        <svg
          className="w-8 h-8 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative w-29 h-29 shrink-0 overflow-hidden shadow-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={`${album} cover`} className="object-cover w-full h-full" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  )
}

export function formatTimeAgo(uts?: string, fallbackDate?: string) {
  if (!uts) return 'Just now'
  const diffInSeconds = Math.floor((new Date().getTime() - parseInt(uts) * 1000) / 1000)
  if (diffInSeconds < 60) return `<1m ago`
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  return fallbackDate?.split(',')[0] || `${diffInDays}d ago`
}
