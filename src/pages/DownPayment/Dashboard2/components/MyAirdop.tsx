import React, { useState } from "react"
import { Box, Flex, Grid, Icon, Typography } from "component/Box";
import NotFound from "component/NotFound";
import { airdropProject, Projection } from "./components/data";
import ButtonDefault from "component/ButtonDefault";
import { message, Tabs } from 'antd';
import { useAsync } from "react-use";
import { useWeb3React } from "@web3-react/core";
import { Erc20 } from "abis/Erc20";
import { CHAIN_ID, injected } from "connectors/hooks";
import { deserializeArray } from "class-transformer";
import styled from "styled-components";
import FlashClaim from "./components/FlashClaim";
import Turbo from "./components/Turbo";
const { TabPane } = Tabs;
const TabBox = styled.div`
  .ant-tabs-top{
    .ant-tabs-nav{
      margin-bottom: 0.24rem;
      &::before{
        display: none;
      }
      .ant-tabs-nav-wrap{
        .ant-tabs-nav-list{
          .ant-tabs-tab{
            color: #000;
            font-size: 0.16rem;
            font-weight: 700;
            padding: 0.12rem 0.3rem;
          }
          .ant-tabs-tab + .ant-tabs-tab{
            margin: 0;
          }
          .ant-tabs-tab-active{
            .ant-tabs-tab-btn{
              color: #fff;
            }
          }
          .ant-tabs-ink-bar{
            z-index:-1;
            background:#000;
            height: 100%;
            border-radius: 0.5rem;
          }
        }
      }
    }
  } 
`
export default function MyAirdop() {
  // whether to allow clicks
  const [allowed, setAllowed] = useState<boolean>(false)
  const [project, setProject] = useState<Projection[]>()
  const { provider, account } = useWeb3React()

  useAsync(async () => {
    if (!account) {
      // try{
      await injected.activate(CHAIN_ID)
      // }
      // catch(e:any){
      //   notification.error({ message: e.message})
      // }
    }
  }, [])

  useAsync(async () => {
    console.log(provider, account);
    if (provider && account) {
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
      airdropProject.forEach((item) => {
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
  }, [account])

  const changeTab = (key: string) => {
    console.log(key);
  }


  return <Box
    padding={"0.4rem 0.6rem"}
    overflow={'hidden'}
  >
    <Typography fontSize={"0.3rem"} fontWeight={800} color={'#000'} marginBottom="0.3rem">My Airdrop</Typography>
    <Typography fontSize={"0.16rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom={"0.5rem"}>
      Participate in platform campaigns or interactions to receive rewards for applying for airdrops.
    </Typography>
    <TabBox>
      <Tabs defaultActiveKey="turbo" onChange={changeTab} animated={true}>
        <TabPane tab="Turbo" key="turbo">
          <Turbo />
        </TabPane>
        <TabPane tab="Flash Claim" key="claim">
          <FlashClaim project={project} />
        </TabPane>
      </Tabs>
    </TabBox>
    {/* <Box paddingTop="1rem">
      <NotFound
        title="Coming Soon"
        text=""
      />
    </Box> */}
  </Box>
}