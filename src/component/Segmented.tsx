import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
export declare type SegmentedValue = string | number;

interface Iprops {
  options: string[] | number[]
  onChange: (value: SegmentedValue) => void;
}
const Groups = styled.div`
  display: flex;
  &>div:nth-child(1) {
    margin-left: 0;
  }
  &>div {
    color: rgba(255,255,255,.5);
    margin: 10px;
    cursor: pointer;
  }
  .active {
    color: #fff;
  }
`

export default function Segmented(props:Iprops) {
  const {options,onChange} = props
  const [data, setData] = useState(options[0])

  useEffect(() => {
    onChange(data)
  // eslint-disable-next-line
  },[data])

  const onClick = (item: string | number) => {
    setData(item)
  }
  return(<Groups>
    {
      options.map((item) => <div 
        className={`${data === item ? 'active' : ''}`}
        key={item} 
        onClick={() => onClick(item)}
      >{item}</div>)
    }
  </Groups>)
}