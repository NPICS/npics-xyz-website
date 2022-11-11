import { message } from 'antd'
import { Box, Flex, Grid, Icon, Typography } from 'component/Box'
import ButtonDefault from 'component/ButtonDefault'
import { Projection } from "./data";
import React, { memo } from 'react'

interface IFlashClaim {
  project?: Projection[]
}
const FlashClaim = memo(
  (props: IFlashClaim) => {
    const { project } = props;
    return (
      <Box
        background={"rgba(255,255,255,.03)"}
        borderRadius="0.1rem"
        boxShadow="0rem 0rem 0.3rem rgba(0, 0, 0, 0.05)"
        padding="0.3rem 0.4rem 0.7rem"
      >
        <Typography fontSize={"0.2rem"} fontWeight={700} color={'#000'} marginBottom="0.08rem">Airdrop Project</Typography>
        <Typography fontSize={"0.14rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} marginBottom="0.2rem">Current Active：4</Typography>
        <Grid
          gridGap="0.1rem"
          gridTemplateRows={"repeat(5, 1fr)"}
        >
          <Grid
            gridTemplateColumns={"2fr auto 3fr auto 2fr"}
            background="#fff"
            border="0.01rem solid rgba(0, 0, 0, 0.1)"
            borderRadius="0.1rem"
            minHeight="0.7rem"
            padding="0.19rem 0.6rem"
          >
            <Flex alignItems="center" justifyContent="left">
              <Typography marginLeft="0.05rem" fontSize={"0.14rem"} fontWeight={500} color={'#000'} textAlign={"left"}>Project</Typography>
            </Flex>
            <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
            <Flex alignItems="center" justifyContent="center">
              <Typography marginRight="0.1rem" fontSize={"0.14rem"} fontWeight={500} color={'#000)'} textAlign={"center"}>Contract Address</Typography>
            </Flex>
            <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
            <Flex alignItems="center" justifyContent="center"><Typography fontSize={"0.14rem"} fontWeight={500} color={'#000'} textAlign={"center"}>Actions</Typography></Flex>
          </Grid>

          {project && project.map((item, idx) => (
            <Grid
              key={idx}
              gridTemplateColumns={"2fr auto 3fr auto 2fr"}
              background="#fff"
              border="0.01rem solid rgba(0, 0, 0, 0.1)"
              borderRadius="0.1rem"
              minHeight="0.7rem"
              padding="0.19rem 0.6rem"
            >
              <Flex alignItems="center" justifyContent="left">
                {item.icon ? <img style={{
                  borderRadius: "0.1rem",
                  height: "0.38rem",
                  width: "0.38rem",
                  display: 'inlineBlock',
                  overflow: 'hidden',
                  userSelect: 'none',
                }} src={item.icon} /> : null}
                <Typography marginLeft="0.2rem" fontSize={"0.16rem"} fontWeight={700} color={'#000'} textAlign={"left"}>{item.project}</Typography>
              </Flex>
              <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
              <Flex alignItems="center" justifyContent="center">
                <Flex style={{ cursor: 'pointer' }} alignItems="center" justifyContent="center" onClick={() => window.open(`https://etherscan.io/address/${item.address}`)}>
                  <Typography marginRight="0.1rem" fontSize={"0.14rem"} fontWeight={500} color={'rgba(0,0,0,.5)'} textAlign={"center"}>
                    {item.address}
                  </Typography>
                  {item.exportIcon ? <Icon height="0.16rem" src={item.exportIcon} /> : null}
                </Flex>
              </Flex>
              <Flex alignItems="center" justifyContent="center"><Typography textAlign={"center"}></Typography></Flex>
              <Flex alignItems="center" justifyContent="center">
                <ButtonDefault
                  disabled={!item.isAllowed()}
                  height='0.48rem'
                  minWidth='1.2rem'
                  types='normal'
                  onClick={() => message.warn('This item airdrop has been claimed.')}
                >
                  {item.actions}
                </ButtonDefault>
              </Flex>
            </Grid>
          ))}
        </Grid>

      </Box>
    )
  }
)

export default FlashClaim