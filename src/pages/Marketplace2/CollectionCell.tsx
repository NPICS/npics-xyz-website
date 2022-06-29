import {Box, Flex, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {imgurl} from "../../utils/globalimport";
import {CollectionItems} from "../../model/user";
import CellTagIcon from "../../assets/images/market_cell_tags.svg"
import {useNavigate} from 'react-router-dom';
import BigNumber from "bignumber.js";
import ethIcon from "../../assets/images/market/eth_icon_10x15.svg"

const Cover = styled.img`
  display: block;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
  /* background: #e5e5e5; */
`

const IconTest = styled.img`
  display: block;
  width: .22rem;
  height: .22rem;
  user-select: none;
`

const NoWarpTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

    return <Flex
        borderRadius={'.1rem'}
        border={"1px solid rgba(0,0,0,.1)"}
        overflow={"hidden"}
        flexDirection={"column"}
        position={"relative"}
        style={{
            "cursor": "pointer"
        }}
        onClick={() => {
            navigate(`/nft/${props.item.address}/${props.item.tokenId}`)
            ScrollTop()
        }}
    >
        <Cover src={props.item.imageUrl}/>
        {/* tag */}
        <Flex
            flexDirection={"row"}
            padding={".01rem .05rem"}
            borderRadius={".04rem"}
            background={"#fff"}
            alignItems={"center"}
            gap={".04rem"}
            position={"absolute"}
            top={".08rem"}
            left={".08rem"}
            zIndex={"1"}
            hidden={props.item.rarityScore <= 0}>
            <Icon height={".2rem"} width={".2rem"} src={CellTagIcon}/>
            <Typography
                color={"#000"}
                fontSize={".16rem"}
                fontWeight={"500"}
            >{props.item.rarityScore}</Typography>
        </Flex>
        <Box padding={".07rem .15rem .18rem"}>
            <Flex alignItems={"center"} gap={".06rem"}>
                <NoWarpTypography fontWeight={500} fontSize={".14rem"}
                                  color={"rgba(0,0,0,.5)"}>{props.item.collectionName}</NoWarpTypography>
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
                {/* <Flex flex={1}></Flex> */}
                <IconTest src={props.item.marketIcon()} alt=""/>
                {/*<Icon width={".22rem"} height={".22rem"} url={props.item.marketIcon()} />*/}
            </Flex>
        </Box>

    </Flex>
}