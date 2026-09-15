/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPalindromes = function(s, k) {
    const n = s.length;
    const dp = Array(n + 1).fill(0);
    const pal = Array.from({ length: n }, () => Array(n).fill(false));

    for (let i = n - 1; i >= 0; i--) {
        pal[i][i] = true;

        for (let j = i + 1; j < n; j++) {
            pal[i][j] = s[i] === s[j] && (j - i === 1 || pal[i + 1][j - 1]);
        }
    }

    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1];

        for (let len = k; len <= i; len++) {
            if (pal[i - len][i - 1]) {
                dp[i] = Math.max(dp[i], dp[i - len] + 1);
                break;
            }
        }
    }
    return dp[n];
};