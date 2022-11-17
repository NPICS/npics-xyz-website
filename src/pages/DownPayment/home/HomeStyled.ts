import styled, { css } from "styled-components";
import HomeBg from "../../../assets/images/head_bg.png";

export const title = css`
  font-style: normal;
  font-weight: 800;
  font-size: 0.36rem;
  color: #000;
`;

export const HomeWrap = styled.div`
  height: 100%;
  background: #e5e5e5;
  margin: 0 auto;
  min-width: 16rem;
  .collection_box {
    padding: 1.3rem 0;
  }
  .collections-title {
    width: 16rem;
    margin: 0 auto;
    padding-bottom:0.4rem;
    text-align: center;
    ${title};
  }
`;