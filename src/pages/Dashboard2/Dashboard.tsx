import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
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
        gap={".1rem"}
      >
        {
          NavList.map((item, idx) => {
            return <Link to={item.key} key={item.key}>
              <Flex 
                padding={".16rem .4rem"}
                borderRadius={".1rem"}
                // border={active === idx ? "2px solid rgba(255,255,255)" : "2px solid rgba(255,255,255,.5)"}
                background = {active === idx ? "#fff" : "rgba(255,255,255,.1)"}
                alignItems= {"center"}
                gap={".25rem"}
                onClick={() => setActive(idx)}
              >
                <Icon height={".4rem"} width={".4rem"} src={item.icon}/>
                <Typography textAlign={"center"} color={active === idx ? "#000" : "#fff"} fontSize={".16rem"} fontWeight={"500"}>{item.text}</Typography>
              </Flex>
            </Link>
          })
        }
      </Flex>
      <Box
        background={"#fff"}
        minHeight={"60vh"}
        borderRadius={"10px"}
      >
        <Outlet />
      </Box>
    </Box>
  </Flex>
}