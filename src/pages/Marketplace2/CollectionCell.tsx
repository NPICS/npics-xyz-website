import {Box, Flex, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {imgurl} from "../../utils/globalimport";

const Cover = styled.img`
  display: block;
  width: 100%;
  overflow: hidden;
`

interface ICollectionCellProps {
    compact: boolean
}

export default function CollectionCell() {
    return <Flex
        borderRadius={'.1rem'}
        border={"1px solid rgba(0,0,0,.1)"}
        overflow={"hidden"}
        flexDirection={"column"}
        position={"relative"}
    >
        <Cover src={"https://tva1.sinaimg.cn/large/e6c9d24egy1h3g3k3kx7lj20e80e8q3j.jpg"}/>
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
            <Icon height={".2rem"} width={".2rem"} url={imgurl.market.collect2}/>
            <Typography
                color={"#000"}
                fontSize={".16rem"}
                fontWeight={"500"}
            >256</Typography>
        </Flex>
        <Box padding={".07rem .15rem .18rem"}>
            <Typography
                fontWeight={"500"}
                fontSize={".14rem"}
                color={"rgba(0,0,0,.5)"}>
                BoredApeYac... #2532
            </Typography>
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={".06rem"}>
                <Typography>Down Payment</Typography>
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