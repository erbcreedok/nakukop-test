import React, { createRef, useState } from 'react'
import { Badge, Box, Heading, IconButton, SimpleGrid, Spacer } from '@chakra-ui/react'
import { useStoreon } from '@/store'
import Icon from '@mdi/react'
import { mdiCart } from '@mdi/js'
import styles from './Basket.module.css'
import classNames from 'classnames'
import useClickOutside from '@/hooks/useClickOutside'
import BasketItem from '@/components/BasketItem'

const Basket = (): JSX.Element => {
  const { basket } = useStoreon('basket')
  const [basketOpened, setBasketOpened] = useState(false)
  const basketContainerRef = createRef<HTMLDivElement>()
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
        {!!basket.length && (
          <Badge borderRadius={5} colorScheme="red" className={styles.basket_badge}>
            {basket.length}
          </Badge>
        )}
      </div>
      <Box className={basketClassNames} ref={basketContainerRef}>
        <SimpleGrid columns={1} spacing={2} p={2}>
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
      </Box>
    </div>
  )
}

export default Basket
