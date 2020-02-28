import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import reducers from "./reducers";
export default createStore(
    combineReducers(reducers),//聚合规则
    {//store默认值

    },
    applyMiddleware(thunk)//使用中间件达到异步
)
