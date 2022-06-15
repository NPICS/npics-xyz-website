import React, { useEffect, useState } from 'react'
import { Select, Table, message, notification } from 'antd';
import styled from 'styled-components';
import { imgurl } from 'utils/globalimport';
import BigNumber from 'bignumber.js';
import http from 'utils/http'
// import Recommend from './Recommend';
import { ColumnsType } from 'antd/lib/table';
import { BgTable, Record, DebtData, LiquidatePrice, DataSource } from './components/Tableutils'
import AgDetail from './components/AgDetail'
import { LendPool } from 'abi/LendPool'
import { useWeb3React } from '@web3-react/core';
import { useEthPrice } from 'utils/hook';
import { SortOrder } from 'antd/lib/table/interface';
import { getSignMessage } from 'utils/sign';
import { fetchUser, setIsLogin } from 'store/app';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { connectors } from 'utils/connectors';
import { SessionStorageKey } from 'utils/enums';
// import {deserialize} from "class-transformer";
// import { deserialize } from "class-transformer";
// import { User } from "../../../model/user";
// import { SessionStorageKey } from "../../../utils/enums";

const { Option } = Select

interface Result {
  createTime: string,
  id: number,
  nftAddress: string,
  tokenId: string,
  userAddress: string,
  imageUrl: string,
  floorPrice: string
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
        font-size: .3rem;
        color: #FFFFFF;
      }

      & > div:nth-child(2) {
        color: rgba(255, 255, 255, .5);
        font-size: .14rem;
        font-weight: 600;

        & > span:nth-child(1) {
          margin-right: .4rem;
        }

        & > span:nth-child(2) {
          margin-right: .2rem;

          & > img {
            margin-right: .1rem;
            margin-bottom: .05rem;
          }
        }
      }
    }

    .ant-select {
      align-self: end;
      width: 2.48rem;
      height: 0.42rem;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 0.1rem;
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
        height: 0.42rem;
        display: flex;
        align-items: center;
      }
    }

  .recommend {
    margin-top: .5rem;
    margin-bottom: .87rem;

    .title {
      font-family: 'PingFang HK';
      font-style: normal;
      font-weight: 500;
      font-size: .2rem;
      color: #FFFFFF;
    }
  }
  }
  .table {
    margin-top: .2rem;
  }
