import React from 'react'
import Modal from "component/Modal";
import ConnectedWallet from 'updater/ConnectedWallet';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setShowWalletModalOpen } from 'store/app';

export default function WalletConnectModal() {
  
  const action = useAppDispatch()
  const state = useAppSelector(state => state.app.showWalletModalOpen)

  
  return(
  <Modal isOpen={state} onRequestClose={() => action(setShowWalletModalOpen(false)) } >
    <ConnectedWallet />
  </Modal>
  )
}