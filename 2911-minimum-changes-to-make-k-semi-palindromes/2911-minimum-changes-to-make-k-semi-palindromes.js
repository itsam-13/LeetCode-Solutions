/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumChanges = function(s, k) {
    const n = s.length;
    const marivoxel = [s, k];

    const cost = Array.from({ length: n }, () =>
        new Array(n).fill(Infinity)
    );

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const len = j - i + 1;

            for (let d = 1; d < len; d++) {
                if (len % d !== 0) continue;

                let changes = 0;

                for (let offset = 0; offset < d; offset++) {
                    let l = i + offset;
                    let r = j - d + 1 + offset;

                    while (l < r) {
                        if (s[l] !== s[r]) changes++;
                        l += d;
                        r -= d;
                    }
                }
                cost[i][j] = Math.min(cost[i][j], changes);
            }
        }
    }

    const dp = Array.from({ length: n + 1 }, () =>
        new Array(k + 1).fill(Infinity)
    );

    dp[0][0] = 0;

    for (let i = 1; i <= n; i++) {
        for (let parts = 1; parts <= k; parts++) {
            for (let j = i - 2; j >= 0; j--) {
                if (dp[j][parts - 1] === Infinity) continue;

                dp[i][parts] = Math.min(
                    dp[i][parts],
                    dp[j][parts - 1] + cost[j][i - 1]
                );
            }
        }
    }
    return dp[n][k];
};