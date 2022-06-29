import React, { useEffect, useState } from 'react'
import http from 'utils/http';
import type { ColumnsType } from 'antd/lib/table';
import { Table } from 'antd';
import { Collections } from "../../../model/user";
import { deserializeArray } from 'class-transformer';
import styled from 'styled-components';
import { imgurl } from 'utils/globalimport';
import BigNumber from 'bignumber.js';
import { Link } from 'react-router-dom';
import { Icon } from 'component/Box'
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
  dayVolume: BigNumber,
  address: string
}

const BgTable = styled.div`
  width: 16rem;
  margin: 0 auto;
  /* margin-top: .5rem; */
`


export default function MyTable() {

  const [collections, setCollections] = useState<DataType[]>()
  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  function ScrollTop():void {
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
        for (let i = 0; i < changeData.length; i++) {
          relData.push({
            index: `${i+1}`,
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
            dayVolume: new BigNumber(changeData[i].dayVolume),
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
      render: (text,row,index) => {
      return <div>
        {index+1}
      </div>}
    },
    {
      title: 'collection',
      dataIndex: 'collection',
      key: 'collection',
      align: 'left',
      render: (text, row) => <Link to={`/marketPlace/collections/${row.address}`} onClick={() => ScrollTop()}>
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
          <img src={row.imageUrl} alt="" style={{ width: ".6rem", height: ".6rem", marginRight: ".1rem", borderRadius: '30px'}} />
          <span style={{ color: '#fff', fontWeight: '700', marginRight: '.05rem' }}>{text}</span>
          <Icon
           
            src={openseaValidIcon}
            width={".16rem"}
            height={".16rem"} 
          />
        </div>
      </Link>,
    },
    {
      title: '24H Vol',
      dataIndex: 'dayVolume',
      key: 'dayVolume',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        return +a.dayVolume.toNumber() - +b.dayVolume.toNumber()
      },
      render: (text,row) => { 
      return <div className='descend'>
        <div><img src={imgurl.whitePrice} alt=""/></div>
        <div>
          {text.toFixed(2,1)}
          <span style={{color:`${+row.dayChange >= 0 ? "#7BD742" : "#D03434"}`}}>{`${+row.dayChange >= 0 ? '+' : ''}${row.dayChange}%`}</span>
        </div>
      </div>}
    },
    {
      title: 'Floor Price',
      dataIndex: 'floorPrice',
      key: 'floorPrice',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.floorPrice - b.floorPrice,
      render: (text) => <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={imgurl.whitePrice} alt=""  style={{marginRight: ".1rem"}}/>
        <span>{text}</span>
      </div>
    },
    {
      title: 'Down Payment(%)',
      dataIndex: 'advanceRate',
      align: 'center',
      key: 'advanceRate',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.advanceRate - b.advanceRate,
      render: (text) => <div>{`${text}%`}</div>
    },
    {
      title: 'Down Payment',
      dataIndex: 'primePrice',
      key: 'primePrice',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.floorPrice - b.floorPrice,
      render: (text) => <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src={imgurl.redPrice} alt="" style={{marginRight: ".1rem"}}/>
        <span>{text}</span>
      </div>
    },
  ];

  return (<BgTable><Table
    columns={columns}
    dataSource={collections}
    pagination={false}
    className="ant-table-reset"
  ></Table></BgTable>)
}