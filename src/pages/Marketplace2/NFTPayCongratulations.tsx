import { Box, Flex, Icon, Typography } from "component/Box";
import { CancelButton, ConfirmButton, PopupTitle } from "./NFTPay";
import styled from "styled-components";
import nftLinkIcon from "../../assets/images/market/address_link.png";
import successIcon from "../../assets/images/market/nft_pay_success.gif";
import { CollectionDetail } from "../../model/user";
import { urls } from "../../utils/urls";
import { useNavigate } from "react-router-dom";
import { StatusGif } from "./NFTPayWrong";
import { useState } from "react";
import { useAsync } from "react-use";
import { Npics } from "../../abis/Npics";
import { useWeb3React } from "@web3-react/core";
import { copyToClipboard } from "../../utils/clipboard-utils";
import { VaultsItemData } from "../Dashboard2/components/components/StyledInterface";
import http, { NPICS_GRAPH_API } from "../../utils/http";

const NFTCover = styled.img`
  display: block;
  width: 0.92rem;
  height: 0.92rem;
  border-radius: 0.1rem;
  background: #eee;
  object-fit: cover;
  overflow: hidden;
`;

export const AttrLink = styled.a`
  text-decoration: none;
  color: #ff490f;

  &:hover {
    color: #ff490f;
  }
`;

export default function NFTPayCongratulations(props: {
  nft: CollectionDetail;
  hash: string;
  dismiss?(): void;
}) {
  const navigate = useNavigate();
  const [neoAddress, setNeoAddress] = useState<string>();
  const { provider, account } = useWeb3React();

  useAsync(async () => {
    if (!provider) return;
    let c = new Npics(provider);
    let address = await c.getNeoFor(props.nft.address);
    setNeoAddress(address);
  }, [provider, props.nft]);

  const onCheckVault = async () => {
    const downpays: VaultsItemData[] = await http
      .myPost(NPICS_GRAPH_API, {
        query: `
      {
        downpays(first: 1, where: {
          user: "${account}",nft:"${props.nft.address}",tokenId:"${props.nft.tokenId}"
        },orderBy: createdAt, orderDirection: desc) {
          id
        }
      }
      `,
      })
      .then((res: any) => res.data.downpays || []);
    if (downpays.length > 0) {
      navigate(`/vaultsDetail/${downpays[0].id}`);
    } else {
      navigate(`/dashboard/vaults`);
    }
  };

  return (
    <Flex
      width={"8.8rem"}
      background={"#fff"}
      borderRadius={"0.1rem"}
      padding={"0.4rem"}
      flexDirection={"column"}
    >
      <PopupTitle title={"Congratulations!"} canClose={true} />
      <Flex
        marginTop={"0.3rem"}
        flexDirection={"column"}
        border={"0.01rem solid #e5e5e5"}
        borderRadius={"0.1rem"}
        padding={"0.4rem 1.4rem 0.2rem"}
      >
        <Flex alignSelf={"center"}>
          <StatusGif src={successIcon} />
        </Flex>
        <Flex gap={"0.18rem"} alignItems={"center"}>
          <NFTCover src={props.nft.imageUrl} />
          <Flex justifyContent={"center"} flexDirection={"column"} flex={1}>
            <Box>
              You've deposited{" "}
              <AttrLink
                href={urls.etherscanNft(props.nft.address, props.nft.tokenId)}
                target={"_blank"}
              >
                {props.nft.name ? `${props.nft.name}` : `${props.nft.singularForName()} #${props.nft.tokenId}`}
                {/* {`${props.nft.singularForName()} #${props.nft.tokenId}`} */}
                {/* {`${props.nft.name}`} */}
              </AttrLink>{" "}
              and minted
            </Box>
            <Flex
              alignItems={"center"}
              gap={"0.1rem"}
              marginTop={"0.08rem"}
              style={{
                userSelect: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                neoAddress &&
                  window.open(urls.etherscanNft(neoAddress, props.nft.tokenId));
              }}
            >
              <Typography
                fontSize={"0.16rem"}
                fontWeight={500}
                color={"rgba(0,0,0,.5)"}
              >
                {
                  props.nft.name ? `NEO ${props.nft.name}` : `NEO ${props.nft.collectionSymbol} #${props.nft.tokenId}`
                  // `NEO ${props.nft.collectionName} #${props.nft.tokenId}`
                  // `NEO ${props.nft.name}`
                  //props.nft.neoOneName()
                }
              </Typography>
              <Icon width={"0.14rem"} height={"0.14rem"} src={nftLinkIcon} />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          marginTop={"0.42rem"}
          alignSelf={"center"}
          alignItems={"center"}
          gap={"0.1rem"}
          style={{
            userSelect: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            window.open(urls.etherscanTxDetail(props.hash));
          }}
        >
          <Typography
            fontSize={"0.14rem"}
            fontWeight={500}
            color={"rgba(0,0,0,.5)"}
          >
            View on etherscan
          </Typography>
          <Icon width={"0.14rem"} height={"0.14rem"} src={nftLinkIcon} />
        </Flex>
      </Flex>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        gap={"0.2rem"}
        marginTop={"0.3rem"}
      >
        <CancelButton
          onClick={async () => {
            if (neoAddress) {
              await copyToClipboard(neoAddress);
            }
          }}
        >
          Add to Wallet
        </CancelButton>
        <ConfirmButton onClick={onCheckVault}>Check Vault</ConfirmButton>
      </Flex>
    </Flex>
  );
}
