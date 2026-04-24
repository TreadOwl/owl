'use client'

import { useMemo, useState } from 'react'
import { getRarityBadgeColor, type LockedItem, SHOP_LEVELS, type ShopItem } from '../_lib/shop'

type ShopItemState = {
  item: ShopItem
  locked: boolean
  carriedLock: boolean
  purchased: boolean
}

export function ShopScreen({
  coins,
  lockCharges,
  permanentItems,
  globalItems,
  classItems,
  carriedLockedIds,
  carriedLockedRemaining,
  onFinish,
}: {
  coins: number
  lockCharges: number
  permanentItems: ShopItem[]
  globalItems: ShopItem[]
  classItems: ShopItem[]
  carriedLockedIds: string[]
  carriedLockedRemaining: Record<string, number>
  onFinish: (payload: {
    coins: number
    remainingLocks: number
    purchasedItems: ShopItem[]
    nextLockedItems: LockedItem[]
    extraLifePurchasesDelta: number
  }) => void
}) {
  const [localCoins, setLocalCoins] = useState(coins)
  const [availableLocks, setAvailableLocks] = useState(lockCharges)
  const [extraLifePurchasesDelta, setExtraLifePurchasesDelta] = useState(0)

  const [itemState, setItemState] = useState<ShopItemState[]>([
    ...permanentItems.map((item) => ({
      item,
      locked: false,
      carriedLock: false,
      purchased: false,
    })),
    ...globalItems.map((item) => ({
      item,
      locked: false,
      carriedLock: carriedLockedIds.includes(item.instanceId),
      purchased: false,
    })),
    ...classItems.map((item) => ({
      item,
      locked: false,
      carriedLock: carriedLockedIds.includes(item.instanceId),
      purchased: false,
    })),
  ])

  const purchasedItems = useMemo(
    () => itemState.filter((entry) => entry.purchased).map((entry) => entry.item),
    [itemState],
  )

  const handleBuy = (target: ShopItem) => {
    const current = itemState.find((entry) => entry.item.instanceId === target.instanceId)
    if (!current || current.purchased || localCoins < target.price) return

    setLocalCoins((coinsLeft) => coinsLeft - target.price)
    if (current.locked || current.carriedLock) {
      setAvailableLocks((locks) => Math.min(lockCharges, locks + 1))
    }

    if (target.name === 'Extra Life') {
      setExtraLifePurchasesDelta((count) => count + 1)
    }

    setItemState((prev) =>
      prev.map((entry) =>
        entry.item.instanceId === target.instanceId
          ? { ...entry, purchased: true, locked: false }
          : entry,
      ),
    )
  }

  const toggleLock = (target: ShopItem) => {
    if (target.source === 'permanent') return

    const current = itemState.find((entry) => entry.item.instanceId === target.instanceId)
    if (!current || current.purchased) return

    if (current.locked) {
      setAvailableLocks((locks) => locks + 1)
      setItemState((prev) =>
        prev.map((entry) =>
          entry.item.instanceId === target.instanceId ? { ...entry, locked: false } : entry,
        ),
      )
    } else {
      if (availableLocks <= 0) return
      setAvailableLocks((locks) => locks - 1)
      setItemState((prev) =>
        prev.map((entry) =>
          entry.item.instanceId === target.instanceId ? { ...entry, locked: true } : entry,
        ),
      )
    }
  }

  const handleProceed = () => {
    const nextLockedItems: LockedItem[] = []

    for (const entry of itemState) {
      if (entry.item.source === 'permanent') continue
      if (entry.purchased) continue

      const category = entry.item.source as 'global' | 'class'
      if (entry.locked) {
        nextLockedItems.push({
          item: entry.item,
          category,
          remainingAppearances: 2,
        })
      } else if (entry.carriedLock) {
        const nextRemaining = (carriedLockedRemaining[entry.item.instanceId] ?? 2) - 1
        if (nextRemaining > 0) {
          nextLockedItems.push({
            item: entry.item,
            category,
            remainingAppearances: nextRemaining,
          })
        }
      }
    }

    onFinish({
      coins: localCoins,
      remainingLocks: availableLocks,
      purchasedItems,
      nextLockedItems,
      extraLifePurchasesDelta,
    })
  }

  const renderItemCard = (entry: ShopItemState) => {
    const rarityStyle = getRarityBadgeColor(entry.item.rarity)
    const canAfford = localCoins >= entry.item.price
    const canLockOrUnlock =
      !entry.purchased && entry.item.source !== 'permanent' && (entry.locked || availableLocks > 0)

    return (
      <div
        key={entry.item.instanceId}
        className="border-2 border-zinc-800 bg-black p-3 flex flex-col gap-2"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="font-old text-lg text-white">{entry.item.name}</p>
          <span className={`font-old text-xs uppercase border px-2 py-0.5 ${rarityStyle}`}>
            {entry.item.rarity}
          </span>
        </div>
        <p className="text-zinc-400 text-sm min-h-10">{entry.item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-old text-amber-400">{entry.item.price}g</span>
          <span className="text-xs uppercase text-zinc-500">{entry.item.source}</span>
        </div>
        {entry.locked && (
          <span className="text-xs text-cyan-400 font-old">Locked for next shop</span>
        )}
        {entry.purchased && <span className="text-xs text-green-400 font-old">Purchased</span>}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            disabled={entry.purchased || !canAfford}
            onClick={() => handleBuy(entry.item)}
            className={`font-old text-sm border-2 border-b-4 px-2 py-1 uppercase ${
              entry.purchased
                ? 'border-zinc-800 bg-zinc-900 text-zinc-600 cursor-not-allowed'
                : canAfford
                  ? 'border-emerald-900 bg-emerald-950 text-emerald-400 hover:bg-emerald-900 hover:text-white'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-600 cursor-not-allowed'
            }`}
          >
            Buy
          </button>
          <button
            disabled={!canLockOrUnlock}
            onClick={() => toggleLock(entry.item)}
            className={`font-old text-sm border-2 border-b-4 px-2 py-1 uppercase ${
              entry.locked
                ? 'border-red-900 bg-red-950 text-red-500 hover:bg-red-900 hover:text-white'
                : canLockOrUnlock
                  ? 'border-cyan-900 bg-cyan-950 text-cyan-400 hover:bg-cyan-900 hover:text-white'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-600 cursor-not-allowed'
            }`}
          >
            {entry.locked ? 'Unlock' : 'Lock'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-3 flex flex-col gap-3 animate-in fade-in duration-300">
      <div className="flex flex-wrap items-center justify-between gap-2 border-2 border-b-4 border-zinc-800 bg-black p-3">
        <p className="font-old text-2xl text-amber-500">Shop</p>
        <div className="font-old text-sm text-zinc-300 flex gap-4">
          <span>Coins: {localCoins}</span>
          <span>Locks: {availableLocks}</span>
        </div>
      </div>

      <p className="text-zinc-400 text-sm">
        Shop appears at levels: {SHOP_LEVELS.join(', ')}. Locked items carry up to 2 shop
        appearances.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {itemState.slice(0, 2).map(renderItemCard)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {itemState.slice(2, 5).map(renderItemCard)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {itemState.slice(5, 7).map(renderItemCard)}
      </div>

      <button
        onClick={handleProceed}
        className="font-old text-2xl w-full flex items-center justify-center border-2 border-b-4 border-white bg-white text-black p-2 hover:bg-zinc-300 hover:border-zinc-300 cursor-pointer transition-none uppercase tracking-widest"
      >
        Proceed to Dungeon
      </button>
    </div>
  )
}
