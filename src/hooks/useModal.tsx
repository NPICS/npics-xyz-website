import Modal from "../component/Modal";
import React, {useCallback, useState} from "react";
import {ReactNode} from "react";

export default function useModal() {
  const [isOpen, setOpen] = useState<boolean>(false)

  const open = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const close = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const ModalWrapper = useCallback(
    (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
      return <Modal isOpen={isOpen}>{props.children}</Modal>
    }, [isOpen]
  )

  return [ModalWrapper, open, close, isOpen]
}

// interface ModalState {
//   node: React.FC<{ children: React.ReactNode }>
// }
//
// function useModal2(): ModalState {
//   const [isOpen, setOpen] = useState(false)
//
//   const ModalWrapper = useCallback((props: { children: React.ReactNode}) => {
//     return <Modal
//       isOpen={true}
//       onRequestClose={() => {
//         setOpen(false)
//       }}
//     >{props.children}</Modal>
//   }, [isOpen])
//
//   return {
//     node: ModalWrapper
//   }
// }