import React, { ReactNode, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import loadable from 'react-loadable'
import Market from "../pages/DownPayment/Marketplace2/Market";
import MarketList from "../pages/DownPayment/Marketplace2/MarketList";
import Dash from "../pages/DownPayment/Dashboard2/Dashboard";
import MyVaults from "pages/DownPayment/Dashboard2/components/MyVaults";
import MyRewards2 from "pages/DownPayment/Dashboard2/components/MyRewards";
import MyAirdop2 from "pages/DownPayment/Dashboard2/components/MyAirdop";
import NFTPay from "../pages/DownPayment/Marketplace2/NFTPay";
import NFTPayProgressing from "../pages/DownPayment/Marketplace2/NFTPayProgressing";
import NFTPayCongratulations from "../pages/DownPayment/Marketplace2/NFTPayCongratulations";
import NFTPayWrong from "../pages/DownPayment/Marketplace2/NFTPayWrong";
import VaultsDetail from "pages/DownPayment/Dashboard2/components/components/VaultsDetail";
import OneNFT from "../pages/DownPayment/Marketplace2/OneNFT";
import ChipSwapHome from "../pages/Chipswap/Home"
interface RouterT {
  name?: string;
  path: string;
  children?: Array<RouterT>;
  component: ReactNode;
}

const LoadingTip = () => <div></div>;
const Home = loadable({
  loader: () => import('../pages/Home'),
  loading: LoadingTip
})
const DownPaymentHome = loadable({
  loader: () => import('../pages/DownPayment/home/Home'),
  loading: LoadingTip
})
export default function Routers() {
  const location = useLocation();

  const checkAuth = (routers: any, path: String) => {
    for (const data of routers) {
      if (data.path == path) return data
      if (data.children) {
        const res: any = checkAuth(data.children, path)
        if (res) return res
      }
    }
    return null
  }
  const routesD: RouterT[] = [
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/downpayment",
      component: <DownPaymentHome />,
    },
    {
      path: "/marketplace",
      component: <Market />,
      children: [
        {
          path: "collections/:address",
          component: <MarketList />,
        },
      ],
    },
    {
      path: "/nft/:address/:tokenId",
      component: <OneNFT />,
    },
    {
      path: "/dashboard",
      component: <Dash />,
      children: [
        {
          path: "vaults",
          component: <MyVaults />,
        },
        {
          path: "rewards",
          component: <MyRewards2 />,
        },
        {
          path: "airdrop",
          component: <MyAirdop2 />,
        },
      ],
    },
    {
      path: "vaultsDetail/:graphId",
      component: <VaultsDetail />,
    },
    // chipswap
    {
      path: "/chipswap",
      component: <ChipSwapHome />,
    },
    {
      path: "*",
      component: (
        <main style={{ padding: "1rem" }}>
          <h1>404</h1>
        </main>
      ),
    },
  ];

  const RouteMap = (route: RouterT[]): ReactNode => {
    return route.map((item: RouterT) => {
      return (
        <Route element={item.component} path={item.path} key={item.path}>
          {item.children && RouteMap(item.children)}
        </Route>
      );
    });
  };
  return <Routes>{RouteMap(routesD)}</Routes>;
}
