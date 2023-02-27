import axios from "axios";
import { message } from "antd";
import { SessionStorageKey } from "./enums";
// import store from "../store";
// import {Params} from "react-router-dom";
// import store from "../store";

export const X2Y2_ORDER_SIGN_API = "/x2y2/api/orders/sign";
export const SUDOSWAP_GRAPH_API =
  "https://api.thegraph.com/subgraphs/name/zeframlou/sudoswap";
export const NPICS_GRAPH_API =
  "https://api.thegraph.com/subgraphs/name/npics/npisc"; //https://thegraph.com/hosted-service/subgraph/npics/npisc
export const GRAPH_API = "https://api.thegraph.com/index-node/graphql";
axios.defaults.timeout = 15000;
axios.defaults.headers.post["Content-Type"] = "application/json";

// if (window && window.location.host.includes("npics.xyz")) {
//   axios.defaults.baseURL = "https://api.npics.xyz";
// } else {
//   axios.defaults.baseURL = "https://apitest.npics.xyz/";
// }

export const NEW_HTTP_API = "https://npsapi.npics.xyz";

axios.defaults.baseURL = "https://api.npics.xyz/";
axios.interceptors.request.use(
  (config: any) => {
    if (config.method === "post") {
      config.data = JSON.stringify(config.data);
    }
    if (
      ![
        X2Y2_ORDER_SIGN_API,
        SUDOSWAP_GRAPH_API,
        NPICS_GRAPH_API,
        GRAPH_API,
      ].includes(config.url)
    ) {
      config.headers["Authorization"] = localStorage.getItem(
        SessionStorageKey.AccessToken
      );
    }
    return config;
  },
  (error: any) => {
    console.log("wrong parameter");
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res: any) => {
    if (res.data.code === 4003) {
      localStorage.removeItem(SessionStorageKey.AccessToken);
      message.error(res.data.message);
    }
    if (!res.data.success) {
      return Promise.resolve(res);
    }
    return res;
  },
  (err: any) => {
    if (err.code === 504 || err.code === 404) {
      console.log(`error ${err.message}`);
    } else if (err.code === 403) {
      console.log(`error ${err.message}`);
    } else {
      console.log(`err: ${err}`);
    }
    return Promise.reject(err);
  }
);

export function myPost(url: any, params?: any, cancel?: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params ?? {}, cancel)
      .then(
        (response: any) => {
          resolve(response.data);
        },
        (err: any) => {
          reject(err);
        }
      )
      .catch((error: any) => {
        reject(error);
      });
  });
}

export function myGet(url: any, param: any = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: param,
      })
      .then(
        (response: any) => {
          resolve(response);
        },
        (err: any) => {
          reject(err);
        }
      )
      .catch((error: any) => {
        reject(error);
      });
  });
}
//
// export function getWithJSON(uri: string, params?: {}) {
//     return new Promise((resolve, reject) => {
//         axios.get(uri, {
//             params: params ?? {},
//             headers: {
//                 "Authorization": localStorage.getItem(SessionStorageKey.AccessToken) ?? ""
//             }
//         }).then(resp => {
//             // http request success
//             if (resp.status === 200) {
//                 /// service return success
//                 switch (resp.data.code) {
//                     case 200:
//                         resolve(resp.data)
//                         break
//                     case 4003:
//                         /// token invalid, clear app updater
//                         localStorage.removeItem(SessionStorageKey.AccessToken)
//                         break
//                 }
//             } else {
//                 /// http request failed
//
//             }
//         }).catch((error) => {
//           console.error(`HTTP => ${error}`)
//         }).finally(() => {
//
//         })
//     })
// }

const http = {
  myPost,
  myGet,
};

export default http;
