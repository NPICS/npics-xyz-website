import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {useEffect, useState} from "react";
import http from "../../utils/http";
import {deserializeArray} from "class-transformer";
import {Activities, CollectionDetail} from "../../model/user";
import {log} from "util";
import {AddressAbbreviation} from "../marketplace/components/utils";
import moment from "moment";
import titlePrefixIcon from "../../assets/images/market/nft_activities_icon.png"
import {urls} from "../../utils/urls";

const _Table = styled.table`
  thead {
    width: 100%;
    position: sticky;
    top: 0;
    background: #fff;
    outline: 1px solid #0000001A;

    th {
      padding: .26rem;
    }
  }

  tbody {
    td {
      padding: .26rem;
    }
  }

  tr th {
    font-weight: 500;
    font-size: .16rem;
    color: #000000;
  }

  tr:not(:last-child) {
    border-bottom: 1px solid #0000001A;
  }
`

const Symbol = styled.img`
  user-select: none;
  width: .18rem;
  height: .18rem;
  object-fit: contain;
  background: transparent;
`

function PriceWithSymbol(props: {
    displayAmount?: string,
    iconOrUrl: string
}) {
    return <Flex hidden={props.displayAmount == null} flexDirection={"row"} alignItems={"center"} gap={".06rem"}>
        <Symbol src={props.iconOrUrl} hidden={props.displayAmount == `0`}/>
        <Typography lineHeight={"normal"}>{props.displayAmount ?? ``}</Typography>
    </Flex>
}

export default function NFTActivities(props: {
    item?: CollectionDetail
}) {
    const [listData, setListData] = useState<Activities[]>([])

    useEffect(() => {
        const inner = async () => {
            let resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/getNftActivities`, {
                address: props.item?.address,
                tokenId: props.item?.tokenId
            })
            if (resp.code === 200) {
                let items = deserializeArray(Activities, JSON.stringify(resp.data))
                setListData(items)
            }
        }
        inner().catch((e) => console.error(`Activities Request Error => ${e}`))
    }, [props.item])

    return <Flex
        flexDirection={"column"}
        border={"1px solid #0000001A"}
        borderRadius={".1rem"}
        alignItems={"stretch"}
    >
        <Flex
            flexDirection={"row"}
            gap={".12rem"}
            borderBottom={"1px solid #0000001A"}
            padding={".14rem .25rem"}
        >
            <Icon width={".24rem"} height={".24rem"} src={titlePrefixIcon}/>
            <Typography
                fontWeight={500}
                fontSize={".16rem"}
                color={"#000"}
            >Activities</Typography>
        </Flex>

        <Flex flexDirection={"column"} flex={1} position={"relative"}>
            <Flex flexDirection={"column"}
                  overflow={"auto"}
                  position={"absolute"}
                  top={0}
                  left={0}
                  bottom={0}
                  right={0}>
                <_Table>
                    <thead>
                    <tr>
                        <th align={"left"}>Event</th>
                        <th align={"left"}>Price</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Datetime</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        listData.map((item, idx) => {
                            return <tr key={idx}>
                                <td align={"left"}>{item.eventTypeExplain() ?? ``}</td>
                                <td align={"center"}><PriceWithSymbol displayAmount={item.amountFormat()}
                                                                      iconOrUrl={item.imageUrl}/></td>
                                <td align={"center"}
                                    style={{
                                        "cursor": item.fromAccount ? "pointer" : "auto"
                                    }}
                                    onClick={() => {
                                        window.open(`https://etherscan.io/address/${item.fromAccount}`)
                                    }}
                                >{AddressAbbreviation(item.fromAccount) ?? "---"}</td>
                                <td align={"center"}
                                    style={{
                                        "cursor": item.toAccount ? "pointer" : "auto"
                                    }}
                                    onClick={() => {
                                        window.open(`https://etherscan.io/address/${item.toAccount}`)
                                    }}
                                >{AddressAbbreviation(item.toAccount) ?? "---"}</td>
                                <td align={"center"}>{
                                    moment(item.createdTime).parseZone().endOf('m').fromNow() ?? '---'
                                }</td>
                            </tr>
                        })
                    }
                    </tbody>
                </_Table>
            </Flex>
        </Flex>
    </Flex>
}