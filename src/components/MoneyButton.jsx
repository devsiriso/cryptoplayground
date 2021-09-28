import { Box, Button, useBreakpointValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const MoneyButton = ({width, addMoney}) => {
  return (
    <>
      <Button
        variant="solid"
        m={2}
        width={width}    
        colorScheme="teal"  
        leftIcon={<AddIcon />}
        onClick={() => addMoney()}
      >
        ADD SOME MONEY!
      </Button>
    </>
  );
};
