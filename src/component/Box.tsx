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
import { HTMLAttributes } from "react";
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

const Flex = styled(Box) <FlexProps>`
  display: flex;
  gap: ${(props) => props.gap};
  ${flexbox}
`;

const Grid = styled(Box) <GridProps>`
  display: grid;
  ${flexbox}
  ${grid}
`;


const Typography = styled.div<_TypographyProps>`
  user-select: ${(props) => props.userSelect ?? 'auto'};
  ${typography}
  ${layout}
  ${space}
  ${color}
`;

interface IconProps extends BoxProps {
  radius?: string
  margin?: string
}

const Icon = styled.img<IconProps>`
  display: inline-block;
  overflow: hidden;
  user-select: none;
  border-radius: ${props => props.radius ?? '0'};
  margin: ${props => props.margin ?? '0'};
  width: ${props => props.width};
  height: ${props => props.height ?? "auto"};
  object-fit: contain;
  -webkit-user-drag: none;
  ${background}
`

const GridItem = styled(Box) <GridProps>`
  display: flex;
  gap: ${(props) => props.gap};
  ${flexbox}
  ${grid}
`;

interface Button2Props extends BoxProps {
  variant?: "primary" | "secondary"
}

export const Button2 = styled.button<Button2Props>`
  background: ${(props) => props.variant ?? "primary" === "primary" ? "#000" : "#fff"};
  border-radius: 0.1rem;
  border: ${(props) => props.variant ?? "primary" === "primary" ? "0" : "0.01rem"} solid #00000033;
  color: ${(props) => props.variant ?? "primary" === "primary" ? "#fff" : "#000"};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.variant ?? "primary" === "primary" ? "#333" : "#fff"};
  }

  &:disabled {
    background: ${(props) => props.variant ?? "primary" === "primary" ? "#c5c5c5" : "#fff"};
    color: ${(props) => props.variant ?? "primary" === "primary" ? "#fff" : "rgba(0,0,0,.5)"};
    cursor: not-allowed;
  }
`

export { Box, Grid, Flex, Typography, Icon, GridItem }