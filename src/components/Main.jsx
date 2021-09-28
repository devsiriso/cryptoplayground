import {
  Flex, Heading, useToast,
  VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { retrievePortfolio, storePortfolio } from '../services/StorageService';
import { roundToTwo } from '../Util';
import { CoinList } from './CoinList';
import { Footer } from './Footer';
import { Header } from './Header';
import { Market } from './Market';
import { Money } from './Money';
import { MoneyButton } from './MoneyButton';
import { SellButton } from './SellButton';

export const Main = () => {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1200);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  useEffect(() => {
    setCoins(retrievePortfolio());
  }, [])

  const [money, setMoney] = useState(1000);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    storePortfolio(coins);
  }, [coins])

  const purchaseCoin = (coin, amount) => {
    if (canAfford(coin, amount)) {
      if (coins.some(e => e.id === coin.id)) {
        let temp = [...coins];
        let index = coins.findIndex(e => e.id === coin.id);
        temp[index].amountOwned += Number(amount);
        setCoins(temp);
        
      } else {
        coin.amountOwned = Number(amount);
        setCoins(prevState => [...prevState, coin]);

      }
      setMoney(money - Number(coin.price * amount));
      spawnToast(
        `You successfully acquired ${amount} ${coin.id} for $${roundToTwo(
          coin.price * amount
        )}`
      );
    } else {
      spawnToast(
        `You cannot afford to buy ${amount} ${coin.id} due to lack of funds.`,
        'error'
      );
    }
  };

  const sellCoin = (coin, amount) => {
    let temp = [...coins];
    let index = temp.findIndex(e => e.id === coin.id);
    temp[index].amountOwned = temp[index].amountOwned - amount;
    if (temp[index].amountOwned === 0) temp.splice(index, 1);
    setCoins(temp);
    setMoney(money + Number(coin.price * amount)); // TODO: Fetch new price
    spawnToast(
      `You successfully sold your ${amount} ${coin.id} for $${roundToTwo(
        coin.price * amount
      )}`
    );
  };

  const sellAllCoins = () => {
    let moneyEarned = calculatePortfolioValue();
    spawnToast(
      `You've launched off to the moon! Earning you $${roundToTwo(
        moneyEarned
      )}!`,
      'success'
    );
    setCoins([]);
    setMoney(money + moneyEarned);
  };

  const calculatePortfolioValue = () => {
    let value = 0;
    coins.forEach(element => {
      value += element.amountOwned * element.price;
    });

    return value;
  };

  const addMoney = () => {
    spawnToast(
      "You have added $100 to your ",
      'warning'
    );
    setMoney(money + 100);
  };

  const canAfford = (coin, amount) => {
    return money > coin.price * amount;
  };

  const toast = useToast();
  const spawnToast = (description, status, position) => {
    toast({
      description: description,
      status: status,
      position: position,
      duration: 2000,
    });
  };

  return (
    <Flex p={2} align="center">
      <VStack justifyContent="space-between" width="100%">
        <Header />
        <Heading size="md" textAlign="center">
          Marketplace
        </Heading>
        <Market
          isDesktop={isDesktop}
          spawnToast={spawnToast}
          money={money}
          setMoney={setMoney}
          purchaseCoin={purchaseCoin}
        />
        <CoinList
          isDesktop={isDesktop}
          spawnToast={spawnToast}
          coins={coins}
          sellCoin={sellCoin}
        />
        <Money money={money} />
        {isDesktop ? (
          <Flex 
            width="100vw" 
            justifyContent="space-between"
          >
            <MoneyButton 
              addMoney={addMoney} 
              width="50vw" 
            />
            <SellButton
              sellAllCoins={sellAllCoins}
              width="50vw"
              calculatePortfolioValue={calculatePortfolioValue}
            />
          </Flex>
        ) : (
          <Flex 
            flexDirection="column" 
            width="100vw"
            >
            <MoneyButton 
              addMoney={addMoney} 
              width="auto" 
              />
            <SellButton
              sellAllCoins={sellAllCoins}
              calculatePortfolioValue={calculatePortfolioValue}
              width="auto"
            />
          </Flex>
        )}
        <Footer />
      </VStack>
    </Flex>
  );
};
