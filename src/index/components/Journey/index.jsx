import React from "react";
import PropTypes from "prop-types";
import "./index.css";

import switchImg from "./../../imgs/switch.svg"

function Journey(props) {
    const { from, to, exchangeFromTo, showCitySelector } = props;
    return (
        <div className="journey">
            <div className="journey-station" onClick={() => showCitySelector(true)}>
                <input type="text" readOnly name="from" value={from} className="journey-input journey-from" />
            </div>
            <div className="journey-switch" onClick={exchangeFromTo}>
                <img src={switchImg} width="70" height="40" alt="switch"></img>
            </div>
            <div className="journey-station" onClick={() => showCitySelector(false)}>
                <input type="text" readOnly name="to" value={to} className="journey-input journey-to" />
            </div>
        </div>
    )
}
Journey.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    exchangeFromTo: PropTypes.func.isRequired,
    showCitySelector: PropTypes.func.isRequired
}
export default Journey;