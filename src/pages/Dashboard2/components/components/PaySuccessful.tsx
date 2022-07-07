import React from "react"
import { Box, Flex, Icon, Typography } from "component/Box";
import { imgurl } from 'utils/globalimport';
import { DataSource } from './StyledInterface';
import { copyToClipboard } from 'utils/clipboard-utils'
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
  const jumpToNeoEtherscan = () => {
    window.open(`https://cn.etherscan.com/nft/${activities?.neoAddress}/${activities?.tokenId}`)
  }

  const onClose = () => {
    props.setShowPayment(false);
    props.setIsPayingAllDebts(false)
    props.setReload(!props.reload)
  }
  const _toString = (collectionName: string):string => {
    switch (collectionName) {
      case "Doodles":
        return "Doodle"
      case "Space Doodles":
        return "Space Doodle"
      case "CryptoPunks":
        return "CryptoPunk"
      case "CLONE X - X TAKASHI MURAKAMI":
        return "Clone X"
      default:
        return collectionName
    }
  }

  return <Flex
    flexDirection={"column"}
  >
    <Flex alignItems="center" justifyContent="space-between" marginBottom=".3rem">
      <Typography></Typography>
      <Typography  fontSize=".3rem" fontWeight="800" color="#000">Congratulations！</Typography>
      <div style={{cursor: 'pointer'}}><Icon width=".24rem" height=".24rem" src={imgurl.dashboard.Cancel} onClick={() => {onClose()}}/></div>
    </Flex>

    <Flex width="7rem" height="4rem" border="1px solid rgba(0,0,0,.1)" borderRadius="10px" flexDirection='column' justifyContent="space-around">
      <Typography textAlign="center"><Icon width="1.6rem" height="1.6rem" src={imgurl.dashboard.success} /></Typography>
      
      <Flex gap=".2rem" justifyContent="center" alignItems="center">
        <Icon style={{borderRadius:"10px"}}  width=".88rem" height=".88rem" src={activities?.imageUrl}/>
        <Flex flexDirection="column">
          <Flex maxWidth="3.4rem" flexWrap="wrap" marginBottom=".12rem">
              <Typography fontSize=".16rem" fontWeight="700" color="#FF490F">
                <Typography marginRight={".05rem"} display="inline-block" fontSize=".16rem" fontWeight="700" color="#000">You've deposited</Typography>
                {`${activities && _toString(activities?.collectionName)} ${activities?.tokenId}`} 
                <Typography marginLeft={".05rem"} display="inline-block" fontSize=".16rem" fontWeight="700" color="#000">and minted</Typography>
              </Typography>
          </Flex>
          <Flex alignItems="center" gap=".1rem" onClick={() => jumpToNeoEtherscan()}>
            <Typography style={{cursor: 'pointer'}} fontSize=".16rem" fontWeight="500" color="rgba(0,0,0,.5)">
              {`NEO ${activities &&  _toString(activities?.collectionName)} ${activities?.tokenId}`} 
            </Typography>
            <Icon marginLeft=".1rem" width=".14rem" height=".14rem" src={imgurl.dashboard.export14}/>
          </Flex>
        </Flex>
      </Flex>

      <Flex alignItems="center" justifyContent='center' onClick={() => jumpToEtherscan()} >
        <Typography style={{cursor: 'pointer'}} marginRight={".05rem"} fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">View on etherscan</Typography>
        <Icon width=".14rem" height=".14rem" src={imgurl.dashboard.export14}/>
      </Flex>
    </Flex>
    <Flex display="inline-block" marginTop=".21rem" justifyContent='center' alignItems="center" >
      <div style={{ padding: ".16rem .24rem", border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "10px", cursor: "pointer" }}>
        <Typography fontSize=".16rem" fontWeight="700" color="#000" onClick={async()=> {
          activities && await copyToClipboard(activities?.address);
          onClose()
        }}>Add to wallet</Typography>
      </div>
    </Flex>
  </Flex>
}
