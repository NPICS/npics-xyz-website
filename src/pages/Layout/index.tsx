import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import XHeader from './Header';
import Content from './Content'
import Footer from './Footer'
import Loading from 'component/Loading';
import { useAppSelector } from '../../store/hooks';
import { useLocation } from 'react-router-dom';

const Nav = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2;
`
const FooterBox = styled.div`
  height: 2.26rem;
  text-align: center;
  /* background-color: #1A1A1A; */
  `
const ContentBox = styled.div`
  color: #000;
  /* min-height: 8rem; */
  background-color: #F1F1F1;
  flex: 1;
`
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

function Index() {
  const isShowLoading = useAppSelector(state => state.app.data.isShowLoading)

  return (
    <div>
      {isShowLoading ? <Loading></Loading> : null}
      <Flex>
        <Nav>
          <XHeader></XHeader>
        </Nav>
        <ContentBox>
          <Content></Content>
        </ContentBox>
        <FooterBox>
          <Footer></Footer>
        </FooterBox>
      </Flex>
    </div>
  );
}

export default Index;