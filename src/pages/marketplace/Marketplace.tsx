import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { deserializeArray } from 'class-transformer';
import { Collections } from "../../model/user";
import http from 'utils/http';
import { imgurl } from 'utils/globalimport';

interface ItemsRequest {
  address: string,
  direction: string,
  pageSize: number,
  search?: string,
  pageIndex: number,
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-top: 90px;
  background-color: #191919;
  .collections {
    width: 530px;
    color: #fff;
    border-right: 1px solid rgba(255,255,255,.1);
    padding-top: 90px;
    padding-right: 20px;
    padding-left: 150px;
    .collections-title {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .collections-box {
      display: flex;
      border: 1px solid rgba(255,255,255,.3);
      border-radius: 10px;
      color: #fff;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin-bottom: 8px;
      cursor: pointer;
      &>img {
        width: 50px;
        height: 50px;
        margin-right: 8px;
        border-radius: 25px;
      }
      .text {
        display: flex;
        flex-direction: column;
        width: 100%;
        &>div:nth-child(1) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 22px;
          margin-bottom: 5px;
          &>span:nth-child(1) {
            font-size: 16px;
            font-weight: 600;
          }
          &>span:nth-child(2) {
            font-size: 16px;
            font-weight: 500;
          }
        }
        &>div:nth-child(2) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          &>div:nth-child(1) {
            display: flex;
            align-items: center;
            &>span {
              margin-right: 10px;
            }
            &>div {
              display: flex;
              align-items: center;
              img {
                margin-right: 2px;
                width: 10px;
                height: 15px;
              }
            }
          }
          &>div:nth-child(2) {
            display: flex;
            align-items: center;
            &>img {
              margin-right: 2px;
              width: 10px;
              height: 15px;
            }
          }
          &>div:nth-child(3) {
            color: rgba(255,255,255,.5);
          }
        }
      }
    }
  }
  .content {
    width: calc(100% - 530px);
    padding-right: 120px;
    padding-left: 26px;
    padding-top: 60px;
    padding-bottom: 30px;
    .content-search {
      height: 108px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &>div:nth-child(1) {
        display: flex;
        flex-direction: column;
        color: #fff;
        &>span:nth-child(1) {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 800;
          font-size: 30px;
        }
        &>span:nth-child(2) {
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          color: rgba(255,255,255,.5);
        }
      }
      &>div:nth-child(2) {
        display: flex;
        &>input {
          margin-right: 20px;
        }
        .ant-select {
          width: 248px;
        }
      }

      .ant-select {
        align-self: end;
        width: 248px;
        border: 1px solid rgba(255, 255, 255, .5);
        border-radius: 10px;
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
          display: flex;
          align-items: center;
        }
      }


    }
    .content-items {
      display: flex;
      min-height: 500px;
      /* cursor: pointer; */
      &>div {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 296px);
        align-items: start;
        grid-gap: 10px;
        justify-content: space-between;
        //display: flex;
        //flex-wrap: wrap;
      }
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .not-found {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 20px;
        font-weight: 600;
      }
    }

  }
`

function Marketplace() {

  const [collectionsList, setCollectionsList] = useState<Collections[]>()
  const [itemsRequest, setItemsRequest] = useState<ItemsRequest>()
  const [pageIndex, setPageIndex] = useState<number>(1)

  useEffect(() => {
    getCollectionsList()
    // eslint-disable-next-line
  }, [])

  const getCollectionsList = async () => {
    const url = '/npics-nft/app-api/v2/nft/getCollections2'
    const result: any = await http.myPost(url, {})
    if (result.code === 200 && result.data.length) {
      const orgData = result.data
      const changeData = deserializeArray(Collections, JSON.stringify(orgData));
      setCollectionsList(changeData)
      const request = Object.assign({}, itemsRequest, { address: changeData[0].address, pageSize: 30, pageIndex: pageIndex, direction: "asc", search: "" })
      setItemsRequest(request)
    } else {
      setCollectionsList([])
      setItemsRequest(undefined)
    }
  }

  const clickItem = (item: Collections) => {
    if (!item) return
    setPageIndex(1)
    const request = Object.assign({}, itemsRequest, { address: item.address, pageIndex: 1, search: '' })
    setItemsRequest(request)
  }

  return (
    <Wrap>
      <div className='collections'>
        <div className='collections-title'>
          Collections
        </div>
        {collectionsList && collectionsList.map((item) => {
          return (<Link key={item.name} to={`collections/${item.address}`} state={{ address: item.address }} ><div className='collections-box' onClick={() => clickItem(item)}>
            <img src={item.imageUrl} alt="" />
            <div className='text'>
              <div>
                <span>{item.name}</span>
                <span>{item.totalShelves}</span>
              </div>
              <div>
                <div>
                  <span>Floor</span>
                  <div>
                    <img src={imgurl.market.Union1} alt="" />
                    <span>{(item.floorPrice).div(10 ** 18).toFixed(2, 1).toString()}</span>
                  </div>
                </div>
                <div>
                  <img src={imgurl.market.Union2} alt="" />
                  <span>{(((item.floorPrice)).multipliedBy(item.ltv.div(10000))).div(10 ** 18).toFixed(2, 1)}</span>
                </div>
                <div>
                  <span>Total:</span>
                  <span>{item.realTotalSupply}</span>
                </div>
              </div>
            </div>
          </div></Link>)
        })}
      </div>
      <Outlet />
    </Wrap>
  );
}

export default Marketplace;
