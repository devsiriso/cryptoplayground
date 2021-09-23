import { Text } from "@chakra-ui/layout"
import { roundToTwo } from "../Util"

export const Money = props => {
    return (<Text>You have: ${roundToTwo(props.money)}</Text>)
}