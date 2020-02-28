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

import { exchangeFromTo, showCitySelector,hideCitySelector,fetchCityData } from "./redux/actions";

function App(props) {
    const { from, to, dispatch, isCitySelectorVisible, cityData, isLoadingCityData } = props;
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
    const citySelectorCallBacks = useMemo(()=>bindActionCreators({
        onBack:hideCitySelector,
        fetchCityData
    },dispatch),[])
    return (
        <div>
            <div className="header-wrapper">
                <Header title="火车票" onBack={onBack} />
            </div>
            <form className="form">
                <Journey from={from} to={to}
                    // exchangeFromTo={doExchangeFromTo}
                    // showCitySelector={doShowCitySelector}
                    {...callBacks}
                />
                <DepartDate />
                <HighSpeed />
                <Submit />
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...citySelectorCallBacks}
            />
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