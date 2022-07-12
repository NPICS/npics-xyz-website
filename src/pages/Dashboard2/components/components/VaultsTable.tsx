import React, { useEffect, useRef, useState } from 'react'
import { message, Modal, notification, Table } from 'antd';
import { imgurl } from 'utils/globalimport';
import BigNumber from 'bignumber.js';
import http from 'utils/http'
import { ColumnsType } from 'antd/lib/table';
import { LendPool } from 'abis/LendPool'
import { useWeb3React } from '@web3-react/core';
import { getSignMessage } from 'utils/sign';
import {fetchUser, updateLoginState} from 'store/app';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { connectors } from 'utils/connectors';
import { SessionStorageKey } from 'utils/enums';
import { BgTable, DataSource, DebtData, LiquidatePrice, Record, DataSource2 } from './StyledInterface';
import { useNavigate } from "react-router-dom";
import NotFound from 'component/NotFound';
import { useUpdateEffect } from 'utils/hook';
import { Flex, Grid, Icon, Typography } from 'component/Box';
import { globalConstant } from 'utils/globalConstant';
import styled from 'styled-components';
import ButtonDefault from 'component/ButtonDefault';
import { thousandFormat } from "../../../../utils/urls";
import { deserializeArray, plainToClass } from 'class-transformer';
import {CHAIN_ID, injected} from 'connectors/hooks';
// import { aa } from './data'
import { TextPlaceholder } from 'component/styled';
import { useAsync } from 'react-use';

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
  status: number
}

