import React, { memo } from "react";
import PropTypes from "prop-types";
import "./index.css";
const Passenger = memo(function Passenger(props) {
    const {id } = props;
    return <li>{id}</li>
})
Passenger.propTypes = {
    // passengers: PropTypes.array.isRequired
}
export default Passenger;