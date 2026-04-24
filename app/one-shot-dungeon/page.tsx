'use client'

import { match } from 'ts-pattern'
import { useState } from 'react'
import { FlameKindling } from 'lucide-react'
import { CharacterSelect } from './_components/character-select'
import { CharacterSummary } from './_components/character-summary'
import { ShopScreen } from './_components/shop-screen'
import {
  buildShop,
  SHOP_LEVELS,
  applyPurchasedEffects,
  type ClassName,
  type LockedItem,
  type CharacterState,
} from './_lib/shop'

type GameMode =
  | { mode: 'start' }
  | { mode: 'character' }
  | { mode: 'summary'; character: CharacterState }
  | { mode: 'shop'; character: CharacterState }
  | { mode: 'game'; character: CharacterState }
  | { mode: 'error' }

export default function OneShot() {
  const [mode, setMode] = useState<GameMode>({ mode: 'start' })
  const [coins, setCoins] = useState(100)
  const [lockCharges, setLockCharges] = useState(2)
  const [extraLives, setExtraLives] = useState(0)
  const [extraLifePurchases, setExtraLifePurchases] = useState(0)
  const [lockedItems, setLockedItems] = useState<LockedItem[]>([])

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-3 sm:p-6 mt-3 sm:mt-6 animate-pulse flex items-center justify-center gap-2">
        <FlameKindling className="size-8 sm:size-12 text-amber-500" />
        <h1 className="font-old text-3xl sm:text-5xl text-red-600 flex items-center justify-center">
          One Shot Dungeon
        </h1>
        <FlameKindling className="size-8 sm:size-12 text-amber-500" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-96 max-w-xl bg-zinc-900/50 backdrop-blur-md rounded-lg mb-3 sm:mb-6 w-full">
        {match(mode)
          .with({ mode: 'start' }, () => (
            <div className="flex flex-col items-center justify-center">
              <button
                className="font-old text-4xl flex items-center justify-center border-3 border-b-background px-4 py-2 hover:cursor-pointer"
                onClick={() => setMode({ mode: 'character' })}
              >
                Start
              </button>
            </div>
          ))
          .with({ mode: 'character' }, () => (
            <CharacterSelect onSelect={(character) => setMode({ mode: 'summary', character })} />
          ))
          .with({ mode: 'summary' }, (state) => (
            <CharacterSummary
              character={state.character}
              onContinue={() => {
                setMode({ mode: 'shop', character: state.character })
              }}
            />
          ))
          .with({ mode: 'shop' }, (state) => {
            const builtShop = buildShop({
              className: state.character.className as ClassName,
              extraLifePurchases,
              lockedItems,
            })
            const carriedLockedIds = builtShop.carriedLocks.map((entry) => entry.item.instanceId)
            const carriedLockedRemaining = Object.fromEntries(
              builtShop.carriedLocks.map((entry) => [
                entry.item.instanceId,
                entry.remainingAppearances,
              ]),
            )

            return (
              <ShopScreen
                coins={coins}
                lockCharges={lockCharges}
                permanentItems={builtShop.permanent}
                globalItems={builtShop.global}
                classItems={builtShop.class}
                carriedLockedIds={carriedLockedIds}
                carriedLockedRemaining={carriedLockedRemaining}
                onFinish={({
                  coins: nextCoins,
                  remainingLocks,
                  purchasedItems,
                  nextLockedItems,
                  extraLifePurchasesDelta,
                }) => {
                  setCoins(nextCoins)
                  setExtraLifePurchases((count) => count + extraLifePurchasesDelta)
                  setLockCharges(remainingLocks)
                  setLockedItems(nextLockedItems)

                  const { nextCharacter, gainedExtraLives } = applyPurchasedEffects(
                    state.character,
                    purchasedItems,
                  )
                  if (gainedExtraLives > 0) {
                    setExtraLives((lives) => lives + gainedExtraLives)
                  }

                  setMode({ mode: 'game', character: nextCharacter })
                }}
              />
            )
          })
          .with({ mode: 'game' }, (state) => (
            <div className="flex flex-col items-center justify-center p-3 gap-3 animate-in fade-in duration-500">
              <h2 className="font-old text-2xl text-amber-500">
                Welcome to the Dungeon, {state.character.name}.
              </h2>
              <div className="flex gap-2 font-old text-zinc-300 bg-zinc-950/80 p-3 border border-zinc-800">
                {[
                  { label: 'HP', value: state.character.stats.hp, color: 'text-green-500' },
                  { label: 'ATK', value: state.character.stats.atk, color: 'text-red-600' },
                  { label: 'DEF', value: state.character.stats.def, color: 'text-blue-500' },
                  { label: 'SPD', value: state.character.stats.spd, color: 'text-yellow-500' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="text-zinc-500 text-sm block">{stat.label}</span>
                    <span className={`text-2xl ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
              {state.character.effects && (
                <div className="flex gap-2 font-old text-amber-500 bg-amber-950/50 p-2 border border-amber-900 w-full justify-center">
                  {state.character.effects.doubleDamageChance !== undefined && (
                    <span>Double-Damage: {state.character.effects.doubleDamageChance * 100}%</span>
                  )}
                  {state.character.effects.extraAttackChance !== undefined && (
                    <span>Extra-Attack: {state.character.effects.extraAttackChance * 100}%</span>
                  )}
                </div>
              )}
              <div className="w-full border border-zinc-800 bg-zinc-950/70 p-2 text-zinc-300 text-sm font-old flex justify-between">
                <span>Coins Left: {coins}</span>
                <span>Extra Lives: {extraLives}</span>
                <span>Item Locks: {lockCharges}</span>
              </div>
              <p className="text-zinc-400 text-center">
                Next shops are scheduled after levels {SHOP_LEVELS.join(', ')}.
              </p>
              <p className="text-amber-500 text-xl animate-pulse">Game features coming soon...</p>
            </div>
          ))
          .otherwise(() => null)}
      </div>
    </div>
  )
}
