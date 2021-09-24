import {
  Divider,
  Flex,
  HStack,
  Image,
  List,
  Text,
  Heading,
  Container,
} from '@chakra-ui/react';
import React from 'react';
import { roundToTwo } from '../Util';
import { BuyModal } from './BuyModal';

export const MarketList = ({
  marketCoins,
  getColor,
  purchaseCoin,
  money,
  spawnToast,
}) => {
  return (
    <List
        width="100%"
        maxHeight="50vh"
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          overflowInline: 'hidden',
        }}
      >
          <Divider m={2} />
        {marketCoins &&
          marketCoins.map((coin, i) => (
            <Flex direction="column">
              <Flex key={coin.id} justifyContent="space-between">
                <HStack>
                  <Image src={coin.logo_url} boxSize="30px" />
                  <Flex direction="column" style={{ textAlign: 'left' }}>
                    <Text>{coin.id}</Text>
                    <Text fontSize="sm">{coin.name}</Text>
                  </Flex>
                </HStack>

                <HStack>
                  <Flex direction="column" style={{ textAlign: 'right' }}>
                    <Text>${roundToTwo(coin.price)}</Text>
                    <Text
                      fontSize="sm"
                      color={getColor(coin['1d'].price_change_pct)}
                    >
                      {roundToTwo(coin['1d'].price_change)} ({roundToTwo(coin['1d'].price_change_pct)}%)
                    </Text>
                  </Flex>
                  <BuyModal
                    showModalButtonText="+"
                    coin={coin}
                    money={money}
                    purchaseCoin={purchaseCoin}
                    spawnToast={spawnToast}
                  />
                </HStack>
              </Flex>
              <Divider m={2} />
            </Flex>
          ))}
      </List>
  );
};
