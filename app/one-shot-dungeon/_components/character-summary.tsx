'use client'

import type { CharacterState } from '../_lib/shop'

export function CharacterSummary({
  character,
  onContinue,
}: {
  character: CharacterState
  onContinue: () => void
}) {
  return (
    <div className="flex flex-col p-4 gap-3 w-full animate-in fade-in duration-300">
      <h2 className="font-old text-3xl text-amber-500 text-center">Character Summary</h2>

      <div className="border-2 border-b-4 border-zinc-700 bg-black p-4">
        <p className="font-old text-zinc-400 uppercase tracking-widest text-sm">Character Name</p>
        <p className="font-old text-2xl text-white">{character.name}</p>

        {character.className && (
          <p className="font-old text-sm text-amber-400 mt-1">
            Class: <span className="text-amber-200">{character.className}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3 font-old">
        <div className="border border-zinc-700 bg-zinc-950/70 p-3">
          <p className="text-zinc-500 text-xs">HP</p>
          <p className="text-2xl text-green-500">{character.stats.hp}</p>
        </div>
        <div className="border border-zinc-700 bg-zinc-950/70 p-3">
          <p className="text-zinc-500 text-xs">ATK</p>
          <p className="text-2xl text-red-500">{character.stats.atk}</p>
        </div>
        <div className="border border-zinc-700 bg-zinc-950/70 p-3">
          <p className="text-zinc-500 text-xs">DEF</p>
          <p className="text-2xl text-blue-500">{character.stats.def}</p>
        </div>
        <div className="border border-zinc-700 bg-zinc-950/70 p-3">
          <p className="text-zinc-500 text-xs">SPD</p>
          <p className="text-2xl text-yellow-500">{character.stats.spd}</p>
        </div>
      </div>

      <div className="border border-amber-900 bg-amber-950/40 p-3 text-amber-300 font-old text-sm">
        <p>Effective HP = HP x 100</p>
        <p>Effective ATK = ATK x 1.5</p>
      </div>

      <button
        className="font-old text-2xl w-full flex items-center justify-center border-2 border-b-4 border-white bg-white text-black p-2 hover:bg-zinc-300 hover:border-zinc-300 cursor-pointer transition-none uppercase tracking-widest"
        onClick={onContinue}
      >
        Continue to Shop
      </button>
    </div>
  )
}
