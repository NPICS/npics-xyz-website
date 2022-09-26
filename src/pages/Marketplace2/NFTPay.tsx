import {
  Box,
  Button2,
  Flex,
  Grid,
  Icon,
  Typography,
} from "../../component/Box";
import styled from "styled-components";
import ethIcon from "../../assets/images/market/eth_icon_20x34.png";
import payTypeSelectedIcon from "../../assets/images/market/nft_pay_type_selected.png";
import { useEffect, useState } from "react";
import { CollectionDetail } from "../../model/user";
import BigNumber from "bignumber.js";
import downPayIcon from "../../assets/images/market/down_pay_icon.png";
import { numberFormat, urls } from "../../utils/urls";
import { Erc20 } from "../../abis/Erc20";
import { ContractAddresses } from "../../utils/addresses";
import { useWeb3React } from "@web3-react/core";
import http from "../../utils/http";
import { message, notification, Skeleton } from "antd";
import { Npics } from "../../abis/Npics";
import Modal from "../../component/Modal";
import NFTPayProgressing from "./NFTPayProgressing";
import NFTPayCongratulations, { AttrLink } from "./NFTPayCongratulations";
import NFTPayWrong from "./NFTPayWrong";
import { useAsync } from "react-use";
import { TextPlaceholder } from "component/styled";
import wethIcon from "../../assets/images/market/weth_icon.svg";
import Checkbox from "../../component/Input/Checkbox";
import axios from "axios";
import { ethers } from "ethers";
import openseaValidIcon from 'assets/images/market/nfts_opensea_valid.svg'
import { imgurl } from "utils/globalimport";
import { useAppSelector } from "store/hooks";
import { BANK_ENUM } from "utils/enums";
import { Pop20 } from "component/Popover/Popover";

export function PopupTitle(props: { title: string; canClose: boolean }) {
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Typography fontWeight={800} fontSize={"0.3rem"} color={"#000"}>
        {props.title}
      </Typography>
    </Flex>
  );
}

const Cover = styled.img`
  display: block;
  background: #eee;
  border-radius: 0.1rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function PayTypeButton(props: {
  isSelected: boolean;
  isEth: boolean;
  name: string;
  balance: string;
  tap(): void;
}) {
  return (
    <Flex
      borderRadius={"0.1rem"}
      padding={"0.25rem 0.4rem"}
      background={props.isSelected ? `#7BD742` : `#fff`}
      border={`0.01rem solid ${props.isSelected ? "#7BD742" : "#e5e5e5"}`}
      alignItems={"center"}
      style={{
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={props.tap}
    >
      <Icon
        width={"0.2rem"}
        height={"0.14rem"}
        src={payTypeSelectedIcon}
        style={{
          display: props.isSelected ? "block" : "none",
        }}
      />
      <Typography
        fontSize={"0.18rem"}
        fontWeight={500}
        color={"#000"}
        marginLeft={"0.1rem"}
      >
        {props.name}
      </Typography>
      <Flex flex={1}></Flex>
      <Icon
        width={"0.12rem"}
        height={"0.19rem"}
        src={props.isEth ? ethIcon : wethIcon}
      />
      <Typography
        fontSize={"0.2rem"}
        fontWeight={500}
        color={"#000"}
        marginLeft={"0.1rem"}
      >
        {props.balance}
      </Typography>
    </Flex>
  );
}

enum PayType {
  None,
  ETH = 1 << 0,
  WETH = 1 << 1,
}

export const CancelButton = styled.button`
  variance: "secondary";
  border: 0.01rem solid #00000033;
  background: #fff;
  color: #000;
  font-size: 0.16rem;
  font-weight: 700;
  border-radius: 0.1rem;
  height: 0.52rem;
  min-width: 2rem;
  cursor: pointer;
`;

export const ConfirmButton = styled(Button2) <{ disabled?: boolean }>`
  height: 0.52rem;
  min-width: 2rem;
  font-size: 0.16rem;
  font-weight: 700;
  transition: all 0.3s;
  &:hover {
    ${({ disabled }) => (disabled ? "" : "background: #333")};
  }
`;

