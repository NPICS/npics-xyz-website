import React, { useState,useEffect } from "react"
import { Box, Flex, Icon, Typography } from "component/Box";
import { imgurl } from "utils/globalimport";
import { Select } from "antd";
import styled from 'styled-components';
import VaultsTable from "./components/VaultsTable";
import BigNumber from "bignumber.js";
import { useEthPrice } from "utils/hook";
import { numberFormat } from "utils/urls";
const {Option} = Select

const AntdSelect = styled(Select)`
  .ant-select-selector {
    color: rgba(0,0,0,.5);
    font-weight: 500;
    font-size: .14rem;
    min-width: 2rem;
    min-height: .5rem;
    padding: 0 .23rem !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: none !important;
    border-radius: 10px !important;
    transition: all 0s !important;
    .ant-select-selection-item {
      line-height: .5rem;
      transition: all 0s !important;
    }
  }
`

export default function MyVaults() {
  const [sortedInfo, setSortedInfo] = useState<string>('')
  const [totalDebts, setTotalDebts] = useState<BigNumber>(new BigNumber(0))
  const DollarDebt = useEthPrice(totalDebts)

  const onSelect = (val: any) => {
    console.log(val);
    setSortedInfo(val)
  }

  return <Box
    padding={".4rem .6rem"}
  >
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      marginBottom={".24rem"}
    >
      <Flex
        flexDirection={"column"}
      >
        <Typography
          fontSize={".3rem"}
          fontWeight={"800"}
          color={"#000"}
          // userSelect={"none"}
        >
          My Vaults
        </Typography>
        <Flex
          alignItems={"center"}
        >
          <Typography 
            fontWeight={500}
            fontSize={".14rem"}
            color={"rgba(0,0,0,.5)"}
          >Total Debt：</Typography>
          <Icon width=".18rem" height=".18rem" src={imgurl.dashboard.ethGrey18} />
          <Typography
            fontWeight={500}
            fontSize={".14rem"}
            marginLeft={".05rem"}
            color={"rgba(0,0,0,.5)"}
          >{totalDebts.div(10 ** 18).toFixed(3, 1)}</Typography>
          <Typography
            fontWeight={500}
            fontSize={".14rem"}
            marginLeft={".1rem"}
            color={"rgba(0,0,0,.5)"}
          >{`($${DollarDebt && numberFormat(DollarDebt?.dp(0).toFixed())})`}</Typography>
        </Flex>
      </Flex>

      <Typography>
        <AntdSelect
            onSelect={onSelect}
            defaultValue="All"
            dropdownClassName="ant-select-reset"
          >
          <Option value="All">All</Option>
          <Option value="Inforce">Inforce</Option>
          <Option value="In Risk">In Risk</Option>
          <Option value="In Liquidation">In Liquidation</Option>
          <Option value="Terminated">Terminated</Option>
        </AntdSelect>
      </Typography >
    </Flex>
    
    <VaultsTable setTotalDebts={setTotalDebts} sortedInfo={sortedInfo} />

    {/* <NotFound /> */}

  </Box>
}