import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import "./App.css";

import Header from "./../common/components/Header";
import DepartDate from "./components/DepartDate";
import Journey from "./components/Journey";
import HighSpeed from "./components/HighSpeed";
import Submit from "./components/Submit";
import CitySelector from "./../common/components/citySelector";
import DateSelector from "./../common/components/dateSelector";
import { h0 } from "./../common/units/fp";

import { exchangeFromTo, showCitySelector, hideCitySelector, fetchCityData, setSelectedCity, showDateSelector, hideDateSelector, setDepartDate,toggleHighSpeed } from "./redux/actions";

function App(props) {
    const { from, to, dispatch, isCitySelectorVisible, cityData, isLoadingCityData, departDate, isDateSelectorVisible,highSpeed } = props;
    const onBack = useCallback(() => {
        window.history.back()
    }, [])
    //用bindActionCreators 简化下列代码
    // //让子组件来派发，触发redux数据更新
    // const doExchangeFromTo = useCallback(() => {
    //     dispatch(exchangeFromTo());
    // }, [])
    // const doShowCitySelector = useCallback(() => {
    //     dispatch(showCitySelector());
    // }, [])
    //用bindActionCreators将dispatch将对应的actsion绑定。替代上面的两个useCallback
    const callBacks = useMemo(() => bindActionCreators({
        exchangeFromTo,
        showCitySelector
    }, dispatch), [])
    const citySelectorCallBacks = useMemo(() => bindActionCreators({
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity
    }, dispatch), [])
    const departDateCallBacks = useMemo(() => bindActionCreators({
        onClick: showDateSelector
    }, dispatch), []);
    //日期选择
    const dateSelectorCallBacks = useMemo(() => bindActionCreators({
        onBack: hideDateSelector
    }, dispatch), [])
    const onSelectDate = useCallback((day) => {
        if(!day)return //无效的时间
        if(day < h0)return //过去 时间
        dispatch(setDepartDate(day));
        dispatch(hideDateSelector(day));
    }, []);
    const highSpeedCallBacks = useMemo(()=>bindActionCreators({
        toggle:toggleHighSpeed
    },dispatch),[]);
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <form action="./query.html" className="form">
                <Journey from={from} to={to}
                    // exchangeFromTo={doExchangeFromTo}
                    // showCitySelector={doShowCitySelector}
                    {...callBacks}
                />
                <DepartDate time={departDate} {...departDateCallBacks} />
                <HighSpeed highSpeed={highSpeed} {...highSpeedCallBacks}/>
                <Submit />
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCallBacks}
            />
            <DateSelector show={isDateSelectorVisible} {...dateSelectorCallBacks} onSelect={onSelectDate}/>
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