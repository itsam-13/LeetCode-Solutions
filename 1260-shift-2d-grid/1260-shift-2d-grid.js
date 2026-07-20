/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function(grid, k) {
    let m = grid.length;
    let n = grid[0].length;
    let total = m * n;

    k %= total;

    let ans = Array.from({ length: m }, () => Array(n));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let index = i * n + j;
            let newIndex = (index + k) % total;

            let newRow = Math.floor(newIndex / n);
            let newCol = newIndex % n;

            ans[newRow][newCol] = grid[i][j];
        }
    }
    return ans;
};