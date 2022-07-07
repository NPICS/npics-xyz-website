import React, { useState } from 'react'
import styled from 'styled-components'
import { font1465,font2051, font1661, font1455, font1861, flex, font1461, font3081 } from 'component/styled'
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { imgurl } from 'utils/globalimport'
import { Link } from 'react-router-dom'

const ContractAuthorization = styled.div`
  display: grid;
  grid-template-rows: repeat(3);
  padding: .24rem .5rem .26rem .5rem;
  grid-gap: .2rem;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 10px;
  margin-bottom: .3rem;
  .theme {
    ${font2051}
  }
  .describe {
    ${font1465}
  }
  .contract-btn {
    ${font1661}
    padding: .15rem .38rem;
    background: linear-gradient(284.2deg, #FF0000 0%, #FEB240 101.06%);
    border-radius: 10px;
    width: fit-content;
    cursor: pointer;
  }
`
const Project = styled.div`
  .project-title {
    display: flex;
    flex-direction: column;
    margin-bottom: .3rem;
    .line-header {
      ${font2051}
    }
    .project-active {
      ${font1455}
    }
  }
  .project-table {
    .project {
      ${flex}
      img {
        width: .44rem;
        height: .44rem;
        margin-right: .18rem;
      }
      span {
        ${font1861}
      }
    }
    .contract-address {
      ${flex}
      img {
        width: .16rem;
        height: .16rem;
      }
      span {
        margin-right: .1rem;
        ${font1455}
      }
    }
    .actions-btn {
      ${font1461}
      background: #000000;
      border: 1px solid rgba(255, 255, 255, .2);
      border-radius: 10px;
      padding: .14rem 0;
      cursor: pointer;
      min-width: 1.5rem;
    }
    .disabled {
      cursor: not-allowed;
      border: 1px solid rgba(255, 255, 255, .5);
      ${font1465}
    }
  }
`
const MyAidrop = styled.div`
  ${font3081}
  margin-bottom: .2rem;
`


interface DataSource {
  key: string,
  project: string,
  name: string,
  imgUrl: string,
  address: string,
}

function MyAirdrop () {
  const [isContract, setIsContract] = useState<boolean>(false)
  // const [claimDetail, setClaimDetail] = useState<DataSource>()
  const columns:ColumnsType<DataSource> = [
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      align: 'center',
      render: (text,rows) => <div className='project'>
        <img src={rows.imgUrl} alt="" />
        <span>{rows.name}</span>
      </div>
    },
    {
      title: 'Contract Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      render: (text,rows) => <div className='contract-address'>
        <span>{text}</span>
        <img src={imgurl.market.exportIcon} alt="" />
      </div>
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'center',
      render: (text, row) => <Link to={'/dashboard/airdrop/claim'} state={{claimDetail:row}}>
        <button 
          className={`actions-btn ${isContract ? '' : 'disabled'}`}
          disabled={!isContract} 
          onClick={() => onClaim(row)}
        >
          Claim
        </button>
      </Link>
    },
  ]

  const dataSource:DataSource[] = [
    {
      key: '1',
      project: 'a',
      name: 'Ape Coin',
      imgUrl: imgurl.dashboard.airdropIcon,
      address: "0x4d224452801aced8b2f0aebe155379bb5d594381",
    },
    {
      key: '2',
      project: 'a',
      name: 'Ape Coin',
      imgUrl: imgurl.dashboard.airdropIcon,
      address: "0x4d224452801aced8b2f0aebe155379bb5d594381",
    },
  ]

  const onClaim = (val: React.SetStateAction<DataSource | undefined>) => {
    // setClaimDetail(val)
  }

  const onContract = () => {
    setIsContract(!isContract)
  }

  return <>
    <MyAidrop>
      My Airdrop
    </MyAidrop>
    <ContractAuthorization>
      <span className='theme'>NPics Flash Contract Authorization</span>
      <span className='describe'>To use NPics Flash claims, you need to first authorize our receiver contract. There is a small cost to authorize contract use, but it is only required once.</span>
      <div className='contract-btn' onClick={onContract}>Contract Authorization</div>
    </ContractAuthorization>

    <Project>
      <div className='project-title'>
        <span className='line-header'>Airdrop Project</span>
        <span className='project-active'>
          Current Active：
          <span>4</span>
        </span>
      </div>

      <div className='project-table'>
        <Table 
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          className="ant-table-reset-typeTwo"
        />
      </div>
    </Project>
  </>
}

export default MyAirdrop