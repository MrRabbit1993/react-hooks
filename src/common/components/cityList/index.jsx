import React, { memo } from "react";
import PropTypes from "prop-types";

import "./index.css";
import CitySection from "./../citySection";

const CityList = memo(function CityList(props) {
    const { sections, onSelect } = props;
    return (
        <div className="city-list">
            <div className="city-cate">
                {sections.map(section => {
                    return (
                        <CitySection
                            key={section.title}
                            title={section.title}
                            onSelect={onSelect}
                            cities={section.citys}
                        />
                    )
                })}
            </div>
        </div>
    )
})
CityList.propTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
}
export default CityList;