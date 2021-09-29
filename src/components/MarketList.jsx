import {
  Divider,
  Flex,
  HStack,
  Image,
  List,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import { getCoinsFromApi, getLastFetchDate } from '../services/ApiService';
import { roundToTwo } from '../Util';
import { BuyModal } from './BuyModal';

export const MarketList = ({
  marketCoins,
  getColor,
  purchaseCoin,
  money,
  spawnToast,
  setMarketCoins,
}) => {
  const toast = useToast();
  const [lastFetch, setLastFetch] = useState(getLastFetchDate());
  const handleRefresh = () => {
    getCoinsFromApi(toast).then(r => r.json().then(r => {
        setLastFetch(getLastFetchDate());
        setMarketCoins(r)
    }));
  };

  return (
    <Flex direction="column" width="100%" align="center">
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
            <Flex direction="column" key={coin.id}>
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
                    size="xs"
                  />
                </HStack>
              </Flex>
              <Divider m={2} />
            </Flex>
          ))}
      </List>
      <Text as="u" onClick={() => handleRefresh()} textAlign="center">
        Last update: {lastFetch.toUTCString()} (click to refresh)
      </Text>
    </Flex>
  );
};
