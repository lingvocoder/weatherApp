/**
 *
 * @param deg {number} Degree Celsius value which has to be converted
 * @return {number} Converted to degree Celsius value
 */
export const convertToCelsius = (deg) => {
    return roundNumber(((deg - 32) * 5) / 9, 0);
}
/**
 *
 * @param deg {number} Degree Celsius value which has to be converted
 * @return {number} Converted to fahrenheit value
 */
export const convertToFahrenheit = (deg) => {
    return roundNumber((deg * 9) / 5 + 32, 0);
}
/**
 *
 * @param pressure {number} Pressure hPa value which has to be converted
 * @return {number} Converted to mm Hg value
 */
export const convertToMhg = (pressure) => {
    return roundNumber(pressure / 1.33322, 0);
}
/**
 *
 * @param pressure {number} Pressure mm Hg value which has to be converted
 * @return {number} Converted to hPa value
 */
export const convertToHpa = (pressure) => {
    return roundNumber(pressure * 1.33322, 0);
}
/**
 *
 * @param speed {number} Speed value which on which Beaufort scale is based
 * @return {undefined|{strength: string, scale: number}} Object with 'strength' as a string and relevant rate
 */
export const defineWindStrength = (speed) => {
    switch (!isNaN(speed)) {
        case 0 <= speed && speed <= 0.2:
            return {
                strength: "calm",
                scale: 0
            };
        case 0.3 <= speed && speed <= 1.5:
            return {
                strength: "light air",
                scale: 1
            };
        case 1.6 <= speed && speed <= 3.3:
            return {
                strength: "light breeze",
                scale: 2
            };
        case 3.4 <= speed && speed <= 5.4:
            return {
                strength: "gentle breeze",
                scale: 3
            };
        case 5.5 <= speed && speed <= 7.9:
            return {
                strength: "moderate breeze",
                scale: 4
            };
        case 8 <= speed && speed <= 10.7:
            return {
                strength: "fresh breeze",
                scale: 5
            };
        case 10.8 <= speed && speed <= 13.8:
            return {
                strength: "strong breeze",
                scale: 6
            };
        case 13.9 <= speed && speed <= 17.1:
            return {
                strength: "high wind",
                scale: 7
            };
        case 17.2 <= speed && speed <= 20.7:
            return {
                strength: "gale",
                scale: 8
            };
        case 20.8 <= speed && speed <= 24.4:
            return {
                strength: "strong gale",
                scale: 9
            };
        case 24.5 <= speed && speed <= 28.4:
            return {
                strength: "storm",
                scale: 10
            };
        case 28.5 <= speed && speed <= 32.6:
            return {
                strength: "violent storm",
                scale: 11
            };
        case 33 < speed:
            return {
                strength: "hurricane",
                scale: 12
            };
        default:
            return undefined;
    }
}
/**
 *
 * @param deg {number} Degree value which helps to calculate the wind direction according to meteorological scale
 * @return {string|undefined} Direction as a string
 */
export const defineWindDirection = (deg) => {
    switch (!isNaN(deg)) {
        case 0 <= deg && deg <= 11:
            return "N";
        case 12 <= deg && deg <= 33:
            return "NNE";
        case 34 <= deg && deg <= 56:
            return "NE";
        case 57 <= deg && deg <= 78:
            return "ENE";
        case 79 <= deg && deg <= 101:
            return "E";
        case 102 <= deg && deg <= 123:
            return "ESE";
        case 124 <= deg && deg <= 146:
            return "SE";
        case 147 <= deg && deg <= 168:
            return "SSE";
        case 169 <= deg && deg <= 191:
            return "S";
        case 192 <= deg && deg <= 213:
            return "SSW";
        case 214 <= deg && deg <= 236:
            return "SW";
        case 237 <= deg && deg <= 258:
            return "WSW";
        case 259 <= deg && deg <= 281:
            return "W";
        case 282 <= deg && deg <= 303:
            return "WNW";
        case 304 <= deg && deg <= 326:
            return "NW";
        case 327 <= deg && deg <= 348:
            return "NNW";
        case 349 <= deg && deg <= 360:
            return "N";
        default:
            return undefined;
    }
}

/**
 *
 * @param tag{string} Tag name
 * @return {HTMLElement} Element to be returned
 */
export const createElement = (tag = '') => {
    return document.createElement(`${tag}`);
}

/**
 *
 * @param elem{HTMLElement} Element whose classList id modified
 * @param cls{Array} Array of classes which is added to the above element
 */
export const addClassList = (elem, cls = []) => {
    elem.classList.add(...cls);
}


/**
 *
 * @returns {*[]}Array of HTML nodeElements of the target element
 * @param selector{string}Selector to be used
 */
export const getDomNodes = (selector) => {
    return [...document.querySelector(`${selector}`).children] || [];
};

/**
 * @param {Object} Object with keys and default values
 * @returns A new string with a replaced pattern
 *
 */

export const replaceInString = ({str = "", pattern = null, replace = ''}) => {
    const regex = new RegExp(pattern);
    return str.replace(regex, replace);
};


/**
 *
 * @param input Input element
 * @returns {Object} returns an object with the key as the name of the attribute and value as it's value
 *
 */

export const getAttributeObject = (input) => {
    return [...input.attributes].reduce((obj, attr) => {
        obj[attr.name] = attr.value;
        return obj;
    }, {});
};


/**
 *
 * @param num {number} Number to be rounded
 * @param decimals {number} Number of decimal values after point
 * @returns {number} Number rounded to decimals
 */
export const roundNumber = (num, decimals) => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};


/**
 *
 * @param arr {*[]} target Array
 * @param key {String} Object key
 * @param value {String} Value to be found
 * @returns {Object} Object with the designated key
 */
export const getObjectFromArray = (arr, key, value) => {
    return arr.find((elem) => elem[key] === value);
};

export const addPercentSymbol = (value) => {
    const symbol = "%";
    return `${parseFloat(value)}${symbol}`;
};

export const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
};
