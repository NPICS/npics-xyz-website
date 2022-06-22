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
  user-select: none;
  ${typography}
  ${layout}
  ${space}
  ${color}
`;

interface IconProps extends BoxProps {
    width: string
    height: string
    url?: string
}

const Icon = styled.div<IconProps>`
  display: inline-block;
  overflow: hidden;
  background: transparent url(${(props) => props.url}) no-repeat center;
  background-size: ${props => props.width} ${props => props.height};
  width: ${props => props.width};
  height: ${props => props.height};
`

export {Box, Grid, Flex, Typography, Icon}