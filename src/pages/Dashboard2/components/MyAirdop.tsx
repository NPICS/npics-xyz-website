import React,{useState} from "react"
import { Box, Flex, Grid, Icon, Typography } from "component/Box";
import NotFound from "component/NotFound";
import { airdropProject, Projection } from "./components/data";
import ButtonDefault from "component/ButtonDefault";
import { message, notification } from 'antd';
import { useAsync } from "react-use";
import { useWeb3React } from "@web3-react/core";
import {Erc20} from "abis/Erc20";
import { injected } from "connectors/hooks";
import { deserializeArray } from "class-transformer";
export default function MyAirdop() {
  // whether to allow clicks
  const [allowed, setAllowed] = useState<boolean>(false)
  const [project, setProject] = useState<Projection[]>()
  const {provider,account} = useWeb3React()

  useAsync(async()=> {
    if (!account) {
      try{
        await injected.activate(1)
      }catch(e:any){
        notification.error({ message: e.message})
      }
  }
  },[])

  useAsync(async() => {
    console.log(provider,account);
    if(provider && account) {
      const neoAdress = [
        '0xcd13D923D7428b0A2726d30ac5350d9991060ff1',
        '0x0c7251c2AB025739b142272F51796a10DC150f21',
        '0xE65ffd60CB4Bb6Fd185c0CF4041e14D9D1caD6dC'
      ]
      const promiseArray: any[] = []
      neoAdress.forEach((item) => {
        let erc20 = new Erc20(item, provider)
        promiseArray.push((erc20.balanceOf(account)))
      })
      const result = await Promise.all(promiseArray)
      const _projection: any[] = []
      airdropProject.forEach((item)=> {
        _projection.push({
          ...item,
          NEOBAYC: result[0],
          NEOMAYC: result[1],
          NEODoole: result[2]
        })
      })
      let _result = deserializeArray(Projection, JSON.stringify(_projection))
      setProject(_result)
      setAllowed(false)
    }
  },[account])


  return <Box
    padding={"40px 60px"}
  >
    <Typography fontSize={"30px"} fontWeight={800} color={'#000'} marginBottom="30px">NPics Airdrop</Typography>
    <Typography fontSize={"16px"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom={"50px"}>
      Holding NEO NFTs entitles you to claim airdrop rewards for NFT assets in your vault on the protocol.
    </Typography>
    
    <Box
      background={"rgba(255,255,255,.03)"}
      borderRadius="10px"
      boxShadow="0px 0px 30px rgba(0, 0, 0, 0.05)"
      padding="30px 40px 70px"
    >
      <Typography fontSize={"20px"} fontWeight={700} color={'#000'} marginBottom="8px">Airdrop Project</Typography>
      <Typography fontSize={"14px"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom="20px">Current Active：4</Typography>
      
      <Grid
        gridGap="10px"
        gridTemplateRows={"repeat(5, 1fr)"}
      >
        <Grid
          gridTemplateColumns={"2fr auto 3fr auto 2fr"}
          background="#fff"
          border="1px solid rgba(0, 0, 0, 0.1)"
          borderRadius="10px"
          minHeight="70px"
          padding="19px 60px"
        >
          <Flex alignItems="center" justifyContent="left">
            <Typography marginLeft="5px" fontSize={"14px"} fontWeight={500} color={'#000'} textAlign={"left"}>Project</Typography>
          </Flex>
          <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
          <Flex alignItems="center" justifyContent="center">
            <Typography marginRight="10px" fontSize={"14px"} fontWeight={500} color={'#000)'} textAlign={"center"}>Contract Address</Typography>
          </Flex>
          <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
          <Flex alignItems="center" justifyContent="center"><Typography fontSize={"14px"} fontWeight={500} color={'#000'} textAlign={"center"}>Actions</Typography></Flex>
        </Grid>

        {project && project.map((item,idx) => (
          <Grid
            key={idx}
            gridTemplateColumns={"2fr auto 3fr auto 2fr"}
            background="#fff"
            border="1px solid rgba(0, 0, 0, 0.1)"
            borderRadius="10px"
            minHeight="70px"
            padding="19px 60px"
          >
            <Flex alignItems="center" justifyContent="left">
              {item.icon ? <img style={{
                borderRadius: "10px",
                height: "38px",
                width: "38px",
                display: 'inlineBlock',
                overflow: 'hidden',
                userSelect: 'none',
              }} src={item.icon} /> : null}
              <Typography marginLeft="20px" fontSize={"16px"} fontWeight={700} color={'#000'} textAlign={"left"}>{item.project}</Typography>
            </Flex>
            <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
            <Flex  alignItems="center" justifyContent="center">
              <Flex style={{cursor: 'pointer'}} alignItems="center" justifyContent="center" onClick={() => window.open(`https://etherscan.io/address/${item.address}`)}>
                <Typography marginRight="10px" fontSize={"14px"} fontWeight={500} color={'rgba(0,0,0,.5)'} textAlign={"center"}>
                  {item.address}
                </Typography>
                {item.exportIcon ? <Icon height="16px" src={item.exportIcon}/> : null}
              </Flex>
            </Flex>
            <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
            <Flex alignItems="center" justifyContent="center">
              <ButtonDefault 
                disabled={!item.isAllowed()}
                height='48px' 
                minWidth='120px' 
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
    {/* <Box paddingTop="100px">
      <NotFound
        title="Coming Soon"
        text=""
      />
    </Box> */}
  </Box>
}