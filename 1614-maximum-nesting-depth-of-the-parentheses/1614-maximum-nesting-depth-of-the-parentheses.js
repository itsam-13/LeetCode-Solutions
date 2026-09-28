/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function(s) {
    let depth = 0;
    let ans = 0;

    for (const ch of s) {
        if (ch === '(') {
            depth++;
            ans = Math.max(ans, depth);
        } else if (ch === ')') depth--;
    }
    return ans;
};