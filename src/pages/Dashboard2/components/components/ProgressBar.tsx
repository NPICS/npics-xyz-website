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
  height: 0.08rem;
  display: flex;
  justify-content: center;
  align-items: center;
  & > :first-child {
  width: inherit;
  background-color: rgba(0,0,0,.1);
  border: 0.01rem solid rgba(255, 255, 255, .2);
  border-radius: 0.05rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  div {
    height: 0.06rem;
    background: linear-gradient(284.2deg, #FF0000 0%, #FEB240 101.06%);
    border-radius: 0.05rem;
  }
}
.point {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 0.1rem;
  text-align: center;
  cursor: pointer;
  transform: translateX(-.5vw);
  background: #FFFFFF;
  border: 0.01rem solid rgba(0, 0, 0, 0.1);
  box-shadow: 0rem 0rem 0.2rem rgba(202, 175, 156, 0.16);
  svg {
    width: .9vw;
  }
  .centerCircle {
    width: 0.08rem;
    height: 0.08rem;
    border-radius: 0.04rem;
    background-color: #FF490F;
  }
}
.text {
  user-select: none;
  font-weight: 500;
  font-size: 0.14rem;
  color: rgba(0,0,0,.5);
  position: absolute;
  top: 0.13rem;
  transform: translateX(-.5vw);
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
      ><div className="centerCircle" /></div>
      <div className="text" style={{ left: value * 100 + "%" }}>{(+value*100).toFixed(0)}%</div>
    </Container>
  );
};

export default ProgressBar;
