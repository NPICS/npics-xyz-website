import React from "react"
import { Flex, Icon, Typography } from "component/Box";
import progressIcon from "assets/images/market/nft_pay_progressing.gif"
import { urls } from "utils/urls";
import Modal from './index'

export default function Progressing(props: {
  isOpen: boolean
  onRequestClose?(): void
}) {


  return <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
  ><Flex
    flexDirection={"column"}
    background={'#fff'}
    padding={".2rem"}
    borderRadius={".1rem"}
  >
      <Flex alignItems="center" justifyContent="center" marginBottom="0.3rem">
        <Typography fontSize="0.3rem" fontWeight="800" color="#000">Progressing</Typography>
        {/* <div style={{cursor: 'pointer'}}><Icon width="0.24rem" height="0.24rem" src={imgurl.dashboard.Cancel} onClick={() => {
        setShowPayment(false)
        setReload(!reload)
      }}/></div> */}
      </Flex>

      <Flex width="7rem" height="4rem" flexDirection='column'>
        <Typography textAlign="center"><Icon width="2.87rem" height="2.87rem" src={progressIcon} /></Typography>
        <Typography marginBottom="0.21rem" textAlign="center" fontSize="0.16rem" fontWeight="500" color="#000">Contract in progress</Typography>
        <Typography textAlign="center" fontSize="0.14rem" fontWeight="500" color="rgba(0,0,0,.5)">Estimated waiting time is <Typography display={"inline-block"} fontSize="0.16rem" fontWeight="500" color="#000"  >30s</Typography></Typography>
      </Flex>

      <Typography style={{ cursor: 'pointer' }} marginTop="0.21rem" textAlign="center" fontSize="0.14rem" fontWeight="500" color="rgba(0,0,0,.5)" onClick={() => { window.open(urls.resource) }}>How it works?</Typography>
    </Flex>
  </Modal>
}