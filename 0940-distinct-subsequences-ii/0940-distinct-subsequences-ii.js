/**
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function(s) {
    const MOD = 1000000007;
    const dp = Array(26).fill(0);

    let total = 0;

    for (const ch of s) {
        const x = ch.charCodeAt(0) - 97;
        const add = (total + 1) % MOD;

        total = (total + add - dp[x] + MOD) % MOD;
        dp[x] = add;
    }
    return total;
};