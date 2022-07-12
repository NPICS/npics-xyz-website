import ConfigureUpdater from "./ConfigureUpdater";
import DataUpdater from "./DataUpdater";
import WalletConnectModal from "./WalletConnectModal";

export default function Updater() {
  return <>
    <DataUpdater/>
    <WalletConnectModal/>
    <ConfigureUpdater/>
  </>
}