import Modal from "../../../../component/Modal";
import { Box, Flex, Icon, Typography } from "../../../../component/Box";
import refreshIcon from "../../../../assets/images/dashboard/refresh_icon.svg"
import wethIcon from "../../../../assets/images/market/weth_icon.svg"
import { useState } from "react";
import styled from "styled-components";
import { OfferModal } from "./TableWarehouse";
import { Sort, useSwrOffer } from 'hooks/useSwr'
import { Offers } from "model/offers";
import { thousandFormat } from '../../../../utils/urls';
import BigNumber from "bignumber.js";
import { useAppSelector } from "store/hooks";
import { useEffect } from 'react';
import { useIntervalWhen } from 'rooks';
import { imgurl } from 'utils/globalimport';
import { DataSource2 } from "./StyledInterface";
import { Select } from 'antd'
import { useAsync } from "react-use";
import { useWETHContract } from 'hooks/useContract';
import { useWeb3React } from "@web3-react/core";
import ButtonDefault from "component/ButtonDefault";
const { Option } = Select;
const Button = styled.button`
  color: #fff;
  background: #000;
  border-radius: 0.1rem;
  font-size: 0.14rem;
  font-weight: 700;
  min-width: 1.5rem;
  height: 0.48rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background: #333;
  }
`
const StyledSelect = styled(Select)`
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

const FlexList = styled(Flex)`
  overflow-style: unset;

  &::-webkit-scrollbar {
    display: none;
  }
