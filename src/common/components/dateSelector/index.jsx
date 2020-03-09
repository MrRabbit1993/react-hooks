import React from 'react';
import Proptypes from 'prop-types';
import classnames from 'classnames';
import './index.css';
import Header from './../Header';
import Month from './../month';
function DateSelector(props) {
    const { show, onSelect, onBack } = props;
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);
    const monthSequence = [now.getTime()];
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());
    return (
        <div
            className={classnames('date-selector', {
                hidden: !show,
            })}
        >
            <Header title="日期选择" onBack={onBack} />
            <div className="date-selector-tables">
                {monthSequence.map(month => {
                    return (
                        <Month
                            key={month}
                            startingTimeInMonth={month}
                            onSelect={onSelect}
                        />
                    );
                })}
            </div>
        </div>
    );
}
DateSelector.propTypes = {
    show: Proptypes.bool.isRequired,
    onSelect: Proptypes.func.isRequired,
    onBack: Proptypes.func.isRequired,
};
export default DateSelector;
