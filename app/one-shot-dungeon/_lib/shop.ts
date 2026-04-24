import type { Stats, Enhancement } from './character'

export type ClassName = 'Barbarian' | 'Warlock' | 'Knight' | 'Huntsman' | 'Rogue' | 'Paladin'
export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic'
export type ShopItemSource = 'permanent' | 'global' | 'class'

type ItemEffect =
  | { type: 'heal'; amount: number }
  | { type: 'extraLife' }
  | { type: 'stat'; stat: keyof Stats; amount: number }
  | { type: 'allStats'; amount: number }
  | { type: 'proc'; kind: 'doubleDamage' | 'extraAttack'; chance: number }
  | ItemEffect[]

export type Item = {
  name: string
  description: string
  rarity: Rarity
  price: number
  effect: ItemEffect | string
}

export type ShopItem = Item & {
  instanceId: string
  source: ShopItemSource
}

export type LockedItem = {
  item: ShopItem
  category: 'global' | 'class'
  remainingAppearances: number
}

export const SHOP_LEVELS = [2, 4, 6, 8, 9] as const
const rarityWeights: Record<Rarity, number> = {
  common: 55,
  uncommon: 24,
  rare: 13,
  legendary: 6,
  mythic: 2,
}

const rarityPriceRanges: Record<Rarity, [number, number]> = {
  common: [20, 30],
  uncommon: [35, 50],
  rare: [60, 80],
  legendary: [90, 120],
  mythic: [140, 180],
}

const rarityOrder: Rarity[] = ['common', 'uncommon', 'rare', 'legendary', 'mythic']

const globalItemPool: Array<Omit<Item, 'price'>> = [
  // COMMON
  {
    name: 'Spiked Gloves',
    description: 'Passive: +2 ATK.',
    rarity: 'common',
    effect: { type: 'stat', stat: 'atk', amount: 2 },
  },
  {
    name: 'Iron Bracers',
    description: 'Passive: +2 DEF.',
    rarity: 'common',
    effect: { type: 'stat', stat: 'def', amount: 2 },
  },
  {
    name: 'Fleet Strap',
    description: 'Passive: +2 SPD.',
    rarity: 'common',
    effect: { type: 'stat', stat: 'spd', amount: 2 },
  },
  {
    name: 'Minor Vital Draught',
    description: 'Instant: recover 15 HP.',
    rarity: 'common',
    effect: { type: 'heal', amount: 15 },
  },

  // UNCOMMON
  {
    name: 'Sharpened Edge',
    description: 'Passive: +4 ATK.',
    rarity: 'uncommon',
    effect: { type: 'stat', stat: 'atk', amount: 4 },
  },
  {
    name: 'Reinforced Plates',
    description: 'Passive: +4 DEF.',
    rarity: 'uncommon',
    effect: { type: 'stat', stat: 'def', amount: 4 },
  },
  {
    name: 'Swift Band',
    description: 'Passive: +3 SPD.',
    rarity: 'uncommon',
    effect: { type: 'stat', stat: 'spd', amount: 3 },
  },
  {
    name: 'Battle Tonic',
    description: 'Instant: recover 25 HP.',
    rarity: 'uncommon',
    effect: { type: 'heal', amount: 25 },
  },

  // RARE
  {
    name: 'War Sigil',
    description: 'Passive: +3 to all stats.',
    rarity: 'rare',
    effect: { type: 'allStats', amount: 3 },
  },
  {
    name: 'Execution Mark',
    description: 'Passive: +15% double-damage chance.',
    rarity: 'rare',
    effect: { type: 'proc', kind: 'doubleDamage', chance: 0.15 },
  },
  {
    name: 'Momentum Crest',
    description: 'Passive: +15% extra-attack chance.',
    rarity: 'rare',
    effect: { type: 'proc', kind: 'extraAttack', chance: 0.15 },
  },

  // LEGENDARY
  {
    name: 'Titan Plating',
    description: 'Passive: +30 HP, +6 DEF.',
    rarity: 'legendary',
    effect: [
      { type: 'stat', stat: 'hp', amount: 30 },
      { type: 'stat', stat: 'def', amount: 6 },
    ],
  },
  {
    name: 'Blood Engine',
    description: 'Passive: +8 ATK, +10% double-damage.',
    rarity: 'legendary',
    effect: [
      { type: 'stat', stat: 'atk', amount: 8 },
      { type: 'proc', kind: 'doubleDamage', chance: 0.1 },
    ],
  },
  {
    name: 'Velocity Core',
    description: 'Passive: +5 SPD, +10% extra-attack.',
    rarity: 'legendary',
    effect: [
      { type: 'stat', stat: 'spd', amount: 5 },
      { type: 'proc', kind: 'extraAttack', chance: 0.1 },
    ],
  },

  // MYTHIC
  {
    name: 'Heart of the Colossus',
    description: 'Passive: +60 HP, +10 DEF.',
    rarity: 'mythic',
    effect: [
      { type: 'stat', stat: 'hp', amount: 60 },
      { type: 'stat', stat: 'def', amount: 10 },
    ],
  },
  {
    name: 'Core of Ruin',
    description: 'Passive: +12 ATK, +20% double-damage.',
    rarity: 'mythic',
    effect: [
      { type: 'stat', stat: 'atk', amount: 12 },
      { type: 'proc', kind: 'doubleDamage', chance: 0.2 },
    ],
  },
]

