/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const n = piles.length;

    const suffix = new Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        suffix[i] = suffix[i + 1] + piles[i];
    }

    const memo = new Map();

    function dfs(i, m) {
        if (i >= n) return 0;

        if (i + 2 * m >= n) {
            return suffix[i];
        }

        const key = i * (n + 1) + m;

        if (memo.has(key)) {
            return memo.get(key);
        }

        let best = 0;

        for (let x = 1; x <= 2 * m; x++) {
            const opponent = dfs(i + x, Math.max(m, x));
            best = Math.max(
                best,
                suffix[i] - opponent
            );
        }

        memo.set(key, best);

        return best;
    }

    return dfs(0, 1);
};