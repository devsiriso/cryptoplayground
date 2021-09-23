import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Grid,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { MarketList } from './MarketList';
import { CoinList } from './CoinList';
import { Footer } from './Footer';
import { Header } from './Header';
import { roundToTwo } from '../Util';
import { Money } from './Money';
import { MoneyButton } from './MoneyButton';
import { SellButton } from './SellButton';

export const Main = () => {
  const [money, setMoney] = useState(1000);
  const [coins, setCoins] = useState([]);

  const purchaseCoin = (coin, amount) => {
    if (canAfford(coin, amount)) {
      if (coins.some(e => e.id === coin.id)) {
        let temp = [...coins];
        let index = coins.findIndex(e => e.id === coin.id);
        temp[index].amountOwned += amount;
        setCoins(temp);
      } else {
        coin.amountOwned = amount;
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
      "YOU'RE BLOODY RICH MATE, WHAT ARE YA GONNA DO WITH ALL THOSE DOLLARYDOOS?",
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
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Header />
        <VStack spacing={4}>
          <MarketList
            spawnToast={spawnToast}
            money={money}
            setMoney={setMoney}
            purchaseCoin={purchaseCoin}
          />
          <CoinList spawnToast={spawnToast} coins={coins} sellCoin={sellCoin} />
          <Money money={money} />
          <HStack>
            <MoneyButton addMoney={addMoney} />
            <SellButton
              sellAllCoins={sellAllCoins}
              calculatePortfolioValue={calculatePortfolioValue}
            />
          </HStack>
        </VStack>
        <Footer></Footer>
      </Grid>
    </Box>
  );
};
