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
import search from "../../assets/images/market/searchInt.svg"
import {CollectionDetail, CollectionItems, Collections} from "../../model/user";
import {deserializeArray, deserialize} from "class-transformer";
import {imgurl} from "../../utils/globalimport";
import http from "../../utils/http";
import {Input, Select} from "antd";
import InfiniteScroll from 'react-infinite-scroller';
import {numberFormat} from "../../utils/urls";
import NotFound from "component/NotFound";
import {globalConstant} from "utils/globalConstant";
import ContentLoader from "react-content-loader"
import {useAsync} from "react-use";
import BigNumber from "bignumber.js";
import SkeletonTemplate from "component/SkeletonTemplate";

const {Option} = Select;


const InputStyled = styled(Input)`
    background: #fff;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 10px;
    color: rgba(0,0,0,.5);
    height: .5rem;
    padding: .04rem .6rem;
    .ant-select-selection-item {
        transition: all 0s !important;
    }
`
const BoxBefore = styled(Icon)`
  content: '';
  display: inline-block;
  position: absolute;
  top: 50%;
  left: .2rem;
  transform: translateY(-50%);
  z-index: 1;
`

export const Portrait = styled.img`
  display: block;
  object-fit: cover;
  border-radius: .1rem;
  /* background: #e5e5e5; */
  overflow: hidden;
  width: 1.46rem;
  height: 1.46rem;
`
const AntdSelect = styled(Select)`
  .ant-select-selector {
    color: rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: .14rem;
    transition: all 0s !important;
    min-width: 2.4rem;
    min-height: .5rem;
    padding: 0 .23rem !important;
    border: 1px solid rgba(0, 0, 0, 0.2) !important;
    box-shadow: none !important;
    border-radius: 10px !important;
    .ant-select-selection-item {
      line-height: .5rem;
      transition: all 0s !important;
    }
  }
`

export default function MarketList() {

  const params = useParams()
  const [nftAddress, setNftAddress] = useState<string>()
  const [compactMode, setCompactMode] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string | undefined>(undefined)
  const [total, setTotal] = useState<number>(0)
  const [listData, setListData] = useState<CollectionItems[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const isLoading = useRef(false)
  const [currentSort, setCurrentSort] = useState<"asc" | "desc" | "rarityScore" | "rarityScoreDesc" | string>("asc")

  useEffect(() => {
    if (params.address) {
      setNftAddress(params.address)
      setSearchText(undefined)
      setCurrentPage(1)
    }
  }, [params])

  useAsync(async () => {
    if (nftAddress && !isLoading.current) {
      await loadData()
    }
  }, [nftAddress, searchText, currentPage])

  useAsync(async () => {
    if (currentPage === 1) {
      await loadData()
    } else {
      setCurrentPage(1)
    }
  }, [currentSort])

  useEffect(() => {
    console.log(`currentPage => ${currentPage}`)
  }, [currentPage])

  async function loadData() {
    isLoading.current = true
    if (currentPage > 0) {
      // Prevent more list loading from loading
      if (currentPage === 1) {
        setLoading(true)
      }
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
        setListData(currentPage === 1 ? [] : listData)
      }
      if (currentPage === 1) {
        setLoading(false)
      }
    }
    isLoading.current = false
  }

  return <Box>
    <Box
      borderRadius={".1rem"}
      background={"#fff"}
      padding={".4rem 0"}
      marginTop={".1rem"}
      boxShadow={"rgba(0,0,0,.5)"}>
      <Flex height={".5rem"} gap={".12rem"} alignItems={"center"} padding={"0 .4rem"}>
        <Box width={"6.85rem"} position="relative">
          <InputStyled
            type="text"
            placeholder='Search NFTs by name or token ID'
            onPressEnter={(e: any) => {
              setCurrentPage(1)
              setSearchText(e.target.value)
            }}
            className="ant-input-reset"
          />
          <BoxBefore width=".2rem" height=".2rem" src={search}/>
        </Box>
        <AntdSelect onSelect={(value: any) => setCurrentSort(value)}
                    defaultValue="asc"
                    dropdownClassName="ant-select-reset">
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
        loading ? <Grid
            padding={".25rem .4rem"}
            // marginTop={".25rem"}
            gridTemplateColumns={`repeat(${compactMode ? 8 : 5}, 1fr)`}
            gridGap={".1rem"}
            justifyContent={"space-between"}
            alignItems={"start"}
            overflow={"auto"}
          >
            {new Array(30).fill(0).map(() => <SkeletonTemplate widthWrap={'100%'}/>)}
          </Grid>
          : listData.length ? <InfiniteScroll

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
                padding={".25rem .4rem"}
                // marginTop={".25rem"}
                gridTemplateColumns={`repeat(${compactMode ? 8 : 5}, 1fr)`}
                gridGap={compactMode ? `.16rem` : `.25rem`}
                justifyContent={"space-between"}
                alignItems={"start"}
                overflow={"auto"}>
                {
                  listData.map((item, idx) => {
                    return <CollectionCell
                      key={idx}
                      compact={compactMode}
                      item={item}/>
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