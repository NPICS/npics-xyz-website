import React from 'react';
import styled from 'styled-components';
import {imgurl} from 'utils/globalimport';
import {urls} from "../../utils/urls";


const FooterWrap = styled.div`
  padding: .5rem 2.83rem .6rem 2.6rem;
  border-top: .02rem solid rgba(255, 255, 255, .1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .footer-left {
    display: flex;
    flex-direction: column;
    font-size: .16rem;
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 500;
    color: rgba(255, 255, 255, .6);

    img {
      height: .5rem;
      width: 1.4rem;
    }

    span {
      padding-top: 0.35rem;
    }
  }

  .footer-right {
    display: flex;
    flex-direction: column;
    font-size: .16rem;
    font-family: 'PingFang HK';
    font-style: normal;
    font-weight: 500;
    color: rgba(255, 255, 255, .6);

    & > div {
      text-align: right;

      img {
        margin-left: .19rem;
      }
    }

    //span {
    //  padding-top: 0.35rem;
    //}
  }
  
  .resources {
    display: flex;
    gap: 16px;
    margin-top: .35rem;
    a {
      color: rgba(255, 255, 255, .6);
    }
  }
`

function Footer() {

  const terms = [
    {
      icon: imgurl.footer.Group245,
      link: urls.medium,
      name: "Medium"
    },
    {
      icon: imgurl.footer.Group246,
      link: urls.telegram,
      name: "Telegram"
    },
    {
      icon: imgurl.footer.Group247,
      link: "/",
      name: ""
    },
    {
      icon: imgurl.footer.Group248,
      link: urls.twitter,
      name: "Twitter"
    }
  ]

  return (
    <FooterWrap>
      <div className='footer-left'>
        <a href="/"><img src={imgurl.logo} alt=""/></a>
        <span>© 2022 - 2025 Npics Networks, Inc</span>
      </div>
      <div className='footer-right'>
        <div>
          {
            terms.map((item) => {
              return <a key={item.name} href={item.link} target="_blank" rel="noreferrer"><img src={item.icon} alt={item.name}/></a>
            })
          }
        </div>
        {/*<span>Contact Us     Resources    Audit Report     Brand     Terms of service</span>*/}
        <div className="resources">
          <a href="/">Contact Us</a>
          <a href="/">Resources</a>
          <a href="/">Audit Report</a>
          <a href="/">Terms of service</a>
        </div>
      </div>
    </FooterWrap>
  );
}

export default Footer;