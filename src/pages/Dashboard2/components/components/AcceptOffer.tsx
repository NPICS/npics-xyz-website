import Modal from "../../../../component/Modal";
import {Box, Flex, Grid, Icon, Typography} from "../../../../component/Box";
import {CancelButton, ConfirmButton, PopupTitle} from "../../../Marketplace2/NFTPay";
import validIcon from "../../../../assets/images/market/nfts_opensea_valid.svg"
import wethIcon from "../../../../assets/images/market/weth_icon.svg"

export default function AcceptOffer() {
  return <Modal isOpen={true}>
    <Box
      minWidth={"880px"}
      background={`#fff`}
      borderRadius={`20px`}
      padding={`40px`}
    >
      <PopupTitle title={"Accept Offec"} canClose={false}/>
      <Grid
        marginTop={`30px`}
        padding={`20px 25px`}
        borderRadius={`10px`}
        border={`1px solid #0000001A`}
        gridTemplateRows={"306px auto"}
        gridTemplateColumns={`306px auto`}
        gridTemplateAreas={`
          "img price"
          "receive receive"
        `}
        gridGap={`14px`}
      >
        <Grid gridArea={`img`} borderRadius={"6px"} background={`#eee`} overflow={"hidden"}>
          <Icon width={"100%"} height={"100%"}></Icon>
        </Grid>
        <Grid gridArea={`price`}>
          {/* Name and price */}
          <Flex flexDirection={`column`} alignItems={`stretch`}>
            <Flex gap={`6px`} alignItems={`center`}>
              <Typography
                color={`#000`}
                fontSize={`14px`}
                fontWeight={500}
              >Doodles</Typography>
              <Icon src={validIcon} width={`12px`} height={`12px`}></Icon>
            </Flex>
            <Typography
              marginTop={`6px`}
              fontWeight={700}
              fontSize={`20px`}
              color={`#000`}
            >Doodle #582</Typography>
            {/* Offer */}
            <Flex
              marginTop={`10px`}
              border={`1px solid #0000001A`}
              flex={1}
              borderRadius={`10px`}
              flexDirection={`column`}
              alignItems={`stretch`}
              background={`#F6F6F6`}
              overflow={`hidden`}
            >
              <Flex flex={1} borderBottom={`1px solid #0000001A`} background={`#fff`}>
                <OfferCell title={`Offer`} titleColor={`#000`} symbolIcon={true} symbolOrVal={`40.7`}/>
              </Flex>
              <OfferCell title={`Vault Debt`} symbolIcon={true} symbolOrVal={`40.7`}/>
              <OfferCell title={`X2Y2 Fee`} symbolIcon={false} symbolOrVal={`0.00%`}/>
              <OfferCell title={`Marker Fee`} symbolIcon={false} symbolOrVal={`0.00%`}/>
              <OfferCell title={`Creator Royalty`} symbolIcon={false} symbolOrVal={`0.00%`}/>
            </Flex>
          </Flex>
        </Grid>
        <Grid gridArea={`receive`}>
          <Flex
            background={`#7BD742`}
            borderRadius={`10px`}
            padding={`30px 40px`}
            alignItems={`center`}
            justifyContent={`space-between`}
            style={{
              cursor: `pointer`,
              userSelect: `none`
            }}
          >
            <Typography
              color={`#000`}
              fontSize={`20px`}
              fontWeight={700}
            >You Receive</Typography>
            <Flex flexDirection={`row`} gap={`6px`} alignItems={`center`}>
              <Icon src={wethIcon}></Icon>
              <Typography
                color={`#000`}
                fontSize={`20px`}
                fontWeight={700}
              >998.12</Typography>
              <Typography
                color={`rgba(0, 0, 0, .5)`}
                fontSize={`16px`}
                fontWeight={500}
                marginLeft={`4px`}
              >($123.123)</Typography>
            </Flex>
          </Flex>
        </Grid>
      </Grid>
      {/* buttons */}
      <Flex alignItems={"center"} justifyContent={"center"} gap={"20px"} marginTop={"30px"}>
        <CancelButton
          onClick={async () => {

          }}>Cancel</CancelButton>
        <ConfirmButton
          onClick={() => {

          }}
        >Accept Offer</ConfirmButton>
      </Flex>
    </Box>
  </Modal>
}

function OfferCell(props: {
  title: string,
  titleColor?: string
  symbolIcon: boolean
  symbolOrVal?: string | number
}) {
  return <Flex
    flex={1}
    alignItems={`center`}
    justifyContent={`space-between`}
    padding={`0 30px`}
  >
    <Typography
      color={props.titleColor ?? `rgba(0, 0, 0, .5)`}
      fontSize={`14px`}
      fontWeight={500}
    >{props.title}</Typography>
    <Flex alignItems={`center`} gap={`6px`}>
      <Icon src={wethIcon} width={`10px`} height={`15px`} hidden={!props.symbolIcon}/>
      <Typography
        fontSize={`14px`}
        color={`#000`}
        fontWeight={500}
      >{props.symbolOrVal ?? `-`}</Typography>
    </Flex>
  </Flex>
}