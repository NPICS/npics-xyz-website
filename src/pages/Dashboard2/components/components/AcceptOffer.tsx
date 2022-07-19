import React, { useState, useEffect } from 'react'
import Modal from "../../../../component/Modal";
import {Box, Flex, Grid, Icon, Typography} from "../../../../component/Box";
import {CancelButton, ConfirmButton, PopupTitle} from "../../../Marketplace2/NFTPay";
import validIcon from "../../../../assets/images/market/nfts_opensea_valid.svg"
import wethIcon from "../../../../assets/images/market/weth_icon.svg"
import { OfferModal } from "./TableWarehouse";
import { Offers } from "model/offers";
import { DataSource2 } from "./StyledInterface";
import BigNumber from "bignumber.js";
import { thousandFormat } from "utils/urls";
import { useAppSelector } from "store/hooks";
import { useAsync } from 'react-use';
import { ContractAddresses } from 'utils/addresses';
import { useERC721Contract, useNpicsContract } from 'hooks/useContract';
import { notification } from 'antd';
import http from 'utils/http';
import { useERC20Contract } from '../../../../hooks/useContract';
interface IProps {
  showOffer: OfferModal
  nftInfo: DataSource2 | undefined
  accpetOffer: Offers | undefined
  setShowOffer:React.Dispatch<React.SetStateAction<OfferModal>>
}

