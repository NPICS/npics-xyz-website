import {Box, Flex, Icon, Typography} from "component/Box";
import {CancelButton, ConfirmButton, PopupTitle} from "./NFTPay";
import styled from "styled-components";
import nftLinkIcon from "../../assets/images/market/address_link.png"
import successIcon from "../../assets/images/market/nft_pay_success.gif"
import {CollectionDetail} from "../../model/user";
import {urls} from "../../utils/urls";
import {useNavigate} from "react-router-dom";
import {StatusGif} from "./NFTPayWrong";
import {useState} from "react";
import {useAsync} from "react-use";
import {Npics} from "../../abis/Npics";
import {useWeb3React} from "@web3-react/core";
import {copyToClipboard} from "../../utils/clipboard-utils";

const NFTCover = styled.img`
  display: block;
  width: 92px;
  height: 92px;
  border-radius: 10px;
  background: #eee;
  object-fit: cover;
  overflow: hidden;
`

export const AttrLink = styled.a`
  text-decoration: none;
  color: #FF490F;

  &:hover {
    color: #FF490F;
  }
`

export default function NFTPayCongratulations(props: {
    nft: CollectionDetail,
    hash: string,
    dismiss?(): void
}) {
    const navigate = useNavigate()
    const [neoAddress, setNeoAddress] = useState<string>()
    const {provider} = useWeb3React()

    useAsync(async () => {
        if (!provider) return
        let c = new Npics(provider)
        let address = await c.neoFor(props.nft.address)
        setNeoAddress(address)
    }, [provider, props.nft])

    return <Flex
        width={"880px"}
        background={"#fff"}
        borderRadius={"10px"}
        padding={"40px"}
        flexDirection={"column"}
    >
        <PopupTitle title={"Congratulations!"} canClose={true}/>
        <Flex
            marginTop={"30px"}
            flexDirection={"column"}
            border={"1px solid #e5e5e5"}
            borderRadius={"10px"}
            padding={"40px 140px 20px"}
        >
            <Flex alignSelf={"center"}>
                <StatusGif src={successIcon}/>
            </Flex>
            <Flex gap={"18px"} alignItems={"center"}>
                <NFTCover src={props.nft.imageUrl}/>
                <Flex justifyContent={"center"} flexDirection={"column"} flex={1}>
                    <Box>You've deposited <AttrLink href={
                        urls.etherscanNft(props.nft.address, props.nft.tokenId)
                    } target={"_blank"}>
                        {`${props.nft.singularForName()} #${props.nft.tokenId}`}
                    </AttrLink> and minted</Box>
                    <Flex
                        alignItems={"center"}
                        gap={"10px"}
                        marginTop={"8px"}
                        style={{
                            "userSelect": "none",
                            "cursor": "pointer"
                        }}
                        onClick={() => {
                            neoAddress && window.open(urls.etherscanNft(neoAddress, props.nft.tokenId))
                        }}
                    >
                        <Typography
                            fontSize={"16px"}
                            fontWeight={500}
                            color={"rgba(0,0,0,.5)"}
                        >{`NEO ${props.nft.collectionName} #${props.nft.tokenId}`}</Typography>
                        <Icon width={"14px"} height={"14px"} src={nftLinkIcon}/>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                marginTop={"42px"}
                alignSelf={"center"}
                alignItems={"center"}
                gap={"10px"}
                style={{
                    "userSelect": "none",
                    "cursor": "pointer"
                }}
                onClick={() => {
                    window.open(urls.etherscanTxDetail(props.hash))
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
            <CancelButton
                onClick={async () => {
                    props.dismiss?.()
                    await copyToClipboard(props.nft.address)
                }}>Add to Wallet</CancelButton>
            <ConfirmButton
                onClick={() => {
                    navigate(`/vaultsDetail/${props.nft.address}/${props.nft.tokenId}`, {})
                }}
            >Check Vault</ConfirmButton>
        </Flex>
    </Flex>
}