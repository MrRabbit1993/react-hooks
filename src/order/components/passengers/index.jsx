import React, { memo } from "react";
import PropTypes from "prop-types";
import "./index.css";
import Passenger from "./../passenger"
const Passengers = memo(function Passengers(props) {
    const { passengers, createAdult, createChild,removePassenger,updatePassenger } = props;
    return (
        <div className="passengers">
            <ul>
                {
                    passengers.map(passenger => {
                        return <Passenger {...passenger} key={passenger.id} onRemove={removePassenger} onUpdate={updatePassenger}/>
                    })
                }
            </ul>
            <section className="add">
                <div className="adult" onClick={()=>createAdult()}>添加成人</div>
                <div className="child" onClick={()=>createChild()}>添加儿童</div>
            </section>
        </div>
    )
})
Passengers.propTypes = {
    passengers: PropTypes.array.isRequired,
    createAdult: PropTypes.func.isRequired,
    createChild: PropTypes.func.isRequired,
    removePassenger: PropTypes.func.isRequired,
    updatePassenger: PropTypes.func.isRequired,
}
export default Passengers;