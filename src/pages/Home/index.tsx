import { Icon } from 'component/Box';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from "../../store/hooks"
import { imgurl } from 'utils/globalimport';
import Title from './components/Title';
import { HomeWarp, BackgroundBox, NoteBox, HomeBox, HomeLeft, HomeNFT, DownPaymentBox, ChipSwapBox, NFTHedgingBox } from './style'
import { Animate } from 'react-simple-animate'
import BoxTitle from './components/BoxTitle';
import Frame from './components/Frame';
import ChipSwapLeft from './components/ChipSwapLeft';
import ChipSwapRight from './components/ChipSwapRight';
import NewButton from '../../component/NewButton';
const Home = () => {
    const isAnimate = useAppSelector(state => state.app.isShowDetailAnimate)
    const [showNote, setShowNote] = useState<boolean>(false);
    const hedgingList = [
        "HODL and hedge your rare NFTs instead of selling them.",
        "Access to call/put options without actually trading NFTs.",
        "Execrise the right at your desired price with no expiration."
    ]
    useEffect(() => {
        //get sessionStorage
        const isShowNote: boolean = JSON.parse(sessionStorage.getItem("note") || 'true');
        setShowNote(isShowNote)
    }, [])
    // open note
    const openGitbook = () => {
        //click note
        window.open("https://medium.com/@npics.xyz/nbp-financing-router-now-supports-wings-nft-lending-pool-1fdf5314439b")
    }
    // close note
    const closeNote = (e: any) => {
        e.stopPropagation();
        setShowNote(false);
        sessionStorage.setItem("note", JSON.stringify(false))
    }
    return (
        <HomeWarp>
            <BackgroundBox>
                {/* left bg svg*/}
                <img className='background_left' src={imgurl.newHome.BgLeft} alt="" />
                {/* right bg svg*/}
                <img className='background_right' src={imgurl.newHome.BgRight} alt="" />
                <HomeBox>
                    {/* show note */}
                    <NoteBox hidden={!showNote}>
                        <div className='note_content' onClick={openGitbook}>
                            <div className='note_text'>
                                <Icon width={"0.2rem"} src={imgurl.home.NoteIcon} />
                                <span>NBP Financing Router now supports Wing’s NFT Lending Pool</span>
                            </div>
                            <div className='note_close' onClick={closeNote}>
                                <img className='note_close_icon' src={imgurl.CloseIcon} />
                            </div>
                        </div>
                    </NoteBox>
                    {/* left title */}
                    <div className='home_content'>
                        <HomeLeft>
                            <Title />
                        </HomeLeft>
                        <HomeNFT>
                            <Animate
                                play={true}
                                duration={0.5}
                                delay={1}
                                start={{ width: '58%', opacity: 0, transform: 'translateX(0.5rem)' }}
                                end={{ width: '58%', opacity: 1, transform: 'translateX(0)' }}
                            >
                                <img className="nfts_img" src={imgurl.newHome.NFTIcons} alt="" />

                            </Animate>
                        </HomeNFT>
                    </div>
                </HomeBox>
            </BackgroundBox>
            <DownPaymentBox>
                <BoxTitle title='DownPayment' desc='Pay as Low as 60%to own your favorite NFT' />
                <div className='downPayment_content'>
                    <Animate play={isAnimate} delay={0.3} start={{ transform: 'translateY(100px)', opacity: 0 }} end={{ transform: 'translateY(0px)', opacity: 1 }}>
                        <div className='detail_img_box'>
                            <img className='detail_img' src={imgurl.home.Deail} alt="" />
                        </div>
                    </Animate>
                    <Frame />
                </div>
            </DownPaymentBox>
            <ChipSwapBox>
                {/* background */}
                <div className='chipSwapBox_bg'>
                    <img src={imgurl.home.CollectionProduct} alt="" />
                </div>
                <BoxTitle title='ChipSwap' desc='Trade NFTs of any value even if you have only $1.' />
                <div className='chipSwap_content'>
                    <div className='chipSwap_swiper_box'>
                        <ChipSwapLeft />
                        <ChipSwapRight />
                    </div>
                    {/* btn */}
                    <div className='chipSwap_btn'>
                        <NewButton text='Overview' bg="#FF490F" color="#fff" radius='0.1rem' margin='0 0.2rem 0 0' />
                        <NewButton text='Learn more' bg="#fff" color="#000" radius='0.1rem' />
                    </div>
                </div>
            </ChipSwapBox>
            <NFTHedgingBox>
                <BoxTitle title='NFT Hedging' desc='Offset the risk of market volatility on beloved NFTs.' />
                <div className='nftHedg_content'>
                    <div className='nftHedg_left'>
                        {
                            hedgingList.map((item, index) => {
                                return (
                                    <span className='hedg_item' key={index}>{item}</span>
                                )
                            })
                        }
                    </div>
                    <div className='nftHedg_right'>
                        <div className='right_img_one'></div>
                        <div className='right_img_two'></div>
                    </div>
                </div>
            </NFTHedgingBox>
        </HomeWarp>
    )
};
export default Home;