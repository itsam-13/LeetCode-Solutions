/**
 * @param {string} s
 * @return {number}
 */
var scoreOfParentheses = function(s) {
    const stack = [0];

    for (const ch of s) {
        if (ch === '(') {
            stack.push(0);
        } else {
            const inner = stack.pop();
            const score = inner === 0 ? 1 : 2 * inner;
            stack[stack.length - 1] += score;
        }
    }
    return stack[0];
};