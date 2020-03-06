import React, { useEffect, useCallback, useMemo, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import URI from "urijs";
import dayjs from "dayjs";
import "./App.css";
import { h0 } from "./../common/units/fp";
import Detail from "./../common/components/detail";
import Candidate from "./components/candidate";
// import Schedule from "./components/schedule";
import Header from "./../common/components/Header";
import Nav from "./../common/components/nav";
import useNav from "./../common/customHooks/useNav";
import { TrainContext } from "./context";
import {
    setDepartStation, setArriveStation, setTrainNumber, setDepartDate, setSearchParsed, prevDate, nextDate,
    setDepartTimeStr, setArriveTimeStr, setArriveDate, setDurationStr, setTickets, toggleIsScheduleVisible
} from "./redux/actions";

const Schedule = lazy(() => import("./components/schedule"));
function App(props) {
    const {
        departDate,//出发日期
        arriveDate,//到达日期
        departTimeStr,//出发时间
        arriveTimeStr,//到达时间
        departStation,//出发车站
        arriveStation,//到达车站
        trainNumber,//车次
        durationStr,
        tickets,
        isScheduleVisible,//浮层
        searchParsed,
        dispatch
    } = props;
    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const { aStation, dStation, trainNumber, date } = queries;
        dispatch(setDepartStation(dStation));//设置出发车站
        dispatch(setArriveStation(aStation));//设置到达车站
        dispatch(setTrainNumber(trainNumber));//设置车次
        dispatch(setDepartDate(h0(dayjs(date)).valueOf()));//设置到达车站
        dispatch(setSearchParsed(true))
    }, []);
    useEffect(() => {
        document.title = trainNumber;
    }, [trainNumber]);
    useEffect(() => {
        if (!searchParsed) return
        const url = new URI("/rest/ticket").setSearch('date', dayjs(departDate).format("YYYY-MM-DD"))
            .setQuery('trainNumber', trainNumber);
        fetch(url).then(response => response.json()).then(result => {
            const { detail, candidates } = result;
            const { departTimeStr, arriveTimeStr, arriveDate, durationStr } = detail;
            dispatch(setDepartTimeStr(departTimeStr));//更新redux
            dispatch(setArriveTimeStr(arriveTimeStr));//更新redux
            dispatch(setArriveDate(arriveDate));//更新redux
            dispatch(setDurationStr(durationStr));//更新redux
            dispatch(setTickets(candidates))//更新redux
        })
    }, [searchParsed, trainNumber, departDate]);
    const onBack = useCallback(() => {
        window.history.back()
    }, [])
    const {
        isPrevDisabled,
        isNextDisabled,
        prev,
        next
    } = useNav(departDate, dispatch, prevDate, nextDate);
    const detailCallBacks = useMemo(() => bindActionCreators({
        toggleIsScheduleVisible
    }, dispatch), [toggleIsScheduleVisible])
    if (!searchParsed) return null
    return (
        <div className="app">
            <div className="header-wrapper">
                <Header title={trainNumber} onBack={onBack} />
            </div>
            <div className="nav-wrapper">
                <Nav date={departDate}
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDisabled}
                    prev={prev}
                    next={next}
                />
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
                        {...detailCallBacks}
                    />
                </div>
                <TrainContext.Provider value={{ trainNumber, departStation, arriveStation, departDate }}>
                    <Candidate tickets={tickets} />
                </TrainContext.Provider>
                {
                    isScheduleVisible &&
                    <div className="mask" onClick={() => dispatch(toggleIsScheduleVisible())}>
                        <Suspense fallback={
                            <div>loading</div>
                        }>
                            <Schedule
                                date={departDate}
                                trainNumber={trainNumber}
                                departStation={departStation}
                                arriveStation={arriveStation}
                            />
                        </Suspense>
                    </div>
                }

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