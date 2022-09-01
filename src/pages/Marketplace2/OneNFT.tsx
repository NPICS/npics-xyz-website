import { Box, Flex, Grid, Icon, Typography } from "../../component/Box";
import PopIcon from "../../assets/images/market/one_nft_pop.png";
import { imgurl } from "../../utils/globalimport";
import styled from "styled-components";
import NFTInfo from "./NFTInfo";
import NFTProperties from "./NFTProperties";
import NFTActivities from "./NFTActivities";
import NFTShare from "./NFTShare";
import NFTPrice from "./NFTPrice";
import React, { useEffect, useState } from "react";
import http, { SUDOSWAP_GRAPH_API } from "../../utils/http";
import { CollectionDetail } from "../../model/user";
import { deserialize } from "class-transformer";
import { useParams, useNavigate } from "react-router-dom";
import { Banner } from "./Market";
import nftWarningIcon from "../../assets/images/market/nft_warning_tips.png";
import { getNFTStatusInOpensea } from "../../utils/opensea";
import { useAsync } from "react-use";
import { Popover } from "antd";
import rarity_1_icon from "../../assets/images/market/rarity_1.svg";
import rarity_2_icon from "../../assets/images/market/rarity_2.svg";
import { Pop20 } from "component/Popover/Popover";
import axios from "axios";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import {
  ChainId,
  multicallClient,
  newClientContract,
} from "../../utils/multicall";

function Label(props: { icon?: string; num: number }) {
  return (
    <Flex
      gap={"0.06rem"}
      alignItems={"center"}
      padding={"0.04rem 0.09rem"}
      minHeight={"0.3rem"}
      borderRadius={"0.14rem"}
      border={"0.01rem solid #FFFFFF4D"}
      background={"#FFFFFF33"}
      style={{
        cursor: `${props.icon ? "pointer" : ""}`,
        backdropFilter: "blur(0.1rem)",
      }}
    >
      {props.icon && <Icon width={"0.2rem"} src={props.icon} />}
      <Typography fontSize={"0.14rem"} fontWeight={500} color={"#fff"}>{`${
        props.icon ? "" : "#"
      }${props.num}`}</Typography>
    </Flex>
  );
}

const NFTMain = styled.div`
  margin-top: 0.24rem;
  background: #fff;
  border-radius: 0.1rem;
  padding: 0.3rem;
  display: grid;
  grid-template-columns: 4.8rem 6.5rem auto;
  //grid-template-rows: 4.8rem auto auto;
  grid-template-rows: 4.8rem auto auto;
  grid-gap: 0.26rem;
  grid-template-areas:
    "cover price share"
    "info activities activities"
    "props activities activities";
  min-width: calc(4.8rem + 6.5rem + 3rem);
`;

const Cover = styled.img`
  display: block;
  width: 100%;
  overflow: hidden;
  border-radius: 0.1rem;
`;

