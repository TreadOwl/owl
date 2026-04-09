export type Stats = {
  hp: number
  atk: number
  def: number
  spd: number
}

export type CharacterClass = {
  name: string
  description: string
  baseStats: {
    hp: [number, number]
    atk: [number, number]
    def: [number, number]
    spd: [number, number]
  }
}

export const classes: CharacterClass[] = [
  {
    name: 'Barbarian',
    description: 'A blood-soaked brute who solves every problem by hitting it harder.',
    baseStats: { hp: [19, 23], atk: [13, 16], def: [5, 7], spd: [3, 5] },
  },
  {
    name: 'Warlock',
    description: 'A frail vessel of forbidden power, burning life to unleash ruin.',
    baseStats: { hp: [9, 11], atk: [15, 19], def: [3, 5], spd: [6, 8] },
  },
  {
    name: 'Knight',
    description: 'A walking fortress, slow and unyielding, crushing foes through endurance.',
    baseStats: { hp: [17, 21], atk: [8, 10], def: [14, 18], spd: [2, 4] },
  },
  {
    name: 'Huntsman',
    description: 'A silent predator who strikes first, and is gone before death notices.',
    baseStats: { hp: [10, 12], atk: [10, 12], def: [4, 6], spd: [9, 11] },
  },
  {
    name: 'Rogue',
    description: 'A gutter-born killer who trades honor for speed and lethal precision.',
    baseStats: { hp: [10, 12], atk: [14, 17], def: [4, 6], spd: [8, 10] },
  },
  {
    name: 'Paladin',
    description: 'A stubborn zealot who refuses to fall, no matter how long the fight drags on.',
    baseStats: { hp: [14, 18], atk: [9, 11], def: [10, 13], spd: [5, 7] },
  },
]

export type Enhancement = {
  name: string
  description: string
  statBonus: number
  effects?: {
    doubleDamageChance?: number
    extraAttackChance?: number
  }
  probability: number
}

export const barbarianEnhancements: Enhancement[] = [
  {
    name: 'Barbarian Grunt',
    description: 'Just another brute, angry but unremarkable.',
    statBonus: 0,
    probability: 62.5,
  },
  {
    name: 'Barbarian Elite',
    description: 'Hardened by countless skirmishes, strikes hit heavier.',
    statBonus: 5,
    probability: 20,
  },
  {
    name: 'Barbarian Chief',
    description: 'A warleader whose blows can shatter bone in a single swing.',
    statBonus: 8,
    effects: {
      doubleDamageChance: 0.15,
    },
    probability: 10,
  },
  {
    name: 'Barbarian Legend',
    description: 'Songs are sung of their fury—each strike threatens devastation.',
    statBonus: 12,
    effects: {
      doubleDamageChance: 0.25,
    },
    probability: 5,
  },
  {
    name: 'Berserker',
    description: 'Lost to rage, striking wildly with unstoppable force.',
    statBonus: 20,
    effects: {
      doubleDamageChance: 0.33,
      extraAttackChance: 0.15,
    },
    probability: 2,
  },
  {
    name: 'Wargod',
    description: 'An avatar of destruction—every swing echoes like thunder.',
    statBonus: 30,
    effects: {
      doubleDamageChance: 0.5,
      extraAttackChance: 0.33,
    },
    probability: 0.5,
  },
]

export const warlockEnhancements: Enhancement[] = [
  {
    name: 'Warlock Acolyte',
    description: 'A mere student of the arcane, wielding unstable and shallow power.',
    statBonus: 0,
    probability: 62.5,
  },
  {
    name: 'Warlock Invoker',
    description: 'Has begun to whisper to forces that whisper back.',
    statBonus: 5,
    probability: 20,
  },
  {
    name: 'Warlock Hexbinder',
    description: 'Curses seep into every strike, unraveling foes from within.',
    statBonus: 8,
    effects: { doubleDamageChance: 0.15 },
    probability: 10,
  },
  {
    name: 'Warlock Voidcaller',
    description: 'Channels the abyss itself—each attack threatens collapse.',
    statBonus: 12,
    effects: { doubleDamageChance: 0.25 },
    probability: 5,
  },
  {
    name: 'Soulreaper',
    description: 'Harvests life with every motion, leaving nothing but echoes.',
    statBonus: 20,
    effects: { doubleDamageChance: 0.33, extraAttackChance: 0.15 },
    probability: 2,
  },
  {
    name: 'Doombringer',
    description: 'An omen given form—destruction follows without mercy.',
    statBonus: 30,
    effects: { doubleDamageChance: 0.5, extraAttackChance: 0.33 },
    probability: 0.5,
  },
]

