import { ESys } from '../../constants';
export const sysError = (payload) => {
    return {
        type: ESys.ERROR,
        payload
    };
};
export const sysClearErrors = (payload) => {
    return {
        type: ESys.CLEAR_ERRORS,
        payload
    };
};
export const sysWarn = (payload) => {
    return {
        type: ESys.WARN,
        payload
    };
};
export const restoreNavInitialState = (payload) => {
    return {
        type: ESys.RESTORE_NAV_INITIAL_STATE,
        payload
    };
};
export const restoreIsReady = (payload) => {
    return {
        type: ESys.RESTORE_IS_READY,
        payload,
    };
};
export const requesting = (payload) => {
    return {
        type: ESys.REQUESTING,
        payload,
    };
};
export const requestReceived = (payload) => {
    return {
        type: ESys.REQUEST_RECEIVED,
        payload,
    };
};
export const requestFailed = (payload) => {
    return {
        type: ESys.REQUEST_FAILED,
        payload
    };
};
