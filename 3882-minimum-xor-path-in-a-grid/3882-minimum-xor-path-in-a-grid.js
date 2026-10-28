/**
 * @param {number[][]} grid
 * @return {number}
 */
var minCost = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const MAX = 1024;

    let dp = Array.from({ length: n }, () => new Uint8Array(MAX));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const next = new Uint8Array(MAX);
            const val = grid[i][j];

            if (i === 0 && j === 0) {
                next[val] = 1;
            } else {
                if (i > 0) {
                    for (let x = 0; x < MAX; x++) {
                        if (dp[j][x]) next[x ^ val] = 1;
                    }
                }

                if (j > 0) {
                    for (let x = 0; x < MAX; x++) {
                        if (dp[j - 1][x]) next[x ^ val] = 1;
                    }
                }
            }

            dp[j] = next;
        }
    }

    for (let x = 0; x < MAX; x++) {
        if (dp[n - 1][x]) return x;
    }

    return -1;
};