import _ from 'lodash';
export function randomText(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export const uuidV4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
export class IncrementId {
    constructor(prefix) {
        this._prefix = prefix ? prefix : '';
        this._id = this._prefix + '0';
    }
    getId() {
        const { _id, _prefix } = this;
        if (!_id) {
            this._id = _prefix + '0';
        }
        else {
            let idNumStr = _id.substr(_prefix.length, _id.length - _prefix.length);
            let newIdNum = parseInt(idNumStr, 10) + 1;
            this._id = _prefix + newIdNum.toString();
        }
        return this._id;
    }
}
export function incrementId(prefix) {
    let _prefix = prefix ? prefix : '';
    let _id = _prefix + '0';
    return function id() {
        let idNumStr = _id.substr(_prefix.length, _id.length - _prefix.length);
        let newIdNum = parseInt(idNumStr, 10) + 1;
        _id = _prefix + newIdNum.toString();
        return _id;
    };
}
export const getValue = (obj, names) => {
    return names.map(i => obj[i]);
};
export const isObject = (object) => {
    return object != null && typeof object === 'object';
};
export const looseEqual = (a, b) => {
    return a == b;
};
export const strictEqual = (a, b) => {
    return a === b;
};
export const strictObjectIsEqual = (a, b) => {
    return Object.is(a, b);
};
export const deepObjectStrictEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (areObjects && !deepObjectStrictEqual(val1, val2) ||
            !areObjects && val1 !== val2) {
            return false;
        }
    }
    return true;
};
export const isTypeEqual = (obj) => {
    try {
        let m = obj;
    }
    catch (e) {
    }
};
export function reverseColor(oldColor) {
    let oldColorTemp = '0x' + oldColor.replace(/#/g, '');
    let str = '000000' + (0xFFFFFF - Number(oldColorTemp)).toString(16);
    return '#' + str.substring(str.length - 6, str.length);
}
export const isSameStructure = (objA, objB) => {
    let objATraversable = objA;
    let objBTraversable = objB;
    const objAKeys = Object.keys(objATraversable);
    const objBKeys = Object.keys(objBTraversable);
    let isSame = true;
    if (objAKeys.length !== objBKeys.length) {
        return isSame = false;
    }
    else {
        objAKeys.forEach((i) => {
            if (!objBKeys.includes(i)) {
                return isSame = false;
            }
        });
        return isSame;
    }
};
export const isLeafParent = (obj) => {
    let isLeaf = true;
    Object.values(obj).forEach(value => {
        if (typeof value === 'object' && value instanceof Array) {
            value.forEach(item => {
                if (typeof item === 'object') {
                    return false;
                }
            });
            return isLeaf = true;
        }
        if (!['string', 'boolean', 'number', 'undefined', 'function'].includes(typeof value) && (value !== null)) {
            return isLeaf = false;
        }
    });
    return isLeaf;
};
export const addDays = (date, days) => {
    date.setDate(date.getDate() + days);
    return date;
};
export class WaitManager {
    constructor(nXSpeed) {
        this._time1 = 1000;
        this._time2 = 2000;
        this._time3 = 3000;
        this._time4 = 4000;
        this._time10 = 10000;
        this._time20 = 20000;
        this._time30 = 20000;
        this._time60 = 60000;
        this._cusTime = 1000;
        this._nXSpeed = 1;
        if (nXSpeed === undefined)
            nXSpeed = 1;
        this._nXSpeed = nXSpeed;
    }
    get time1() {
        return this._time1 / this._nXSpeed;
    }
    get time2() {
        return this._time2 / this._nXSpeed;
    }
    get time3() {
        return this._time3 / this._nXSpeed;
    }
    get time4() {
        return this._time4 / this._nXSpeed;
    }
    get time10() {
        return this._time10 / this._nXSpeed;
    }
    get time20() {
        return this._time20 / this._nXSpeed;
    }
    get time50() {
        return this._time30 / this._nXSpeed;
    }
    get time60() {
        return this._time60 / this._nXSpeed;
    }
    get cusTime() {
        return this._cusTime / this._nXSpeed;
    }
    set cusTime(v) {
        this._cusTime = v;
    }
}
export const wait = async (ms, resolveValue) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const finalResolveValue = resolveValue || true;
            resolve(finalResolveValue);
        }, ms);
    });
};
export class AuthAPIError extends Error {
    constructor(serverErrorMessage, serverErrorCode, serverErrorStack) {
        super(serverErrorMessage);
        if (serverErrorStack) {
            this.serverErrorStack = serverErrorStack;
        }
        if (serverErrorCode) {
            this.serverErrorCode = serverErrorCode;
        }
        this.name = new.target.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, new.target);
        }
        if (typeof Object.setPrototypeOf === 'function') {
            Object.setPrototypeOf(this, new.target.prototype);
        }
        else {
            this.__proto__ = new.target.prototype;
        }
    }
}
export class BunnyAPIError extends Error {
    constructor(serverErrorMessage, serverErrorCode, serverErrorStack) {
        super(serverErrorMessage);
        if (serverErrorStack) {
            this.serverErrorStack = serverErrorStack;
        }
        if (serverErrorCode) {
            this.serverErrorCode = serverErrorCode;
        }
        this.name = new.target.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, new.target);
        }
        if (typeof Object.setPrototypeOf === 'function') {
            Object.setPrototypeOf(this, new.target.prototype);
        }
        else {
            this.__proto__ = new.target.prototype;
        }
    }
}
export class NomicsAPIError extends Error {
    constructor(serverErrorMessage, serverErrorCode, serverErrorStack) {
        super(serverErrorMessage);
        if (serverErrorStack) {
            this.serverErrorStack = serverErrorStack;
        }
        if (serverErrorCode) {
            this.serverErrorCode = serverErrorCode;
        }
        this.name = new.target.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, new.target);
        }
        if (typeof Object.setPrototypeOf === 'function') {
            Object.setPrototypeOf(this, new.target.prototype);
        }
        else {
            this.__proto__ = new.target.prototype;
        }
    }
}
export function extractValue(data) {
    let result = [];
    if (data && data.length > 0) {
        result = data.map(item => item.value);
    }
    return result;
}
export function keyValueToArray(data) {
    const itemArray = [];
    const keys = Object.keys(data);
    for (let i of keys) {
        itemArray.push({ ...data[i], _id: i });
    }
    return itemArray;
}
export function minuted(time) {
    const minutes = Math.floor(time / 60000).toString();
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}
export function randomDate(start, end, specificProbabilityStart, specificProbability) {
    if (!start)
        start = new Date('1970-1-1');
    if (!end)
        end = new Date();
    if (specificProbabilityStart) {
        if (!specificProbability)
            specificProbability = 0.5;
        if (Math.random() <= specificProbability) {
            return new Date(specificProbabilityStart.getTime() + Math.random() * (end.getTime() - specificProbabilityStart.getTime()));
        }
    }
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export function firestoreTimestampToDate(timeStamp) {
    let date = new Date('1970-01-01');
    switch (typeof timeStamp) {
        case 'number':
            date = new Date(timeStamp);
            break;
        case 'object':
            if (timeStamp instanceof Date) {
                date = timeStamp;
            }
            else {
                if (!timeStamp) {
                    // When use firestore.FieldValue.serverTimestamp(),
                    // the redux-firestore will not wait for addOnCompleteListener,
                    // just update data immediately,the timestamp will be null
                    date = new Date();
                }
                else {
                    const dateStamp = timeStamp;
                    date = dateStamp.toDate();
                }
            }
            break;
        default:
            break;
    }
    return date;
}
export const capitalizeWords = (str) => {
    return str.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};
export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export const comparerArray = (otherArray, limitKeys) => {
    return function (current) {
        return otherArray.filter(function (other) {
            if (!limitKeys) {
                return _.isEqual(current, other);
            }
            else {
                // TODO
            }
        }).length == 0;
    };
};
export const onlyInA = (a, b) => {
    return a.filter(comparerArray(b));
};
export const onlyInB = (a, b) => {
    return b.filter(comparerArray(a));
};
export const diffAB = (a, b) => {
    return onlyInA(a, b).concat(onlyInB(a, b));
};
export class StringUtil {
    // camelCase
    static toCamelCase(str) {
        return _.camelCase(str);
    }
    // snake_case
    static toSnakeCase(str) {
        return _.snakeCase(str);
    }
    // PascalCase
    static toPascalCase(str) {
        return _.startCase(_.camelCase(str)).replace(/ /g, '');
    }
    // CONSTANT_CASE
    static toConstantCase(str) {
        return _.upperCase(str).replace(/ /g, '_');
    }
    // kebab-case
    static toKebabCase(str) {
        return _.kebabCase(str);
    }
    // lowercase
    static toLowerCase(str) {
        return _.lowerCase(str).replace(/ /g, '');
    }
    // Title Case
    static toTitleCase(str) {
        return _.startCase(_.camelCase(str));
    }
    // Sentence case
    static toSentenceCase(str) {
        return _.upperFirst(_.lowerCase(str));
    }
    // path/case
    static toPathCase(str) {
        return _.lowerCase(str).replace(/ /g, '/');
    }
    // dot.case
    static toDotCase(str) {
        return _.lowerCase(str).replace(/ /g, '.');
    }
}
export const deepKeysConvert = (obj, toType) => {
    const _toType = toType || 'snake';
    if (Array.isArray(obj)) {
        return obj.map(v => deepKeysConvert(v, _toType));
    }
    else if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((result, key) => {
            let newKey = '';
            switch (_toType) {
                case 'camel':
                    newKey = StringUtil.toCamelCase(key);
                    break;
                case 'snake':
                    newKey = StringUtil.toSnakeCase(key);
                    break;
                case 'pascal':
                    newKey = StringUtil.toPascalCase(key);
                    break;
                case 'constant':
                    newKey = StringUtil.toConstantCase(key);
                    break;
                case 'kebab':
                    newKey = StringUtil.toKebabCase(key);
                    break;
                case 'lower':
                    newKey = StringUtil.toLowerCase(key);
                    break;
                case 'title':
                    newKey = StringUtil.toTitleCase(key);
                    break;
                case 'sentence':
                    newKey = StringUtil.toSentenceCase(key);
                    break;
                case 'path':
                    newKey = StringUtil.toPathCase(key);
                    break;
                case 'dot':
                    newKey = StringUtil.toDotCase(key);
                    break;
                default:
                    newKey = StringUtil.toDotCase(key);
                    break;
            }
            return {
                ...result,
                [newKey]: deepKeysConvert(obj[key], _toType),
            };
        }, {});
    }
    return obj;
};
export const deepRemoveByKey = (obj, keysToBeRemoved) => {
    const result = _.transform(obj, function (result, value, key) {
        if (_.isObject(value)) {
            value = deepRemoveByKey(value, keysToBeRemoved);
        }
        if (!keysToBeRemoved.includes(key)) {
            _.isArray(obj) ? result.push(value) : result[key] = value;
        }
    });
    return result;
};
export const deepRenameKeys = (obj, keysMap) => {
    return _.transform(obj, function (result, value, key) {
        let currentKey = keysMap[key] || key;
        result[currentKey] = _.isObject(value) ? deepRenameKeys(value, keysMap) : value;
    });
};
export const deepReplaceValues = (obj, keyReducerMap) => {
    const newObject = _.clone(obj);
    _.each(obj, (val, key) => {
        for (const item in keyReducerMap) {
            if (key === item) {
                newObject[key] = keyReducerMap[item](newObject);
            }
            else if (typeof (val) === 'object' || val instanceof Array) {
                newObject[key] = deepReplaceValues(val, keyReducerMap);
            }
        }
    });
    return newObject;
};
// function getCallStackSize() {
//     let count = 0, fn = arguments.callee;
//     while ( (fn = fn.caller) ) {
//         count++;
//     }
//     return count;
// }
// TODO determine depth and pass root node as a param through callback
export const deepAdd = (obj, keyReducerMap, isItemRootParent) => {
    const newObject = _.clone(obj);
    if (_.isObject(newObject) && !_.isArray(newObject)) {
        for (const item in keyReducerMap) {
            newObject[item] = keyReducerMap[item](newObject);
        }
    }
    _.each(obj, (val, key) => {
        if (_.isObject(val)) {
            for (const item in keyReducerMap) {
                // @ts-ignore
                newObject[key] = deepAdd(val, keyReducerMap, isItemRootParent);
            }
        }
    });
    return newObject;
};
const styleString = (color) => `color: ${color}; font-weight: bold`;
const styleHeader = (header) => `%c[${header}]`;
export const bunnyConsole = {
    log: (headerLog = 'bunny', ...args) => {
        return console.log(styleHeader(headerLog), styleString('black'), ...args);
    },
    warn: (headerLog = 'bunny', ...args) => {
        return console.warn(styleHeader(headerLog), styleString('orange'), ...args);
    },
    error: (headerLog = 'bunny', ...args) => {
        return console.error(styleHeader(headerLog), styleString('red'), ...args);
    }
};
export const timeStart = () => {
    return performance ? performance.now() : new Date().getTime();
};
export const timeEnd = (startTime, headerLog, consoleConditionFn) => {
    const timeSpent = (performance ? performance.now() : new Date().getTime()) - startTime;
    const isPassCondition = consoleConditionFn ? consoleConditionFn(timeSpent) : true;
    if (isPassCondition) {
        bunnyConsole.log(headerLog ? headerLog : 'time spent', timeSpent.toFixed(2));
    }
};
export const arrayRemove = function (array, predicate) {
    let i = -1, len = array ? array.length : 0, result = [];
    while (++i < len) {
        let value = array[i];
        if (predicate(value, i, array)) {
            result.push(value);
            Array.prototype.splice.call(array, i--, 1);
            len--;
        }
    }
    return result;
};
