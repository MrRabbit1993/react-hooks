import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import './App.css';
import { h0 } from './../common/units/fp';
import useNav from './../common/customHooks/useNav';
import {
    setFrom,
    setTo,
    setDepartDate,
    setHighSpeed,
    setSearchParsed,
    setTrainList,
    setTicketTypes,
    setTrainTypes,
    setDepartStations,
    setArriveStations,
    prevDate,
    nextDate,
    toggleOrderType,
    toggleHighSpeed,
    toggleOnlyTickets,
    toggleIsFiltersVisible,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd,
} from './redux/actions';
import Header from './../common/components/Header';
import Nav from './../common/components/nav';
import List from './components/list';
import Buttom from './components/bottom';
import DepartDate from '../index/components/DepartDate';

function App(props) {
    const {
        from,
        to,
        dispatch,
        searchParsed,
        departDate,
        highSpeed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        trainList,
        isFiltersVisible,
    } = props;
    const onBack = useCallback(() => {
        window.history.back();
    }, []);
    useEffect(() => {
        //只解析一次地址栏
        const queries = URI.parseQuery(window.location.search);
        const { from, to, date, highSpeed } = queries;
        dispatch(setFrom(from));
        dispatch(setTo(to));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));
        dispatch(setHighSpeed(highSpeed === 'true'));
        dispatch(setSearchParsed(true));
    }, []);

    useEffect(() => {
        //请求
        if (!searchParsed) return; //如果没解析完地址
        const url = new URI('/rest/query')
            .setSearch('from', from)
            .setSearch('to', to)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .setSearch('highSpeed', highSpeed)
            .setSearch('orderType', orderType)
            .setSearch('onlyTickets', onlyTickets)
            .setSearch(
                'checkedTicketTypes',
                Object.keys(checkedTicketTypes).join()
            )
            .setSearch(
                'checkedTrainTypes',
                Object.keys(checkedTrainTypes).join()
            )
            .setSearch(
                'checkedDepartStations',
                Object.keys(checkedDepartStations).join()
            )
            .setSearch(
                'checkedArriveStations',
                Object.keys(checkedArriveStations).join()
            )
            .setSearch('departTimeStart', departTimeStart)
            .setSearch('departTimeEnd', departTimeEnd)
            .setSearch('arriveTimeStart', arriveTimeStart)
            .setSearch('arriveTimeEnd', arriveTimeEnd)
            .toString();
        fetch(url)
            .then(response => response.json())
            .then(result => {
                const {
                    dataMap: {
                        directTrainInfo: {
                            trains,
                            filter: {
                                ticketType,
                                trainType,
                                depStation,
                                arrStation,
                            },
                        },
                    },
                } = result;
                dispatch(setTrainList(trains));
                dispatch(setTicketTypes(ticketType));
                dispatch(setTrainTypes(trainType));
                dispatch(setDepartStations(depStation));
                dispatch(setArriveStations(arrStation));
            });
    }, [
        from,
        to,
        departDate,
        highSpeed,
        searchParsed,
        orderType,
        onlyTickets,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
    ]);

    const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
        departDate,
        dispatch,
        prevDate,
        nextDate
    );
    const bottomCallBacks = useMemo(
        () =>
            bindActionCreators(
                {
                    //下车按钮事件传递
                    toggleOrderType,
                    toggleHighSpeed,
                    toggleOnlyTickets,
                    toggleIsFiltersVisible,
                    setCheckedTicketTypes,
                    setCheckedTrainTypes,
                    setCheckedDepartStations,
                    setCheckedArriveStations,
                    setDepartTimeStart,
                    setDepartTimeEnd,
                    setArriveTimeStart,
                    setArriveTimeEnd,
                },
                dispatch
            ),
        []
    );
    if (!searchParsed) {
        return null;
    }
    return (
        <div>
            <div className="header-wrapper">
                <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
            </div>
            <Nav
                date={departDate}
                isPrevDisabled={isPrevDisabled}
                isNextDisabled={isNextDisabled}
                prev={prev}
                next={next}
            />
            <List list={trainList} />
            <Buttom
                isFiltersVisible={isFiltersVisible}
                highSpeed={highSpeed}
                orderType={orderType}
                onlyTickets={onlyTickets}
                checkedTicketTypes={checkedTicketTypes}
                checkedTrainTypes={checkedTrainTypes}
                checkedDepartStations={checkedDepartStations}
                checkedArriveStations={checkedArriveStations}
                departTimeStart={departTimeStart}
                departTimeEnd={departTimeEnd}
                arriveTimeStart={arriveTimeStart}
                arriveTimeEnd={arriveTimeEnd}
                ticketTypes={ticketTypes}
                trainTypes={trainTypes}
                departStations={departStations}
                arriveStations={arriveStations}
                {...bottomCallBacks}
            />
        </div>
    );
}
function mapStateToProps(state) {
    return state;
}
function mapDispatchToProps(dispatch) {
    return { dispatch };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
