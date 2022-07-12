import React, { ReactNode,useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import loadable from 'react-loadable'
import Market from "../pages/Marketplace2/Market";
import MarketList from "../pages/Marketplace2/MarketList";
import Dash from "../pages/Dashboard2/Dashboard"
import MyVaults from 'pages/Dashboard2/components/MyVaults';
import MyRewards2 from 'pages/Dashboard2/components/MyRewards';
import MyAirdop2 from 'pages/Dashboard2/components/MyAirdop';
import NFTPay from "../pages/Marketplace2/NFTPay";
import NFTPayProgressing from "../pages/Marketplace2/NFTPayProgressing";
import NFTPayCongratulations from "../pages/Marketplace2/NFTPayCongratulations";
import NFTPayWrong from "../pages/Marketplace2/NFTPayWrong";
import VaultsDetail from 'pages/Dashboard2/components/components/VaultsDetail';
import OneNFT from "../pages/Marketplace2/OneNFT";
interface RouterT {
  name?: string,
  path: string,
  children?: Array<RouterT>,
  component: ReactNode
}

const LoadingTip = () => <div></div>

const Home = loadable({
  loader: () => import('../pages/home/Home'), 
  loading: LoadingTip 
})

const Marketplace = loadable({
  loader: () => import('../pages/marketplace/Marketplace'), 
  loading: LoadingTip 
})

const MarketCollection = loadable({
  loader: () => import('../pages/marketplace/MarketCollection'), 
  loading: LoadingTip 
})

const Dashboard = loadable({
  loader: () => import('../pages/Dashboard/Dashboard'), 
  loading: LoadingTip 
})

const MarketItem = loadable({
  loader: () => import('../pages/marketplace/components/MarketItem'), 
  loading: LoadingTip 
})
const MyAgreement = loadable({
  loader: () => import('pages/Dashboard/components/MyAgreement'), 
  loading: LoadingTip 
})
const MyRewards = loadable({
  loader: () => import('pages/Dashboard/components/MyRewards'), 
  loading: LoadingTip 
})
const MyAirdrop = loadable({
  loader: () => import('pages/Dashboard/components/MyAirdrop'), 
  loading: LoadingTip 
})
const Claim = loadable({
  loader: () => import('pages/Dashboard/components/components/Claim'), 
  loading: LoadingTip 
})

export default function Routers() {
  const location = useLocation()

const checkAuth = (routers:any, path:String)=>{
  for (const data of routers) {
    if (data.path==path) return data
    if (data.children) {
      const res:any = checkAuth(data.children, path)
      if (res) return res
    }
  }
  return null
}

  const routesD: RouterT[] = [
    // {
    //   path: 'web3',
    //   component: <Web3 />
    // },
    {
      path: '/',
      component: <Home />
    },
    // {
    //   path: "/web3",
    //   component: <Web3Example />
    // },
    {
      path: "/marketPlace",
      component: <Market />,
      children: [
        {
          path: "collections/:address",
          component: <MarketList />
        }
      ]
    },
    {
      path: "/nft/:address/:tokenId",
      component: <OneNFT />,
    },
    {
      path: "/dashboard",
      component: <Dash/>,
      children: [
        {
          path: 'vaults',
          component: <MyVaults />
        },
        {
          path: 'rewards',
          component: <MyRewards2 />
        },
        {
          path: 'airdrop',
          component: <MyAirdop2 />,
        }
      ]
    },
    {
      path: 'vaultsDetail/:address/:tokenId',
      component: <VaultsDetail />
    },
    {
      path: "*",
      component:  <main style={{ padding: "100px" }}>
      <h1>404</h1>
    </main>
    },
  ];

  const RouteMap = (route:RouterT[]):ReactNode => {
      return route.map((item:RouterT) => {
        return(
          <Route
            element={item.component}
            path={item.path}
            key={item.path}
            >
            {item.children && RouteMap(item.children)}
          </Route>
        )
      })
  }

  return (
    <Routes>
      {RouteMap(routesD)}
    </Routes>
  )
};
