// import {connectors} from "../utils/connectors";
import {useWeb3React} from "@web3-react/core";
import {ethers} from "ethers";
import {useEffect, useRef, useState} from "react";
import {ContractAddresses} from "../utils/addresses";
import NPICS_ABI from "../abi/npics.json"
import EXAMPLE_ABI from "../abi/example.json"
import {Npics} from "../abi/Npics";
// import LendPool_ABI from "../abi/lendPool.json"
import {LendPool} from "../abi/LendPool";
import BigNumber from "bignumber.js";
// import {Gem} from "gem-sdk";
import {Erc20} from "../abi/Erc20";
// import {getSignMessage} from "../utils/sign";
import dayjs from "dayjs";
import {useAppDispatch} from "../store/hooks";
// import {deserialize} from "class-transformer";
// import dayjs from "dayjs";
// import {deserialize} from "class-transformer";
import {fetchUser2} from "../store/app";
// import axios from "axios";
// import http from "../utils/http";
// import {add} from "lodash";
import { useLocation } from "react-router-dom";
// import {usePrevious} from "../hooks/previous";
import { useParams } from 'react-router-dom';

export default function Web3Example() {
  const {account, active, error, library} = useWeb3React()
  const [token, setToken] = useState<string | null>(null)
  const action = useAppDispatch()
  const [count, setCount] = useState(0)
  const lastCount = useRef<number>()
  const lastAccount = useRef<string | undefined | null>()
  const params = useParams();
  const location = useLocation();
  const state = location.state;
  // const [currentUser] = useAppSelector(state => deserialize(User, state.app.currentUser))

  useEffect(() => {
    console.log(`Set Last Account => ${account}`)
    lastAccount.current = account
  }, [account])

  useEffect(() => {
    lastCount.current = count
  }, [count])

  async function callContract() {
    // let result = await library.getSigner(account).signMessage("Hello")
    // console.log(result)
    // console.log(library.getSigner(account))
    // let abi = [
    //   "function name() view returns (string)"
    // ]
    // const aa = await library.getBalance("0x7211FA5ef8807c5ABbDfd01ADCB323a9e057dA83")
    let contract = new ethers.Contract("0x7211FA5ef8807c5ABbDfd01ADCB323a9e057dA83", EXAMPLE_ABI, library.getSigner(account))
    console.log(`${await contract.last_completed_migration()}`)
  }

  async function login() {
    try {
      // let json = await http.myPost("/api/npics-auth/auth/generateNonce", {
      //   address: account
      // })
      // let xx = await axios.post("/api/npics-auth/auth/generateNonce", {
      //   address: account
      // })
      // console.log(xx)
      // console.log(json)

      let resp = await fetch("/npics-auth/app-api/v2/auth/generateNonce", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: account
        })
      })
      let json = await resp.json()
      let nonce = json.data.nonce
      // nonce sign message

      let signature = await library.getSigner(account).signMessage(nonce)
      console.log(`Signature => ${signature}`)

      // login
      let loginResp = await fetch("/npics-auth/app-api/v2/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: account,
          signature: signature
        })
      })
      // console.log(`Login Response => ${await loginResp.json()}`)
      let loginJson = await loginResp.json()

      setToken(loginJson.data)
      sessionStorage.setItem("ACCESS_TOKEN", loginJson.data)

      // let respJson = await loginResp.json();
      // respJson.data.token
    } catch (e) {
      console.log(`Login Erro => ${e}`)
    }
  }

  async function connect() {
    // let authorize_address: string | null = sessionStorage.getItem("WALLET_AUTHORIZED_ADDRESS")
    // if (authorize_address) {
    //
    // }
    // await activate(connectors.injected)
    // sessionStorage.setItem("WALLET_AUTHORIZED", account!)
  }

  // useEffect(() => {
  //   let address = sessionStorage.getItem("WALLET_AUTHORIZED")
  //   if (address) {
  //     activate(connectors.injected).then(() => {
  //       console.log(`Auto Connected Success`)
  //     })
  //   }
  // // eslint-disable-next-line
  // }, [])


  // useEffect(() => {
  //   if (account) {
  //     sessionStorage.setItem("WALLET_AUTHORIZED", account)
  //   }
  // }, [account])

  async function gemTradeDetails() {
    let signer = library.getSigner(account)
    if (signer == null) {
      alert("Signer is Null")
    }

    let npics = new Npics(signer);
    let x = await npics.getLoanReserveBorrowAmount("0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", 1156);
    console.log(x.repayDebtAmount)

    try {
      let npics = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, signer)
      let nft = "0x76b3af5f0f9b89ca5a4f9fe6c58421dbe567062d"
      let tokenId = "9818";
      let tradeDetails = "0x9a2b81150000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000014df48080e3000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000204f3e816230000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000014df48080e30000000000000000000000000000000000000000000000000000000000000000265a0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006200000000000000000000000000000000000000000000000000000000628dfb360000000000000000000000000000000000000000000000000000000062ad8ff50000000000000000000000000000000000000000000000000000000000002134000000000000000000000000000000000000000000000000000000000000001b56462ea73df3445b5115fce7ed1081ebbe16717d31a92071d79569bf98bf322a4668c00f4ec51e51ed70889b1d3706a25136362055959965726b3f936adcce1000000000000000000000000063a0385777ba6103997610816ade25bd93a2a90c00000000000000000000000076b3af5f0f9b89ca5a4f9fe6c58421dbe567062d00000000000000000000000000000000000000000000000000000000"
      let loanAmt = "0"
      let tx = await npics.downPayWithETH(nft, tokenId, tradeDetails, loanAmt, {value: "0"})
      console.log(`hash => ${tx.hash}`)
      await tx.wait()
      console.log(`Success`)
    } catch (e) {
      console.error(`Error => ${e}`)
    }
  }

  async function getDebtList() {
    let signer = library.getSigner()
    // let c = new ethers.Contract(ContractAddresses.LendPoolProxy, LendPool_ABI, signer)
    try {
      let address = "0xed5af388653567af2f388e6224dc7c4b3241c544"
      let tokenId = '6980'
      // let result = await c.getNftDebtData(address, tokenId)
      // console.log(`Result => ${result}, ${Array.isArray(result)}`)
      let lp = new LendPool(signer)

      let ls = await Promise.all(new Array(20).map((_) => lp.getNftLiquidatePrice(address, tokenId)))
      console.log(ls)

      // let result = await lp.getNftLiquidatePrice(address, tokenId)
      // console.log(`Result => ${result.liquidatePrice}`)
    } catch (e) {
      console.error(`${e}`)
    }
  }

  const repay = async () => {
    let signer = library.getSigner(account)
    let npics = new Npics(signer)
    let tx = await npics.repayETH("0x8a90cab2b38dba80c64b7734e58ee1db38b8992e", "2595", new BigNumber("1000000000000000"))
    console.log(tx)


  }

  const buyWithErc20 = async () => {
    let sell = [
      {
        standard: "ERC20",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        priceInfo: {
          asset: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          decimals: 18,
          price: {
            type: "BigNumber",
            hex: "0x11c37937e08000"
          }
        },
        balance: {
          type: "BigNumber",
          hex: "0x2386f26fc10000"
        },
        quantity: {
          type: "BigNumber",
          hex: "0x11c37937e08000"
        }
      }
    ]
    let sellStr = JSON.stringify(sell)
    let resp = await fetch("/npics-nft/app-api/v2/nft/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: "0x36b4646fedac3320038bd51a8a6589cc490b4455",
        amount: 1,
        balanceToken: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        sell: sellStr,
        sender: "0xc5aC64B5649509c87a1e7F9F0544521548381934",
        standard: "ERC721",
        tokenId: "1739"
      })
    })
    console.log(resp.json())
  }

  const getWETHBalance = async () => {
    let signer = library.getSigner(account)
    let weth = new Erc20(ContractAddresses.WETH, signer)
    let balance = await weth.balanceOf("0xc5aC64B5649509c87a1e7F9F0544521548381934")
    console.log(`${balance.toFixed()}, ${balance}, ${balance.toString()}`)
  }

  const Authorize = async () => {
    let signer = library.getSigner(account)
    let weth = new Erc20(ContractAddresses.WETH, signer)
    const tx = await weth.approve(ContractAddresses.NpicsProxy,new BigNumber('50000000000000').toString())
    await tx.wait()

  }

  

  const signTestMessage = async () => {
    console.log(dayjs())
    // console.log(dayjs().utcOffset())
    // try {
    //   let address = account!
    //   let msg = getSignMessage(address);
    //   let signatureMsg = await library.getSigner(account).signMessage(msg)
    //   await http.myPost("/npics-auth/app-api/v2/auth/token", {
    //     "address": address,
    //     "original": msg,
    //     "signature": signatureMsg
    //   })
    //   console.log(`signature => ${signatureMsg}`)
    // } catch (e) {
    //   console.log(`Error => ${e}`)
    // }
  }

  const getProvider = async () => {
    let c = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, library)
    console.log(`${await c.availableBorrowsInETH("0xc5aC64B5649509c87a1e7F9F0544521548381934")}`)
  }

  return <div>
    <div>
      New: <code>{account}</code><br/>
      Old: <code>{lastAccount.current}</code>
    </div>


    <button style={{"marginTop": "100px"}} onClick={connect}>Connect</button>
    <br/>
    <i>{account}</i>
    <br/>
    <span>{active}</span>
    <br/>
    <span>{JSON.stringify(error)}</span>
    <button onClick={callContract}>Sign Message</button>

    <button onClick={login}>Login</button>
    <br/>
    <code>{token}</code>
    <br/>
    <button onClick={gemTradeDetails}>GemTradeDetails</button>
    <button onClick={getDebtList}>Debt</button>
    <button onClick={repay}>RepayETH</button>
    <button onClick={buyWithErc20}>buyWithErc20</button>
    <button onClick={getWETHBalance}>GetWETHBalance</button>
    <br/>
    <button onClick={signTestMessage}>SignTestMessage</button>
    <button onClick={() => {
      action(fetchUser2())
    }}>FetchUser
    </button>
    <br/>
    <button onClick={getProvider}>getProvider</button>
    <button onClick={Authorize}>Authorize</button>
    <br/>
    <button onClick={() => {
      setCount(count + 1)
    }}>+1</button>
    <button onClick={() => { setCount(count - 1) }}>-1</button>
    <button onClick={() => {   console.log(params);console.log(state) }}>useparams</button>
    <div>{`New => ${count}, Old => ${lastCount.current}`}</div>
  </div>
}