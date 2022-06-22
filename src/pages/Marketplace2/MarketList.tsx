import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import {layout, space, typography, TypographyProps, color} from "styled-system"
import CollectionCell from "./CollectionCell";
import LooseIcon from "../../assets/images/market/Frame 33.png"
import CompactIcon from "../../assets/images/market/Frame 34.png"
import {CollectionItems, Collections} from "../../model/user";
import {deserializeArray, deserialize} from "class-transformer";
import {imgurl} from "../../utils/globalimport";

const Portrait = styled.img`
  display: block;
  object-fit: cover;
  border-radius: .1rem;
  background: #e5e5e5;
  overflow: hidden;
  width: 1.46rem;
  height: 1.46rem;
`

export default function MarketList() {
    let location = useLocation()
    const [nft, setNft] = useState<Collections>()
    const [compactMode, setCompactMode] = useState<boolean>(false)

    useEffect(() => {
        let state: any = location.state
        let nft = deserialize(Collections, JSON.stringify(state.item))
        setNft(nft)
    }, [location.state])

    useEffect(() => {

    }, [nft])

    return <Box>
        <Box
            borderRadius={".1rem"}
            background={"#fff"}
            padding={".4rem"}>
            <Flex>
                <Portrait src={nft?.imageUrl}/>
                <Flex
                    marginLeft={".24rem"}
                    flexDirection={"column"}
                    gap={".08rem"}
                    flex={1}
                    justifyContent={"center"}
                >
                    <Typography
                        fontWeight={800}
                        fontSize={".46rem"}
                        lineHeight={".56rem"}
                        color={"#000"}
                    >{nft?.name}</Typography>
                    <Typography
                        fontWeight={"500"}
                        fontSize={".14rem"}
                        lineHeight={".17rem"}
                        color={"rgba(0, 0, 0, .5)"}
                        textAlign={"justify"}
                    >
                        {nft?.description}
                    </Typography>
                </Flex>
            </Flex>
            <Flex
                marginTop={".16rem"}
                flexDirection={"row"}
                gap={".1rem"}
                alignItems={"stretch"}
            >
                <Flex
                    flexDirection={"column"}
                    alignItems={"center"}
                    boxShadow={"0 0 10px rgba(0,0,0,.1)"}
                    borderRadius={".1rem"}
                    padding={".12rem .2rem"}
                    gap={".05rem"}
                    minWidth={"1.36rem"}>
                    <Flex alignItems={"center"} gap={".06rem"}>
                        <Icon width={".12rem"} height={".16rem"} url={imgurl.market.blackPrice}/>
                        <Typography fontSize={".2rem"} color={"#000"}>{nft?.floorPrice.toFixed()}</Typography>
                    </Flex>
                    <Flex alignItems={"center"} gap={".1rem"}>
                        <Typography fontSize={".14rem"} color={"#000"}>Floor</Typography>
                        <Typography
                            fontSize={".14rem"}
                            color={nft?.dayChange.toNumber() ?? 0 > 0 ? `#18CF15` : `#FF4949`}
                        >{`${nft && (nft.dayChange.toNumber() * 100).toFixed(2)}%`}</Typography>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection={"column"}
                    alignItems={"center"}
                    boxShadow={"0 0 10px rgba(0,0,0,.1)"}
                    borderRadius={".1rem"}
                    padding={".12rem .2rem"}
                    gap={".05rem"}
                    minWidth={"1.36rem"}>
                    <Flex alignItems={"center"} gap={".06rem"}>
                        <Icon width={".12rem"} height={".16rem"} url={imgurl.market.blackPrice}/>
                        <Typography fontSize={".2rem"} color={"#000"}>{nft?.floorPrice.toFixed()}</Typography>
                    </Flex>
                    <Flex alignItems={"center"} gap={".1rem"}>
                        <Typography fontSize={".14rem"} color={"#000"}>24h</Typography>
                        <Typography>{nft?.dayChange.toFixed()}</Typography>
                    </Flex>
                </Flex>
                <Flex
                    flexDirection={"column"}
                    alignItems={"center"}
                    boxShadow={"0 0 10px rgba(0,0,0,.1)"}
                    borderRadius={".1rem"}
                    padding={".12rem .2rem"}
                    gap={".05rem"}
                    minWidth={"1.36rem"}>
                    <Typography fontSize={".2rem"} color={"#000"} fontWeight={"500"}>{nft?.totalShelves}</Typography>
                    <Typography>Total</Typography>
                </Flex>
                <Flex
                    flexDirection={"column"}
                    alignItems={"center"}
                    boxShadow={"0 0 10px rgba(0,0,0,.1)"}
                    borderRadius={".1rem"}
                    padding={".12rem .2rem"}
                    gap={".05rem"}
                    minWidth={"1.36rem"}>
                    <Typography fontSize={".2rem"} color={"#000"} fontWeight={500}>{nft?.activeCollaterals}</Typography>
                    <Typography>Listed Items</Typography>
                </Flex>
            </Flex>
        </Box>
        <Box
            borderRadius={".1rem"}
            background={"#fff"}
            padding={".4rem"}
            marginTop={".1rem"}>
            <Flex height={".5rem"} gap={".12rem"}>
                Search Input
                <Flex flexDirection={"row"} alignItems={"center"} gap={".2rem"}>
                    <Icon height={".24rem"} width={".24rem"} url={LooseIcon} onClick={() => setCompactMode(false)}/>
                    <Icon height={".24rem"} width={".24rem"} url={CompactIcon} onClick={() => setCompactMode(true)}/>
                </Flex>
            </Flex>
            <Grid
                marginTop={".25rem"}
                gridTemplateColumns={`repeat(${compactMode ? 8 : 6}, 1fr)`}
                gridGap={".1rem"}
                justifyContent={"space-between"}
                alignItems={"start"}
            >
                {
                    new Array(30).fill(0).map((item, index) => {
                        return <CollectionCell/>
                    })
                }
            </Grid>
        </Box>
    </Box>
}