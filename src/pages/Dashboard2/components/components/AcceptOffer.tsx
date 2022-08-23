import React, { useState, useEffect, useMemo } from "react";
import Modal from "../../../../component/Modal";
import { Box, Flex, Grid, Icon, Typography } from "../../../../component/Box";
import {
  CancelButton,
  ConfirmButton,
  PopupTitle,
} from "../../../Marketplace2/NFTPay";
import validIcon from "../../../../assets/images/market/nfts_opensea_valid.svg";
import wethIcon from "../../../../assets/images/market/weth_icon.svg";
import { OfferModal } from "./TableWarehouse";
import { OFFER_TYPE_ENUM, OFFER_TYPE_NAME_ENUM, Offers } from "model/offers";
import { DataSource2 } from "./StyledInterface";
import BigNumber from "bignumber.js";
import { thousandFormat } from "utils/urls";
import { useAppSelector } from "store/hooks";
import { useAsync } from "react-use";
import { ContractAddresses } from "utils/addresses";
import { useERC721Contract, useNpicsContract } from "hooks/useContract";
import { notification, Popover } from "antd";
import http, { X2Y2_ORDER_SIGN_API } from "utils/http";
// import { useERC20Contract } from '../../../../hooks/useContract';
import tipsIcon from "assets/images/market/exclamation_point.png";
import { Pop20 } from "component/Popover/Popover";
import { useWeb3React } from "@web3-react/core";
import {
  IMakerBid,
  ITakerAsk,
  LooksRareExchange,
} from "abis/looksRareExchange";
import { Erc20 } from "abis/Erc20";
import {
  getThirdPartyFee,
  IThirdPartyFeeConfig,
} from "../../../../config/constants/fee";
interface IProps {
  showOffer: OfferModal;
  nftInfo: DataSource2 | undefined;
  accpetOffer: Offers | undefined;
  setShowOffer: React.Dispatch<React.SetStateAction<OfferModal>>;
}

