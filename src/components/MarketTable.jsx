import {
    Button, HStack, IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Image,
    ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField,
    NumberInputStepper, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, VStack
} from '@chakra-ui/react';
import { RepeatIcon, NotAllowedIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { roundToTwo } from '../Util';
export const MarketTable= ({handleBuy, lastFetch, fetchCoins, isLoaded, marketCoins}) => {
  return (
    <Table variant="simple">
    
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
        {/* <Th>Day Δ</Th>
        <Th>Month Δ</Th> */}
        <Th isNumeric>Price</Th>
      </Tr>
    </Thead>
    <Tbody>
      {marketCoins &&
        marketCoins.map((coin, i) => (
          <Tr key={coin.id} onClick={() => handleBuy(coin)}>
            <Td>
              <Image src={coin.logo_url} boxSize="20px" />
            </Td>
            <Td>{coin.id}</Td>
            {/* <Td color={getColor(coin['1d'].price_change_pct)}>
              {roundToTwo(coin['1d'].price_change_pct)}%
            </Td>
            <Td color={getColor(coin['30d'].price_change_pct)}>
              {roundToTwo(coin['30d'].price_change_pct)}%
            </Td> */}

            <Td isNumeric>${roundToTwo(coin.price)}</Td>
          </Tr>
        ))}
    </Tbody>

    {/* <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">Buying: {currentCoin.id}</ModalHeader>
        <ModalBody textAlign="center">
          <VStack>
            <Text>How much {currentCoin.id} would you like to purchase?</Text>
            <NumberInput
              defaultValue={0}
              min={0}
              max={props.money / currentCoin.price}
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
                props.purchaseCoin(currentCoin, amount);
                onClose();
                setAmount(0);
              }}
            >
              Buy
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal> */}
  </Table>

  )
}