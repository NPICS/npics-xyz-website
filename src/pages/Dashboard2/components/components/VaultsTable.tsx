import React, { useEffect, useRef, useState } from 'react'
import { message, Modal, notification, Table } from 'antd';
import { imgurl } from 'utils/globalimport';
import BigNumber from 'bignumber.js';
import http from 'utils/http'
import { LendPool } from 'abis/LendPool'
import { useWeb3React } from '@web3-react/core';
import { getSignMessage } from 'utils/sign';
import {fetchUser, setShowWalletModalOpen, updateLoginState} from 'store/app';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { SessionStorageKey } from 'utils/enums';
import { BgTable, DataSource, DebtData, LiquidatePrice, Record, DataSource2 } from './StyledInterface';
import NotFound from 'component/NotFound';
import { useUpdateEffect } from 'utils/hook';
import { Flex, Grid, Icon, Typography } from 'component/Box';
import styled from 'styled-components';
import ButtonDefault from 'component/ButtonDefault';
import { deserializeArray, plainToClass } from 'class-transformer';
import {CHAIN_ID, injected} from 'connectors/hooks';
// import { aa } from './data'
import { useAsync } from 'react-use';
import TableWarehouse from './TableWarehouse';

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

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
  }
  .ant-modal-body {
    padding: 40px 50px;
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
  // const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))
  const DebtPosition = useRef<DataSource2[]>()
  // const navigate = useNavigate()

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

  useAsync(async () => {
    if (isLogin) {
      setShowModal(false)
      await getNftActivities()
    } else {
      if (account) {
        setShowModal(true)
      } else {
         // Prevent refresh popup windows
        let walletAddress = sessionStorage.getItem(SessionStorageKey.WalletAuthorized)
        if(!walletAddress) {
          action(setShowWalletModalOpen(true))
        }
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
  }) => <Grid gridGap="30px">
      <Flex alignItems="center" justifyContent="space-between" >
        <Typography></Typography>
        <Typography fontSize="30px" fontWeight="800" color="#000">Verify Address</Typography>
        <Typography></Typography>
        {/* <div style={{ cursor: 'pointer' }}><Icon width="24px" height="24px" src={imgurl.dashboard.Cancel} onClick={() => {
          setShowModal(false)
        }} /></div> */}
      </Flex>

      <Typography >You will be asked to sign a message in your wallet to verify you as the owner of the address.</Typography>
      <Flex gap="20px" justifyContent='center' marginTop="30px" >
        <ButtonDefault minWidth='200px' height='52px' types='second' color='#000' onClick={() => { setShowModal(false) }}>Cancel</ButtonDefault>
        <ButtonDefault minWidth='200px' height='52px' types='normal' color='#fff' onClick={async () => {
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
    {loading ? <div className='loading'>
      <img src={imgurl.market.progressIcon} alt="" />
    </div> :
      activities.length ?
        <TableWarehouse Source={activities} />
        : <NotFound padding={"100px 0"} />}
    <StyledModal
      visible={showModal}
      footer={null}
      onCancel={() => { setShowModal(false) }}
      destroyOnClose={true}
      maskClosable={false}
      centered={true}
      width='548px'
    >
      <ConfirmModal />
    </StyledModal>
  </BgTable>)

}

export default VaultsTable