export default function AcceptOffer(props: IProps) {
  const { account, provider } = useWeb3React();

  const ethRate = useAppSelector(
    (state) => new BigNumber(state.app.data.EthPrice)
  );
  const { showOffer, accpetOffer, nftInfo, setShowOffer } = props;
  const [accept, setAccept] = useState<boolean>(false);
  // const [creatorRoyalty, setCreatorRoyalty] = useState<number>(0);
  // const erc721 = useERC721Contract(nftInfo?.nftAddress as string)
  const npics = useNpicsContract();
  const nft = useERC721Contract(nftInfo?.nftAddress as string);

  const signatureToRSV = (signature: string) => {
    const signature_ = signature.replace("0x", "");
    const size = 64;
    const r = signature_.substring(0, size);
    const s = signature_.substring(size, size * 2);
    const vMap: { [key: number]: number } = {
      0: 27,
      1: 28,
      27: 27,
      28: 28,
    };
    return {
      r,
      s,
      v: vMap[Number("0x" + signature_.substring(size * 2, size * 2 + 2))],
    };
  };

  const acceptOffer = async () => {
    if (!nftInfo || !accpetOffer || !npics || !account) return;
    setAccept(!accept);
    try {
      setShowOffer(OfferModal.PROGRESSING);
      const offerRaw = accpetOffer.offerRaw;
      console.log("offerRaw", accpetOffer);
      if (accpetOffer.offerSource === OFFER_TYPE_ENUM.looksrare) {
        const singer = provider ? provider.getSigner(account) : window.ethereum;
        const looksRareExchangeContract = new LooksRareExchange(singer);

        const takerAsk: ITakerAsk = {
          isOrderAsk: true,
          taker: ContractAddresses.NpicsProxy,
          price: offerRaw.price,
          tokenId: nftInfo.tokenId,
          minPercentageToAsk: offerRaw.minPercentageToAsk,
          params: offerRaw.params || "",
        };

        const signData = {
          isOrderAsk: offerRaw.isOrderAsk,
          signer: offerRaw.signer,
          collection: offerRaw.collection.address,
          price: offerRaw.price,
          tokenId: offerRaw.token?.tokenId || 0,
          amount: offerRaw.amount,
          strategy: offerRaw.strategy,
          currency: offerRaw.currency,
          nonce: offerRaw.nonce,
          startTime: offerRaw.startTime,
          endTime: offerRaw.endTime,
          minPercentageToAsk: offerRaw.minPercentageToAsk,
          params: offerRaw.params || "",
        };
        const sign = signatureToRSV(offerRaw.signature);
        const makerBid: IMakerBid = {
          ...signData,
          v: sign.v,
          r: sign.r,
          s: sign.s,
        };
        const _BytesData =
          looksRareExchangeContract.getMatchBidWithTakerAskEncodeAbi(
            {
              ...takerAsk,
              params: takerAsk.params || "0x",
            },
            {
              ...makerBid,
              r: "0x" + makerBid.r,
              s: "0x" + makerBid.s,
              params: makerBid.params || "0x",
            }
          );
        await npics.acceptOffer(
          nftInfo.nftAddress,
          nftInfo.tokenId,
          ContractAddresses.looksRareExchange,
          _BytesData,
          ContractAddresses.looksRare_transferManagerERC721
        );
      } else if (accpetOffer.offerSource === OFFER_TYPE_ENUM.x2y2) {
        // await erc721?.approve(approveTo,nftInfo.tokenId)
        // const nbpAddress = await npics.getNbpFor(
        //   nftInfo.nftAddress,
        //   nftInfo.tokenId
        // );
        const parameter = {
          caller: ContractAddresses.NpicsProxy,
          op: 2,
          amountToEth: "0",
          amountToWeth: "0",
          items: [
            {
              orderId: accpetOffer.id,
              currency: ContractAddresses.WETH,
              price: new BigNumber(accpetOffer.price).toFixed(0),
              tokenId: nftInfo.tokenId,
            },
          ],
        };

        let BytesData: any = await http
          .myPost(X2Y2_ORDER_SIGN_API, parameter)
          .then((res: any) => res.data[0].input);

        // const owner = await nft?.ownerOf(nftInfo.tokenId);
        // console.log(`owner => ${owner}`)
        // console.log(`nbpAddress => ${nbpAddress}`)
        // const _owner = owner?.replace("0x", "").toLocaleLowerCase();
        // const _nbpAddress = nbpAddress?.replace("0x", "");
        const _BytesData = BytesData.replace("0x", "0x357a150b");
        // const __BytesData = _BytesData.replace(`${_owner}`, `${_nbpAddress}`);
        await npics.acceptOffer(
          nftInfo.nftAddress,
          nftInfo.tokenId,
          ContractAddresses.x2y2R1,
          _BytesData,
          ContractAddresses.x2y2_ERC721Delegate
        );
      }
      setShowOffer(OfferModal.NONE);
      notification.success({
        message: "Your vault has accepted the offer successfully.",
      });
    } catch (e: any) {
      console.log("e.message", e.message);
      const msg = e.message;
      setShowOffer(OfferModal.NONE);
      notification.error({
        message: msg || "Your vault accept the offer failed.",
      });
    }
  };

  /*  useAsync(async () => {
    if (!nftInfo) return;
    console.log(`nftInfo => ${nftInfo?.nftAddress}`);
    const result: any = await http.myGet(
      `/npics-nft/app-api/v2/neo/getOfferFee/${nftInfo?.nftAddress}`
    );
    console.log(`CreatorRoyalty => ${result.data.data}`);
    if (result.data.code === 200) {
      const _creatorRoyalty = result.data.data / 10000 / 100;
      setCreatorRoyalty(_creatorRoyalty);
    }
  }, [nftInfo]);*/

  const thirdPartyFee = useMemo((): IThirdPartyFeeConfig => {
    const empty: IThirdPartyFeeConfig = {
      name: "",
      contract: "",
      [OFFER_TYPE_ENUM.x2y2]: {
        marketFee: 0,
        creatorFee: 0,
      },
      [OFFER_TYPE_ENUM.looksrare]: {
        marketFee: 0,
        creatorFee: 0,
      },
      [OFFER_TYPE_ENUM.npics]: {
        marketFee: 0,
        creatorFee: 0,
      },
    };
    if (accpetOffer) {
      const conf = getThirdPartyFee(accpetOffer.collection);
      if (!conf) {
        return empty;
      }
      return conf;
    }
    return empty;
  }, [accpetOffer]);
  const youReceive =
    nftInfo &&
    accpetOffer &&
    accpetOffer.price
      .minus(nftInfo.totalDebt)
      .minus(
        new BigNumber(
          `${
            thirdPartyFee[accpetOffer.offerSource].creatorFee +
            thirdPartyFee[accpetOffer.offerSource].marketFee +
            thirdPartyFee[OFFER_TYPE_ENUM.npics].marketFee
          }`
        ).times(accpetOffer.price)
      )
      .div(10 ** 18)
      .toFixed(2, 1);

  return (
    <Modal isOpen={showOffer === OfferModal.OFFER}>
      <Box
        minWidth={"8.8rem"}
        background={`#fff`}
        borderRadius={`0.2rem`}
        padding={`0.4rem`}
      >
        <PopupTitle title={"Accept Offer"} canClose={false} />
        <Grid
          marginTop={`0.3rem`}
          padding={`0.2rem 0.25rem`}
          borderRadius={`0.1rem`}
          border={`0.01rem solid #0000001A`}
          gridTemplateRows={"3.06rem auto"}
          gridTemplateColumns={`3.06rem auto`}
          gridTemplateAreas={`
          "img price"
          "receive receive"
        `}
          gridGap={`0.14rem`}
        >
          <Grid
            gridArea={`img`}
            borderRadius={"0.06rem"}
            background={`#eee`}
            overflow={"hidden"}
          >
            <Icon width={"100%"} height={"100%"} src={nftInfo?.imageUrl}></Icon>
          </Grid>
          <Grid gridArea={`price`}>
            {/* Name and price */}
            <Flex flexDirection={`column`} alignItems={`stretch`}>
              <Flex gap={`0.06rem`} alignItems={`center`}>
                <Typography
                  color={`#000`}
                  fontSize={`0.14rem`}
                  fontWeight={500}
                >
                  {nftInfo && nftInfo.collectionName}
                </Typography>
                <Icon
                  src={validIcon}
                  width={`0.12rem`}
                  height={`0.12rem`}
                ></Icon>
              </Flex>
              <Typography
                marginTop={`0.06rem`}
                fontWeight={700}
                fontSize={`0.2rem`}
                color={`#000`}
              >
                {nftInfo && `${nftInfo.singularForName()} #${nftInfo.tokenId}`}
              </Typography>
              {/* Offer */}
              <Flex
                marginTop={`0.1rem`}
                border={`0.01rem solid #0000001A`}
                flex={1}
                borderRadius={`0.1rem`}
                flexDirection={`column`}
                alignItems={`stretch`}
                background={`#F6F6F6`}
                overflow={`hidden`}
              >
                <Flex
                  flex={1}
                  borderBottom={`0.01rem solid #0000001A`}
                  background={`#fff`}
                >
                  <OfferCell
                    title={`Offer`}
                    titleColor={`#000`}
                    infoIcon={false}
                    symbolIcon={true}
                    symbolOrVal={`${accpetOffer?.OfferPriceDisplay()}`}
                  />
                </Flex>
                <OfferCell
                  title={`Vault Debt`}
                  infoIcon={false}
                  symbolIcon={true}
                  symbolOrVal={`${nftInfo?.debtString()}`}
                />

                <OfferCell
                  title={`${
                    accpetOffer && OFFER_TYPE_NAME_ENUM[accpetOffer.offerSource]
                  } Market Fee`}
                  popoverInfo={`Fee to ${
                    accpetOffer && OFFER_TYPE_NAME_ENUM[accpetOffer.offerSource]
                  }`}
                  infoIcon={true}
                  symbolIcon={false}
                  symbolOrVal={`${
                    accpetOffer &&
                    thirdPartyFee[accpetOffer.offerSource].marketFee * 100
                  }%`}
                />
                <OfferCell
                  title={`Market Fee`}
                  popoverInfo={`Fee to ${
                    accpetOffer && OFFER_TYPE_NAME_ENUM[OFFER_TYPE_ENUM.npics]
                  }`}
                  infoIcon={true}
                  symbolIcon={false}
                  symbolOrVal={`${
                    accpetOffer &&
                    thirdPartyFee[OFFER_TYPE_ENUM.npics].marketFee * 100
                  }%`}
                />
                <OfferCell
                  title={`Create Fee`}
                  popoverInfo={`Fee to the creator of NFT`}
                  infoIcon={true}
                  symbolIcon={false}
                  symbolOrVal={`${
                    accpetOffer &&
                    thirdPartyFee[accpetOffer.offerSource].creatorFee * 100
                  }%`}
                />
              </Flex>
            </Flex>
          </Grid>
          <Grid gridArea={`receive`}>
            <Flex
              background={`#7BD742`}
              borderRadius={`0.1rem`}
              padding={`0.3rem 0.4rem`}
              alignItems={`center`}
              justifyContent={`space-between`}
              style={{
                cursor: `pointer`,
                userSelect: `none`,
              }}
            >
              <Typography color={`#000`} fontSize={`0.2rem`} fontWeight={700}>
                You Receive
              </Typography>
              <Flex flexDirection={`row`} gap={`0.06rem`} alignItems={`center`}>
                <Icon src={wethIcon}></Icon>
                <Typography color={`#000`} fontSize={`0.2rem`} fontWeight={700}>
                  {youReceive}
                </Typography>
                <Typography
                  color={`rgba(0, 0, 0, .5)`}
                  fontSize={`0.16rem`}
                  fontWeight={500}
                  marginLeft={`0.04rem`}
                >
                  {nftInfo &&
                    accpetOffer &&
                    `(${thousandFormat(
                      accpetOffer.price
                        .minus(nftInfo.totalDebt)
                        .minus(
                          new BigNumber(
                            thirdPartyFee[accpetOffer.offerSource].creatorFee +
                              thirdPartyFee[accpetOffer.offerSource].marketFee +
                              thirdPartyFee[OFFER_TYPE_ENUM.npics].marketFee
                          ).times(accpetOffer.price)
                        )
                        .times(ethRate)
                        .div(10 ** 18)
                        .toFixed(2, 1)
                    )})`}
                </Typography>
              </Flex>
            </Flex>
          </Grid>
        </Grid>
        {/* buttons */}
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          gap={"0.2rem"}
          marginTop={"0.3rem"}
        >
          <CancelButton
            onClick={async () => {
              props.setShowOffer(OfferModal.NONE);
            }}
          >
            Cancel
          </CancelButton>
          <ConfirmButton
            onClick={acceptOffer}
            disabled={!(Number(youReceive) > 0)}
          >
            Accept Offer
          </ConfirmButton>
        </Flex>
      </Box>
    </Modal>
  );
}

function OfferCell(props: {
  title: string;
  titleColor?: string;
  symbolIcon: boolean;
  infoIcon: boolean;
  popoverInfo?: string;
  symbolOrVal?: string | number;
}) {
  return (
    <Flex
      flex={1}
      alignItems={`center`}
      justifyContent={`space-between`}
      padding={`0 0.3rem`}
    >
      <Typography
        color={props.titleColor ?? `rgba(0, 0, 0, .5)`}
        fontSize={`0.14rem`}
        fontWeight={500}
      >
        {props.title}
        <Pop20 content={props.popoverInfo ?? ""}>
          <Icon
            style={{ marginLeft: "0.08rem" }}
            width={"0.14rem"}
            src={tipsIcon}
            hidden={!props.infoIcon}
          />
        </Pop20>
      </Typography>

      <Flex alignItems={`center`} gap={`0.06rem`}>
        <Icon
          src={wethIcon}
          width={`0.1rem`}
          height={`0.15rem`}
          hidden={!props.symbolIcon}
        />
        <Typography fontSize={`0.14rem`} color={`#000`} fontWeight={500}>
          {props.symbolOrVal ?? `-`}
        </Typography>
      </Flex>
    </Flex>
  );
}
