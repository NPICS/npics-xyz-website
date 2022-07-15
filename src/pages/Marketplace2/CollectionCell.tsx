import {Box, Flex, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {imgurl} from "../../utils/globalimport";
import {CollectionItems} from "../../model/user";
import CellTagIcon from "../../assets/images/market_cell_tags.svg"
import {useNavigate} from 'react-router-dom';
import BigNumber from "bignumber.js";
import ethIcon from "../../assets/images/market/eth_icon_10x15.svg"
import unselectedEthIcon from "../../assets/images/market/unselect_eth.svg"

const Cover = styled.img`
  display: block;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #e5e5e5;
`

const ImageContainer = styled.div`
  padding: 50% 0;
  position: relative;
`

const IconTest = styled.img`
  display: block;
  width: 0.22rem;
  height: 0.22rem;
  border-radius: 0.11rem;
  user-select: none;
`

const SVGIcon = styled(Icon)`
  svg {
    path {
      fill: red;  
    }
  }
`

const NoWarpTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ShadowBox = styled(Flex)`
  &:hover {
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.2);
    transition: all .2s;
  }
`

export default function CollectionCell(props: {
    compact: boolean,
    item: CollectionItems
}) {
    const navigate = useNavigate()

    function ScrollTop():void {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.scrollTo(0, 0)
    }

    return <ShadowBox
        borderRadius={'0.1rem'}
        // border={"0.01rem solid rgba(0,0,0,.1)"}
        boxShadow="0 0 0.2rem rgba(0, 0, 0, 0.1)"
        overflow={"hidden"}
        flexDirection={"column"}
        alignItems={"stretch"}
        position={"relative"}
        style={{
            "cursor": "pointer"
        }}
        onClick={() => {
            navigate(`/nft/${props.item.address}/${props.item.tokenId}`)
            ScrollTop()
        }}
    >
        {/*<Cover src={props.item.imageUrl}/>*/}
      <ImageContainer>
        <Cover src={props.item.imageUrl}/>
      </ImageContainer>
        {/* tag */}
        <Flex
            flexDirection={"row"}
            padding={"0.01rem 0.06rem"}
            borderRadius={"0.1rem"}
            boxShadow="0rem 0rem 0.1rem rgba(0, 0, 0, 0.1)"
            background={"rgba(255,255,255,.5)"}
            alignItems={"center"}
            gap={"0.04rem"}
            position={"absolute"}
            top={"0.08rem"}
            left={"0.08rem"}
            zIndex={"1"}
            hidden={props.item.rarityScore <= 0}>
            {/*<Icon height={"0.2rem"} width={"0.2rem"} src={CellTagIcon}/>*/}
            <Typography
                color={"rgba(0,0,0,.6)"}
                fontSize={props.compact ? "0.12rem" : "0.12rem"}
                fontWeight={600}
            >{`#${props.item.rarityScore}`}</Typography>
        </Flex>
        <Box padding={"0.11rem 0.15rem 0.18rem"}>
            <Flex alignItems={"center"} gap={props.item.nftName() ? `0.06rem` : `0`}>
                <NoWarpTypography fontWeight={500} fontSize={"0.14rem"}
                    color={"rgba(0,0,0,.5)"}>{
                  // props.item.nftName() && props.item.nftName().length > 10 ? props.item.nftName()?.replace(props.item.singularForName().substring(10), '...') : props.item.nftName()
                  // props.item && `${props.item.nftName()}`
                  props.item.name && props.item.name.length > 0 ? props.item.name : `${props.item.tokenId}`
                }</NoWarpTypography>
                {/*<Typography*/}
                {/*  fontWeight={500}*/}
                {/*  fontSize={"0.14rem"}*/}
                {/*  color={"rgba(0,0,0,.5)"}*/}
                {/*>*/}
                {/*    {props.item.name ?? `${props.item.isNoName() ? "" : " #"}${props.item.tokenId}`}*/}
                {/*</Typography>*/}
            </Flex>
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={"0.06rem"}
                marginTop={"0.12rem"}
            >
                <NoWarpTypography fontWeight={'500'} hidden={props.compact}>Down Payment</NoWarpTypography>
                <Flex
                    alignItems={"center"}
                    gap={"0.06rem"}>
                    <Icon height={"0.15rem"} width={"0.1rem"} src={ethIcon}/>
                    <Typography fontWeight={'700'}>{props.item.downPaymentPriceFormat()}</Typography>
                </Flex>

            </Flex>
          <Box
            height={"0.01rem"}
            background={"#0000001a"}
            margin={"0.12rem 0"}
          ></Box>
          <Flex alignItems={"center"} gap={"0.06rem"}>
            <IconTest src={props.item.marketIcon()} alt=""/>
            <NoWarpTypography
              color={"#00000080"}
              fontSize={"0.14rem"}
              fontWeight={500}
            >{props.item.marketDisplay()}</NoWarpTypography>
            <Flex flex={1}></Flex>
            <Icon style={{
              "flexShrink": 0
            }} src={unselectedEthIcon} width={"0.1rem"} height={"0.15rem"}></Icon>
            <Typography
              color={"#00000080"}
              fontSize={"0.14rem"}
              fontWeight={500}
            >{props.item.basePrice()}</Typography>
          </Flex>
        </Box>

    </ShadowBox>
}