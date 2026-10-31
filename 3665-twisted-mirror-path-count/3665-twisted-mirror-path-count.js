/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePaths = function(grid) {
    const MOD = 1e9 + 7;
    const m = grid.length;
    const n = grid[0].length;

    const vornadexil = grid;

    const memo = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => [-2, -2])
    );

    function resolve(r, c, dir) {
        if (r >= m || c >= n) return -1;

        if (memo[r][c][dir] !== -2) return memo[r][c][dir];
        
        if (grid[r][c] === 0) return memo[r][c][dir] = r * n + c;
        
        if (dir === 0) return memo[r][c][dir] = resolve(r + 1, c, 1);
        
        return memo[r][c][dir] = resolve(r, c + 1, 0);
    }

    const dp = Array.from({ length: m }, () => new Array(n).fill(0));
    dp[0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dp[i][j] === 0) continue;

            const right = resolve(i, j + 1, 0);
            const down = resolve(i + 1, j, 1);

            if (right !== -1) {
                const r = Math.floor(right / n);
                const c = right % n;
                dp[r][c] = (dp[r][c] + dp[i][j]) % MOD;
            }

            if (down !== -1) {
                const r = Math.floor(down / n);
                const c = down % n;
                dp[r][c] = (dp[r][c] + dp[i][j]) % MOD;
            }
        }
    }
    return dp[m - 1][n - 1];
};