import styled from 'styled-components';
export const ButtonBox = styled.div<{ color: string, bg: string, radius: string, width: string, height: string, margin: string }>`
    background: ${props => props.bg};
    color: ${props => props.color};
    border-radius: ${props => props.radius};
    width: ${props => props.width};
    height: ${props => props.height};
    line-height: ${props => props.height};
    text-align: center;
    margin: ${props => props.margin};
    cursor: pointer;
    transition:all 0.1s;
    /* transition: all 0.2s ease-in-out; */
    :hover{
        transform: scale(1.04);
    }
`;
