export const OsdSection = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-900/30 p-6">
      <p className="animate-pulse font-old pb-2">Checkout my (WIP)* RPG - Adventure!</p>
      <a href="/one-shot-dungeon">
        <button className="bg-zinc-900/50 hover:bg-zinc-800/80 py-3 px-4 rounded-md text-red-600 text-4xl font-old hover:cursor-pointer transition-colors">
          One Shot Dungeon
        </button>
      </a>
    </div>
  )
}
