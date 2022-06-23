import React, { useEffect, useState, useRef } from 'react'
import { Table, message, notification } from 'antd';
import { imgurl } from 'utils/globalimport';
import BigNumber from 'bignumber.js';
import http from 'utils/http'
import { ColumnsType } from 'antd/lib/table';
import { LendPool } from 'abi/LendPool'
import { useWeb3React } from '@web3-react/core';
import { getSignMessage } from 'utils/sign';
import { fetchUser, setIsLogin } from 'store/app';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { connectors } from 'utils/connectors';
import { SessionStorageKey } from 'utils/enums';
import { DataSource, DebtData, LiquidatePrice, BgTable, Record } from './Tableutils';
import { useNavigate } from "react-router-dom";
import aa from 'abi/aa.json'
import NotFound from 'component/NotFound';
interface Result {
  createTime: string,
  id: number,
  nftAddress: string,
  tokenId: string,
  userAddress: string,
  imageUrl: string,
  floorPrice: string,
  collectionName: string,
}

function MyAgreement() {
  const { activate, account, library } = useWeb3React()
  const [activities, setActivities] = useState<DataSource[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const action = useAppDispatch()
  const isLogin = useAppSelector(state => state.app.isLogin)
  const DebtPosition = useRef<DataSource[]>()
  const navigate = useNavigate() 
  const columns: ColumnsType<DataSource> = [
    {
      title: 'Asset',
      dataIndex: 'items',
      key: 'items',
      align: 'center',
      render: (text, row) => <div className='items' onClick={() => jumpToEthscan(row)}>
        <img className='avatar' src={row.imageUrl} alt="" />
        <div className='text'>
          <div>
            <span title={row.collectionName}>{row.collectionName}</span>
            <span>{`# ${row.tokenId}`}</span>

          </div>
          <div>
            Floor: <span><img src={imgurl.dashboard.greyPrice7} alt="" />{row.floorPrice}</span>
          </div>
        </div>
      </div>
    },
    {
      title: 'Minted NFT',
      dataIndex: 'contract',
      key: 'contract',
      align: 'center',
      render: (text, row) => <div className='contract' onClick={() => jumpToEthscan(row)}>
        <span title={row.collectionName}>NEO-{row.collectionName}</span>
        #{text}
        <img src={imgurl.dashboard.href} alt="" />
      </div>
    },
    {
      title: 'Debt',
      dataIndex: 'debtString',
      key: 'debtString',
      align: 'center',
      render: (text) => <div className='imgPrice'>
        <img src={imgurl.dashboard.redPrice14} alt="" />
        {text}
      </div>
    },
    {
      title: 'Liquidation Price',
      dataIndex: 'liquidationPrice',
      align: 'center',
      key: 'liquidationPrice',
      render: (text, row) => <div className='imgPrice'>
        <img src={imgurl.dashboard.redPrice14} alt="" />
        {new BigNumber(row.debt.toString()).div('0.9').div(10 ** 18).toFixed(4, 1)}
      </div>
    },
    {
      title: 'Health factor',
      dataIndex: 'healthFactor',
      align: 'center',
      key: 'healthFactor',
      render: (text) => <div className='healthFactor'>
        {text}
      </div>
    },
    {
      title: 'Status',
      dataIndex: 'statusSrt',
      key: 'statusSrt',
      align: 'center',
      render: (text) => <div className='status'>
        {text}
      </div>
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      render: (t, row: any) => row.statusSrt === "Terminated" ? <div /> : <div className='actionBtn' onClick={() => navigate(`/vaultsDetail/${row.address}/${row.tokenId}`)}>
        Repay
      </div>,
    },
  ]

  const jumpToEthscan = (e: DataSource) => {
    window.open(`https://etherscan.io/nft/${e.address}/${e.tokenId}`)
  }

  useEffect(() => {
    let token = sessionStorage.getItem("ACCESS_TOKEN")
    if (!token) {
      // login()
    }
    // eslint-disable-next-line
  }, [account])

  useEffect(() => {
    if (isLogin) {
      getNftActivities()
    }
    // eslint-disable-next-line
  }, [isLogin])

  useEffect(() => {
    if (account && !isLogin) {
      login2()
      console.log(`😈 ${isLogin}`)
    } else {
      if (!account) {
        activate(connectors.injected, (e) => {
          if (e.name === "UnsupportedChainIdError") {
            sessionStorage.removeItem(SessionStorageKey.WalletAuthorized)
            action(fetchUser(`{}`))
            notification.error({ message: "Prompt connection failed, please use the Ethereum network" })
          }
        })
      }
    }
    // eslint-disable-next-line
  }, [account, isLogin])

  async function login2() {
    try {
      let address = account!
      let msg = getSignMessage(address);
      let signatureMsg = await library.getSigner(account).signMessage(msg)
      const loginRep: any = await http.myPost("/npics-auth/app-api/v2/auth/token", {
        "address": address,
        "original": msg,
        "signature": signatureMsg
      })
      if (loginRep.code === 200) {
        sessionStorage.setItem("ACCESS_TOKEN", loginRep.data)
        action(setIsLogin(true))
      } else {
        message.warning('Signing failed')
      }
    } catch (e) {
      console.log(`Login Erro => ${e}`)
    }
  }
  const turnStr = (val: BigNumber) => {
    let factor = +(new BigNumber(val.toString()).div(10 ** 18).dp(0).toString())
    factor = Math.random() * 2
    if (factor >= 1.5) {
      return 'Inforce'
    } else if (factor >= 1 && factor < 1.5) {
      return 'In Risk'
    } else if (factor < 1) {
      return 'Terminated'
    }
    return ''
  }

  const getNftActivities = async () => {
    setLoading(true)
    const url = "/npics-nft/app-api/v1/neo/getRecord"
    const pageInside = {
      "pageIndex": 1,
      "pageSize": 10
    }
    try {
      const result: any = await http.myPost(url, pageInside)
      let orgData: Result[] = result.data.records
      orgData = aa.data.records
      if (result.code === 200 && orgData.length) {
        const signer = library.getSigner(account)
        let lendPool = new LendPool(signer)
        const len = orgData.length
        const promiseArray = []
        const promiseArray2 = []
        for (let i = 0; i < len; i++) {
          promiseArray.push(lendPool.getNftDebtData(orgData[i].nftAddress, orgData[i].tokenId))
          promiseArray2.push(lendPool.getNftLiquidatePrice(orgData[i].nftAddress, orgData[i].tokenId))
        }
        const values1: DebtData[] = await Promise.all(promiseArray)
        const values2: LiquidatePrice[] = await Promise.all(promiseArray2)
        const newArray: Record[] = []
        for (let i = 0; i < len; i++) {
          newArray.push({
            debtData: values1[i],
            liquidatePrice: values2[i],
            ...orgData[i]
          })
        }

        const slippage = (data: BigNumber) => {
          let val = BigNumber.minimum(data.multipliedBy(new BigNumber('0.001')), new BigNumber('0.01').multipliedBy(10 ** 18))
          return val
        }

        const dataSource: DataSource[] = []
        for (let i = 0; i < len; i++) {
          dataSource.push({
            key: `${i}`,
            items: newArray[i].tokenId,
            contract: newArray[i].tokenId,
            debtString: new BigNumber(newArray[i].debtData.totalDebt.toString()).div(10 ** 18).toFixed(4, 1) || `${i}`,
            debt: new BigNumber(newArray[i].debtData.totalDebt.toString()),
            maxDebt: new BigNumber(newArray[i].debtData.totalDebt.toString()).plus(slippage(new BigNumber(newArray[i].debtData.totalDebt.toString()))),
            liquidationPrice: new BigNumber(newArray[i].liquidatePrice.liquidatePrice.toString()).div(10 ** 18).toFixed(4, 1) || "--",
            healthFactor: new BigNumber(newArray[i].debtData.healthFactor.toString()).div(10 ** 18).toFixed(4, 1) || "--",
            status: new BigNumber(newArray[i].debtData.healthFactor.toString()).div(10 ** 18).toFixed(4, 1) || "--",
            statusSrt: turnStr(newArray[i].debtData.healthFactor),
            address: newArray[i].nftAddress,
            tokenId: newArray[i].tokenId,
            imageUrl: newArray[i].imageUrl,
            floorPrice: newArray[i].floorPrice,
            collectionName: newArray[i].collectionName,
          })
        }
        DebtPosition.current = dataSource
        setActivities(dataSource)
      } else {
        setActivities([])
      }
    } catch (e) {
      console.error(`Error => ${e}`)
    } finally {
      setLoading(false)
    }
  }
  return (<BgTable>
    {loading ? <div className='loading'><img src={imgurl.market.loading} alt="" /></div> : activities.length ? <Table
      columns={columns}
      dataSource={activities}
      pagination={false}
      className="ant-table-reset-white"
    ></Table> : <NotFound />}
  </BgTable>)

}

export default MyAgreement