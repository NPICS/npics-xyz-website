import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import tipsIcon from "../../assets/images/market/exclamation_point.png"
import ethIcon from "../../assets/images/market/eth_icon_20x34.png"
import {CollectionDetail, CollectionItems} from "../../model/user";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import BigNumber from "bignumber.js";
import {numberFormat} from "../../utils/urls";
import {useEffect, useState} from "react";
import {updateARP} from "../../store/app";
import {percentageFormat} from "../marketplace/components/utils";
import http from "../../utils/http";
import {deserializeArray} from "class-transformer";
import {Npics} from "../../abi/Npics";
import {ethers} from "ethers";
import Modal from "../../component/Modal";
import NFTPay from "./NFTPay";
import {Popover} from "antd";
import { globalConstant } from "utils/globalConstant";
import { useNavigate } from 'react-router-dom';
import {useWeb3React} from "@web3-react/core";
import {connectors} from "../../utils/connectors";
import { listedPricePop, VaultAprPop, DownPaymentPop } from "utils/popover";

const Shadow = styled(Flex)`
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: .1rem;
  width: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .13rem;
  position: relative;
`

const TipsIcon = styled(Icon)`
  position: absolute;
  top: .14rem;
  right: .14rem;
`

const BuyBox = styled(Flex)`
  box-sizing: border-box;
  background: #00000008;
  border: 1px solid #00000033;
  border-radius: .1rem;
  padding: .2rem 0 0 .4rem;
  position: relative;
`

const BuyButton = styled.button`
  border: 0;
  cursor: pointer;
  background: #000;
  color: #fff;
  font-weight: 700;
  font-size: .2rem;
  min-width: 3.9rem;
  height: .82rem;
  border-radius: .1rem;
  margin-top: .21rem;
`

const OtherNFT = styled.img`
  display: block;
  overflow: hidden;
  cursor: pointer;
  height: 100%;
  border-radius: .1rem;
  border: 1px solid #eee;
  position: relative;
`

function MoreNFT(props: {
    img: string,
    total?: number,
    tap?(): void
}) {
    return <Box position={"relative"}
                borderRadius={".1rem"}
                overflow={"hidden"}
                width={"1rem"}
                style={{
                    "cursor": "pointer"
                }}
                onClick={props.tap}
    >
        <OtherNFT src={props.img}/>
        <Flex
            background={"#000000CC"}
            position={"absolute"} top={0} left={0} bottom={0} right={0}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Typography
                lineHeight={"1.5"}
                color={"#fff"}
                fontWeight={500}
                fontSize={".16rem"}
            >
                {props.total}<br/>Items
            </Typography>
        </Flex>
    </Box>
}

