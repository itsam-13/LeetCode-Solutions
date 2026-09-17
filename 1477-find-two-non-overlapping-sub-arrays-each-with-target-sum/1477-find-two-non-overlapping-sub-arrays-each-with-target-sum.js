/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function(arr, target) {
    const n = arr.length;
    const INF = Infinity;

    const best = Array(n + 1).fill(INF);
    const map = new Map();
    map.set(0, 0);

    let sum = 0;
    let ans = INF;

    for (let i = 1; i <= n; i++) {
        sum += arr[i - 1];
        best[i] = best[i - 1];

        if (map.has(sum - target)) {
            const j = map.get(sum - target);
            const len = i - j;

            if (best[j] !== INF) {
                ans = Math.min(ans, best[j] + len);
            }

            best[i] = Math.min(best[i], len);
        }

        map.set(sum, i);
    }
    return ans === INF ? -1 : ans;
};