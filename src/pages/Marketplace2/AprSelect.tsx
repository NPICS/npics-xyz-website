import { Button2, Flex, Grid, GridItem, Icon, Typography } from "component/Box";
import styled from "styled-components";
import { imgurl } from "utils/globalimport";
import { Space } from "antd"
import ethIcon from "../../assets/images/market/eth_icon.svg"
import { Collapse } from 'antd';
const AprSelectBox = styled.div`
  width: 7.2rem;
  min-height: 5rem;
  background: #fff;
  border-radius: 20px;
  padding:0.4rem;
  .close_box{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0.1rem;
    transition: all 0.2s;
    cursor: pointer;
    &:hover{
      transform:translateY(-50%) rotate(180deg);
    }
  }
`
const SelectItem = styled.div`
  width: 100%;
  padding-top: 0.45rem;
`
const SelectButton = styled(Button2)`
  padding: 0.16rem 0.4rem;
  font-size: 0.14rem;
  font-weight: 700;
`
const CollapseBox = styled.div`
  width: 100%;
  .collapse_panel{
    .ant-collapse-header{
      padding:12px 20px 12px 0 !important;
      .ant-collapse-arrow{
        right: 0;
      }
    }
    .ant-collapse-content{
      .ant-collapse-content-box{
        padding: 0 20px 0 16px;
      }
    }
  }
`
interface Iapr {
  id: number;
  name: string;
  available: number;
  // vaultAPR:143.2,
  rewardAPR: number;
  interestAPR: number;
}
const PanelHead = ({ apr }: { apr: Iapr }) => {
  return (
    <Flex width={"100%"} justifyContent={"space-between"}>
      <Typography fontSize={"0.14rem"}>Vault APR</Typography>
      <Flex>
        <Typography fontSize={"0.14rem"}>{apr.rewardAPR + apr.interestAPR}%</Typography>
      </Flex>
    </Flex>
  )
}
const AprSelect = ({ defaultApr, onClose }: { defaultApr: string, onClose: () => void }) => {
  const { Panel } = Collapse;
  const aprList = [
    {
      id: 1,
      name: "Wing",
      available: 30.8,
      // vaultAPR:143.2,
      rewardAPR: 150.26,
      interestAPR: -7.06
    },
    {
      id: 2,
      name: "BendDao",
      available: 50.8,
      // vaultAPR:143.2,
      rewardAPR: 120.26,
      interestAPR: -10.06
    }
  ]
  return (
    <AprSelectBox>
      {/* title */}
      <Flex justifyContent={"center"} position={"relative"} marginBottom={"0.15rem"}>
        <Typography
          fontSize={"0.3rem"}
          fontWeight={700}
          color={"#000"}
        >
          Lending Provider Selection
        </Typography>
        <div className="close_box" onClick={onClose}>
          <Icon src={imgurl.CloseIconBlack} width={"0.3rem"} height={"0.3rem"} />
        </div>
      </Flex>
      {/* select */}
      <div className="select_box">
        {
          aprList.map((apr: Iapr) => {
            return (
              <SelectItem>
                <Flex alignItems={"center"} justifyContent={"space-between"} paddingBottom={"0.18rem"}>
                  <Flex alignItems={"center"}>
                    <Space>
                      <Icon src={apr.name === 'Wing' ? imgurl.market.WingSelect : imgurl.dashboard.rewardBend} width={"0.32rem"} height={"0.32rem"} />
                      <Typography fontSize={"0.2rem"} fontWeight={"700"}>{apr.name}</Typography>
                      <Icon hidden={apr.name === defaultApr ? false : true} src={imgurl.market.SelectIcon} width={"0.18rem"} height={"0.18rem"} />
                    </Space>
                  </Flex>
                  <SelectButton disabled={apr.name === defaultApr ? true : false}>Check</SelectButton>
                </Flex>
                <Flex flexDirection={"column"} padding={"0.2rem 0.28rem 0 0.28rem"} background={"rgba(0,0,0,0.03)"} borderRadius={"0.1rem"} border={"1px solid rgba(0,0,0,0.1)"}>
                  <Flex width={"100%"} justifyContent={"space-between"}>
                    <Typography>Available Borrow</Typography>
                    <Flex>
                      <Icon width={"0.2rem"} height={"0.2rem"} src={ethIcon} />
                      <span>{apr.available}</span>
                    </Flex>
                  </Flex>
                  <Flex>
                    <CollapseBox>
                      <Collapse expandIconPosition={"end"} style={{ width: '100%' }} ghost>
                        <Panel className="collapse_panel" header={<PanelHead apr={apr} />} key="1">
                          <Flex paddingBottom={"0.12rem"} justifyContent={"space-between"}>
                            <Typography fontSize={"0.14rem"}>Reward APR</Typography>
                            <Typography fontSize={"0.14rem"}>{apr.rewardAPR}%</Typography>
                          </Flex>
                          <Flex paddingBottom={"0.2rem"} justifyContent={"space-between"}>
                            <Typography fontSize={"0.14rem"}>Interest APR</Typography>
                            <Typography fontSize={"0.14rem"}>{apr.interestAPR}%</Typography>
                          </Flex>
                        </Panel>
                      </Collapse>
                    </CollapseBox>
                  </Flex>
                </Flex>
              </SelectItem>
            )
          })
        }
      </div>
    </AprSelectBox>
  )
}

export default AprSelect;