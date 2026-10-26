/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countIslands = function (grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let count = 0;

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 0) continue;

            let sum = 0;
            const stack = [[r, c]];

            sum += grid[r][c];
            grid[r][c] = 0;

            while (stack.length > 0) {
                const [x, y] = stack.pop();

                for (const [dx, dy] of dirs) {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] > 0) {
                        sum += grid[nx][ny];
                        grid[nx][ny] = 0;
                        stack.push([nx, ny]);
                    }
                }
            }
            if (sum % k === 0) count++;
        }
    }
    return count;
};