import { Box, Flex, Icon, Typography } from "../../../component/Box";
import { CancelButton, ConfirmButton, PopupTitle } from "./NFTPay";
import nftLinkIcon from "../../../assets/images/market/address_link.png";
import failedGif from "../../../assets/images/market/nft_pay_failed_status.gif"
import styled from "styled-components";

export const StatusGif = styled.img`
  display: block;
  overflow: hidden;
  background: transparent;
  width: 2.8rem;
  height: 2.8rem;
  user-select: none;
  border: 0;
`

export default function NFTPayWrong(props: {
    back?(): void
}) {
    return <Flex
        width={"8.8rem"}
        background={"#fff"}
        borderRadius={"0.1rem"}
        padding={"0.4rem"}
        flexDirection={"column"}
    >
        <PopupTitle title={"Something went wrong"} canClose={true} />
        <Flex
            marginTop={"0.3rem"}
            flexDirection={"column"}
            border={"0.01rem solid #e5e5e5"}
            borderRadius={"0.1rem"}
            padding={"0.4rem 1.4rem 0.2rem"}
        >
            <Flex alignSelf={"center"}>
                <StatusGif src={failedGif} />
            </Flex>
            <Typography
                marginTop={"0.32rem"}
                fontWeight={700}
                fontSize={"0.16rem"}
                color={"#000"}
                textAlign={"center"}
            >
                Contract execution failed, maybe something went wrong.
            </Typography>
            <Flex
                marginTop={"0.42rem"}
                alignSelf={"center"}
                alignItems={"center"}
                gap={"0.1rem"}
                style={{
                    "userSelect": "none",
                    "cursor": "pointer"
                }}
            >
                <Typography
                    fontSize={"0.14rem"}
                    fontWeight={500}
                    color={"rgba(0,0,0,.5)"}
                >View on etherscan</Typography>
                <Icon width={"0.14rem"} height={"0.14rem"} src={nftLinkIcon} />
            </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} gap={"0.2rem"} marginTop={"0.3rem"}>
            <CancelButton onClick={props.back}>Back</CancelButton>
        </Flex>
    </Flex>
}