import React, { useEffect, useState } from "react";
import http, { NEW_HTTP_API } from "utils/http";
import type { ColumnsType } from "antd/lib/table";
import { Skeleton, Table } from "antd";
import { Collections } from "../../../model/user";
import { CollectionList } from "model/collection";
import { deserializeArray } from "class-transformer";
import styled from "styled-components";
import { imgurl } from "utils/globalimport";
import BigNumber from "bignumber.js";
import { Link } from "react-router-dom";
import { Icon } from "component/Box";
import SkeletonTable from "./SkeletonTable";
import openseaValidIcon from "assets/images/market/nfts_opensea_valid.svg";
import { useAppDispatch } from "../../../store/hooks";
import { changePlatform } from "../../../store/platfrom";
import axios from "axios";
import { BANK_ENUM } from "../../../utils/enums";
import { setIsLoading } from "../../../store/app";
interface DataType {
  index: string;
  key: React.Key;
  floorPrice: string;
  miniDP: string;
  total: string;
  maxBorrowBank: {
    bankId: BANK_ENUM;
    address: string;
    borrowAsset: string;
    floorPrice: string;
    ltv: string;
    liquidationThreshold: string;
    borrowApr: string;
    rewardApr: string;
    apr: string;
  };
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  symbol: string;
  address: string;
  totalSwhelves: number;
  totalSupply: number;
  dayChange: string;
  dayVolume: string;
}

const BgTable = styled.div`
  position: relative;
  width: 16rem;
  margin: 0 auto;
  z-index: 1;
  /* margin-top: 0.5rem; */
  .table_col {
    font-size: 0.14rem !important;
  }
  .table_col_apr {
    font-size: 0.14rem !important;
    padding: 0.1rem 0.16rem !important;
  }
  .ant-table-reset {
    .ant-table-tbody {
      & > tr {
        border-bottom: 0.05rem solid transparent;
      }
    }
  }
`;

export default function MyTable() {
  const dispatch = useAppDispatch();
  const [collections, setCollections] = useState<DataType[]>();
  const [showTable, setShowTable] = useState<boolean>(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  const openCollection = (row: DataType) => {
    dispatch(changePlatform(BANK_ENUM[row.maxBorrowBank.bankId]));
  };

  function ScrollTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  const url = "/npics-nft/app-api/v2/nft/getCollections2";
  const getData = async () => {
    const newRes = await axios
      .get(`${NEW_HTTP_API}/downpay/collection/list`)
      .then((res) => res.data.data)
      .catch(() => []);
    setIsLoading(false);
    setShowTable(true);
    console.log("newRes", newRes);
    setCollections(newRes);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      align: "center",
      className: "table_col",
      render: (text, row, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: "Collection",
      dataIndex: "collection",
      key: "collection",
      align: "left",
      className: "table_col",
      render: (text, row) => (
        <Link
          to={`/marketplace/collections/${row.address}`}
          onClick={() => openCollection(row)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <img
              src={row.imageUrl}
              alt=""
              style={{
                width: "0.5rem",
                height: "0.5rem",
                marginRight: "0.1rem",
                borderRadius: "0.3rem",
              }}
            />
            <span
              style={{
                wordBreak: "break-all",
                fontSize: "0.14rem",
                color: "#fff",
                marginRight: "0.1rem",
              }}
            >
              {row.name}
            </span>
            <Icon
              style={{ flexShrink: "0", margin: 0 }}
              src={openseaValidIcon}
              width={"0.16rem"}
              height={"0.16rem"}
            />
          </div>
        </Link>
      ),
    },
    {
      title: "24H Vol",
      dataIndex: "dayVolume",
      key: "dayVolume",
      align: "left",
      className: "table_col",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        return +a.dayVolume - +b.dayVolume;
      },
      render: (text: number, row) => {
        return (
          <div className="descend">
            <div>
              <img src={imgurl.whitePrice} alt="" />
            </div>
            <div>
              <span style={{ fontSize: "0.14rem" }}>
                {text === 0 ? "0.00" : (+text).toFixed(2)}
              </span>
              <span
                style={{
                  fontSize: "0.14rem",
                  color: `${+row.dayChange >= 0 ? "#7BD742" : "#D03434"}`,
                }}
              >{`${+row.dayChange >= 0 ? "+" : ""}${
                +row.dayChange === 0
                  ? "0.00"
                  : (+row.dayChange * 100).toFixed(2)
              }%`}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Floor Price",
      dataIndex: "maxBorrowBank",
      key: "maxBorrowBank",
      align: "left",
      className: "table_col",
      // defaultSortOrder: 'descend',
      sorter: (a, b) =>
        +a.maxBorrowBank.floorPrice - +b.maxBorrowBank.floorPrice,
      render: (text, row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <img
            src={imgurl.whitePrice}
            alt=""
            style={{ marginRight: "0.1rem" }}
          />
          <span
            style={{ fontSize: "0.14rem", color: "#fff", fontWeight: "500" }}
          >
            {(+row.maxBorrowBank.floorPrice).toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      title: "Down Payment ( % )",
      dataIndex: "advanceRate",
      align: "left",
      className: "table_col",
      key: "advanceRate",
      // defaultSortOrder: 'descend',
      sorter: (a, b) => +a.maxBorrowBank.ltv - +b.maxBorrowBank.ltv,
      render: (text, d) => (
        <div
          style={{ fontSize: "0.14rem", color: "#fff", fontWeight: "500" }}
        >{`${(1 - +d.maxBorrowBank.ltv) * 100}%`}</div>
      ),
    },
    {
      title: "Down Payment",
      dataIndex: "floorPrice",
      key: "floorPrice",
      align: "left",
      className: "table_col",
      // defaultSortOrder: 'descend',
      sorter: (a, b) =>
        +a.maxBorrowBank.floorPrice - +b.maxBorrowBank.floorPrice,
      render: (text, row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <img
            src={imgurl.whitePrice}
            alt=""
            style={{ marginRight: "0.1rem" }}
          />
          <span
            style={{ fontSize: "0.14rem", color: "#fff", fontWeight: "500" }}
          >
            {(
              (1 - +row.maxBorrowBank.ltv) *
              +row.maxBorrowBank.floorPrice
            ).toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      title: "Vault APR",
      dataIndex: "apr",
      key: "apr",
      align: "left",
      className: "table_col_apr",
      // defaultSortOrder: 'descend',
      sorter: (a, b) => +a.maxBorrowBank.apr - +b.maxBorrowBank.apr,
      render: (text, row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <span
            style={{ fontSize: "0.14rem", color: "#fff", fontWeight: "500" }}
          >
            {(+row.maxBorrowBank.apr * 100).toFixed(2)}%
          </span>
        </div>
      ),
    },
  ];

  return (
    <BgTable>
      {showTable ? (
        <Table
          columns={columns}
          dataSource={showTable ? collections : []}
          pagination={false}
          className="ant-table-reset"
        ></Table>
      ) : (
        <SkeletonTable></SkeletonTable>
      )}
    </BgTable>
  );
}
