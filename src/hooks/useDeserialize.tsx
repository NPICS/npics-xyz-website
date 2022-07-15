import {Contract} from "ethers";
import {useWeb3React} from "@web3-react/core";
import {useMemo} from "react";
import {getContract} from "./useContract";
import {deserialize, deserializeArray} from "class-transformer";
import {ClassConstructor} from "class-transformer/types/interfaces";

/*
* json str to class
* */
export function useDeserialize<T extends ClassConstructor<T>>(
  cls: ClassConstructor<T>,
  json: string
): T | undefined {
  return useMemo(() => {
    try {
      return deserialize(cls, json)
    } catch (e) {
      console.debug(`useDeserialize => ${e}`)
      return undefined
    }
  }, [])
}

/*
* json str to class array
* */
export function useDeserializeArray<T extends ClassConstructor<T>>(
  cls: ClassConstructor<T>,
  json: string
): T[] {
  return useMemo(() => {
    try {
      return deserializeArray(cls, json)
    } catch (e) {
      console.debug(`useDeserializeArray => ${e}`)
      return []
    }
  }, [])
}