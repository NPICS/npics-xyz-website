import Modal from "../../../../component/Modal";
import {Box, Flex, Icon, Typography} from "../../../../component/Box";
import refreshIcon from "../../../../assets/images/dashboard/refresh_icon.svg"
import wethIcon from "../../../../assets/images/market/weth_icon.svg"
import {useState} from "react";
import styled from "styled-components";

const Button = styled.button`
  color: #fff;
  background: #000;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  min-width: 150px;
  height: 48px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background: #333;
  }
`

const FlexList = styled(Flex)`
  overflow-style: unset;

  &::-webkit-scrollbar {
    display: none;
  }
`

export default function AcceptOffersList() {
  const [topOfferPrice, setTopOfferPrice] = useState(0)

  return <Modal isOpen={true}>
    {/* Box */}
    <Flex
      background={"#fff"}
      borderRadius={"20px"}
      padding={"40px"}
      flexDirection={"column"}
      minWidth={"820px"}
      maxHeight={"680px"}
    >
      {/* Title */}
      <Flex justifyContent={"space-between"}>
        <Flex width={"24%"}></Flex>
        <Typography
          fontSize={"30px"}
          fontWeight={800}
          textAlign={"center"}
        >Acceptable Offers List</Typography>
        {/* Refresh  */}
        <Flex gap={"20px"} alignItems={"center"} justifyContent={"end"} width={"24%"} style={{cursor: "pointer"}}>
          <Typography>1 hours ago</Typography>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            width={"24px"}
            height={"24px"}
            borderRadius={"5px"}
            border={"1px solid #0000004D"}
          >
            <Icon src={refreshIcon} width={"13px"} height={"13px"}></Icon>
          </Flex>
        </Flex>
      </Flex>
      {/* Top Office */}
      <Flex justifyContent={"space-between"} alignItems={"center"} marginTop={"32px"}>
        <Flex flexDirection={"column"} alignItems={"start"} gap={"10px"}>
          <Typography>Top Office</Typography>
          <Flex alignItems={"center"} gap={"6px"}>
            <Icon src={wethIcon} width={"12px"} height={"18px"}></Icon>
            <Typography
              fontSize={"20px"}
              fontWeight={500}
            >{topOfferPrice}</Typography>
          </Flex>
        </Flex>
      </Flex>
      {/* List */}
      <FlexList flexDirection={"column"} gap={"10px"} overflow={"auto"} marginTop={"20px"}>
        {
          new Array(20).fill(``).map((item, idx) => {
            return <AcceptOffersCell/>
          })
        }
      </FlexList>
    </Flex>
  </Modal>
}

function AcceptOffersCell() {
  return <Flex
    border={"1px solid #0000001A"}
    borderRadius={"10px"}
    padding={"11px 30px"}
    alignItems={"center"}
  >
    {/* Market Icon */}
    <Box borderRadius={"18px"} background={"#eee"}>
      <Icon
        width={"36px"}
        height={"36px"}
      ></Icon>
    </Box>
    {/* Price */}
    <Flex marginLeft={"20px"} width={"38%"} alignItems={"start"} gap={"2px"} flexDirection={"column"}>
      <Flex alignItems={"start"} gap={"4px"}>
        <Flex alignItems={"center"} gap={"6px"}>
          <Icon src={wethIcon} width={"10px"} height={"15px"}></Icon>
          <Typography
            color={"#000"}
            fontSize={"16px"}
            fontWeight={500}
          >9090.12</Typography>
          <Typography
            color={"rgba(0,0,0,.5)"}
            fontSize={"14px"}
            fontWeight={500}
            marginLeft={"4px"}
          >($1212,123)</Typography>
        </Flex>
      </Flex>
      <Flex gap={"3px"}>
        <Typography color={"#00000080"} fontSize={"14px"}>By</Typography>
        <Typography color={"#FF490F"} fontSize={"14px"}>0x000...0000</Typography>
        <Typography color={"#00000080"} fontSize={"14px"}>2hours ago</Typography>
      </Flex>
    </Flex>
    {/* Expires */}
    <Typography
      textAlign={"left"}
      fontSize={"14px"}
      fontWeight={500}
      color={"#000"}
    >Expires in 1 hours</Typography>
    <Flex flex={1}></Flex>
    <Button>Accept Offer</Button>
  </Flex>
}