import React, { useState,useEffect } from 'react'
import { Table } from 'antd';
import http from 'utils/http';
import { Activities } from '../../../model/user';
import { deserializeArray } from 'class-transformer';
import styled from 'styled-components';
import { imgurl } from 'utils/globalimport';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';



interface IProps {
  itemDetails: {
    address: string
    tokenId: string
  },
  // filterValue: string | undefined
}
interface activities {
  key: string;
  eventType: string;
  createdTime: Date | string
  fromAccount: string
  toAccount: string
  amount: number | string
  startAmount: number | string
  imageUrl: string
}

const BgTable = styled.div`
  overflow: auto;
  max-height: 8.1rem;
  padding-bottom: .1rem;
  border-bottom-left-radius: .1rem;
  border-bottom-right-radius: .1rem;
  &::-webkit-scrollbar{
    display:none;
  }
  .ant-table-thead {
    tr {
      th {
        color: #fff;
        border-bottom: .01rem solid rgba(255,255,255,.2);
        background-color: #191919;
        height: .74rem;
      }
    }
    color: #fff;
  }
  .ant-table-tbody {
    tr {
      &:hover {
        td {
          background-color: #191919;
        }
      }
      td {
        color: #fff;
        border-bottom: .01rem solid rgba(255,255,255,.2);
        background-color: #191919;
        height: .7rem;
      }
    }
  }
  .ant-table-placeholder {
    .ant-table-cell {
      border-bottom: 0;
      .ant-empty-normal {
        color: #fff;
      }
    }
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`
// https://etherscan.io/address/0xed5af388653567af2f388e6224dc7c4b3241c544

const columns:ColumnsType<activities> = [
  {
    title: 'Event',
    dataIndex: 'eventType',
    key: 'eventType',
    align: 'center',
  },
  {
    title: 'Price',
    dataIndex: 'amount',
    key: 'amount',
    align: 'left',
    render: (text,row) => text ? <div style={{display:"flex", alignItems: "center"}}>
      <img src={row.imageUrl} alt="" style={{width:".14rem", height:".22rem", marginRight: ".1rem", verticalAlign: 'bottom'}}/>
      <span>{text}</span>
    </div> : <div>--</div>
  },
  {
    title: 'From',
    dataIndex: 'fromAccount',
    key: 'fromAccount',
    align: 'center',
    render: (text) => <div title={text} style={{cursor: 'pointer'}} onClick={() => {
      if(!text) return
      window.open(`https://etherscan.io/address/${text}`)
    }}>
    { text ? text.replace(text.substr(7, 31), '...') : '--'}
 </div>
  },
  {
    title: 'To',
    dataIndex: 'toAccount',
    key: 'toAccount',
    align: 'center',
    render: (text) => <div title={text} style={{cursor: 'pointer'}} onClick={() => {
        if(!text) return
        window.open(`https://etherscan.io/address/${text}`)
      }}>
        { text ? text.replace(text.substr(7, 31), '...') : '--'}
    </div>
  },
  {
    title: 'Datetime',
    dataIndex: 'createdTime',
    key: 'createdTime',
    align: 'center',
  },
]

export default function MyTable(props: IProps) {
  const { itemDetails } = props
  const [allData, setAllData] = useState<activities[]>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getNftActivities()
    // eslint-disable-next-line
  }, [itemDetails])

  const getNftActivities = async () => {
    if (!itemDetails) return
    setLoading(true)
    const url = "/npics-nft/app-api/v2/nft/getNftActivities"
    const params = {
      "address": itemDetails.address,
      "tokenId": itemDetails.tokenId,
    }
    try {
      const result: any = await http.myPost(url, params)
      if (result.code === 200 && result.data.length) {
        const orgData = result.data
        const changeData = deserializeArray(Activities, JSON.stringify(orgData));
        const relData: activities[] = []
        
        if (changeData && changeData.length) {
          for (let i = 0; i < changeData.length; i++) {
            relData.push({
              key: `${i}`,
              eventType: changeData[i].eventTypeExplain() || '--',
              amount: (changeData[i] && (+changeData[i].amount.div(10 ** 18).toFixed(2).toString())),
              fromAccount: changeData[i].fromAccount,
              toAccount: changeData[i].toAccount,
              createdTime: moment(changeData[i].createdTime).endOf('hour').fromNow() || '--',
              startAmount: (changeData[i] && (+changeData[i].startAmount.div(10 ** 18).toFixed(2).toString())) || '--',
              imageUrl: changeData[i].imageUrl
            })
          }
        }
        setAllData(relData)
      } else {
        setAllData([])
      }
    } catch (e) {
      setAllData([])
      setLoading(false)
      console.error(`Error => ${e}`)
    }
    setLoading(false)
  }

  return (<BgTable>
    {loading ? <div className='loading'><img src={imgurl.market.loading} alt="" /></div> : <Table
      columns={columns}
      dataSource={allData}
      pagination={false}
    ></Table>}
  </BgTable>)
}