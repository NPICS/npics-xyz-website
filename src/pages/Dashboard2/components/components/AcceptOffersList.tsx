import Modal from "../../../../component/Modal";
import { Box, Flex, Icon, Typography } from "../../../../component/Box";
import refreshIcon from "../../../../assets/images/dashboard/refresh_icon.svg";
import wethIcon from "../../../../assets/images/market/weth_icon.svg";
import { Key, useMemo, useState } from "react";
import styled from "styled-components";
import { OfferModal } from "./TableWarehouse";
import { OFFER_TYPE_ENUM, Offers } from "model/offers";
import { thousandFormat } from "../../../../utils/urls";
import BigNumber from "bignumber.js";
import { useAppSelector } from "store/hooks";
import { useIntervalWhen } from "rooks";
import { imgurl } from "utils/globalimport";
import { Select, Skeleton, Space } from "antd";
import { useAsync } from "react-use";
import { useWETHContract } from "hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import ButtonDefault from "component/ButtonDefault";
import { sort, Sort } from "./data";
import http from "utils/http";
import { deserializeArray } from "class-transformer";
import Loading from "../../../../component/Loading";
const { Option } = Select;
const Button = styled.button`
  color: #fff;
  background: #000;
  border-radius: 0.1rem;
  font-size: 0.14rem;
  font-weight: 700;
  min-width: 1.5rem;
  height: 0.48rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #333;
  }
`;
const StyledSelect = styled(Select)`
  font-weight: 600;
  .ant-select-selector {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.12rem;
    transition: all 0s !important;
    min-width: 2.8rem;
    min-height: 0.5rem;
    padding: 0 0.23rem !important;
    border: 0.01rem solid rgba(0, 0, 0, 0.2) !important;
    box-shadow: none !important;
    border-radius: 0.1rem !important;
    .ant-select-selection-item {
      font-weight: 600;
      line-height: 0.5rem;
      transition: all 0s !important;
    }
  }
`;
const RotateIcon = styled(Icon)<{ refresh: boolean }>`
  animation: ${(props) =>
    `rotateImg 1s linear infinite ${props.refresh ? "" : "paused"}`};
  @keyframes rotateImg {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const FlexList = styled(Flex)`
  overflow-style: unset;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const LoadingView = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
interface IProps {
  showOffer: OfferModal;
  nftAddress: string | undefined;
  setShowOffer: React.Dispatch<React.SetStateAction<OfferModal>>;
  setAcceptOffer: React.Dispatch<React.SetStateAction<Offers | undefined>>;
}

function LoadingSkeleton() {
  return (
    <>
      {[0, 0, 0, 0, 0].map(() => (
        <Flex
          border={"0.01rem solid #0000001A"}
          borderRadius={"0.1rem"}
          padding={"0.11rem 0.3rem"}
          alignItems={"center"}
        >
          <Box>
            <Skeleton.Avatar
              active={true}
              style={{
                borderRadius: "50%",
                width: "0.36rem",
                height: "0.36rem",
              }}
            />
          </Box>
          {/* Price */}
          <Flex marginLeft={"0.2rem"} width={"32%"}>
            <Flex gap={"0.03rem"} flex={1}>
              <Skeleton.Input active={true} style={{ borderRadius: "10px" }} />
            </Flex>
          </Flex>
          {/* Expires */}
          <Typography marginLeft={"0.2rem"}>
            <Skeleton.Input
              active={true}
              style={{ borderRadius: "10px", width: "1rem" }}
            />
          </Typography>
          <Flex flex={1}></Flex>
          <Skeleton.Button
            active={true}
            style={{
              borderRadius: "10px",
              minWidth: "1.5rem",
              height: "0.45rem",
            }}
          />
        </Flex>
      ))}
    </>
  );
}

