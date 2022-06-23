import {Box, Flex, Grid, Icon, Typography} from "../../component/Box";
import styled from "styled-components";
import paymentPrefixIcon from "../../assets/images/market/nft_pay_payment_prefix.png"
import ethIcon from "../../assets/images/market/eth_icon_20x34.png"
import payTypeSelectedIcon from "../../assets/images/market/nft_pay_type_selected.png"
import {useState} from "react";
import {tap} from "lodash";

export function PopupTitle(props: {
    title: string,
    canClose: boolean
}) {
    return <Flex
        alignItems={"center"}
        justifyContent={"center"}
    >
        <Typography
            fontWeight={800}
            fontSize={".3rem"}
            color={"#000"}
        >{props.title}</Typography>
    </Flex>
}

const Cover = styled.img`
  display: block;
  background: #eee;
  border-radius: .1rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

function PayTypeButton(props: {
    isSelected: boolean,
    name: string,
    balance: string
    tap(): void
}) {
    return <Flex
        borderRadius={".1rem"}
        padding={".25rem .4rem"}
        background={props.isSelected ? `#7BD742` : `#fff`}
        border={`1px solid ${props.isSelected ? "#7BD742" : "#e5e5e5"}`}
        alignItems={"center"}
        style={{
            "cursor": "pointer",
            "userSelect": "none"
        }}
        onClick={props.tap}
    >
        <Icon
            width={".2rem"}
            height={".14rem"}
            url={payTypeSelectedIcon}
            style={{
                "display": props.isSelected ? "block" : "none"
            }}
        />
        <Typography
            fontSize={".18rem"}
            fontWeight={500}
            color={"#000"}
            marginLeft={".1rem"}
        >{props.name}</Typography>
        <Flex flex={1}></Flex>
        <Icon width={".12rem"} height={".19rem"} url={ethIcon}/>
        <Typography
            fontSize={".2rem"}
            fontWeight={500}
            color={"#000"}
            marginLeft={".1rem"}
        >{props.balance}</Typography>
    </Flex>
}

enum PayType {
    None,
    ETH = 1 << 1,
    WETH = 1 << 2
}

export const CancelButton = styled.button`
  border: 1px solid #00000033;
  background: #fff;
  color: #000;
  font-size: .16rem;
  font-weight: 700;
  border-radius: .1rem;
  height: .52rem;
  min-width: 2rem;
  cursor: pointer;
`

export const ConfirmButton = styled(CancelButton)`
  border: none;
  background: #000;
  color: #fff;
`

