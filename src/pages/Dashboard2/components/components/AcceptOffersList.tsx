import Modal from "../../../../component/Modal";
import {Box, Flex, Icon, Typography} from "../../../../component/Box";
import refreshIcon from "../../../../assets/images/dashboard/refresh_icon.svg"
import wethIcon from "../../../../assets/images/market/weth_icon.svg"
import {useState} from "react";
import styled from "styled-components";
import { OfferModal } from "./TableWarehouse";
import { useUser } from 'hooks/useSwr'
const Button = styled.button`
  color: #fff;
  background: #000;
  border-radius: 0.1rem;
  font-size: 0.14rem;
  font-weight: 700;
  min-width: 1.5rem;
  height: 0.48rem;
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
interface IProps {
  showOffer: OfferModal
  nftAddress: string | undefined
  setShowOffer:React.Dispatch<React.SetStateAction<OfferModal>>
}
export default function AcceptOffersList(props:IProps) {
  const { showOffer, setShowOffer, nftAddress } = props
  const [topOfferPrice, setTopOfferPrice] = useState(0)
  // const aaaa:any = useUser()
  const { user, isError } = useUser()
  console.log(user, isError)

  return <Modal isOpen={showOffer === OfferModal.OFFERSLIST}  onRequestClose={() => setShowOffer(OfferModal.NONE)}>
    {/* Box */}
    <Flex
      background={"#fff"}
      borderRadius={"0.2rem"}
      padding={"0.4rem"}
      flexDirection={"column"}
      minWidth={"8.2rem"}
      maxHeight={"6.8rem"}
    >
      {/* Title */}
      <Flex justifyContent={"space-between"}>
        <Flex width={"24%"}></Flex>
        <Typography
          fontSize={"0.3rem"}
          fontWeight={800}
          textAlign={"center"}
        >Acceptable Offers List</Typography>
        {/* Refresh  */}
        <Flex gap={"0.2rem"} alignItems={"center"} justifyContent={"end"} width={"24%"} style={{cursor: "pointer"}}>
          <Typography>1 hours ago</Typography>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            width={"0.24rem"}
            height={"0.24rem"}
            borderRadius={"0.05rem"}
            border={"0.01rem solid #0000004D"}
          >
            <Icon src={refreshIcon} width={"0.13rem"} height={"0.13rem"}></Icon>
          </Flex>
        </Flex>
      </Flex>
      {/* Top Office */}
      <Flex justifyContent={"space-between"} alignItems={"center"} marginTop={"0.32rem"}>
        <Flex flexDirection={"column"} alignItems={"start"} gap={"0.1rem"}>
          <Typography>Top Office</Typography>
          <Flex alignItems={"center"} gap={"0.06rem"}>
            <Icon src={wethIcon} width={"0.12rem"} height={"0.18rem"}></Icon>
            <Typography
              fontSize={"0.2rem"}
              fontWeight={500}
            >{topOfferPrice}</Typography>
          </Flex>
        </Flex>
      </Flex>
      {/* List */}
      <FlexList flexDirection={"column"} gap={"0.1rem"} overflow={"auto"} marginTop={"0.2rem"}>
        {
          new Array(20).fill(``).map((item, idx) => {
            return <AcceptOffersCell key={idx} setShowOffer={setShowOffer}/>
          })
        }
      </FlexList>
    </Flex>
  </Modal>
}

function AcceptOffersCell(props: { setShowOffer: React.Dispatch<React.SetStateAction<OfferModal>> }) {
  return <Flex
    border={"0.01rem solid #0000001A"}
    borderRadius={"0.1rem"}
    padding={"0.11rem 0.3rem"}
    alignItems={"center"}
  >
    {/* Market Icon */}
    <Box borderRadius={"0.18rem"} background={"#eee"}>
      <Icon width={"0.36rem"} height={"0.36rem"}></Icon>
    </Box>
    {/* Price */}
    <Flex marginLeft={"0.2rem"}
          width={"38%"}
          alignItems={"start"}
          gap={"0.02rem"}
          flexDirection={"column"}
    >
      <Flex alignItems={"start"} gap={"0.04rem"}>
        <Flex alignItems={"center"} gap={"0.06rem"}>
          <Icon src={wethIcon} width={"0.1rem"} height={"0.15rem"}></Icon>
          <Typography
            color={"#000"}
            fontSize={"0.16rem"}
            fontWeight={500}
          >9090.12</Typography>
          <Typography
            color={"rgba(0,0,0,.5)"}
            fontSize={"0.14rem"}
            fontWeight={500}
            marginLeft={"0.04rem"}
          >($1212,123)</Typography>
        </Flex>
      </Flex>
      <Flex gap={"0.03rem"}>
        <Typography color={"#00000080"} fontSize={"0.14rem"}>By</Typography>
        <Typography color={"#FF490F"} fontSize={"0.14rem"}>0x000...0000</Typography>
        <Typography color={"#00000080"} fontSize={"0.14rem"}>2hours ago</Typography>
      </Flex>
    </Flex>
    {/* Expires */}
    <Typography
      textAlign={"left"}
      fontSize={"0.14rem"}
      fontWeight={500}
      color={"#000"}
    >Expires in 1 hours</Typography>
    <Flex flex={1}></Flex>
    <Button onClick={() => props.setShowOffer(OfferModal.OFFER)}>Accept Offer</Button>
  </Flex>
}