/**
 * @param {string} s
 * @return {number}
 */
var reverseDegree = function(s) {
    let ans = 0;

    for (let i = 0; i < s.length; i++) {
        const reversePos = 26 - (s.charCodeAt(i) - 97);
        ans += reversePos * (i + 1);
    }
    return ans;
};