import React, { useMemo } from 'react';
import PropTyps from 'prop-types';
import dayjs from 'dayjs';

import './index.css';

import { h0 } from './../../../common/units/fp';

function DepartDate(props) {
    const { time, onClick } = props;
    const h0ofDepar = h0(time); //取掉小时分钟秒毫秒
    const departDate = new Date(h0ofDepar);
    const departDateString = useMemo(() => dayjs(time).format('YYYY-MM-DD'), [
        h0ofDepar,
    ]);
    const isTodaye = h0ofDepar === h0();
    const weekString =
        '周' +
        ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] +
        (isTodaye ? '(今天)' : '');
    return (
        <div className="depart-date" onClick={onClick}>
            <input type="hidden" name="date" value={departDateString} />
            {departDateString}
            <span className="depart-week">{weekString}</span>
        </div>
    );
}
DepartDate.propTyps = {
    time: PropTyps.number.isRequired,
    onClick: PropTyps.func.isRequired,
};
export default DepartDate;
