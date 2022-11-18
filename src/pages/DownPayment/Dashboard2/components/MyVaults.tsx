import React, { useState, useEffect } from "react";
import { Box, Flex, Icon, Typography } from "component/Box";
import { imgurl } from "utils/globalimport";
import { Select } from "antd";
import styled from "styled-components";
import VaultsTable from "./components/VaultsTable";
import BigNumber from "bignumber.js";
import { numberFormat, thousandFormat } from "utils/urls";
import { useAppSelector } from "store/hooks";
import { useWeb3React } from "@web3-react/core";
import { Npics } from "../../../../abis/Npics";
const { Option } = Select;

const AntdSelect = styled(Select)`
  .ant-select-selector {
    color: rgba(0, 0, 0, 0.5);
    font-weight: 500;
    font-size: 0.14rem;
    min-width: 2rem;
    min-height: 0.5rem;
    padding: 0 0.23rem !important;
    border: 0.01rem solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: none !important;
    border-radius: 0.1rem !important;
    transition: all 0s !important;
    .ant-select-selection-item {
      line-height: 0.5rem;
      transition: all 0s !important;
    }
  }
`;

export default function MyVaults() {
  const [sortedInfo, setSortedInfo] = useState<string>("");
  const [totalDebts, setTotalDebts] = useState<BigNumber>(new BigNumber(0));
  // const DollarDebt = useEthPrice(totalDebts)
  const ethRate = useAppSelector(
    (state) => new BigNumber(state.app.data.EthPrice)
  );

  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      const nbp = new Npics(null);
      nbp.getDebtWEthOf(account).then((res) => {
        setTotalDebts(res);
      });
    }
  }, [account]);

  const onSelect = (val: any) => {
    setSortedInfo(val);
  };

  return (
    <Box padding={"0.4rem 0.6rem"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        marginBottom={"0.24rem"}
      >
        <Flex flexDirection={"column"}>
          <Typography
            fontSize={"0.3rem"}
            fontWeight={"800"}
            color={"#000"}
          // userSelect={"none"}
          >
            My Vaults
          </Typography>
          <Flex alignItems={"center"}>
            <Typography
              fontWeight={500}
              fontSize={"0.14rem"}
              color={"rgba(0,0,0,.5)"}
            >
              Total Debt：
            </Typography>
            <Icon
              width="0.15rem"
              height="0.15rem"
              src={imgurl.GreyEth}
            />
            <Typography
              fontWeight={500}
              fontSize={"0.14rem"}
              color={"rgba(0,0,0,.5)"}
            >
              {totalDebts.div(10 ** 18).toFixed(3, 1)}
            </Typography>
            <Typography
              fontWeight={500}
              fontSize={"0.14rem"}
              marginLeft={"0.1rem"}
              color={"rgba(0,0,0,.5)"}
            >{`(${totalDebts &&
              thousandFormat(
                totalDebts
                  .times(ethRate)
                  .div(10 ** 18)
                  .toNumber()
              )
              })`}</Typography>
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
        </Typography>
      </Flex>

      {/*Test*/}
      {/*<AcceptOffersList />*/}
      {/*<AcceptOffer />*/}

      <VaultsTable sortedInfo={sortedInfo} />

      {/* <NotFound /> */}
    </Box>
  );
}
