import { Box, Flex, Icon, Typography } from "../../component/Box";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import http from "../../utils/http";
import { deserializeArray } from "class-transformer";
import { Collections } from "../../model/user";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { numberFormat } from "../../utils/urls";
import { Portrait } from "./MarketList";
import { percentageFormat } from "./utils";
import ethIcon from "../../assets/images/market/eth_icon_10x15.svg"
import numeral from "numeral";
import { Popover } from "antd";
import openseaValidIcon from "../../assets/images/market/nfts_opensea_valid.svg"
import NPopover from "../../component/Popover";
import ReactMarkdown from "react-markdown";
import { TextPlaceholder } from "../../component/styled";
import { Pop20 } from "component/Popover/Popover";


export const Banner = styled(Box) <{ url?: string }>`
  position: absolute;
  height: 4.8rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
  background-image: url(${((props) => props.url)});
  background-repeat: no-repeat;
  background-size: cover;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background: rgba(0, 0, 0, .5);
  }
`

export const ExpandBtn = styled(Box)`
  color: #FF490F;
  font-size: 0.14rem;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
`

const CollectionItem = styled.img<{
  isSelected?: boolean,
  imgUrl?: string
}>`
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  //background: transparent url(${(props) => props.imgUrl}) no-repeat center;
  //background-size: cover;
  background: ${(props) => props.isSelected ? `#fff` : `transparent`};
  border: none;
  outline: none;
  //overflow: hidden;
  border-radius: 0.1rem;
  object-fit: cover;
  // border: ${(props) => props.isSelected ? `0.03rem` : 0} solid #fff;
  box-shadow: 0 0 0 ${(props) => props.isSelected ? `0.03rem` : 0} #fff;
  transform: ${(props) => props.isSelected ? "scale(1.15)" : "scale(1)"};
  //transition: all .1s;
`

const MarkdownContainer = styled.div<{
  expand: boolean
}>`
  color: rgba(0, 0, 0, .5);
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.expand ? `none` : 2};
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
  font-size: 0.14rem;
  font-weight: 500;
  //
  //p {
  //  margin: 0.06rem 0;
  //}
