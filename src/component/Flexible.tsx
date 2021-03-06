import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { UnmountClosed  } from 'react-collapse'
import { flex } from './styled'
import { imgurl } from '../utils/globalimport'
interface FlexProps {
  children: ReactNode,
  isShow: Boolean,
  title: string,
  iconUrl: string,
  isExpand: Boolean,
  height: string,
  border: string,
  background?: string,
  headerBackground?: string,
  fontSize: string
}
const Flex = styled.div`
 ${flex}
 img {
   margin-right: .16rem;
 }
`
const StyledFlex = styled.div<FlexProps>`
  border-radius: .1rem;
  color: ${(props => props.color)};
  border: ${(props => props.border)};
  background-color: ${(props => props.background)};
  .header {
    height: ${(props => props.height)};
    background-color: ${(props => props.headerBackground)};
    font-size: ${(props => props.fontSize)};
    padding: .16rem .20rem .15rem;
    border-radius: .1rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    color: #fff;
    ${flex}
    border-bottom: ${(props =>( props.isShow ? props.border : 0))};
    justify-content: space-between;
    .up {
      transform: rotate(90deg);
      transition: all 500ms;
    }
    .down {
      transform: rotate(270deg);
      transition: all 500ms;
    }
  }
  .ReactCollapse--collapse {
    transition: height 500ms;
  }
`

function Flexible(props:FlexProps) {
  const [isShow, setIsShow] = useState<Boolean>(true)
  const handleFlex = () => {
    setIsShow(!isShow)
  }
  return (
    <StyledFlex {...props} >
      <div className="header">
          <Flex>
            <img src={props.iconUrl} alt=""></img>
            <span>{props.title}</span>
          </Flex>
          {props.isExpand ? <div className={`${isShow ? 'up' : 'down'} `} onClick={handleFlex}>&gt;</div> : null }
      </div>
      <UnmountClosed  isOpened={isShow ? true : false}>
        <div>
            {props.children}
        </div>
      </UnmountClosed>
    </StyledFlex>
  )
}
Flexible.defaultProps = {
  isShow: true,
  title: '',
  iconUrl: imgurl.Vector,
  isExpand: false,
  height: '.51rem',
  border: '.01rem solid rgba(255,255,255,.2)',
  background: '',
  headerBackground: '',
  fontSize: '.16rem'
}

export default Flexible
