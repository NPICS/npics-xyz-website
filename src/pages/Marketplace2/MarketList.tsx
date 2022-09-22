import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Grid, Icon, Typography } from "../../component/Box";
import styled from "styled-components";
import { layout, space, typography, TypographyProps, color } from "styled-system"
import CollectionCell from "./CollectionCell";
import LooseSelectIcon from "../../assets/images/market/Frame 33.png"
import CompactUnselectIcon from "../../assets/images/market/Frame 34.png"
import LooseUnselectIcon from "../../assets/images/market/loose_unselect.png"
import CompactSelectIcon from "../../assets/images/market/compact_select.png"
import search from "../../assets/images/market/searchInt.svg"
import { CollectionDetail, CollectionItems, Collections } from "../../model/user";
import { deserializeArray, deserialize } from "class-transformer";
import { imgurl } from "../../utils/globalimport";
import http from "../../utils/http";
import { Input, Select } from "antd";
import InfiniteScroll from 'react-infinite-scroller';
import { numberFormat } from "../../utils/urls";
import NotFound from "component/NotFound";
import { globalConstant } from "utils/globalConstant";
import ContentLoader from "react-content-loader"
import { useAsync } from "react-use";
import BigNumber from "bignumber.js";
import SkeletonTemplate from "component/SkeletonTemplate";
import progressIcon from "../../assets/images/market/nft_pay_progressing.gif"
import axios, { Canceler } from "axios";
import { useAppSelector } from "../../store/hooks";
// import axios, { Canceler } from "axios";

const { Option } = Select;


const InputStyled = styled(Input)`
    background: #fff;
    font-weight: 600;
    border: 0.01rem solid rgba(0,0,0,.2);
    border-radius: 0.1rem;
    color: rgba(0,0,0,.5);
    height: 0.5rem;
    padding: 0.04rem 0.6rem;
    .ant-select-selection-item {
        transition: all 0s !important;
    }
`
const BoxBefore = styled(Icon)`
  content: '';
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0.2rem;
  transform: translateY(-50%);
  z-index: 1;
`

export const Portrait = styled.img`
  display: block;
  object-fit: cover;
  border-radius: 0.1rem;
  /* background: #e5e5e5; */
  overflow: hidden;
  width: 1.46rem;
  height: 1.46rem;
`
const AntdSelect = styled(Select)`
  font-weight: 600;
  .ant-select-selector {
    color: rgba(0, 0, 0, .5);
    font-size: 0.12rem;
    transition: all 0s !important;
    min-width: 2.8rem;
    min-height: 0.5rem;
    padding: 0 0.23rem !important;
    border: 0.01rem solid rgba(0, 0, 0, 0.2) !important;
    box-shadow: none !important;
    border-radius: 0.1rem !important;
    .ant-select-selection-item {
      font-weight: 600;
      line-height: 0.5rem;
      transition: all 0s !important;
    }
  }
`

const Loading = () => {
  return <Flex alignItems={"center"} justifyContent={"center"}>
    <Icon src={progressIcon} width={"1.6rem"} height={"1.6rem"}></Icon>
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
  const CancelToken = axios.CancelToken;
  const cancel = useRef<Canceler>()
  const platform = useAppSelector(state => state.platform.selectPlatform)
  // let cancel:Canceler

  useEffect(() => {
    if (params.address) {
      setNftAddress(params.address)
      setSearchText('')
      setCurrentPage(1)
    }
  }, [params])

  useAsync(async () => {
    if (nftAddress && !isLoading.current && platform !== "") {
      await loadData()
    }
  }, [nftAddress, pressEnter, currentPage, platform])

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
    try {
      isLoading.current = true
      if (currentPage > 0) {
        // Prevent more list loading from loading
        if (currentPage === 1) {
          setLoading(true)
        }
        // isLoading.current = false
        let resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/getCollectionItems`, {
          address: nftAddress,
          direction: currentSort,
          pageIndex: currentPage,
          platform: platform,
          pageSize: 30,
          search: searchText,
          showNftx: globalConstant.showNftx
        },
          {
            cancelToken: new CancelToken(function executor(c) {
              if (currentPage === 1) {
                isLoading.current = false
              }
              cancel.current?.()
              cancel.current = c;
            })
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
    } catch (e) {
      isLoading.current = false
    }
    finally {
      isLoading.current = false
    }
  }

  return <Box>
    <Box
      borderRadius={"0.1rem"}
      background={"#fff"}
      padding={"0.4rem 0"}
      marginTop={"0.1rem"}
      boxShadow={"rgba(0,0,0,.5)"}>
      <Flex height={"0.5rem"} gap={"0.12rem"} alignItems={"center"} padding={"0 0.4rem"}>
        <Box width={"6.85rem"} position="relative">
          <InputStyled
            type="text"
            placeholder='Search NFTs by name or token ID'
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
            onPressEnter={(e: any) => {
              setCurrentPage(1)
              setPressEnter(!pressEnter)
            }}
            className="ant-input-reset"
          />
          <BoxBefore width="0.2rem" height="0.2rem" src={search} />
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
        <Flex flexDirection={"row"} alignItems={"center"} gap={"0.02rem"}>
          <Icon height={"0.24rem"} width={"0.24rem"} src={compactMode ? LooseUnselectIcon : LooseSelectIcon}
            onClick={() => setCompactMode(false)} />
          <Icon height={"0.24rem"} width={"0.24rem"} src={compactMode ? CompactSelectIcon : CompactUnselectIcon}
            onClick={() => setCompactMode(true)} />
        </Flex>
      </Flex>
      {
        loading ? <Grid
          padding={"0.25rem 0.4rem"}
          // marginTop={"0.25rem"}
          gridTemplateColumns={`repeat(${compactMode ? 8 : 5}, 1fr)`}
          gridGap={"0.1rem"}
          justifyContent={"space-between"}
          alignItems={"start"}
          overflow={"auto"}
        >
          {new Array(30).fill(0).map((item, idx) => <SkeletonTemplate key={idx} widthWrap={'100%'} />)}
        </Grid>
          : listData.length ? <InfiniteScroll
            pageStart={1}
            loadMore={() => {
              if (!isLoading.current) {
                setCurrentPage(currentPage + 1)
              }
            }}
            hasMore={listData.length < total}
            loader={<Loading key={0} />}
            initialLoad={false}>
            <Grid
              padding={"0.25rem 0.4rem"}
              // marginTop={"0.25rem"}
              gridTemplateColumns={`repeat(${compactMode ? 8 : 5}, 1fr)`}
              gridGap={compactMode ? `0.16rem` : `0.25rem`}
              justifyContent={"space-between"}
              alignItems={"start"}
              overflow={"auto"}>
              {
                listData.map((item, idx) => {
                  return <CollectionCell
                    key={idx}
                    compact={compactMode}
                    item={item} />
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