import { Fragment, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { imgurl } from 'utils/globalimport'
const DatasWarp = styled.div`
  width: 16rem;
  margin: 0 auto;
  padding-bottom: 0.1rem;
  .datas_box {
    height: 1.6rem;
    color: #fff;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .data_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .data_item_count {
      font-size: 0.28rem;
      font-weight: 700;
      line-height: 0.6rem;
      .data_item_available {
        display: flex;
        justify-content: center;
        align-items: center;
        .available_icon {
          width: 0.28rem;
          height: 0.28rem;
          margin-right: 10px;
        }
      }
    }
    .data_item_name {
      font-weight: 300;
    }
  }
`
const Datas = () => {
  const [list, setList] = useState<any[]>([])
  useEffect(() => {
    //get datas
    const list = [
      {
        id: 1,
        name: 'NFTs Listing',
        count: 8791,
      },
      {
        id: 2,
        name: 'Available Supply',
        count: 48791.05,
      },
      {
        id: 3,
        name: 'Vault APR',
        count: 143.2,
      },
    ]
    setList(list)
  }, [])
  return (
    <DatasWarp>
      <div className="datas_box">
        {list.map((item, index) => {
          return (
            <div className="data_item" key={item.id}>
              <span className="data_item_count">
                {index === 0 && (
                  <CountUp
                    duration={3}
                    start={0}
                    end={item.count}
                    separator={','}
                  />
                )}
                {index === 1 && (
                  <div className="data_item_available">
                    <img className="available_icon" src={imgurl.ETH36} />
                    <CountUp
                      duration={3}
                      start={0}
                      end={item.count}
                      decimals={2}
                      separator={','}
                    />
                  </div>
                )}
                {index === 2 && (
                  <Fragment>
                    <CountUp duration={3} start={0} end={item.count} /> %
                  </Fragment>
                )}
              </span>
              <span className="data_item_name">{item.name}</span>
            </div>
          )
        })}
      </div>
    </DatasWarp>
  )
}

export default Datas
