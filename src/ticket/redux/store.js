import { createStore, combineReducers, applyMiddleware,compose } from "redux";

import thunk from "redux-thunk";
import reducers from "./reducers";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const defaultStore = {//store默认值
    departDate: Date.now(),//出发日期
    arriveDate: Date.now(),//到达日期
    departTimeStr: null,//出发时间
    arriveTimeStr: null,//到达时间
    departStation: null,//出发车站
    arriveStation: null,//到达车站
    trainNumber: null,//车次
    durationStr: null,
    tickets: [],
    isScheduleVisible: false,//浮层
    searchParsed: false
}

export default createStore(
    combineReducers(reducers),//聚合规则
    defaultStore,
    composeEnhancers(applyMiddleware(thunk))//使用中间件达到异步
)
