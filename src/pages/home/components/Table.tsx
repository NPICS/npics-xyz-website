import React, { useEffect, useState } from 'react'
import http from 'utils/http';
import type { ColumnsType } from 'antd/lib/table';
import { Skeleton, Table } from 'antd';
import { Collections } from "../../../model/user";
import { deserializeArray } from 'class-transformer';
import styled from 'styled-components';
import { imgurl } from 'utils/globalimport';
import BigNumber from 'bignumber.js';
import { Link } from 'react-router-dom';
import { Icon } from 'component/Box'
import SkeletonTable from "./SkeletonTable"
import openseaValidIcon from "assets/images/market/nfts_opensea_valid.svg"
interface DataType {
  index: string,
  key: React.Key,
  imageUrl: string,
  collection: string,
  realTotalSupply: number,
  floorPrice: number,
  advanceRate: number,
  ownerNum: number,
  activeCollaterals: number,
  primePrice: number,
  vol: number,
  dayChange: string,
  dayVolume: number,
  address: string
}

const BgTable = styled.div`
  width: 16rem;
  margin: 0 auto;
  /* margin-top: 0.5rem; */
  .table_col{
    font-size: 0.14rem !important;
  }
`


export default function MyTable() {

  const [collections, setCollections] = useState<DataType[]>()
  const [showTable, setShowTable] = useState<boolean>(false)

  const skeleton = [
    {
      index: 1,
      collection: "1",
      dayVolume: "1",
      floorPrice: "1",
      advanceRate: "1",
      primePrice: "1"
    }
  ]
  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  function ScrollTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0)
  }

  const url = '/npics-nft/app-api/v2/nft/getCollections2'
  const getData = async () => {
    let result: any = await http.myPost(url, {})
    if (result.code === 200 && result.data.length) {
      const orgData = result.data
      const changeData = deserializeArray(Collections, JSON.stringify(orgData));
      const relData: DataType[] = []
      if (changeData && changeData.length) {
        setShowTable(true)
        for (let i = 0; i < changeData.length; i++) {
          relData.push({
            index: `${i + 1}`,
            key: `${i}`,
            imageUrl: changeData[i].imageUrl,
            collection: changeData[i].name,
            realTotalSupply: changeData[i].realTotalSupply,
            floorPrice: +changeData[i].sFloorPrice(),
            ownerNum: changeData[i].ownerNum,
            advanceRate: +changeData[i].sAdvanceRate,
            activeCollaterals: changeData[i].activeCollaterals,
            primePrice: +changeData[i].sPrimePrice,
            vol: +changeData[i].vol,
            dayChange: changeData[i].sDayChange,
            dayVolume: parseFloat(changeData[i].dayVolume + "") || 0,
            address: changeData[i].address
          })
        }
        setCollections(relData)
      }
    } else {
      setCollections([])
    }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      className: "table_col",
      render: (text, row, index) => {
        return <div>
          {index + 1}
        </div>
      }
    },
    {
      title: 'Collection',
      dataIndex: 'collection',
      key: 'collection',
      align: 'left',
      className: "table_col",
      render: (text, row) => <Link to={`/marketplace/collections/${row.address}`} onClick={() => ScrollTop()}>
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img src={row.imageUrl} alt="" style={{ width: "0.5rem", height: "0.5rem", marginRight: "0.1rem", borderRadius: '0.3rem' }} />
          <span style={{ wordBreak: 'break-all', fontSize: '0.14rem', color: '#fff', marginRight: '0.1rem' }}>{text}</span>
          <Icon style={{ flexShrink: '0' }} src={openseaValidIcon} width={"0.16rem"} height={"0.16rem"} />
        </div>
      </Link>,
    },
    {
      title: '24H Vol',
      dataIndex: 'dayVolume',
      key: 'dayVolume',
      align: 'left',
      className: "table_col",
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return +a.dayVolume - +b.dayVolume
      },
      render: (text, row) => {
        return <div className='descend'>
          <div><img src={imgurl.whitePrice} alt="" /></div>
          <div>
            <span style={{ fontSize: '0.14rem' }}>{text.toFixed(2, 1)}</span>
            <span style={{ fontSize: '0.14rem', color: `${+row.dayChange >= 0 ? "#7BD742" : "#D03434"}` }}>{`${+row.dayChange >= 0 ? '+' : ''}${row.dayChange}%`}</span>
          </div>
        </div>
      }
    },
    {
      title: 'Floor Price',
      dataIndex: 'floorPrice',
      key: 'floorPrice',
      align: 'left',
      className: "table_col",
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.floorPrice - b.floorPrice,
      render: (text) => <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <img src={imgurl.whitePrice} alt="" style={{ marginRight: "0.1rem" }} />
        <span style={{ fontSize: '0.14rem', color: '#fff', fontWeight: '500' }}>{text}</span>
      </div>
    },
    {
      title: 'Down Payment ( % )',
      dataIndex: 'advanceRate',
      align: 'left',
      className: "table_col",
      key: 'advanceRate',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.advanceRate - b.advanceRate,
      render: (text) => <div style={{ fontSize: '0.14rem', color: '#fff', fontWeight: '500' }}>{`${text}%`}</div>
    },
    {
      title: 'Down Payment',
      dataIndex: 'primePrice',
      key: 'primePrice',
      align: 'left',
      className: "table_col",
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.floorPrice - b.floorPrice,
      render: (text) => <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <img src={imgurl.whitePrice} alt="" style={{ marginRight: "0.1rem" }} />
        <span style={{ fontSize: '0.14rem', color: '#fff', fontWeight: '500' }}>{text}</span>
      </div>
    },
  ];

  return (
    <BgTable>
      {
        showTable ?
          <Table
            columns={columns}
            dataSource={showTable ? collections : []}
            pagination={false}
            className="ant-table-reset"
          ></Table>
          :
          <SkeletonTable></SkeletonTable>
      }

    </BgTable>)
}