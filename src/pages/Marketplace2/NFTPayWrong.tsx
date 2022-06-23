import {Box, Flex, Icon, Typography} from "../../component/Box";
import {CancelButton, ConfirmButton, PopupTitle} from "./NFTPay";
import nftLinkIcon from "../../assets/images/market/address_link.png";

export default function NFTPayWrong() {
    return <Flex
        // TODO: debug
        marginTop={"120px"}
        width={"8.8rem"}
        background={"#fff"}
        borderRadius={".1rem"}
        padding={".4rem"}
        flexDirection={"column"}
    >
        <PopupTitle title={"Congratulations!"} canClose={true}/>
        <Flex
            marginTop={".3rem"}
            flexDirection={"column"}
            border={"1px solid #e5e5e5"}
            borderRadius={".1rem"}
            padding={".4rem 1.4rem .2rem"}
        >
            <Icon width={"2.2rem"} height={"2.2rem"} url={""}/>
            <Typography
                marginTop={".32rem"}
                fontWeight={700}
                fontSize={".16rem"}
                color={"#000"}
                textAlign={"center"}
            >
                Contract execution failed, maybe something went wrong.
            </Typography>
            <Flex
                marginTop={".42rem"}
                alignSelf={"center"}
                alignItems={"center"}
                gap={".1rem"}
                style={{
                    "userSelect": "none",
                    "cursor": "pointer"
                }}
            >
                <Typography
                    fontSize={".14rem"}
                    fontWeight={500}
                    color={"rgba(0,0,0,.5)"}
                >View on etherscan</Typography>
                <Icon width={".14rem"} height={".14rem"} url={nftLinkIcon}/>
            </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} gap={".2rem"} marginTop={".3rem"}>
            <CancelButton>Back</CancelButton>
        </Flex>
    </Flex>
}