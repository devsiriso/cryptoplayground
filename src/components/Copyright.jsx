import { Text } from '@chakra-ui/layout'
import * as React from 'react'

export const Copyright = (props) => (
  <Text fontSize="sm" {...props} color="grey">
    &copy; {new Date().getFullYear()} CryptoPlayground Inc. No rights reserved.
  </Text>
)
