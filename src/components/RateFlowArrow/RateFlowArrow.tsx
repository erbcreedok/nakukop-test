import React from 'react'
import RateFlowEnum from '@/types/RateFlowEnum'
import { StatArrow } from '@chakra-ui/react'

interface IRateFlowArrowProps {
  rateFlow: RateFlowEnum
}
const RateFlowArrow = ({ rateFlow }: IRateFlowArrowProps): JSX.Element => {
  if (rateFlow === RateFlowEnum.growing) {
    return <StatArrow color="red" type="increase" />
  }
  if (rateFlow === RateFlowEnum.shrinking) {
    return <StatArrow color="green" type="decrease" />
  }
  return <></>
}

export default RateFlowArrow
