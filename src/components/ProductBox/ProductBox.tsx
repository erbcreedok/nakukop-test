import React, { useMemo } from 'react'
import IProduct from '@/types/IProduct'
import { Button, Flex, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import { useStoreon } from '@/store'
import useRubPrice from '@/hooks/useRubPrice'
import formatCurrencyString from '@/utils/formatCurrencyString'
import RateFlowArrow from '@/components/RateFlowArrow/RateFlowArrow'

interface IProductBoxProps {
  product: IProduct
}
const ProductBox = ({ product }: IProductBoxProps): JSX.Element => {
  const { dispatch, productNames, basket } = useStoreon('productNames', 'basket')
  const productName = useMemo(() => productNames[product.productId], [product, productNames])
  const basketCount = useMemo(
    () => basket.find((item) => item.product.productId === product.productId)?.count || 0,
    [basket, product]
  )
  function addToBasket(): void {
    dispatch('basket/add', product)
  }
  const [ruPrice, rateFlow] = useRubPrice(product.price)

  return (
    <Flex direction="column" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Stat mr={2}>
        <StatLabel>{productName?.name || product.productId}</StatLabel>
        <StatNumber>
          {formatCurrencyString(ruPrice)} ₽ <RateFlowArrow rateFlow={rateFlow} />{' '}
        </StatNumber>
        <StatHelpText>{product.count} в наличии</StatHelpText>
      </Stat>
      <Button
        mt="auto"
        size="sm"
        colorScheme="teal"
        onClick={addToBasket}
        isDisabled={basketCount >= product.count}
      >
        Добавить в корзину {!!basketCount && `(${basketCount})`}
      </Button>
    </Flex>
  )
}

export default ProductBox
