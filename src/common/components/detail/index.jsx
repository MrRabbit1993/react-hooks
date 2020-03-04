import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./index.css";
function format(d) {
    const date = dayjs(d);
    return date.format('MM-DD') + " " + date.locale('zh-cn').format('ddd');
}
const Deatil = memo(function Deatil(props) {
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        durationStr,
        trainNumber,
        toggleIsScheduleVisible
    } = props;
    const departDateStr = useMemo(() => format(departDate), [departDate]);
    const arriveDateStr = useMemo(() => format(arriveDate), [arriveDate]);
    return (
        <div className="detail">
            <div className="content">
                <div className="left">
                    <div className="city">{departStation}</div>
                    <div className="time">{departTimeStr}</div>
                    <div className="date">{departDateStr}</div>
                    <div></div>
                </div>
                <div className="middle">
                    <p className="train-name">{trainNumber}</p>
                    <p className="train-mid">
                        <span className="left"></span>
                        <span className="schedule" onClick={() => toggleIsScheduleVisible()}>时刻表</span>
                        <span className="right"></span>
                    </p>
                    <span className="train-time">耗时{durationStr}</span>
                </div>
                <div className="right">
                    <div className="city">{arriveStation}</div>
                    <div className="time">{arriveTimeStr}</div>
                    <div className="date">{arriveDateStr}</div>
                </div>
            </div>
        </div>
    )
})
Deatil.propTypes = {
    departDate: PropTypes.number.isRequired,
    arriveDate: PropTypes.number.isRequired,
    departTimeStr: PropTypes.string,
    arriveTimeStr: PropTypes.string,
    departStation: PropTypes.string.isRequired,
    arriveStation: PropTypes.string.isRequired,
    durationStr: PropTypes.string,
    trainNumber: PropTypes.string.isRequired
}
export default Deatil;