import { Flex, Image, Text } from '@chakra-ui/react'
import React from "react"

export const CoinList = props => {
    return (
        <Flex flexDirection="column" width="100%" justifyContent="space-around">
            <Flex minH={50}wrap="wrap" border="1px solid grey" borderRadius={5} justifyContent="space-around" p={2}>
                {props.coins.length ? props.coins.map((x, i) => (
                    <Flex key={x.id} onClick={() => props.sellCoin(x)} >
                        <Image boxSize={30} src={x.logo_url} />
                        <Text marginLeft={2}>{x.amountOwned}</Text>
                    </Flex>
                )): <Text color="gray">Your coins will appear here.</Text>}
            </Flex>
        </Flex>
    )
}