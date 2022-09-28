import React, { useState, useMemo } from "react";
import { Box, Flex, Grid, Icon, Typography } from "component/Box";
import ButtonDefault from "component/ButtonDefault";
import { useWeb3React } from "@web3-react/core";
import { Npics } from "abis/Npics";
import { useAppDispatch } from "../../../store/hooks";
import { setIsLoading } from "store/app";
import { message } from "antd";
import BigNumber from "bignumber.js";
import { imgurl } from "utils/globalimport";
import More from "./components/More";
import { BANK_ENUM } from "../../../utils/enums";

interface IRewardItem {
  name: string;
  icon: any;
  rewards: string;
  bank: BANK_ENUM;
  decimals: number;
}

function RewardItem({
  rewardItem,
  getData,
}: {
  rewardItem: IRewardItem;
  getData: Function;
}) {
  const { account, provider } = useWeb3React();
  const action = useAppDispatch();
  const onRewards = async () => {
    if (!provider) return;
    try {
      const signer = provider.getSigner(account);
      let npics = new Npics(signer);
      action(setIsLoading(true));
      await npics.claimRewards(rewardItem.bank);
      getData();
      action(setIsLoading(false));
    } catch (e) {
      action(setIsLoading(false));
      message.error(JSON.parse(JSON.stringify(e)).message);
    }
  };
  return (
    <Box
      background={"rgba(0,0,0,.03)"}
      border={"0.01rem solid rgba(0,0,0,.1)"}
      borderRadius={"0.1rem"}
      padding={"0.4rem 0.4rem 0.46rem 0.4rem"}
      display={"inline-block"}
    >
      <Flex flexDirection={"column"} gap={"0.2rem"}>
        <Flex gap={"0.17rem"} alignItems={"center"}>
          <Icon width="0.4rem" height="0.4rem" src={rewardItem.icon} />
          <Typography fontSize={"0.18rem"} fontWeight={"500"} color={"#000"}>
            {rewardItem.name}
          </Typography>
        </Flex>

        <Flex gap={"1.6rem"} alignItems={"center"}>
          <Flex alignItems={"center"} gap={"0.12rem"}>
            <Typography
              fontSize={"0.14rem"}
              fontWeight={"500"}
              color={"rgba(0,0,0,.5)"}
            >
              Reward to be received :{" "}
            </Typography>
            <Typography fontSize={"0.24rem"} fontWeight={"700"} color={"#000"}>
              {rewardItem.rewards &&
                new BigNumber(rewardItem.rewards?.toString())
                  .dp(3, 1)
                  .div(10 ** rewardItem.decimals)
                  .toFixed(4, 1)}
            </Typography>
          </Flex>

          <ButtonDefault
            padding="0rem 0.5rem"
            height="0.5rem"
            minWidth="1.5rem"
            scale={true}
            types={"normal"}
            disabled={rewardItem.rewards?.toString() === "0"}
            onClick={onRewards}
          >
            Claim
          </ButtonDefault>
        </Flex>
      </Flex>
    </Box>
  );
}

export default function MyRewards() {
  const { account, provider } = useWeb3React();

  const [rewardsList, setRewardsList] = useState<IRewardItem[]>([
    {
      name: "BEND",
      icon: imgurl.dashboard.rewardBend,
      rewards: "0",
      bank: BANK_ENUM.bend,
      decimals: 18,
    },
    {
      name: "pWING",
      icon: imgurl.dashboard.rewardPWing,
      rewards: "0",
      bank: BANK_ENUM.wing,
      decimals: 9,
    },
  ]);

  const getData = () => {
    if (!provider || !account) return;
    const promiseList = [];
    // TODO: library => provider @quan
    const signer = provider.getSigner(account);
    let npics = new Npics(signer);
    for (let i = 0; i < rewardsList.length; i++) {
      promiseList.push(npics.getRewardsBalance(account, rewardsList[i].bank));
    }
    Promise.all(promiseList).then((res) => {
      for (let i = 0; i < rewardsList.length; i++) {
        rewardsList[i].rewards = res[i].toString();
      }
      setRewardsList(JSON.parse(JSON.stringify(rewardsList)));
    });
  };

  useMemo(() => {
    if (account) {
      getData();
    }
  }, [account]);

  return (
    <Box padding={"0.4rem 0.6rem"} position={"relative"}>
      <Typography
        fontSize={"0.3rem"}
        fontWeight={800}
        color={"#000"}
        marginBottom="0.3rem"
      >
        NPics Rewards
      </Typography>
      {/* <Typography fontSize={"0.16rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom={"0.3rem"}>Participate in the down payment loan to buy NFT and earn double rewards</Typography> */}
      <Typography
        fontSize={"0.16rem"}
        fontWeight={500}
        color={"rgba(0,0,0,.5)"}
        marginBottom={"0.5rem"}
      >
        Rates shown are estimates, and fluctuate based on many different
        factors, including collection floor price, trading volume, pool
        liquidity, token price, etc.
      </Typography>
      <Typography
        fontSize={"0.2rem"}
        fontWeight={700}
        color={"#000"}
        marginBottom={"0.2rem"}
      >
        Your Rewards
      </Typography>
      <Grid gridTemplateColumns="1fr 1fr" gridColumnGap="0.5rem">
        {rewardsList.map((item, index) => (
          <RewardItem rewardItem={item} getData={getData} key={index} />
        ))}
      </Grid>
      <Box position={"absolute"} right={"0.3rem"} top={"0.3rem"}>
        <More />
      </Box>
    </Box>
  );
}
