import {Box, Flex, Icon, Typography} from "component/Box";
import {CancelButton, ConfirmButton, PopupTitle} from "./NFTPay";
import styled from "styled-components";
import nftLinkIcon from "../../assets/images/market/address_link.png"
import successIcon from "../../assets/images/market/nft_pay_success.gif"
import {CollectionDetail} from "../../model/user";
import {urls} from "../../utils/urls";
import {useNavigate} from "react-router-dom";
import {StatusGif} from "./NFTPayWrong";

const NFTCover = styled.img`
  display: block;
  width: .92rem;
  height: .92rem;
  border-radius: .1rem;
  background: #eee;
  object-fit: cover;
  overflow: hidden;
`

const AttrLink = styled.a`
  text-decoration: none;
  color: #FF490F;

  &:hover {
    color: #FF490F;
  }
`

export default function NFTPayCongratulations(props: {
    nft: CollectionDetail,
    hash: string
}) {
    const navigate = useNavigate()

    return <Flex
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
            <Flex alignSelf={"center"}>
                <StatusGif src={successIcon} />
            </Flex>
            <Flex gap={".18rem"} alignItems={"center"}>
                <NFTCover src={props.nft.imageUrl}/>
                <Flex justifyContent={"center"} flexDirection={"column"} flex={1}>
                    <Box>You've deposited <AttrLink href={
                        urls.etherscanNft(props.nft.address, props.nft.tokenId)
                    }>
                        {`${props.nft.collectionName} #${props.nft.tokenId}`}
                    </AttrLink> and minted</Box>
                    <Flex
                        alignItems={"center"}
                        gap={".1rem"}
                        marginTop={".08rem"}
                        style={{
                            "userSelect": "none",
                            "cursor": "pointer"
                        }}
                        onClick={() => {
                            window.open(urls.etherscanNft(props.nft.address, props.nft.tokenId))
                        }}
                    >
                        <Typography
                            fontSize={".16rem"}
                            fontWeight={500}
                            color={"rgba(0,0,0,.5)"}
                        >{`NEO-Bored Ape Yacht Club #${props.nft.tokenId}`}</Typography>
                        <Icon width={".14rem"} height={".14rem"} src={nftLinkIcon}/>
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
                onClick={() => {
                    window.open(urls.etherscanTxDetail(props.hash))
                }}
            >
                <Typography
                    fontSize={".14rem"}
                    fontWeight={500}
                    color={"rgba(0,0,0,.5)"}
                >View on etherscan</Typography>
                <Icon width={".14rem"} height={".14rem"} src={nftLinkIcon}/>
            </Flex>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} gap={".2rem"} marginTop={".3rem"}>
            <CancelButton
                onClick={() => {
                    // TODO: add nft to metamask
                    alert("Coming soon")
                }}>ADD to MetaMask</CancelButton>
            <ConfirmButton
                onClick={() => {
                    navigate(`/vaultsDetail/${props.nft.address}/${props.nft.tokenId}`, {})
                }}
            >Check Vault</ConfirmButton>
        </Flex>
    </Flex>
}