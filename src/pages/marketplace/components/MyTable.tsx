import React, { useState,useEffect } from 'react'
import { Table } from 'antd';
import http from 'utils/http';
import { Activities } from '../../../model/user';
import { deserializeArray } from 'class-transformer';
import styled from 'styled-components';
import { imgurl } from 'utils/globalimport';
import { ColumnsType } from 'antd/lib/table';


interface Iprops {
  itemDetails: {
    address: string
    tokenId: string
  }
}
interface activities {
  key: string;
  eventType: string;
  createdTime: Date | string
  fromAccount: string
  toAccount: string
  amount: number | string
  startAmount: number | string
}

const BgTable = styled.div`
  overflow: overlay;
  max-height: 8.1rem;
  scrollbar-width: none;
  -ms-overflow-style:none;
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
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`

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
    render: (text) => text ? <div>
      <img src={imgurl.market.price14} alt="" style={{width:".14rem", height:".22rem", marginRight: ".1rem", verticalAlign: 'bottom'}}/>
      <span>{text}</span>
    </div> : <div>--</div>
  },
  {
    title: 'From',
    dataIndex: 'fromAccount',
    key: 'fromAccount',
    align: 'center',
    render: (text) => <div title={text}>
    { text ? text.replace(text.substr(7, 31), '...') : '--'}
 </div>
  },
  {
    title: 'To',
    dataIndex: 'toAccount',
    key: 'toAccount',
    align: 'center',
    render: (text) => <div>
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
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: .3rem;
  margin-bottom: .3rem;
  .load-more {
    padding: .17rem .48rem;
    color: #FFFFFF;
    font-size: .16rem;
    font-weight: 600;
    background: rgba(255,255,255,.1);
    border-radius: 10px;
    cursor: pointer;
  }
`
let num: number = 0
export default function MyTable(props: Iprops) {
  const { itemDetails } = props
  const [allData, setAllData] = useState<activities[]>()
  const [activities, setActivities] = useState<activities[]>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getNftActivities()
    // eslint-disable-next-line
  }, [itemDetails])

  useEffect(() => {
    LoadMore()
    // eslint-disable-next-line
  }, [allData])



  const getNftActivities = async () => {
    if (!itemDetails) return
    setLoading(true)
    const url = "/npics-nft/app-api/v2/nft/getNftActivities"
    const params = {
      "address": itemDetails.address,
      "tokenId": itemDetails.tokenId
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
              createdTime: changeData[i].createdTime || '--',
              startAmount: (changeData[i] && (+changeData[i].startAmount.div(10 ** 18).toFixed(2).toString())) || '--',
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

  const LoadMore = () => {
    if (!allData) return
    const len = allData.length
    num = num + 8
    if (num > len) num = len
    const actives: activities[] = []
    for (let i = 0; i < num; i++) {
      actives.push(allData[i])
    }

    setActivities(actives)
  }

  return (<BgTable>
    {loading ? <div className='loading'><img src={imgurl.market.loading} alt="" /></div> : <Table
      columns={columns}
      dataSource={activities}
      pagination={false}
    ></Table>}
    <Flex>
      <div className='load-more' onClick={() => LoadMore()}>
        Load More
      </div>
    </Flex>
  </BgTable>)
}