enum Color {
  'Inforce' = "#7BD742",
  'In Risk' = "#FFD43B",
  'In Liquidation' = "#FF4949",
  'Terminated' = "#7F7F7F"
}

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
  }
  .ant-modal-body {
    padding: .4rem .5rem;
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

function VaultsTable(props: IProps) {
  const { account, provider} = useWeb3React()
  const [activities, setActivities] = useState<DataSource2[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const action = useAppDispatch()
  const isLogin = useAppSelector(state => state.app.isLogin)
  const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
  const DebtPosition = useRef<DataSource2[]>()
  const navigate = useNavigate()
  const columns: ColumnsType<DataSource2> = [
    {
      title: 'Asset',
      dataIndex: 'items',
      key: 'items',
      align: 'center',
      onCell: (row) => ({style: {backgroundColor: row.terminated() ? 'rgba(0, 0, 0, 0.03)' : ''}}),
      render: (text, row) => {
      return <div className='items' style={{ cursor: `${row.terminated() ? '' : 'pointer'}` }} onClick={() => jumpToEthscan(row)}>
        <img className='avatar' src={row.imageUrl} alt="" />
        <div className='text'>
          <div>
            <span title={row.singularForName()}>{row.singularForName()}</span>
            <span>&nbsp;{`#${row.tokenId}`}</span>
          </div>
          <div>
            Floor: <span>
              <img src={imgurl.dashboard.ethGrey18} alt="" />
              {row.floorPrice.div(10 ** globalConstant.bit).toFixed(2, 1)}
              <Typography marginLeft=".05rem">{`(${thousandFormat(row.floorPrice.times(ethRate)
                .div(10 ** 18)
                .toNumber())})`}</Typography>
            </span>
          </div>
        </div>
      </div>}
    },
    {
      title: 'NEO NFT',
      dataIndex: 'contract',
      key: 'contract',
      align: 'center',
      onCell: (row) => ({style: {backgroundColor: row.terminated() ? 'rgba(0, 0, 0, 0.03)' : ''}}),
      render: (text, row) => <div className='contract' style={{ cursor: `${row.terminated() ? '' : 'pointer'}` }} onClick={() => jumpToNEOEthscan(row)}>
        <span title={row.singularForName()}>NEO {row.singularForName()}</span>
        &nbsp;{`#${row.tokenId}`}
        {row.terminated() ? null : <Icon width=".16rem" height=".16rem" src={imgurl.dashboard.exportBlack18} alt="" />}
      </div>
    },
    {
      title: 'Debt',
      dataIndex: 'debtString',
      key: 'debtString',
      align: 'center',
      width: '1.8rem',
      onCell: (row) => ({style: {backgroundColor: row.terminated() ? 'rgba(0, 0, 0, 0.03)' : ''}}),
      render: (text, row) => row.terminated() ? TextPlaceholder : <Flex className='imgPrice' flexDirection='column'>
        <Flex alignItems='center' marginBottom=".04rem">
          <Icon width=".18rem" height=".18rem" src={imgurl.dashboard.ethBlack18} alt="" />
          {row.debtString()}
        </Flex>
        <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)">
          {`(${thousandFormat(row.totalDebt.times(ethRate)
            .div(10 ** 18)
            .toNumber())})`}
        </Typography>
      </Flex>
    },
    {
      title: 'Liquidation Price',
      dataIndex: 'liquidationPrice',
      align: 'center',
      key: 'liquidationPrice',
      onCell: (row) => ({style: {backgroundColor: row.terminated() ? 'rgba(0, 0, 0, 0.03)' : ''}}),
      render: (text, row) => row.terminated() ? TextPlaceholder : <Flex className='imgPrice' flexDirection='column'>
        <Flex alignItems='center' marginBottom=".04rem">
          <Icon width=".18rem" height=".18rem" src={imgurl.dashboard.ethBlack18} alt="" />
          {row.liquidationPrice().div(10 ** 18).toFixed(4, 1)}
        </Flex>
        <Typography fontSize=".14rem" fontWeight="500" color="rgba(0,0,0,.5)" >{`(${thousandFormat(row.liquidationPrice().times(ethRate)
          .div(10 ** 18)
          .toNumber())})`}</Typography>
      </Flex>
    },
    {
      title: 'Health Factor',
      dataIndex: 'healthFactor',
      align: 'center',
      key: 'healthFactor',
      width: '1.8rem',
      onCell: (row) => ({style: {backgroundColor: row.terminated() ? 'rgba(0, 0, 0, 0.03)' : ''}}),
      render: (text,row) => row.terminated() ? TextPlaceholder : <div className='healthFactor'>
        {row.healthFactor.div(10 ** 18).toFixed(4, 1)}
      </div>
    },
    {
      title: 'Status',
      dataIndex: 'factorStatus',
      key: 'factorStatus',
      align: 'center',
      width: '1.8rem',
      onCell: (row) => ({style: {backgroundColor: row.terminated() ? 'rgba(0, 0, 0, 0.03)' : ''}}),
      render: (text,row) => <div className='status' style={{ color: `${Color[text as 'Inforce' | 'In Risk' | 'In Liquidation' | 'Terminated']}` }}>
        {row.factorStatus}
      </div>
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      width: '1.8rem',
      onCell: (row) => ({style: {backgroundColor: row.terminated() ? 'rgba(0, 0, 0, 0.03)' : ''}}),
      render: (t, row) => row.terminated() ? <div /> : <Flex alignItems='center' justifyContent='center'>
        <ButtonDefault height='.48rem' minWidth='1.2rem' types='normal' onClick={() => navigate(`/vaultsDetail/${row.nftAddress}/${row.tokenId}`)}>
          Repay
        </ButtonDefault>
      </Flex>,
    },
  ]

  const jumpToEthscan = (e: DataSource2) => {
    if (e.terminated()) return
    navigate(`/vaultsDetail/${e.nftAddress}/${e.tokenId}`)
  }
  const jumpToNEOEthscan = (e: DataSource2) => {
    if (e.terminated()) return
    window.open(`https://cn.etherscan.com/nft/${e.neoAddress}/${e.tokenId}`)
  }

  useUpdateEffect(() => {
    if (!DebtPosition.current) return
    if (props.sortedInfo === 'All') {
      setActivities(DebtPosition.current)
      return
    }
    const result = DebtPosition.current.filter((item) => {
      return item.factorStatus === props.sortedInfo
    })
    setActivities(result)
  }, [props.sortedInfo])

  useEffect(() => {
    if (!activities) return
    let orgTotalDebt = new BigNumber(0)
    const Debt = activities.reduce((previousValue, currentValue) => {
      return previousValue.plus(new BigNumber(currentValue.totalDebt))
    }, orgTotalDebt)

    props.setTotalDebts(Debt)
    // eslint-disable-next-line
  }, [activities])

  // useEffect(() => {
  //   if (isLogin) {
  //     setShowModal(false)
  //     getNftActivities()
  //   } else {
  //     setShowModal(true)
  //   }
  //   // eslint-disable-next-line
  // }, [isLogin, account,provider])
  //
  // useEffect(() => {
  //   if(account && !isLogin) {
  //     setShowModal(true)
  //   }
  // },[account,isLogin])

  // useAsync(async() => {
  //   if(!account) {
  //     try{
  //       await injected.activate(1)
  //     }catch(e:any){
  // notification.error({ message: e.message})
  //     }
  //   }
  // },[])

  useAsync(async () => {
    if (isLogin) {
      setShowModal(false)
      await getNftActivities()
    } else {
      if (account) {
        setShowModal(true)
      } else {
        await injected.activate(CHAIN_ID)
      }
    }
  }, [isLogin, account, provider])


  async function login2() {
    if(!provider) return
    // TODO: library -> provider
    try {
      let address = account!
      let msg = getSignMessage(address);
      let signatureMsg = await provider.getSigner(account).signMessage(msg)
      const loginRep: any = await http.myPost("/npics-auth/app-api/v2/auth/token", {
        "address": address,
        "original": msg,
        "signature": signatureMsg
      })
      if (loginRep.code === 200) {
        sessionStorage.setItem(SessionStorageKey.AccessToken, loginRep.data)
        // action(setIsLogin(true))
        action(updateLoginState())
      } else {
        message.warning('Signing failed')
      }
    } catch (e) {
      setShowModal(false)
    }
  }

  const numberToString = (val: BigNumber) => {
    if(!val) return
    let factor = +(new BigNumber(val.toString()).div(10 ** 18).dp(0).toString())
    // factor = Math.random() * 2
    if (factor >= 1.5) {
      return 'Inforce'
    } else if (factor >= 1 && factor < 1.5) {
      return 'In Risk'
    } else if (0 < factor && factor < 1) {
      return 'In Liquidation'
    } else if (factor <= 0) {
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
      let orgData: any[] = result.data.records
      console.log(account,provider)
      // let orgData: any = aa.data.records
      if(!provider || !account) return
      if (result.code === 200 && orgData.length) {
        const signer = provider.getSigner(account)
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
        const newArray: DataSource2[] = []
        for (let i = 0; i < len; i++) {
          values1[i].totalDebt = new BigNumber(values1[i].totalDebt.toString())
          values1[i].healthFactor = new BigNumber(values1[i].healthFactor.toString())
          values1[i].totalCollateral = new BigNumber(values1[i].totalCollateral.toString())
          values1[i].availableBorrows = new BigNumber(values1[i].availableBorrows.toString())
          values2[i].liquidatePrice = new BigNumber(values2[i].liquidatePrice.toString())
          values2[i].paybackAmount = new BigNumber(values2[i].paybackAmount.toString())
          newArray.push({
            ...values1[i],
            ...values2[i],
            ...orgData[i]
          })
        }
        let listData = deserializeArray(DataSource2, JSON.stringify(newArray))
        const dataSource: DataSource2[] = []
        for (let i = 0; i < len; i++) {
          const healthFactor = listData[i].status ? new BigNumber(0) : listData[i].healthFactor
          const liquidatePrice = listData[i].status ? new BigNumber(0) : listData[i].liquidatePrice
          const totalDebt = listData[i].status ? new BigNumber(0) : listData[i].totalDebt
          dataSource.push({
            key: `${i}`,
            liquidatePrice: liquidatePrice,
            paybackAmount: listData[i].paybackAmount,
            healthFactor: healthFactor,
            status: listData[i].status,
            factorStatus: numberToString(healthFactor) as string,
            nftAddress: listData[i].nftAddress,
            neoAddress: listData[i].neoAddress,
            tokenId: listData[i].tokenId,
            imageUrl: listData[i].imageUrl,
            floorPrice: listData[i].floorPrice,
            ltv: listData[i].ltv,
            collectionName: listData[i].collectionName,
            purchaseFloorPrice: listData[i].purchaseFloorPrice,
            id: listData[i].id,
            createTime: listData[i].createTime,
            userAddress: listData[i].userAddress,
            loanId: listData[i].loanId,
            reserveAsset: listData[i].reserveAsset,
            totalCollateral: listData[i].totalCollateral,
            totalDebt: totalDebt,
            maxTotalDebt: listData[i].maxTotalDebt,
            debtString: listData[i].debtString,
            availableBorrows: listData[i].availableBorrows,
            liquidationPrice: listData[i].liquidationPrice,
            terminated: listData[i].terminated,
            singularForName: listData[i].singularForName
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
      <Flex alignItems="center" justifyContent="space-between" >
        <Typography></Typography>
        <Typography fontSize=".3rem" fontWeight="800" color="#000">Verify Address</Typography>
        <Typography></Typography>
        {/* <div style={{ cursor: 'pointer' }}><Icon width=".24rem" height=".24rem" src={imgurl.dashboard.Cancel} onClick={() => {
          setShowModal(false)
        }} /></div> */}
      </Flex>

      <Typography >You will be asked to sign a message in your wallet to verify you as the owner of the address.</Typography>
      <Flex gap=".2rem" justifyContent='center' marginTop=".3rem" >
        <ButtonDefault minWidth='2rem' height='.52rem' types='second' color='#000' onClick={() => { setShowModal(false) }}>Cancel</ButtonDefault>
        <ButtonDefault minWidth='2rem' height='.52rem' types='normal' color='#fff' onClick={async () => {
          if (account) {
            login2()
          } else {
            if (!account) {
                setShowModal(false)
                try{
                  await injected.activate(1)
                }catch(e:any){
                  notification.error({ message: e.message})
                }
            }
          }
        }}>OK</ButtonDefault>
      </Flex>
    </Grid>

  return (<BgTable>
    {loading ? <div className='loading'><img src={imgurl.market.progressIcon} alt="" /></div> : activities.length ? <Table
      columns={columns}
      dataSource={activities}
      pagination={false}
      className="ant-table-reset-white"
    ></Table> : <NotFound padding={"1rem 0"}/>}
    <StyledModal
      visible={showModal}
      footer={null}
      onCancel={() => { setShowModal(false) }}
      destroyOnClose={true}
      maskClosable={false}
      centered={true}
      width='5.48rem'
    >
      <ConfirmModal />
    </StyledModal>
  </BgTable>)

}

export default VaultsTable