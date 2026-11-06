/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
var countServers = function(n, logs, x, queries) {
    const sortedLogs = [...logs].sort((a, b) => a[1] - b[1]);

    const sortedQueries = queries
        .map((time, i) => [time, i])
        .sort((a, b) => a[0] - b[0]);

    const freq = new Map();
    const ans = new Array(queries.length);

    let left = 0;
    let right = 0;
    let active = 0;

    for (const [time, idx] of sortedQueries) {
        while (
            right < sortedLogs.length &&
            sortedLogs[right][1] <= time
        ) {
            const id = sortedLogs[right][0];
            freq.set(id, (freq.get(id) || 0) + 1);

            if (freq.get(id) === 1) active++;
            right++;
        }

        while (
            left < right &&
            sortedLogs[left][1] < time - x
        ) {
            const id = sortedLogs[left][0];
            freq.set(id, freq.get(id) - 1);

            if (freq.get(id) === 0) active--;
            left++;
        }
        ans[idx] = n - active;
    }
    return ans;
};