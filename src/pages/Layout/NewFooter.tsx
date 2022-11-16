import React, { useEffect, useState } from 'react'
import { imgurl } from 'utils/globalimport';
import { NewFooterBox, NewFooterLeft, NewFooterRight, NewFooterWarp } from './NewFooterStyle'
import { useLocation } from 'react-router-dom'
import { urls } from 'utils/urls';

const NewFooter = () => {
    const history = useLocation()
    const [isHome, setIsHome] = useState<boolean>(true);
    const meidaList = [
        {
            darkIcon: imgurl.footer.darkT,
            lightIcon: imgurl.footer.lightT,
            link: urls.twitter,
            name: 'Twitter'
        },
        {
            darkIcon: imgurl.footer.darkDiscord,
            lightIcon: imgurl.footer.lightDiscord,
            link: urls.discord,
            name: 'Game'
        },
        {
            darkIcon: imgurl.footer.darkM,
            lightIcon: imgurl.footer.lightM,
            link: urls.medium,
            name: 'Medium'
        },
        {
            darkIcon: imgurl.footer.darkGH,
            lightIcon: imgurl.footer.lightGH,
            link: urls.github,
            name: 'GitHub'
        },
        {
            darkIcon: imgurl.footer.darkYoutube,
            lightIcon: imgurl.footer.lightYoutube,
            link: urls.telegram,
            name: 'Youtube'
        },
        {
            darkIcon: imgurl.footer.darkTG,
            lightIcon: imgurl.footer.lightTG,
            link: urls.telegram,
            name: 'Telegram'
        },

    ]
    useEffect(
        () => {
            if (history.pathname === '/') {
                setIsHome(true)
            } else {
                setIsHome(false)
            }
            // eslint-disable-next-line
        },
        [history.pathname]
    )
    return (
        <NewFooterWarp isHome={isHome}>
            <NewFooterBox>
                <NewFooterLeft isHome={isHome}>
                    <div className='left_box'>
                        <h3 className='footer_left_title'>Get in Touch with us</h3>
                        <span className='footer_left_desc'>If you’d like to learn more about what we do or have a specific requirement you’d like to discuss, please get in touch with our community.</span>
                        <div className='footer_left_btns'>
                            <div className='left_btn'>
                                <img className='btn_icon' src={isHome ? imgurl.footer.darkEmail : imgurl.footer.lightEmail} alt="" />
                                <span>Business via E-mail</span>
                            </div>
                            <div className='left_btn'>
                                <img className='btn_icon' src={isHome ? imgurl.footer.darkDiscord : imgurl.footer.lightDiscord} alt="" />
                                <span>Ticket in Discord</span>
                            </div>
                        </div>
                    </div>
                    <span className='cpyt_info'>Copyright © 2022 Npics Foundation Singapore LTD. rights reserved</span>
                </NewFooterLeft>
                <NewFooterRight isHome={isHome}>
                    <div className='footer_link'>
                        <span>Contact Us</span>
                        <span>Resources</span>
                        <span>Terms of Service</span>
                    </div>
                    <div className='footer_media'>
                        {
                            meidaList.map((item) => {
                                return (
                                    <div className='media_item'>
                                        <img src={isHome ? item.darkIcon : item.lightIcon} alt="" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='audits_box'>
                        <span className='audits_title'>Security and Audits</span>
                        <img src={isHome ? imgurl.footer.darkCertik : imgurl.footer.lightCertik} alt="" />
                    </div>
                </NewFooterRight>
            </NewFooterBox>

        </NewFooterWarp>
    )
};
export default NewFooter;