export default function NFTPrice(props: {
    item?: CollectionDetail
}) {
    const action = useAppDispatch()
    const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
    const vaultAPR = useAppSelector(state => (state.app.rewardsAPR ?? 0) - (state.app.interestAPR ?? 0) / 100)
    const state = useAppSelector(state => state.app)
    console.log('first',state)
    const [recommendNFTs, setRecommendNFTs] = useState<CollectionItems[]>([]) // max is 6
    const [recommendNFTTotal, setRecommendNFTTotal] = useState<number | undefined>(undefined)
    const [availableBorrow, setAvailableBorrow] = useState<BigNumber | undefined>(undefined)
    const [actualAmount, setActualAmount] = useState<BigNumber | undefined>(undefined)
    const navigate = useNavigate()
    const {account, activate} = useWeb3React()

    const [buyPopOpen, setBuyPopOpen] = useState<boolean>(false)

    useEffect(() => {
        action(updateARP())
    }, [props.item])

    useEffect(() => {
        const inner = async () => {
            // get recommends
            let resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/getCollectionItems`, {
                address: props.item?.address,
                direction: "asc",
                pageIndex: 1,
                pageSize: 6,
                search: null,
                showNftx: globalConstant.showNftx
            })
            if (resp.code === 200 && resp.data.records) {
                setRecommendNFTs(deserializeArray(CollectionItems, JSON.stringify(resp.data.records)))
                setRecommendNFTTotal(resp.data.total)
            } else {
            }
            // get availableBorrow
            let contract = new Npics(ethers.getDefaultProvider())
            const availableBorrow = await contract.getAvailableBorrowsln(props.item?.address ?? "")
            setAvailableBorrow(availableBorrow)
        }
        if (props.item) {
            inner().finally()
        }
    }, [props.item])

    useEffect(() => {
        let _item = props.item
        if (_item && availableBorrow) {
            setActualAmount(_item.currentBasePrice.minus(availableBorrow))
        }
    }, [props.item, availableBorrow])

    async function buyClick() {
        try {
            if (!account) {
                await activate(connectors.injected)
            }
            if (props.item && availableBorrow) {
                setBuyPopOpen(true)
            }
        } catch (e) {

        }
    }

    return <Grid gridTemplateRows={"1.1rem 1rem auto"} gridRowGap={".12rem"}>
        <Modal isOpen={buyPopOpen} onRequestClose={() => setBuyPopOpen(false)}>
            <NFTPay
                /// line 150: require value
                nft={props.item!}
                availableBorrow={availableBorrow!}
                actualAmount={actualAmount!}
                dismiss={() => setBuyPopOpen(false)}
            />
        </Modal>
        <Flex gap={".1rem"}>
            {/* Price */}
            <Shadow>
                <Popover content={listedPricePop}>
                    <TipsIcon width={".14rem"} src={tipsIcon}/>
                </Popover>

                <Flex flexDirection={"row"} alignItems={"end"}>
                    <Icon width={".12rem"} height={".1898rem"} src={ethIcon}/>
                    <Typography
                        fontSize={".24rem"}
                        fontWeight={700}
                        color={"rgba(0,0,0,1)"}
                        lineHeight={"100%"}
                        // verticalAlign={"middle"}
                        // height={"auto"}
                        marginLeft={".1rem"}
                    >{props.item?.basePriceFormat() ?? "---"}</Typography>
                    <Typography
                        fontSize={".14rem"}
                        fontWeight={500}
                        color={"rgba(0,0,0,.5)"}
                        marginLeft={".02rem"}
                        lineHeight={"100%"}
                    >
                        {
                            `（$ ${
                                props.item && numberFormat(props.item.currentBasePrice
                                    .times(ethRate)
                                    .div(10 ** 18)
                                    .toNumber())
                            }）`
                        }
                    </Typography>
                </Flex>
                <Flex alignItems={"center"} gap={".1rem"}>
                    <Icon width={".22rem"} src={props.item?.marketIcon()}/>
                    <Typography
                        fontSize={".14rem"}
                        fontWeight={500}
                        color={"rgba(0,0,0,.5)"}
                    >Listed price</Typography>
                </Flex>
            </Shadow>
            {/* Vault Apr */}
            <Shadow>
                {/* <Popover content={vaultApr({rewardAPR:123,interestAPR:321})}>     */}
                <Popover content={VaultAprPop({rewardAPR:(state.rewardsAPR ?? 0),interestAPR:((state.interestAPR ?? 0) / 100)})}>    
                    <TipsIcon width={".14rem"} src={tipsIcon}/>
                </Popover>
                <Typography
                    color={"#FF490F"}
                    fontSize={".24rem"}
                    fontWeight={700}
                >{percentageFormat(vaultAPR)}</Typography>
                <Typography
                    fontSize={".14rem"}
                    fontWeight={500}
                    color={"rgba(0,0,0,.5)"}
                >Vault ARP</Typography>
            </Shadow>
        </Flex>
        {/* Other NFTs */}
        <Flex gap={".1rem"} overflow={"hidden"}>
            {
                recommendNFTs.map((nft, idx) => {
                    if (recommendNFTs.length === idx + 1) {
                        return <MoreNFT tap={() => {
                            navigate(`/marketPlace/collections/${nft?.address}`)
                        }} img={nft.imageUrl} total={recommendNFTTotal}/>
                    } else {
                        return <OtherNFT src={nft.imageUrl} onClick={() => {navigate(`/nftDetail/${nft.address}/${nft.tokenId}`,{replace:true})}}/>
                    }
                })
            }
        </Flex>
        {/* Buy handler */}
        <BuyBox
            flexDirection={"column"}
            alignItems={"start"}
        >
            <Popover content={DownPaymentPop({listedPrice:props.item?.currentBasePrice,loanAmount:availableBorrow})}>
                <TipsIcon width={".14rem"} src={tipsIcon}/>
            </Popover>
            <Typography
                fontSize={".16rem"}
                fontWeight={500}
                color={"#000"}
            >Down Payment</Typography>
            <Flex alignItems={"end"} marginTop={".22rem"}>
                <Flex gap={".14rem"} alignItems={"center"}>
                    <Icon width={".2rem"} height={".34rem"} src={ethIcon}/>
                    <Typography
                        fontSize={".4rem"}
                        fontWeight={700}
                        color={"#000"}
                        lineHeight={"normal"}
                        verticalAlign={"middle"}
                        height={"auto"}
                    >{
                        actualAmount && numberFormat(actualAmount.div(10 ** 18).toNumber())
                    }</Typography>
                </Flex>
                <Typography
                    fontSize={".14rem"}
                    fontWeight={500}
                    lineHeight={"2"}
                >
                    {
                        `（$ ${
                            actualAmount && numberFormat(actualAmount
                                .times(ethRate)
                                .div(10 ** 18)
                                .toFixed())
                        }）`
                    }
                </Typography>
            </Flex>
            <BuyButton onClick={buyClick}>Buy Now</BuyButton>
        </BuyBox>
    </Grid>
}