import { font1665 } from "component/styled";
import { FC, ReactElement, useRef } from "react";
import styled from "styled-components";

interface IProps {
  value: number;
  onChange: (percent: number) => void;
}
const Container = styled.div`
  position: relative;
  width: 100%;
  height: .08rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & > :first-child {
  width: inherit;
  background-color: #000000;
  border: .01rem solid rgba(255, 255, 255, 0.2);
  border-radius: .05rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  div {
    height: 0.06rem;
    background: linear-gradient(284.2deg, #FF0000 0%, #FEB240 101.06%);
    border-radius: 5px;
  }
}
.point {
  background: rgba(255,255,255,.6);
    width: .16rem;
    height: .16rem;
    border-radius: .08rem;
    position: absolute;
  cursor: pointer;
    transform: translateX(-0.5vw);
    svg {
      width: 0.9vw;
    }
  }
  .text {
    ${font1665};
    position: absolute;
    top: .13rem;
    transform: translateX(-0.5vw);
}
`

const ProgressBar: FC<IProps> = ({ value, onChange }): ReactElement => {
  const totalRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <div ref={totalRef}>
        <div style={{ width: value * 100 + "%" }} />
      </div>
      <div
        className="point"
        onMouseDown={(e) => {
          const { offsetWidth } = totalRef.current!;
          const stop = e.currentTarget;
          const { offsetLeft } = stop;
          stop.style["left"] = offsetLeft + "px";
          const { pageX: start } = e;
          const move = (e: MouseEvent) => {
            let val = offsetLeft + e.pageX - start;
            if (val <= 0) val = 0;
            if (val >= offsetWidth) val = offsetWidth;
            onChange(val / offsetWidth);
          };

          const clear = () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", clear);
            document.removeEventListener("mouseleave", clear);
          };
          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", clear);
          document.addEventListener("mouseleave", clear);
        }}
        style={{ left: value * 100 + "%" }}
      ></div>
      <div className="text" style={{ left: value * 100 + "%" }}>{(+value*100).toFixed(0)}%</div>
    </Container>
  );
};

export default ProgressBar;
