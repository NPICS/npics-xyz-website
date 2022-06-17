import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  img {
    user-select: none !important;
    -webkit-user-drag: none !important;
    object-fit: cover;
  }

  body {
    min-width: 1280px;
  }

  .ant-selectDropDown-reset {
    background-color: #1a1a1a;
    color: #FFF;
    border: 1px solid rgba(255, 255, 255, .5);
    border-radius: .1rem;
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
  .ant-input-reset {    
    &:hover {
      border: 1px solid rgba(255,255,255,.5) !important;
      box-shadow:none !important;
    }  
    &:focus {
      border: 1px solid rgba(255,255,255,.5) !important;
      box-shadow:none !important;
    }  
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,.5);
    border-radius: 10px;
    color: #fff;
  }
  .ant-modal-reset {
    .ant-modal-content {
      .ant-modal-close {
        .ant-modal-close-x {
          height: 100%;
          line-height: 0.73rem;
          font-size: .16rem;
        }
      }
      .ant-modal-header {
        border-bottom: 0;
      }
      .ant-modal-body {
        &>div {
          display: flex;
          font-size: .24rem;
          color: #353945;
          font-weight: 700;
          border-radius: 10px;
          padding: 0.05rem;
          cursor: pointer;
          img {
            width: .4rem;
          }
          &:hover {
            background: rgba(0, 0, 0, 0.07);
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
      background: #000000;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      tr:first-child th:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }
      tr {
        .ant-table-column-has-sorters:hover {
          background: #000;
        }
        th {
          color: #fff;
          border-bottom: none;
          background-color: #000;
          height: 0.68rem;
          width: 2.666rem;
          padding: 0.16rem;
        }
        th:last-child {
          border-bottom-right-radius: 10px;
          border-top-right-radius: 10px;
        }
      }
      color: #fff;
    }
    .ant-table-tbody {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      tr:first-child td:first-child {
        border-top-left-radius: 10px;
      }
      tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
      }
      tr:last-child td {
        border-bottom: none;
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
          /* background: rgba(255, 255, 255, 0.1); */
          height: 1rem;
          width: 2.666rem;
        }
        td:last-child {
          border-bottom-right-radius: 10px;
          border-top-right-radius: 10px;
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
              font-size: .16rem;
              &>span {
                font-size: .12rem;
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
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: none;
          background-color: #000;
          padding: 0.16rem;
          height: .76rem;
        }
        th:first-child {
          border-top-left-radius: 10px;
          border-left: 1px solid rgba(255, 255, 255, 0.2);
        }
        th:last-child {
          border-top-right-radius: 10px;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }
      }
      color: #fff;
    }
    .ant-table-tbody {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      tr:first-child td {
        border-top: 0.01rem solid rgba(255,255,255,.2);
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
          border-bottom: 0.01rem solid rgba(255,255,255,.2);
          padding: 0.16rem;
          height: .8rem;
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
              font-size: .16rem;
              &>span {
                font-size: .12rem;
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
`
