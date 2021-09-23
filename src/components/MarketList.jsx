import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    IconButton,
} from "@chakra-ui/react"
import { RepeatIcon } from "@chakra-ui/icons"
import { Image } from "@chakra-ui/react"
import { roundToTwo } from '../Util';

// DECENT LOOKING COINS: BTC,TRX,TEL,BNB,ETC,USDP: 

export const MarketList = (props) => {
    const COINS_TO_FETCH = "BTC, ETH, BNB, ETC, USDP";
    const API_KEY = process.env.REACT_APP_API_KEY;
    const URL = `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&ids=${COINS_TO_FETCH}&interval=1d,30d&per-page=100&page=1`

    const [marketCoins, setMarketCoins] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [lastFetch, setLastFetch] = useState(new Date().toUTCString());

    const fetchCoins = async () => {
        fetch(URL, { mode: 'cors' })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setLastFetch(new Date().toUTCString());
                    setMarketCoins(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        fetchCoins();
    }, [])

    const getColor = (change) => {
        if (change < 0) return "red.400";
        if (change > 0) return "green.400";
    }
        
    return (
        <Table variant="simple" >
            <TableCaption>Last update: {lastFetch}
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>
                        {isLoaded
                            ? <IconButton
                                variant="outline"
                                colorScheme="teal"
                                size="xs"
                                onClick={() => fetchCoins()}
                                icon={<RepeatIcon />} />
                            : <IconButton
                                isLoading
                                variant="outline"
                                colorScheme="teal"
                                size="xs"
                                onClick={() => fetchCoins()}
                                icon={<RepeatIcon />} />}
                    </Th>
                    <Th>Coin</Th>
                    {/* <Th>Day Δ</Th> */}
                    {/* <Th>Month Δ</Th> */}
                    <Th isNumeric>Price</Th>
                </Tr>
            </Thead>
            <Tbody>
                {/* <Tr onClick={() => addMoney()}><Td>Money</Td><Td isNumeric>0</Td></Tr> */}
                {marketCoins && marketCoins.map((x, i) => (
                    <Tr key={x.id} onClick={() => props.purchaseCoin(x)}>
                        <Td><Image src={x.logo_url} boxSize="20px" /></Td>
                        <Td >{x.id}</Td>
                        {/* <Td color={getColor(x["1d"].price_change_pct)}>{roundToTwo(x["1d"].price_change_pct)}%</Td> */}
                        {/* <Td color={getColor(x["30d"].price_change_pct)}>{roundToTwo(x["30d"].price_change_pct)}%</Td> */}
                        <Td isNumeric>${roundToTwo(x.price)}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}