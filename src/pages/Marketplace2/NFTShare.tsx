import {Box, Flex, Icon} from "../../component/Box";
import ShareIcon from "../../assets/images/market/nft_share_line.png"

function IconWithBorder(props: {
    icon: string
}) {
    return <Flex alignItems={"center"}
                 justifyContent={"center"}
                 borderRadius={".1rem"}
                 border={"1px solid #00000033"}
                 width={".4rem"}
                 height={".4rem"}
                 style={{
                     "cursor": "pointer"
                 }}
    >
        <Icon
            width={".24rem"}
            src={props.icon}
        />
    </Flex>
}

export default function NFTShare() {
    return <Flex justifyContent={"end"} alignItems={"start"}>
        <IconWithBorder icon={ShareIcon}/>
    </Flex>
}