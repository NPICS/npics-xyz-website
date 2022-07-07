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
  width: .22rem;
  height: .22rem;
  border-radius: .11rem;
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
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
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
        borderRadius={'.1rem'}
        // border={"1px solid rgba(0,0,0,.1)"}
        boxShadow="0 0 20px rgba(0, 0, 0, 0.1)"
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
            padding={".01rem .06rem"}
            borderRadius={"10px"}
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
            background={"rgba(255,255,255,.5)"}
            alignItems={"center"}
            gap={".04rem"}
            position={"absolute"}
            top={".08rem"}
            left={".08rem"}
            zIndex={"1"}
            hidden={props.item.rarityScore <= 0}>
            {/*<Icon height={".2rem"} width={".2rem"} src={CellTagIcon}/>*/}
            <Typography
                color={"rgba(0,0,0,.6)"}
                fontSize={props.compact ? ".14rem" : ".16rem"}
                fontWeight={"500"}
            >{`#${props.item.rarityScore}`}</Typography>
        </Flex>
        <Box padding={".07rem .15rem .18rem"}>
            <Flex alignItems={"center"} gap={".06rem"}>
                <NoWarpTypography fontWeight={500} fontSize={".14rem"}
                    color={"rgba(0,0,0,.5)"}>{props.item.singularForName().length > 10 ? props.item.singularForName().replace(props.item.singularForName().substring(10), '...') : props.item.singularForName()}</NoWarpTypography>
                <Typography fontWeight={500}
                    fontSize={".14rem"}
                    color={"rgba(0,0,0,.5)"}>
                    {`#${props.item.tokenId}`}</Typography>
            </Flex>
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={".06rem"}
                marginTop={".1rem"}
            >
                <NoWarpTypography fontWeight={'500'} hidden={props.compact}>Down Payment</NoWarpTypography>
                <Flex
                    alignItems={"center"}
                    gap={".06rem"}>
                    <Icon height={".15rem"} width={".1rem"} src={ethIcon}/>
                    <Typography fontWeight={'700'}>{props.item.downPaymentPriceFormat()}</Typography>
                </Flex>

            </Flex>
          <Box
            height={"1px"}
            background={"#0000001a"}
            margin={".12rem 0"}
          ></Box>
          <Flex alignItems={"center"} gap={".06rem"}>
            <IconTest src={props.item.marketIcon()} alt=""/>
            <NoWarpTypography
              color={"#00000080"}
              fontSize={".14rem"}
              fontWeight={500}
            >{props.item.marketDisplay()}</NoWarpTypography>
            <Flex flex={1}></Flex>
            <Icon style={{
              "flexShrink": 0
            }} src={unselectedEthIcon} width={".1rem"} height={".15rem"}></Icon>
            <Typography
              color={"#00000080"}
              fontSize={".14rem"}
              fontWeight={500}
            >{props.item.basePrice()}</Typography>
          </Flex>
        </Box>

    </ShadowBox>
}