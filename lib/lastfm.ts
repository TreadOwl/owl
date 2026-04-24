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
