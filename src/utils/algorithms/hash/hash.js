/* --- start hash table --- */
import { DeepProxy } from '@qiwi/deep-proxy';
import { wait } from '../../utils';
export const lengthOfLongestSubstring = async function (input, proxyHandler) {
    let variablesProxy = new DeepProxy({
        maxLen: 0,
        curr: 0,
        map: new Map(),
    }, proxyHandler);
    if (input.length < 2) {
        return input.length;
    }
    for (let i = 0; i < input.length; i++) {
        variablesProxy.curr = i;
        await wait(500);
        const mapped = variablesProxy.map.get(input[i]);
        if (mapped === undefined) {
            variablesProxy.curr++;
        }
        else {
            variablesProxy.curr = Math.min(i - mapped, variablesProxy.curr + 1);
        }
        variablesProxy.maxLen = Math.max(variablesProxy.maxLen, variablesProxy.curr);
        variablesProxy.map.set(input[i], i);
    }
    return variablesProxy.maxLen;
};
/* --- end hash table --- */
