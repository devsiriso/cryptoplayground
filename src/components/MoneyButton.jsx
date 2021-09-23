import { Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const MoneyButton = props => {
  return (
    <Box>
      <Button
        variant="outline"
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="solid"
        size="lg"
        onClick={() => props.addMoney()}
      >
        ADD SOME MONEY!
      </Button>
    </Box>
  );
};
