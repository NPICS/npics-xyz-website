import React, { useState, useEffect, useRef } from "react";
import defaultAvatar from "assets/images/home/defaultAvatar.svg";
import login from "assets/images/home/login.svg";
import { imgurl } from "utils/globalimport";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { notification, Popover, message, Dropdown, Menu } from "antd";
import { useWeb3React } from "@web3-react/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchUser,
  fetchUser2,
  setIsShowConnect,
} from "store/app";
import { FlexDiv, Height, LogoLink, MoreItem, Nav, UserAvatar, WalletBox } from "./headerStyled";
import WalletBalance from "./WalletBalance";
import { deserialize } from "class-transformer";
import { User } from "../../model/user";
import { SessionStorageKey } from "../../utils/enums";
import { urls } from "../../utils/urls";
import { NavLink, To, useLocation } from "react-router-dom";
import { Flex, Icon, Typography, Box } from "component/Box";
import styled from "styled-components";
import { CHAIN_ID, injected } from "connectors/hooks";
import { useMenu } from "../../hooks/useMenu";
const StyledtWallet = styled(Flex)`
  cursor: pointer;
  box-sizing: border-box;
  background: #ffffff;
  border: 0.01rem solid rgba(0, 0, 0, 0.1);
  border-radius: 0.1rem;
  padding: 0.1rem 0 0.1rem 0.25rem;
  min-width: 2.6rem;
  min-height: 0.6rem;
  &:hover {
    background: #ffffff;
    box-shadow: 0rem 0rem 0.2rem rgba(0, 0, 0, 0.1);
    border: 0.01rem solid #fff;
  }
`;

const StyledHoverA = styled.a`
  &:hover {
    color: #fff !important;
  }
`;
const StyledHoverSpan = styled.span`
  &:hover {
    color: #fff;
  }
`;

