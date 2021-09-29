import { Flex, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getCoinsFromApi, getDebugCoins } from '../services/ApiService';
import { MarketList } from './MarketList';
import { MarketTable } from './MarketTable';

export const Market = ({ purchaseCoin, money, spawnToast, isDesktop }) => {
  const [marketCoins, setMarketCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getCoinsFromApi(toast).then(r => r.json().then(r => {
      setMarketCoins(r);
      setIsLoading(true);
    }));
  }, []);

  const getColor = change => {
    if (change < 0) return 'red.400';
    if (change > 0) return 'green.400';
  };

  return (
    <Flex width="100%">
      {isDesktop ? (
        <MarketTable
          marketCoins={marketCoins}
          getColor={getColor}
          purchaseCoin={purchaseCoin}
          money={money}
          spawnToast={spawnToast}
          setMarketCoins={setMarketCoins}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      ) : (
        <MarketList
          marketCoins={marketCoins}
          getColor={getColor}
          purchaseCoin={purchaseCoin}
          money={money}
          spawnToast={spawnToast}
          setMarketCoins={setMarketCoins}
        />
      )}
    </Flex>
  );
};