export default function OneNFT() {
  const [detailData, setDetailData] = useState<CollectionDetail | undefined>(
    undefined
  );
  const { provider, account } = useWeb3React();
  const navigate = useNavigate();
  let urlParams: any = useParams();
  const params: { address: string; tokenId: string } = urlParams;
  const [openSeaIsNormalization, setOpenSeaIsNormalization] =
    useState<boolean>(true);
  const [rarityData, setRarityData] = useState<{ [key: string]: any }>();

  useAsync(async () => {
    if (!params) return;
    await loadDetailData();
    {
      /// rarity
      const resp: any = await http.myPost(
        `/npics-nft/app-api/v2/nft/getRarity`,
        {
          address: params.address,
          tokenId: params.tokenId,
        }
      );
      if (resp.code === 200 && resp.data) {
        setRarityData(resp.data);
      }
    }
  }, [params]);

  useAsync(async () => {
    if (!detailData) return;
    // let flag = await getNFTStatusInOpensea(detailData.address, Number(detailData.tokenId))
    // console.log(`flag => ${flag}`)
    // setOpenSeaIsNormalization(flag as boolean)
    let resp: any = await http.myPost(
      `/npics-nft/app-api/v2/nft/getNftApprove`,
      {
        address: detailData.address,
        tokenId: detailData.tokenId,
      }
    );
    if (resp.code === 200 && resp.data) {
      setOpenSeaIsNormalization(resp.data.supports_wyvern === true);
    }
  }, [detailData]);

  function getRarityIconByName(name: string): string | undefined {
    switch (name) {
      case "rarity_sniper":
        return rarity_1_icon;
      case "trait_sniper":
        return rarity_2_icon;
      default:
        return undefined;
    }
  }

  function getRarityPopoverText(name: string, status: string): string {
    switch (name) {
      case "rarity_sniper":
        return `Rarity Sniper Ranking ${status ? `(${status})` : ""}`;
      case "trait_sniper":
        return `Trait Sniper Ranking ${status ? `(${status})` : ""}`;
      case "gem":
        return `NPics Ranking ${status ? `(${status})` : ""}`;
      default:
        return "";
    }
  }

  async function loadDetailData() {
    if (!params) return;
    /// nft detail data
    const resp: any = await http.myPost(
      `/npics-nft/app-api/v2/nft/getCollectionItemsDetail`,
      {
        address: params.address,
        tokenId: params.tokenId,
      }
    );
    if (resp.code === 200 && resp.data) {
      const dats = deserialize(CollectionDetail, JSON.stringify(resp.data));
      if (dats.market === "sudoswap") {
        const pairAddress = await axios
          .post(SUDOSWAP_GRAPH_API, {
            query: `
          {
          pairs(first: 1, where:{collection: "${dats.address}", nftIds_contains: ["${dats.tokenId}"]}) {
            id
            spotPrice
            collection {
              id
            }
            nftIds
          }
        }
          `,
          })
          .then((res) => {
            const pairs = res.data.data.pairs;
            if (pairs.length === 0) {
              return 0;
            } else {
              return pairs[0].id;
            }
          });
        const pairContract = newClientContract(
          [
            {
              inputs: [
                { internalType: "uint256", name: "numNFTs", type: "uint256" },
              ],
              name: "getBuyNFTQuote",
              outputs: [
                {
                  internalType: "enum CurveErrorCodes.Error",
                  name: "error",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "newSpotPrice",
                  type: "uint256",
                },
                { internalType: "uint256", name: "newDelta", type: "uint256" },
                {
                  internalType: "uint256",
                  name: "inputAmount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "protocolFee",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
          pairAddress,
          ChainId.ETH
        );
        const spotPrice = await multicallClient([
          pairContract.getBuyNFTQuote(1),
        ]).then((res) => res[0].resultData);
        console.log("spotPricespotPrice", spotPrice);
        dats.currentBasePrice = new BigNumber(spotPrice);
        dats.pairAddress = pairAddress;
      }
      setDetailData(dats);
    }
  }

  return (
    <Box
      padding={"1.6rem"}
      // width={"16rem"}
      background={"transparent"}
      position={"relative"}
    >
      {/* Banner */}
      <Banner url={detailData?.bannerImageUrl} />
      <Box position={"relative"} zIndex={1}>
        {/* nav */}
        <Flex flexDirection={"row"} gap={"0.15rem"} alignItems={"start"}>
          <Icon
            style={{ cursor: "pointer" }}
            height={"0.36rem"}
            width={"0.36rem"}
            src={PopIcon}
            onClick={() =>
              navigate(`/marketplace/collections/${detailData?.address}`)
            }
          />
          <Flex flexDirection={"column"} gap={"0.05rem"}>
            <Typography fontSize={"0.16rem"} color={"#fff"} fontWeight={500}>
              {detailData?.collectionName}
            </Typography>
            <Flex alignItems={"center"} gap={"0.12rem"}>
              <Typography fontSize={"0.3rem"} color={"#fff"} fontWeight={800}>
                {
                  // `${detailData?.singularForName()} #${detailData?.tokenId}`
                  // detailData && `${detailData.nftName() ?? ""}${detailData.isNoName() ? "" : " #"}${detailData.tokenId}`
                  detailData && detailData.name && detailData.name.length > 0
                    ? detailData.name
                    : `${detailData?.tokenId}`
                }
              </Typography>
              <Pop20 content={"Reported for Suspicious Activity on OpenSea"}>
                <Icon
                  width={"0.24rem"}
                  height={"0.24rem"}
                  src={nftWarningIcon}
                  hidden={openSeaIsNormalization}
                />
              </Pop20>
            </Flex>

            <Flex flexDirection={"row"} gap={"0.15rem"} alignItems={"stretch"}>
              {rarityData &&
                Object.entries(rarityData).map(([key, val]) => {
                  return (
                    val &&
                    val.rank && (
                      <Pop20
                        content={getRarityPopoverText(key, val.status)}
                        key={val.url}
                      >
                        <Box
                          onClick={() => {
                            // Temporary solution
                            if (key === "gem") return;
                            window.open(val.url);
                          }}
                        >
                          {/* <a href={val.url} target="_blank"> */}
                          <Label
                            key={key}
                            icon={getRarityIconByName(key)}
                            num={Number(val.rank) ?? 0}
                          />
                          {/* </a> */}
                        </Box>
                      </Pop20>
                    )
                  );
                })}
            </Flex>
          </Flex>
        </Flex>
        {/* main */}
        <NFTMain>
          <Grid gridArea={"cover"}>
            <Cover src={detailData?.imageUrl} />
          </Grid>
          <Grid gridArea={"price"}>
            <NFTPrice item={detailData} refreshBlock={loadDetailData} />
          </Grid>
          <Grid gridArea={"info"}>
            <NFTInfo item={detailData} />
          </Grid>
          <Grid gridArea={"props"}>
            <NFTProperties item={detailData} />
          </Grid>
          <Grid gridArea={"activities"}>
            <NFTActivities item={detailData} />
          </Grid>
          <Grid gridArea={"share"}>
            <NFTShare item={detailData} />
          </Grid>
        </NFTMain>
      </Box>
    </Box>
  );
}