export default function AcceptOffer(props:IProps) {
  const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
  const {showOffer, accpetOffer, nftInfo, setShowOffer} = props
  const [accept,setAccept] = useState<boolean>(false)
  // const erc721 = useERC721Contract(nftInfo?.nftAddress as string)
  const npics = useNpicsContract()
  const nft = useERC721Contract(nftInfo?.nftAddress as string)
  useAsync(async () => {
    if (!nftInfo || !accpetOffer || !npics) return
    try {
      setShowOffer(OfferModal.PROGRESSING)
      // await erc721?.approve(approveTo,nftInfo.tokenId)
      const nbpAddress = await npics.getNbpFor(nftInfo.nftAddress, nftInfo.tokenId)
      const owner = await nft?.ownerOf(nftInfo.tokenId)
      console.log(`owner => ${owner}`) 
      console.log(`nbpAddress => ${nbpAddress}`)
      const parameter = {
        "caller": owner,
        "op": 2,
        "amountToEth": "0",
        "amountToWeth": "0",
        "items": [
          {
            "orderId": accpetOffer.id,
            "currency": ContractAddresses.WETH,
            "price": accpetOffer.price,
            "tokenId": nftInfo.tokenId
          }
        ]
      }

      let BytesData: any = await http.myPost(`/npics-nft/app-api/v2/neo/getOfferInput`,parameter)
      BytesData = BytesData.data
      const _owner = owner?.replace('0x','').toLocaleLowerCase()
      const _nbpAddress = nbpAddress?.replace('0x','')

      const _BytesData = BytesData.replace('0x','0x357a150b')
      const __BytesData = _BytesData.replace(`${_owner}`,`${_nbpAddress}`)
      console.log(`_owner => ${_owner}`)
      console.log(`_nbpAddress => ${_nbpAddress}`)
      console.log(`__BytesData => ${__BytesData}`)
      const acceptOrder = await npics.acceptOrder(
        nftInfo.nftAddress,
        nftInfo.tokenId,
        ContractAddresses.x2y2Market,
        __BytesData,
        ContractAddresses.x2y2Market
      )
      console.log(`acceptOrder => ${acceptOrder}`)
      setShowOffer(OfferModal.NONE)
      notification.success({ message: "Your vault has accepted the offer successfully."})
    } catch (e:any) {
      console.log(JSON.parse(JSON.stringify(e)))
      setShowOffer(OfferModal.NONE)
      notification.error({ message: "Your vault accept the offer failed."})
    }

  },[accept])
  

  return <Modal isOpen={showOffer === OfferModal.OFFER}>
    <Box
      minWidth={"8.8rem"}
      background={`#fff`}
      borderRadius={`0.2rem`}
      padding={`0.4rem`}
    >
      <PopupTitle title={"Accept Offec"} canClose={false}/>
      <Grid
        marginTop={`0.3rem`}
        padding={`0.2rem 0.25rem`}
        borderRadius={`0.1rem`}
        border={`0.01rem solid #0000001A`}
        gridTemplateRows={"3.06rem auto"}
        gridTemplateColumns={`3.06rem auto`}
        gridTemplateAreas={`
          "img price"
          "receive receive"
        `}
        gridGap={`0.14rem`}
      >
        <Grid gridArea={`img`} borderRadius={"0.06rem"} background={`#eee`} overflow={"hidden"}>
          <Icon width={"100%"} height={"100%"} src={nftInfo?.imageUrl}></Icon>
        </Grid>
        <Grid gridArea={`price`}>
          {/* Name and price */}
          <Flex flexDirection={`column`} alignItems={`stretch`}>
            <Flex gap={`0.06rem`} alignItems={`center`}>
              <Typography
                color={`#000`}
                fontSize={`0.14rem`}
                fontWeight={500}
              >{nftInfo && nftInfo.collectionName}</Typography>
              <Icon src={validIcon} width={`0.12rem`} height={`0.12rem`}></Icon>
            </Flex>
            <Typography
              marginTop={`0.06rem`}
              fontWeight={700}
              fontSize={`0.2rem`}
              color={`#000`}
            >{nftInfo && `${nftInfo.singularForName()} #${nftInfo.tokenId}`}</Typography>
            {/* Offer */}
            <Flex
              marginTop={`0.1rem`}
              border={`0.01rem solid #0000001A`}
              flex={1}
              borderRadius={`0.1rem`}
              flexDirection={`column`}
              alignItems={`stretch`}
              background={`#F6F6F6`}
              overflow={`hidden`}
            >
              <Flex flex={1} borderBottom={`0.01rem solid #0000001A`} background={`#fff`}>
                <OfferCell title={`Offer`} titleColor={`#000`} symbolIcon={true} symbolOrVal={`${accpetOffer?.OfferPriceDisplay()}`}/>
              </Flex>
              <OfferCell title={`Vault Debt`} symbolIcon={true} symbolOrVal={`${nftInfo?.debtString()}`}/>
              <OfferCell title={`X2Y2 Fee`} symbolIcon={false} symbolOrVal={`0.5%`}/>
              <OfferCell title={`Marker Fee`} symbolIcon={false} symbolOrVal={`2%`}/>
              <OfferCell title={`Creator Royalty`} symbolIcon={false} symbolOrVal={`5%`}/>
            </Flex>
          </Flex>
        </Grid>
        <Grid gridArea={`receive`}>
          <Flex
            background={`#7BD742`}
            borderRadius={`0.1rem`}
            padding={`0.3rem 0.4rem`}
            alignItems={`center`}
            justifyContent={`space-between`}
            style={{
              cursor: `pointer`,
              userSelect: `none`
            }}
          >
            <Typography
              color={`#000`}
              fontSize={`0.2rem`}
              fontWeight={700}
            >You Receive</Typography>
            <Flex flexDirection={`row`} gap={`0.06rem`} alignItems={`center`}>
              <Icon src={wethIcon}></Icon>
              <Typography
                color={`#000`}
                fontSize={`0.2rem`}
                fontWeight={700}
              >
                {
                  nftInfo && accpetOffer &&
                  accpetOffer.price.minus(nftInfo.totalDebt).minus(new BigNumber('0.055').times(accpetOffer.price)).div(10 ** 18).toFixed(2,1)
                }
              </Typography>
              <Typography
                color={`rgba(0, 0, 0, .5)`}
                fontSize={`0.16rem`}
                fontWeight={500}
                marginLeft={`0.04rem`}
              >
                {
                  nftInfo && accpetOffer &&
                  `(${thousandFormat(accpetOffer.price.minus(nftInfo.totalDebt).minus(new BigNumber('0.055').times(accpetOffer.price)).times(ethRate).div(10 ** 18).toFixed(2,1))})`
                }
              </Typography>
            </Flex>
          </Flex>
        </Grid>
      </Grid>
      {/* buttons */}
      <Flex alignItems={"center"} justifyContent={"center"} gap={"0.2rem"} marginTop={"0.3rem"}>
        <CancelButton
          onClick={async () => {
            props.setShowOffer(OfferModal.NONE)
          }}>Cancel</CancelButton>
        <ConfirmButton
          onClick={() => {
            setAccept(!accept)
          }}
        >Accept Offer</ConfirmButton>
      </Flex>
    </Box>
  </Modal>
}

function OfferCell(props: {
  title: string,
  titleColor?: string
  symbolIcon: boolean
  symbolOrVal?: string | number
}) {
  return <Flex
    flex={1}
    alignItems={`center`}
    justifyContent={`space-between`}
    padding={`0 0.3rem`}
  >
    <Typography
      color={props.titleColor ?? `rgba(0, 0, 0, .5)`}
      fontSize={`0.14rem`}
      fontWeight={500}
    >{props.title}</Typography>
    <Flex alignItems={`center`} gap={`0.06rem`}>
      <Icon src={wethIcon} width={`0.1rem`} height={`0.15rem`} hidden={!props.symbolIcon}/>
      <Typography
        fontSize={`0.14rem`}
        color={`#000`}
        fontWeight={500}
      >{props.symbolOrVal ?? `-`}</Typography>
    </Flex>
  </Flex>
}