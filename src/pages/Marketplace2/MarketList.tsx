import {useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {layout, space, typography, TypographyProps, color} from "styled-system"
import CollectionCell from "./CollectionCell";
import LooseSelectIcon from "../../assets/images/market/Frame 33.png"
import CompactUnselectIcon from "../../assets/images/market/Frame 34.png"
import LooseUnselectIcon from "../../assets/images/market/loose_unselect.png"
import CompactSelectIcon from "../../assets/images/market/compact_select.png"
import {CollectionItems, Collections} from "../../model/user";
import {deserializeArray, deserialize} from "class-transformer";
import {imgurl} from "../../utils/globalimport";
import http from "../../utils/http";
import {Input, Select} from "antd";
import InfiniteScroll from 'react-infinite-scroller';
import {numberFormat} from "../../utils/urls";

const {Option} = Select;

const Portrait = styled.img`
  display: block;
  object-fit: cover;
  border-radius: .1rem;
  background: #e5e5e5;
  overflow: hidden;
  width: 1.46rem;
  height: 1.46rem;
`

export default function MarketList() {
    let location = useLocation()
    const [nft, setNft] = useState<Collections>()
    const [compactMode, setCompactMode] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string | undefined>(undefined)
    const [total, setTotal] = useState<number>(0)
    const [listData, setListData] = useState<CollectionItems[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const isLoading = useRef(false)
    const [currentSort, setCurrentSort] = useState<"asc" | "desc" | "rarityScore" | "rarityScoreDesc" | string>("asc")

    useEffect(() => {
        let state: any = location.state
        let nft = deserialize(Collections, JSON.stringify(state.item))
        setNft(nft)
        setCurrentPage(1)
    }, [location.state])

    useEffect(() => {
        if (nft?.address && !isLoading.current) {
            loadData().finally()
        }
    }, [nft?.address, searchText, currentPage, currentSort])

    useEffect(() => {
        console.log(`currentPage => ${currentPage}`)
    }, [currentPage])

    async function loadData() {
        isLoading.current = true
        console.log(`page => ${currentPage}, ${nft?.address}`)
        if (currentPage > 0) {
            let resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/getCollectionItems`, {
                address: nft?.address,
                direction: currentSort,
                pageIndex: currentPage,
                pageSize: 30,
                search: searchText
            })
            if (resp.code === 200 && resp.data.records) {
                let newListData = deserializeArray(CollectionItems, JSON.stringify(resp.data.records))
                setListData(currentPage === 1 ? newListData : listData.concat(newListData))
                setTotal(resp.data.total)
            } else {
            }
        }
        isLoading.current = false
    }

    return <Box>
        <Box
            borderRadius={".1rem"}
            background={"#fff"}
            padding={".4rem"}
            boxShadow={"rgba(0,0,0,.5)"}>
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
                        <Icon width={".12rem"} height={".16rem"} url={imgurl.market.blackPrice}/>
                        <Typography fontSize={".2rem"} color={"#000"}>{
                            nft && numberFormat(nft.floorPrice.toNumber())
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
                        <Icon width={".12rem"} height={".16rem"} url={imgurl.market.blackPrice}/>
                        <Typography fontSize={".2rem"}
                                    color={"#000"}>{nft && numberFormat(nft.floorPrice.toNumber())}</Typography>
                    </Flex>
                    <Flex alignItems={"center"} gap={".1rem"}>
                        <Typography fontSize={".14rem"} color={"#000"}>24h</Typography>
                        <Typography>{nft?.dayChange.toFixed()}</Typography>
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
                    <Typography fontSize={".2rem"} color={"#000"} fontWeight={"500"}>{
                        nft && numberFormat(nft.totalShelves)
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
                    <Typography fontSize={".2rem"} color={"#000"} fontWeight={500}>{
                        nft && numberFormat(nft.activeCollaterals)
                    }</Typography>
                    <Typography>Listed Items</Typography>
                </Flex>
            </Flex>
        </Box>
        <Box
            borderRadius={".1rem"}
            background={"#fff"}
            padding={".4rem"}
            marginTop={".1rem"}
            boxShadow={"rgba(0,0,0,.5)"}>
            <Flex height={".5rem"} gap={".12rem"} alignItems={"center"}>
                <Box width={"6.85rem"}>
                    <Input
                        type="text"
                        placeholder='Search'
                        onPressEnter={(e: any) => {
                            setCurrentPage(1)
                            setSearchText(e.target.value)
                        }}
                        className="ant-input-reset"
                    />
                </Box>
                <Select onSelect={(value: string) => {
                    setCurrentSort(value)
                }} defaultValue="asc" dropdownClassName="ant-selectDropDown-reset">
                    <Option value="asc">Price: Low to High</Option>
                    <Option value="desc">Price: high to low</Option>
                    <Option value="rarityScoreDesc">Rarity: Common to Rarest</Option>
                    <Option value="rarityScore">Rarity: Rarest to Common</Option>
                </Select>
                <Flex flex={1}></Flex>
                <Flex flexDirection={"row"} alignItems={"center"} gap={".2rem"}>
                    <Icon height={".24rem"} width={".24rem"} url={compactMode ? LooseUnselectIcon : LooseSelectIcon}
                          onClick={() => setCompactMode(false)}/>
                    <Icon height={".24rem"} width={".24rem"} url={compactMode ? CompactSelectIcon : CompactUnselectIcon}
                          onClick={() => setCompactMode(true)}/>
                </Flex>
            </Flex>
            <InfiniteScroll
                pageStart={1}
                loadMore={() => {
                    if (!isLoading.current) {
                        setCurrentPage(currentPage + 1)
                    }
                }}
                hasMore={listData.length < total}
                loader={<div>Loading...</div>}
                initialLoad={false}>
                <Grid
                    marginTop={".25rem"}
                    gridTemplateColumns={`repeat(${compactMode ? 8 : 6}, 1fr)`}
                    gridGap={".1rem"}
                    justifyContent={"space-between"}
                    alignItems={"start"}
                    overflow={"auto"}>
                    {
                        listData.map((item, idx) => {
                            return <CollectionCell
                                key={idx}
                                compact={compactMode}
                                item={item}
                            />
                        })
                    }
                </Grid>
            </InfiniteScroll>
        </Box>
    </Box>
}