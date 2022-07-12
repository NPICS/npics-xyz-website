import {Box, Flex, Icon, Typography} from "component/Box";
import {PopupTitle} from "./NFTPay";
import {CollectionDetail} from "../../model/user";
import {imgurl} from "../../utils/globalimport";
import {urls} from "../../utils/urls";
import progressIcon from "../../assets/images/market/nft_pay_progressing.gif"
import {StatusGif} from "./NFTPayWrong";

function MarketLabel(props: {
    icon?: string,
    name: string
}) {
    return <Flex
        border={"1px solid #e5e5e5"}
        borderRadius={"10px"}
        alignItems={"center"}
        height={"52px"}
        padding={"0 21px"}
        style={{
            "userSelect": "none",
            "cursor": "pointer"
        }}
    >
        <Icon width={"28px"} height={"28px"} src={props.icon} />
        <Typography
            fontWeight={500}
            fontSize={"20px"}
            color={"#000"}
            marginLeft={"12px"}
            fontStyle={"normal"}
        >{props.name}</Typography>
    </Flex>
}

export default function NFTPayProgressing(props: {
    nft: CollectionDetail
}) {
    return <Flex
        width={"880px"}
        background={"#fff"}
        borderRadius={"10px"}
        padding={"40px"}
        flexDirection={"column"}
    >
        <PopupTitle title={"Progressing"} canClose={true}/>
        <Flex alignSelf={"center"}>
            <StatusGif src={progressIcon}/>
        </Flex>
        <Flex alignSelf={"center"} alignItems={"center"} gap={"6px"}>
            <Typography
                fontSize={"14px"}
                fontWeight={500}
                color={"rgba(0,0,0,.5)"}
            >Estimated waiting time is</Typography>
            <Typography
              fontSize={"16px"}
              fontWeight={500}
              color={"#000"}
            >30s</Typography>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} gap={"30px"} marginTop={"30px"}>
            <MarketLabel name={props.nft.marketDisplay()} icon={props.nft.marketIcon()}/>
            <MarketLabel name={"DYDX"} icon={imgurl.market.DYDXBuy}/>
            <MarketLabel name={"BendDAO"} icon={imgurl.market.BendDAOBuy}/>
        </Flex>
        <Flex marginTop={"70px"} justifyContent={"center"}>
            <Typography
                fontSize={"14px"}
                fontWeight={500}
                color={"rgba(0,0,0,.5)"}
                style={{
                    "userSelect": "none",
                    "cursor": "pointer"
                }}
                onClick={() => {
                    window.open(urls.resource)
                }}
            >How it works?</Typography>
        </Flex>
    </Flex>
}