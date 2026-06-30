import type { Enhancement } from '../_lib/character'

export function CharacterEffectsDisplay({ effects }: { effects?: Enhancement['effects'] }) {
  if (!effects) return null
  return (
    <>
      {effects.doubleDamageChance !== undefined && <span>Double-Damage: {effects.doubleDamageChance * 100}%</span>}
      {effects.extraAttackChance !== undefined && <span>Extra-Attack: {effects.extraAttackChance * 100}%</span>}
    </>
  )
}
