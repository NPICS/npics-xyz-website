import ButtonDefault from 'component/ButtonDefault';
import moment from 'moment';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { message } from 'antd';
import { Turbo } from "../../../../../abis/Turbo";
import { imgurl } from "../../../../../utils/globalimport";
import { LoadingOutlined } from '@ant-design/icons';
interface ITurbo {
  id: number;
  img: string;
  title: string;
  price: number;
  endTime: number;
  isSale: boolean;
  url: string;
}
interface ITurboItem {
  item: ITurbo,
  whiteList: string[]
}

const ItemBox = styled.div`
  width: 3.5rem;
  border-radius: 0.1rem;
  box-shadow: 0px 0px 0.2rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .item_img{
    width: 100%;
    height: 2rem;
    background:#f1f1f1;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .item_info{
    padding: 0.16rem 0.2rem 0.26rem 0.2rem;
    font-size: 0.14rem;
    .item_title + .item_price,.item_price + .item_expired,.item_expired + .item_mint{
      margin-top: 0.16rem;
    }
    .item_title{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.16rem;
    color: rgba(0,0,0,1);
    font-weight: 700;
    &:hover{
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .item_price{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item_expired{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.22rem;
  }
  }
`
const MintBtn = styled.div
const TurboItem = memo(
  (props: ITurboItem) => {
    const { account, provider } = useWeb3React();
    const { item, whiteList } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mintText, setMintText] = useState<string>("coming soon");
    useEffect(() => {
      if (item.isSale) {
        setMintText("Mint")
      }
    }, [])
    const checkAccount = () => {
      if (account && provider) {
        const timestamp = parseInt(moment().format('X'));
        const isExpies = item.endTime < timestamp ? false : true;
        const iswhite = whiteList.find(address => address == account.toLowerCase());
        if (iswhite && isExpies && item.isSale) {
          return false
        }
        return true
      }
      return true
    }
    const mintNft = async () => {
      if (!provider) return
      console.log(provider);
      try {
        const signer = provider.getSigner();
        const contract = new Turbo(signer);
        setIsLoading(true);
        const tx = await contract.allowlistMint();
        await tx.wait();
        setIsLoading(false);
        message.success("You've successfully minted a Turbo")
      } catch (e: any) {
        setIsLoading(false);
        message.error("Sorry! you've minted the Trubo failed")
      }
    }
    return (
      <ItemBox>
        <div className='item_img'>
          <img src={imgurl.dashboard.turboOG} alt="" />
        </div>
        <div className='item_info'>
          <a className='item_title' href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
          <div className='item_price'>
            <span>Mint Fee</span>
            <span style={{ opacity: 0.5 }}>{item.price === 0 ? 'Free Mint' : `$ ${item.price / 1000}`}</span>
          </div>
          <div className='item_expired'>
            <span>Expires</span>
            <span>Expires {moment(item.endTime, 'X').fromNow()}</span>
          </div>
          <ButtonDefault
            disabled={checkAccount() || isLoading}
            height='0.6rem'
            minWidth='100%'
            types='normal'
            onClick={mintNft}
          >
            {isLoading ? <LoadingOutlined style={{ fontSize: '20px' }} /> : mintText}
          </ButtonDefault>
        </div>
      </ItemBox>
    )
  })

export default TurboItem