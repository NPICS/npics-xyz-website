import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {imgurl} from 'utils/globalimport';
import {urls} from "../../utils/urls";
import { Icon } from 'component/Box';
import { useLocation } from 'react-router-dom';


const FooterWrap = styled.div`
  padding: .5rem 2.83rem .6rem 2.6rem;
  border-top: .02rem solid rgba(255, 255, 255, .1);
  background: ${(props) => props.theme.footerBg};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .footer-left {
    display: flex;
    flex-direction: column;
    font-size: .14rem;
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 500;
    color: ${(props) => props.theme.textColor};
    a{
      text-align: left;
    }
    span {
      padding-top: .1rem;
    }
  }

  .footer-right {
    display: flex;
    flex-direction: column;
    font-size: .14rem;
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 500;
    color: ${(props) => props.theme.textColor};
    & > div {
      display: flex;
      gap: 0.25rem;
      justify-content: end;
    }
  }
  .resources {
    display: flex;
    gap: 16px;
    margin-top: .35rem;
    a {
      color: ${(props) => props.theme.textColor};
    }
  }
`

function Footer() {
  const history = useLocation()
  const [isHome, setIsHome] = useState<boolean>(true)
  useEffect(() => {
    if (history.pathname === '/') {
      setIsHome(true)
    } else {
      setIsHome(false)
    }
    // eslint-disable-next-line
  }, [history.pathname])


  const terms = [
    {
      darkIcon: imgurl.footer.darkT,
      lightIcon: imgurl.footer.lightT,
      link: urls.twitter, 
      name: "Twitter"
    },
    {
      darkIcon: imgurl.footer.darkG,
      lightIcon: imgurl.footer.lightG,
      link: urls.discord, 
      name: "Game"
    },
    {
      darkIcon: imgurl.footer.darkM,
      lightIcon: imgurl.footer.lightM,
      link: urls.medium,
      name: "Medium"
    },
    {
      darkIcon: imgurl.footer.darkTG,
      lightIcon: imgurl.footer.lightTG,
      link: urls.telegram,
      name: "Telegram"
    },
    {
      darkIcon: imgurl.footer.darkGH,
      lightIcon: imgurl.footer.lightGH,
      link: urls.github,
      name: "GitHub"
    }
  ]

  return (
    <FooterWrap>
      <div className='footer-left'>
        <a href="/">
          <Icon width='1.4rem' height='.5rem' src={ isHome ? imgurl.logo : imgurl.lightLogo} />
        </a>
        <span>Copyright © 2022 Npics Foundation Singapore LTD. rights reserved</span>
      </div>
      <div className='footer-right'>
        <div>
          {
            terms.map((item) => {
              return <a key={item.name} href={item.link} target="_blank" rel="noreferrer">
                <Icon width='.22rem' height='.22rem' src={isHome ? item.darkIcon : item.lightIcon} />
              </a>
            })
          }
        </div>
        <div className="resources">
          <a href={urls.contactUs}  target="_blank" rel="noreferrer">Contact Us</a>
          <a href={urls.Resources} target="_blank" rel="noreferrer">Resources</a>
          <a href="/" target="_blank" rel="noreferrer">Audit Report</a>
          <a href={urls.termsOfService} target="_blank" rel="noreferrer">Terms of service</a>
        </div>
      </div>
    </FooterWrap>
  );
}

export default Footer;