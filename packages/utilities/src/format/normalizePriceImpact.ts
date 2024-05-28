import { Percent } from '@nizaglobal/sdk-core'

export function normalizePriceImpact(priceImpact: Percent): number {
  return Number(priceImpact.multiply(-1).toFixed(3))
}
