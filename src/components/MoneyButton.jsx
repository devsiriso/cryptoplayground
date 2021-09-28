import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

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
