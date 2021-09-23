import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Grid,
  useToast
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

  const purchaseCoin = (coin) => {
    if (canAfford(coin)) {
      if (coins.some(e => e.id === coin.id)) {
        let temp = [...coins];
        let index = coins.findIndex(e => e.id === coin.id);
        temp[index].amountOwned += 1;
        setCoins(temp);
      } else {
        coin.amountOwned = 1;
        setCoins(prevState => [...prevState, coin]);
      }
      setMoney(money - Number(coin.price));
      spawnToast(`You successfully acquired 1 ${coin.id} for $${roundToTwo(coin.price)}`)
    } else {
      spawnToast(`You cannot afford to buy ${coin.id} due to lack of funds.`, 'error')
    }
  }

  const sellCoin = (coin) => {
    let temp = [...coins];
    let index = temp.findIndex(e => e.id === coin.id);
    if (temp[index].amountOwned > 1) {
      temp[index].amountOwned -= 1;
    } else {
      temp.splice(index, 1);
    }
    setCoins(temp);
    setMoney(money + Number(coin.price)) // TODO: Fetch new price
    spawnToast(`You successfully sold your ${coin.id} for $${roundToTwo(coin.price)}`)
  }

  const sellAllCoins = () => {
    let moneyEarned = calculatePortfolioValue();
    spawnToast(`You've launched off to the moon! Earning you $${roundToTwo(moneyEarned)}!`, "success")
    setCoins([]);
    setMoney(money + moneyEarned);
  }

  const calculatePortfolioValue = () => {
    let value = 0;
    coins.forEach(element => {
      value += element.amountOwned * element.price;
    });

    return value;
  }

  const addMoney = () => {
    spawnToast("YOU'RE BLOODY RICH MATE, WHAT ARE YA GONNA DO WITH ALL THOSE DOLLARYDOOS?", "warning")
    setMoney(money + 100)
  };

  const canAfford = coin => {
    return money > coin.price;
  }

  const toast = useToast();
  const spawnToast = (description, status, position) => {
    toast({
      description: description,
      status: status,
      position: position,
      duration: 2000,
    })
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Header/>
        <VStack spacing={4}>
          <MarketList
            spawnToast={spawnToast}
            money={money}
            setMoney={setMoney}
            purchaseCoin={purchaseCoin}
          />
          <CoinList
            spawnToast={spawnToast}
            coins={coins}
            sellCoin={sellCoin}
          />
          <Money money={money}/>
          <HStack>
            <MoneyButton addMoney={addMoney}/>
            <SellButton sellAllCoins={sellAllCoins} calculatePortfolioValue={calculatePortfolioValue}/>
          </HStack>
        </VStack>
        <Footer></Footer>
      </Grid>
    </Box>
  )
}