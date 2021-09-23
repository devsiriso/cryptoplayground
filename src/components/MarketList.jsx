import React, { useEffect, useState } from 'react';
import {
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
} from '@chakra-ui/react';
import { RepeatIcon, NotAllowedIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import { roundToTwo } from '../Util';

// DECENT LOOKING COINS: BTC,TRX,TEL,BNB,ETC,USDP:

export const MarketList = props => {
  const COINS_TO_FETCH = 'BTC, ETH, BNB, ETC, USDP';
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
          setMarketCoins(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const getColor = change => {
    if (change < 0) return 'red.400';
    if (change > 0) return 'green.400';
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentCoin, setCurrentCoin] = useState({});
  const [amount, setAmount] = useState(0);
  const handleBuy = coin => {
    setCurrentCoin(coin);
    onOpen();
  };

  return (
    <Table variant="simple">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Buying: {currentCoin.id}</ModalHeader>
          <ModalBody textAlign="center">
            <VStack>
              <Text>How much {currentCoin.id} would you like to purchase?</Text>
              <NumberInput defaultValue={1} min={1} onChange={(value) => setAmount(value)}
      value={amount}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>Total price: ${roundToTwo(amount * currentCoin.price)}</Text>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <HStack>
              <Button
                leftIcon={<NotAllowedIcon />}
                colorScheme="red"
                onClick={onClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                leftIcon={<CheckCircleIcon />}
                colorScheme="purple"
                variant="outline"
                onClick={() => {props.purchaseCoin(currentCoin, amount); onClose()}}
              >
                Buy
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TableCaption>Last update: {lastFetch}</TableCaption>
      <Thead>
        <Tr>
          <Th>
            {isLoaded ? (
              <IconButton
                variant="outline"
                colorScheme="teal"
                size="xs"
                onClick={() => fetchCoins()}
                icon={<RepeatIcon />}
              />
            ) : (
              <IconButton
                isLoading
                variant="outline"
                colorScheme="teal"
                size="xs"
                onClick={() => fetchCoins()}
                icon={<RepeatIcon />}
              />
            )}
          </Th>
          <Th>Coin</Th>
          {/* <Th>Day Δ</Th> */}
          {/* <Th>Month Δ</Th> */}
          <Th isNumeric>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {/* <Tr onClick={() => addMoney()}><Td>Money</Td><Td isNumeric>0</Td></Tr> */}
        {marketCoins &&
          marketCoins.map((coin, i) => (
            <Tr key={coin.id} onClick={() => handleBuy(coin)}>
              <Td>
                <Image src={coin.logo_url} boxSize="20px" />
              </Td>
              <Td>{coin.id}</Td>
              {/* <Td color={getColor(x["1d"].price_change_pct)}>{roundToTwo(x["1d"].price_change_pct)}%</Td> */}
              {/* <Td color={getColor(x["30d"].price_change_pct)}>{roundToTwo(x["30d"].price_change_pct)}%</Td> */}
              <Td isNumeric>${roundToTwo(coin.price)}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