const classItemPool: Record<ClassName, Array<Omit<Item, 'price'>>> = {
  // 🟥 BARBARIAN — HP + ATK (bruiser)
  Barbarian: [
    {
      name: 'Spiked Pauldrons',
      description: 'Passive: +5 ATK.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'atk', amount: 5 },
    },
    {
      name: 'Thick Hide',
      description: 'Passive: +30 HP.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'hp', amount: 30 },
    },

    {
      name: 'Rage Totem',
      description: 'Passive: +20% double-damage.',
      rarity: 'rare',
      effect: { type: 'proc', kind: 'doubleDamage', chance: 0.2 },
    },
    {
      name: 'War Banner',
      description: 'Passive: +6 ATK, +2 SPD.',
      rarity: 'rare',
      effect: [
        { type: 'stat', stat: 'atk', amount: 6 },
        { type: 'stat', stat: 'spd', amount: 2 },
      ],
    },

    {
      name: 'Colossus Heart',
      description: 'Passive: +80 HP, +6 DEF.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'hp', amount: 80 },
        { type: 'stat', stat: 'def', amount: 6 },
      ],
    },
    {
      name: 'Worldbreaker',
      description: 'Passive: +10 ATK, +20% extra-attack.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'atk', amount: 10 },
        { type: 'proc', kind: 'extraAttack', chance: 0.2 },
      ],
    },

    {
      name: 'Avatar of War',
      description: 'Passive: +120 HP, +15 ATK, +25% double-damage.',
      rarity: 'mythic',
      effect: [
        { type: 'stat', stat: 'hp', amount: 120 },
        { type: 'stat', stat: 'atk', amount: 15 },
        { type: 'proc', kind: 'doubleDamage', chance: 0.25 },
      ],
    },
  ],

  // 🟪 WARLOCK — ATK + proc scaling (glass cannon)
  Warlock: [
    {
      name: 'Hex Grimoire',
      description: 'Passive: +5 ATK.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'atk', amount: 5 },
    },
    {
      name: 'Dark Pact',
      description: 'Passive: +25 HP, +4 ATK.',
      rarity: 'uncommon',
      effect: [
        { type: 'stat', stat: 'hp', amount: 25 },
        { type: 'stat', stat: 'atk', amount: 4 },
      ],
    },

    {
      name: 'Void Brand',
      description: 'Passive: +18% double-damage.',
      rarity: 'rare',
      effect: { type: 'proc', kind: 'doubleDamage', chance: 0.18 },
    },
    {
      name: 'Abyssal Focus',
      description: 'Passive: +8 ATK, +2 SPD.',
      rarity: 'rare',
      effect: [
        { type: 'stat', stat: 'atk', amount: 8 },
        { type: 'stat', stat: 'spd', amount: 2 },
      ],
    },

    {
      name: 'Soul Furnace',
      description: 'Passive: +12 ATK, +10% extra-attack.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'atk', amount: 12 },
        { type: 'proc', kind: 'extraAttack', chance: 0.1 },
      ],
    },
    {
      name: 'Void Core',
      description: 'Passive: +10 ATK, +25% double-damage.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'atk', amount: 10 },
        { type: 'proc', kind: 'doubleDamage', chance: 0.25 },
      ],
    },

    {
      name: 'Doom Engine',
      description: 'Passive: +18 ATK, +30% double-damage.',
      rarity: 'mythic',
      effect: [
        { type: 'stat', stat: 'atk', amount: 18 },
        { type: 'proc', kind: 'doubleDamage', chance: 0.3 },
      ],
    },
  ],

  // 🟦 KNIGHT — DEF + HP (true tank)
  Knight: [
    {
      name: 'Steel Bulwark',
      description: 'Passive: +6 DEF.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'def', amount: 6 },
    },
    {
      name: 'Reinforced Frame',
      description: 'Passive: +40 HP.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'hp', amount: 40 },
    },

    {
      name: 'Tower Shield',
      description: 'Passive: +8 DEF, +20 HP.',
      rarity: 'rare',
      effect: [
        { type: 'stat', stat: 'def', amount: 8 },
        { type: 'stat', stat: 'hp', amount: 20 },
      ],
    },
    {
      name: 'Shield Discipline',
      description: 'Passive: +15% extra-attack.',
      rarity: 'rare',
      effect: { type: 'proc', kind: 'extraAttack', chance: 0.15 },
    },

    {
      name: 'Fortress Core',
      description: 'Passive: +12 DEF, +60 HP.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'def', amount: 12 },
        { type: 'stat', stat: 'hp', amount: 60 },
      ],
    },
    {
      name: 'Iron Resolve',
      description: 'Passive: +10 DEF, +15% double-damage.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'def', amount: 10 },
        { type: 'proc', kind: 'doubleDamage', chance: 0.15 },
      ],
    },

    {
      name: 'Living Bastion',
      description: 'Passive: +18 DEF, +100 HP.',
      rarity: 'mythic',
      effect: [
        { type: 'stat', stat: 'def', amount: 18 },
        { type: 'stat', stat: 'hp', amount: 100 },
      ],
    },
  ],

  // 🟩 HUNTSMAN — SPD + consistent output
  Huntsman: [
    {
      name: 'Feather Boots',
      description: 'Passive: +4 SPD.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'spd', amount: 4 },
    },
    {
      name: 'Light Draw Bow',
      description: 'Passive: +4 ATK.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'atk', amount: 4 },
    },

    {
      name: 'Ranger Harness',
      description: 'Passive: +3 ATK, +3 SPD.',
      rarity: 'rare',
      effect: [
        { type: 'stat', stat: 'atk', amount: 3 },
        { type: 'stat', stat: 'spd', amount: 3 },
      ],
    },
    {
      name: 'Precision Mark',
      description: 'Passive: +18% double-damage.',
      rarity: 'rare',
      effect: { type: 'proc', kind: 'doubleDamage', chance: 0.18 },
    },

    {
      name: 'Windrunner Core',
      description: 'Passive: +6 SPD, +10% extra-attack.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'spd', amount: 6 },
        { type: 'proc', kind: 'extraAttack', chance: 0.1 },
      ],
    },
    {
      name: 'Ghost Aim',
      description: 'Passive: +8 ATK, +20% double-damage.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'atk', amount: 8 },
        { type: 'proc', kind: 'doubleDamage', chance: 0.2 },
      ],
    },

    {
      name: 'Wraithstep',
      description: 'Passive: +10 SPD, +25% extra-attack.',
      rarity: 'mythic',
      effect: [
        { type: 'stat', stat: 'spd', amount: 10 },
        { type: 'proc', kind: 'extraAttack', chance: 0.25 },
      ],
    },
  ],

  // 🟨 ROGUE — ATK + SPD burst
  Rogue: [
    {
      name: 'Quick Blades',
      description: 'Passive: +5 ATK.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'atk', amount: 5 },
    },
    {
      name: 'Shadow Boots',
      description: 'Passive: +4 SPD.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'spd', amount: 4 },
    },

    {
      name: 'Night Kit',
      description: 'Passive: +4 ATK, +3 SPD.',
      rarity: 'rare',
      effect: [
        { type: 'stat', stat: 'atk', amount: 4 },
        { type: 'stat', stat: 'spd', amount: 3 },
      ],
    },
    {
      name: 'Killing Edge',
      description: 'Passive: +20% double-damage.',
      rarity: 'rare',
      effect: { type: 'proc', kind: 'doubleDamage', chance: 0.2 },
    },

    {
      name: 'Phantom Drive',
      description: 'Passive: +8 ATK, +4 SPD.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'atk', amount: 8 },
        { type: 'stat', stat: 'spd', amount: 4 },
      ],
    },
    {
      name: 'Execution Flow',
      description: 'Passive: +10 ATK, +20% extra-attack.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'atk', amount: 10 },
        { type: 'proc', kind: 'extraAttack', chance: 0.2 },
      ],
    },

    {
      name: 'Death Spiral',
      description: 'Passive: +12 ATK, +30% extra-attack.',
      rarity: 'mythic',
      effect: [
        { type: 'stat', stat: 'atk', amount: 12 },
        { type: 'proc', kind: 'extraAttack', chance: 0.3 },
      ],
    },
  ],

  // 🟫 PALADIN — balanced sustain (HP + DEF + mixed)
  Paladin: [
    {
      name: 'Sun Plate',
      description: 'Passive: +4 DEF.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'def', amount: 4 },
    },
    {
      name: 'Blessed Core',
      description: 'Passive: +30 HP.',
      rarity: 'uncommon',
      effect: { type: 'stat', stat: 'hp', amount: 30 },
    },

    {
      name: 'Sanctified Armor',
      description: 'Passive: +5 DEF, +20 HP.',
      rarity: 'rare',
      effect: [
        { type: 'stat', stat: 'def', amount: 5 },
        { type: 'stat', stat: 'hp', amount: 20 },
      ],
    },
    {
      name: 'Judgment Sigil',
      description: 'Passive: +4 ATK, +15% double-damage.',
      rarity: 'rare',
      effect: [
        { type: 'stat', stat: 'atk', amount: 4 },
        { type: 'proc', kind: 'doubleDamage', chance: 0.15 },
      ],
    },

    {
      name: 'Divine Core',
      description: 'Passive: +6 DEF, +6 ATK.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'def', amount: 6 },
        { type: 'stat', stat: 'atk', amount: 6 },
      ],
    },
    {
      name: 'Radiant Engine',
      description: 'Passive: +8 DEF, +10% extra-attack.',
      rarity: 'legendary',
      effect: [
        { type: 'stat', stat: 'def', amount: 8 },
        { type: 'proc', kind: 'extraAttack', chance: 0.1 },
      ],
    },

    {
      name: 'Ascended Core',
      description: 'Passive: +80 HP, +10 DEF, +10 ATK.',
      rarity: 'mythic',
      effect: [
        { type: 'stat', stat: 'hp', amount: 80 },
        { type: 'stat', stat: 'def', amount: 10 },
        { type: 'stat', stat: 'atk', amount: 10 },
      ],
    },
  ],
}

