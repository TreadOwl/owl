import { FlameKindling } from 'lucide-react'

export default function OneShot() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-3 sm:p-6 mt-3 sm:mt-6 bg-zinc-900/30 animate-pulse flex items-center justify-center gap-2 rounded-md">
        <FlameKindling className="size-8 text-amber-500" />
        <h1 className="font-style text-2xl sm:text-4xl text-red-600 flex items-center justify-center">
          One Shot Dungeon
        </h1>
        <FlameKindling className="size-8 text-amber-500" />
      </div>
    </div>
  )
}
