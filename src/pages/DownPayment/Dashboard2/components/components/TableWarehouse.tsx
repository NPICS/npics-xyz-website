import React, { useState } from "react";
import { Flex, Icon, Typography } from "component/Box";
import BigNumber from "bignumber.js";
import { Table, Td, Th, Tr } from "component/Table/Cell";
import { useAppSelector } from "store/hooks";
import { globalConstant } from "utils/globalConstant";
import { imgurl } from "utils/globalimport";
import { thousandFormat } from "utils/urls";
import { VaultsItemData } from "./StyledInterface";
import { useNavigate } from "react-router-dom";
import { TextPlaceholder } from "component/styled";
import ButtonDefault from "component/ButtonDefault";
import styled from "styled-components";
import AcceptOffersList from "./AcceptOffersList";
import AcceptOffer from "./AcceptOffer";
import { Offers } from "model/offers";
import NFTPayProgressing from "pages/DownPayment/Marketplace2/NFTPayProgressing";
import Progressing from "component/Modal/Progressing";

enum Color {
  "Inforce" = "#7BD742",
  "In Risk" = "#FFD43B",
  "In Liquidation" = "#FF4949",
  "Terminated" = "#7F7F7F",
}
const Hover_Tr = styled(Tr)`
  &:hover {
    background: #0000001a;
  }
`;
export enum OfferModal {
  NONE,
  OFFERSLIST = 1 << 0,
  OFFER = 1 << 1,
  PROGRESSING = 1 << 2,
}

