"use strict";
module.exports = (arr, key) => {
    let isValid = true;
    let keyMap = [];
    if (Array.isArray(arr) && arr.length > 1) {
        arr.forEach(el => {
            if (typeof el === 'object'
                && Object.keys(el).includes(key)) {
                if (keyMap.includes(el[key])) {
                    isValid = false;
                }
                else {
                    keyMap.push(el[key]);
                }
                ;
            }
            else {
                isValid = false;
            }
            ;
        });
    }
    ;
    return isValid;
};
