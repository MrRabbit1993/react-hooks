import React, { memo } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./index.css";
import MenuItem from "./../MenuItem";
const Menu = memo(function Menu(props) {
    const { show, options, onPress, hideMenu } = props;
    return (
        <div>
            {show && <div className="menu-mask" onClick={() => hideMenu()}>
                <div className={classnames('menu', { show })}>
                    <div className="menu-title"></div>
                    <ul>
                        {options && options.map(option => {
                            return <MenuItem {...option} key={option.value} onPress={onPress} />
                        })}
                    </ul>
                </div>
            </div>
            }
        </div>
    )
})
Menu.propTypes = {
    show: PropTypes.bool.isRequired,
    options: PropTypes.array,
    onPress: PropTypes.func,
    hideMenu: PropTypes.func.isRequired
}
export default Menu;