import React, { useState,useEffect } from "react"
import { Box, Flex, Icon, Typography } from "component/Box";
import { imgurl } from "utils/globalimport";
import { Select } from "antd";
import styled from 'styled-components';
const {Option} = Select

const AntdSelect = styled(Select)`
  color: rgba(0,0,0,.5);
  font-weight: 500;
  font-size: .14rem;
`

export default function MyVaults() {
  const [sortedInfo, setSortedInfo] = useState<string>('')

  useEffect(() => {
    console.log("sortedInfo",sortedInfo);

  },[sortedInfo])

  const onSelect = (val: any) => {
    console.log(val);
    setSortedInfo(val)
  }

  return <Box
    padding={".6rem .6rem"}
  >
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex
        flexDirection={"column"}
      >
        <Typography>
          My Vaults
        </Typography>
        <Flex
          alignItems={"center"}
        >
          <Typography>Total Debt：</Typography>
          <Icon width=".18rem" height=".18rem" url={imgurl.dashboard.ethGrey18} />
          <Typography> 998.111</Typography>
          <Typography>($2,210)</Typography>
        </Flex>
      </Flex>

      <Typography>
        <AntdSelect
            onSelect={onSelect}
            defaultValue="All"
            dropdownClassName="ant-select-reset"
          >
          <Option value="All">All</Option>
          <Option value="Inforce">Inforce</Option>
          <Option value="In Risk">In Risk</Option>
          <Option value="Terminated">Terminated</Option>
        </AntdSelect>
      </Typography>

    </Flex>

    

  </Box>
}