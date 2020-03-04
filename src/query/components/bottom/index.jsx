import React, { useState,useMemo,useReducer } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.css';
import { ORDER_DEPART } from '../../redux/constants';
import ButtomModal from './../bottomModal';
function Buttom(props) {
    const {
        toggleOrderType,
        toggleHighSpeed,
        toggleOnlyTickets,
        toggleIsFiltersVisible,
        isFiltersVisible,
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
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
    } = props;
    const noChecked = useMemo(() => Object.keys(checkedTicketTypes).length === 0
        && Object.keys(checkedTrainTypes).length === 0
        && Object.keys(checkedArriveStations).length === 0
        && Object.keys(checkedDepartStations).length === 0
        && departTimeStart === 0
        && departTimeEnd === 24
        && arriveTimeStart === 0
        && arriveTimeEnd === 24, [checkedTicketTypes, checkedTrainTypes,
        checkedArriveStations, checkedDepartStations, departTimeStart,
        departTimeEnd, arriveTimeStart, arriveTimeEnd
    ]);
    return (
        <div className="bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    {orderType === ORDER_DEPART ? '出发 早⇀晚' : '耗时 短⇀长'}
                </span>
                <span
                    className={classnames('item', {
                        'item-on': highSpeed,
                    })}
                    onClick={toggleHighSpeed}
                >
                    <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
                    只看高铁动车
                </span>
                <span
                    className={classnames('item', {
                        'item-on': onlyTickets,
                    })}
                    onClick={toggleOnlyTickets}
                >
                    <i className="icon">{highSpeed ? '\uf43d' : '\uf43c'}</i>
                    只看有票
                </span>
                <span
                    className={classnames('item', {
                        'item-on': isFiltersVisible||!noChecked,
                    })}
                    onClick={toggleIsFiltersVisible}
                >
                    <i className="icon">{noChecked?'\uf0f7':"\uf446"}</i>
                    综合筛选
                </span>
            </div>
            {isFiltersVisible ? (
                <ButtomModal
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
                    setCheckedTicketTypes={setCheckedTicketTypes}
                    setCheckedTrainTypes={setCheckedTrainTypes}
                    setCheckedDepartStations={setCheckedDepartStations}
                    setCheckedArriveStations={setCheckedArriveStations}
                    setDepartTimeStart={setDepartTimeStart}
                    setDepartTimeEnd={setDepartTimeEnd}
                    setArriveTimeStart={setArriveTimeStart}
                    setArriveTimeEnd={setArriveTimeEnd}
                    toggleIsFiltersVisible={toggleIsFiltersVisible}
                />
            ) : null}
        </div>
    );
}
Buttom.propTypes = {
    toggleOrderType: PropTypes.func.isRequired,
    toggleHighSpeed: PropTypes.func.isRequired,
    toggleOnlyTickets: PropTypes.func.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
    isFiltersVisible: PropTypes.bool.isRequired,
    highSpeed: PropTypes.bool.isRequired,
    orderType: PropTypes.number.isRequired,
    onlyTickets: PropTypes.bool.isRequired,
    checkedTicketTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,
    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
};
export default Buttom;
