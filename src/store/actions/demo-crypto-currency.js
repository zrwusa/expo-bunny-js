import { EDemoCryptoCurrency } from '../../constants';
export const saveQuickAlertSettings = (params) => {
    return {
        type: EDemoCryptoCurrency.SAVE_QUICK_ALERT_SETTINGS,
        payload: params
    };
};
export const cancelAlertSettings = (params) => {
    return {
        type: EDemoCryptoCurrency.CANCEL_ALL_ALERT_SETTINGS,
        payload: params
    };
};
export const getCurrentPrice = () => {
    return {
        type: EDemoCryptoCurrency.GET_CURRENT_PRICE,
        payload: undefined
    };
};
export const receiveGetCurrentPrice = (payload) => {
    return {
        type: EDemoCryptoCurrency.RECEIVE_CURRENT_PRICE,
        payload
    };
};
