/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function(s) {
    const n = s.length;

    let sorted = true;

    for (let i = 1; i < n; i++) {
        if (s[i] < s[i - 1]) {
            sorted = false;
            break;
        }
    }

    if (sorted) return 0;
    if (n === 2) return -1;

    let minChar = "z";
    let maxChar = "a";

    for (const ch of s) {
        if (ch < minChar) minChar = ch;
        if (ch > maxChar) maxChar = ch;
    }

    if (s[0] === minChar || s[n - 1] === maxChar) {
        return 1;
    }

    for (let i = 1; i < n - 1; i++) {
        if (s[i] === minChar || s[i] === maxChar) {
            return 2;
        }
    }
    return 3;
};