import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Filter = memo(function Filter(props) {
    const { name, options, checkMap } = props;
    return <li className="Filter"></li>;
});
Filter.protoTypes = {};
export default Filter;
