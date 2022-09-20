import { useAsync } from "react-use";
import {
  updateARP,
  updateBENDExchangeRate,
  updateLoginState,
  updatePWingExchangeRate,
  updateUSDTExchangeRate,
} from "../store/app";
import { useAppDispatch } from "../store/hooks";
import { SessionStorageKey } from "../utils/enums";
import { useIntervalWhen } from "rooks";
import { useEffect } from "react";
import {
  CHAIN_ID,
  getConnectorForWallet,
  injected,
  Wallet,
  WALLETS,
} from "../connectors/hooks";

export default function DataUpdater() {
  const dispatch = useAppDispatch();

  /*
   * 30s updater
   * */
  useIntervalWhen(
    () => {
      dispatch(updateUSDTExchangeRate());
      dispatch(updateBENDExchangeRate());
      dispatch(updatePWingExchangeRate());
      dispatch(updateARP());
    },
    30 * 1000,
    true,
    true
  );

  /*
   * check access token, autologin
   * */
  useEffect(() => {
    dispatch(updateLoginState());
  }, []);

  /*
   * wallet auto connect
   * */
  useAsync(async () => {
    try {
      if (localStorage.getItem(SessionStorageKey.WalletAuthorized)) {
        let walletName =
          localStorage.getItem(SessionStorageKey.WalletName) ??
          Wallet.INJECTED.toString();
        let wallet = walletName as unknown as Wallet;
        let connector = getConnectorForWallet(wallet);
        await connector.activate(CHAIN_ID);
      }
    } catch (e) {
      console.debug(`wallet auto connect: ${e}`);
    }
  }, []);

  return null;
}
