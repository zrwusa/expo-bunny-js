import { Stack } from '../../data-structures/stack';
import { DeepProxy } from '@qiwi/deep-proxy';
import { wait } from '../../utils';
// Matching Parenthesis problem
// 20. Valid Parentheses
export const isValidParenthesis = async function (input, proxyHandler) {
    const onlyHashKey = input.match(/[{}\[\]()]/g)?.join('');
    if (!onlyHashKey) {
        return false;
    }
    let variablesProxy = new DeepProxy({
        stack: new Stack(),
        char: ''
    }, proxyHandler);
    const hash = {
        '(': ')',
        '{': '}',
        '[': ']',
    };
    for (const char of onlyHashKey) {
        await wait(500);
        if (char in hash) {
            variablesProxy.stack.push(char);
        }
        else {
            const top = variablesProxy.stack.pop();
            if (top === null || hash[top] !== char) {
                return false;
            }
        }
    }
    return !variablesProxy.stack.size();
};
/* --- end stack --- */
