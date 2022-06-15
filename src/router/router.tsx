import React, { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from 'react-loadable'

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
    },
    {
      path: '/marketPlace/nft/:address/:tokenId',
      component: <MarketItem />
    },
    {
      path: '/dashboard',
      component: <Dashboard />,
      children: [
        {
          path: '/dashboard/agreement',
          component: <MyAgreement />
        },
        {
          path: '/dashboard/rewards',
          component: <MyRewards />
        },
        {
          path: '/dashboard/airdrop',
          component: <MyAirdrop />,
        },
        {
          path: '/dashboard/airdrop/claim',
          component: <Claim />,
        }
      ]
    },
    {
      path: "/web3",
      component: <Web3 />
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
