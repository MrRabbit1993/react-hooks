import React from "react";
import Proptypes from "prop-types";
import classNames from "classnames";
import { h0 } from "./../../units/fp";
function Day(props) {
    const { day, onSelect } = props;
    if (!day) {
        return <td className="null"></td>
    }
    const classes = [];
    const now = h0();
    if (day < now) {//过去的时间
        classes.push('disabled')
    }
    if ([6, 0].includes(new Date(day).getDay())) {//周六或者周日
        classes.push('weekend')
    }
    const dateString = now === day ? "今天" : new Date(day).getDate();
    return (
        <td className={classNames(classes)} onClick={() => onSelect(day)}>{dateString}</td>
    )
}
Day.propTypes = {
    day: Proptypes.number,
    onSelect: Proptypes.func.isRequired
}
export default Day;