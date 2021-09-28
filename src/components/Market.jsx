import {
  Flex
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getMarketCoins } from '../services/ApiService';
import { MarketList } from './MarketList';
import { MarketTable } from './MarketTable';
// DECENT LOOKING COINS: BTC,TRX,TEL,BNB,ETC,USDP:

export const Market = ({ purchaseCoin, money, spawnToast, isDesktop }) => {
  const COINS_TO_FETCH =
    'BTC, ETH, BNB, USDP,BTC,TRX,TEL,BNB,ETC,USDP,DOGE,ADA,SOL,USDT,BCH';
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL = `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&ids=${COINS_TO_FETCH}&interval=1d,30d&per-page=100&page=1`;

  const [marketCoins, setMarketCoins] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastFetch, setLastFetch] = useState(new Date().toUTCString());

  const fetchCoins = async () => {
    fetch(URL, { mode: 'cors' })
      .then(res => res.json())
      .then(
        res => {
          setIsLoaded(true);
          setLastFetch(new Date().toUTCString());
          setMarketCoins(res);
          spawnToast("Retrieved market information")
        },
        err => {
          spawnToast("Failed to retrieve market information.", "error")
        }
      );
  };

  useEffect(() => {
    fetchCoins();
    // setMarketCoins(getMarketCoins());
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
          fetchCoins={fetchCoins}
          lastFetch={lastFetch}
        />
      ) : (
        <MarketList
          marketCoins={marketCoins}
          getColor={getColor}
          purchaseCoin={purchaseCoin}
          money={money}
          spawnToast={spawnToast}
          fetchCoins={fetchCoins}
          lastFetch={lastFetch}
        />
      )}
    </Flex>
  );
};