function XHeader() {
  const history = useLocation();
  const isFixed = useAppSelector((state) => state.app.isFixed);
  const { account, connector } = useWeb3React();
  const oldAccount = useRef<string | undefined | null>();
  const [accountPop, setAccountPop] = useState<boolean>(false);
  const action = useAppDispatch();
  const userInfo = useAppSelector((state) =>
    deserialize(User, state.app.currentUser)
  );
  const showConnect = useAppSelector((state) => state.app.data.isShowConnect);
  const terms = [
    {
      darkIcon: imgurl.footer.darkT,
      lightIcon: imgurl.footer.lightT,
      link: urls.twitter,
      name: "Twitter",
    },
    {
      darkIcon: imgurl.footer.darkG,
      lightIcon: imgurl.footer.lightG,
      link: urls.discord,
      name: "Game",
    },
  ];
  const connect = async () => {
    try {
      await injected.activate(CHAIN_ID);
      action(fetchUser2());
    } catch (e: any) {
      notification.error({ message: e.message });
    } finally {
      action(setIsShowConnect(false));
    }
  };

  const walletPop = () => {
    if (account) {
      setAccountPop(true);
    } else {
      action(setIsShowConnect(true));
    }
  };

  const onQuit = () => {
    setAccountPop(false);
    localStorage.removeItem(SessionStorageKey.WalletAuthorized);
    // connector.deActivate()
    console.log(injected);
    injected.resetState();
    // deactivate.destroy()
    // console.log();
    console.log(account);
    action(fetchUser(`{}`));
    console.log("quit");
  };

  const onCopy = () => {
    if (!account) return;
    const text = `${account}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      var textarea = document.createElement("textarea");
      document.body.appendChild(textarea);
      textarea.style.position = "fixed";
      textarea.style.clip = "rect(0 0 0 0)";
      textarea.style.top = "0.1rem";
      textarea.value = text;
      textarea.select();
      document.execCommand("copy", true);
      document.body.removeChild(textarea);
    }
    message.success("Copy successfully", 0.5);
  };

  const AccountHTML = () => {
    return (
      <div className="account-content">
        <div>
          <div>Connected Wallet</div>
          <div onClick={onQuit}>Change Provider</div>
        </div>
        <div className="account-address">
          <img className="address-icon" src={imgurl.address} alt="" />
          <div className="address-text">
            <span>
              {account && account.replace(account.substring(11, 30), "...")}
            </span>
            <div className="connected">Connected with MetaMask</div>
          </div>
          <img
            className="copy-icon"
            src={imgurl.copy}
            alt=""
            onClick={onCopy}
          />
        </div>
        <div className="account-wallet">
          <div className="wallet-title">Wallet Balance</div>
          <WalletBalance></WalletBalance>
        </div>
      </div>
    );
  };
  const AccountTitle = () => {
    return (
      <div className="account-title">
        <span>Account</span>
        <span style={{ cursor: "pointer" }}>
          {/* <img src={imgurl.home.gearIcon} alt="" /> */}
        </span>
      </div>
    );
  };
  const ConnectWallet = () => {
    return (
      <StyledtWallet onClick={connect} alignItems="center">
        <Typography marginRight="0.2rem">
          <Icon
            width="0.4rem"
            height="0.4rem"
            src={imgurl.metamaskLogo}
            alt=""
          />
        </Typography>
        <Typography fontSize="0.16rem" fontWeight="700" color="#000">
          MetaMask
        </Typography>
      </StyledtWallet>
    );
  };

  document.addEventListener("click", (event) => {
    if (!accountPop) return;
    var cDom = document.getElementById("baseAccount") || document.body;
    var tDom: any = event.target;
    if (cDom === tDom || cDom.contains(tDom)) {
    } else {
      setAccountPop(false);
    }
  });
  document.addEventListener("click", (event) => {
    if (!showConnect) return;
    var cDom = document.getElementById("baseAccount") || document.body;
    var tDom: any = event.target;
    if (cDom === tDom || cDom.contains(tDom)) {
    } else {
      action(setIsShowConnect(false));
    }
  });

  let normal = {
    color: "rgba(255,255,255,.5)",
    fontWeight: "700",
    fontSize: "0.16rem",
    textDecoration: "none",
    marginRight: "1.3rem",
  };
  let active = {
    color: "#fff",
    fontWeight: "700",
    fontSize: "0.16rem",
    textDecoration: "none",
    marginRight: "1.3rem",
  };
  const { menuList, moreList, pageType, logoUrl } = useMenu();
  const MoreMenu = (
    <Menu className="more_menu_box" items={moreList}>
    </Menu>
  );
  useEffect(() => {
    console.log(menuList);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [history.pathname]);

  const formateAccount = (account: string) => {
    if (account) {
      return `${account.slice(0, 6)}...${account.slice(-4)}`
    }
    return ""
  }
  return (
    <>
      <Nav fixed={isFixed}>
        <FlexDiv>
          {/* logo */}
          <LogoLink to={"/"}>
            <img src={logoUrl} alt="" />
          </LogoLink>
          {/* menu */}
          {
            menuList.map((item) => {
              return (
                <NavLink
                  className="nav_item"
                  key={item.id}
                  to={item.path}
                  style={({ isActive }) => (isActive ? active : normal)}
                >
                  <StyledHoverSpan>
                    {item.label}
                  </StyledHoverSpan>
                </NavLink>
              )
            })
          }
          {/* moew menu */}
          <StyledHoverA
            style={{
              fontSize: "0.16rem",
              fontWeight: "600",
              color: "rgba(255,255,255,.5)",
            }}
            target="_blank"
            rel="noreferrer"
          >
            <Dropdown
              overlay={MoreMenu}
              placement="bottom"
              overlayClassName="dropdown_box">
              <span>{pageType === "home" ? 'Community' : 'More'}</span>
            </Dropdown>
          </StyledHoverA>
        </FlexDiv>
        <FlexDiv>
          <Flex>
            <WalletBox>
              <div className="wallet_eth_icon">
                <img src={imgurl.ETHIcon} alt="" />
              </div>
              <div className="wallet_connect" onClick={walletPop} id="baseAccount">
                {account ? (
                  <Flex
                    justifyContent="space-around"
                    alignItems="center">
                    <span style={{ color: '#fff' }}>{formateAccount(account)}</span>
                    <UserAvatar>
                      <Icon radius="9999px" src={defaultAvatar} />
                    </UserAvatar>
                  </Flex>
                ) : (
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    style={{
                      color: '#fff',
                      fontSize: '0.14rem'
                    }}
                  >
                    Connect Wallet
                  </Flex>
                )}
              </div>
            </WalletBox>
          </Flex>
          {/* <Flex
            alignItems="center"
            justifyContent="center"
            background={`${showConnect ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.2)"
              }`}
            borderRadius="9999px"
            width="0.35rem"
            height="0.35rem"
            id="baseAccount"
            style={{ cursor: "pointer" }}
            onClick={walletPop}
          >
            {account ? (
              <UserAvatar>
                <Icon radius="9999px" src={defaultAvatar} />
              </UserAvatar>
            ) : (
              <Flex
                alignItems="center"
                justifyContent="center"
                width="0.34rem"
                height="0.34rem"
                borderRadius="0.1rem"
              >
                <Icon width="0.14rem" height="0.16rem" src={login} />
              </Flex>
            )}
          </Flex> */}
          {/* wallet info */}
          <Popover
            content={AccountHTML}
            title={AccountTitle}
            trigger="click"
            visible={accountPop}
            getPopupContainer={(triggerNode: any) =>
              document.getElementById("baseAccount") || document.body
            }
            placement={"bottomRight"}
            overlayClassName="accountPopover"
          ></Popover>
          {/* Connect a wallet */}
          <Popover
            content={ConnectWallet}
            title={
              <Typography fontSize="0.16rem" fontWeight="700" color="#000">
                Connect a wallet
              </Typography>
            }
            trigger="click"
            visible={showConnect}
            getPopupContainer={(triggerNode: any) =>
              document.getElementById("baseAccount") || document.body
            }
            placement={"bottomRight"}
            overlayClassName="walletPopover"
          ></Popover>
        </FlexDiv>
        {/* <Modal
        footer={false}
        title='Connect a wallet'
        onCancel={() => action(setIsShowConnect(false))}
        visible={showConnect}
        className="ant-modal-reset"
      >
        <div onClick={connect}><img src={imgurl.metamaskLogo} alt=""></img>MetaMask</div>
      </Modal> */}
        {/* </Flex> */}
      </Nav>
      <Height></Height>
    </>
  );
}

export default XHeader;
