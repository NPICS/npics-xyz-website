import React, { useEffect, useState, useRef } from 'react'
import { Table, message, notification, Modal } from 'antd';
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
import NotFound from 'component/NotFound';
import { useUpdateEffect } from 'utils/hook';
// import aa from 'abi/aa.json'
import { Flex, Grid, Icon, Typography } from 'component/Box';
import { globalConstant } from 'utils/globalConstant';
import styled from 'styled-components';
import ButtonDefault from 'component/ButtonDefault';
interface Result {
  createTime: string,
  id: number,
  nftAddress: string,
  neoAddress: string,
  tokenId: string,
  userAddress: string,
  imageUrl: string,
  floorPrice: BigNumber,
  collectionName: string,
  ltv: BigNumber,
  purchaseFloorPrice: BigNumber,
}

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
  }
  .ant-modal-body {
    padding: .24rem;
    line-height: 1.2 !important;
  }
  .ant-modal-header {
    display: none;
  }
  .ant-modal-close {
    display: none;
  }
`

interface IProps {
  setTotalDebts: React.Dispatch<React.SetStateAction<BigNumber>>
  sortedInfo: string
}

function MyAgreement(props: IProps) {
  const { activate, account, library } = useWeb3React()
  const [activities, setActivities] = useState<DataSource[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
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
            Floor: <span><img src={imgurl.dashboard.ethGrey18} alt="" />{row.floorPrice.div(10 ** globalConstant.bit).toFixed(2, 1)}</span>
          </div>
        </div>
      </div>
    },
    {
      title: 'Minted NFT',
      dataIndex: 'contract',
      key: 'contract',
      align: 'center',
      render: (text, row) => <div className='contract' onClick={() => jumpToNEOEthscan(row)}>
        <span title={row.collectionName}>NEO-{row.collectionName}</span>
        #{text}
        <Icon width=".16rem" height=".16rem" src={imgurl.dashboard.exportBlack18} alt="" />
      </div>
    },
    {
      title: 'Debt',
      dataIndex: 'debtString',
      key: 'debtString',
      align: 'center',
      render: (text) => <div className='imgPrice'>
        <Icon width=".18rem" height=".18rem" src={imgurl.dashboard.ethBlack18} alt="" />
        {text}
      </div>
    },
    {
      title: 'Liquidation Price',
      dataIndex: 'liquidationPrice',
      align: 'center',
      key: 'liquidationPrice',
      render: (text, row) => <div className='imgPrice'>
        <Icon width=".18rem" height=".18rem" src={imgurl.dashboard.ethBlack18} alt="" />
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
    if(e.statusSrt === 'Terminated') return
    navigate(`/vaultsDetail/${e.address}/${e.tokenId}`)
  }
  const jumpToNEOEthscan = (e: DataSource) => {
    if(e.statusSrt === 'Terminated') return
    window.open(`https://cn.etherscan.com/nft/${e.neoAddress}/${e.tokenId}`)
  }

  useUpdateEffect(() => {
    if (!DebtPosition.current) return
    if (props.sortedInfo === 'All') {
      setActivities(DebtPosition.current)
      return
    }
    const result = DebtPosition.current.filter((item) => {
      return item.statusSrt === props.sortedInfo
    })
    setActivities(result)
  }, [props.sortedInfo])

  useEffect(() => {
    if (!activities) return
    let orgTotalDebt = new BigNumber(0)
    const Debt = activities.reduce((previousValue, currentValue) => {
      return previousValue.plus(new BigNumber(currentValue.debt))
    }, orgTotalDebt)

    props.setTotalDebts(Debt)
    // eslint-disable-next-line
  }, [activities])

  useEffect(() => {
    if (isLogin) {
      setShowModal(false)
      getNftActivities()
    } else {
      setShowModal(true)
    }
    // eslint-disable-next-line
  }, [isLogin, account])

  useEffect(() => {
    console.log('isLogin',isLogin);
  },[isLogin])


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
    // factor = Math.random()*2
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
      "pageSize": 30
    }
    try {
      const result: any = await http.myPost(url, pageInside)
      let orgData: Result[] = result.data.records
      // orgData = aa.data.records
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
            neoAddress: newArray[i].neoAddress,
            tokenId: newArray[i].tokenId,
            imageUrl: newArray[i].imageUrl,
            floorPrice: new BigNumber(newArray[i].floorPrice),
            collectionName: newArray[i].collectionName,
            ltv: newArray[i].ltv,
            purchaseFloorPrice: newArray[i].purchaseFloorPrice,
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

  const ConfirmModal = (props: {
    enter?(): void
  }) => <Grid gridGap=".3rem">
      <Flex alignItems="center" justifyContent="space-between" marginBottom=".3rem">
        <Typography></Typography>
        <Typography fontSize=".3rem" fontWeight="800" color="#000">Verify Address</Typography>
        <div style={{ cursor: 'pointer' }}><Icon width=".24rem" height=".24rem" src={imgurl.dashboard.Cancel} onClick={() => {
          setShowModal(false)
        }} /></div>
      </Flex>

      <Typography>You will be asked to sign a message in your wallet to verify you as the owner of the address.</Typography>
      <Flex justifyContent="space-evenly">
        <ButtonDefault width='2rem' height='.52rem' types='second' color='#000' onClick={() => { setShowModal(false) }}>Cancel</ButtonDefault>
        <ButtonDefault width='2rem' height='.52rem' types='normal' color='#fff' onClick={() => {
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
          setShowModal(false)
        }}>OK</ButtonDefault>
      </Flex>
    </Grid>

  return (<BgTable>
    {loading ? <div className='loading'><img src={imgurl.market.progressIcon} alt="" /></div> : activities.length ? <Table
      columns={columns}
      dataSource={activities}
      pagination={false}
      className="ant-table-reset-white"
    ></Table> : <NotFound />}
    <StyledModal
      visible={showModal}
      footer={null}
      onCancel={() => { setShowModal(false) }}
      destroyOnClose={true}
      centered={true}
      width='5.48rem'
    >
      <ConfirmModal />
    </StyledModal>
  </BgTable>)

}

export default MyAgreement