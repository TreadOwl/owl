import Link from 'next/link'
import Marquee from 'react-fast-marquee'
import data from '@/file/bg_cleaned.json'

export const Header = () => {
  const englishVerses = data.map((item) => item.quote.replace(/\s+/g, ' ').trim()).join('  ✦  ')

  return (
    <div className="w-full border-b-2 border-red-600">
      <Marquee
        speed={66}
        className="font-old text-lg border-t border-b border-white hover:cursor-default"
      >
        {englishVerses}
      </Marquee>

      <div className="flex flex-col p-6 border-b-2 border-red-600 transition-colors duration-300">
        <Link href="/">
          <p className="md:text-6xl text-4xl font-bold font-style hover:cursor-default">TreadOwl</p>
          <p className="md:text-xl text-lg font-semibold font-style hover:cursor-default">
            [XMPLR]
          </p>
        </Link>
      </div>

      <div className="border-b-2 border-amber-500 pt-1" />

      <div className="bg-white mt-1 grid grid-cols-2 sm:grid-cols-4 gap-2 text-black text-center font-style">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-1 border-b-4 sm:border-b-0 border-black text-lg font-bold hover:bg-black hover:text-white transition-colors duration-150"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="border-b-2 border-amber-500 md:pt-1 mb-1" />
    </div>
  )
}

const menu = [
  { name: 'Last.fm', href: 'https://www.last.fm/user/treadowl' },
  { name: 'Steam', href: 'https://steamcommunity.com/id/treadowl/' },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/user/rgr5vd1fc0223a6lc5nw0qlh4',
  },
  { name: 'GitHub', href: 'https://github.com/TreadOwl' },
]
