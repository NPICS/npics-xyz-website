import { Button2, Flex, Grid, GridItem, Icon, Typography } from "component/Box";
import styled from "styled-components";
import { imgurl } from "utils/globalimport";
import { Space } from "antd"
import ethIcon from "../../assets/images/market/eth_icon.svg"
import { Collapse } from 'antd';
import { useEffect, useState } from "react";
import http from "utils/http";
import BigNumber from "bignumber.js";
const AprSelectBox = styled.div`
  width: 7.2rem;
  /* min-height: 5rem; */
  min-height: 3.5rem;
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
export interface Iapr {
  id: number;
  platform: string;
  available: number;
  interestAPR: number;
  rewardAPR: number;
  vaultAPR: number;
}
const PanelHead = ({ apr }: { apr: Iapr }) => {
  return (
    <Flex width={"100%"} justifyContent={"space-between"}>
      <Typography fontSize={"0.14rem"}>Vault APR</Typography>
      <Flex>
        {/* <Typography fontSize={"0.14rem"}>{(apr.rewardAPR - Math.abs(apr.interestAPR)).toFixed(2)}%</Typography> */}
        <Typography fontSize={"0.14rem"}>{((apr.vaultAPR) * 100).toFixed(2)}%</Typography>
      </Flex>
    </Flex>
  )
}
const AprSelect = ({ defaultApr, selectApr, onClose, onSelect, nft, selectFloorPrice }: { defaultApr?: string, selectApr: string, onClose: () => void, onSelect: (apr: Iapr) => void, nft?: string, selectFloorPrice?: BigNumber }) => {
  const { Panel } = Collapse;
  const [aprList, setAprList] = useState<Iapr[]>([]);
  //doodles or space-doodles is dont support
  const wingNotSupportedList = [
    "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    "0x620b70123fb810f6c653da7644b5dd0b6312e4d8"
  ]
  const bendaoNotSupportedList = [
    "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7"
  ]
  useEffect(() => {
    const getAllplatform = async () => {
      let platformObj = {}
      if (nft && wingNotSupportedList.includes(nft)) {
        console.log("this nft is dont support wing");
        platformObj = {
          platform: "bendao"
        }
      }
      if (nft && bendaoNotSupportedList.includes(nft)) {
        console.log("this nft is dont support benddao");
        platformObj = {
          platform: "wing"
        }
      }
      const res: any = await http.myPost("npics-nft/app-api/v2/platform/getList", platformObj);
      const list: Iapr[] = []
      if (res.code === 200 && res.data.records) {
        console.log(selectFloorPrice);
        const floor = selectFloorPrice?.toNumber() || 0;
        res.data.records.map((item: any) => {
          const ltv = parseFloat(item.collectionsResultModel[0].ltv);
          const obj = {
            id: item.id,
            platform: item.platform === "wing" ? 'Wing' : 'BendDao',
            // available: parseFloat(parseFloat(item.suppliedBalance).toFixed(2)),
            rewardAPR: parseFloat((parseFloat(item.borrowApy) * 100).toFixed(2)),
            interestAPR: parseFloat((parseFloat(item.supplyApy) * 100).toFixed(2)),
            vaultAPR: (parseFloat(item.borrowApy) - parseFloat(item.supplyApy)),
            available: parseFloat((floor * ltv).toFixed(2))
          }
          if (item.platform !== selectApr) {
            return list.push(obj)
          }
          list.unshift(obj)
        })
      }
      setAprList(list)
    }
    getAllplatform()
  }, [])
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
              <SelectItem key={apr.id}>
                <Flex alignItems={"center"} justifyContent={"space-between"} paddingBottom={"0.18rem"}>
                  <Flex alignItems={"center"}>
                    <Space>
                      <Icon src={apr.platform === 'Wing' ? imgurl.market.WingSelect : imgurl.dashboard.rewardBend} width={"0.32rem"} height={"0.32rem"} />
                      <Typography fontSize={"0.2rem"} fontWeight={"700"}>{apr.platform}</Typography>
                      <Icon hidden={apr.platform === selectApr ? false : true} src={imgurl.market.SelectIcon} width={"0.18rem"} height={"0.18rem"} />
                    </Space>
                  </Flex>
                  <SelectButton onClick={() => onSelect(apr)} disabled={apr.platform === selectApr ? true : false}>Check</SelectButton>
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
                      <Collapse expandIconPosition="end" style={{ width: '100%' }} ghost>
                        <Panel className="collapse_panel" header={<PanelHead apr={apr} />} key="1">
                          <Flex paddingBottom={"0.12rem"} justifyContent={"space-between"}>
                            <Typography fontSize={"0.14rem"}>Reward APR</Typography>
                            <Typography fontSize={"0.14rem"}>{apr.rewardAPR}%</Typography>
                          </Flex>
                          <Flex paddingBottom={"0.2rem"} justifyContent={"space-between"}>
                            <Typography fontSize={"0.14rem"}>Interest APR</Typography>
                            <Typography fontSize={"0.14rem"}>-{apr.interestAPR}%</Typography>
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