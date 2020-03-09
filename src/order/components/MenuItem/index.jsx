import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
const MenuItem = memo(function MenuItem(props) {
    const { onPress, title, value, active } = props;
    return (
        <li className={classnames({ active })} onClick={() => onPress(value)}>
            {title}
        </li>
    );
});
MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool.isRequired,
    onPress: PropTypes.func,
};
export default MenuItem;