export function getRarityBadgeColor(rarity: Rarity) {
  return (
    {
      common: 'text-zinc-300 border-zinc-700',
      uncommon: 'text-green-400 border-green-900',
      rare: 'text-blue-400 border-blue-900',
      legendary: 'text-amber-400 border-amber-900',
      mythic: 'text-red-400 border-red-900',
    }[rarity] ?? 'text-zinc-300 border-zinc-700'
  )
}

function getRandomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function rarityRoll() {
  const roll = Math.random() * 100
  let cumulative = 0
  let picked: Rarity = 'common'
  for (const rarity of rarityOrder) {
    cumulative += rarityWeights[rarity]
    if (roll <= cumulative) {
      picked = rarity
      break
    }
  }
  return picked
}

function pickByRarity(pool: Array<Omit<Item, 'price'>>, targetRarity: Rarity) {
  const exact = pool.filter((item) => item.rarity === targetRarity)
  if (exact.length > 0) {
    return exact[getRandomInRange(0, exact.length - 1)]
  }

  const fallback = pool.filter((item) => item.rarity !== targetRarity)
  return fallback[getRandomInRange(0, fallback.length - 1)]
}

function withDynamicPrice(item: Omit<Item, 'price'>): Item {
  const [min, max] = rarityPriceRanges[item.rarity]
  return {
    ...item,
    price: getRandomInRange(min, max),
  }
}

