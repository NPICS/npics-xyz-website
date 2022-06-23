import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {CollectionDetail} from "../../model/user";
import {AddressAbbreviation} from "../marketplace/components/utils";
import addressLinkIcon from "../../assets/images/market/address_link.png"
import {useEffect, useState} from "react";
import {Npics} from "../../abi/Npics";
import {Erc721} from "../../abi/Erc721";
import {ethers} from "ethers";
import {urls} from "../../utils/urls";

const Title = styled.div`
  color: #000;
  font-size: .14rem;
  font-weight: 500;
  vertical-align: middle;
`

const Value = styled(Title)`
  text-align: right;
`;

function AddressLink(props: {
    address: string,
    url?: string
}) {
    return <Flex
        alignItems={"center"}
        justifyContent={"end"}
        gap={".06rem"}
        style={{
            "cursor": "pointer"
        }}
        onClick={() => {
            window.open(props.url)
        }}
    >
        <Value>{props.address}</Value>
        <Icon width={".16rem"} url={addressLinkIcon}/>
    </Flex>
}

export default function NFTInfo(props: {
    item?: CollectionDetail
}) {
    const [owner, setOwner] = useState<string | undefined>(undefined)

    useEffect(() => {
        const inner = async () => {
            let address = props.item?.address ?? ""
            let tokenId = props.item?.tokenId ?? ""
            let erc721 = new Erc721(address, ethers.getDefaultProvider())
            let owner = await erc721.OwnerOf(tokenId)
            setOwner(owner)
        }
        if (props.item) {
            inner().finally()
        }
    }, [props.item])

    return <Flex
        flexDirection={"column"}
        border={"1px solid #0000001A"}
        borderRadius={".1rem"}
        alignItems={"stretch"}
    >
        <Flex
            flexDirection={"row"}
            gap={".12"}
            borderBottom={"1px solid #0000001A"}
            padding={".14rem .6rem"}
        >
            <Icon width={".16rem"} height={".2rem"}/>
            <Typography
                fontWeight={500}
                fontSize={".16rem"}
                color={"#000"}
            >Info</Typography>
        </Flex>
        <Grid
            gridTemplateColumns={"repeat(2, auto)"}
            gridRowGap={".24rem"}
            gridColumnGap={".24rem"}
            padding={".24rem"}
        >
            <Title>Contract Address</Title>
            {/* TODO: link to etherscan nft */}
            <AddressLink address={AddressAbbreviation(props.item?.address) ?? "---"}/>
            <Title>Owner</Title>
            <AddressLink address={AddressAbbreviation(owner) ?? "---"}/>
            <Title>Token ID</Title>
            <Value>{props.item?.tokenId}</Value>
            <Title>Token Standard</Title>
            <Value>{props.item?.standard}</Value>
            <Title>Blockchain</Title>
            <Value>Ethereum</Value>
            <Title>Creator Fees</Title>
            <Value>no set</Value>
        </Grid>
    </Flex>
}