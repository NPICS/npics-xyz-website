import {ReactNode, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import styled from "styled-components";

const ModalMask = styled.div<{
    isOpen: boolean
}>`
  background: ${props => props.isOpen ? "rgba(0, 0, 0, .5) " : "transparent"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  transition: all 0.25s;
  visibility: ${props => props.isOpen ? "visible" : "hidden"};
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.isOpen ? 1 : 0};
`

export default function Modal(props: {
    isOpen: boolean
    children: ReactNode
    onRequestClose?(): void
}) {
    const [maskElement, setMaskElement] = useState<HTMLElement | null>(null)
    let root = document.getElementById("root") ?? document.body

    useEffect(() => {
        const handleClickOutside = ({target}: Event) => {
            if (target instanceof Node && target === maskElement) {
                props.onRequestClose?.()
            }
        }
        if (maskElement !== null) {
            document.addEventListener("click", handleClickOutside)
        }
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [props, maskElement])

    return createPortal(
        <ModalMask ref={setMaskElement} isOpen={props.isOpen}>
            {props.isOpen && props.children}
        </ModalMask>, root
    )
}