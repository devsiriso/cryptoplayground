import { useState } from 'react';
import { RepeatIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Image,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react';
import { roundToTwo } from '../Util';
import { BuyModal } from './BuyModal';
import { getCoinsFromApi, getLastFetchDate } from '../services/ApiService';

export const MarketTable = ({
  fetchCoins,
  marketCoins,
  getColor,
  money,
  purchaseCoin,
  spawnToast,
  setMarketCoins,
  isLoading,
  setIsLoading,
}) => {
  const toast = useToast();
  const [lastFetch, setLastFetch] = useState(getLastFetchDate());
  
  const handleRefresh = () => {
    setIsLoading(false);
    getCoinsFromApi(toast).then(r => r.json().then(r => {
        setLastFetch(getLastFetchDate());
        setMarketCoins(r)
        setIsLoading(true);
    }));
  };

  return (
    <Table variant="striped" size="sm">
      <TableCaption>Last update: {lastFetch.toUTCString()}</TableCaption>
      <Thead>
        <Tr>
          <Th width="5%">
            {isLoading ? (
              <IconButton
                variant="outline"
                colorScheme="teal"
                size="xs"
                onClick={() => handleRefresh()}
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
          <Th width="5%">Ticker</Th>
          <Th width="5%">Coin</Th>
          <Th width="5%">Day Price Δ</Th>
          <Th width="5%">Month PriceΔ</Th>
          <Th width="5%">Day Volume</Th>
          <Th width="5%">Day Volume</Th>
          <Th width="5%">Month Volume Δ</Th>
          <Th width="5%">Day Volume Δ</Th>
          <Th width="5%" isNumeric>
            Price
          </Th>
          <Th width="5%" isNumeric></Th>
        </Tr>
      </Thead>
      <Tbody>
        {marketCoins &&
          marketCoins.map((coin, i) => (
            <Tr key={coin.id}>
              <Td>
                <Image src={coin.logo_url} boxSize="20px" />
              </Td>
              <Td>{coin.id}</Td>
              <Td>{coin.name}</Td>
              <Td color={getColor(coin['1d'].price_change_pct)}>
                {roundToTwo(coin['1d'].price_change_pct)}%
              </Td>
              <Td color={getColor(coin['30d'].price_change_pct)}>
                {roundToTwo(coin['30d'].price_change_pct)}%
              </Td>
              <Td>{roundToTwo(coin['1d'].volume)}</Td>
              <Td color={getColor(coin['1d'].price_change_pct)}>
                {roundToTwo(coin['1d'].price_change_pct)}%
              </Td>
              <Td color={getColor(coin['30d'].price_change_pct)}>
                {roundToTwo(coin['30d'].price_change_pct)}%
              </Td>
              <Td>{roundToTwo(coin['30d'].volume)}</Td>
              <Td isNumeric>${roundToTwo(coin.price)}</Td>
              <Td isNumeric>
                <BuyModal
                  showModalButtonText="+"
                  coin={coin}
                  money={money}
                  purchaseCoin={purchaseCoin}
                  spawnToast={spawnToast}
                  size="lg"
                ></BuyModal>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};
