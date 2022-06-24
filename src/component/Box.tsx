import styled from "styled-components";
import {
    background,
    border,
    layout,
    position,
    space,
    flexbox,
    grid,
    shadow,
    boxShadow,
    TypographyProps, typography, color, BoxShadowProps
} from "styled-system";
import {HTMLAttributes} from "react";
import {
    BackgroundProps,
    BorderProps,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    GridProps as _GridProps,
} from "styled-system";

export interface BoxProps extends BackgroundProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    BoxShadowProps,
    HTMLAttributes<HTMLDivElement> {
}

export interface FlexProps extends BoxProps, FlexboxProps {
    gap?: string
}

export interface GridProps extends FlexProps, _GridProps {
}

export interface _TypographyProps extends TypographyProps, LayoutProps, SpaceProps, HTMLAttributes<HTMLDivElement> {
  userSelect?: string
  family?: string
}


const Box = styled.div<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
  ${shadow}
  ${boxShadow}
`;

const Flex = styled(Box)<FlexProps>`
  display: flex;
  gap: ${(props) => props.gap};
  ${flexbox}
`;

const Grid = styled(Box)<GridProps>`
  display: grid;
  ${flexbox}
  ${grid}
`;


const Typography = styled.div<_TypographyProps>`
  font-family: ${(props) => props.family ?? 'Montserrat'};
  user-select: ${(props) => props.userSelect ?? 'auto'};
  ${typography}
  ${layout}
  ${space}
  ${color}
`;

interface IconProps extends BoxProps {
    // width: string
    // height?: string
    // src?: string
    // borderRadius?: string
}

// TODO: set styled.img
const Icon = styled.img<IconProps>`
  display: inline-block;
  overflow: hidden;
  user-select: none;
  //pointer-events: none;
  width: ${props => props.width};
  height: ${props => props.height ?? "auto"};
  object-fit: contain;
  -webkit-user-drag: none;
  
  // display: inline-block;
  // overflow: hidden;
  // background: transparent url(${(props) => props.src}) no-repeat center;
  // background-size: ${props => props.width} ${props => props.height ?? props.width};
  // width: ${props => props.width};
  // height: ${props => props.height ?? props.width};
  // border-radius: ${props => props.width};
`
const GridItem = styled(Box)<GridProps>`
  display: flex;
  gap: ${(props) => props.gap};
  ${flexbox}
  ${grid}
`;

export {Box, Grid, Flex, Typography, Icon, GridItem}