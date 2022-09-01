import { Box, Flex, Icon, Typography } from "component/Box";
import { PopupTitle } from "./NFTPay";
import { CollectionDetail } from "../../model/user";
import { imgurl } from "../../utils/globalimport";
import { urls } from "../../utils/urls";
import progressIcon from "../../assets/images/market/nft_pay_progressing.gif";
import { StatusGif } from "./NFTPayWrong";

function MarketLabel(props: { icon?: string; name: string }) {
  return (
    <Flex
      border={"0.01rem solid #e5e5e5"}
      borderRadius={"0.1rem"}
      alignItems={"center"}
      height={"0.52rem"}
      padding={"0 0.21rem"}
      style={{
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      <Icon width={"0.28rem"} height={"0.28rem"} src={props.icon} />
      <Typography
        fontWeight={500}
        fontSize={"0.2rem"}
        color={"#000"}
        marginLeft={"0.12rem"}
        fontStyle={"normal"}
      >
        {props.name}
      </Typography>
    </Flex>
  );
}

export default function NFTPayProgressing(props: { nft: CollectionDetail }) {
  return (
    <Flex
      width={"8.8rem"}
      background={"#fff"}
      borderRadius={"0.1rem"}
      padding={"0.4rem"}
      flexDirection={"column"}
    >
      <PopupTitle title={"Progressing"} canClose={true} />
      <Flex alignSelf={"center"}>
        <StatusGif src={progressIcon} />
      </Flex>
      <Flex alignSelf={"center"} alignItems={"center"} gap={"0.06rem"}>
        <Typography
          fontSize={"0.14rem"}
          fontWeight={500}
          color={"rgba(0,0,0,.5)"}
        >
          Estimated waiting time is
        </Typography>
        <Typography fontSize={"0.16rem"} fontWeight={500} color={"#000"}>
          30s
        </Typography>
      </Flex>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        gap={"0.3rem"}
        marginTop={"0.3rem"}
      >
        <MarketLabel
          name={props.nft.marketDisplay() || ""}
          icon={props.nft.marketIcon()}
        />
        <MarketLabel name={"DYDX"} icon={imgurl.market.DYDXBuy} />
        <MarketLabel name={"BendDAO"} icon={imgurl.market.BendDAOBuy} />
      </Flex>
      <Flex marginTop={"0.7rem"} justifyContent={"center"}>
        <Typography
          fontSize={"0.14rem"}
          fontWeight={500}
          color={"rgba(0,0,0,.5)"}
          style={{
            userSelect: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            window.open(urls.resource);
          }}
        >
          How it works?
        </Typography>
      </Flex>
    </Flex>
  );
}
