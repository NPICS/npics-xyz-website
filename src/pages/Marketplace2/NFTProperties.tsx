import {Flex, Grid, Icon, Typography} from "../../component/Box";
import {CollectionDetail} from "../../model/user";
import {percentageFormat} from "../marketplace/components/utils";
import styled from "styled-components";
import titlePrefixIcon from "../../assets/images/market/nft_properties_icon.png"

const CellBackground = styled.div`
  background: linear-gradient(#F2BE58, #E84866);
  padding: 1px;
  border-radius: .1rem;
`

function PropertiesCell(props: {
    title: string
    value: string
    description: string
}) {
    return <CellBackground>
        <Flex
            background={"#FFEAE4"}
            borderRadius={".1rem"}
            gap={".06rem"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            padding={".12rem .18rem"}
            height={"100%"}
            style={{
                "userSelect": "none",
                "cursor": "pointer"
            }}
        >
            <Typography
                fontSize={".14rem"}
                fontWeight={500}
                color={"#ff8933"}
                textAlign={"center"}
            >{props.title.toUpperCase()}</Typography>
            <Typography
                fontSize={`.16rem`}
                fontWeight={800}
                color={`#000`}
                textAlign={'center'}
            >{props.value}</Typography>
            <Typography
                fontSize={`.14rem`}
                fontWeight={500}
                color={`rgba(0,0,0,.5)`}
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
        border={"1px solid #0000001A"}
        borderRadius={".1rem"}
        alignItems={"stretch"}
    >
        <Flex
            flexDirection={"row"}
            gap={".12rem"}
            borderBottom={"1px solid #0000001A"}
            padding={".14rem .25rem"}
        >
            <Icon width={".24rem"} height={".24rem"} src={titlePrefixIcon}/>
            <Typography
                fontWeight={500}
                fontSize={".16rem"}
                color={"#000"}
            >Properties</Typography>
        </Flex>
        <Grid
            gridTemplateColumns={"repeat(2, auto)"}
            gridGap={".1rem"}
            padding={".2rem"}
            alignItems={"stretch"}
        >
            {
                props.item?.traits.map((it, idx) => {
                    return <PropertiesCell
                        key={idx}
                        title={it.trait_type}
                        value={it.value ?? "---"}
                        description={
                            `${it.trait_count}(${percentageFormat(it.trait_count / 100 / 100)}) have this trait`
                        }
                    />
                })
            }
        </Grid>
    </Flex>
}