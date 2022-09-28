import React,{useEffect} from "react"
import { Flex, Icon, Typography } from "component/Box";
import { imgurl } from 'utils/globalimport';
import { Npics } from "abis/Npics";
import { message } from "antd";
import { setIsLoading } from "store/app";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import progressIcon from "assets/images/market/nft_pay_progressing.gif"
import { urls } from "utils/urls";
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
  setTradeTx: React.Dispatch<React.SetStateAction<string>>
  reload: boolean
  payInfo: RepaymentInformation | undefined
}

export default function Payment(props:IProps) {
  const { account, provider } = useWeb3React()
  const {setIsPayingAllDebts, setShowPayment, payInfo, setReload, reload } = props
  useEffect(() => {
    onRepay()
  },[])
  
  const onRepay = async () => {
    if (!payInfo || !provider) return
    try {
      const signer = provider.getSigner(account)
      const npics = new Npics(signer)
      const nft = payInfo.address
      const tokenId = payInfo.tokenId
      const tx = await npics.repayETH(nft, tokenId, payInfo.payDebt)
      await tx.wait()
      console.log(tx);
      props.setTradeTx(tx.hash)
      if(payInfo.progressVal === 1) {
        setIsPayingAllDebts(true)
      } else {
        message.success("Successful repayment!")
        setShowPayment(false)
      }
      setReload(!reload)
      console.log(payInfo);
    } catch (e: any) {
      message.error(JSON.parse(JSON.stringify(e)).reason || JSON.parse(JSON.stringify(e)).message)
      setShowPayment(false)
      setIsPayingAllDebts(false);
    }
  }



  return <Flex
    flexDirection={"column"}
  >
    <Flex alignItems="center" justifyContent="center" marginBottom="0.3rem">
      <Typography  fontSize="0.3rem" fontWeight="800" color="#000">Repayment</Typography>
      {/* <div style={{cursor: 'pointer'}}><Icon width="0.24rem" height="0.24rem" src={imgurl.dashboard.Cancel} onClick={() => {
        setShowPayment(false)
        setReload(!reload)
      }}/></div> */}
    </Flex>

    <Flex width="7rem" height="4rem" border="0.01rem solid rgba(0,0,0,.1)" borderRadius="0.1rem" flexDirection='column'>
      <Typography textAlign="center"><Icon width="2.87rem" height="2.87rem" src={progressIcon} /></Typography>
      <Typography marginBottom="0.21rem" textAlign="center" fontSize="0.16rem" fontWeight="500" color="#000">Contract in progress</Typography>
      <Typography textAlign="center" fontSize="0.14rem" fontWeight="500" color="rgba(0,0,0,.5)">Estimated waiting time is <Typography display={"inline-block"} fontSize="0.16rem" fontWeight="500" color="#000"  >30s</Typography></Typography>
    </Flex>

    <Typography style={{cursor:'pointer'}} marginTop="0.21rem" textAlign="center" fontSize="0.14rem" fontWeight="500" color="rgba(0,0,0,.5)" onClick={() => {window.open(urls.resource)}}>How it works?</Typography>
  </Flex>
}