export default function TableWarehouse(props: {
  Source?: VaultsItemData[];
  getNftActivities?: Function;
}) {
  const { Source, getNftActivities } = props;
  const [showOffer, setShowOffer] = useState<OfferModal>(OfferModal.NONE);
  const [nftInfo, setNftInfo] = useState<VaultsItemData>();
  const [accpetOffer, setAcceptOffer] = useState<Offers>();
  const navigate = useNavigate();
  const ethRate = useAppSelector(
    (state) => new BigNumber(state.app.data.EthPrice)
  );

  const jumpToEthscan = (e: VaultsItemData) => {
    if (e.terminated()) return;
    navigate(`/vaultsDetail/${e.id}`);
  };
  const jumpToNEOEthscan = (e: VaultsItemData) => {
    if (e.terminated()) return;
    window.open(`https://cn.etherscan.com/nft/${e.neo}/${e.tokenId}`);
  };
  console.log("Source", Source);
  return (
    <>
      <Table>
        <thead>
          <Tr>
            <Th>Asset</Th>
            <Th textAlign="left" paddingLeft="60px">
              NEO NFT
            </Th>
            <Th textAlign="left">Debt</Th>
            <Th textAlign="left">Liquidation Price</Th>
            <Th textAlign="left">Health Factor</Th>
            <Th textAlign="left">Status</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {Source?.map((item, idx) => {
            return (
              <Hover_Tr
                key={item.key}
                background={item.terminated() ? "#00000008" : ""}
              >
                <Td>
                  <div
                    className="items"
                    style={{ cursor: `${item.terminated() ? "" : "pointer"}` }}
                    onClick={() => jumpToEthscan(item)}
                  >
                    <img className="avatar" src={item.imageUrl} alt="" />
                    <div className="text">
                      <div>
                        <span></span>
                        <span>&nbsp;{item.nftName}</span>
                      </div>
                      <div>
                        Floor:{" "}
                        <span>
                          <img src={imgurl.dashboard.ethGrey18} alt="" />
                          {item.floorPrice.toFixed(2, 1)}
                          <Typography marginLeft="5px">{`(${thousandFormat(
                            item.floorPrice.times(ethRate).toNumber()
                          )})`}</Typography>
                        </span>
                      </div>
                    </div>
                  </div>
                </Td>

                <Td>
                  <div
                    className="contract"
                    style={{ cursor: `${item.terminated() ? "" : "pointer"}` }}
                    onClick={() => jumpToNEOEthscan(item)}
                  >
                    <span title={item.singularForName()}>NEO</span>
                    &nbsp;{item.nftName}
                    {item.terminated() ? null : (
                      <Icon
                        width="14px"
                        height="14px"
                        src={imgurl.dashboard.exportBlack18}
                        alt=""
                      />
                    )}
                  </div>
                </Td>

                <Td>
                  {
                    item.terminated() ? (
                      TextPlaceholder
                    ) : (
                      <Flex alignItems="center">
                        <Icon
                          width="18px"
                          height="18px"
                          src={imgurl.dashboard.ethBlack18}
                          alt=""
                        />
                        <Typography
                          fontSize="14px"
                          fontWeight="500"
                          color="#000"
                        >
                          {item.debtString()}
                        </Typography>
                      </Flex>
                    )
                    /* <Typography fontSize="14px" fontWeight="500" color="rgba(0,0,0,.5)" marginLeft="3px">
                        {`(${thousandFormat(item.totalDebt.times(ethRate)
                          .div(10 ** 18)
                          .toNumber())})`}
                      </Typography> */
                  }
                </Td>

                <Td>
                  {
                    item.terminated() ? (
                      TextPlaceholder
                    ) : (
                      <Flex alignItems="center">
                        <Icon
                          width="18px"
                          height="18px"
                          src={imgurl.dashboard.ethBlack18}
                          alt=""
                        />
                        <Typography
                          fontSize="14px"
                          fontWeight="500"
                          color="#000"
                        >
                          {item
                            .liquidationPrice()
                            .div(10 ** 18)
                            .toFixed(4, 1)}
                        </Typography>
                      </Flex>
                    )
                    /* <Typography marginLeft="3px" fontSize="14px" fontWeight="500" color="rgba(0,0,0,.5)" >{`(${thousandFormat(item.liquidationPrice().times(ethRate)
                        .div(10 ** 18)
                        .toNumber())})`}</Typography> */
                  }
                </Td>

                <Td>
                  {item.terminated() ? (
                    TextPlaceholder
                  ) : (
                    <div className="healthFactor">
                      {item.getHealthFactor().toFixed(4, 1)}
                    </div>
                  )}
                </Td>
                <Td>
                  <div
                    className="status"
                    style={{
                      color: `${Color[
                        item.getFactorStatusString() as
                        | "Inforce"
                        | "In Risk"
                        | "In Liquidation"
                        | "Terminated"
                        ]
                        }`,
                    }}
                  >
                    {item.getFactorStatusString()}
                  </div>
                </Td>
                <Td>
                  {
                    // <Flex alignItems='center' justifyContent='center' gap="10px">
                    item.terminated() ? (
                      <div />
                    ) : (
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        gap="10px"
                      >
                        <ButtonDefault
                          height="45px"
                          minWidth="120px"
                          types="normal"
                          onClick={() => navigate(`/vaultsDetail/${item.id}`)}
                        >
                          Repay
                        </ButtonDefault>
                        <ButtonDefault
                          height="45px"
                          minWidth="120px"
                          types="second"
                          onClick={() => {
                            setShowOffer(OfferModal.OFFERSLIST);
                            setNftInfo(item);
                          }}
                        >
                          Offers
                        </ButtonDefault>
                      </Flex>
                    )
                  }
                </Td>
              </Hover_Tr>
            );
          })}
        </tbody>
      </Table>
      <AcceptOffersList
        setAcceptOffer={setAcceptOffer}
        showOffer={showOffer}
        setShowOffer={setShowOffer}
        nftAddress={nftInfo?.nft}
      />
      <AcceptOffer
        nftInfo={nftInfo}
        accpetOffer={accpetOffer}
        showOffer={showOffer}
        setShowOffer={setShowOffer}
        getNftActivities={getNftActivities}
      />

      {/* popup loading */}
      <Progressing isOpen={showOffer === OfferModal.PROGRESSING} />
    </>
  );
}
