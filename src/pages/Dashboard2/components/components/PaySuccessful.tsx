import React from "react"
import { Box, Flex, Icon, Typography } from "component/Box";
import { imgurl } from 'utils/globalimport';

interface IProps {
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>
  setIsPayingAllDebts: React.Dispatch<React.SetStateAction<boolean>>
  setReload: React.Dispatch<React.SetStateAction<boolean>>
  reload: boolean
}

export default function PaySuccessful(props:IProps) {
  return <Flex
    flexDirection={"column"}
  >
    <Flex alignItems="center" justifyContent="space-between" marginBottom=".3rem">
      <Typography></Typography>
      <Typography  fontSize=".3rem" fontWeight="800" color="#000">Congratulations！</Typography>
      <div style={{cursor: 'pointer'}}><Icon width=".24rem" height=".24rem" src={imgurl.dashboard.Cancel} onClick={() => {
        props.setShowPayment(false);
        props.setIsPayingAllDebts(false)
        props.setReload(!props.reload)
      }}/></div>
    </Flex>

    <Flex width="7rem" height="4rem" border="1px solid rgba(0,0,0,.1)" borderRadius="10px" flexDirection='column' justifyContent="space-around">
      <Typography textAlign="center"><Icon width="1.6rem" height="1.6rem" src={imgurl.dashboard.success} /></Typography>
      
      <Flex gap=".2rem" justifyContent="center" alignItems="center">
        <Icon borderRadius="10px" width=".88rem" height=".88rem" src={"https://tva1.sinaimg.cn/large/e6c9d24egy1h3g0c8ugwqj20v50jhgrr.jpg"}/>
        <Flex flexDirection="column">
          <Flex maxWidth="3.4rem" flexWrap="wrap" marginBottom=".12rem">
              <Typography fontSize=".16rem" fontWeight="700" color="#FF490F">
                <Typography display="inline-block" fontSize=".16rem" fontWeight="700" color="#000">You've deposited</Typography>
                {`${"NEO-Bored Ape Yacht Club"} ${"#22562"}`}
                <Typography display="inline-block" fontSize=".16rem" fontWeight="700" color="#000">and minted</Typography>
              </Typography>
          </Flex>
          <Flex alignItems="center" gap=".1rem" >
            <Typography fontSize=".16rem" fontWeight="500" color="rgba(0,0,0,.5)">
              {`NEO-${"NEO-Bored Ape Yacht Club"} ${"#22562"}`} 
            </Typography>
            <Icon marginLeft=".1rem" width=".14rem" height=".14rem" src={imgurl.dashboard.export14}/>
          </Flex>
        </Flex>
      </Flex>

      <Flex alignItems="center" justifyContent='center' >
        <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">View on etherscan</Typography>
        <Icon width=".14rem" height=".14rem" src={imgurl.dashboard.export14}/>
      </Flex>
    </Flex>
    <Flex display="inline-block" marginTop=".21rem" justifyContent='center' alignItems="center" >
      <div style={{ padding: ".16rem .24rem", border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "10px", cursor: "pointer" }}>
        <Typography fontSize=".16rem" fontWeight="700" color="#000">ADD to MetaMask</Typography>
      </div>
    </Flex>
  </Flex>
}