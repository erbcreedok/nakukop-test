import React from 'react'
import { Avatar } from '@chakra-ui/react'

const Footer = (): JSX.Element => {
  return (
    <footer>
      <a href="https://github.com/erbcreedok" target="_blank" rel="noopener noreferrer">
        Created by Erbcreedok{' '}
        <Avatar
          marginLeft="10px"
          name="Erbcreedok"
          src="https://avatars.githubusercontent.com/u/18354078?v=4"
        />
      </a>
    </footer>
  )
}

export default Footer
