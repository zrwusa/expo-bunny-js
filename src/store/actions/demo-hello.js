import { EDemoHello } from '../../constants';
export const demoHello = (payload) => {
    return {
        type: EDemoHello.DEMO_HELLO,
        payload
    };
};
export const demoHello2 = (payload) => {
    return {
        type: EDemoHello.DEMO_HELLO2,
        payload
    };
};