export default function AcceptOffersList(props: IProps) {
  const { showOffer, setShowOffer, nftAddress } = props;
  const [second, setSecond] = useState(1);
  const [currentSort, setCurrentSort] = useState<Sort>(Sort.priceToLow);
  const [offerList, setOfferList] = useState<Offers[]>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [cursor, setCursor] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [topOffer, setTopOffer] = useState<Offers | null>(null);
  // const { offerList, isError, isLoading } = useSwrOffer("0x8a90cab2b38dba80c64b7734e58ee1db38b8992e", currentSort)
  const [loadingN, setLoadingN] = useState<number>(0);
  const getOfferList = async () => {
    setRefresh(true);
    let result: any = await http.myPost(
      `/npics-nft/app-api/v2/offers/getOffersList`,
      {
        pageSize: 10 * pageIndex,
        address: nftAddress,
        pageIndex: 1,
        ...sort[currentSort],
      }
    );
    try {
      const records = result.data.records;
      if (result.code === 200 && records) {
        setCursor(result.data.total > records.length);
        if (currentSort === Sort.priceToLow && records.length > 0) {
          setTopOffer(records[0]);
        }
        records.map((item: any) => {
          item.offerRaw = JSON.parse(item.offerRaw);
          item.created_at = item.offerCreatedAt;
          item.end_at = item.offerEndAt;
          item.price = new BigNumber(item.price).toString();
          item.currency = item.offerRaw.currency;
          item.id = item.offerId;
          item.maker = item.buyer;
        });

        const offerList = deserializeArray(Offers, JSON.stringify(records));
        setOfferList(offerList);
        setSecond(0);
      }
      setRefresh(false);
      if (loadingN === 0) {
        setLoadingN(1);
      }
    } catch (e) {
      console.log(e);
      setSecond(0);
      setRefresh(false);
      if (loadingN === 0) {
        setLoadingN(1);
      }
    }
  };

  useAsync(async () => {
    if (!nftAddress) return;
    getOfferList();
  }, [currentSort, nftAddress, pageIndex]);

  useIntervalWhen(
    () => {
      let s = second + 1;
      if (s === 10) {
        // setSecond(0)
        getOfferList();
      }
      setSecond(s);
    },
    1000 * 1,
    true,
    true
  );

  // console.log("offerList", offerList);

  return (
    <Modal
      isOpen={showOffer === OfferModal.OFFERSLIST}
      onRequestClose={() => setShowOffer(OfferModal.NONE)}
    >
      {/* Box */}
      <Flex
        background={"#fff"}
        borderRadius={"0.2rem"}
        padding={"0.4rem"}
        flexDirection={"column"}
        minWidth={"8.8rem"}
        maxHeight={"6.8rem"}
      >
        {/* Title */}
        <Flex justifyContent={"space-between"}>
          <Flex width={"24%"}></Flex>
          <Typography fontSize={"0.3rem"} fontWeight={800} textAlign={"center"}>
            Acceptable Offers List
          </Typography>
          {/* Refresh  */}
          <Flex
            gap={"0.2rem"}
            alignItems={"center"}
            justifyContent={"end"}
            width={"26%"}
            style={{ cursor: "pointer" }}
          >
            <Typography>{second} seconds ago</Typography>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              width={"0.24rem"}
              height={"0.24rem"}
              borderRadius={"0.05rem"}
              border={"0.01rem solid #0000004D"}
            >
              <RotateIcon
                refresh={refresh}
                src={refreshIcon}
                width={"0.13rem"}
                height={"0.13rem"}
              ></RotateIcon>
            </Flex>
          </Flex>
        </Flex>

        {
          <>
            {/* Select Office */}
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              marginTop={"0.32rem"}
            >
              <Box>
                <Typography
                  color={"#000"}
                  fontSize={"0.12rem"}
                  fontWeight={500}
                  style={{ opacity: 0.5 }}
                >
                  Top Offer
                </Typography>
                <Flex alignItems="center" mt="9px">
                  <Icon
                    src={wethIcon}
                    width={"0.1rem"}
                    height={"0.15rem"}
                    marginRight="7px"
                  ></Icon>
                  <Typography
                    color={"#000"}
                    fontSize={"0.16rem"}
                    fontWeight={500}
                    ml="7px"
                  >
                    {topOffer
                      ? new BigNumber(topOffer.price)
                          .div(10 ** 18)
                          .toFixed(2, 1)
                      : "-"}
                  </Typography>
                </Flex>
              </Box>
              <StyledSelect
                onSelect={(value: any) => {
                  setLoadingN(0);
                  setCurrentSort(value);
                }}
                defaultValue={Sort.priceToLow}
                dropdownClassName="ant-select-reset"
              >
                <Option value={Sort.priceToLow}>Price: high to low</Option>
                <Option value={Sort.priceToHigh}>Price: Low to High</Option>
                <Option value={Sort.timeNew}>Newest</Option>
                <Option value={Sort.timeExpiring}>Expiring Soon</Option>
              </StyledSelect>
            </Flex>

            {/* List */}
            {loadingN === 0 ? (
              <LoadingSkeleton />
            ) : (
              <FlexList
                flexDirection={"column"}
                gap={"0.1rem"}
                overflow={"auto"}
                marginTop={"0.2rem"}
              >
                {offerList &&
                  offerList.map((item: Offers, idx: Key | null | undefined) => {
                    return (
                      <AcceptOffersCell
                        setAcceptOffer={props.setAcceptOffer}
                        offerInfo={item}
                        key={idx}
                        setShowOffer={setShowOffer}
                      />
                    );
                  })}
              </FlexList>
            )}
          </>
        }
        {cursor ? (
          <Flex marginTop={"0.26rem"} justifyContent="center">
            <ButtonDefault
              onClick={() => setPageIndex(pageIndex + 1)}
              types="second"
              height=".56rem"
              minWidth="1.8rem"
            >
              Load More
            </ButtonDefault>
          </Flex>
        ) : null}
      </Flex>
    </Modal>
  );
}

