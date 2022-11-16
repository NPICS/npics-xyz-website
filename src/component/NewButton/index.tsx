import React from 'react'
import { ButtonBox } from './style'

const NewButton = ({ text, color, bg, radius, width = '2.2rem', height = "0.66rem", margin = "0px", openUrl = true, url = "" }: { text: string, color: string, bg: string, radius: string, width?: string, height?: string, margin?: string, openUrl?: boolean, url?: string }) => {
    return (
        <ButtonBox color={color} bg={bg} radius={radius} width={width} height={height} margin={margin}>{text}</ButtonBox>
    )
};
export default NewButton;