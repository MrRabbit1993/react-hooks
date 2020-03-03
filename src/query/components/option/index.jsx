import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Filter from "./../filter"
const Option = memo(function Option(props) {
    const { title, options, checkedMap, update } = props;
    const toggle = useCallback((value) => {
        const newcheckedMap = { ...checkedMap };
        if (value in checkedMap) {
            delete newcheckedMap[value];
        } else {
            newcheckedMap[value] = true;
        }
        // newcheckedMap = {
        //     1:true,
        //     2:true
        // }
        update(newcheckedMap);//更新useState里面的数据
    }, [checkedMap, update])
    return (
        <div className="option">
            <h3>{title}</h3>
            <ul>
                {options.map(option => {
                    return <Filter key={option.value} {...option} checked={option.value in checkedMap} toggle={toggle} />
                })}
            </ul>
        </div>
    );
});
Option.protoTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    checkMap: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
};
export default Option;
