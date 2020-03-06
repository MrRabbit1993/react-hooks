import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import URI from "urijs";
import dayjs from "dayjs";
import "./App.css";

import Header from "./../common/components/Header";
import Detail from "./../common/components/detail";
import Account from "./components/account";
import Choose from "./components/choose";
import Passenger from "./components/passenger";
import Ticket from "./components/ticket";
import { setDepartStation, setArriveStation, setTrainNumber, setSeatType, setDepartDate, setSearchParsed, fetchInitial } from "./redux/actions";
import DepartDate from "../index/components/DepartDate";
function App(props) {
    const {
        trainNumber,
        departStation,
        arriveStation,
        seatType,
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        durationStr,
        price,
        passengers,
        menu,
        isMenuVisible,
        searchParsed,
        dispatch
    } = props;
    const onBack = useCallback(() => {
        window.history.back()
    }, [])
    //解析地址栏
    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const { trainNumber, dStation, aStation, type, date } = queries;
        dispatch(setDepartStation(dStation));
        dispatch(setArriveStation(aStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setSeatType(type));
        dispatch(setDepartDate(dayjs(date).valueOf()));
        dispatch(setSearchParsed(true))
    }, []);
    //发请求
    useEffect(() => {
        if (!searchParsed) {
            return
        }
        const url = new URI('/rest/order').setSearch('dStation', departStation).setSearch('aStation', arriveStation)
            .setSearch('type', seatType).setSearch('date', dayjs(DepartDate).format("YYYY-MM-DD").toString());
        dispatch(fetchInitial(url));
    }, [searchParsed, departStation, arriveStation, seatType, DepartDate])
    if (!searchParsed) return null;
    return (
        <div className="app">
            <div className="header-wrapper">
                <Header title="订单填写" onBack={onBack} />
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}
                    trainNumber={trainNumber}
                >
                    <span className="train-icon" style={{display:'block'}}></span>
                </Detail>
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch) {
    return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);