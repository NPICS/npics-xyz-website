import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import PopIcon from "../../assets/images/market/one_nft_pop.png"
import {imgurl} from "../../utils/globalimport";
import styled from "styled-components";
import NFTInfo from "./NFTInfo";
import NFTProperties from "./NFTProperties";
import NFTActivities from "./NFTActivities";
import NFTShare from "./NFTShare";
import NFTPrice from "./NFTPrice";
import React, {useEffect, useState} from "react";
import http from "../../utils/http";
import {CollectionDetail} from "../../model/user";
import {deserialize} from "class-transformer";
import {useParams, useNavigate} from 'react-router-dom';
import {Banner} from "./Market";
import nftWarningIcon from "../../assets/images/market/nft_warning_tips.png"
import {getNFTStatusInOpensea} from "../../utils/opensea";
import {useAsync} from "react-use";
import {Popover} from "antd";
import rarity_1_icon from "../../assets/images/market/rarity_1.svg"
import rarity_2_icon from "../../assets/images/market/rarity_2.svg"

function Label(props: {
  icon?: string,
  num: number,
}) {
  return <Flex
    gap={".06rem"}
    alignItems={"center"}
    padding={".04rem .09rem"}
    minHeight={".3rem"}
    borderRadius={".14rem"}
    border={"1px solid #FFFFFF4D"}
    background={"#FFFFFF33"}
    style={{
      "cursor": `${props.icon ? "pointer" : ''}`,
      "backdropFilter": "blur(10px)"
    }}
  >
    {props.icon && <Icon width={".2rem"} src={props.icon}/>}
    <Typography
      fontSize={".14rem"}
      fontWeight={500}
      color={"#fff"}
    >{`${props.icon ? '' : '#'}${props.num}`}</Typography>
  </Flex>
}

const NFTMain = styled.div`
  margin-top: .24rem;
  background: #fff;
  border-radius: .1rem;
  padding: .3rem;
  display: grid;
  grid-template-columns: 4.8rem 6.5rem auto;
  //grid-template-rows: 4.8rem auto auto;
  grid-template-rows: 4.8rem auto auto;
  grid-gap: .26rem;
  grid-template-areas: 
          "cover price share"
          "info activities activities"
          "props activities activities";
`

const Cover = styled.img`
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: .1rem;
`

export default function OneNFT() {
  const [detailData, setDetailData] = useState<CollectionDetail | undefined>(undefined)
  const navigate = useNavigate()
  let urlParams: any = useParams()
  const params: { address: string, tokenId: string } = urlParams
  const [openSeaIsNormalization, setOpenSeaIsNormalization] = useState<boolean>(true)
  const [rarityData, setRarityData] = useState<{ [key: string]: any }>()

  useAsync(async () => {
    if (!params) return;
    await loadDetailData()
    {
      /// rarity
      const resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/getRarity`, {
        address: params.address,
        tokenId: params.tokenId
      })
      if (resp.code === 200 && resp.data) {
        setRarityData(resp.data)
      }
    }
  }, [params])

  useAsync(async () => {
    if (!detailData) return
    // let flag = await getNFTStatusInOpensea(detailData.address, Number(detailData.tokenId))
    // console.log(`flag => ${flag}`)
    // setOpenSeaIsNormalization(flag as boolean)
    let resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/getNftApprove`, {
      address: detailData.address,
      tokenId: detailData.tokenId
    })
    if (resp.code === 200 && resp.data) {
      setOpenSeaIsNormalization(resp.data.supports_wyvern === true)
    }
  }, [detailData])

  function getRarityIconByName(name: string): string | undefined {
    switch (name) {
      case "rarity_sniper":
        return rarity_1_icon
      case "trait_sniper":
        return rarity_2_icon
      default:
        return undefined
    }
  }

  function getRarityPopoverText(name: string, status: string): string {
    switch (name) {
      case "rarity_sniper":
        return `Rarity Sniper Ranking ${status ? `(${status})` : ''}`
      case "trait_sniper":
        return `Trait Sniper Ranking ${status ? `(${status})` : ''}`
      case "gem":
        return `NPics Ranking ${status ? `(${status})` : ''}`
      default:
        return ''
    }
  }

  async function loadDetailData() {
    if (!params) return;
    /// nft detail data
    const resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/getCollectionItemsDetail`, {
      address: params.address,
      tokenId: params.tokenId
    })
    if (resp.code === 200 && resp.data) {
      setDetailData(deserialize(CollectionDetail, JSON.stringify(resp.data)))
    }
  }

  return <Box
    padding={"1.6rem"}
    // width={"16rem"}
    background={"transparent"}
    position={"relative"}
  >
    {/* Banner */}
    <Banner url={detailData?.bannerImageUrl}/>
    <Box position={"relative"} zIndex={1}>
      {/* nav */}
      <Flex flexDirection={"row"} gap={".15rem"} alignItems={"start"}>
        <Icon style={{cursor: 'pointer'}} height={".36rem"} width={".36rem"} src={PopIcon}
              onClick={() => navigate(`/marketplace/collections/${detailData?.address}`)}/>
        <Flex flexDirection={"column"} gap={".05rem"}>
          <Typography fontSize={".16rem"} color={"#fff"} fontWeight={500}
                      fontFamily={"Montserrat"}>{detailData?.collectionName}</Typography>
          <Flex alignItems={"center"} gap={".12rem"}>
            <Typography
              fontSize={".3rem"}
              color={"#fff"}
              fontWeight={800}
            >{`${detailData?.singularForName()} #${detailData?.tokenId}`}</Typography>
            <Popover
              overlayClassName="ant-popover-reset"
              content={"Reported for Suspicious Activity on OpenSea"
            }>
              <Icon
                width={".24rem"}
                height={".24rem"}
                src={nftWarningIcon}
                hidden={openSeaIsNormalization}/>
            </Popover>
          </Flex>

          <Flex flexDirection={"row"} gap={".15rem"} alignItems={"stretch"}>
            {
              rarityData && Object.entries(rarityData).map(([key, val]) => {
                return val && val.rank && <Popover
                  overlayClassName="ant-popover-reset"
                  content={getRarityPopoverText(key, val.status)}
                >
                  <Box onClick={() => {
                    // Temporary solution
                    if(key === 'gem') return
                    window.open(val.url)
                  }}>
                  {/* <a href={val.url} target="_blank"> */}
                    <Label
                      key={key}
                      icon={getRarityIconByName(key)}
                      num={Number(val.rank) ?? 0}
                    />
                  {/* </a> */}
                  </Box>
                </Popover>
              })
            }
          </Flex>
        </Flex>
      </Flex>
      {/* main */}
      <NFTMain>
        <Grid gridArea={"cover"}><Cover src={detailData?.imageUrl}/></Grid>
        <Grid gridArea={"price"}><NFTPrice item={detailData} refreshBlock={loadDetailData}/></Grid>
        <Grid gridArea={"info"}><NFTInfo item={detailData}/></Grid>
        <Grid gridArea={"props"}><NFTProperties item={detailData}/></Grid>
        <Grid gridArea={"activities"}><NFTActivities item={detailData}/></Grid>
        <Grid gridArea={"share"}><NFTShare item={detailData}/></Grid>
      </NFTMain>
    </Box>
  </Box>
}