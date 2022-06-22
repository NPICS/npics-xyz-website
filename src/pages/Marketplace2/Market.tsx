import {Box, Flex, Grid, Typography} from "../../component/Box";
import styled from "styled-components";
import {space, typography, layout, TypographyProps} from "styled-system";
import {useEffect, useState} from "react";
import http from "../../utils/http";
import {deserializeArray} from "class-transformer";
import {Collections} from "../../model/user";
import {Outlet, useNavigate} from "react-router-dom";

const Banner = () => {
    return <Box
        position={"absolute"}
        height={"4.6rem"}
        top={0}
        left={0}
        right={0}
        zIndex={0}
        backgroundImage={`url(${"https://tva1.sinaimg.cn/large/e6c9d24egy1h3g0c8ugwqj20v50jhgrr.jpg"})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
    ></Box>
}

const CollectionItem = styled.div<{
    isSelected?: boolean,
    imgUrl?: string
}>`
  display: block;
  width: .5rem;
  height: .5rem;
  background: transparent url(${(props) => props.imgUrl}) no-repeat center;
  background-size: cover;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 0 ${(props) => props.isSelected ? `3px` : `0`} #fff;
`

export default function Market() {
    const [listData, setListData] = useState<Collections[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined)
    let nav = useNavigate()

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
        if (listData.length > 0 && !selectedIndex) {
            setSelectedIndex(0)
        }
    }, [listData])

    useEffect(() => {
        if (selectedIndex != undefined && selectedIndex >= 0) {
            let nft = listData[selectedIndex].address
            nav(`collections/${nft}`, {
                state: {
                    item: listData[selectedIndex]
                }
            })
        }
    }, [selectedIndex])

    return <Flex
        position={"relative"}
        flexDirection={"column"}
        padding={"0 160px"}
        background={"transparent"}>
        <Banner/>
        <Box zIndex={1}>
            <Box marginTop={"120px"}>
                <Typography
                    color={"#fff"}
                    fontSize={"30px"}
                    fontWeight={"800"}>
                    Collection
                </Typography>
            </Box>
            <Flex
                flexDirection={"row"}
                alignItems={"stretch"}
                gap={".26rem"}
                marginTop={".35rem"}>
                {
                    listData.map((item, idx) => {
                        return <CollectionItem
                            key={idx}
                            isSelected={selectedIndex === idx}
                            imgUrl={item.imageUrl}
                            onClick={() => {
                                setSelectedIndex(idx)
                            }}
                        />
                    })
                }
            </Flex>
            <Box
                marginTop={".4rem"}
                minHeight={"50vh"}
            >
                <Outlet/>
            </Box>
        </Box>
    </Flex>
}