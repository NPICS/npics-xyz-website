export enum SessionStorageKey {
  AccessToken = "ACCESS_TOKEN",
  WalletAuthorized = "WALLET_AUTHORIZED",
  WalletName = "WALLET_NAME",
}

export enum BANK_ENUM {
  "bend" = 0,
  "wing" = 1,
  "bendao" = 0,
}
export const BANK_NAME_MAP = {
  [BANK_ENUM.bend]: "bendao",
  [BANK_ENUM.wing]: "wing",
};