export default function NFTPay() {
    const [payType, setPayType] = useState<PayType>(PayType.ETH)

    return <Flex
        // TODO: debug
        marginTop={"120px"}
        width={"8.8rem"}
        background={"#fff"}
        borderRadius={".1rem"}
        padding={".4rem"}
        flexDirection={"column"}
    >
        <PopupTitle title={"Complete Checkout"} canClose={true}></PopupTitle>
        {/* nft info */}
        <Grid
            marginTop={".3rem"}
            border={"1px solid #e5e5e5"}
            borderRadius={".1rem"}
            padding={".2rem"}
            gridTemplateColumns={"2.7rem auto"}
            // alignItems={"start"}
            alignContent={"start"}
            gridTemplateAreas={`
                "cover title"
                "cover payment"
                "cover loan"
                "payTitle payTitle"
                "payType payType"
            `}
            gridColumnGap={".16rem"}
            gridRowGap={".16rem"}
        >
            <Grid gridArea={"cover"}><Cover src={"https://tva1.sinaimg.cn/large/e6c9d24egy1h3g3k3kx7lj20e80e8q3j.jpg"}/></Grid>
            <Grid gridArea={"title"}>
                <Typography
                    color={"rgba(0,0,0,.5)"}
                    fontSize={".14rem"}
                    fontWeight={500}
                >
                    Bored Ape Yacht Club
                </Typography>
                <Typography
                    color={"#000"}
                    fontSize={".2rem"}
                    fontWeight={700}
                    marginTop={".06rem"}
                >Bored Ape Yacht Club #1252</Typography>
            </Grid>
            <Grid
                gridArea={"payment"}
                border={"1px solid #e5e5e5"}
                borderRadius={".1rem"}
                padding={".28rem"}
            >
                <Flex flexDirection={"row"} alignItems={"center"}>
                    <Icon width={".24rem"} url={paymentPrefixIcon}/>
                    <Typography
                        marginLeft={".1rem"}
                        fontWeight={700}
                        fontSize={".16rem"}
                    >Down Payment</Typography>
                    <Flex flex={1}></Flex>
                    <Icon width={".12rem"} height={".18rem"} url={ethIcon}/>
                    <Typography
                        fontWeight={700}
                        fontSize={".24rem"}
                        marginLeft={".1rem"}
                    >999.99</Typography>
                </Flex>
            </Grid>
            <Grid
                gridArea={"loan"}
                border={"1px solid #e5e5e5"}
                borderRadius={".1rem"}
                padding={".28rem"}
                gridGap={".22rem"}
            >
                <Flex alignItems={"center"}>
                    <Typography
                        color={"#000"}
                        fontSize={".14rem"}
                        fontWeight={500}
                    >Listed Price</Typography>
                    <Flex flex={1}></Flex>
                    <Icon width={".10rem"} height={".15rem"} url={ethIcon}/>
                    <Typography
                        color={"#000"}
                        fontSize={".16rem"}
                        fontWeight={500}
                        marginLeft={".06rem"}
                    >998.123</Typography>
                </Flex>
                <Flex alignItems={"center"}>
                    <Typography
                        color={"#000"}
                        fontSize={".14rem"}
                        fontWeight={500}
                    >Loan Amount</Typography>
                    <Flex flex={1}></Flex>
                    <Icon width={".10rem"} height={".15rem"} url={ethIcon}/>
                    <Typography
                        color={"#000"}
                        fontSize={".16rem"}
                        fontWeight={500}
                        marginLeft={".06rem"}
                    >998.123</Typography>
                </Flex>
            </Grid>
            <Grid gridArea={"payTitle"}>
                <Typography
                    fontWeight={500}
                    fontSize={".2rem"}
                    color={"#000"}
                    marginTop={".24rem"}
                >Pay With</Typography>
            </Grid>
            <Grid
                gridArea={"payType"}
                gridTemplateColumns={"1fr 1fr"}
                gridColumnGap={".1rem"}
            >
                <PayTypeButton
                    isSelected={(payType & PayType.ETH) > 0}
                    name={"ETH"}
                    balance={"9.090"}
                    tap={() => {
                        let oldPayType = payType
                        setPayType(payType & PayType.ETH ? oldPayType & ~PayType.ETH : oldPayType |= PayType.ETH)
                    }}/>
                <PayTypeButton
                    isSelected={(payType & PayType.WETH) > 0}
                    name={"WETH"}
                    balance={"90.90"}
                    tap={() => {
                        let oldPayType = payType
                        setPayType(payType & PayType.WETH ? oldPayType & ~PayType.WETH : oldPayType |= PayType.WETH)
                    }}/>
            </Grid>
        </Grid>
        {/*  terms of service  */}
        <Box marginTop={".24rem"}>
            <label>
                <Flex alignItems={"center"} gap={".12rem"}>
                    <input type="checkbox"/>
                    <Typography
                        color={"#000"}
                        fontSize={".14rem"}
                        fontWeight={500}
                        style={{
                            "userSelect": "none"
                        }}
                    >checking this box,I agree to NPics's <a href={""}>Terms of service</a></Typography>
                </Flex>
            </label>
        </Box>
        <Flex alignItems={"center"} justifyContent={"center"} gap={".2rem"} marginTop={".4rem"}>
            <CancelButton type={"button"}>Cancel</CancelButton>
            <ConfirmButton type={"button"}>Checkout</ConfirmButton>
        </Flex>
    </Flex>
}