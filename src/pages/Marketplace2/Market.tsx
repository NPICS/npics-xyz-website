import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {space, typography, layout, TypographyProps} from "styled-system";
import React, {useEffect, useState} from "react";
import http from "../../utils/http";
import {deserializeArray} from "class-transformer";
import {Collections} from "../../model/user";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {imgurl} from "../../utils/globalimport";
import {numberFormat} from "../../utils/urls";
import {Portrait} from "./MarketList";
import {prettyFormat} from "@testing-library/react";
import {percentageFormat} from "../marketplace/components/utils";
import ethIcon from "../../assets/images/market/eth_icon_20x34.png"

export const Banner = (props: {
    url?: string
}) => {
    return <Box
        position={"absolute"}
        height={"4.8rem"}
        top={0}
        left={0}
        right={0}
        zIndex={0}
        backgroundImage={`url(${props.url})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
    ></Box>
}

const CollectionItem = styled.div<{
    isSelected?: boolean,
    imgUrl?: string
}>`
  display: block;
  width: .5rem;
  height: .5rem;
  background: transparent url(${(props) => props.imgUrl}) no-repeat center;
  background-size: cover;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 0 ${(props) => props.isSelected ? `3px` : `0`} #fff;
`

export default function Market() {
    const [listData, setListData] = useState<Collections[]>([])
    // const [selectAddress, setSelectAddress] = useState<string>()
    const [nft, setNft] = useState<Collections>()
    const nav = useNavigate()
    const params = useParams()

    useEffect(() => {
        const inner = async () => {
            try {
                const resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/getCollections2`)
                if (resp.code === 200 && resp.data.length) {
                    setListData(deserializeArray(Collections, JSON.stringify(resp.data)))
                }
            } catch (error) {
            }
        }
        inner().catch(console.error)
    }, [])

    useEffect(() => {
        // if (params.address) {
        //     setSelectAddress(params.address)
        // } else if (listData.length > 0 && !selectAddress) {
        //     setSelectAddress(listData[0].address)
        // }
        if (listData.length > 0) {
            if (params.address) {
                setNft(listData.find(it => it.address === params.address))
            } else {
                setNft(listData[0])
            }
        }
    }, [params, listData])

    useEffect(() => {
        if (nft?.address) {
            nav(`collections/${nft.address}`, {
                replace: true
            })
        }
    }, [nft])

    return <Flex
        position={"relative"}
        flexDirection={"column"}
        padding={"0 160px"}
        background={"transparent"}>
        <Banner url={nft?.bannerImageUrl}/>
        <Box zIndex={1}>
            <Box marginTop={"120px"}>
                <Typography
                    color={"#fff"}
                    fontSize={"30px"}
                    fontWeight={"800"}>
                    Collection
                </Typography>
            </Box>
            <Flex
                flexDirection={"row"}
                alignItems={"stretch"}
                gap={".26rem"}
                marginTop={".35rem"}>
                {
                    listData.map((item, idx) => {
                        return <CollectionItem
                            key={idx}
                            isSelected={nft?.address === item.address}
                            imgUrl={item.imageUrl}
                            onClick={() => {
                                setNft(item)
                            }}
                        />
                    })
                }
            </Flex>
            <Box
                marginTop={".4rem"}
                borderRadius={".1rem"}
                background={"#fff"}
                padding={".4rem"}
                boxShadow={"rgba(0,0,0,.5)"}
            >
                <Flex>
                    <Portrait src={nft?.imageUrl}/>
                    <Flex
                        marginLeft={".24rem"}
                        flexDirection={"column"}
                        gap={".08rem"}
                        flex={1}
                        justifyContent={"center"}
                    >
                        <Typography
                            fontWeight={800}
                            fontSize={".46rem"}
                            lineHeight={".56rem"}
                            color={"#000"}
                        >{nft?.name}</Typography>
                        <Typography
                            fontWeight={"500"}
                            fontSize={".14rem"}
                            lineHeight={"120%"}
                            color={"rgba(0, 0, 0, .5)"}
                            textAlign={"justify"}
                        >
                            {nft?.description}
                        </Typography>
                    </Flex>
                </Flex>
                <Flex
                    marginTop={".16rem"}
                    flexDirection={"row"}
                    gap={".1rem"}
                    alignItems={"stretch"}
                >
                    <Flex
                        flexDirection={"column"}
                        alignItems={"center"}
                        boxShadow={"0 0 10px rgba(0,0,0,.1)"}
                        borderRadius={".1rem"}
                        padding={".12rem .2rem"}
                        gap={".05rem"}
                        minWidth={"1.36rem"}>
                        <Flex alignItems={"center"} gap={".06rem"}>
                            <Icon width={".10rem"} height={".15rem"} src={ethIcon}/>
                            <Typography
                                fontSize={".2rem"}
                                color={"#000"}
                                fontWeight={700}
                            >{
                                nft && numberFormat(nft.floorPrice.div(10 ** 18).toFixed())
                            }</Typography>
                        </Flex>
                        <Typography fontSize={".14rem"} color={"#000"}>Floor</Typography>
                    </Flex>
                    <Flex
                        flexDirection={"column"}
                        alignItems={"center"}
                        boxShadow={"0 0 10px rgba(0,0,0,.1)"}
                        borderRadius={".1rem"}
                        padding={".12rem .2rem"}
                        gap={".05rem"}
                        minWidth={"1.36rem"}>
                        <Flex alignItems={"center"} gap={".06rem"}>
                            <Icon width={".10rem"} height={".15rem"} src={ethIcon}/>
                            <Typography
                                fontSize={".2rem"}
                                color={"#000"}
                                fontWeight={700}
                            >{
                                nft && numberFormat(nft.dayVolume)
                            }</Typography>
                        </Flex>
                        <Flex alignItems={"center"} gap={".1rem"}>
                            <Typography fontSize={".14rem"} color={"#000"}>24h</Typography>
                            <Typography
                                color={
                                    (nft?.dayChange.toNumber() ?? 0)  > 0 ? `#18CF15` : `#FF4949`
                                }
                            >{
                                nft && percentageFormat(nft.dayChange.toNumber())
                            }</Typography>
                        </Flex>
                    </Flex>
                    <Flex
                        flexDirection={"column"}
                        alignItems={"center"}
                        boxShadow={"0 0 10px rgba(0,0,0,.1)"}
                        borderRadius={".1rem"}
                        padding={".12rem .2rem"}
                        gap={".05rem"}
                        minWidth={"1.36rem"}>
                        <Typography fontSize={".2rem"} color={"#000"} fontWeight={700}>{
                            nft && nft.totalShelves
                        }</Typography>
                        <Typography>Total</Typography>
                    </Flex>
                    <Flex
                        flexDirection={"column"}
                        alignItems={"center"}
                        boxShadow={"0 0 10px rgba(0,0,0,.1)"}
                        borderRadius={".1rem"}
                        padding={".12rem .2rem"}
                        gap={".05rem"}
                        minWidth={"1.36rem"}>
                        <Typography fontSize={".2rem"} color={"#000"} fontWeight={700}>{
                            nft && nft.activeCollaterals
                        }</Typography>
                        <Typography>Listed Items</Typography>
                    </Flex>
                </Flex>
            </Box>
            <Box
                marginTop={".1rem"}
                minHeight={"50vh"}
                marginBottom={".6rem"}
            >
                <Outlet/>
            </Box>
        </Box>


    </Flex>
}