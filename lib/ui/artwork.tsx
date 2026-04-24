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
