import RateFlowEnum from '@/types/RateFlowEnum'
import { useStoreon } from '@/store'
import { useMemo } from 'react'

function useRubPrice(dollarPrice: number): [number, RateFlowEnum] {
  const { oldDollarRate, dollarRate } = useStoreon('dollarRate', 'oldDollarRate')
  const price = useMemo(() => dollarPrice * dollarRate, [dollarPrice, dollarRate])
  const rateFlow = useMemo(() => {
    if (!oldDollarRate || oldDollarRate === dollarRate) return RateFlowEnum.stable
    if (oldDollarRate > dollarRate) return RateFlowEnum.shrinking
    return RateFlowEnum.growing
  }, [oldDollarRate, dollarRate])

  return [price, rateFlow]
}

export default useRubPrice
