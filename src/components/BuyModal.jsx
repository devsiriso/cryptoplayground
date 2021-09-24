import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { roundToTwo } from '../Util';
export const BuyModal = ({
  showModalButtonText,
  coin,
  money,
  purchaseCoin,
  spawnToast,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState(0);
  const max = Math.floor(money / coin.price);

  const onChange = value => {
    if (value > max) return;
    setAmount(value);
  };

  const onClick = () => {
    if (coin.price > money) {
      spawnToast(`You do not have enough funds to acquire ${coin.name}`, 'error');
    } else {
      onOpen();
    }
  };

  return (
    <>
      <Button colorScheme="green" variant="outline" onClick={onClick}>
        {showModalButtonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Buying: {coin.id}</ModalHeader>
          <ModalBody textAlign="center">
            <VStack>
              <Text>How much {coin.id} would you like to purchase?</Text>
              <Text>Maximum you can afford: {max}</Text>
              <NumberInput
                defaultValue={1}
                min={1}
                max={money / coin.price}
                onChange={onChange}
                value={amount}
                allowMouseWheel
                clampValueOnBlur
                keepWithinRange
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>
                Total price: <b>${roundToTwo(amount * coin.price)}</b>
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <HStack>
              <Button
                leftIcon={<NotAllowedIcon />}
                colorScheme="red"
                onClick={() => {
                  onClose();
                  setAmount(0);
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                leftIcon={<CheckCircleIcon />}
                colorScheme="purple"
                variant="outline"
                onClick={() => {
                  purchaseCoin(coin, amount);
                  onClose();
                  setAmount(0);
                }}
              >
                Buy
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
