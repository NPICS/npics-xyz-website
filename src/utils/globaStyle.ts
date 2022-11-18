import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* img {
    user-select: none !important;
    -webkit-user-drag: none !important;
    object-fit: cover;
  } */

  img:not([src]) {
    opacity: 0;
  }

  body {
    min-width: 16.8rem;
    font-family: 'Poppins';
    line-height: normal;
    font-size: 0.14rem;
  }

  .ant-selectDropDown-reset {
    background-color: #1a1a1a;
    color: #fff;
    border: 0.01rem solid rgba(255, 255, 255, .5);
    border-radius: 0.1rem;
    text-align: center;
    .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
      border-color: transparent;
      box-shadow: none;
    }
    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
      background-color: transparent;
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      font-weight: 600;
      background-color: transparent;
    }
    .ant-select-item {
      color: #fff;
    }
  }
  .ant-select-reset {
    font-size: 0.14rem;
    background-color: #fff;
    color: rgba(0, 0, 0, .5);
    border: 0.01rem solid rgba(0, 0, 0, .2);
    transition: all 0s;
    border-radius: 0.1rem;
    text-align: center;
    padding: 0.05rem 0;
    .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
      border-color: transparent;
      box-shadow: none;
    }
    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
      background-color: transparent;
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      font-weight: 600;
      background-color: transparent;
    }
    .ant-select-item {
      text-align: left;
      color: rgba(0, 0, 0, .5);
      font-size: 0.14rem;
      padding: 0.1rem 0.2rem;
      transition: all 0s;
      min-height: initial;
      &:hover {
        color: rgba(0,0,0,.7);
      }
    }
    .ant-select-item-option-selected {
      color: #000;
    }
  }
  .ant-input-reset {    
    &:hover {
      border: 0.01rem solid rgba(0,0,0,.2) !important;
      box-shadow:none !important;
    }  
    &:focus {
      border: 0.01rem solid rgba(0,0,0,.2) !important;
      box-shadow:none !important;
    }  
    /* background: #1a1a1a; */
    border: 0.01rem solid rgba(0,0,0,.2);
    border-radius: 0.1rem;
    color: rgba(0, 0, 0, .5);
    font-size: 0.12rem;
    font-weight: 600;
    transition: all 0s; 
    &::placeholder {
      color: rgba(0,0,0,.5);
    }
  }
  .ant-modal-reset {
    .ant-modal-content {
      .ant-modal-close {
        .ant-modal-close-x {
          height: 100%;
          line-height: 0.73rem;
          font-size: 0.16rem;
        }
      }
      .ant-modal-header {
        border-bottom: 0;
      }
      .ant-modal-body {
        &>div {
          display: flex;
          font-size: 0.24rem;
          color: #353945;
          font-weight: 700;
          border-radius: 0.1rem;
          padding: 0.05rem;
          cursor: pointer;
          img {
            width: 0.4rem;
          }
          &:hover {
            background: rgba(0, 0, 0, .07);
          }
        }
      }
    }
  }
  .ant-table-reset {
    .ant-table {
    background: transparent;
    table {
      display: flex;
      flex-direction: column;
      colgroup, thead, tbody {
        display: inline-block;
      }
    }
    .ant-table-column-sorter-up.active, .ant-table-column-sorter-down.active {
      color: red;
    }
    .ant-table-thead {
      margin-bottom: 0.05rem;
      background: #fff;
      /* border: 0.01rem solid rgba(255, 255, 255, .2); */
      border-radius: 0.1rem;
      tr:first-child th:first-child {
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
      }
      .ant-table-column-sorters {
        justify-content: left;
        .ant-table-column-title {
          flex: none;
        }
        .ant-table-column-sorter {
          margin-left: 0.1rem;
        }
      }
      .ant-table-column-sort {
        background: transparent;
      }
      &>tr {
        .ant-table-column-has-sorters:hover {
          background: #fff;
        }
        th:first-child {
          width: 0.8rem;
        }
        th:nth-child(2) {
          width: 4.4rem;
        }
        th {
          color: #000;
          border-bottom: none;
          background-color: #fff;
          height: 0.68rem;
          /* width: 2.716rem; */
          width: 2.2rem;
          padding: 0.22rem 0.16rem;
          font-size: .12rem;
          transition: all 0s;
        }
        th:last-child {
          border-bottom-right-radius: 0.1rem;
          border-top-right-radius: 0.1rem;
        }
      }
      color: #000;
    }
    .ant-table-tbody {
      /* background: rgba(255, 255, 255, .1); */
      /* border: 0.01rem solid rgba(255, 255, 255, .2); */
      border-radius: 0.1rem;
      display: grid;
      .ant-table-row{
        :hover{
          box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16);
        }
      }
      &>tr td:first-child {
        width: 0.8rem;
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
        /* border-left: 0.01rem solid rgba(255,255,255,.2); */
      }
      &>tr td:nth-child(2) {
        width: 4.4rem;
      }
      &>tr td:last-child {
        border-right: 0.01rem solid rgba(255,255,255,.2);
        border-top-right-radius: 0.1rem;
        border-bottom-right-radius: 0.1rem;
      }
      /* tr:last-child td {
        border-bottom: none;
      } */
      &>tr {
        border-bottom: none;
        margin-bottom: 0.05rem;
        border-radius: 0.1rem;
        &:hover {
          td {
            /* background: rgba(255, 255, 255, .1); */
            /* box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.16); */
          }
        }
        &>td {
          color: #fff;
          border-bottom: 0;
          transition: all 0s;
          /* border-top: 0.01rem solid rgba(255,255,255,.2); */
          height: 0.8rem;
          padding: 0.1rem 0.16rem;
          /* width: 2.716rem; */
          width: 2.2rem;
        }
        &>.ant-table-cell {
          background: #fff;
          .descend {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            &>div:nth-child(1) {
              align-self: start;
              margin-right: 0.1rem;
            }
            &>div:nth-child(2) {
              display: flex;
              flex-direction: column;
              font-size: 0.12rem;
              &>span {
                font-size: 0.12rem;
              }
            }
          }
        }
      }
      .ant-table-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        &>.ant-table-cell {
          flex: 1;
          min-height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.1rem !important;
      }
    }
      .ant-empty-description {
        color: #fff;
      }
    }
  }
  }
  .ant-table-reset-white {
    .ant-table {
    background: transparent;
    line-height: normal;
    table {
      display: flex;
      flex-direction: column;
      colgroup, thead, tbody {
        display: inline-block;
      }
    }
    .ant-table-column-sorter-up.active, .ant-table-column-sorter-down.active {
      color: red;
    }
    .ant-table-thead {
      margin-bottom: 0.05rem;
      background: #fff;
      border: 0.01rem solid rgba(0, 0, 0, .2);
      border-radius: 0.1rem;
      tr:first-child th:first-child {
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
      }
      &>tr {
        .ant-table-column-has-sorters:hover {
          background: #fff;
        }
        th {
          color: #000;
          border-bottom: none;
          background-color: #fff;
          height: 0.68rem;
          width: 2.666rem;
          padding: 0.16rem;
          &::before {
            height: 0 !important;
          }
        }
        th:last-child {
          border-bottom-right-radius: 0.1rem;
          border-top-right-radius: 0.1rem;
        }
      }
      color: #fff;
    }
    .ant-table-tbody {
      display: grid;
      border-radius: 0.1rem;
      &>tr td:first-child {
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
        border-left: 0.01rem solid rgba(0,0,0,.2);
      }
      &>tr td:last-child {
        border-top-right-radius: 0.1rem;
        border-bottom-right-radius: 0.1rem;
        border-right: 0.01rem solid rgba(0,0,0,.2);
      }
      &>tr {
        border-bottom: 0.05rem solid #fff;
        &:hover {
          td {
            background: rgba(0, 0, 0, .1);
          }
        }
        .ant-table-column-sort {
          background: transparent;
        }
        &>td {
          color: #fff;
          border-bottom: 0.01rem solid rgba(0,0,0,.2);
          border-top: 0.01rem solid rgba(0,0,0,.2);
          height: 1rem;
          width: 2.666rem;
        }
        &>.ant-table-cell {
          background: #fff;
          color: #000;
          .descend {
            display: flex;
            justify-content: center;
            align-items: center;
            &>div:nth-child(1) {
              align-self: start;
              margin-right: 0.1rem;
            }
            &>div:nth-child(2) {
              display: flex;
              flex-direction: column;
              font-size: 0.12rem;
              &>span {
                font-size: 0.12rem;
              }
            }
          }
        }
      }
      .ant-table-placeholder {
        display: flex;
        justify-content: center;
        align-items: center;
        &>.ant-table-cell {
          flex: 1;
          min-height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.1rem !important;
      }
    }
      .ant-empty-description {
        color: #fff;
      }
    }
  }
  }
  .ant-table-reset-typeTwo {
    .ant-table {
    background: transparent;

    .ant-table-thead {
      background: #000000;
      border-radius: 0.1rem;
      tr {
        .ant-table-column-has-sorters:hover {
          background: #000;
        }
        th {
          color: #fff;
          border-top: 0.01rem solid rgba(255, 255, 255, .2);
          border-bottom: none;
          background-color: #000;
          padding: 0.16rem;
          height: 0.76rem;
        }
        th:first-child {
          border-top-left-radius: 0.1rem;
          border-left: 0.01rem solid rgba(255, 255, 255, .2);
        }
        th:last-child {
          border-top-right-radius: 0.1rem;
          border-right: 0.01rem solid rgba(255, 255, 255, .2);
        }
      }
      color: #fff;
    }
    .ant-table-tbody {
      background: transparent;
      border: 0.01rem solid rgba(255, 255, 255, .2);
      border-radius: 0.1rem;
      tr:first-child td {
        border-top: 0.01rem solid rgba(255,255,255,.2);
        /* border-top-left-radius: 0.1rem; */
      }
      tr:first-child td:last-child {
        /* border-top-right-radius: 0.1rem; */
      }
      tr:last-child td:first-child {
        border-bottom-left-radius: 0.1rem;
      }
      tr:last-child td:last-child {
        border-bottom-right-radius: 0.1rem;
      }
      tr:last-child td {
        /* border-bottom: none; */
      }
      tr>td:first-child {
        border-left: 0.01rem solid rgba(255,255,255,.2);
      }
      tr>td:last-child {
        border-right: 0.01rem solid rgba(255,255,255,.2);
      }
      tr {
        &:hover {
          td {
            background: transparent;
          }
        }
        .ant-table-column-sort {
          background: transparent;
        }
        td {
          color: #fff;
          border-bottom: 0.01rem solid rgba(255,255,255,.2);
          padding: 0.16rem;
          height: 0.8rem;
        }
        .ant-table-cell {
          .descend {
            display: flex;
            justify-content: center;
            align-items: center;
            &>div:nth-child(1) {
              align-self: start;
              margin-right: 0.1rem;
            }
            &>div:nth-child(2) {
              display: flex;
              flex-direction: column;
              font-size: 0.12rem;
              &>span {
                font-size: 0.12rem;
              }
            }
          }
        }
        .ant-table-cell-row-hover {
          /* background: transparent !important; */
        }
      }
      .ant-table-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      &>.ant-table-cell {
        min-height: 1.5rem;
        display: flex;
        align-items: center;
      }
    }
      .ant-empty-description {
        color: #fff;
      }
    }
  }
  }
  .ant-popover-collectionPopver {
    padding-top: 0.1rem;
    .ant-popover-arrow {
      display: none;
    }
    .ant-popover-inner {
      transition: all 0s;
      background-color: #333;
      /* backdrop-filter: blur(0.3rem); */
      border-radius: 0.2rem;
      .ant-popover-inner-content {
        padding: 0.05rem 0.1rem;
        font-size: 0.14rem;
        color: #fff;
        font-weight: 500;
      }
    }
  }
  .ant-popover-reset {
    .ant-popover-arrow {
    }
    .ant-popover-inner {
      border-radius: 0.2rem;
      .ant-popover-inner-content {
        padding: 0.2rem 0.3rem 0.3rem;
      }
    }
  }
  .ant-popover-reset20 {
    .ant-popover-arrow {
    }
    .ant-popover-inner {
      border-radius: 0.2rem;
      .ant-popover-inner-content {
        padding: 0.2rem;
      }
    }
  }

  /*  */
  .dropdown_box{
    top: 55px !important;
    .ant-dropdown-menu{
        background: #534852;
        border-radius: 0.1rem;
        padding: 0.1rem;
    }
  }
  .ant-dropdown-menu-item{
    background-color: #534852 !important;
    transition:none;
    padding:8px 12px;
  }
  .ant-dropdownmenu-item-active{
    background-color: #534852;
  }
  .ant-dropdown-menu-item:hover{
            background-color: #534852;
        }
`;
