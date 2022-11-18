import Overview from 'component/Overview';
import React from 'react'
import { ChipSwapHomeWarp, ChipSwapVaults } from './style'

const ChipSwapHome = () => {
  return (
    <ChipSwapHomeWarp>
      <Overview type='cp' dataList={[8791, 48791.86, 1.4896]} />
      <ChipSwapVaults>
        1
      </ChipSwapVaults>
    </ChipSwapHomeWarp>
  )
};
export default ChipSwapHome;