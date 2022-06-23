import {Box, Flex, Icon, Typography} from "component/Box";
import {CancelButton, ConfirmButton, PopupTitle} from "./NFTPay";
import styled from "styled-components";
import nftLinkIcon from "../../assets/images/market/address_link.png"
import {Cascader} from "antd";

const NFTCover = styled.img`
  display: block;
  width: .92rem;
  height: .92rem;
  border-radius: .1rem;
  background: #eee;
  object-fit: cover;
  overflow: hidden;
`

export default function NFTPayCongratulations() {
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
            <Flex gap={".18rem"} alignItems={"center"}>
                <NFTCover src={"https://tva1.sinaimg.cn/large/e6c9d24egy1h3g3k3kx7lj20e80e8q3j.jpg"}/>
                <Flex justifyContent={"center"} flexDirection={"column"} flex={1}>
                    <Box>You've deposited <a href="#">Bored Ape Yacht Club #22562</a> and minted</Box>
                    <Flex
                        alignItems={"center"}
                        gap={".1rem"}
                        marginTop={".08rem"}
                        style={{
                            "userSelect": "none",
                            "cursor": "pointer"
                        }}>
                        <Typography
                            fontSize={".16rem"}
                            fontWeight={500}
                            color={"rgba(0,0,0,.5)"}
                        >NEO-Bored Ape Yacht Club #22562</Typography>
                        <Icon width={".14rem"} height={".14rem"} url={nftLinkIcon}/>
                    </Flex>
                </Flex>
            </Flex>
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
            <CancelButton>ADD to MetaMask</CancelButton>
            <ConfirmButton>Check Vault</ConfirmButton>
        </Flex>
    </Flex>
}