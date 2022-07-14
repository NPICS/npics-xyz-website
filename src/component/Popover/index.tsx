import styled from "styled-components";
import {useInterval} from "react-use";
import React, {useCallback, useMemo, useState} from "react";
import {Options, Placement} from "@popperjs/core";
import {usePopper} from "react-popper";
import {createPortal} from "react-dom";

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 9999;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  color: ${({theme}) => theme.text2};
`

const ReferenceElement = styled.div`
  display: inline-block;
`

const Arrow = styled.div`
  width: 0.08rem;
  height: 0.08rem;
  z-index: 9998;

  ::before {
    position: absolute;
    width: 0.08rem;
    height: 0.08rem;
    z-index: 9998;

    content: '';
    border: 0.01rem solid ${({theme}) => theme.bg2};
    transform: rotate(45deg);
    background: ${({theme}) => theme.bg0};
  }

  &.arrow-top {
    bottom: -0.05rem;

    ::before {
      border-top: none;
      border-left: none;
    }
  }

  &.arrow-bottom {
    top: -0.05rem;

    ::before {
      border-bottom: none;
      border-right: none;
    }
  }

  &.arrow-left {
    right: -0.05rem;

    ::before {
      border-bottom: none;
      border-left: none;
    }
  }

  &.arrow-right {
    left: -0.05rem;

    ::before {
      border-right: none;
      border-top: none;
    }
  }
`

export interface PopoverProps {
  content: React.ReactNode
  show: boolean
  children: React.ReactNode
  placement?: Placement
}

export default function NPopover({content, show, children, placement = 'auto'}: PopoverProps) {
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)

  const options = useMemo(
    (): Options => ({
      placement,
      strategy: 'fixed',
      modifiers: [
        {name: 'offset', options: {offset: [8, 8]}},
        {name: 'arrow', options: {element: arrowElement}},
        {name: 'preventOverflow', options: {padding: 8}},
      ],
    }),
    [arrowElement, placement]
  )

  const {styles, update, attributes} = usePopper(referenceElement, popperElement, options)

  const updateCallback = useCallback(() => {
    update && update()
  }, [update])
  useInterval(updateCallback, show ? 100 : null)

  return (
    createPortal(<PopoverContainer
      show={show}
      ref={setPopperElement as any}
      style={styles.popper} {...attributes.popper}
    >
      {content}
      <Arrow
        className={`arrow-${attributes.popper?.['data-popper-placement'] ?? ''}`}
        ref={setArrowElement as any}
        style={styles.arrow}
        {...attributes.arrow}
      />
    </PopoverContainer>, document.body)
  )
}
