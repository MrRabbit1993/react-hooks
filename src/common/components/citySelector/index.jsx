import React, { useState, useMemo, useEffect, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './indx.css';
import CityList from './../cityList';
const CitySelector = memo(function CitySelector(props) {
    const {
        show,
        cityData,
        isLoading,
        onBack,
        fetchCityData,
        onSelect,
    } = props;

    const [searchKey, setSearchKey] = useState('');

    const key = useMemo(() => searchKey.trim(), [searchKey]);

    useEffect(() => {
        if (!show || cityData || isLoading) return;
        fetchCityData();
    }, [show, cityData, isLoading]);

    const toAlpha = useCallback(alpha => {
        //滚动
        // document.querySelector(`[date-cate='${alpha}']`).scrollIntoView()
        document.querySelector(`#${alpha}`).scrollIntoView();
    }, []);

    //生成一个函数
    const outputCitySections = () => {
        if (isLoading) {
            return <div>loading</div>;
        }
        if (cityData) {
            return (
                <CityList
                    sections={cityData.cityList}
                    onSelect={onSelect}
                    toAlpha={toAlpha}
                ></CityList>
            );
        }
        return <div>error</div>;
    };
    return (
        <div className={classnames('city-selector', { hidden: !show })}>
            <div className="city-search">
                <div className="search-back" onClick={() => onBack()}>
                    <svg width="42" height="42">
                        <polyline
                            points="25,13 16,21 25,29"
                            stroke="#fff"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={searchKey}
                        className="search-input"
                        placeholder="城市、车站的中文或拼音"
                        onChange={e => setSearchKey(e.target.value)}
                    />
                </div>
                <i
                    className={classnames('search-clean', {
                        hidden: key.length === 0,
                    })}
                    onClick={() => setSearchKey('')}
                >
                    &#xf063;
                </i>
            </div>
            {outputCitySections()}
        </div>
    );
});
CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    fetchCityData: PropTypes.func.isRequired,
    cityData: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
};
export default CitySelector;
