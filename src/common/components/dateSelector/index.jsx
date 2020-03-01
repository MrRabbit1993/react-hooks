import React from "react";
import Proptypes from "prop-types";
import classnames from "classnames";
import "./index.css";
import Header from "./../Header";
function DateSelector(props) {
    const { show, onSelect, onBack } = props;
    return (
        <div className={classnames('date-selector', {
            hidden: !show
        })}>
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables"></div>
        </div>
    )
}
DateSelector.propTypes = {
    show: Proptypes.bool.isRequired,
    onSelect: Proptypes.func.isRequired,
    onBack: Proptypes.func.isRequired
}
export default DateSelector;