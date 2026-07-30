/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    let ans = 0;

    for (let i = 0; i < word.length; i++) {
        ans += Math.floor(i / 8) + 1;
    }
    return ans;
};