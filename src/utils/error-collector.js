// todo
export const errors = [];
export const popError = () => {
    return errors.pop();
};
export const addError = (error) => {
    return errors.push(error);
};
