import { createStore, combineReducers, compose, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import reducers from "./reducers";
import { h0 } from "./../../common/units/fp";
import { ORDER_DEPART } from "./constants";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const defaultStore = {
    from: null,
    to: null,
    departDate: h0(Date.now()),
    highSpeed: false,
    trainList: [],
    orderType: ORDER_DEPART,//排序
    onlyTickets: false,//显示有票
    ticketTypes: [],//票类型
    checkedTicketTypes: {},//选择的类型
    trainTypes: [],//车类型
    checkedTrainTypes: {},
    departStations: [],//出发车站
    checkedDepartStations: {},//选中的车站
    arriveStations: [],//到达车站
    checkedArriveStations: {},//选中的达到车站
    departTimeStart: 0,//出发开始时间
    departTimeEnd: 24,//出发截止时间
    arriveTimeStart: 0,//到达开始时间
    arriveTimeEnd: 24,//到达截止时间
    isFiltersVisible: false,//浮层
    searchParsed:false
}
export default createStore(
    combineReducers(reducers),//聚合规则
    defaultStore,//store默认值
    composeEnhancers(applyMiddleware(thunk))//使用中间件达到异步
)