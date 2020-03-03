import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from "classnames";

const Filter = memo(function Filter(props) {
    const { name, checked, toggle, value } = props;
    return <li className={classnames({ checked })} onClick={() => toggle(value)}>{name}</li>;
});
Filter.protoTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
};
export default Filter;
