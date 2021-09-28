import { MoonIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { roundToTwo } from '../Util';

export const SellButton = ({ width, sellAllCoins, calculatePortfolioValue }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLaunch = () => {
    sellAllCoins();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Are you sure you want to go to the moon?
          </ModalHeader>

          <ModalBody textAlign="center">
            This will sell all your coins for the current market price. You will
            earn: <b>${roundToTwo(calculatePortfolioValue())}</b>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <HStack>
              <Button
                leftIcon={<NotAllowedIcon />}
                rightIcon={<NotAllowedIcon />}
                colorScheme="red"
                onClick={onClose}
              >
                ABORT MISSION
              </Button>
              <Button colorScheme="purple" onClick={() => handleLaunch()}>
                🚀 LAUNCH 🚀
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        variant="solid"
        m={2}
        width={width}
        colorScheme="purple"
        leftIcon={<MoonIcon />}
        onClick={onOpen}
      >
        GO TO THE MOON
      </Button>
    </>
  );
};
