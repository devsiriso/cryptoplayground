import { Box, Button, useBreakpointValue } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const MoneyButton = props => {


  return (
    <Box>
      <Button
        variant="solid"
        leftIcon={<AddIcon />}
        colorScheme="teal"  
        width={props.width}    
        onClick={() => props.addMoney()}
      >
        ADD SOME MONEY!
      </Button>
    </Box>
  );
};
