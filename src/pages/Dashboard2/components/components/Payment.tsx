import React,{useEffect} from "react"
import { Flex, Icon, Typography } from "component/Box";
import { imgurl } from 'utils/globalimport';
import { Npics } from "abi/Npics";
import { message } from "antd";
import { setIsLoading } from "store/app";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";

interface RepaymentInformation {
  address: string,
  tokenId: string,
  progressVal: number,
  payDebt: BigNumber
}

interface IProps {
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>
  setIsPayingAllDebts: React.Dispatch<React.SetStateAction<boolean>>
  setReload: React.Dispatch<React.SetStateAction<boolean>>
  reload: boolean
  payInfo: RepaymentInformation | undefined
}

export default function Payment(props:IProps) {
  const { account, library } = useWeb3React()
  const {setIsPayingAllDebts, setShowPayment, payInfo, setReload, reload} = props
  useEffect(() => {
    onRepay()
  },[])
  
  const onRepay = async () => {
    if (!payInfo) return
    try {
      const signer = library.getSigner(account)
      const npics = new Npics(signer)
      const nft = payInfo.address
      const tokenId = payInfo.tokenId
      const tx = await npics.repayETH(nft, tokenId, payInfo.payDebt)
      await tx.wait()
      console.log(tx.hash);
      if(payInfo.progressVal === 1) {
        setIsPayingAllDebts(true)
      } else {
        setShowPayment(false)
      }
      setReload(!reload)
      console.log(payInfo);
    } catch (e: any) {
      message.error(JSON.parse(JSON.stringify(e)).reason || JSON.parse(JSON.stringify(e)).message)
    }
  }



  return <Flex
    flexDirection={"column"}
  >
    <Flex alignItems="center" justifyContent="space-between" marginBottom=".3rem">
      <Typography></Typography>
      <Typography  fontSize=".3rem" fontWeight="800" color="#000">Payment</Typography>
      <div style={{cursor: 'pointer'}}><Icon width=".24rem" height=".24rem" src={imgurl.dashboard.Cancel} onClick={() => {
        setShowPayment(false)
        setReload(!reload)
      }}/></div>
    </Flex>

    <Flex width="7rem" height="4rem" border="1px solid rgba(0,0,0,.1)" borderRadius="10px" flexDirection='column'>
      <Typography textAlign="center"><Icon width="2.87rem" height="2.87rem" src={imgurl.market.loading} /></Typography>
      <Typography marginBottom=".21rem" textAlign="center" fontSize=".16rem" fontWeight="500" color="#000">Contract in progress</Typography>
      <Typography textAlign="center" fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">Estimated waiting time is <Typography display={"inline-block"} fontSize=".16rem" fontWeight="500" color="#000"  >30s</Typography></Typography>
    </Flex>

    <Typography marginTop=".21rem" textAlign="center" fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">How it works?</Typography>
  </Flex>
}