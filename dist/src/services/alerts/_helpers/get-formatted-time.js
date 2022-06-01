"use strict";
module.exports = (inputTz, timeFormat) => {
    let inputDate = new Date().getTime();
    const formatAmPm = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };
    inputTz = inputTz ? inputTz : "GMT-0500";
    const defaultTz = -5;
    const tzCheck = inputTz.substring(3, 8);
    const tz = (tzCheck == 0) ? 0 : parseInt(tzCheck.replace(/^0+|0+$/g, ""));
    const tzDifference = tz - defaultTz;
    const tzOffset = (tzDifference * 60);
    inputDate = new Date(inputDate).getTime();
    const converted = new Date(inputDate + (60000 * (tzOffset)));
    const year = converted.getFullYear().toString().substring(2, 4);
    const month = converted.getMonth() + 1;
    const day = converted.getDate();
    let time = timeFormat === 12 ? formatAmPm(converted) : converted.toString().substring(16, 21);
    return `${month}/${day}/${year} ${time}`;
};
