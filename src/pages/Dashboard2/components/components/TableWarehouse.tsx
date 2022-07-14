import React from 'react'
import { Flex, Icon, Typography } from 'component/Box'
import BigNumber from 'bignumber.js'
import { Table, Td, Th, Tr } from 'component/Table/Cell'
import { useAppSelector } from 'store/hooks'
import { globalConstant } from 'utils/globalConstant'
import { imgurl } from 'utils/globalimport'
import { thousandFormat } from 'utils/urls'
import { DataSource2 } from './StyledInterface'
import { useNavigate } from 'react-router-dom'
import { TextPlaceholder } from 'component/styled'
import ButtonDefault from 'component/ButtonDefault'
import styled from 'styled-components'

enum Color {
  'Inforce' = "#7BD742",
  'In Risk' = "#FFD43B",
  'In Liquidation' = "#FF4949",
  'Terminated' = "#7F7F7F"
}
const Hover_Tr = styled(Tr)`
  &:hover {
    background: #0000001A;
  }
`

export default function TableWarehouse(props: {
  Source?: DataSource2[]
}) {
  const { Source } = props
  const navigate = useNavigate()
  const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))

  console.log('item', Source)
  const jumpToEthscan = (e: DataSource2) => {
    if (e.terminated()) return
    navigate(`/vaultsDetail/${e.nftAddress}/${e.tokenId}`)
  }
  const jumpToNEOEthscan = (e: DataSource2) => {
    if (e.terminated()) return
    window.open(`https://cn.etherscan.com/nft/${e.neoAddress}/${e.tokenId}`)
  }

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Asset</Th>
          <Th textAlign="left" paddingLeft="0.6rem">NEO NFT</Th>
          <Th textAlign="left">Debt</Th>
          <Th textAlign="left">Liquidation Price</Th>
          <Th textAlign="left">Health Factor</Th>
          <Th textAlign="left">Status</Th>
          <Th>Actions</Th>
        </Tr>
      </thead>
      <tbody>
        {
          Source?.map((item, idx) => {
            return <Hover_Tr 
              key={item.key}
              background={item.terminated() ? '#00000008' : ''}
            >
              <Td>
                <div className='items' style={{ cursor: `${item.terminated() ? '' : 'pointer'}` }} onClick={() => jumpToEthscan(item)}>
                  <img className='avatar' src={item.imageUrl} alt="" />
                  <div className='text'>
                    <div>
                      <span title={item.singularForName()}>{item.singularForName()}</span>
                      <span>&nbsp;{`#${item.tokenId}`}</span>
                    </div>
                    <div>
                      Floor: <span>
                        <img src={imgurl.dashboard.ethGrey18} alt="" />
                        {item.floorPrice.div(10 ** globalConstant.bit).toFixed(2, 1)}
                        <Typography marginLeft="0.05rem">{`(${thousandFormat(item.floorPrice.times(ethRate)
                          .div(10 ** 18)
                          .toNumber())})`}</Typography>
                      </span>
                    </div>
                  </div>
                </div>
              </Td>

              <Td>
                <div className='contract' style={{ cursor: `${item.terminated() ? '' : 'pointer'}` }} onClick={() => jumpToNEOEthscan(item)}>
                  <span title={item.singularForName()}>NEO {item.singularForName()}</span>
                  &nbsp;{`#${item.tokenId}`}
                  {item.terminated() ? null : <Icon width="0.14rem" height="0.14rem" src={imgurl.dashboard.exportBlack18} alt="" />}
                </div>
              </Td>

              <Td>
                {
                  item.terminated() ? TextPlaceholder : <Flex alignItems='center'>
                      <Icon width="0.18rem" height="0.18rem" src={imgurl.dashboard.ethBlack18} alt="" />
                      <Typography fontSize="0.14rem" fontWeight="500" color="#000">{item.debtString()}</Typography>
                    </Flex>
                    /* <Typography fontSize="0.14rem" fontWeight="500" color="rgba(0,0,0,.5)" marginLeft="0.03rem">
                      {`(${thousandFormat(item.totalDebt.times(ethRate)
                        .div(10 ** 18)
                        .toNumber())})`}
                    </Typography> */
                }
              </Td>

              <Td>
                {
                  item.terminated() ? TextPlaceholder : <Flex alignItems='center'>
                      <Icon width="0.18rem" height="0.18rem" src={imgurl.dashboard.ethBlack18} alt="" />
                      <Typography fontSize="0.14rem" fontWeight="500" color="#000">{item.liquidationPrice().div(10 ** 18).toFixed(4, 1)}</Typography>
                    </Flex>
                    /* <Typography marginLeft="0.03rem" fontSize="0.14rem" fontWeight="500" color="rgba(0,0,0,.5)" >{`(${thousandFormat(item.liquidationPrice().times(ethRate)
                      .div(10 ** 18)
                      .toNumber())})`}</Typography> */
                }
              </Td>

              <Td>
                {
                  item.terminated() ? TextPlaceholder : <div className='healthFactor'>
                    {item.healthFactor.div(10 ** 18).toFixed(4, 1)}
                  </div>
                }
              </Td>
              <Td>
                <div className='status' style={{ color: `${Color[item.factorStatus as 'Inforce' | 'In Risk' | 'In Liquidation' | 'Terminated']}` }}>
                  {item.factorStatus}
                </div>
              </Td>
              <Td>
                {
                  item.terminated() ? <div /> : <Flex alignItems='center' justifyContent='center' gap="0.1rem">
                    <ButtonDefault height='0.45rem' minWidth='1.2rem' types='normal' onClick={() => navigate(`/vaultsDetail/${item.nftAddress}/${item.tokenId}`)}>
                      Repay
                    </ButtonDefault>
                    {/* <ButtonDefault height='0.45rem' minWidth='1.2rem' types='second'}>
                      Offers
                    </ButtonDefault> */}
                  </Flex>
                }
              </Td>
            </Hover_Tr>
          })
        }
      </tbody>
    </Table>
  )
}