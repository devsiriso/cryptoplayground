import { Flex, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getCoinsFromApi, getDebugCoins } from '../services/ApiService';
import { MarketList } from './MarketList';
import { MarketTable } from './MarketTable';
// DECENT LOOKING COINS: BTC,TRX,TEL,BNB,ETC,USDP:

export const Market = ({ purchaseCoin, money, spawnToast, isDesktop }) => {
  const [marketCoins, setMarketCoins] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastFetch, setLastFetch] = useState(new Date().toUTCString());
  const toast = useToast();

  useEffect(() => {
    // getCoinsFromApi().then(
    //   response => {
    //     response.json().then(coins => {
    //       setMarketCoins(coins);
    //       setIsLoaded(true);
    //       spawnToast('Retrieved market information.', 'success');
    //     });
    //   },
    //   error => {
    //     spawnToast('Failed to retrieve market information.', 'error');
    //   }
    // );

    getCoinsFromApi(toast).then(r => r.json().then(r => setMarketCoins(r)));
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
          isLoaded={isLoaded}
          setMarketCoins={setMarketCoins}
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