export function getPermanentItems(extraLifePurchases: number): ShopItem[] {
  return [
    {
      instanceId: 'permanent-heal-vial',
      source: 'permanent',
      name: 'Heal Vial',
      description: 'Instant use: recover 15 HP immediately.',
      rarity: 'common',
      price: 25,
      effect: { type: 'heal', amount: 15 },
    },
    {
      instanceId: 'permanent-extra-life',
      source: 'permanent',
      name: 'Extra Life',
      description: 'Passive: gain one extra life for this run.',
      rarity: 'legendary',
      price: Math.round(100 * 2 ** extraLifePurchases),
      effect: { type: 'extraLife' },
    },
  ]
}

function generatePoolItems(
  pool: Array<Omit<Item, 'price'>>,
  count: number,
  source: 'global' | 'class',
  usedNames: Set<string>,
) {
  const results: ShopItem[] = []
  let guard = 0
  while (results.length < count && guard < 60) {
    const rarity = rarityRoll()
    const picked = withDynamicPrice(pickByRarity(pool, rarity))
    if (usedNames.has(picked.name)) {
      guard += 1
      continue
    }
    usedNames.add(picked.name)
    results.push({
      ...picked,
      instanceId: `${source}-${picked.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(16).slice(2, 8)}`,
      source,
    })
    guard += 1
  }
  return results
}

