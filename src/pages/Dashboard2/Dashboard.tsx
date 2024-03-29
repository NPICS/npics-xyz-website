import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Box, Flex, Icon, Typography } from "../../component/Box";
import { NavList } from "./components/components/data";

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
}

export default function Market() {
  const [active, setActive] = useState<number>(0)
  const history = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const name:string = history.pathname.substring(11)
    if(history.pathname === '/dashboard') {
      console.log('jump');
      navigate("/dashboard/vaults")
    }
    const pathNameIndex:any = {
      vaults: 0,
      rewards: 1,
      airdrop: 2
    }
    const index = pathNameIndex[name]
    setActive(index)
    
  },[history.pathname])

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
        marginBottom={"0.1rem"}
        gap={"0.1rem"}
      >
        {
          NavList.map((item, idx) => {
            return <Link to={item.key} key={item.key}>
              <Flex 
                padding={"0.16rem 0.4rem"}
                borderRadius={"0.1rem"}
                background = {active === idx ? "#fff" : "rgba(255,255,255,.1)"}
                alignItems= {"center"}
                gap={"0.25rem"}
                onClick={() => setActive(idx)}
              >
                <Icon height={"0.4rem"} width={"0.4rem"} src={ active === idx ? item.iconActive :item.icon}/>
                <Typography textAlign={"center"} color={active === idx ? "#000" : "#fff"} fontSize={"0.16rem"} fontWeight={"500"}>{item.text}</Typography>
              </Flex>
            </Link>
          })
        }
      </Flex>
      <Box
        background={"#fff"}
        // minHeight={"60vh"}
        borderRadius={"0.1rem"}
        minWidth={"15rem"}
      >
        <Outlet />
      </Box>
    </Box>
  </Flex>
}