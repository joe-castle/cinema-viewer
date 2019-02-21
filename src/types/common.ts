import { IState } from "./redux";
import { Db } from "mongodb";

/**
 * Connection interface for mongodb client connection
 */
export interface Connect {
  (url: string, db: string): Promise<Db | void>,
  _db: Db|null
}

/**
 * Generic inteface for a function that returns a boolean based on a value
 */
export interface IPredicate <T> {
  (value: T): boolean
}


declare global {
  interface Window {
    __PRELOADED_STATE__: IState
  }
}