export default function NFTPay(props: {
  nft: CollectionDetail;
  aprInfo: { name: string, icon: any };
  availableBorrow: BigNumber;
  actualAmount: BigNumber;
  progressBlock?(): void;
  resultBlock?(result: boolean, hash?: string): void;
  cancelBlock?(): void;
  // dismiss?(): void
}) {
  const [payType, setPayType] = useState<PayType>(PayType.ETH); //< default selected eth
  const [ethBalance, setETHBalance] = useState<BigNumber>();
  const [wethBalance, setWETHBalance] = useState<BigNumber>();
  const { provider, account } = useWeb3React();
  const [userSelectedAmount, setUserSelectedAmount] = useState<BigNumber>(
    new BigNumber(0)
  );
  const [ethAndWETHAmount, setEthAndWETHAmount] = useState<
    [BigNumber, BigNumber]
  >([new BigNumber(0), new BigNumber(0)]);
  const [canBuy, setCanBuy] = useState<boolean>(false);

  const [didReadService, setDidReadService] = useState(false);

  const [markIcon, setMarkIcon] = useState("");

  //platform
  const platform = useAppSelector(state => state.platform.selectPlatform)

  // console.log(props.nft);
  useAsync(async () => {
    if (account && provider) {
      // let signer = library.getSigner(account)
      let weth = new Erc20(ContractAddresses.WETH, provider);

      const [balance, wethBalance] = await Promise.all([
        provider.getBalance(account),
        weth.balanceOf(account),
      ]);
      setETHBalance(new BigNumber(balance.toString()));
      setWETHBalance(new BigNumber(wethBalance.toString()));
      // console.log(`ETH => ${balance.toFixed()}, WEHT => ${wethBalance.toFixed()}`)
    }
    //calc mark icon
    if (props.nft) {
      // setMarkIcon()
      switch (props.nft.market) {
        case "looksrare":
          setMarkIcon(imgurl.market.looksrare);
          break;
        case "opensea":
          setMarkIcon(imgurl.market.opensea);
          break;
        case "seaport":
          setMarkIcon(imgurl.market.opensea);
          break;
        case "x2y2":
          setMarkIcon(imgurl.market.x2y2);
          break;
        case "sudoswap":
          setMarkIcon(imgurl.market.sudoswap);
          break;
      }
    }
  }, [props.nft, account, provider]);

  useEffect(() => {
    let total = new BigNumber(0);
    if (payType & PayType.ETH && ethBalance) {
      total = total.plus(ethBalance);
    }
    if (payType & PayType.WETH && wethBalance) {
      total = total.plus(wethBalance);
    }
    setUserSelectedAmount(total);
    console.log(`user select total amount => ${total.div(10 ** 18).toFixed()}`);
  }, [payType, ethBalance, wethBalance]);

  useEffect(() => {
    // weth first, calculation and allocation
    let weth = new BigNumber(0);
    let eth = new BigNumber(0);
    if (wethBalance && ethBalance) {
      // only weth can pay
      if (payType & PayType.WETH) {
        if (wethBalance.isGreaterThanOrEqualTo(props.actualAmount)) {
          weth = props.actualAmount;
          eth = new BigNumber(0);
        } else {
          weth = wethBalance;
          eth = props.actualAmount.minus(wethBalance);
        }
      } else {
        weth = new BigNumber(0);
        if (ethBalance.isGreaterThanOrEqualTo(props.actualAmount)) {
          eth = props.actualAmount;
        } else {
          eth = props.actualAmount.minus(ethBalance);
        }
      }
    }
    setEthAndWETHAmount([eth, weth]);
    console.log(
      `ETH: ${eth.div(10 ** 18).toFixed()}, WETH: ${weth
        .div(10 ** 18)
        .toFixed()}`
    );
  }, [ethBalance, wethBalance, props.actualAmount, payType]);

  useEffect(() => {
    let [eth, weth] = ethAndWETHAmount;
    setCanBuy(
      userSelectedAmount.isGreaterThanOrEqualTo(eth.plus(weth)) &&
      userSelectedAmount.isGreaterThanOrEqualTo(props.actualAmount)
    );
  }, [userSelectedAmount, ethAndWETHAmount, props.actualAmount]);

  async function checkoutBtnClick() {
    if (!provider) return;
    try {
      // check pay type
      if (payType === PayType.None) {
        message.error("Choose your payment");
        return;
      }

      // check balance
      if (!canBuy) {
        message.error("Insufficient account balance");
        return;
      }

      if ((payType & PayType.WETH) > 0 && wethBalance?.lte(0)) {
        message.error("WETH balance is insufficient.");
        return;
      }

      if (!didReadService) {
        message.error(`Please agree to NPics Terms of Service`);
        return;
      }

      const signer = provider.getSigner(account);
      const c = new Npics(signer);

      let data: string | undefined = "";
      if (props.nft.market === "sudoswap") {
        const swapETHForSpecificNFTsAbi = {
          inputs: [
            {
              components: [
                {
                  internalType: "contract LSSVMPair",
                  name: "pair",
                  type: "address",
                },
                {
                  internalType: "uint256[]",
                  name: "nftIds",
                  type: "uint256[]",
                },
              ],
              internalType: "struct LSSVMRouter.PairSwapSpecific[]",
              name: "swapList",
              type: "tuple[]",
            },
            {
              internalType: "address payable",
              name: "ethRecipient",
              type: "address",
            },
            {
              internalType: "address",
              name: "nftRecipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
          ],
          name: "swapETHForSpecificNFTs",
          outputs: [
            {
              internalType: "uint256",
              name: "remainingValue",
              type: "uint256",
            },
          ],
          stateMutability: "payable",
          type: "function",
        };

        // test code
        /*const c = new ethers.Contract(
          "0x2b2e8cda09bba9660dca5cb6233787738ad68329",
          [swapETHForSpecificNFTsAbi],
          provider.getSigner(account)
        );
        console.log("currentBasePrice", props.nft.currentBasePrice.toString());
        const signer = provider.getSigner(account);
        if (!signer) {
          return;
        }
        const npics = new Npics(signer);
        const nbpAddress = await npics.getNbpFor(
          props.nft.address,
          String(props.nft.tokenId)
        );
        console.log("nbpAddress", nbpAddress);
        const txx = await c.swapETHForSpecificNFTs(
          [
            {
              pair: props.nft.pairAddress,
              nftIds: [props.nft.tokenId],
            },
          ],
          ContractAddresses.NpicsProxy,
          nbpAddress,
          // "0x72C2CbB32936454B48CeE27e8B91c4DdF067401b",
          ~~(new Date().getTime() / 1000) + 300,
          {
            value: props.nft.currentBasePrice.toString(),
          }
        );
        console.log("txx", txx);
        return;*/

        const swapETHForSpecificNFTsContract = new ethers.utils.Interface([
          swapETHForSpecificNFTsAbi,
        ]);
        const deadline = ~~(new Date().getTime() / 1000) + 300;

        const npics = new Npics(signer);
        const nbpAddress = await npics.getNbpFor(
          props.nft.address,
          props.nft.tokenId
        );

        data = swapETHForSpecificNFTsContract.encodeFunctionData(
          "swapETHForSpecificNFTs",
          [
            [
              {
                pair: props.nft.pairAddress,
                nftIds: [props.nft.tokenId],
              },
            ],
            nbpAddress,
            nbpAddress,
            deadline,
          ]
        );
      } else {
        data = await getTradeDetailData();
      }
      // show progressing
      // setProgressingPopupOpen(true)
      // props.dismiss?.()
      // get transaction data
      props.progressBlock?.();
      if (!data) {
        message.error("item has been sold");
        // setProgressingPopupOpen(false)
        // props.dismiss?.()
        props.resultBlock?.(false);
        return;
      }
      /// call contract
      let [eth, weth] = ethAndWETHAmount;
      let contractParams = {
        nft: props.nft.address,
        tokenId: props.nft.tokenId,
        tradeDetail: data,
        loadAmt: props.availableBorrow,
        payEthAmt: eth,
        price: props.nft.currentBasePrice,
        market:
          ContractAddresses.getMarketAddressByName(props.nft.market) ?? "",
        wethAmt: weth,
        platform: platform as unknown as BANK_ENUM
      };
      let tx: any;
      if (payType & PayType.WETH) {
        tx = await c.downPayWithWETH(contractParams);
      } else {
        tx = await c.downPayWithETH(contractParams);
      }

      // setHash(tx.hash)
      // props.resultBlock?.(true)
      props.resultBlock?.(true, tx.hash);
      // setProgressingPopupOpen(false)
      // setSuccessPopupOpen(true)
    } catch (e: any) {
      props.resultBlock?.(false);
      notification.error({ message: e.message });
      // setProgressingPopupOpen(false)
      // setFailedPopupOpen(true)
    }
  }

  async function getTradeDetailData(): Promise<string | undefined> {
    const inner = async (accountOrNbp: string | undefined | null) => {
      const resp: any = await http.myPost(`/npics-nft/app-api/v2/nft/route`, {
        address: props.nft.address,
        amount: 1,
        balanceToken: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        sender: accountOrNbp,
        standard: props.nft.standard,
        tokenId: props.nft.tokenId,
      });
      if (resp.code === 200 && resp.data.transaction) {
        return resp.data.transaction;
      } else {
        return undefined;
      }
    };
    if (props.nft.market.toLowerCase() === "nftx" && provider) {
      /// nftx market special treatment, get nbp address
      let c = new Npics(provider.getSigner(account));
      let nbp = await c.getNbpFor(props.nft.address, Number(props.nft.tokenId));
      console.log(`NBP => ${nbp}`);
      return inner(nbp);
    } else {
      return inner(account);
    }
  }

  return (
    <Flex
      width={"8.8rem"}
      background={"#fff"}
      borderRadius={"0.1rem"}
      padding={"0.4rem"}
      flexDirection={"column"}
    >
      {/* title */}
      <PopupTitle title={"Complete Checkout"} canClose={true}></PopupTitle>

      {/* nft info */}
      <Grid
        marginTop={"0.3rem"}
        border={"0.01rem solid #e5e5e5"}
        borderRadius={"0.1rem"}
        padding={"0.2rem"}
        gridTemplateColumns={"2.7rem auto"}
        // alignItems={"start"}
        alignContent={"start"}
        gridTemplateAreas={`
                "cover title"
                "cover payment"
                "cover loan"
                "payTitle payTitle"
                "payType payType"
            `}
        gridColumnGap={"0.16rem"}
        gridRowGap={"0.16rem"}
      >
        <Grid gridArea={"cover"}>
          <Cover src={props.nft.imageUrl} />
        </Grid>
        <Grid gridArea={"title"}>
          <Flex alignItems={"center"}>
            <Typography
              color={"rgba(0,0,0,.5)"}
              fontSize={"0.14rem"}
              fontWeight={500}
              marginRight="0.06rem"
            >
              {props.nft.collectionName}
            </Typography>
            <Icon
              style={{ flexShrink: '0', margin: 0 }}
              src={openseaValidIcon}
              width={'0.16rem'}
              height={'0.16rem'}
            />
          </Flex>
          <Typography
            color={"#000"}
            fontSize={"0.2rem"}
            fontWeight={700}
            marginTop={"0.06rem"}
          >{`${props.nft.collectionName} #${props.nft.tokenId}`}</Typography>
        </Grid>
        <Grid
          gridArea={"payment"}
          border={"0.01rem solid #e5e5e5"}
          borderRadius={"0.1rem"}
          padding={"0.2rem 0.28rem"}
        >
          <Flex flexDirection={"row"} alignItems={"center"}>
            <Icon width={"0.24rem"} height={"0.24rem"} src={downPayIcon} />
            <Typography
              marginLeft={"0.1rem"}
              fontWeight={700}
              fontSize={"0.16rem"}
              color={"#FF490F"}
            >
              Down Payment
            </Typography>
            <Flex flex={1}></Flex>
            <Icon width={"0.12rem"} height={"0.18rem"} src={ethIcon} />
            <Typography
              fontWeight={700}
              fontSize={"0.24rem"}
              marginLeft={"0.1rem"}
            >
              {numberFormat(props.actualAmount.div(10 ** 18).toFixed())}
            </Typography>
          </Flex>
        </Grid>
        <Grid
          gridArea={"loan"}
          border={"0.01rem solid #e5e5e5"}
          borderRadius={"0.1rem"}
          padding={"0.2rem 0.28rem"}
          gridGap={"0.22rem"}
        >
          <Flex alignItems={"center"}>
            <Flex alignContent={"center"}>
              {
                props.nft && props.nft.market ?
                  <Pop20
                    content={`${props.nft?.market}`}
                  >
                    <Icon style={{ marginRight: "0.05rem" }} src={markIcon} width={"0.2rem"} height={"0.22rem"} />
                  </Pop20>
                  :
                  <Skeleton.Avatar shape={'circle'} active size={"small"} />
              }
              <Typography color={"#000"} fontSize={"0.14rem"} fontWeight={500}>
                Listing Price
              </Typography>
            </Flex>

            <Flex flex={1}></Flex>
            <Icon width={"0.1rem"} height={"0.15rem"} src={ethIcon} />
            <Typography
              color={"#000"}
              fontSize={"0.16rem"}
              fontWeight={500}
              marginLeft={"0.06rem"}
            >
              {props.nft.basePriceFormat()}
            </Typography>
          </Flex>
          <Flex alignItems={"center"}>
            <Flex alignContent={"center"}>
              {props.aprInfo.name ?
                <Pop20
                  content={`${props.aprInfo?.name}`}
                >
                  <Icon
                    style={{ marginRight: "0.05rem" }}
                    width={"0.22rem"}
                    height={"0.22rem"}
                    src={props.aprInfo?.icon}
                  />
                </Pop20>
                :
                <Skeleton.Avatar shape={'circle'} active size={"small"} />
              }
              {/* <Icon style={{ marginRight: "0.05rem" }} width={"0.22rem"} height={"0.22rem"} src={props.aprInfo.icon} /> */}
              <Typography color={"#000"} fontSize={"0.14rem"} fontWeight={500}>
                Loan Amount
              </Typography>
            </Flex>
            <Flex flex={1}></Flex>
            <Icon width={"0.1rem"} height={"0.15rem"} src={ethIcon} />
            <Typography
              color={"#000"}
              fontSize={"0.16rem"}
              fontWeight={500}
              marginLeft={"0.06rem"}
            >
              {numberFormat(props.availableBorrow.div(10 ** 18).toFixed())}
            </Typography>
          </Flex>
        </Grid>
        <Grid gridArea={"payTitle"}>
          <Typography
            fontWeight={500}
            fontSize={"0.2rem"}
            color={"#000"}
            marginTop={"0.24rem"}
          >
            Pay With
          </Typography>
        </Grid>
        <Grid
          gridArea={"payType"}
          gridTemplateColumns={"1fr 1fr"}
          gridColumnGap={"0.1rem"}
        >
          <PayTypeButton
            isSelected={(payType & PayType.ETH) > 0}
            name={"ETH"}
            balance={
              ethBalance
                ? numberFormat(ethBalance.div(10 ** 18).toFixed())
                : TextPlaceholder
            }
            tap={() => {
              let oldPayType = payType;
              setPayType(
                payType & PayType.ETH
                  ? oldPayType & ~PayType.ETH
                  : (oldPayType |= PayType.ETH)
              );
            }}
            isEth={true}
          />
          <PayTypeButton
            isSelected={(payType & PayType.WETH) > 0}
            name={"WETH"}
            balance={
              wethBalance
                ? numberFormat(wethBalance.div(10 ** 18).toFixed())
                : TextPlaceholder
            }
            tap={() => {
              let oldPayType = payType;
              setPayType(
                payType & PayType.WETH
                  ? oldPayType & ~PayType.WETH
                  : (oldPayType |= PayType.WETH)
              );
            }}
            isEth={false}
          />
        </Grid>
      </Grid>
      {/*  terms of service  */}
      <Box marginTop={"0.24rem"}>
        <label>
          <Flex alignItems={"center"} gap={"0.12rem"}>
            <Checkbox
              defaultChecked={didReadService}
              onChange={() => setDidReadService(!didReadService)}
            />
            <Typography
              color={"#000"}
              fontSize={"0.14rem"}
              fontWeight={500}
              style={{
                userSelect: "none",
              }}
            >
              Checking this box, I agree to NPics{" "}
              <AttrLink href={urls.resource} target={"_blank"}>
                Terms of Service
              </AttrLink>
            </Typography>
          </Flex>
        </label>
      </Box>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        gap={"0.2rem"}
        marginTop={"0.4rem"}
      >
        <CancelButton type={"button"} onClick={() => props.cancelBlock?.()}>
          Cancel
        </CancelButton>
        <ConfirmButton type={"button"} onClick={checkoutBtnClick}>
          Checkout
        </ConfirmButton>
      </Flex>
    </Flex>
  );
}
