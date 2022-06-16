import React, { useState, useEffect } from 'react';
import Flexible from 'component/Flexible'
import { imgurl } from 'utils/globalimport';
import Button from 'component/Button';
import { Wrap, Properties, MyModal } from './ItemStyled'
import http from 'utils/http';
import { CollectionDetail } from '../../../model/user'
import { deserialize } from 'class-transformer';
import MyTable from './MyTable';
import SignModal from './SignModal'
import { Modal } from 'antd';
import { useRef } from 'react';
import { compute } from './utils';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from 'store/hooks';
import { setIsShowConnect } from 'store/app';
import { useEthPrice } from 'utils/hook';
import { ethers } from 'ethers';
import { ContractAddresses } from 'utils/addresses';
import NPICS_ABI from 'abi/npics.json';
import { useNavigate, useParams  } from 'react-router-dom';
import currency from 'currency.js';
import BigNumber from 'bignumber.js';
import { Erc721 } from '../../../abi/Erc721';

function MarketItem() {
  const { active } = useWeb3React()
  const action = useAppDispatch()
  const [collectionItemsDetail, setCollectionItemsDetail] = useState<CollectionDetail>()
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const EthPrice = useEthPrice(collectionItemsDetail?.currentBasePrice)
  const navigate = useNavigate();
  let params:any = useParams()
  const modal: any = useRef()

  const goBack = () => {
    navigate("/marketplace")
  }
  useEffect(() => {
    getCollectionItemsDetail()
  
    // eslint-disable-next-line
  }, [params])
  


  const getCollectionItemsDetail = async () => {
    if (!params || !params?.address) return

    const detailRequest = {
      address: params.address,
      tokenId: params.tokenId
    }
    // if(!account) {
    //   availableBorrow = new BigNumber(0)
    // } else {
    let contract = new ethers.Contract(ContractAddresses.NpicsProxy, NPICS_ABI, ethers.getDefaultProvider())
    const availableBorrow = await contract.availableBorrowsInETH(params.address)
    // }
    let erc721 = new Erc721(params.address, ethers.getDefaultProvider())
    const owner = await erc721.OwnerOf(params.tokenId)

    const url = '/npics-nft/app-api/v2/nft/getCollectionItemsDetail'
    const result: any = await http.myPost(url, detailRequest)
    if (result.code === 200 && result.data) {
      const orgData = result.data
      const changeData = deserialize(CollectionDetail, JSON.stringify(orgData));
      changeData.availableBorrow = availableBorrow
      changeData.owner = owner
      // changeData.rarityScore = itemDetails.rarityScore
      const aa = changeData.currentBasePrice.minus(new BigNumber(changeData.availableBorrow.toString()))
      changeData.totalAmount = aa
      setCollectionItemsDetail(changeData)
    } else {
      setCollectionItemsDetail(undefined)
    }
  }

  const showModal = () => {
    if (active) {
      setIsShowModal(true)
    } else {
      action(setIsShowConnect(true))
    }
  }

  const onCancel = () => {
    setIsShowModal(false)
  }

  const jumpToMarket = () => {
    if (!collectionItemsDetail?.owner) return
    window.open(`https://etherscan.io/address/${collectionItemsDetail.owner}`)
  }
  const jumpToContract = () => {
    if (!collectionItemsDetail?.address) return
    window.open(`https://etherscan.io/address/${collectionItemsDetail.address}`)
  }
  return (
    <Wrap >
      <div className='left'>
        <div>
          <img src={collectionItemsDetail?.imageUrl} alt="" />
        </div>
        <div className='info'>
          <Flexible
            title="Information"
            iconUrl={imgurl.market.info}
            background="rgba(255, 255, 255, 0.1)"
          >
            <ul className='info-content'>
              <li>
                <span>Contract Address</span>
                <div onClick={jumpToContract}>
                  <span className='address'>{collectionItemsDetail?.address.replace(collectionItemsDetail?.address.substr(6, 30), '...')}</span>
                  <img src={imgurl.market.exportIcon} alt="" />
                </div>
              </li>
              <li>
                <span>Token ID</span>
                <span>{collectionItemsDetail?.tokenId || '--'}</span>
              </li>
              <li>
                <span>Token Standard</span>
                <span>{collectionItemsDetail?.standard || '--'}</span>
              </li>
              <li>
                <span>Blockchain</span>
                <span>{collectionItemsDetail?.paymentSymbol || 'Ethereum'}</span>
              </li>
            </ul>
          </Flexible>
        </div>
        <div className='properties'>
          {collectionItemsDetail?.traits.length ? <Flexible
            title="Properties"
            iconUrl={imgurl.market.properties}
          >
            <Properties>
              {
                collectionItemsDetail && collectionItemsDetail.traits.map((item) => {
                  return (
                    <div key={item.trait_type}>
                      <div>
                        <div>{item.trait_type.toUpperCase()}</div>
                        <div>{item.value}</div>
                        <div>{`${item.trait_count}(${(item.trait_count / +(collectionItemsDetail?.totalShelves || 0) * 100).toFixed(1)}%) have this trait`}</div>
                      </div>
                    </div>
                  )
                })
              }
            </Properties>
          </Flexible> : null}
        </div>
      </div>
      <div className='right'>
        <div className='top-info'>
          <div className='backBtn' onClick={goBack}>←</div>
          <div className='cardId'>
            <div className='collectionName'>
              <div>{collectionItemsDetail?.collectionName}</div>
              <div>{collectionItemsDetail?.collectionName} #{collectionItemsDetail?.tokenId}</div>
              <div>
                <div>
                  <img src={imgurl.market.collect2} alt="" />
                  <span>{collectionItemsDetail?.rarityScore}</span>
                </div>
                {/* <div>
                  <img src={imgurl.market.collect2} alt="" />
                  <span>2345</span>
                </div> */}
              </div>
            </div>

            <div className='Owner' onClick={jumpToMarket}>
              <img src={imgurl.home.SwiperIcon} alt="" />
              <span>Owner</span>
              <div className='address'>
                <span>{collectionItemsDetail?.owner.replace(collectionItemsDetail?.owner.substr(7, 31), '...')}</span>
                <img src={imgurl.market.exportIcon} alt="" />
              </div>
            </div>

          </div>
        </div>

        <div className='agreement-price'>
          <div className='agreement-price-top'>
            <div>
              <span>Agreement Price</span>
              <div>
                <img src={imgurl.market.Group105} alt="" />
                <span>{compute(collectionItemsDetail)?.agreementPrice.div(10 ** 18).toFixed(4, 1)}</span>
              </div>
            </div>
            <div onClick={showModal}>
              <Button width='2rem' height='.48rem' text='Sign Now' fontSize='.2rem'></Button>
            </div>
          </div>

          <div className='agreement-price-down'>
            <div className='Funds'>
              <div className='lump'>
                <div className='totalPrice'>
                  <img src={imgurl.market.Group106} alt="" />
                  <span>{compute(collectionItemsDetail)?.price.div(10 ** 18).toFixed(4, 1)}</span>
                  <div>
                    <span></span>
                    <span>{`${currency(EthPrice?.toFixed() ?? "0").format()}`}</span>
                  </div>
                </div>
                <div>
                  <span>Listed On {collectionItemsDetail?.market}</span>
                  <img src={collectionItemsDetail && imgurl.market[collectionItemsDetail?.market]} alt="" />
                </div>
              </div>
              <div className='minus'>
                <span>-</span>
              </div>
              <div className='lump'>
                <div className='fundsPrice'>
                  <img src={imgurl.market.Group106} alt="" />
                  <span>{compute(collectionItemsDetail)?.loanFunds.div(10 ** 18).toFixed(4, 1)}</span>
                </div>
                <div>
                  <span>Funds Amount</span>
                  <img src={imgurl.market.info_icon} alt="" />
                </div>
              </div>
            </div>
            <div className='ARP'>
              <span>{collectionItemsDetail?.apr.toFixed(2, 1)}%</span>
              <span>Earn APR</span>
            </div>
          </div>
        </div>

        <div className='activities'>
          <Flexible
            title="Activities"
            headerBackground='#000000'
            height=".76rem"
          >
            <div>
              <MyTable
                itemDetails={params}
              />
            </div>
          </Flexible>
        </div>
      </div>
      <MyModal ref={modal}>
        <Modal
          title="Complete Checkout"
          visible={isShowModal}
          footer={null}
          onCancel={onCancel}
          getContainer={modal.current}
          destroyOnClose={true}
        >
          <SignModal collectionItemsDetail={collectionItemsDetail} setIsShowModal={setIsShowModal} />
        </Modal>
      </MyModal>

    </Wrap>
  );
}

export default MarketItem;