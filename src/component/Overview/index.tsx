import { Skeleton } from 'antd';
import NewButton from 'component/NewButton';
import React, { Fragment, useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { imgurl } from 'utils/globalimport';
import { OverviewBox, OverviewWarp } from './style'
const Overview = ({ type, dataList }: { type: string, dataList: number[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (dataList.length > 0) {
      console.log("数据加载完成");

      setIsLoading(false)
    }
  }, [dataList])
  return (
    <OverviewWarp>
      <OverviewBox>
        <div className='overview_left'>
          <h3 className='left_title'>OVERVIEW</h3>
          <div className='left_btn'>
            {
              type === "dp" && <Fragment>
                <NewButton text='Discover' color='#fff' bg='#FF490F' radius='0.1rem' margin='0 0.2rem 0 0' />
                <NewButton text='Vaults' color='#000' bg='#fff' radius='0.1rem' />
              </Fragment>
            }
            {
              type === "cp" && <Fragment>
                <NewButton text='Swap' color='#fff' bg='#FF490F' radius='0.1rem' margin='0 0.2rem 0 0' />
                <NewButton text='Chip' color='#000' bg='#fff' radius='0.1rem' />
              </Fragment>
            }

          </div>
        </div>
        <div className='overview_right'>
          <div className='right_data_box'>
            <div className='data_item'>
              {
                isLoading && <Skeleton.Button shape={'square'} active style={{ height: '0.3rem', minWidth: '1rem', borderRadius: '0.08rem' }}></Skeleton.Button>
              }
              {
                !isLoading && <CountUp
                  duration={2}
                  className="data_count"
                  start={0}
                  end={dataList[0]}
                  separator={','}
                />
              }
              <span className="data_title">{type === "dp" ? 'NFTs Listing' : 'Vault NFTs'}</span>
            </div>
            <div className='data_item'>
              {
                isLoading && <Skeleton.Button shape={'square'} active style={{ height: '0.3rem', minWidth: '1rem', borderRadius: '0.08rem' }}></Skeleton.Button>
              }
              {
                !isLoading && <div className='available_box'>
                  <img className="available_icon" src={imgurl.ETHIcon} />
                  <CountUp
                    className='data_count'
                    duration={2}
                    start={0}
                    end={dataList[1]}
                    separator={','}
                  />
                </div>
              }
              <span className="data_title">{type === "dp" ? 'Available Supply' : 'Total Liquidity'}</span>
            </div>
            <div className='data_item'>
              {
                isLoading && <Skeleton.Button shape={'square'} active style={{ height: '0.3rem', minWidth: '1rem', borderRadius: '0.08rem' }}></Skeleton.Button>
              }
              {
                !isLoading && <div className='data_count'><CountUp className='data_count' duration={1.5} decimals={2} start={0} end={dataList[2] * 100} />%</div>
              }
              <span className="data_title">{type === "dp" ? 'Vault APR' : 'Total Volume'}</span>
            </div>
          </div>
        </div>
      </OverviewBox>

    </OverviewWarp>
  )
};
export default Overview;