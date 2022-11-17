import { MoreItem, MoreItemLink } from '../pages/Layout/headerStyled';
import { useState, useCallback, useEffect } from 'react';
import { useLocation } from "react-router-dom"
import { imgurl } from 'utils/globalimport';
export const useMenu = () => {
  const history = useLocation();
  // menu
  const HomeMenu = [
    {
      id: 1,
      path: "/downpayment",
      type: 1,
      label: "DownPayment"
    },
    {
      id: 2,
      path: "/chipswap",
      type: 1,
      label: "ChipSwap"
    },
    {
      id: 3,
      path: "/hedging",
      type: 1,
      label: "Hedging"
    },
    {
      id: 4,
      path: "/dashboard",
      type: 1,
      label: "Dashboard"
    },
    {
      id: 5,
      path: "/Resources",
      type: 2,
      label: "Resources"
    }
  ]
  const DPMenu = [
    {
      id: 1,
      path: "/downpayment",
      type: 1,
      label: "Overview"
    },
    {
      id: 2,
      path: "/marketplace",
      type: 1,
      label: "Marketplace"
    },
    {
      id: 3,
      path: "/vault",
      type: 1,
      label: "Vault"
    },
    {
      id: 4,
      path: "/rewards",
      type: 1,
      label: "Rewards"
    },
    {
      id: 5,
      path: "/airdop",
      type: 1,
      label: "Airdop"
    }
  ]
  // more
  const HomeMore = [
    {
      key: '1',
      label: (
        <MoreItem target="_blank" rel="noopener noreferrer" href="https://twitter.com/NPicsNFT">
          <img className="more_item_img" src={imgurl.footer.darkT} alt="" />
          Twitter
        </MoreItem>
      ),
      // icon: imgurl.footer.darkT,
    },
    {
      key: '2',
      label: (
        <MoreItem target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/npics">
          <img className="more_item_img" src={imgurl.footer.darkDiscord} alt="" />
          Discord
        </MoreItem>
      ),
      // icon: imgurl.footer.darkG,
    },
    {
      key: '3',
      label: (
        <MoreItem target="_blank" rel="noopener noreferrer" href="https://github.com/NPICS/npics-xyz-website">
          <img className="more_item_img" src={imgurl.footer.darkGH} alt="" />
          Github
        </MoreItem>
      ),
      // icon: imgurl.footer.darkG,
    },
    {
      key: '4',
      label: (
        <MoreItem target="_blank" rel="noopener noreferrer" href="https://medium.com/@npics.xyz">
          <img className="more_item_img" src={imgurl.footer.darkM} alt="" />
          Medium
        </MoreItem>
      ),
      // icon: imgurl.footer.darkM,
    },
  ]
  const DPMore = [
    {
      key: '1',
      label: (
        <MoreItemLink to={"/chipswap"}>
          Chipswap
        </MoreItemLink>
      ),
    },
    {
      key: '1',
      label: (
        <MoreItemLink to={"/hedg"}>
          Hedging
        </MoreItemLink>
      ),
    },
    {
      key: '1',
      label: (
        <MoreItemLink to={"/dashboard"}>
          Dashboard
        </MoreItemLink>
      ),
    },
    {
      key: '1',
      label: (
        <MoreItem target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Resources
        </MoreItem>
      ),
    },
  ]
  // path
  const DPPath = ["downpayment", "marketplace", "nft"];
  const [menuList, setMenuList] = useState<any[]>([])
  const [moreList, setMoreList] = useState<any[]>([])
  const [pageType, setPageType] = useState<string>("")
  useEffect(() => {
    //Judgment router and select different list
    console.log(history.pathname.split("/"));
    const routerPathList = history.pathname.split("/");
    if (routerPathList[1] === "") {
      // home menu
      setMenuList(val => HomeMenu)
      setMoreList(val => HomeMore)
      setPageType("home")
    }
    if (DPPath.includes(routerPathList[1])) {
      // downpayment menu
      setMenuList(val => DPMenu)
      setMoreList(val => DPMore)
      setPageType("dp")
    }
  }, [history.pathname]);

  return { menuList, moreList, pageType };
}