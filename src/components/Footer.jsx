import { Box, Heading, Stack } from '@chakra-ui/react'
import React from "react"
import { Copyright } from './Copyright'
import { Logo } from './Logo'
import { SocialMediaLinks } from './SocialMediaLinks'
import { NomicsCredit } from './NomicsCredit'

export const Footer = () => {
  return (
    <Box>
      <Stack>
        <Stack direction="row" spacing="4" align="center" justify="space-between">

          <Logo />
          <Heading size="md">CryptoPlayground</Heading>
          <SocialMediaLinks />
        </Stack>

        <Copyright
          alignSelf={{
            base: 'center',
            sm: 'start',
          }}
        />
            <NomicsCredit/>
      </Stack>
    </Box>
  )
}