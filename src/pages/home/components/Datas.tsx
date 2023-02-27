import { Skeleton } from "antd";
import { Fragment, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useIntervalWhen } from "rooks";
import styled from "styled-components";
import { imgurl } from "utils/globalimport";
import http, { NEW_HTTP_API } from "utils/http";
import axios from "axios";
const DatasWarp = styled.div`
  width: 16rem;
  margin: 0 auto;
  padding-bottom: 0.1rem;
  .datas_box {
    height: 1.6rem;
    color: #fff;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .data_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .data_item_count {
      font-size: 0.28rem;
      font-weight: 700;
      line-height: 0.6rem;
      .data_item_available {
        display: flex;
        justify-content: center;
        align-items: center;
        .available_icon {
          width: 0.28rem;
          height: 0.28rem;
          margin-right: 10px;
        }
      }
    }
    .data_item_name {
      font-weight: 300;
    }
  }
`;
const Datas = () => {
  const [list, setList] = useState<any[]>([
    {
      id: 1,
      name: "NFTs Listing",
      count: 0.0,
    },
    {
      id: 2,
      name: "Available Supply",
      count: 0.0,
    },
    {
      id: 3,
      name: "Vault APR",
      count: 0.0,
    },
  ]);
  const [availableTotal, setAvailableTotal] = useState<number>(0);
  const [supplyAva, setSupplyAva] = useState<number>(0);
  const [vaultApr, setVaultApr] = useState<number>(0);
  useIntervalWhen(
    () => {
      getData();
    },
    60000,
    true,
    true
  );
  const getData = async () => {
    const newResp = await axios
      .get(`${NEW_HTTP_API}/downpay/status`)
      .then((res) => res.data.data)
      .catch(() => null);

    if (newResp) {
      setAvailableTotal(parseFloat(newResp.total));
      setSupplyAva(parseFloat(newResp.supply));
      setVaultApr(parseFloat(newResp.apr) * 100);
    }
  };
  return (
    <DatasWarp>
      <div className="datas_box">
        <div className="data_item">
          <span className="data_item_count">
            {availableTotal ? (
              <CountUp
                duration={2}
                start={0}
                end={availableTotal}
                separator={","}
              />
            ) : (
              <Skeleton.Button
                shape={"square"}
                active
                style={{
                  height: "0.3rem",
                  minWidth: "1rem",
                  borderRadius: "0.08rem",
                }}
              ></Skeleton.Button>
            )}
          </span>
          <span className="data_item_name">NFTs Listing</span>
        </div>
        <div className="data_item">
          <span className="data_item_count">
            {supplyAva ? (
              <div className="data_item_available">
                <img className="available_icon" src={imgurl.ETH36} />
                <CountUp
                  duration={1.5}
                  start={0}
                  end={supplyAva}
                  decimals={2}
                  separator={","}
                />
              </div>
            ) : (
              <Skeleton.Button
                shape={"square"}
                active
                style={{
                  height: "0.3rem",
                  minWidth: "1rem",
                  borderRadius: "0.08rem",
                }}
              ></Skeleton.Button>
            )}
          </span>
          <span className="data_item_name">Available Supply</span>
        </div>
        <div className="data_item">
          {vaultApr ? (
            <span className="data_item_count">
              <CountUp duration={1.5} decimals={2} start={0} end={vaultApr} />%
            </span>
          ) : (
            <Skeleton.Button
              shape={"square"}
              active
              style={{
                height: "0.3rem",
                minWidth: "1rem",
                borderRadius: "0.08rem",
                marginBottom: "0.3rem",
              }}
            ></Skeleton.Button>
          )}
          <span className="data_item_name">Vault APR</span>
        </div>
      </div>
    </DatasWarp>
  );
};

export default Datas;
