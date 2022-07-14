import { createGlobalStyle } from 'styled-components'

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
    min-width: 1680px;
    font-family: 'Poppins';
    line-height: normal;
    font-size: 14px;
  }

  .ant-selectDropDown-reset {
    background-color: #1a1a1a;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, .5);
    border-radius: 10px;
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
    font-size: 14px;
    background-color: #fff;
    color: rgba(0, 0, 0, .5);
    border: 1px solid rgba(0, 0, 0, .2);
    transition: all 0s;
    border-radius: 10px;
    text-align: center;
    padding: 5px 0;
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
      font-size: 14px;
      padding: 10px 20px;
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
      border: 1px solid rgba(0,0,0,.2) !important;
      box-shadow:none !important;
    }  
    &:focus {
      border: 1px solid rgba(0,0,0,.2) !important;
      box-shadow:none !important;
    }  
    /* background: #1a1a1a; */
    border: 1px solid rgba(0,0,0,.2);
    border-radius: 10px;
    color: rgba(0, 0, 0, .5);
    font-size: 12px;
    font-weight: 500;
    transition: all 0s;
  }
  .ant-modal-reset {
    .ant-modal-content {
      .ant-modal-close {
        .ant-modal-close-x {
          height: 100%;
          line-height: 73px;
          font-size: 16px;
        }
      }
      .ant-modal-header {
        border-bottom: 0;
      }
      .ant-modal-body {
        &>div {
          display: flex;
          font-size: 24px;
          color: #353945;
          font-weight: 700;
          border-radius: 10px;
          padding: 5px;
          cursor: pointer;
          img {
            width: 40px;
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
      margin-bottom: 5px;
      background: #000000;
      /* border: 1px solid rgba(255, 255, 255, .2); */
      border-radius: 10px;
      tr:first-child th:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      .ant-table-column-sorters {
        justify-content: left;
        .ant-table-column-title {
          flex: none;
        }
        .ant-table-column-sorter {
          margin-left: 10px;
        }
      }
      .ant-table-column-sort {
        background: transparent;
      }
      &>tr {
        .ant-table-column-has-sorters:hover {
          background: #000;
        }
        th:first-child {
          width: 80px;
        }
        th:nth-child(2) {
          width: 440px;
        }
        th {
          color: #fff;
          border-bottom: none;
          background-color: #000;
          height: 68px;
          width: 271.6px;
          padding: 22px 16px;
          transition: all 0s;
        }
        th:last-child {
          border-bottom-right-radius: 10px;
          border-top-right-radius: 10px;
        }
      }
      color: #fff;
    }
    .ant-table-tbody {
      /* background: rgba(255, 255, 255, .1); */
      /* border: 1px solid rgba(255, 255, 255, .2); */
      border-radius: 10px;
      display: grid;
      &>tr td:first-child {
        width: 80px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        /* border-left: 1px solid rgba(255,255,255,.2); */
      }
      &>tr td:nth-child(2) {
        width: 440px;
      }
      &>tr td:last-child {
        /* border-right: 1px solid rgba(255,255,255,.2); */
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      /* tr:last-child td {
        border-bottom: none;
      } */
      &>tr {
        border-bottom: 5px solid #1a1a1a;
        &:hover {
          td {
            background: rgba(255, 255, 255, .1);
          }
        }
        &>td {
          color: #fff;
          border-bottom: 0;
          transition: all 0s;
          /* border-top: 1px solid rgba(255,255,255,.2); */
          height: 80px;
          padding: 10px 16px;
          width: 271.6px;
        }
        &>.ant-table-cell {
          background: rgba(255, 255, 255, .03);
          .descend {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            &>div:nth-child(1) {
              align-self: start;
              margin-right: 10px;
            }
            &>div:nth-child(2) {
              display: flex;
              flex-direction: column;
              font-size: 16px;
              &>span {
                font-size: 12px;
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
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px !important;
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
      margin-bottom: 5px;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, .2);
      border-radius: 10px;
      tr:first-child th:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      &>tr {
        .ant-table-column-has-sorters:hover {
          background: #fff;
        }
        th {
          color: #000;
          border-bottom: none;
          background-color: #fff;
          height: 68px;
          width: 266.6px;
          padding: 16px;
          &::before {
            height: 0 !important;
          }
        }
        th:last-child {
          border-bottom-right-radius: 10px;
          border-top-right-radius: 10px;
        }
      }
      color: #fff;
    }
    .ant-table-tbody {
      display: grid;
      border-radius: 10px;
      &>tr td:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-left: 1px solid rgba(0,0,0,.2);
      }
      &>tr td:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-right: 1px solid rgba(0,0,0,.2);
      }
      &>tr {
        border-bottom: 5px solid #fff;
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
          border-bottom: 1px solid rgba(0,0,0,.2);
          border-top: 1px solid rgba(0,0,0,.2);
          height: 100px;
          width: 266.6px;
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
              margin-right: 10px;
            }
            &>div:nth-child(2) {
              display: flex;
              flex-direction: column;
              font-size: 16px;
              &>span {
                font-size: 12px;
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
          min-height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px !important;
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
      border-radius: 10px;
      tr {
        .ant-table-column-has-sorters:hover {
          background: #000;
        }
        th {
          color: #fff;
          border-top: 1px solid rgba(255, 255, 255, .2);
          border-bottom: none;
          background-color: #000;
          padding: 16px;
          height: 76px;
        }
        th:first-child {
          border-top-left-radius: 10px;
          border-left: 1px solid rgba(255, 255, 255, .2);
        }
        th:last-child {
          border-top-right-radius: 10px;
          border-right: 1px solid rgba(255, 255, 255, .2);
        }
      }
      color: #fff;
    }
    .ant-table-tbody {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, .2);
      border-radius: 10px;
      tr:first-child td {
        border-top: 1px solid rgba(255,255,255,.2);
        /* border-top-left-radius: 10px; */
      }
      tr:first-child td:last-child {
        /* border-top-right-radius: 10px; */
      }
      tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
      }
      tr:last-child td:last-child {
        border-bottom-right-radius: 10px;
      }
      tr:last-child td {
        /* border-bottom: none; */
      }
      tr>td:first-child {
        border-left: 1px solid rgba(255,255,255,.2);
      }
      tr>td:last-child {
        border-right: 1px solid rgba(255,255,255,.2);
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
          border-bottom: 1px solid rgba(255,255,255,.2);
          padding: 16px;
          height: 80px;
        }
        .ant-table-cell {
          .descend {
            display: flex;
            justify-content: center;
            align-items: center;
            &>div:nth-child(1) {
              align-self: start;
              margin-right: 10px;
            }
            &>div:nth-child(2) {
              display: flex;
              flex-direction: column;
              font-size: 16px;
              &>span {
                font-size: 12px;
              }
            }
          }
        }
        .ant-table-cell-row-hover {
          background: transparent !important;
        }
      }
      .ant-table-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      &>.ant-table-cell {
        min-height: 150px;
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
    padding-top: 10px;
    .ant-popover-arrow {
      display: none;
    }
    .ant-popover-inner {
      transition: all 0s;
      background-color: #333;
      /* backdrop-filter: blur(30px); */
      border-radius: 20px;
      .ant-popover-inner-content {
        padding: 5px 10px;
        font-size: 14px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
  .ant-popover-reset {
    .ant-popover-arrow {
    }
    .ant-popover-inner {
      border-radius: 20px;
      .ant-popover-inner-content {
        padding: 20px 30px 30px;
      }
    }
  }
  .ant-popover-reset20 {
    .ant-popover-arrow {
    }
    .ant-popover-inner {
      border-radius: 20px;
      .ant-popover-inner-content {
        padding: 20px;
      }
    }
  }


`
