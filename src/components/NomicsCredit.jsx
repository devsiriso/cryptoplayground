import { Link, Box, Text } from '@chakra-ui/react';

export const NomicsCredit = () => {
  return (
    <Link href="https://nomics.com/" fontSize="xs">
      <Text borderBottom="1px solid purple" display="inline-block">
        Crypto Market Cap & Pricing Data Provided by Nomics
      </Text>
    </Link>
  );
};
