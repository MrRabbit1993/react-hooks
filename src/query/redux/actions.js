import * as ActionTypes from "./constants";
import { h0 } from "./../../common/units/fp";
export function setFrom(from) {
    return {
        type: ActionTypes.ACTION_SET_FROM,
        payload: from,
    };
}
export function setTo(to) {
    return {
        type: ActionTypes.ACTION_SET_TO,
        payload: to,
    };
}
export function setDepartDate(departDate) {
    return {
        type: ActionTypes.ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
export function setHighSpeed(highSpeed) {
    return {
        type: ActionTypes.ACTION_SET_HIGH_SPEED,
        payload: highSpeed,
    };
}

export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();

        dispatch(setHighSpeed(!highSpeed));
    };
}
export function setTrainList(trainList) {
    return {
        type: ActionTypes.ACTION_SET_TRAIN_LIST,
        payload: trainList,
    };
}
export function toggleOrderType() {
    return (dispatch, getState) => {
        const { orderType } = getState();
        if (orderType === ActionTypes.ORDER_DEPART) {
            dispatch({
                type: ActionTypes.ACTION_SET_ORDER_TYPE,
                payload: ActionTypes.ORDER_DURATION,
            });
        } else {
            dispatch({
                type: ActionTypes.ACTION_SET_ORDER_TYPE,
                payload: ActionTypes.ORDER_DEPART,
            });
        }
    };
}
export function toggleOnlyTickets() {
    return (dispatch, getState) => {
        const { onlyTickets } = getState();

        dispatch({
            type: ActionTypes.ACTION_SET_ONLY_TICKETS,
            payload: !onlyTickets,
        });
    };
}
export function setTicketTypes(ticketTypes) {
    return {
        type: ActionTypes.ACTION_SET_TICKET_TYPES,
        payload: ticketTypes,
    };
}
export function setCheckedTicketTypes(checkedTicketTypes) {
    return {
        type: ActionTypes.ACTION_SET_CHECKED_TICKET_TYPES,
        payload: checkedTicketTypes,
    };
}
export function setTrainTypes(trainTypes) {
    return {
        type: ActionTypes.ACTION_SET_TRAIN_TYPES,
        payload: trainTypes,
    };
}
export function setCheckedTrainTypes(checkedTrainTypes) {
    return {
        type: ActionTypes.ACTION_SET_CHECKED_TRAIN_TYPES,
        payload: checkedTrainTypes,
    };
}
export function setDepartStations(departStations) {
    return {
        type: ActionTypes.ACTION_SET_DEPART_STATIONS,
        payload: departStations,
    };
}
export function setCheckedDepartStations(checkedDepartStations) {
    return {
        type: ActionTypes.ACTION_SET_CHECKED_DEPART_STATIONS,
        payload: checkedDepartStations,
    };
}
export function setArriveStations(arriveStations) {
    return {
        type: ActionTypes.ACTION_SET_ARRIVE_STATIONS,
        payload: arriveStations,
    };
}
export function setCheckedArriveStations(checkedArriveStations) {
    return {
        type: ActionTypes.ACTION_SET_CHECKED_ARRIVE_STATIONS,
        payload: checkedArriveStations,
    };
}
export function setDepartTimeStart(departTimeStart) {
    return {
        type: ActionTypes.ACTION_SET_DEPART_TIME_START,
        payload: departTimeStart,
    };
}
export function setDepartTimeEnd(departTimeEnd) {
    return {
        type: ActionTypes.ACTION_SET_DEPART_TIME_END,
        payload: departTimeEnd,
    };
}
export function setArriveTimeStart(arriveTimeStart) {
    return {
        type: ActionTypes.ACTION_SET_ARRIVE_TIME_START,
        payload: arriveTimeStart,
    };
}
export function setArriveTimeEnd(arriveTimeEnd) {
    return {
        type: ActionTypes.ACTION_SET_ARRIVE_TIME_END,
        payload: arriveTimeEnd,
    };
}
export function toggleIsFiltersVisible() {
    return (dispatch, getState) => {
        const { isFiltersVisible } = getState();

        dispatch({
            type: ActionTypes.ACTION_SET_IS_FILTERS_VISIBLE,
            payload: !isFiltersVisible,
        });
    };
}
export function setSearchParsed(searchParsed) {
    return {
        type: ActionTypes.ACTION_SET_SEARCH_PARSED,
        payload: searchParsed,
    };
}

export function nextDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
    };
}
export function prevDate() {
    return (dispatch, getState) => {
        const { departDate } = getState();

        dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
    };
}