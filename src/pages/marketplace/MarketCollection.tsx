import React, { useState, useEffect } from 'react';
import { Link , useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deserializeArray } from 'class-transformer';
import { CollectionItems } from "../../model/user";
import http from 'utils/http';
import { imgurl } from 'utils/globalimport';
import { Input, Select } from 'antd'
import ButtonDefault from 'component/ButtonDefault';
import { useUpdateEffect } from 'utils/hook';
const { Option } = Select;

interface ItemsRequest {
  address: string,
  direction: string,
  pageSize: number,
  search?: string,
  pageIndex: number,
}
const Collection = styled.div`
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

  

`

const CollectionItem = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, .1);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, .1);
  margin-bottom: 10px;
  cursor: pointer;
  overflow: hidden;
  .co-image {
    position: relative;
    .market {
      position: absolute;
      top: 12px;
      left: 12px;
      width: 38px;
      height: 38px;
    }
    .rarity {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      align-items: center;
      font-size: 16px;
      padding: 5px;
      border-radius: 10px;
      color: #000;
      font-weight: 500;
      background: #fff;
      &>img {
        margin-right: 5px;
      }
    }
    .nft-img {
      width: 296px;
      height: 307px;
    }
  }
  .co-info {
    display: flex;
    flex-direction: column;
    padding: 10px 15px 10px;
    color: #fff;
    &>span {
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, .5);
    }
    &>div {
      display: flex;
      justify-content: space-between;
      &>div:nth-child(1) {
        display: flex;
        &>span:nth-child(1) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
          max-width: 120px;
          margin-right: 5px;
        }
      }
      &>div:nth-child(2) {
        display: flex;
        align-items: center;
        &>div {
          display: flex;
          align-items: center;
          img {
            margin-right: 10px;
            width: 10px;
            height: 16px;
            line-height: 16px;
            vertical-align: middle;
          }
        }
      }
    }
  }

`
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Scroll = styled.div`
  
  .marketplace-scroll {
    overflow-y: scroll;
    height: 850px;
    scrollbar-width: none;
    -ms-overflow-style:none;
    &::-webkit-scrollbar{
      display:none;
    }
  }
`
function MarketCollection() {

  const [itemsRequest, setItemsRequest] = useState<ItemsRequest>()
  const [collectionsItems, setCollectionsItems] = useState<CollectionItems[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  let params = useParams()
  useEffect(() => {
    getCollectionItems()
    // eslint-disable-next-line
  }, [itemsRequest])
  useUpdateEffect(() => {
    if (pageIndex === 1) return
    getCollectionItemsMore()
    // eslint-disable-next-line
  }, [pageIndex])

  useEffect(() => {
    const request = Object.assign({}, itemsRequest, { address: params.address, pageSize: 30, pageIndex: pageIndex, direction: "asc", search: "" })
    setItemsRequest(request)
    // eslint-disable-next-line
  },[params])


  const getCollectionItemsMore = async () => {
    if (!itemsRequest || !itemsRequest.address) return
    let orgRequest = itemsRequest
    orgRequest.pageIndex = pageIndex
    const url = '/npics-nft/app-api/v2/nft/getCollectionItems'
    const result: any = await http.myPost(url, orgRequest)
    if (result.code === 200 && result.data.records.length) {
      const changeData = deserializeArray(CollectionItems, JSON.stringify(result.data.records));
      const orgData = collectionsItems.concat(changeData)
      setCollectionsItems(orgData)
    } else {
      setCollectionsItems([])
    }
  }

  const getCollectionItems = async () => {
    if (!itemsRequest || !itemsRequest.address) {
      setCollectionsItems([])
      return
    }
    setIsLoading(true)
    const url = '/npics-nft/app-api/v2/nft/getCollectionItems'
    const result: any = await http.myPost(url, itemsRequest)
    setIsLoading(false)
    if (result.code === 200 && result.data.records.length) {
      setTotal(result.data.total)
      const changeData = deserializeArray(CollectionItems, JSON.stringify(result.data.records));
      setCollectionsItems(changeData)
    } else {
      setCollectionsItems([])
    }
  }

  const onSearch = (val: any) => {
    setPageIndex(1)
    const request = Object.assign({}, itemsRequest, { search: val.target.value, pageIndex: 1 })
    setItemsRequest(request)
  }

  const onSelect = (val: string) => {
    const request = Object.assign({}, itemsRequest, { direction: val })
    setItemsRequest(request)
  }

  const onLoadMore = () => {
    setPageIndex(pageIndex + 1)
  }



  let timeout: NodeJS.Timeout | null
  const getScroll = (e: any) => {

    if (!timeout) {
      timeout = setTimeout(function () {
        let marketDom = document.getElementById("marketplace-content-height") || document.body
        let height1 = marketDom.clientHeight
        let height2 = e.target.clientHeight
        let scrollTop = e.target.scrollTop;
        if (height1 - height2 < scrollTop + 100) {
          if (height1 < height2) return
          if (collectionsItems.length === total) return
          onLoadMore()
        }

        timeout = null;
      }, 400);
    }
  }

  return (<Collection>
    <div className='content-search'>
      <div>
        <span>Marketplace</span>
        <span>{total} items on sale</span>
      </div>
      <div>
        <Input
          type="text"
          placeholder='Search'
          onPressEnter={onSearch}
          className="ant-input-reset"
        />
        <Select onSelect={onSelect} defaultValue="asc" dropdownClassName="ant-selectDropDown-reset">
          <Option value="asc">Price: Low to High</Option>
          <Option value="desc">Price: high to low</Option>
          <Option value="rarityScoreDesc">Rarity: Common to Rarest</Option>
          <Option value="rarityScore">Rarity: Rarest to Common</Option>
        </Select>
      </div>
    </div>
    <Scroll>
      <div className='marketplace-scroll' onScroll={(e) => getScroll(e)}>
        <div className='content-items' id="marketplace-content-height">
          {isLoading ? <div className='loading'><img src={imgurl.market.loading} alt="" /></div> : collectionsItems.length ? <div>
            {collectionsItems && collectionsItems.map((item: CollectionItems) => {
              return (
                <Link to={`/marketPlace/nft/${item.address}/${item.tokenId}`} key={item.id}><CollectionItem key={item.id} >
                  <div className='co-image'>
                    <img className='market' src={imgurl.market[item.market]} alt="" />
                    <div className='rarity'>
                      <img src={imgurl.market.rarity} alt="" />
                      <span>{item.rarityScore}</span>
                    </div>
                    <img className='nft-img' src={item.imageUrl} alt="" />
                  </div>
                  <div className='co-info'>
                    <span>{item.collectionName}</span>
                    <div>
                      <div>
                        <span>{item.collectionName}</span>
                        <span>{`#${item.tokenId}`}</span>
                      </div>
                      <div>
                        <div><img src={imgurl.market.Union1} alt="" /></div>
                        <span>{(item.currentBasePrice.div(10 ** +item.decimals).toFixed(2, 1))}</span>
                      </div>
                    </div>
                  </div>
                </CollectionItem></Link>
              )
            })}
          </div> : <div className='not-found'>
            <span>No nfts found</span>
          </div>}
        </div>
        <Flex>
          {isLoading ? null : collectionsItems.length ? collectionsItems.length === total || collectionsItems.length <= 30 ? null : <ButtonDefault types='one' onClick={() => onLoadMore()}>
            Load More
          </ButtonDefault> : null}
        </Flex>
      </div>
    </Scroll>
  </Collection>);
}

export default MarketCollection;
