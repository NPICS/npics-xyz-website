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
import progressIcon from "../../assets/images/market/nft_pay_progressing.gif"

const {Option} = Select;


const InputStyled = styled(Input)`
    background: #fff;
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 10px;
    color: rgba(0,0,0,.5);
    height: 50px;
    padding: 4px 60px;
    .ant-select-selection-item {
        transition: all 0s !important;
    }
`
const BoxBefore = styled(Icon)`
  content: '';
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  z-index: 1;
`

export const Portrait = styled.img`
  display: block;
  object-fit: cover;
  border-radius: 10px;
  /* background: #e5e5e5; */
  overflow: hidden;
  width: 146px;
  height: 146px;
`
const AntdSelect = styled(Select)`
  .ant-select-selector {
    color: rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 14px;
    transition: all 0s !important;
    min-width: 280px;
    min-height: 50px;
    padding: 0 23px !important;
    border: 1px solid rgba(0, 0, 0, 0.2) !important;
    box-shadow: none !important;
    border-radius: 10px !important;
    .ant-select-selection-item {
      line-height: 50px;
      transition: all 0s !important;
    }
  }
`

const Loading = () => {
  return <Flex alignItems={"center"} justifyContent={"center"}>
    <Icon src={progressIcon} width={"160px"} height={"160px"}></Icon>
  </Flex>
}

export default function MarketList() {

  const params = useParams()
  const [nftAddress, setNftAddress] = useState<string>()
  const [compactMode, setCompactMode] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string | undefined>(undefined)
  const [total, setTotal] = useState<number>(0)
  const [listData, setListData] = useState<CollectionItems[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pressEnter, setPressEnter] = useState<boolean>(false)
  const isLoading = useRef(false)
  const [currentSort, setCurrentSort] = useState<"asc" | "desc" | "rarityScore" | "rarityScoreDesc" | string>("asc")

  useEffect(() => {
    if (params.address) {
      setNftAddress(params.address)
      setSearchText('')
      setCurrentPage(1)
    }
  }, [params])

  useAsync(async () => {
    if (nftAddress && !isLoading.current) {
      await loadData()
    }
  }, [nftAddress, pressEnter, currentPage])

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
      borderRadius={"10px"}
      background={"#fff"}
      padding={"40px 0"}
      marginTop={"10px"}
      boxShadow={"rgba(0,0,0,.5)"}>
      <Flex height={"50px"} gap={"12px"} alignItems={"center"} padding={"0 40px"}>
        <Box width={"685px"} position="relative">
          <InputStyled
            type="text"
            placeholder='Search NFTs by name or token ID'
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  setSearchText(e.target.value)}
            onPressEnter={(e: any) => {
              setCurrentPage(1)
              setPressEnter(!pressEnter)
            }}
            className="ant-input-reset"
          />
          <BoxBefore width="20px" height="20px" src={search}/>
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
        <Flex flexDirection={"row"} alignItems={"center"} gap={"2px"}>
          <Icon height={"24px"} width={"24px"} src={compactMode ? LooseUnselectIcon : LooseSelectIcon}
                onClick={() => setCompactMode(false)}/>
          <Icon height={"24px"} width={"24px"} src={compactMode ? CompactSelectIcon : CompactUnselectIcon}
                onClick={() => setCompactMode(true)}/>
        </Flex>
      </Flex>
      {
        loading ? <Grid
            padding={"25px 40px"}
            // marginTop={"25px"}
            gridTemplateColumns={`repeat(${compactMode ? 8 : 5}, 1fr)`}
            gridGap={"10px"}
            justifyContent={"space-between"}
            alignItems={"start"}
            overflow={"auto"}
          >
            {new Array(30).fill(0).map((item,idx) => <SkeletonTemplate key={idx} widthWrap={'100%'}/>)}
          </Grid>
          : listData.length ? <InfiniteScroll
              pageStart={1}
              loadMore={() => {
                if (!isLoading.current) {
                  setCurrentPage(currentPage + 1)
                }
              }}
              hasMore={listData.length < total}
              loader={<Loading key={0}/>}
              initialLoad={false}>
              <Grid
                padding={"25px 40px"}
                // marginTop={"25px"}
                gridTemplateColumns={`repeat(${compactMode ? 8 : 5}, 1fr)`}
                gridGap={compactMode ? `16px` : `25px`}
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
            <Box padding={"160px 0"}>
              <NotFound
                title={"No npics found"}
                text={"This collection doesn’t have any NFTs available to found."}
              />
            </Box>
      }
    </Box>
  </Box>
}