import {Box, Flex, Icon, Typography} from "../../component/Box";
import {CancelButton, ConfirmButton, PopupTitle} from "./NFTPay";
import nftLinkIcon from "../../assets/images/market/address_link.png";
import failedGif from "../../assets/images/market/nft_pay_failed_status.gif"
import styled from "styled-components";

export const StatusGif = styled.img`
  display: block;
  overflow: hidden;
  background: transparent;
  width: 280px;
  height: 280px;
  user-select: none;
  border: 0;
`

export default function NFTPayWrong(props: {
    back?(): void
}) {
    return <Flex
        width={"880px"}
        background={"#fff"}
        borderRadius={"10px"}
        padding={"40px"}
        flexDirection={"column"}
    >
        <PopupTitle title={"Something went wrong"} canClose={true}/>
        <Flex
            marginTop={"30px"}
            flexDirection={"column"}
            border={"1px solid #e5e5e5"}
            borderRadius={"10px"}
            padding={"40px 140px 20px"}
        >
            <Flex alignSelf={"center"}>
                <StatusGif src={failedGif}/>
            </Flex>
            <Typography
                marginTop={"32px"}
                fontWeight={700}
                fontSize={"16px"}
                color={"#000"}
                textAlign={"center"}
            >
                Contract execution failed, maybe something went wrong.
            </Typography>
            <Flex
                marginTop={"42px"}
                alignSelf={"center"}
                alignItems={"center"}
                gap={"10px"}
                style={{
                    "userSelect": "none",
                    "cursor": "pointer"
                }}
            >
                <Typography
                    fontSize={"14px"}
                    fontWeight={500}
                    color={"rgba(0,0,0,.5)"}
                >View on etherscan</Typography>
                <Icon width={"14px"} height={"14px"} src={nftLinkIcon}/>
            </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} gap={"20px"} marginTop={"30px"}>
            <CancelButton onClick={props.back}>Back</CancelButton>
        </Flex>
    </Flex>
}