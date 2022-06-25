import {Middleware} from "redux";

export const logger: Middleware = api => next => action => {
  return next(action)
}