import React, { memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import leftPad from "left-pad";
import "./index.css"
const ScheduleRow = memo(function ScheduleRow(props) {
    const {
        index,
        station,
        departTime,
        arriveTime,
        stay,
        isStartStation,
        isEndStation,
        isDepartStation,
        isArriveStation,
        beforeDepartStation,
        afterArriveStation
    } = props;
    return (
        <li className="">
            <div className={classnames('icon', {
                'icon-red': isArriveStation || isDepartStation
            })}>
                {isDepartStation ? "出" : isArriveStation ? '到' : leftPad(index, 2, 0)}
            </div>
            <div className={classnames('row', {
                gry: beforeDepartStation || afterArriveStation//之前的车站或者之后的车站
            })}>
                <span className={classnames('station', {
                    red: isArriveStation || isDepartStation//出发站或者到达站
                })}>{station}</span>
                <span className={classnames('arrtime', {
                    red: isArriveStation
                })}>{isArriveStation ? '始发站' : arriveTime}</span>
                <span className={classnames('depttime', {
                    red: isDepartStation
                })}>{isEndStation ? '终到站' : departTime}</span>
                <span className="stoptime">
                    {isStartStation || isEndStation ? '-' : stay + "分"}
                </span>
            </div>
        </li>
    )
})
ScheduleRow.propTypes = {
    // date: PropTypes.number.isRequired,
    // trainNumber: PropTypes.string.isRequired,
    // departStation: PropTypes.string.isRequired,
    // arriveStation: PropTypes.string.isRequired
}
export default ScheduleRow;