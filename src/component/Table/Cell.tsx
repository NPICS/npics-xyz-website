import { _TypographyProps } from "component/Box";
import { font_14px, weight_500 } from "component/styled";
import styled from "styled-components";
import { BackgroundProps, background, typography, space, layout, color, LayoutProps } from "styled-system";

export interface Td_ThProps extends _TypographyProps,BackgroundProps {
}
export interface TrProps extends LayoutProps,BackgroundProps {
}

export const Td = styled.td<Td_ThProps>`
  border-bottom: 1px solid #0000001A;
  border-top: 1px solid #0000001A;
  color: #000;
  padding: 16px;
  vertical-align: middle;
  
  ${typography}
  ${layout}
  ${space}
  ${color}
  ${background}
`;

export const Th = styled.th<Td_ThProps>`
  color: #000;
  font-size: ${font_14px};
  font-weight: ${weight_500};
  padding: 16px;
  text-transform: capitalize;
  border-bottom: 1px solid #0000001A;
  border-top: 1px solid #0000001A;
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
    border-left: 1px solid #0000001A;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
  th:last-child {
    border-right: 1px solid #0000001A;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
  td:first-child {
    border-left: 1px solid #0000001A;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
  td:last-child {
    border-right: 1px solid #0000001A;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
`

export const Table = styled.table<_TypographyProps>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  ${space}
  ${layout}
`;
