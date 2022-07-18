import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/lib/table';
import { Skeleton, Space, Table } from 'antd';
import styled from 'styled-components';
interface DataType {
  index: number,
  collection: string,
  floorPrice: string,
  advanceRate: string,
  primePrice: string,
  dayVolume: string,
}

const BgTable = styled.div`
  width: 16rem;
  margin: 0 auto;
  /* margin-top: 0.5rem; */
  .table_col{
    padding: 0.1rem !important;
  }
`


export default function MyTable() {

  const [collections, setCollections] = useState<DataType[]>([
    {
      index:1,
      collection:"1",
      dayVolume:"1",
      floorPrice:"1",
      advanceRate:"1",
      primePrice:"1"
    },
    {
      index:1,
      collection:"1",
      dayVolume:"1",
      floorPrice:"1",
      advanceRate:"1",
      primePrice:"1"
    },
    {
      index:1,
      collection:"1",
      dayVolume:"1",
      floorPrice:"1",
      advanceRate:"1",
      primePrice:"1"
    },
    {
      index:1,
      collection:"1",
      dayVolume:"1",
      floorPrice:"1",
      advanceRate:"1",
      primePrice:"1"
    },
    {
      index:1,
      collection:"1",
      dayVolume:"1",
      floorPrice:"1",
      advanceRate:"1",
      primePrice:"1"
    },
    {
      index:1,
      collection:"1",
      dayVolume:"1",
      floorPrice:"1",
      advanceRate:"1",
      primePrice:"1"
    },
    {
      index:1,
      collection:"1",
      dayVolume:"1",
      floorPrice:"1",
      advanceRate:"1",
      primePrice:"1"
    },
  ])
  const [showTable,setShowTable] = useState<boolean>(false)

  function ScrollTop():void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0)
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      className:'table_col',
      render: () => {
      return <Skeleton.Button shape={'square'} active style={{ height: '0.3rem', minWidth: '0.1rem',borderRadius:'8px' }}></Skeleton.Button>
      }
    },
    {
      title: 'Collection',
      dataIndex: 'collection',
      key: 'collection',
      align: 'left',
      className:'table_col',
      render: () =>{
        return (
          <Space size={15}>
            <Skeleton.Button shape={'circle'} active style={{ height: '0.3rem', minWidth: '0.3rem' }}></Skeleton.Button>
            <Skeleton.Button shape={'square'} active style={{ height: '0.3rem', minWidth: '3rem',borderRadius:'8px' }}></Skeleton.Button>
          </Space>
        )
      },
    },
    {
      title: '24H Vol',
      dataIndex: 'dayVolume',
      key: 'dayVolume',
      align: 'left',
      className:'table_col',
      render: () => {
      return <Skeleton.Button shape={'square'} active style={{ height: '0.3rem', minWidth: '1rem',borderRadius:'8px' }}></Skeleton.Button>}
    },
    {
      title: 'Floor Price',
      dataIndex: 'floorPrice',
      key: 'floorPrice',
      align: 'left',
      className:'table_col',
      render: () => <Skeleton.Button shape={'square'} active style={{ height: '0.3rem', minWidth: '1rem',borderRadius:'8px' }}></Skeleton.Button>
    },
    {
      title: 'Down Payment ( % )',
      dataIndex: 'advanceRate',
      align: 'left',
      key: 'advanceRate',
      className:'table_col',
      render: () => <Skeleton.Button shape={'square'} active style={{ height: '0.3rem', minWidth: '1rem',borderRadius:'8px' }}></Skeleton.Button>
    },
    {
      title: 'Down Payment',
      dataIndex: 'primePrice',
      key: 'primePrice',
      align: 'left',
      className:'table_col',
      render: () => <Skeleton.Button shape={'square'} active style={{ height: '0.3rem', minWidth: '1rem',borderRadius:'8px' }}></Skeleton.Button>
    },
  ];

  return (
  <BgTable>
      <Table
      columns={columns}
      dataSource={collections}
      pagination={false}
      className="ant-table-reset"
    ></Table>
  </BgTable>)
}