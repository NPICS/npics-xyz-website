import {Box, Flex, Icon, Typography} from "component/Box";
import {PopupTitle} from "./NFTPay";

function MarketLabel(props: {
    icon?: string,
    name: string
}) {
    return <Flex
        border={"1px solid #e5e5e5"}
        borderRadius={".1rem"}
        alignItems={"center"}
        height={".52rem"}
        padding={"0 .21rem"}
        style={{
            "userSelect": "none",
            "cursor": "pointer"
        }}
    >
        <Icon width={".28rem"} height={".28rem"} url={props.icon} />
        <Typography
            fontWeight={500}
            fontSize={".2rem"}
            color={"#000"}
            marginLeft={".12rem"}
            fontStyle={"normal"}
        >{props.name}</Typography>
    </Flex>
}

export default function NFTPayProgressing() {
    return <Flex
        // TODO: debug
        marginTop={"120px"}
        width={"8.8rem"}
        background={"#fff"}
        borderRadius={".1rem"}
        padding={".4rem"}
        flexDirection={"column"}
    >
        <PopupTitle title={"Progressing"} canClose={true}/>
        <Flex height={"4.1rem"} alignItems={"center"} justifyContent={"center"}>
            ...
        </Flex>
        <Flex alignSelf={"center"} alignItems={"center"} gap={".06rem"}>
            <Typography
                fontSize={".14rem"}
                fontWeight={500}
                color={"rgba(0,0,0,.5)"}
            >Estimated waiting time is</Typography>
            <Typography
              fontSize={".16rem"}
              fontWeight={500}
              color={"#000"}
            >30s</Typography>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} gap={".3rem"} marginTop={".3rem"}>
            <MarketLabel name={"OpenSea"}/>
            <MarketLabel name={"DYDX"}/>
            <MarketLabel name={"BendDAO"}/>
        </Flex>
        <Flex marginTop={".7rem"} justifyContent={"center"}>
            <Typography
                fontSize={".14rem"}
                fontWeight={500}
                color={"rgba(0,0,0,.5)"}
            >How it works?</Typography>
        </Flex>
    </Flex>
}