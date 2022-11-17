import {
  HomeWrap
} from './HomeStyled'
import Table from './components/Table'
import styled from 'styled-components'
import Overview from 'component/Overview'
import { useIntervalWhen } from 'rooks'
import http from 'utils/http'
import { useState } from 'react'
const MyTable: any = styled(Table)`
  /* min-width: 16rem; */
  height: 7.47rem;
  margin: 0 auto;
`

function Home() {
  const [dataList, setDataList] = useState<any>([])
  useIntervalWhen(
    () => {
      getData();
    },
    60000,
    true,
    true
  )
  const getData = async () => {
    const resp: any = await http.myGet("/npics-nft/app-api/v2/statistics/getStatistics", {})
    const res = resp.data;
    if (res.code === 200 && res.data) {
      setDataList(Object.values(res.data))
    }
  }
  return (
    <HomeWrap>
      <Overview type='dp' dataList={dataList} />
      <div className='collection_box'>
        <div className="collections-title">Collections</div>
        <MyTable />
      </div>
    </HomeWrap>
  )
}

export default Home