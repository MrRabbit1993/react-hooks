import * as ActionTypes from './constants';
import { h0 } from './../../common/units/fp';

export function setDepartDate(departDate) {
    return {
        type: ActionTypes.ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
export function setArriveDate(arriveDate) {
    return {
        type: ActionTypes.ACTION_SET_ARRIVE_DATE,
        payload: arriveDate,
    };
}
export function setDepartTimeStr(departTimeStr) {
    return {
        type: ActionTypes.ACTION_SET_DEPART_TIME_STR,
        payload: departTimeStr,
    };
}
export function setArriveTimeStr(arriveTimeStr) {
    return {
        type: ActionTypes.ACTION_SET_ARRIVE_TIME_STR,
        payload: arriveTimeStr,
    };
}
export function setDepartStation(departStation) {
    return {
        type: ActionTypes.ACTION_SET_DEPART_STATION,
        payload: departStation,
    };
}
export function setArriveStation(arriveStation) {
    return {
        type: ActionTypes.ACTION_SET_ARRIVE_STATION,
        payload: arriveStation,
    };
}
export function setTrainNumber(trainNumber) {
    return {
        type: ActionTypes.ACTION_SET_TRAIN_NUMBER,
        payload: trainNumber,
    };
}
export function setDurationStr(durationStr) {
    return {
        type: ActionTypes.ACTION_SET_DURATION_STR,
        payload: durationStr,
    };
}
export function setTickets(tickets) {
    return {
        type: ActionTypes.ACTION_SET_TICKETS,
        payload: tickets,
    };
}
export function setIsScheduleVisible(isScheduleVisible) {
    return {
        type: ActionTypes.ACTION_SET_IS_SCHEDULE_VISIBLE,
        payload: isScheduleVisible,
    };
}
export function toggleIsScheduleVisible() {
    return (dispatch, getState) => {
        const { isScheduleVisible } = getState();

        dispatch(setIsScheduleVisible(!isScheduleVisible));
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
