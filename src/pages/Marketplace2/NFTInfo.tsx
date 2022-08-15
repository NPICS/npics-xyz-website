import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {CollectionDetail} from "../../model/user";
import {AddressAbbreviation} from "./utils";
import addressLinkIcon from "../../assets/images/market/address_link.png"
import {useEffect, useState} from "react";
import {Npics} from "../../abis/Npics";
import {Erc721} from "../../abis/Erc721";
import {ethers} from "ethers";
import {urls} from "../../utils/urls";
import titlePrefixIcon from "../../assets/images/market/info_block_title_prefix.png"
import {TextPlaceholder} from "../../component/styled";
import {Popover} from "antd";
import { Pop20 } from "component/Popover/Popover";

const Title = styled.div`
  color: #000;
  font-size: 0.14rem;
  font-weight: 500;
  vertical-align: middle;
`

const Value = styled(Title)`
  text-align: right;
`;

export function AddressLink(props: {
    address?: string,
  justifyContent?: `center` | `end`
}) {
    return <Pop20
      content={"View on Etherscan"}
    ><Flex
      alignItems={"center"}
      justifyContent={props.justifyContent ?? `end`}
      gap={"0.06rem"}
      style={{
        "cursor": "pointer"
      }}
      onClick={() => {
        if (props.address) {
          window.open(`https://etherscan.io/address/${props.address}`)
        }
      }}
    >
      <Value>{AddressAbbreviation(props.address) ?? TextPlaceholder}</Value>
      <Icon width={"0.14rem"} src={addressLinkIcon}/>
    </Flex></Pop20>
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
        border={"0.01rem solid #0000001A"}
        borderRadius={"0.1rem"}
        alignItems={"stretch"}
    >
        <Flex
            flexDirection={"row"}
            gap={"0.12rem"}
            borderBottom={"0.01rem solid #0000001A"}
            padding={"0.14rem 0.25rem"}
            alignItems={"center"}
        >
            <Icon width={"0.24rem"} height={"0.24rem"} src={titlePrefixIcon}/>
            <Typography
                fontWeight={500}
                fontSize={"0.16rem"}
                color={"#000"}
            >Info</Typography>
        </Flex>
        <Grid
            gridTemplateColumns={"repeat(2, auto)"}
            gridRowGap={"0.24rem"}
            gridColumnGap={"0.24rem"}
            padding={"0.24rem"}
        >
            <Title>Contract Address</Title>
            {/* TODO: link to etherscan nft */}
            <AddressLink address={props.item?.address}/>
            <Title>Owner</Title>
            <AddressLink address={owner}/>
            <Title>Token ID</Title>
            <Value>{props.item?.tokenId}</Value>
            <Title>Token Standard</Title>
            <Value>{props.item?.standard}</Value>
            <Title>Blockchain</Title>
            <Value>Ethereum</Value>
            {/*<Title>Creator Fees</Title>*/}
            {/*<Value>no set</Value>*/}
        </Grid>
    </Flex>
}