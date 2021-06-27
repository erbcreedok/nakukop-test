import React, { useCallback, useMemo } from 'react'
import {
  Alert,
  AlertDescription,
  Box,
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import IBasketItem from '@/types/IBasketItem'
import { useStoreon } from '@/store'
import useRubPrice from '@/hooks/useRubPrice'
import formatCurrencyString from '@/utils/formatCurrencyString'
import RateFlowArrow from '@/components/RateFlowArrow/RateFlowArrow'

interface IBasketItemProps {
  basketItem: IBasketItem
}
const BasketItem = ({ basketItem }: IBasketItemProps): JSX.Element => {
  const { dispatch, productNames } = useStoreon('productNames')
  const { product, count } = basketItem
  const productName = useMemo(() => productNames[product.productId], [product, productNames])
  const totalPrice = useMemo(() => product.price * count, [product.price, count])
  const [ruProductPrice, rateFlow] = useRubPrice(product.price)
  const [ruTotalPrice] = useRubPrice(totalPrice)

  const handleCountChange = useCallback(
    (stringValue: string, value: number): void => {
      dispatch('basket/setCount', { count: value, productId: product.productId })
    },
    [dispatch, product]
  )
  const handleRemoveItem = useCallback((): void => {
    dispatch('basket/remove', product.productId)
  }, [dispatch, product.productId])

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      backgroundColor="rgba(255,255,255,.7)"
    >
      <Flex>
        <Stat mr={2}>
          <StatLabel>{productName?.name}</StatLabel>
          <StatNumber>{formatCurrencyString(ruTotalPrice)} ₽</StatNumber>
          <StatHelpText>
            <RateFlowArrow rateFlow={rateFlow} />
            {formatCurrencyString(ruProductPrice)} ₽ за шт - {product.count} в наличии
          </StatHelpText>
        </Stat>
        <Flex ml="auto" direction="column" columns={1} spacing={1} width={70} minWidth={70}>
          <NumberInput
            value={count}
            min={1}
            max={product.count}
            size="sm"
            onChange={handleCountChange}
            height="30px"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button size="xs" mt={2} mb="auto" onClick={handleRemoveItem}>
            Удалить
          </Button>
        </Flex>
      </Flex>
      {basketItem.error && (
        <Alert status="error" borderRadius={8} mt={3}>
          <AlertDescription>{basketItem.error}</AlertDescription>
        </Alert>
      )}
    </Box>
  )
}

export default BasketItem
