import {Flex, Grid, Icon, Typography} from "../../component/Box";
import {CollectionDetail} from "../../model/user";
import styled from "styled-components";
import titlePrefixIcon from "../../assets/images/market/nft_properties_icon.png"
import {TextPlaceholder} from "../../component/styled";
import _ from "lodash"

const CellBackground = styled.div`
  background: linear-gradient(#F2BE58, #E84866);
  padding: 0.01rem;
  border-radius: 0.1rem;
`

function PropertiesCell(props: {
    title: string
    value: string
    description: string
}) {
    return <CellBackground>
        <Flex
            background={"#FFEAE4"}
            borderRadius={"0.1rem"}
            gap={"0.06rem"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            padding={"0.12rem 0.18rem"}
            height={"100%"}
            style={{
                // "userSelect": "none",
                // "cursor": "pointer"
            }}
        >
            <Typography
                fontSize={"0.14rem"}
                fontWeight={500}
                color={"#ff8933"}
                textAlign={"center"}
            >{props.title.toUpperCase()}</Typography>
            <Typography
                fontSize={`0.16rem`}
                fontWeight={800}
                color={`#000`}
                textAlign={'center'}
            >{props.value}</Typography>
            <Typography
                fontSize={`0.14rem`}
                fontWeight={500}
                color={`rgba(0, 0, 0, .5)`}
                textAlign={"center"}
            >{props.description}</Typography>
        </Flex>
    </CellBackground>
}

export default function NFTProperties(props: {
    item?: CollectionDetail
}) {
    return <Flex
        flexDirection={"column"}
        border={"0.01rem solid #0000001A"}
        borderRadius={"0.1rem"}
        alignItems={"stretch"}
    >
        <Flex
            flexDirection={"row"}
            gap={"0.12rem"}
            borderBottom={"0.01rem solid #0000001A"}
            padding={"0.14rem 0.25rem"}
            alignItems={"center"}
        >
            <Icon width={"0.24rem"} height={"0.24rem"} src={titlePrefixIcon}/>
            <Typography
                fontWeight={500}
                fontSize={"0.16rem"}
                color={"#000"}
            >Properties</Typography>
        </Flex>
        <Grid
            gridTemplateColumns={"repeat(2, 1fr)"}
            gridGap={"0.1rem"}
            padding={"0.2rem"}
            alignItems={"stretch"}
            justifyContent={"stretch"}
        >
            {
                props.item?.traits.map((it, idx) => {
                    return <PropertiesCell
                        key={idx}
                        title={it.trait_type}
                        value={_.capitalize(it.value ?? TextPlaceholder)}
                        description={
                            `${it.trait_count} (${(it.trait_count / 100).toFixed(2)}%) have this`
                        }
                    />
                })
            }
        </Grid>
    </Flex>
}