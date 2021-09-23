import { Box, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const MoneyButton = props => {
  return (
    <Box>
      <Button
        variant="solid"
        leftIcon={<AddIcon />}
        colorScheme="teal"
        size="lg"
        onClick={() => props.addMoney()}
      >
        ADD SOME MONEY!
      </Button>
    </Box>
  );
};