`
interface IProps {
  showOffer: OfferModal
  nftInfo: DataSource2 | undefined
  nftAddress: string | undefined
  setShowOffer: React.Dispatch<React.SetStateAction<OfferModal>>
  setAcceptOffer: React.Dispatch<React.SetStateAction<Offers | undefined>>
}
let timer: NodeJS.Timer
export default function AcceptOffersList(props: IProps) {
  const { showOffer, setShowOffer, nftAddress, nftInfo } = props
  const [topOfferPrice, setTopOfferPrice] = useState(0)
  const [second, setSecond] = useState(0)
  const [currentSort, setCurrentSort] = useState<Sort>(Sort.priceToLow)
  const { offerList, isError, isLoading } = useSwrOffer("0x8a90cab2b38dba80c64b7734e58ee1db38b8992e", currentSort)


  // useEffect(() => {
  //   console.log('asdasdasdasdas13518888888888888');
  //   console.log(offerList)

  // }, [offerList, isLoading])

  // useIntervalWhen(() => {
  //   let s = second + 1
  //   if(s === 10) {
  //     s = 0
  //   }
  //   setSecond(s)
  // }, 1000 * 1, true, true)

  // console.log(offerList, isError, isLoading)



  return <Modal isOpen={showOffer === OfferModal.OFFERSLIST} onRequestClose={() => setShowOffer(OfferModal.NONE)}>
    {/* Box */}
    <Flex
      background={"#fff"}
      borderRadius={"0.2rem"}
      padding={"0.4rem"}
      flexDirection={"column"}
      minWidth={"8.2rem"}
      maxHeight={"6.8rem"}
    >
      {/* Title */}
      <Flex justifyContent={"space-between"}>
        <Flex width={"24%"}></Flex>
        <Typography
          fontSize={"0.3rem"}
          fontWeight={800}
          textAlign={"center"}
        >Acceptable Offers List</Typography>
        {/* Refresh  */}
        <Flex gap={"0.2rem"} alignItems={"center"} justifyContent={"end"} width={"24%"} style={{ cursor: "pointer" }}>
          <Typography>{second} seconds ago</Typography>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            width={"0.24rem"}
            height={"0.24rem"}
            borderRadius={"0.05rem"}
            border={"0.01rem solid #0000004D"}
          >
            <Icon src={refreshIcon} width={"0.13rem"} height={"0.13rem"}></Icon>
          </Flex>
        </Flex>
      </Flex>

      {

        isError ? <Box>Error</Box> : <>
          {/* Select Office */}
          <Flex justifyContent={"end"} alignItems={"center"} marginTop={"0.32rem"}>
            <StyledSelect onSelect={(value: any) => setCurrentSort(value)}
              defaultValue={Sort.priceToHigh}
              dropdownClassName="ant-select-reset">
              <Option value={Sort.priceToHigh}>Price: Low to High</Option>
              <Option value={Sort.priceToLow}>Price: high to low</Option>
              <Option value={Sort.timeNew}>Newest</Option>
              <Option value={Sort.timeExpiring}>Expiring Soon</Option>
            </StyledSelect>
          </Flex>

          {/* List */}
          <FlexList flexDirection={"column"} gap={"0.1rem"} overflow={"auto"} marginTop={"0.2rem"}>
            {
              offerList && offerList.offerList.map((item, idx) => {
                return <AcceptOffersCell nftInfo={nftInfo} setAcceptOffer={props.setAcceptOffer} offerInfo={item} key={idx} setShowOffer={setShowOffer} />
              })
            }
          </FlexList>
        </>
      }

    </Flex>
  </Modal>
}

function AcceptOffersCell(props: {
  setShowOffer: React.Dispatch<React.SetStateAction<OfferModal>>
  offerInfo: Offers
  nftInfo: DataSource2 | undefined
  setAcceptOffer: React.Dispatch<React.SetStateAction<Offers | undefined>>
}) {
  const { nftInfo, offerInfo, setAcceptOffer, setShowOffer } = props
  const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
  const { account } = useWeb3React()
  const [wethBalance, setWethBalance] = useState<BigNumber>(new BigNumber(0))
  const weth = useWETHContract(true)
  useAsync(async () => {
    if (!account || !weth) return
    const aa = await weth.balanceOf(account)
    setWethBalance(new BigNumber(aa.toString()))
    console.log(`weth => ${aa}`)
    console.log(`offerInfo => ${offerInfo.price}`)
  }, [weth])
  return <Flex
    border={"0.01rem solid #0000001A"}
    borderRadius={"0.1rem"}
    padding={"0.11rem 0.3rem"}
    alignItems={"center"}
  >
    {/* Market Icon */}
    <Box borderRadius={"0.18rem"} background={"#eee"}>
      <Icon style={{ borderRadius: '0.18rem' }} width={"0.36rem"} height={"0.36rem"} src={nftInfo?.imageUrl}></Icon>
    </Box>
    {/* Price */}
    <Flex marginLeft={"0.2rem"}
      width={"38%"}
      alignItems={"start"}
      gap={"0.02rem"}
      flexDirection={"column"}
    >
      <Flex alignItems={"start"} gap={"0.04rem"}>
        <Flex alignItems={"center"} gap={"0.06rem"}>
          <Icon src={wethIcon} width={"0.1rem"} height={"0.15rem"}></Icon>
          <Typography
            color={"#000"}
            fontSize={"0.16rem"}
            fontWeight={500}
          >{offerInfo.OfferPriceDisplay()}</Typography>
          <Typography
            color={"rgba(0,0,0,.5)"}
            fontSize={"0.14rem"}
            fontWeight={500}
            marginLeft={"0.04rem"}
          >{`(${thousandFormat(offerInfo.price.times(ethRate).div(10 ** 18)
            .toNumber())})`}</Typography>
        </Flex>
      </Flex>
      <Flex gap={"0.03rem"}>
        <Typography color={"#00000080"} fontSize={"0.14rem"}>By</Typography>
        <Typography color={"#FF490F"} fontSize={"0.14rem"}>{offerInfo.maker.replace(offerInfo.maker.substring(5, 38), '...')}</Typography>
        <Typography color={"#00000080"} fontSize={"0.14rem"}>{offerInfo.createdTime()}</Typography>
      </Flex>
    </Flex>
    {/* Expires */}
    <Typography
      textAlign={"left"}
      fontSize={"0.14rem"}
      fontWeight={500}
      color={"#000"}
    >Expires {offerInfo.ExpiresTime()}</Typography>
    <Flex flex={1}></Flex>
    <ButtonDefault disabled={offerInfo.price.gt(wethBalance)} minWidth="1.5rem" height="0.45rem" types="normal" onClick={() => {
      setShowOffer(OfferModal.OFFER)
      setAcceptOffer(offerInfo)
    }}>Accept Offer</ButtonDefault>
  </Flex>
}