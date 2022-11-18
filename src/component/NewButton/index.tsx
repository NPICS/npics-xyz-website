import React from 'react'
import { ButtonBox } from './style'
import { useNavigate } from 'react-router-dom';
const NewButton = ({ text, color, bg, radius, width = '2.2rem', height = "0.66rem", margin = "0px", openUrl = true, url = "" }: { text: string, color: string, bg: string, radius: string, width?: string, height?: string, margin?: string, openUrl?: boolean, url?: string }) => {
  const navigate = useNavigate();
  const handleButton = () => {
    if (openUrl) {
      window.open(url)
    } else {
      navigate(url);
    }
  }
  return (
    <ButtonBox color={color} bg={bg} radius={radius} width={width} height={height} margin={margin} onClick={handleButton}>{text}</ButtonBox>
  )
};
export default NewButton;