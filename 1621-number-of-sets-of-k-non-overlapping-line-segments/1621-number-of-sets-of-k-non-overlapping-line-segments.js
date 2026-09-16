/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numberOfSets = function(n, k) {
    const MOD = 1000000007;

    const f = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));
    const g = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

    f[1][0] = 1;

    for (let i = 2; i <= n; i++) {
        for (let j = 0; j <= k; j++) {
            f[i][j] = (f[i - 1][j] + g[i - 1][j]) % MOD;

            g[i][j] = g[i - 1][j];

            if (j > 0) {
                g[i][j] = (g[i][j] + f[i - 1][j - 1]) % MOD;
                g[i][j] = (g[i][j] + g[i - 1][j - 1]) % MOD;
            }
        }
    }
    return (f[n][k] + g[n][k]) % MOD;
};