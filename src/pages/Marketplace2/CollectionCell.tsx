import {Box, Flex, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {imgurl} from "../../utils/globalimport";
import {CollectionItems} from "../../model/user";
import CellTagIcon from "../../assets/images/market_cell_tags.png"

const Cover = styled.img`
  display: block;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
  background: #e5e5e5;
`

const NoWarpTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

interface ICollectionCellProps {
    compact: boolean,
    item: CollectionItems
}

export default function CollectionCell(props: ICollectionCellProps) {
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
            zIndex={"1"}>
            <Icon height={".2rem"} width={".2rem"} url={CellTagIcon}/>
            <Typography
                color={"#000"}
                fontSize={".16rem"}
                fontWeight={"500"}
            >256</Typography>
        </Flex>
        <Box padding={".07rem .15rem .18rem"}>
            <Flex alignItems={"center"} gap={".06rem"}>
                <NoWarpTypography fontWeight={500} fontSize={".14rem"}
                                  color={"rgba(0,0,0,.5)"}>{props.item.collectionName}</NoWarpTypography>
                <Typography fontWeight={500} fontSize={".14rem"}
                            color={"rgba(0,0,0,.5)"}>{`#${props.item.tokenId}`}</Typography>
            </Flex>
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={".06rem"}>
                <NoWarpTypography display={props.compact ? `none` : `block`}>Down Payment</NoWarpTypography>
                <Flex
                    alignItems={"center"}
                    gap={".06rem"}>
                    <Icon height={"15px"} width={"15px"} url={imgurl.market.collect2}/>
                    <Typography>89.90</Typography>
                </Flex>
            </Flex>
        </Box>

    </Flex>
}