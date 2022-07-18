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
  useAsync(async () => {
    if (!nftInfo || !accpetOffer || !npics) return
    try {
      setShowOffer(OfferModal.PROGRESSING)
      // await erc721?.approve(approveTo,nftInfo.tokenId)
      const nbpAddress = await npics.getNbpFor(nftInfo.nftAddress, nftInfo.tokenId)
      
      console.log(`nbpAddress => ${nbpAddress}`)
      const parameter = {
        "caller": nbpAddress,
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

      let data: any = await http.myPost(`/npics-nft/app-api/v2/neo/getOfferInput`,parameter)
      console.log(`BytesData => ${data}`)
      // data = '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000001541085ea92460000000000000000000000000000000000000000000000000000000062d177f700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f26d94d535107a5e0c5a24f6ce3edcc8352f01e200000000000000000000000000000000000000000000000000000000000000005b98e8ebfc849f7934dfdbd7350d666ace1b858abc20d6623ad28c9ab0b4e4ea49a53854d0777a20a1427a246c8c82324438d00731fdc462c00f588f9302f9a3000000000000000000000000000000000000000000000000000000000000001b000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000041321217c32f77b82f2cfcc76079fcbf000000000000000000000000b4debf1547c4df92ccf15ae0c70a61ae6e5f002d0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000062d123be000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000002401e46ee4d2aabea47437f2fee462a7c34f5f244050de201bf51e8443bafa4b8ab7d29a60b6db3bb744ba767240d04275ba1b36ffddbde9a88d56ce68c67ee4c84000000000000000000000000000000000000000000000000000000000000001b000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000007021ed30b927fc180000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ed5af388653567af2f388e6224dc7c4b3241c5440000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007021ed30b927fc18dd2a0a74a875ccd1174679338623859f6983b0fbc728dce97a29cfe604d37371000000000000000000000000f849de01b080adc3a814fabe1e2087475cf2e35400000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ed5af388653567af2f388e6224dc7c4b3241c5440000000000000000000000000000000000000000000000000000000000001b4400000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000001388000000000000000000000000d823c605807cc5e6bd6fc0d7e4eea50d3e2d66cd000000000000000000000000000000000000000000000000000000000000c350000000000000000000000000b4d24dacbdffa1bbf9a624044484b3feeb7fdf74'
      data.replace('0x','0x357a150b')
      const acceptOrder = await npics.acceptOrder(
        nftInfo.nftAddress,
        nftInfo.tokenId,
        ContractAddresses.x2y2Market,
        data,
        nbpAddress
      )
      console.log(`acceptOrder => ${acceptOrder}`)
      notification.success({ message: "Your vault has accepted the offer successfully."})
      setShowOffer(OfferModal.NONE)
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