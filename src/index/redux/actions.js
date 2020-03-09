import * as ActionTypes from './constants';

//设置起始站
export function setFrom(from) {
    return {
        type: ActionTypes.ACTION_SET_FROM,
        payload: from,
    };
}
//设置终点站
export function setTo(to) {
    return {
        type: ActionTypes.ACTION_SET_TO,
        payload: to,
    };
}
//设置遮罩层
export function setIsLoadingCityData(isLoadingCityData) {
    return {
        type: ActionTypes.ACTION_SET_IS_LOADING_CITY_DATA,
        payload: isLoadingCityData,
    };
}
//设置城市
export function setCityData(cityData) {
    return {
        type: ActionTypes.ACTION_SET_CITY_DATA,
        payload: cityData,
    };
}
//切换只看动车
export function toggleHighSpeed() {
    return (dispatch, getState) => {
        const { highSpeed } = getState();
        dispatch({
            type: ActionTypes.ACTION_SET_HIGH_SPEED,
            payload: !highSpeed,
        });
    };
}
//打开选择城市
export function showCitySelector(currentSelectingLeftCity) {
    return dispatch => {
        dispatch({
            type: ActionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
            payload: true,
        });

        dispatch({
            type: ActionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
            payload: currentSelectingLeftCity,
        });
    };
}
//关闭选择城市
export function hideCitySelector() {
    return {
        type: ActionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
        payload: false,
    };
}
//选择城市后回填数据
export function setSelectedCity(city) {
    return (dispatch, getState) => {
        const { currentSelectingLeftCity } = getState();
        //选择左边就把数据补充到左侧，反之右侧
        currentSelectingLeftCity
            ? dispatch(setFrom(city))
            : dispatch(setTo(city));
        //在关闭城市选择浮层
        dispatch(hideCitySelector());
    };
}
//开启选择日期浮层
export function showDateSelector() {
    return {
        type: ActionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: true,
    };
}
//关闭日期选择浮层
export function hideDateSelector() {
    return {
        type: ActionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
        payload: false,
    };
}
//交换起始站与终点站
export function exchangeFromTo() {
    return (dispatch, getState) => {
        const { from, to } = getState();
        dispatch(setFrom(to));
        dispatch(setTo(from));
    };
}
//设置时间
export function setDepartDate(departDate) {
    return {
        type: ActionTypes.ACTION_SET_DEPART_DATE,
        payload: departDate,
    };
}
//异步请求数据
export function fetchCityData() {
    return (dispatch, getState) => {
        const { isLoadingCityData } = getState();
        if (isLoadingCityData) return;
        const cacheData = JSON.parse(
            localStorage.getItem('city_data_cache') || '{}'
        );
        if (Date.now() < cacheData.expires) {
            //验证过期
            dispatch(setCityData(cacheData.data));
            return;
        }
        dispatch(setIsLoadingCityData(true)); //将loading设置为true
        fetch(`/rest/cities?_${Date.now()}`)
            .then(response => response.json())
            .then(cityData => {
                dispatch(setCityData(cityData)); //更新城市数据
                localStorage.setItem(
                    'city_data_cache',
                    JSON.stringify({
                        expires: Date.now() + 600 * 1000,
                        data: cityData,
                    }) //10分钟缓存
                );
                dispatch(setIsLoadingCityData(false)); //取消loading加载
            })
            .catch(err => {
                dispatch(setIsLoadingCityData(false));
            });
    };
}
