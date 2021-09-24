import React, { useEffect, useState } from 'react';
import {
  Spacer,
  Divider,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  useDisclosure,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Text,
  List,
  ListItem,
  Box,
} from '@chakra-ui/react';
import { RepeatIcon, NotAllowedIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import { roundToTwo } from '../Util';
import { getMarketCoins } from '../services/ApiService';
import { BuyModal } from './BuyModal';
import { MarketList } from './MarketList';
// DECENT LOOKING COINS: BTC,TRX,TEL,BNB,ETC,USDP:

export const Market = ({purchaseCoin, money, spawnToast}) => {
  const COINS_TO_FETCH = 'BTC, ETH, BNB, USDP,BTC,TRX,TEL,BNB,ETC,USDP,DOGE,ADA,SOL,USDT,BCH';
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL = `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&ids=${COINS_TO_FETCH}&interval=1d,30d&per-page=100&page=1`;

  const [marketCoins, setMarketCoins] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastFetch, setLastFetch] = useState(new Date().toUTCString());

  const fetchCoins = async () => {
    fetch(URL, { mode: 'cors' })
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setLastFetch(new Date().toUTCString());
          console.log(result);
          setMarketCoins(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    // fetchCoins();
    setMarketCoins(getMarketCoins());
  }, []);

  const getColor = change => {
    if (change < 0) return 'red.400';
    if (change > 0) return 'green.400';
  };

  return (
    <MarketList
    marketCoins={marketCoins}
    getColor={getColor}
    purchaseCoin={purchaseCoin}
    money={money}
    spawnToast={spawnToast}
  ></MarketList>
  );
};
