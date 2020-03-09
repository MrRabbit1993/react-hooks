import React, { memo, useState, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';
import './index.css';
import useWinSize from './../../../common/customHooks/useWinSize';
const Slider = memo(function Slider(props) {
    const {
        title,
        currentStartHours,
        currentEndHours,
        onStartChange,
        onEndChange,
    } = props;
    const winSeize = useWinSize(); //调取浏览器缩放的hooks ，计算宽度的时候会调取
    const startHandle = useRef(); //左边滑块
    const endHandle = useRef(); //右边边滑块
    const lastStartX = useRef(); //记录第一个元素的坐标
    const lastEndX = useRef(); //记录第二个元素的坐标
    const range = useRef(); //滑块
    const rangeWidth = useRef();
    const prevCurrentStartHours = useRef(currentStartHours); //记录上一次的值
    const preCurrentEndHours = useRef(currentEndHours); //记录上一次的值
    const [start, setStart] = useState(() => (currentStartHours / 24) * 100);
    const [end, setEnd] = useState(() => (currentEndHours / 24) * 100);
    if (prevCurrentStartHours.current !== currentStartHours) {
        //上次的值与现在不等
        setStart((currentStartHours / 24) * 100); //更新start
        prevCurrentStartHours.current = currentStartHours;
    }
    if (preCurrentEndHours.current !== currentEndHours) {
        //上次的值与现在不等
        setEnd((currentEndHours / 24) * 100); //更新start
        preCurrentEndHours.current = currentEndHours;
    }

    const startPercent = useMemo(() => {
        //防止出现101 或者-1
        if (start > 100) return 100;
        if (start < 0) return 0;
        return start;
    }, [start]);

    const endPercent = useMemo(() => {
        if (end > 100) return 100;
        if (end < 0) return 0;
        return end;
    }, [end]);
    const startHours = useMemo(() => Math.round((startPercent * 24) / 100), [
        startPercent,
    ]); //百分比转换成小时
    const endHours = useMemo(() => Math.round((endPercent * 24) / 100), [
        endPercent,
    ]); //百分比转换成小时
    const startText = useMemo(() => leftPad(startHours, 2, '0') + ':00', [
        startHours,
    ]); //带分钟
    const endText = useMemo(() => leftPad(endHours, 2, '0') + ':00', [
        endHours,
    ]); //带分钟
    useEffect(() => {
        //计算滑块可以滑动的宽度 。需要依赖浏览器缩放
        rangeWidth.current = parseFloat(
            window.getComputedStyle(range.current).width
        );
    }, [winSeize.width]);
    useEffect(() => {
        startHandle.current.addEventListener(
            'touchstart',
            onStartTouchBegin,
            false
        ); //绑定事件
        startHandle.current.addEventListener(
            'touchmove',
            onStartTouchMove,
            false
        ); //绑定事件
        endHandle.current.addEventListener(
            'touchstart',
            onEndTouchBegin,
            false
        ); //绑定事件
        endHandle.current.addEventListener('touchmove', onEndTouchMove, false); //绑定事件
        return () => {
            startHandle.current.removeEventListener(
                'touchstart',
                onStartTouchBegin,
                false
            ); //绑定事件
            startHandle.current.removeEventListener(
                'touchmove',
                onStartTouchMove,
                false
            ); //绑定事件
            endHandle.current.removeEventListener(
                'touchstart',
                onEndTouchBegin,
                false
            ); //绑定事件
            endHandle.current.removeEventListener(
                'touchmove',
                onEndTouchMove,
                false
            ); //绑定事件
        };
    });
    useEffect(() => {
        onStartChange(startHours); //当时间变了，修改本地的时间，当前还没更新redux
    }, [startHours]);
    useEffect(() => {
        onEndChange(endHours);
    }, [endHours]);
    function onStartTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastStartX.current = touch.pageX;
    }
    function onEndTouchBegin(e) {
        const touch = e.targetTouches[0];
        lastEndX.current = touch.pageX;
    }
    function onStartTouchMove(e) {
        //左侧滑块移动事件
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastStartX.current;
        lastStartX.current = touch.pageX;
        setStart(start => start + (distance / rangeWidth.current) * 100); //设置开始的位置（百分比）
    }
    function onEndTouchMove(e) {
        //右侧滑块移动事件
        const touch = e.targetTouches[0];
        const distance = touch.pageX - lastEndX.current;
        lastEndX.current = touch.pageX;
        setEnd(end => end + (distance / rangeWidth.current) * 100); //设置开始的位置（百分比）
    }
    return (
        <div className="option">
            <h3>{title}</h3>
            <div className="range-slider">
                <div className="slider" ref={range}>
                    <div
                        className="slider-range"
                        style={{
                            left: startPercent + '%',
                            width: endPercent - startPercent + '%',
                        }}
                    ></div>
                    <i
                        className="slider-handle"
                        ref={startHandle}
                        style={{
                            left: startPercent + '%',
                        }}
                    >
                        <span>{startText}</span>
                    </i>
                    <i
                        className="slider-handle"
                        ref={endHandle}
                        style={{
                            left: endPercent + '%',
                        }}
                    >
                        <span>{endText}</span>
                    </i>
                </div>
            </div>
        </div>
    );
});
Slider.propTypes = {
    title: PropTypes.string.isRequired,
    currentStartHours: PropTypes.number.isRequired,
    currentEndHours: PropTypes.number.isRequired,
    onStartChange: PropTypes.func.isRequired,
    onEndChange: PropTypes.func.isRequired,
};
export default Slider;
