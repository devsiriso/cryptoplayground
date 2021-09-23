import {
  Flex,
  Image,
  Text,
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
} from '@chakra-ui/react';
import { RepeatIcon, NotAllowedIcon, CheckCircleIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { roundToTwo } from '../Util';

export const CoinList = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentCoin, setCurrentCoin] = useState({});
  const [amount, setAmount] = useState(0);
  const handleSell = coin => {
    setCurrentCoin(coin);
    onOpen();
  };

  return (
    <Flex flexDirection="column" width="100%" justifyContent="space-around">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Selling: {currentCoin.id}
          </ModalHeader>
          <ModalBody textAlign="center">
            <VStack>
              <Text>How much {currentCoin.id} would you like to sell?</Text>
              <NumberInput
                defaultValue={1}
                min={1}
                max={currentCoin.amountOwned}
                onChange={value => setAmount(value)}
                value={amount}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>
                Total price: ${roundToTwo(amount * currentCoin.price)}
              </Text>
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
                onClick={() => {
                  props.sellCoin(currentCoin, amount);
                  onClose();
                  setAmount(0);
                }}
              >
                Sell
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        minH={50}
        wrap="wrap"
        border="1px solid grey"
        borderRadius={5}
        justifyContent="space-around"
        p={2}
      >
        {props.coins.length ? (
          props.coins.map((coin, i) => (
            <Flex key={coin.id} onClick={() => handleSell(coin)}>
              <Image boxSize={30} src={coin.logo_url} />
              <Text marginLeft={2}>{coin.amountOwned}</Text>
            </Flex>
          ))
        ) : (
          <Text color="gray">Your coins will appear here.</Text>
        )}
      </Flex>
    </Flex>
  );
};