function AcceptOffersCell(props: {
  setShowOffer: React.Dispatch<React.SetStateAction<OfferModal>>;
  offerInfo: Offers;
  setAcceptOffer: React.Dispatch<React.SetStateAction<Offers | undefined>>;
}) {
  const { offerInfo, setAcceptOffer, setShowOffer } = props;
  const ethRate = useAppSelector(
    (state) => new BigNumber(state.app.data.EthPrice)
  );
  const { account } = useWeb3React();
  const [wethBalance, setWethBalance] = useState<BigNumber>(new BigNumber(0));
  const weth = useWETHContract(true);
  useAsync(async () => {
    if (!account || !weth) return;
    const balance = await weth.balanceOf(account);
    setWethBalance(new BigNumber(balance.toString()));
  }, [weth]);
  const getMarketIcon = () => {
    if (offerInfo.offerSource === OFFER_TYPE_ENUM.x2y2) {
      return imgurl.market[OFFER_TYPE_ENUM.x2y2];
    }
    if (offerInfo.offerSource === OFFER_TYPE_ENUM.looksrare) {
      return imgurl.market[OFFER_TYPE_ENUM.looksrare];
    }
    return "";
  };

  const [now, setNow] = useState(() => ~~(new Date().getTime() / 1000));
  useMemo(() => {
    const timeout = setTimeout(() => {
      setNow(~~(new Date().getTime() / 1000));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [now]);

  return (
    <Flex
      border={"0.01rem solid #0000001A"}
      borderRadius={"0.1rem"}
      padding={"0.11rem 0.3rem"}
      alignItems={"center"}
    >
      {/* Market Icon */}
      <Box borderRadius={"0.18rem"} background={"#eee"}>
        <Icon
          style={{ borderRadius: "0.18rem" }}
          width={"0.36rem"}
          height={"0.36rem"}
          src={getMarketIcon()}
        />
      </Box>
      {/* Price */}
      <Flex
        marginLeft={"0.2rem"}
        width={"38%"}
        alignItems={"start"}
        gap={"0.02rem"}
        flexDirection={"column"}
      >
        <Flex alignItems={"start"} gap={"0.04rem"}>
          <Flex alignItems={"center"} gap={"0.06rem"}>
            <Icon src={wethIcon} width={"0.1rem"} height={"0.15rem"}></Icon>
            <Typography color={"#000"} fontSize={"0.16rem"} fontWeight={500}>
              {offerInfo.OfferPriceDisplay()}
            </Typography>
            <Typography
              color={"rgba(0,0,0,.5)"}
              fontSize={"0.14rem"}
              fontWeight={500}
              marginLeft={"0.04rem"}
            >{`(${thousandFormat(
              offerInfo.price
                .times(ethRate)
                .div(10 ** 18)
                .toNumber()
            )})`}</Typography>
          </Flex>
        </Flex>
        <Flex gap={"0.03rem"}>
          <Typography color={"#00000080"} fontSize={"0.14rem"}>
            By
          </Typography>
          <Typography color={"#FF490F"} fontSize={"0.14rem"}>
            {offerInfo.maker.replace(offerInfo.maker.substring(5, 38), "...")}
          </Typography>
          <Typography color={"#00000080"} fontSize={"0.14rem"}>
            {offerInfo.createdTime()}
          </Typography>
        </Flex>
      </Flex>
      {/* Expires */}
      <Typography
        textAlign={"left"}
        fontSize={"0.14rem"}
        fontWeight={500}
        color={"#000"}
      >
        {now > offerInfo.end_at
          ? "Expired"
          : `Expires ${offerInfo.ExpiresTime()}`}
      </Typography>
      <Flex flex={1}></Flex>
      <ButtonDefault
        disabled={offerInfo.price.lt(wethBalance) || now > offerInfo.end_at}
        minWidth="1.5rem"
        height="0.45rem"
        types="normal"
        onClick={() => {
          setShowOffer(OfferModal.OFFER);
          setAcceptOffer(offerInfo);
        }}
      >
        Accept Offer
      </ButtonDefault>
    </Flex>
  );
}
