import { ESys } from '../../constants';
export const collectSysError = (payload) => {
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
export const restoreIsReady = (payload) => {
    return {
        type: ESys.RESTORE_IS_READY,
        payload,
    };
};
export const requestFailed = (payload) => {
    return {
        type: ESys.REQUEST_FAILED,
        payload
    };
};
export const requesting = (payload) => {
    return {
        type: ESys.REQUESTING,
        payload,
    };
};
export const requestSuccess = (payload) => {
    return {
        type: ESys.REQUEST_SUCCESS,
        payload,
    };
};
export const restoreNavInitialState = (payload) => {
    return {
        type: ESys.RESTORE_NAV_INITIAL_STATE,
        payload
    };
};
