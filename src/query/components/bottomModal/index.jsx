import React, { memo, useState } from 'react';
import classnames from "classnames";
import PropTypes from 'prop-types';
import Option from "./../option";
import Slider from "./../Slider";
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
    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart)//开始起点时间缓存区
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd)//开始结束时间缓存区
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart)//终点起点时间缓存区
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd)//终点结束时间缓存区
    const optionGroup = [
        {
            title: "坐席类型",
            options: ticketTypes,
            // checkedMap: checkedTicketTypes
            checkedMap: localCheckedTicketTypes,//使用缓存区的数据，而不是用redux
            update: setLocalCheckedTicketTypes
        },
        {
            title: "车次类型",
            options: trainTypes,
            // checkedMap: checkedTrainTypes
            checkedMap: localCheckedTrainTypes,//使用缓存区的数据，而不是用redux
            update: setLocalCheckedTrainTypes
        },
        {
            title: "出发车站",
            options: departStations,
            // checkedMap: checkedDepartStations
            checkedMap: localCheckedDepartStations,//使用缓存区的数据，而不是用redux
            update: setLocalCheckedDepartStations
        },
        {
            title: "到达车站",
            options: arriveStations,
            // checkedMap: checkedArriveStations
            checkedMap: localCheckedArriveStations,//使用缓存区的数据，而不是用redux
            update: setLocalCheckedArriveStations
        },
    ]
    const sure = () => {
        setCheckedTicketTypes(localCheckedTicketTypes);//提交车票类型redux
        setCheckedTrainTypes(localCheckedTrainTypes);//提交车次类型 redux
        setCheckedDepartStations(localCheckedDepartStations);//提交出发车站
        setCheckedArriveStations(localCheckedArriveStations);//提交到达车站
        setDepartTimeStart(localDepartTimeStart);//提交时间开始
        setDepartTimeEnd(localDepartTimeEnd);//提交起始站结束时间
        setArriveTimeStart(localArriveTimeStart);//提交终点站开始时间
        setArriveTimeEnd(localDepartTimeEnd);//提交终点站结束时间
        toggleIsFiltersVisible();//关闭浮层
    }
    const isResetDisabled = Object.keys(localCheckedTicketTypes).length === 0
        && Object.keys(localCheckedTrainTypes).length === 0
        && Object.keys(localCheckedArriveStations).length === 0
        && Object.keys(localCheckedDepartStations).length === 0
        && localDepartTimeStart === 0
        && localDepartTimeEnd === 24
        && localArriveTimeStart === 0
        && localArriveTimeEnd === 24;
    const reset = () => {
        setLocalCheckedTicketTypes({});//修改缓存区的坐席
        setLocalCheckedTrainTypes({});//修改缓存区车型
        setLocalCheckedDepartStations({});//修改缓存区起始站
        setLocalCheckedArriveStations({});//修改缓存区到达车站
        setLocalDepartTimeStart(0);//修改缓存区时间开始
        setLocalDepartTimeEnd(24);//修改缓存区起始站结束时间
        setLocalArriveTimeStart(0);//修改缓存区终点站开始时间
        setLocalArriveTimeEnd(24);//修改缓存区终点站结束时间
    }
    return (
        <div className="bottom-modal">
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    <div className="title">
                        <span className={classnames('rest', {
                            disabled: isResetDisabled
                        })} onClick={reset}>重置</span>
                        <span className="ok" onClick={sure}>确定</span>
                    </div>
                    <div className="options">
                        {optionGroup.map(group => <Option key={group.title} {...group} />)}
                        <Slider title="出发时间"
                            currentStartHours={localDepartTimeStart}
                            currentEndHours={localDepartTimeEnd}
                            onStartChange={setLocalDepartTimeStart}
                            onEndChange={setLocalDepartTimeEnd}
                        />
                        <Slider title="到达时间"
                            currentStartHours={localArriveTimeStart}
                            currentEndHours={localArriveTimeEnd}
                            onStartChange={setLocalArriveTimeStart}
                            onEndChange={setLocalArriveTimeEnd}
                        />
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
