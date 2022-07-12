import React, { useEffect, useState, useRef } from 'react'
import { Select, Table, message, notification } from 'antd';
import styled from 'styled-components';
import { imgurl } from 'utils/globalimport';
import BigNumber from 'bignumber.js';
import http from 'utils/http'
// import Recommend from './Recommend';
import { ColumnsType } from 'antd/lib/table';
import { BgTable, Record, DebtData, LiquidatePrice, DataSource } from './components/Tableutils'
import AgDetail from './components/AgDetail'
import { LendPool } from 'abis/LendPool'
import { useWeb3React } from '@web3-react/core';
import { useEthPrice, useUpdateEffect } from 'utils/hook';
import { getSignMessage } from 'utils/sign';
import { fetchUser } from 'store/app';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { connectors } from 'utils/connectors';
import { SessionStorageKey } from 'utils/enums';
const { Option } = Select
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

const Wrap = styled.div`
  .info {
    display: flex;
    justify-content: space-between;
    .total {
      .title {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 800;
        font-size: 30px;
        color: #fff;
      }
      .total-information {
        color: rgba(255, 255, 255, .5);
        font-size: 14px;
        font-weight: 600;
        & > span:nth-child(1) {
          margin-right: 40px;
        }
        & > span:nth-child(2) {
          margin-right: 20px;
          & > img {
            margin-right: 10px;
            margin-bottom: 5px;
          }
        }
      }
    }

    .ant-select {
      align-self: end;
      min-width: 120px;
      height: 42px;
      border: 1px solid rgba(255, 255, 255, .5);
      border-radius: 10px;
      .ant-select-arrow {
        color: #fff;
      }
      .ant-select-selector {
        background-color: transparent;
        color: rgba(255, 255, 255, .5);
        border: none !important;
        box-shadow: none !important;
        border-color: rgba(255, 255, 255, .5);
        text-align: center;
        height: 42px;
        display: flex;
        align-items: center;
      }
    }

  .recommend {
    margin-top: 50px;
    margin-bottom: 87px;

    .title {
      font-family: 'PingFang HK';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      color: #fff;
    }
  }
  }
  .table {
    margin-top: 20px;
  }
`
function MyAgreement() {
  // const { activate, account, library } = useWeb3React()
  const [activities, setActivities] = useState<DataSource[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false)
  const [detailInfo, setDetailInfo] = useState<DataSource>()
  const [totalDebt, setTotalDebt] = useState<BigNumber>(new BigNumber(0))
  const [sortedInfo, setSortedInfo] = useState("All")
  const DollarDebt = useEthPrice(totalDebt)
  const action = useAppDispatch()
  // const currentUser = useAppSelector(updater => deserialize(User, updater.app.currentUser))
  const isLogin = useAppSelector(state => state.app.isLogin)
  const DebtPosition = useRef<DataSource[]>()
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
      render: (text,row) => <div className='contract' onClick={() => jumpToEthscan(row)}>
        <span title={row.collectionName}>{row.collectionName}</span>
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
      render: (text,row) => <div className='imgPrice'>
        <img src={imgurl.dashboard.redPrice14} alt="" />
        {new BigNumber(row.debt.toString()).div('0.9').div(10 ** 18).toFixed(4,1)}
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
      render: (t, row: any) => <div className='actionBtn' onClick={() => showDetail(row)}>
        Detail
      </div>,
    },
  ]

  const jumpToEthscan = (e: DataSource) => {
    window.open(`https://etherscan.io/nft/${e.address}/${e.tokenId}`)
  }

  // useEffect(() => {
  //   let token = sessionStorage.getItem("ACCESS_TOKEN")
  //   if (!token) {
  //     // login()
  //   }
  //   // eslint-disable-next-line
  // }, [account])

  const onSelect = (val: string) => {
    setSortedInfo(val)
  }
  useUpdateEffect(() => {
    if(!DebtPosition.current) return
    if(sortedInfo === 'All') {
      setActivities(DebtPosition.current)
      return
    }
    const result = DebtPosition.current.filter((item) => {
      return item.statusSrt === sortedInfo
    })
    setActivities(result)
  },[sortedInfo])

  const showDetail = (data: React.SetStateAction<DataSource | undefined>) => {
    setDetailInfo(data)
    setIsShowDetail(true)
  }

  useEffect(() => {
    if (!activities) return
    let orgTotalDebt = new BigNumber(0)
    const Debt = activities.reduce((previousValue,currentValue) => {
      return previousValue.plus(new BigNumber(currentValue.debt))
    },orgTotalDebt)

    setTotalDebt(Debt)
    // eslint-disable-next-line
  }, [activities])

  useEffect(() => {
    if (isLogin) {
      getNftActivities()
    }
    // eslint-disable-next-line
  }, [isLogin])

  // useEffect(() => {
  //   if (account && !isLogin) {
  //     login2()
  //     console.log(`😈 ${isLogin}`)
  //   } else {
  //     if (!account) {
  //       activate(connectors.injected,(e) => {
  //         if(e.name === "UnsupportedChainIdError") {
  //           sessionStorage.removeItem(SessionStorageKey.WalletAuthorized)
  //           action(fetchUser(`{}`))
  //           notification.error({message: "Prompt connection failed, please use the Ethereum network"})
  //         }
  //       })
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [account, isLogin])

  async function login2() {
    // try {
      // let address = account!
    //   let msg = getSignMessage(address);
    //   let signatureMsg = await library.getSigner(account).signMessage(msg)
    //   const loginRep: any = await http.myPost("/npics-auth/app-api/v2/auth/token", {
    //     "address": address,
    //     "original": msg,
    //     "signature": signatureMsg
    //   })
    //   if (loginRep.code === 200) {
    //     sessionStorage.setItem("ACCESS_TOKEN", loginRep.data)
    //     action(setIsLogin(true))
    //   } else {
    //     message.warning('Signing failed')
    //   }
    // } catch (e) {
    //   console.log(`Login Erro => ${e}`)
    // }
  }
  const turnStr = (val: BigNumber) => {
    let factor = +(new BigNumber(val.toString()).div(10 ** 18).dp(0).toString())
    if (factor >= 1.5) {
      return 'Inforce'
    } else if ( factor >= 1 && factor < 1.5) {
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
    // try {
    //   const result: any = await http.myPost(url, pageInside)
    //
    //   let orgData: Result[] = result.data.records
    //   if (result.code === 200 && orgData.length) {
    //     const signer = library.getSigner(account)
    //     let lendPool = new LendPool(signer)
    //     const len = orgData.length
    //     const promiseArray = []
    //     const promiseArray2 = []
    //     for (let i = 0; i < len; i++) {
    //       promiseArray.push(lendPool.getNftDebtData(orgData[i].nftAddress, orgData[i].tokenId))
    //       promiseArray2.push(lendPool.getNftLiquidatePrice(orgData[i].nftAddress, orgData[i].tokenId))
    //     }
    //     const values1: DebtData[] = await Promise.all(promiseArray)
    //     const values2: LiquidatePrice[] = await Promise.all(promiseArray2)
    //     const newArray: Record[] = []
    //     for (let i = 0; i < len; i++) {
    //       newArray.push({
    //         debtData: values1[i],
    //         liquidatePrice: values2[i],
    //         ...orgData[i]
    //       })
    //     }
    //
    //     const slippage = (data: BigNumber) => {
    //       let val = BigNumber.minimum(data.multipliedBy(new BigNumber('0.001')), new BigNumber('0.01').multipliedBy(10 ** 18))
    //       return val
    //     }
    //
    //     const dataSource: DataSource[] = []
    //     for (let i = 0; i < len; i++) {
    //     dataSource.push({
    //         key: `${i}`,
    //         items: newArray[i].tokenId,
    //         contract: newArray[i].tokenId,
    //         debtString: new BigNumber(newArray[i].debtData.totalDebt.toString()).div(10 ** 18).toFixed(4, 1) || `${i}`,
    //         debt: new BigNumber(newArray[i].debtData.totalDebt.toString()),
    //         maxDebt: new BigNumber(newArray[i].debtData.totalDebt.toString()).plus(slippage(new BigNumber(newArray[i].debtData.totalDebt.toString()))),
    //         liquidationPrice: new BigNumber(newArray[i].liquidatePrice.liquidatePrice.toString()).div(10 ** 18).toFixed(4, 1) || "--",
    //         healthFactor: new BigNumber(newArray[i].debtData.healthFactor.toString()).div(10 ** 18).toFixed(4, 1) || "--",
    //         status: new BigNumber(newArray[i].debtData.healthFactor.toString()).div(10 ** 18).toFixed(4, 1) || "--",
    //         statusSrt: turnStr(newArray[i].debtData.healthFactor),
    //         address: newArray[i].nftAddress,
    //         tokenId: newArray[i].tokenId,
    //         imageUrl: newArray[i].imageUrl,
    //         floorPrice: newArray[i].floorPrice,
    //         collectionName: newArray[i].collectionName,
    //       })
    //     }
    //     DebtPosition.current = dataSource
    //     setActivities(dataSource)
    //   }
    // } catch (e) {
    //   console.error(`Error => ${e}`)
    // } finally {
    //   setLoading(false)
    // }
  }
  return (<Wrap>
    {isShowDetail ? <AgDetail setIsShowDetail={setIsShowDetail} detailInfo={detailInfo} /> : <div>
      <div className='info'>
        <div className='total'>
          <div className='title'>
            My Vaults
          </div>
          <div className='total-information'>
            <span>Total Debt</span>
            <span>
              <img src={imgurl.dashboard.price_icon} alt="" />
              {totalDebt && totalDebt.div(10 ** 18).toFixed(3, 1)}
            </span>
            <span>{`($${DollarDebt?.dp(0).toFixed()})`}</span>
          </div>
        </div>
        <Select
          onSelect={onSelect}
          defaultValue="All"
          dropdownClassName="ant-selectDropDown-reset"
        >
          <Option value="All">All</Option>
          <Option value="Inforce">Inforce</Option>
          <Option value="In Risk">In Risk</Option>
          <Option value="Terminated">Terminated</Option>
        </Select>
      </div>
      <div className='table'>
        <BgTable>
          {loading ? <div className='loading'><img src={imgurl.market.loading} alt="" /></div> : <Table
            columns={columns}
            dataSource={activities}
            pagination={false}
            className="ant-table-reset"
          ></Table>}
        </BgTable>
      </div>
      {/* <div className='recommend'>
        <div className='title'>
          More NFTs Choice!
        </div>
        <div>
          <Recommend></Recommend>
        </div>
      </div> */}
    </div>}
  </Wrap>)

}

export default MyAgreement