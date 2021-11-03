export const shortenTFunctionKey = (t, prefix) => {
    return (key) => {
        return t(`${prefix}.${key}`);
    };
};