`

function MyAgreement() {
  const { activate, account, library } = useWeb3React()
  const [activities, setActivities] = useState<DataSource[]>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false)
  const [detailInfo, setDetailInfo] = useState<DataSource>()
  const [totalDebt, setTotalDebt] = useState<BigNumber>(new BigNumber(0))
  const [sortedInfo, setSortedInfo] = useState<SortOrder>("descend")
  const DollarDebt = useEthPrice(totalDebt)
  const action = useAppDispatch()
  // const currentUser = useAppSelector(state => deserialize(User, state.app.currentUser))
  const isLogin = useAppSelector(state => state.app.isLogin)

  const columns: ColumnsType<DataSource> = [
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      align: 'center',
      render: (text, row) => <div className='items'>
        <img className='avatar' src={row.imageUrl} alt="" />
        <div className='text'>
          <div>
            {`#${row.tokenId}`}
          </div>
          <div>
            Floor: <span><img src={imgurl.dashboard.greyPrice7} alt="" />{row.floorPrice}</span>
          </div>
        </div>
      </div>
    },
    {
      title: 'Contract No.',
      dataIndex: 'contract',
      key: 'contract',
      align: 'center',
      render: (text) => <div className='contract'>
        {text}
        <img src={imgurl.dashboard.href} alt="" />
      </div>
    },
    {
      title: 'Debt',
      dataIndex: 'debtString',
      key: 'debtString',
      align: 'center',
      sorter: (a, b) => +a.debtString - +b.debtString,
      sortOrder: sortedInfo,
      render: (text) => <div className='imgPrice'>
        <img src={imgurl.dashboard.redPrice14} alt="" />
        {text}
      </div>
    },
    {
      title: 'Interest',
      dataIndex: 'interest',
      key: 'interest',
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

  useEffect(() => {
    let token = sessionStorage.getItem("ACCESS_TOKEN")
    if (!token) {
      // login()
    }
    // eslint-disable-next-line
  }, [account])

  const onSelect = (val: string) => {
    let value: SortOrder = null
    if (val === 'ascend') {
      value = 'ascend'
    }
    if (val === 'descend') {
      value = 'descend'
    }
    setSortedInfo(value)
  }

  const showDetail = (data: React.SetStateAction<DataSource | undefined>) => {
    setDetailInfo(data)
    setIsShowDetail(true)
  }

  useEffect(() => {
    if (!activities) return
    let orgTotalDebt = new BigNumber(0)
    for (let i = 0; i < activities.length; i++) {
      orgTotalDebt.plus(activities[i].debt)
    }
    setTotalDebt(orgTotalDebt)
    // eslint-disable-next-line
  }, [activities])

  useEffect(() => {
    if (isLogin) {
      getNftActivities()
    }
    // eslint-disable-next-line
  }, [isLogin])
  // useEffect(() => {
  //   let token = sessionStorage.getItem(SessionStorageKey.AccessToken)
  //   if (token) {
  //     getNftActivities().then(() => {})
  //   }
  // }, [])

  useEffect(() => {
    if (account && !isLogin) {
      login2()
      console.log(`😈 ${isLogin}`)
    } else {
      if (!account) {
        activate(connectors.injected,(e) => {
          if(e.name === "UnsupportedChainIdError") {
            sessionStorage.removeItem(SessionStorageKey.WalletAuthorized)
            action(fetchUser(`{}`))
            notification.error({message: "Prompt connection failed, please use the Ethereum network"})
          }
        })
      }
    }
    // eslint-disable-next-line
  }, [account, isLogin])

  // useEffect(() => {
  //   let token = sessionStorage.getItem(SessionStorageKey.AccessToken)
  //   if (account && token == null) {
  //     login2()
  //   }
  // }, [account])



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

  const getNftActivities = async () => {
    setLoading(true)
    const url = "/npics-nft/app-api/v1/neo/getRecord"
    const pageInside = {
      "pageIndex": 1,
      "pageSize": 10
    }
    try {
      const result: any = await http.myPost(url, pageInside)

      const orgData: Result[] = result.data
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

        const turnStr = (val: BigNumber) => {
          const factor = +(new BigNumber(val.toString()).div(10 ** 18).dp(0).toString())
          if (factor >= 3) {
            return 'Safe'
          } else if (2 <= factor && factor < 3) {
            return 'Careful'
          } else if (1 < factor && factor < 2) {
            return 'Risky'
          } else if (0 <= factor && factor < 1) {
            return 'Dangerous'
          }
          return '--'
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
            interest: "--",
            liquidationPrice: new BigNumber(newArray[i].liquidatePrice.liquidatePrice.toString()).div(10 ** 18).toFixed(4, 1) || "--",
            healthFactor: new BigNumber(newArray[i].debtData.healthFactor.toString()).div(10 ** 18).toFixed(4, 1) || "--",
            status: new BigNumber(newArray[i].debtData.healthFactor.toString()).div(10 ** 18).toFixed(4, 1) || "--",
            statusSrt: turnStr(newArray[i].debtData.healthFactor),
            address: newArray[i].nftAddress,
            tokenId: newArray[i].tokenId,
            imageUrl: newArray[i].imageUrl,
            floorPrice: newArray[i].floorPrice,
          })
        }
        setActivities(dataSource)
      }
    } catch (e) {
      console.error(`Error => ${e}`)
    } finally {
      setLoading(false)
    }
  }


  return (<Wrap>
    {isShowDetail ? <AgDetail setIsShowDetail={setIsShowDetail} detailInfo={detailInfo} /> : <div>
      <div className='info'>
        <div className='total'>
          <div className='title'>
            My Agreement
          </div>
          <div>
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
          defaultValue="ascend"
          dropdownClassName="ant-selectDropDown-reset"
        >
          <Option value="ascend">Price: Low to High</Option>
          <Option value="descend">Price: high to low</Option>
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