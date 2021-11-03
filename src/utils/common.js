export function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            inThrottle = true;
            func.apply(context, args);
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

export function debounce(func, waitMilliseconds = 50, options = {}) {
    let timeoutId;
    const isImmediate = options.isImmediate ?? false;
    const maxWait = options.maxWait;
    let lastInvokeTime = Date.now();

    function nextInvokeTimeout() {
        if (maxWait !== undefined) {
            const timeSinceLastInvocation = Date.now() - lastInvokeTime;
            if (timeSinceLastInvocation + waitMilliseconds >= maxWait) {
                return maxWait - timeSinceLastInvocation;
            }
        }
        return waitMilliseconds;
    }

    const debouncedFunction = function (...args) {
        const context = this;
        const invokeFunction = function () {
            timeoutId = undefined;
            lastInvokeTime = Date.now();
            if (!isImmediate) {
                func.apply(context, args);
            }
        };
        const shouldCallNow = isImmediate && timeoutId === undefined;
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(invokeFunction, nextInvokeTimeout());
        if (shouldCallNow) {
            func.apply(context, args);
        }
    };
    debouncedFunction.cancel = function () {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId);
        }
    };
    return debouncedFunction;
}
