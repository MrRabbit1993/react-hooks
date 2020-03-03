import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Option from "./../option"

const ButtomModal = memo(function ButtomModal(props) {
    const {
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd,
        toggleIsFiltersVisible,
    } = props;
    //使用函数优化性能
    const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => {//本地坐席
        return { ...checkedTicketTypes }
    });
    const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => {//车次类型
        return { ...checkedTrainTypes }
    });
    const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(() => {//本地出发车站
        return { ...checkedDepartStations }
    });
    const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(() => {//本地到达车站
        return { ...checkedArriveStations }
    });
    const optionGroup = [
        {
            title: "坐席类型",
            options: ticketTypes,
            // checkedMap: checkedTicketTypes
            checkedMap: localCheckedTicketTypes,//使用缓存区的数据，而不是用redux
            update:setLocalCheckedTicketTypes
        },
        {
            title: "车次类型",
            options: trainTypes,
            // checkedMap: checkedTrainTypes
            checkedMap: localCheckedTrainTypes,//使用缓存区的数据，而不是用redux
            update:setLocalCheckedTrainTypes
        },
        {
            title: "出发车站",
            options: departStations,
            // checkedMap: checkedDepartStations
            checkedMap: localCheckedDepartStations,//使用缓存区的数据，而不是用redux
            update:setLocalCheckedDepartStations
        },
        {
            title: "到达车站",
            options: arriveStations,
            // checkedMap: checkedArriveStations
            checkedMap: localCheckedArriveStations,//使用缓存区的数据，而不是用redux
            update:setLocalCheckedArriveStations
        },
    ]
    return (
        <div className="bottom-modal">
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    <div className="title">
                        <span className="rest">重置</span>
                        <span className="ok">确定</span>
                    </div>
                    <div className="options">
                        {optionGroup.map(group => <Option key={group.title} {...group} />)}
                    </div>
                </div>
            </div>
        </div>
    );
});
ButtomModal.protoTypes = {
    checkedTicketTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriveStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arriveTimeStart: PropTypes.number.isRequired,
    arriveTimeEnd: PropTypes.number.isRequired,
    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriveStations: PropTypes.array.isRequired,
    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriveStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArriveTimeStart: PropTypes.func.isRequired,
    setArriveTimeEnd: PropTypes.func.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
};
export default ButtomModal;
