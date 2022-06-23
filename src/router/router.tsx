import React, { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadable from 'react-loadable'
import Market from "../pages/Marketplace2/Market";
import MarketList from "../pages/Marketplace2/MarketList";
import Dash from "../pages/Dashboard2/Dashboard"
import MyVaults from 'pages/Dashboard2/components/MyVaults';
import MyRewards2 from 'pages/Dashboard2/components/MyRewards';
import MyAirdop2 from 'pages/Dashboard2/components/MyAirdop';
import VaultsDetail from 'pages/Dashboard2/components/components/VaultsDetail';
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

const Web3 = loadable({
  loader: () => import("../pages/Web3Example"),
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
  const routesD: RouterT[] = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: 'marketPlace',
      component: <Marketplace />,
      children: [
        {
          path: 'collections/:address',
          component: <MarketCollection />
        }
      ]
    },
    {
      path: 'marketPlaceRedirect',
      component: <Navigate to="/marketPlace/collections/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" replace />,
    },
    {
      path: '/marketPlace/nft/:address/:tokenId',
      component: <MarketItem />
    },
    {
      path: '/dash',
      component: <Dashboard />,
      children: [
        {
          path: 'agreement',
          component: <MyAgreement />
        },
        {
          path: 'rewards',
          component: <MyRewards />
        },
        {
          path: 'airdrop',
          component: <MyAirdrop />,
        },
        {
          path: 'airdrop/claim',
          component: <Claim />,
        }
      ]
    },
    {
      path: "/web3",
      component: <Market />,
      children: [
        {
          path: "collections/:address",
          component: <MarketList />
        }
      ]
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
      component:  <main style={{ padding: "1rem" }}>
      <p>There's nothing here!</p>
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
