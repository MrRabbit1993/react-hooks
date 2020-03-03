import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Option = memo(function Option(props) {
    const { title, options, checkMap } = props;
    return (
        <div className="option">
            <h3>{title}</h3>
            <ul>
                {options.map(option => {
                    return;
                })}
            </ul>
        </div>
    );
});
Option.protoTypes = {};
export default Option;
