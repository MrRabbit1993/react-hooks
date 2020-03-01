import React from "react";
import Proptypes from "prop-types";
import Day from "./../day";
function Week(props) {
    const { days, onSelect } = props;
    return (
        <tr className="date-table-days">
            {days.map((day,idx) => {
                return <Day key={idx} day={day} onSelect={onSelect}/>
            })}
        </tr>
    )
}
Week.propTypes = {
    days: Proptypes.array.isRequired,
    onSelect: Proptypes.func.isRequired
}
export default Week;