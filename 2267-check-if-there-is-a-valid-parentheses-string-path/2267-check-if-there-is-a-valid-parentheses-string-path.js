/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var hasValidPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    if (grid[0][0] === ')' || grid[m - 1][n - 1] === '(') {
        return false;
    }

    if ((m + n - 1) % 2 !== 0) {
        return false;
    }

    let dp = Array.from({ length: n }, () => new Set());

    dp[0].add(1);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            const cur = new Set();
            const delta = grid[i][j] === '(' ? 1 : -1;

            if (i > 0) {
                for (const balance of dp[j]) {
                    if (balance + delta >= 0) {
                        cur.add(balance + delta);
                    }
                }
            }
            if (j > 0) {
                for (const balance of dp[j - 1]) {
                    if (balance + delta >= 0) {
                        cur.add(balance + delta);
                    }
                }
            }
            dp[j] = cur;
        }
    }
    return dp[n - 1].has(0);
};