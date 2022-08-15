import { _TypographyProps } from "component/Box";
import { font_14, weight_500 } from "component/styled";
import styled from "styled-components";
import { BackgroundProps, background, typography, space, layout, color, LayoutProps } from "styled-system";

export interface Td_ThProps extends _TypographyProps,BackgroundProps {
}
export interface TrProps extends LayoutProps,BackgroundProps {
}

export const Td = styled.td<Td_ThProps>`
  border-bottom: 0.01rem solid #0000001A;
  border-top: 0.01rem solid #0000001A;
  color: #000;
  padding: 0.16rem;
  vertical-align: middle;
  
  ${typography}
  ${layout}
  ${space}
  ${color}
  ${background}
`;

export const Th = styled.th<Td_ThProps>`
  color: #000;
  font-size: ${font_14};
  font-weight: ${weight_500};
  padding: 0.16rem;
  text-transform: capitalize;
  border-bottom: 0.01rem solid #0000001A;
  border-top: 0.01rem solid #0000001A;
  ${typography}
  ${layout}
  ${space}
  ${color}
  ${background}
`;

export const Tr = styled.tr<TrProps>`
  ${layout}
  ${background}
  th:first-child {
    border-left: 0.01rem solid #0000001A;
    border-bottom-left-radius: 0.1rem;
    border-top-left-radius: 0.1rem;
  }
  th:last-child {
    border-right: 0.01rem solid #0000001A;
    border-bottom-right-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
  }
  td:first-child {
    border-left: 0.01rem solid #0000001A;
    border-bottom-left-radius: 0.1rem;
    border-top-left-radius: 0.1rem;
  }
  td:last-child {
    border-right: 0.01rem solid #0000001A;
    border-bottom-right-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
  }
`

export const Table = styled.table<_TypographyProps>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.1rem;
  ${space}
  ${layout}
`;
