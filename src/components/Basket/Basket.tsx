import React, { createRef, useMemo, useState } from 'react'
import { Badge, Box, Flex, Heading, IconButton, SimpleGrid, Spacer, Text } from '@chakra-ui/react'
import { useStoreon } from '@/store'
import Icon from '@mdi/react'
import { mdiCart } from '@mdi/js'
import styles from './Basket.module.css'
import classNames from 'classnames'
import useClickOutside from '@/hooks/useClickOutside'
import BasketItem from '@/components/BasketItem'
import useRubPrice from '@/hooks/useRubPrice'
import formatCurrencyString from '@/utils/formatCurrencyString'

const Basket = (): JSX.Element => {
  const { basket } = useStoreon('basket')
  const [basketOpened, setBasketOpened] = useState(false)
  const basketContainerRef = createRef<HTMLDivElement>()
  const totalCount = useMemo(() => basket.reduce((acc, item) => acc + item.count, 0), [basket])
  const totalPrice = useMemo(
    () => basket.reduce((acc, item) => acc + item.count * item.product.price, 0),
    [basket]
  )
  const [ruTotalPrice] = useRubPrice(totalPrice)
  useClickOutside(basketContainerRef, () => {
    setBasketOpened(false)
  })
  const toggleBasket = (): void => {
    setBasketOpened(!basketOpened)
  }

  const basketClassNames = classNames({
    [styles.basket_container]: true,
    [styles.basket_container_opened]: basketOpened,
  })

  return (
    <div className={styles.basket}>
      <div className={styles.basket_button}>
        <IconButton
          onClick={toggleBasket}
          size="lg"
          aria-label="Open basket"
          borderRadius="50%"
          colorScheme={basketOpened ? 'teal' : undefined}
          icon={<Icon size={1} path={mdiCart} />}
        />
        {!!totalCount && (
          <Badge borderRadius={5} colorScheme="red" className={styles.basket_badge}>
            {totalCount}
          </Badge>
        )}
      </div>
      <Box pt={4} className={basketClassNames} ref={basketContainerRef}>
        <SimpleGrid columns={1} spacing={2} px={2}>
          {!basket.length && (
            <Heading p={2} size="sm" textAlign="center">
              Корзина пуста
            </Heading>
          )}
          {basket.map((basketItem) => (
            <Box key={basketItem.product.productId}>
              <BasketItem basketItem={basketItem} />
            </Box>
          ))}
          <Spacer />
        </SimpleGrid>
        {!!totalPrice && (
          <Flex
            px={2}
            py={4}
            borderTop="1px solid rgba(0,0,0,.1)"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Text fontWeight="200" mr={2}>
              Общая стоймость:
            </Text>
            <Badge fontSize="xl" colorScheme="green">
              {formatCurrencyString(ruTotalPrice)} ₽
            </Badge>
          </Flex>
        )}
      </Box>
    </div>
  )
}

export default Basket
