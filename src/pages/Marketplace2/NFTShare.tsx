import {Box, Flex, Icon} from "../../component/Box";
import ShareIcon from "../../assets/images/market/nft_share_line.png"
import {CollectionDetail} from "../../model/user";
import styled from "styled-components";
import {message} from "antd";
import {copyToClipboard} from "../../utils/clipboard-utils";
import Checkbox from "../../component/Input/Checkbox";
import refreshIcon from "../../assets/images/market/nft_refresh.svg"
import homePageIcon from "../../assets/images/market/nft_homepage.svg"

function IconWithBorder(props: {
  icon: string,
  tap?(): void
}) {
  return <Flex alignItems={"center"}
               justifyContent={"center"}
               borderRadius={"10px"}
               border={"1px solid #00000033"}
               width={"40px"}
               height={"40px"}
               style={{
                 "cursor": "pointer",
                 "userSelect": "none"
               }}
               onClick={props.tap}
  >
    <Icon
      width={"24px"}
      src={props.icon}
    />
  </Flex>
}

export default function NFTShare(props: {
  item?: CollectionDetail
}) {

  const copyToClipboardWithCommand = (content: string) => {
    const el = document.createElement("textarea");
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    message.success("Copy Successfully")
  };

  return <Flex justifyContent={"end"} alignItems={"start"} gap={"6px"}>
    <IconWithBorder icon={refreshIcon} tap={async () => {
      window.location.reload()
    }}/>
    <IconWithBorder icon={homePageIcon} tap={async () => {
      props.item?.externalUrl && window.open(props.item.externalUrl)
    }} />
    <IconWithBorder icon={ShareIcon} tap={async () => {
      let link = window.location.href
      await copyToClipboard(link)
    }}/>
  </Flex>
}