export const knightEnhancements: Enhancement[] = [
  {
    name: 'Squire Knight',
    description: 'Barely blooded, armor still shines brighter than experience.',
    statBonus: 0,
    probability: 62.5,
  },
  {
    name: 'Vanguard Knight',
    description: 'Holds the line with growing resolve and hardened steel.',
    statBonus: 5,
    probability: 20,
  },
  {
    name: 'Bulwark Knight',
    description: 'An immovable wall, turning defense into crushing retaliation.',
    statBonus: 8,
    effects: { doubleDamageChance: 0.15 },
    probability: 10,
  },
  {
    name: 'Ironwarden',
    description: 'Encased in unbreakable will, every strike lands with authority.',
    statBonus: 12,
    effects: { doubleDamageChance: 0.25 },
    probability: 5,
  },
  {
    name: 'Juggernaut',
    description: 'Advances without pause, smashing through anything in the way.',
    statBonus: 20,
    effects: { doubleDamageChance: 0.33, extraAttackChance: 0.15 },
    probability: 2,
  },
  {
    name: 'Titan',
    description: 'A living fortress—each blow echoes like a siege hammer.',
    statBonus: 30,
    effects: { doubleDamageChance: 0.5, extraAttackChance: 0.33 },
    probability: 0.5,
  },
]

export const huntsmanEnhancements: Enhancement[] = [
  {
    name: 'Tracker Huntsman',
    description: 'Follows trails and instincts, but lacks deadly precision.',
    statBonus: 0,
    probability: 62.5,
  },
  {
    name: 'Stalker Huntsman',
    description: 'Moves unseen, strikes cleaner, leaves no trace behind.',
    statBonus: 5,
    probability: 20,
  },
  {
    name: 'Deadeye Huntsman',
    description: 'Finds the weak point every time—precision turns lethal.',
    statBonus: 8,
    effects: { doubleDamageChance: 0.15 },
    probability: 10,
  },
  {
    name: 'Shadowstalker',
    description: 'A blur between moments, each shot hitting before seen.',
    statBonus: 12,
    effects: { doubleDamageChance: 0.25 },
    probability: 5,
  },
  {
    name: 'Phantom',
    description: 'Strikes from nowhere, again and again before fading.',
    statBonus: 20,
    effects: { doubleDamageChance: 0.33, extraAttackChance: 0.15 },
    probability: 2,
  },
  {
    name: 'Wraith',
    description: 'Not quite alive, not quite gone—death delivered silently.',
    statBonus: 30,
    effects: { doubleDamageChance: 0.5, extraAttackChance: 0.33 },
    probability: 0.5,
  },
]

export const rogueEnhancements: Enhancement[] = [
  {
    name: 'Cutpurse Thief',
    description: 'A petty thief, quick hands but lacking lethal edge.',
    statBonus: 0,
    probability: 62.5,
  },
  {
    name: 'Backstabber Rogue',
    description: 'Learns where to strike—and when not to be seen.',
    statBonus: 5,
    probability: 20,
  },
  {
    name: 'Assassin Rogue',
    description: 'Every movement calculated, every strike meant to kill.',
    statBonus: 8,
    effects: { doubleDamageChance: 0.15 },
    probability: 10,
  },
  {
    name: 'Nightblade',
    description: 'A shadow with intent—death comes swiftly and quietly.',
    statBonus: 12,
    effects: { doubleDamageChance: 0.25 },
    probability: 5,
  },
  {
    name: 'Executioner',
    description: 'Finishes what others start, often before they can react.',
    statBonus: 20,
    effects: { doubleDamageChance: 0.33, extraAttackChance: 0.15 },
    probability: 2,
  },
  {
    name: 'Reaper',
    description: 'A whisper in the dark—no one survives the encounter.',
    statBonus: 30,
    effects: { doubleDamageChance: 0.5, extraAttackChance: 0.33 },
    probability: 0.5,
  },
]

export const paladinEnhancements: Enhancement[] = [
  {
    name: 'Paladin Devotee',
    description: 'Faithful but untested, conviction yet to be proven.',
    statBonus: 0,
    probability: 62.5,
  },
  {
    name: 'Templar Paladin',
    description: 'Steel and faith combined, standing firm against darkness.',
    statBonus: 5,
    probability: 20,
  },
  {
    name: 'Crusader Paladin',
    description: 'Drives back evil with righteous force and unshaken will.',
    statBonus: 8,
    effects: { doubleDamageChance: 0.15 },
    probability: 10,
  },
  {
    name: 'Justicar',
    description: 'Judgment falls heavy—each strike carries divine weight.',
    statBonus: 12,
    effects: { doubleDamageChance: 0.25 },
    probability: 5,
  },
  {
    name: 'Highlord',
    description: 'A beacon of relentless resolve, striking again and again.',
    statBonus: 20,
    effects: { doubleDamageChance: 0.33, extraAttackChance: 0.15 },
    probability: 2,
  },
  {
    name: 'Ascendant',
    description: 'More force than mortal—an embodiment of unyielding will.',
    statBonus: 30,
    effects: { doubleDamageChance: 0.5, extraAttackChance: 0.33 },
    probability: 0.5,
  },
]

export const enhancementsByClass = {
  Barbarian: barbarianEnhancements,
  Warlock: warlockEnhancements,
  Knight: knightEnhancements,
  Huntsman: huntsmanEnhancements,
  Rogue: rogueEnhancements,
  Paladin: paladinEnhancements,
}
