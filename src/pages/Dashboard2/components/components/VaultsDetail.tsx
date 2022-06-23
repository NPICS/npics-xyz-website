import React, { useState, useEffect } from 'react'
import { Box, Flex, Icon, Typography, Grid, GridItem } from "component/Box";
import { imgurl } from 'utils/globalimport';
import ProgressBar from 'pages/Dashboard/components/components/ProgressBar';
import ButtonDefault from 'component/ButtonDefault'

const Banner = () => {
  return <Box
    position={"absolute"}
    height={"4.2rem"}
    top={0}
    left={0}
    right={0}
    zIndex={0}
    background={"#1a1a1a"}
  ></Box>
};

export default function VaultsDetail() {
  const [progressVal, setProgressVal] = useState<number>(0)
  const [checked, setChecked] = useState<boolean>(false)



  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }


  useEffect(() => {
    if(checked) {
      setProgressVal(1)
    } else {
      setProgressVal(0)
    }
  }, [checked])

  useEffect(() => {
    if(progressVal === 1) {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [progressVal])

  const onProgressBar = (e: any) => {
    setProgressVal(e)
  }

  return <Flex
    position={"relative"}
    flexDirection={"column"}
    padding={"0 1.6rem"}
    background={"transparent"}
    marginBottom={"1.6rem"}
  >
    <Banner />
    <Box
      zIndex={1}
    >
      <Flex
        marginTop={"2.14rem"}
        marginBottom={".1rem"}
        gap={".2rem"}
        alignItems={"center"}
      >
        <Icon width='.36rem' height='.36rem' url={imgurl.dashboard.reback} />
        <Typography fontSize={".3rem"} fontWeight={"800"} color={"#fff"}>Repay</Typography>
      </Flex>

      <Box
        background={"#fff"}
        minHeight={"60vh"}
        borderRadius={"10px"}
        padding={".4rem .6rem"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex flexDirection={"column"}>
            <Typography fontSize={".2rem"} fontWeight={"700"} color={"#000"}>Vault Detail</Typography>
            <Flex alignItems={"center"}>
              <Typography fontSize={".16rem"} fontWeight={"500"} color={"rgba(0,0,0,.5)"}>Asset:</Typography>
              <Typography fontSize={".16rem"} fontWeight={"500"} color={"rgba(0,0,0,.5)"}>
                {"Bored Ape Yacht Club # 2532"}
              </Typography>
            </Flex>
          </Flex>
          <Flex alignItems={"center"} background={"#fff"} boxShadow={"0 0 20px rgba(0,0,0,.1)"} borderRadius={"10px"} gap={".12rem"} padding={".11rem"}>
            <Typography fontSize={".14rem"} fontWeight={"500"} color={"#000"}>Status</Typography>
            <Typography fontSize={".16rem"} fontWeight={"700"} color={"#7BD742"}>{"INFORCE"}</Typography>
          </Flex>
        </Flex>

        <Grid
          marginTop={".3rem"}
          gridTemplateColumns={"3.4rem auto"}
          gridGap={".3rem"}
        >
          <Icon width='3.4rem' height='3.4rem' url='' />
          <Grid
            gridTemplateAreas='"Minted Profit" "Numerical Numerical"'
            gridGap={".1rem"}
          >
            <GridItem
              background={"#fff"}
              boxShadow={"0 0 0 3px rgba(0,0,0,.05)"}
              borderRadius={"10px"}
              gridArea={'Minted'}
              padding={".3rem 0"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
            >
              <Typography marginBottom={".14rem"}>NEO-Bored Ap...Club #2345</Typography>
              <Typography>Minted-NFT</Typography>
            </GridItem>
            <GridItem
              background={"#fff"}
              boxShadow={"0 0 0 3px rgba(0,0,0,.05)"}
              borderRadius={"10px"}
              gridArea={'Profit'}
              padding={".3rem 0"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
            >
              <Typography marginBottom={".14rem"}>-35.15（-57.87%）</Typography>
              <Typography>Estimat Profit</Typography>
            </GridItem>

            <Grid
              gridArea={'Numerical'}
              gridTemplateColumns={"repeat(3, 1fr)"}
              background={"rgba(0,0,0,.03)"}
              border={"1px solid rgba(0,0,0,.1)"}
              borderRadius={"10px"}
              padding={".32rem 1.5rem"}
              gridGap={".4rem 1.3rem"}
            >
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Health factor</Typography>
                <Typography>123</Typography>
              </Flex>
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Floor price</Typography>
                <Typography>123</Typography>
              </Flex>
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Debt</Typography>
                <Typography>123</Typography>
              </Flex>
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Vault APR</Typography>
                <Typography>123</Typography>
              </Flex>
              <Flex alignItems={"center"} justifyContent={"center"} flexDirection="column" gap='.12rem'>
                <Typography>Liquidation Price</Typography>
                <Typography>123</Typography>
              </Flex>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        background={"#fff"}
        minHeight={"60vh"}
        borderRadius={"10px"}
        padding={".4rem .6rem"}
        marginTop={".1rem"}
      >
        <Typography marginBottom={".4rem"} fontSize={".2rem"} fontWeight={"700"} color={"#000"}>Repay</Typography>
        <Grid
          gridTemplateAreas='"debt pay" "factor pay""balance pay"'
          gridTemplateColumns={"3.2rem auto "}
          gridGap={".1rem .7rem"}
        >
          <GridItem
            boxShadow={"0px 0px 30px rgba(0, 0, 0, 0.05)"}
            borderRadius="10px"
            gridArea={'debt'}
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={".1rem"}
            padding={".32rem 0"}
          >
            <Typography>52.6673</Typography>
            <Typography>Remaining debt</Typography>
          </GridItem>
          <GridItem
            boxShadow={"0px 0px 30px rgba(0, 0, 0, 0.05)"}
            borderRadius="10px"
            gridArea={'factor'}
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={".1rem"}
            padding={".32rem 0"}
          >
            <Typography>52.6673</Typography>
            <Typography>New health factor</Typography>
          </GridItem>
          <GridItem
            boxShadow={"0px 0px 30px rgba(0, 0, 0, 0.05)"}
            borderRadius="10px"
            gridArea={'balance'}
            flexDirection="column"
            alignItems="center"
            justifyContent={"center"}
            gap={".1rem"}
            padding={".32rem 0"}
          >
            <Typography>
                52.6673
              <Icon width='.22rem' height='.22rem' url={imgurl.home.ethBlack22} />
            </Typography>
            <Typography>Wallet balance</Typography>
          </GridItem>
          <GridItem gridArea={'pay'} flexDirection="column">
            <Flex
              background="rgba(0, 0, 0, 0.03)"
              border="1px solid rgba(0, 0, 0, 0.1)"
              borderRadius="10px"
              padding=".31rem .5rem"
              alignItems="center"
              justifyContent="space-between"
              flex="auto"
            >
              <Typography fontSize={".3rem"} fontWeight={"800"} color={"#000"}>10.6673</Typography>
              <Icon width='.4rem' height='.4rem' url={imgurl.home.ethBlack40} />
            </Flex>

            <Box marginTop=".36rem">
              <ProgressBar
                onChange={onProgressBar}
                value={progressVal}
              ></ProgressBar>
            </Box>

            <Box minHeight={'1rem'} marginTop=".3rem">
              <Flex alignItems="center" marginBottom=".3rem" gap='.1rem'>
                <input style={{ width: ".24rem", height: ".24rem", cursor: "pointer" }} type={'checkbox'} onChange={(e) => handleCheck(e)} checked={checked} id="payAll" />
                <label style={{ cursor: "pointer" }} htmlFor="payAll">Repay all</label>
                <Typography fontSize={".16rem"} fontWeight={"500"} color="rgba(0,0,0,.5)" >(Repay the whole loan to regain NFT ownership)</Typography>
              </Flex>

              {
                checked ? <Typography color="#FF490F">
                  Because of the change in interest rates, this transaction is set up with a default slippage of 0.1% and a maximum slippage of 0.01 ETH.
                  All unused ETH will be returned to your wallet.
                </Typography> : null
              }
            </Box>


            <Typography marginTop=".3rem">
              <ButtonDefault disabled={progressVal === 0 ? true : false} types='normal' color='#fff'>Repay</ButtonDefault>
            </Typography>

          </GridItem>
        </Grid>
      </Box>
    </Box>
  </Flex>
}