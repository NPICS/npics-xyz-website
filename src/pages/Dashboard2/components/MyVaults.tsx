import React, { useState,useEffect } from "react"
import { Box, Flex, Icon, Typography } from "component/Box";
import { imgurl } from "utils/globalimport";
import { Select } from "antd";
import styled from 'styled-components';
import VaultsTable from "./components/VaultsTable";
import BigNumber from "bignumber.js";
import { useEthPrice } from "utils/hook";
import { numberFormat, thousandFormat } from "utils/urls";
import { useAppSelector } from "store/hooks";
const {Option} = Select

const AntdSelect = styled(Select)`
  .ant-select-selector {
    color: rgba(0,0,0,.5);
    font-weight: 500;
    font-size: 14px;
    min-width: 200px;
    min-height: 50px;
    padding: 0 23px !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: none !important;
    border-radius: 10px !important;
    transition: all 0s !important;
    .ant-select-selection-item {
      line-height: 50px;
      transition: all 0s !important;
    }
  }
`

export default function MyVaults() {
  const [sortedInfo, setSortedInfo] = useState<string>('')
  const [totalDebts, setTotalDebts] = useState<BigNumber>(new BigNumber(0))
  // const DollarDebt = useEthPrice(totalDebts)
  const ethRate = useAppSelector(state => new BigNumber(state.app.data.EthPrice))

  const onSelect = (val: any) => {
    console.log(val);
    setSortedInfo(val)
  }

  return <Box
    padding={"40px 60px"}
  >
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      marginBottom={"24px"}
    >
      <Flex
        flexDirection={"column"}
      >
        <Typography
          fontSize={"30px"}
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
            fontSize={"14px"}
            color={"rgba(0,0,0,.5)"}
          >Total Debt：</Typography>
          <Icon width="18px" height="18px" src={imgurl.dashboard.ethGrey18} />
          <Typography
            fontWeight={500}
            fontSize={"14px"}
            color={"rgba(0,0,0,.5)"}
          >{totalDebts.div(10 ** 18).toFixed(3, 1)}</Typography>
          <Typography
            fontWeight={500}
            fontSize={"14px"}
            marginLeft={"10px"}
            color={"rgba(0,0,0,.5)"}
          >{`(${totalDebts && thousandFormat(totalDebts.times(ethRate)
            .div(10 ** 18)
            .toNumber())})`}</Typography>
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