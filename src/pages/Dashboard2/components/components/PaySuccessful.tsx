import React from "react"
import { Box, Flex, Icon, Typography } from "component/Box";
import { imgurl } from 'utils/globalimport';
import { DataSource } from './StyledInterface';
import { copyToClipboard } from 'utils/clipboard-utils'
import { _toString } from "./data";
interface IProps {
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>
  setIsPayingAllDebts: React.Dispatch<React.SetStateAction<boolean>>
  setReload: React.Dispatch<React.SetStateAction<boolean>>
  reload: boolean
  activities: DataSource | undefined
  tradeTx: string
}

export default function PaySuccessful(props:IProps) {
  const { activities,tradeTx } = props

  const jumpToEtherscan = () => {
    console.log('tradeTx',tradeTx);
    window.open(`https://etherscan.io/tx/${tradeTx}`)
  }
  const jumpToNFTEtherscan = () => {
    window.open(`https://cn.etherscan.com/nft/${activities?.address}/${activities?.tokenId}`)
  }

  const onClose = () => {
    props.setShowPayment(false);
    props.setIsPayingAllDebts(false)
    props.setReload(!props.reload)
  }

  return <Flex
    flexDirection={"column"}
  >
    <Flex alignItems="center" justifyContent="space-between" marginBottom="0.3rem">
      <Typography></Typography>
      <Typography  fontSize="0.3rem" fontWeight="800" color="#000">Congratulations！</Typography>
      <div style={{cursor: 'pointer'}}><Icon width="0.24rem" height="0.24rem" src={imgurl.dashboard.Cancel} onClick={() => {onClose()}}/></div>
    </Flex>

    <Flex width="7rem" height="4rem" border="0.01rem solid rgba(0,0,0,.1)" borderRadius="0.1rem" flexDirection='column' justifyContent="space-around">
      <Typography textAlign="center"><Icon width="1.6rem" height="1.6rem" src={imgurl.dashboard.success} /></Typography>
      
      <Flex gap="0.2rem" justifyContent="center" alignItems="center">
        <Icon style={{borderRadius:"0.1rem"}}  width="0.88rem" height="0.88rem" src={activities?.imageUrl}/>
        <Flex flexDirection="column">
          <Flex maxWidth="3.4rem" flexWrap="wrap" marginBottom="0.12rem">
              <Typography fontSize="0.16rem" fontWeight="700" color="#FF490F">
                <Typography marginRight={"0.05rem"} display="inline-block" fontSize="0.16rem" fontWeight="700" color="#000">You've destroyed</Typography>
                {`NEO ${activities && _toString(activities?.collectionName)} #${activities?.tokenId}`} 
                <Typography marginLeft={"0.05rem"} display="inline-block" fontSize="0.16rem" fontWeight="700" color="#000">and obtained</Typography>
              </Typography>
          </Flex>
          <Flex alignItems="center" gap="0.1rem" onClick={() => jumpToNFTEtherscan()}>
            <Typography style={{cursor: 'pointer'}} fontSize="0.16rem" fontWeight="500" color="rgba(0,0,0,.5)">
              {`${activities &&  _toString(activities?.collectionName)} #${activities?.tokenId}`} 
            </Typography>
            <Icon marginLeft="0.1rem" width="0.14rem" height="0.14rem" src={imgurl.dashboard.export14}/>
          </Flex>
        </Flex>
      </Flex>

      <Flex alignItems="center" justifyContent='center' onClick={() => jumpToEtherscan()} >
        <Typography style={{cursor: 'pointer'}} marginRight={"0.05rem"} fontSize="0.14rem" fontWeight="500" color="rgba(0,0,0,.5)">View on etherscan</Typography>
        <Icon width="0.14rem" height="0.14rem" src={imgurl.dashboard.export14}/>
      </Flex>
    </Flex>
    <Flex display="inline-block" marginTop="0.21rem" justifyContent='center' alignItems="center" >
      <div style={{ padding: "0.16rem 0.24rem", border: "0.01rem solid rgba(0, 0, 0, 0.2)", borderRadius: "0.1rem", cursor: "pointer" }}>
        <Typography fontSize="0.16rem" fontWeight="700" color="#000" onClick={async()=> {
          activities && await copyToClipboard(activities?.address);
          // onClose()
        }}>Add to Wallet</Typography>
      </div>
    </Flex>
  </Flex>
}
