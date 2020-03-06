import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./index.css"
import Seat from "./../seat"
const Candidate = memo(function Candidate(props) {
    const { tickets } = props;
    const [expandedIndex, setExpandedIndex] = useState(-1);//默认收起
    const toggle = useCallback((idx) => {
        setExpandedIndex(idx === expandedIndex ? -1 : idx);//收起展开
    }, [expandedIndex])
    return (
        <div className="candidate">
            <ul>
                {
                    tickets.map((ticket, idx) => {
                        return <Seat expanded={expandedIndex === idx} idx={idx} {...ticket} key={ticket.type} toggle={toggle} />
                    })
                }
            </ul>
        </div>
    )
})
Candidate.propTypes = {
    tickets: PropTypes.array
}
export default Candidate;