'use client'

import { useState } from 'react'
import { classes, generateBaseStats, rollEnhancement, STAT_META, type Stats, type CharacterClass, type Enhancement } from '../_lib/character'
import type { CharacterState } from '../_lib/shop'
import { OsdPrimaryButton } from './osd-primary-button'
import { CharacterEffectsDisplay } from './character-effects-display'

const rerolls = 2

export function CharacterSelect({ onSelect }: { onSelect: (character: CharacterState) => void }) {
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null)
  const [baseStats, setBaseStats] = useState<Stats | null>(null)
  const [enhancement, setEnhancement] = useState<Enhancement | null>(null)
  const [remainingRerolls, setRemainingRerolls] = useState(rerolls)

  const handleClassSelect = (c: CharacterClass) => {
    setSelectedClass(c)
    setBaseStats(null)
    setEnhancement(null)
    setRemainingRerolls(rerolls)
  }

  const handleConfirmClass = () => {
    if (!selectedClass) return
    setBaseStats(generateBaseStats(selectedClass))
  }

  const handleEnhance = () => {
    if (!selectedClass || !baseStats) return

    const chosenEnhancement = rollEnhancement(selectedClass.name)
    if (chosenEnhancement) {
      setEnhancement(chosenEnhancement)
    }
  }

  const handleReroll = () => {
    if (remainingRerolls <= 0) return
    setRemainingRerolls((r) => r - 1)

    handleEnhance()
  }

  const generatedStats = baseStats
    ? {
        hp: baseStats.hp + (enhancement?.statBonus ?? 0),
        atk: baseStats.atk + (enhancement?.statBonus ?? 0),
        def: baseStats.def + (enhancement?.statBonus ?? 0),
        spd: baseStats.spd + (enhancement?.statBonus ?? 0),
      }
    : null

  const handleContinue = () => {
    if (selectedClass && generatedStats) {
      onSelect({
        name: enhancement ? enhancement.name : selectedClass.name,
        className: selectedClass.name,
        stats: generatedStats,
        effects: enhancement?.effects,
      })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full p-2">
      {/* Left Column: Vertical List of Classes */}
      {!baseStats && (
        <div className="flex flex-col gap-3 w-full sm:w-1/3">
          <h2 className="font-old text-xl text-zinc-500 px-2 uppercase tracking-widest border-b-2 border-zinc-800 pb-2">Classes</h2>
          <div className="flex flex-col gap-3">
            {classes.map((c) => (
              <button
                key={c.name}
                className={`font-old text-xl flex items-center justify-start border-2 border-b-4 px-2 py-1 hover:cursor-pointer transition-none ${
                  selectedClass?.name === c.name
                    ? 'bg-zinc-200 text-zinc-900 border-zinc-200 border-b-zinc-400 translate-y-[2px]'
                    : 'bg-black text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
                }`}
                onClick={() => handleClassSelect(c)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Right Column: Details & Actions */}
      <div
        className={`flex flex-col w-full ${!baseStats ? 'sm:w-2/3' : ''} border-2 border-b-4 border-zinc-800 bg-black min-h-[336px] p-2 lg:p-4 relative`}
      >
        {!selectedClass ? (
          <div className="flex-1 flex items-center justify-center font-old text-2xl text-zinc-700 animate-pulse uppercase tracking-widest">
            Awaiting Selection...
          </div>
        ) : (
          <div className="flex flex-col h-full animate-in fade-in duration-300">
            <h2 className="font-old text-xl text-white border-b-2 border-zinc-800 mb-2 uppercase tracking-widest flex items-center justify-between">
              <span>{enhancement ? enhancement.name : selectedClass.name}</span>
            </h2>

            <div className="flex-1 flex flex-col font-old text-lg text-zinc-400">
              {STAT_META.map(({ label, key, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="font-bold tracking-widest text-zinc-300">{label}</span>
                  <span className="font-bold text-white text-xl">
                    {generatedStats ? (
                      <span className={color}>{generatedStats[key]}</span>
                    ) : (
                      `${selectedClass.baseStats[key][0]} - ${selectedClass.baseStats[key][1]}`
                    )}
                  </span>
                </div>
              ))}
              {enhancement && enhancement.statBonus > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-bold tracking-widest text-amber-500">Added Stat Bonus</span>
                  <span className="font-bold text-amber-500 text-xl">+{enhancement.statBonus}</span>
                </div>
              )}

              <div className="pt-2">
                <p className="font-bold tracking-widest text-zinc-300">
                  <span>Description</span>
                </p>
                <p className="text-white">{enhancement ? enhancement.description : selectedClass.description}</p>
              </div>

              {enhancement?.effects && (
                <div className="pt-2 flex justify-between items-center">
                  <span className="font-bold tracking-widest text-amber-500">Bonus Effects</span>
                  <span className="font-bold text-amber-500 text-xl flex flex-col items-end">
                    <CharacterEffectsDisplay effects={enhancement.effects} />
                  </span>
                </div>
              )}
            </div>

            <div className="mt-2 flex gap-4 pt-2 border-t-2 border-zinc-900">
              {enhancement ? (
                <>
                  <button
                    disabled={remainingRerolls <= 0}
                    className={`font-old text-2xl w-full flex items-center justify-center border-2 border-b-4 flex-1 p-2 transition-none uppercase tracking-widest ${
                      remainingRerolls <= 0
                        ? 'border-zinc-800 bg-zinc-900 text-zinc-600 cursor-not-allowed'
                        : 'border-blue-900 bg-blue-950 text-blue-500 hover:bg-blue-900 hover:text-white cursor-pointer'
                    }`}
                    onClick={handleReroll}
                  >
                    Re-roll ({remainingRerolls})
                  </button>
                  <OsdPrimaryButton onClick={handleContinue} className="flex-1">
                    Continue
                  </OsdPrimaryButton>
                </>
              ) : generatedStats ? (
                <button
                  className="font-old text-2xl w-full flex items-center justify-center border-2 border-b-4 border-amber-900 bg-amber-950 text-amber-500 p-2 hover:bg-amber-900 hover:text-white cursor-pointer transition-none uppercase tracking-widest"
                  onClick={handleEnhance}
                >
                  Enhance
                </button>
              ) : (
                <button
                  className="font-old text-2xl w-full flex items-center justify-center border-2 border-b-4 border-red-900 bg-red-950 text-red-500 p-2 hover:bg-red-900 hover:text-white cursor-pointer transition-none uppercase tracking-widest"
                  onClick={handleConfirmClass}
                >
                  Confirm Class
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
