import { Flex, Heading, Stack } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { InfoButton } from './InfoButton';
import { Logo } from './Logo';

export const Header = () => {
  return (
    <Flex justify="center" height="10%" justifyContent="space-between" width="100%">
      <ColorModeSwitcher/>
      {/* <Heading size="md">CryptoPlayground</Heading> */}
      {/* <Logo /> */}
      {/* <ColorModeSwitcher/> */}

      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Logo />
        <Heading size="lg">CryptoPlayground</Heading>
      </Stack>
      <InfoButton/>
    </Flex>
  );
};
