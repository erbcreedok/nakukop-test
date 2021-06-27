import React, { useMemo } from 'react'
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'
import mapObjectToArray from '@/utils/mapObjectToArray'
import IGroupName from '@/types/IGroupName'
import ProductBox from '@/components/ProductBox'
import IProduct from '@/types/IProduct'
import { useStoreon } from '@/store'

const ProductsGrid = (): JSX.Element => {
  const { groupNames, products } = useStoreon('groupNames', 'products')
  const groups = useMemo(() => {
    const groupProducts: {
      [key: string]: {
        groupName: IGroupName
        products: IProduct[]
      }
    } = {}
    products.forEach((product) => {
      if (groupProducts[product.groupId]) {
        groupProducts[product.groupId].products.push(product)
      } else {
        groupProducts[product.groupId] = {
          groupName: groupNames[product.groupId],
          products: [product],
        }
      }
    })
    return mapObjectToArray(groupProducts)
  }, [products, groupNames])
  return (
    <Container maxW="main.100">
      {groups.map(({ groupName, products }) => (
        <Box key={groupName.id} py={4}>
          <Heading size="m" mb={2}>
            {groupName.name}
          </Heading>
          <SimpleGrid columns={[1, 1, 2, 3]} spacing={5}>
            {products.map((product) => (
              <ProductBox key={product.productId} product={product} />
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </Container>
  )
}

export default ProductsGrid