export function buildShop(args: {
  className: ClassName
  extraLifePurchases: number
  lockedItems: LockedItem[]
}) {
  const { className, extraLifePurchases, lockedItems } = args
  const activeLocks = lockedItems.filter((lock) => lock.remainingAppearances > 0)

  const lockedGlobal = activeLocks.filter((item) => item.category === 'global').slice(0, 3)
  const lockedClass = activeLocks.filter((item) => item.category === 'class').slice(0, 2)

  const usedNames = new Set<string>([
    ...lockedGlobal.map((entry) => entry.item.name),
    ...lockedClass.map((entry) => entry.item.name),
  ])

  const globalRolled = generatePoolItems(
    globalItemPool,
    3 - lockedGlobal.length,
    'global',
    usedNames,
  )
  const classRolled = generatePoolItems(
    classItemPool[className],
    2 - lockedClass.length,
    'class',
    usedNames,
  )

  return {
    permanent: getPermanentItems(extraLifePurchases),
    global: [...lockedGlobal.map((entry) => entry.item), ...globalRolled],
    class: [...lockedClass.map((entry) => entry.item), ...classRolled],
    carriedLocks: activeLocks,
  }
}

export type CharacterState = {
  name: string
  className: string
  stats: Stats
  effects?: Enhancement['effects']
}

export function applyPurchasedEffects(current: CharacterState, items: ShopItem[]) {
  const nextCharacter = {
    ...current,
    stats: { ...current.stats },
    effects: { ...current.effects },
  }

  let gainedExtraLives = 0

  const applySingleEffect = (effect: ItemEffect | string) => {
    if (typeof effect === 'string') {
      console.warn(`String effect ${effect} encountered, but not supported dynamically.`)
      return
    }

    if (Array.isArray(effect)) {
      for (const child of effect) {
        applySingleEffect(child)
      }
      return
    }

    if (effect.type === 'stat') {
      nextCharacter.stats[effect.stat as keyof Stats] += effect.amount
    } else if (effect.type === 'allStats') {
      nextCharacter.stats.hp += effect.amount
      nextCharacter.stats.atk += effect.amount
      nextCharacter.stats.def += effect.amount
      nextCharacter.stats.spd += effect.amount
    } else if (effect.type === 'proc') {
      if (effect.kind === 'doubleDamage') {
        nextCharacter.effects = {
          ...nextCharacter.effects,
          doubleDamageChance: (nextCharacter.effects?.doubleDamageChance ?? 0) + effect.chance,
        }
      } else if (effect.kind === 'extraAttack') {
        nextCharacter.effects = {
          ...nextCharacter.effects,
          extraAttackChance: (nextCharacter.effects?.extraAttackChance ?? 0) + effect.chance,
        }
      }
    } else if (effect.type === 'extraLife') {
      gainedExtraLives += 1
    } else if (effect.type === 'heal') {
      nextCharacter.stats.hp += effect.amount
    }
  }

  for (const purchased of items) {
    applySingleEffect(purchased.effect)
  }

  return { nextCharacter, gainedExtraLives }
}
