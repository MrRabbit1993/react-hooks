import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import URI from "urijs";
import dayjs from "dayjs";
import "./index.css"
import ScheduleRow from "./../scheduleRow"
const Schedule = memo(function Schedule(props) {
    const {
        date,
        trainNumber,
        departStation,
        arriveStation
    } = props;
    const [scheduleList, setScheduleList] = useState([]);
    useEffect(() => {
        const url = new URI('/rest/schedule').setSearch('trainNumber', trainNumber).setSearch('departStation', departStation)
            .setSearch('arriveStation', arriveStation).setSearch('date', dayjs(date).format('YYYY-MM-DD')).toString();
        fetch(url).then(response => response.json()).then(result => {
            let departRow;
            let arriveRow;
            for (let i = 0; i < result.length; i++) {
                if (!departRow) {
                    if (result[i].station === departStation) {//出发站
                        departRow = Object.assign(result[i], {
                            beforeDepartStation: false,
                            isDepartStation: true,
                            afterArriveStation: false,
                            isArriveStation: false
                        })
                    } else {
                        Object.assign(result[i], {
                            beforeDepartStation: true,
                            isDepartStation: false,
                            afterArriveStation: false,
                            isArriveStation: false
                        })
                    }
                } else if (!arriveRow) {
                    if (result[i].station === arriveStation) {//到达站
                        arriveRow = Object.assign(result[i], {
                            beforeDepartStation: false,
                            isDepartStation: false,
                            afterArriveStation: false,
                            isArriveStation: true
                        })
                    } else {
                        Object.assign(result[i], {
                            beforeDepartStation: false,
                            isDepartStation: false,
                            afterArriveStation: false,
                            isArriveStation: false
                        })
                    }
                } else {
                    Object.assign(result[i], {
                        beforeDepartStation: false,
                        isDepartStation: false,
                        afterArriveStation: true,
                        isArriveStation: false
                    });
                }
                Object.assign(result[i], {
                    isStartStation: i === 0,
                    isEndStation: i === result.length - 1,
                });
            }
            setScheduleList(result)
        })
    }, [date, trainNumber, departStation, arriveStation])
    return (
        <div className="schedule">
            <div className="dialog">
                <h1>列车时刻表</h1>
                <div className="head">
                    <div className="station">车站</div>
                    <div className="deptime">到达</div>
                    <div className="arrtime">发车</div>
                    <div className="stoptime">停留时间</div>
                </div>
                <ul>
                    {
                        scheduleList.map((schedule, index) => {
                            return <ScheduleRow key={schedule.station} index={index + 1} {...schedule} />
                        })
                    }
                </ul>
            </div>
        </div>
    )
})
Schedule.propTypes = {
    date: PropTypes.number.isRequired,
    trainNumber: PropTypes.string.isRequired,
    departStation: PropTypes.string.isRequired,
    arriveStation: PropTypes.string.isRequired
}
export default Schedule;