import React from 'react'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'
import style from './Header.module.css'
import Basket from '@/components/Basket'

const Header: React.FC = () => {
  return (
    <div className={style.header_wrapper}>
      <header className={style.header}>
        <Container maxW="main.100" height="100%">
          <Flex alignItems="center" height="100%">
            <Heading size="md">Nakukop Test Example</Heading>
            <Box ml="auto">
              <Basket />
            </Box>
          </Flex>
        </Container>
      </header>
    </div>
  )
}

export default Header
