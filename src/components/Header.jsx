import { Flex, Heading, Stack } from "@chakra-ui/react";
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from './Logo';

export const Header = () => {
    return (
        <Flex justify="center" height="10%">
            {/* <Heading size="md">CryptoPlayground</Heading> */}
            {/* <Logo /> */}
            {/* <ColorModeSwitcher/> */}

            <Stack direction="row" spacing="4" align="center" justify="space-between">

          <Logo />
          <Heading size="md" >CryptoPlayground</Heading>
   
        </Stack>
        </Flex>
    )
}