`

export default function Market() {
  const [listData, setListData] = useState<Collections[]>([])
  // const [selectAddress, setSelectAddress] = useState<string>()
  const [descriptionExpand, setDescriptionExpand] = useState(false)
  const [expandBtnHidden, setExpandBtnHidden] = useState(true)
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
    padding={"0 1.6rem"}
    background={"transparent"}>
    <Banner url={nft?.bannerImageUrl} />
    <Box zIndex={1}>
      <Box marginTop={"2.1rem"}>
        <Typography
          color={"#fff"}
          fontSize={"0.3rem"}
          fontWeight={"800"}>
          Collections
        </Typography>
      </Box>
      <Flex
        flexDirection={"row"}
        alignItems={"stretch"}
        gap={"0.26rem"}
        marginTop={"0.35rem"}>
        {
          listData.map((item, idx) => {
            return <Popover
              key={idx}
              content={item.name}
              placement='bottom'
              overlayClassName="ant-popover-collectionPopver"
            >
              <CollectionItem
                key={idx}
                isSelected={nft?.address === item.address}
                imgUrl={item.imageUrl}
                src={item.imageUrl}
                onClick={() => {
                  setNft(item)
                }}
              /></Popover>
          })
        }
      </Flex>
      <Box
        marginTop={"0.4rem"}
        borderRadius={"0.1rem"}
        background={"#fff"}
        padding={"0.4rem"}
        boxShadow={"rgba(0,0,0,.5)"}
      >
        <Flex>
          <Portrait src={nft?.imageUrl} />
          <Flex
            marginLeft={"0.24rem"}
            flexDirection={"column"}
            gap={"0.08rem"}
            flex={1}
            justifyContent={"center"}
          >
            <Flex alignItems={"center"} gap={"0.02rem"}>
              <Typography
                fontWeight={800}
                fontSize={"0.4rem"}
                lineHeight={"0.56rem"}
                color={"#000"}
              >{nft?.name}</Typography>
              <Pop20 content={"Verified On OpenSea"}>
                <Icon
                  hidden={params.address == undefined}
                  src={openseaValidIcon}
                  width={"0.24rem"}
                  height={"0.24rem"} />
              </Pop20>
            </Flex>
            <MarkdownContainer ref={(e) => {
              if (!e) return
              if (e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth) {
                setExpandBtnHidden(false)
              } else {
                if (descriptionExpand) {
                  setExpandBtnHidden(false)
                } else {
                  setExpandBtnHidden(true)
                }
              }
            }} expand={descriptionExpand}>
              <ReactMarkdown className={``} children={nft?.description ?? ``}></ReactMarkdown>
            </MarkdownContainer>
            <ExpandBtn
              hidden={expandBtnHidden}
              onClick={() => {
                setDescriptionExpand(!descriptionExpand)
              }}>{descriptionExpand ? `less` : `more`}</ExpandBtn>

            {/*<Typography*/}
            {/*    fontWeight={"500"}*/}
            {/*    fontSize={"0.14rem"}*/}
            {/*    lineHeight={"120%"}*/}
            {/*    color={"rgba(0, 0, 0, .5)"}*/}
            {/*    textAlign={"justify"}*/}
            {/*>*/}
            {/*    {nft?.description}*/}
            {/*</Typography>*/}
          </Flex>
        </Flex>
        <Flex
          marginTop={"0.16rem"}
          flexDirection={"row"}
          gap={"0.1rem"}
          alignItems={"stretch"}
        >
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            boxShadow={"0 0 0.1rem rgba(0,0,0,.1)"}
            borderRadius={"0.1rem"}
            padding={"0.12rem 0.2rem"}
            gap={"0.02rem"}
            minWidth={"1.36rem"}>
            <Flex alignItems={"center"} gap={"0.02rem"}>
              <Icon width={"0.18rem"} height={"0.18rem"} src={ethIcon} />
              <Typography
                fontSize={"0.2rem"}
                color={"#000"}
                fontWeight={700}
              >{
                  // nft && numberFormat(nft.floorPrice.div(10 ** 18).toFixed())
                  nft && numeral(nft.floorPrice.div(10 ** 18).toFixed()).format("0,0.[00]")
                }</Typography>
            </Flex>
            <Typography fontWeight={"500"} fontSize={"0.14rem"} color={"#000"}>Floor</Typography>
          </Flex>
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            boxShadow={"0 0 0.1rem rgba(0,0,0,.1)"}
            borderRadius={"0.1rem"}
            padding={"0.12rem 0.2rem"}
            gap={"0.02rem"}
            minWidth={"1.36rem"}>
            <Flex alignItems={"center"} gap={"0.02rem"}>
              <Icon width={"0.18rem"} height={"0.18rem"} src={ethIcon} />
              <Typography
                fontSize={"0.2rem"}
                color={"#000"}
                fontWeight={700}
              >{
                  // nft && numberFormat(nft.floorPrice.div(10 ** 18).toFixed())
                  // nft && numeral(nft.floorPrice.div(10 ** 18).toFixed()).format("0,0.[00]")
                  47.2
                }</Typography>
            </Flex>
            <Typography fontWeight={"500"} fontSize={"0.14rem"} color={"#000"}>Min DP</Typography>
          </Flex>
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            boxShadow={"0 0 0.1rem rgba(0,0,0,.1)"}
            borderRadius={"0.1rem"}
            padding={"0.12rem 0.2rem"}
            gap={"0.02rem"}
            minWidth={"1.36rem"}>
            <Flex alignItems={"center"} gap={"0.02rem"}>
              <Icon width={"0.18rem"} height={"0.18rem"} src={ethIcon} />
              <Typography
                fontSize={"0.2rem"}
                color={"#000"}
                fontWeight={700}
              >{
                  nft && numeral(nft.dayVolume).format("0,0.[00]")
                  // nft && numberFormat(new BigNumber(nft.dayVolume).toFixed(2,1))
                }</Typography>
            </Flex>
            <Flex alignItems={"center"} gap={"0.1rem"}>
              <Typography fontWeight={"500"} fontSize={"0.14rem"} color={"#000"}>24h</Typography>
              <Typography
                fontSize={`0.14rem`}
                fontWeight={500}
                color={
                  (nft?.dayChange.toNumber() ?? 0) > 0 ? `#18CF15` : `#FF4949`
                }
              >{
                  nft && percentageFormat(nft.dayChange.toNumber())
                }</Typography>
            </Flex>
          </Flex>
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            boxShadow={"0 0 0.1rem rgba(0,0,0,.1)"}
            borderRadius={"0.1rem"}
            padding={"0.12rem 0.2rem"}
            gap={"0.02rem"}
            minWidth={"1.36rem"}>
            <Typography fontSize={"0.2rem"} color={"#000"} fontWeight={700}>{
              nft ? numberFormat(nft.realTotalSupply) : TextPlaceholder
            }</Typography>
            <Typography
              color={`#000`}
              fontSize={`0.14rem`}
              fontWeight={500}
            >Supply</Typography>
          </Flex>
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            boxShadow={"0 0 0.1rem rgba(0,0,0,.1)"}
            borderRadius={"0.1rem"}
            padding={"0.12rem 0.2rem"}
            gap={"0.02rem"}
            minWidth={"1.36rem"}>
            <Typography fontSize={"0.2rem"} color={"#000"} fontWeight={700}>{
              nft ? numberFormat(nft.totalShelves) : TextPlaceholder
            }</Typography>
            <Typography
              color={`#000`}
              fontSize={`0.14rem`}
              fontWeight={500}
            >Listing</Typography>
          </Flex>
        </Flex>
      </Box>
      <Box
        marginTop={"0.1rem"}
        minHeight={"50vh"}
        marginBottom={"0.6rem"}
      >
        <Outlet />
      </Box>
    </Box>


  </Flex>
}