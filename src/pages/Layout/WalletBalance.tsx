import { useWeb3React } from "@web3-react/core";
import { message } from "antd";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { imgurl } from "utils/globalimport";
import styled from "styled-components";
import { Erc20 } from "abis/Erc20";
import { ContractAddresses } from "utils/addresses";
import { useBendPrice, useEthPrice, usePWingPrice } from "utils/hook";
import { font01651, font01455 } from "component/styled";
import { numberFormat } from "../../utils/urls";
import { TextPlaceholder } from "../../component/styled";
import PWingIcon from "../../assets/images/home/PWing.svg";
import {
  ChainId,
  multicallClient,
  newClientContract,
} from "../../utils/multicall";
import Erc20Abi from "../../abis/erc20.json";

interface wallet {
  icon: string;
  text: string;
  amount: BigNumber | string;
  dollar: BigNumber | string;
}
const Wrap = styled.div`
  display: grid;
  grid-gap: 0.2rem;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      ${font01651}
      img {
        width: 0.22rem;
        height: 0.22rem;
        margin-right: 0.1rem;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      & > span:nth-child(1) {
        ${font01651};
        text-align: right;
      }
      & > span:nth-child(2) {
        ${font01455};
        text-align: right;
      }
    }
  }
`;
export default function WalletBalance() {
  const { provider, account } = useWeb3React();
  const [ETHBalance, setETHBalance] = useState<BigNumber>();
  const [WETHBalance, setWETHBalance] = useState<BigNumber>();
  const [BDBalance, setBDBalance] = useState<BigNumber>();
  const [pWingBalance, setPWingBalance] = useState<BigNumber>();
  const [list, setList] = useState<wallet[]>();
  const ETHdollar = useEthPrice(ETHBalance);
  const WETHdollar = useEthPrice(WETHBalance);
  const BDdollar = useBendPrice(BDBalance);
  const pWingdollar = usePWingPrice(pWingBalance);
  useEffect(() => {
    getBalance();
    // eslint-disable-next-line
  }, [account]);

  const getBalance = async () => {
    if (!account || !provider) {
      // message.error('account is undefined')
      return;
    }
    const balance = provider.getBalance(account);

    const wethContract = newClientContract(
      Erc20Abi,
      ContractAddresses.WETH,
      ChainId.ETH
    );
    const bendDaoContract = newClientContract(
      Erc20Abi,
      ContractAddresses.BendDaoProxy,
      ChainId.ETH
    );
    const pWingDaoContract = newClientContract(
      Erc20Abi,
      ContractAddresses.PWingProxy,
      ChainId.ETH
    );
    const calls = [
      wethContract.balanceOf(account),
      bendDaoContract.balanceOf(account),
      pWingDaoContract.balanceOf(account),
    ];

    Promise.all([balance, multicallClient(calls)]).then((values: any[]) => {
      setETHBalance(new BigNumber(values[0].toString()));
      setWETHBalance(new BigNumber(values[1][0].returnData));
      setBDBalance(new BigNumber(values[1][1].returnData));
      setPWingBalance(new BigNumber(values[1][2].returnData));
    });
  };

  useEffect(() => {
    const data = [
      {
        icon: imgurl.home.ethBlack22,
        text: "ETH",
        amount: ETHBalance ?? TextPlaceholder,
        dollar: ETHdollar ?? TextPlaceholder,
      },
      {
        icon: imgurl.home.ethOrange22,
        text: "WETH",
        amount: WETHBalance ?? TextPlaceholder,
        dollar: WETHdollar ?? TextPlaceholder,
      },
      {
        icon: imgurl.home.band22,
        text: "BEND",
        amount: BDBalance ?? TextPlaceholder,
        dollar: BDdollar ?? TextPlaceholder,
      },
      {
        icon: imgurl.home.PWingIcon,
        text: "pWing",
        amount: pWingBalance ?? TextPlaceholder,
        dollar: pWingdollar ?? TextPlaceholder,
      },
    ];
    setList(data);
  }, [ETHBalance, ETHdollar, WETHBalance, WETHdollar, BDBalance, BDdollar]);

  return (
    <Wrap>
      {list?.map((item) => {
        return (
          <div key={item.text} className="item">
            <div className="left">
              <img src={item.icon} alt="" />
              <span>{item.text}</span>
            </div>
            <div className="right">
              {/*<span>{new BigNumber(item.amount.toString()).div(10 ** 18).dp(4).toFixed()}</span>*/}
              {/*<span>${item.dollar.dp(0).toFixed()}</span>*/}
              <span>
                {typeof item.amount === "string"
                  ? item.amount
                  : numberFormat(item.amount.div(10 ** 18).toFixed())}
              </span>
              <span>
                {typeof item.dollar === "string"
                  ? item.dollar
                  : `$${numberFormat(item.dollar.toFixed())}`}
              </span>
            </div>
          </div>
        );
      })}
    </Wrap>
  );
}
