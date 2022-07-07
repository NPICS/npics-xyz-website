import React,{useState} from "react"
import { Box, Flex, Grid, Icon, Typography } from "component/Box";
import NotFound from "component/NotFound";
import { airdropProject } from "./components/data";
import ButtonDefault from "component/ButtonDefault";
import { message } from 'antd';
import { useAsync } from "react-use";

export default function MyAirdop() {
  // whether to allow clicks
  const [allowed, setAllowed] = useState<boolean>(false)

  useAsync(async() => {
    // todo: Determine whether there is neo
    // Receiver Contract Missing
    setAllowed(false)
  },[])


  return <Box
    padding={".4rem .6rem"}
  >
    <Typography fontSize={".3rem"} fontWeight={800} color={'#000'} marginBottom=".3rem">NPics Airdrop</Typography>
    <Typography fontSize={".16rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom={".5rem"}>Participate in the down payment loan to buy NFT and earn double rewards</Typography>
    
    <Box
      background={"rgba(255,255,255,.03)"}
      borderRadius="10px"
      boxShadow="0px 0px 30px rgba(0, 0, 0, 0.05)"
      padding=".3rem .4rem .7rem"
    >
      <Typography fontSize={".2rem"} fontWeight={700} color={'#000'} marginBottom=".08rem">Airdrop Project</Typography>
      <Typography fontSize={".14rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom=".2rem">Current Active：4</Typography>
      
      <Grid
        gridGap=".1rem"
        gridTemplateRows={"repeat(5, 1fr)"}
      >
        <Grid
          gridTemplateColumns={"1fr auto 4fr auto 1fr"}
          background="#fff"
          border="1px solid rgba(0, 0, 0, 0.1)"
          borderRadius="10px"
          minHeight=".7rem"
          padding=".19rem .6rem"
        >
          <Flex alignItems="center" justifyContent="left">
            <Typography marginLeft=".2rem" fontSize={".14rem"} fontWeight={500} color={'#000'} textAlign={"left"}>Project</Typography>
          </Flex>
          <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
          <Flex alignItems="center" justifyContent="center">
            <Typography marginRight=".1rem" fontSize={".14rem"} fontWeight={500} color={'#000)'} textAlign={"center"}>Contract Address</Typography>
          </Flex>
          <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
          <Flex alignItems="center" justifyContent="center"><Typography fontSize={".14rem"} fontWeight={500} color={'#000'} textAlign={"center"}>Actions</Typography></Flex>
        </Grid>

        {airdropProject.map((item,idx) => (
          <Grid
            key={idx}
            gridTemplateColumns={"1fr auto 4fr auto 1fr"}
            background="#fff"
            border="1px solid rgba(0, 0, 0, 0.1)"
            borderRadius="10px"
            minHeight=".7rem"
            padding=".19rem .6rem"
          >
            <Flex alignItems="center" justifyContent="left">
              {item.icon ? <img style={{
                borderRadius: "10px", height: ".42rem",
                display: 'inlineBlock',
                overflow: 'hidden',
                userSelect: 'none',
              }} src={item.icon} /> : null}
              <Typography marginLeft=".2rem" fontSize={".16rem"} fontWeight={700} color={'#000'} textAlign={"left"}>{item.project}</Typography>
            </Flex>
            <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
            <Flex  alignItems="center" justifyContent="center">
              <Flex style={{cursor: 'pointer'}} alignItems="center" justifyContent="center" onClick={() => window.open(`https://etherscan.io/address/${item.address}`)}>
                <Typography marginRight=".1rem" fontSize={".14rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} textAlign={"center"}>
                  {item.address}
                </Typography>
                {item.exportIcon ? <Icon height=".16rem" src={item.exportIcon}/> : null}
              </Flex>
            </Flex>
            <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
            <Flex alignItems="center" justifyContent="center">
              <ButtonDefault 
                disabled={!allowed}
                height='.48rem' 
                minWidth='1.2rem' 
                types='normal' 
                onClick={() => message.warn('This item airdrop has been claimed.')}
              >
                {item.actions}
              </ButtonDefault>
            </Flex>
          </Grid>
        ))}
      </Grid>

    </Box>
    {/* <Box paddingTop="1rem">
      <NotFound
        title="Coming Soon"
        text=""
      />
    </Box> */}
  </Box>
}