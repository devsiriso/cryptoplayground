import {
    Button, Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, useDisclosure
} from '@chakra-ui/react';

export const CustomModal = ({ showModalButtonText, modalHeader, modalBody, coin }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Button colorScheme="green" variant="outline" onClick={onOpen}>
          {showModalButtonText}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xs">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalHeader}</ModalHeader>
            <ModalBody>{modalBody}</ModalBody>
  
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  alert(1);
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  