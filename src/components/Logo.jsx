import { chakra, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const Logo = (props) => {
  return (
    <chakra.svg
      color={useColorModeValue('blue.500', 'blue.300')}
      aria-hidden
      viewBox="0 0 27 24"
      fill="none"
      h="6"
      flexShrink={0}
      {...props}
    >
      <path
        d="M25 23ZL25 24M13 24A1 1 0 0012 0A1 1 0 0013 24M27 0 27 24 0 12"
        fill="currentColor"
      />
    </chakra.svg>
  )
}
