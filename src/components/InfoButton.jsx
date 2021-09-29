import { InfoIcon } from '@chakra-ui/icons';
import {
    Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger
} from '@chakra-ui/react';

export const InfoButton = () => {
  return (
    <Popover>
         {({ isOpen, onClose }) => (
         <>
            <PopoverTrigger>
        <IconButton variant="ghost" icon={<InfoIcon />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Welcome to CryptoPlayground</PopoverHeader>
        <PopoverBody>
          Click on the '+' next to a specific coin to buy it. 
          <br/>Click on one of the coins in your portfolio to sell it. 
          <br/>You can add more money to your bank by pressing the green button. 
          <br/>You can sell all your coins and claim your ride to the moon by pressing the pink button.
          <br/><b>NOTE:</b> THIS IS A BETA VERSION USING A NON-REALTIME API. YOUR TRADES WILL NOT CORRESPOND WITH THE REAL TIME PRICES OF THE COINS. 
        </PopoverBody>
        <PopoverFooter>
          <Button width="100%" colorScheme="teal" onClick={onClose}>
              Start your trading adventure!
          </Button>
        </PopoverFooter>
      </PopoverContent></>)}
    </Popover>
  );
};
