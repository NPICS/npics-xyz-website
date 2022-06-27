import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {layout, space, typography, TypographyProps, color} from "styled-system"
import CollectionCell from "./CollectionCell";
import LooseSelectIcon from "../../assets/images/market/Frame 33.png"
import CompactUnselectIcon from "../../assets/images/market/Frame 34.png"
import LooseUnselectIcon from "../../assets/images/market/loose_unselect.png"
import CompactSelectIcon from "../../assets/images/market/compact_select.png"
import {CollectionDetail, CollectionItems, Collections} from "../../model/user";
import {deserializeArray, deserialize} from "class-transformer";
import {imgurl} from "../../utils/globalimport";
import http from "../../utils/http";
import {Input, Select} from "antd";
import InfiniteScroll from 'react-infinite-scroller';
import {numberFormat} from "../../utils/urls";
import NotFound from "component/NotFound";
import { globalConstant } from "utils/globalConstant";
import ContentLoader from "react-content-loader"
const {Option} = Select;


const InputStyled = styled(Input)`
    background: #fff;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 10px;
    color: rgba(0,0,0,.5);
    height: .5rem;
`

export const Portrait = styled.img`
  display: block;
  object-fit: cover;
  border-radius: .1rem;
  background: #e5e5e5;
  overflow: hidden;
  width: 1.46rem;
  height: 1.46rem;
`
const AntdSelect = styled(Select)`
  .ant-select-selector {
    color: rgba(0,0,0,.5);
    font-weight: 500;
    font-size: .14rem;
    min-width: 2rem;
    min-height: .5rem;
    padding: 0 .23rem !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: none !important;
    border-radius: 10px !important;
    .ant-select-selection-item {
      line-height: .5rem;
    }
  }
`

export default function MarketList() {


    // let location = useLocation()
    const params = useParams()
    const [nftAddress, setNftAddress] = useState<string>()
    const [compactMode, setCompactMode] = useState<boolean>(false)
    const [searchText, setSearchText] = useState<string | undefined>(undefined)
    const [total, setTotal] = useState<number>(0)
    const [listData, setListData] = useState<CollectionItems[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const isLoading = useRef(false)
    const [currentSort, setCurrentSort] = useState<"asc" | "desc" | "rarityScore" | "rarityScoreDesc" | string>("asc")

    useEffect(() => {
        if (params.address) {
            setNftAddress(params.address)
            setCurrentPage(1)
        }
    }, [params])

    useEffect(() => {
        if (nftAddress && !isLoading.current) {
            loadData().finally()
        }
    }, [nftAddress, searchText, currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            loadData()
        } else {
            setCurrentPage(1)
        }
    }, [currentSort])

    useEffect(() => {
        console.log(`currentPage => ${currentPage}`)
    }, [currentPage])

    async function loadData() {
        isLoading.current = true
        console.log(`page => ${currentPage}, ${nftAddress}`)
        if (currentPage > 0) {
            let resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/getCollectionItems`, {
                address: nftAddress,
                direction: currentSort,
                pageIndex: currentPage,
                pageSize: 30,
                search: searchText,
                showNftx: globalConstant.showNftx
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
            marginTop={".1rem"}
            boxShadow={"rgba(0,0,0,.5)"}>
            <Flex height={".5rem"} gap={".12rem"} alignItems={"center"}>
                <Box width={"6.85rem"}>
                    <InputStyled
                        type="text"
                        placeholder='Search'
                        onPressEnter={(e: any) => {
                            setCurrentPage(1)
                            setSearchText(e.target.value)
                        }}
                        className="ant-input-reset"
                    />
                </Box>
                <AntdSelect onSelect={(value: any) => {
                    setCurrentSort(value)
                }} defaultValue="asc" dropdownClassName="ant-select-reset">
                    <Option value="asc">Price: Low to High</Option>
                    <Option value="desc">Price: high to low</Option>
                    <Option value="rarityScoreDesc">Rarity: Common to Rarest</Option>
                    <Option value="rarityScore">Rarity: Rarest to Common</Option>
                </AntdSelect>
                <Flex flex={1}></Flex>
                <Flex flexDirection={"row"} alignItems={"center"} gap={".2rem"}>
                    <Icon height={".24rem"} width={".24rem"} src={compactMode ? LooseUnselectIcon : LooseSelectIcon}
                          onClick={() => setCompactMode(false)}/>
                    <Icon height={".24rem"} width={".24rem"} src={compactMode ? CompactSelectIcon : CompactUnselectIcon}
                          onClick={() => setCompactMode(true)}/>
                </Flex>
            </Flex>
            {
                listData.length ? <InfiniteScroll
                        pageStart={1}
                        loadMore={() => {
                            if (!isLoading.current) {
                                setCurrentPage(currentPage + 1)
                            }
                        }}
                        hasMore={listData.length < total}
                        loader={<div></div>}
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
                    </InfiniteScroll> :
                    <Box padding={"1.6rem 0"}>
                        <NotFound
                            title={"No npics found"}
                            text={"This collection doesn’t have any NFTs available to found."}
                        />
                    </Box>
            }
        </Box>
    </Box>
}