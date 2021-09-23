import { Flex, Heading } from "@chakra-ui/react";
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from './Logo';

export const Header = () => {
    return (
        <Flex align="center" justify="space-between" paddingLeft={25} paddingRight={25} maxHeight={50}>
            <Logo />
            <Heading size="md">CryptoPlayground</Heading>
            <ColorModeSwitcher/>
        </Flex>

    )
}

