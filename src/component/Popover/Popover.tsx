import React from 'react'
import { Popover } from 'antd'
import { AbstractTooltipProps, RenderFunction } from 'antd/lib/tooltip';

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  content?: React.ReactNode | RenderFunction;
}

export const Pop:React.FC<PopoverProps> = (props) => {


  return (
    <Popover
      overlayClassName="ant-popover-reset"
      {...props}
    />
  )
}
export const Pop20:React.FC<PopoverProps> = (props) => {


  return (
    <Popover
      overlayClassName="ant-popover-reset20"
      {...props}
    />
  )
}

