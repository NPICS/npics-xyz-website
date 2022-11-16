import styled from 'styled-components';

export const NewFooterWarp = styled.div<{ isHome: boolean }>`
    position: ${props => props.isHome ? 'static' : 'relative'};
    width: 100%;
    height: 4.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background:${props => props.isHome ? '#1a1a1a' : '#fff'}; ;
    border-top: 2px solid rgba(255,255,255,0.2);
`;
export const NewFooterBox = styled.div`
    position: relative;
    height: 100%;
    width: 16rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding:0.6rem 0;
`
export const NewFooterLeft = styled.div<{ isHome: boolean }>`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color:${props => props.isHome ? ' rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} ;
    .left_box{
        width: 100%;
        display: flex;
        flex-direction: column;
        .footer_left_title{
            text-align: start;
            font-size:0.3rem;
            color:${props => props.isHome ? ' rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} ;
        }
        .footer_left_desc{
            width: 5.1rem;
            font-size: 0.14rem;
            text-align: start;
        }
        .footer_left_btns{
            display: flex;
            .left_btn{
                margin-top: 0.4rem;
                background:${props => props.isHome ? ' rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} ;
                border-radius: 0.05rem;
                padding: 0.1rem 0.4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: all 0.2s;
                :hover{
                    transform: scale(1.04);
                }
                .btn_icon{
                    margin-right: 0.1rem;
                }
                :last-child{
                    margin-left: 0.15rem;
                }
            }
        }
    }
    .cpyt_info{
        width: 100%;
        font-size: 0.12rem;
        text-align: start;
        color:${props => props.isHome ? ' rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} ;
    }

`

export const NewFooterRight = styled.div<{ isHome: boolean }>`
    width: 4rem;
    .footer_link{
        color: ${props => props.isHome ? ' #fff' : '#000'};
        font-size: 0.14rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    .footer_media{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.2rem;
        .media_item{
            background:${props => props.isHome ? ' rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} ;
            padding: 0.1rem;
            border-radius: 0.05rem;
            cursor: pointer;
            transition:  all 0.2s;
            :hover{
                transform: scale(1.1);
            }
        }
    }
    .audits_box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-top: 0.6rem;
        .audits_title{
            font-size: 0.14rem;
            color:${props => props.isHome ? ' rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} ;
            margin-bottom: 0.15rem;
        }
    }
`
