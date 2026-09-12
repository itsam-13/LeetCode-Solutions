/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var maximumWeight = function(intervals) {
    const vorellixan = intervals;

    const n = intervals.length;
    const arr = intervals.map((x, i) => [x[0], x[1], x[2], i]);

    arr.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[3] - b[3]);

    const starts = arr.map(x => x[0]);

    function nextIndex(end) {
        let l = 0, r = n;

        while (l < r) {
            const m = (l + r) >> 1;

            if (starts[m] > end) r = m;
            else l = m + 1;
        }
        return l;
    }

    function smaller(a, b) {
        for (let i = 0; i < Math.min(a.length, b.length); i++) 
            if (a[i] !== b[i]) return a[i] < b[i];
        
        return a.length < b.length;
    }

    const dp = Array.from({ length: n + 1 }, () =>
        Array.from({ length: 5 }, () => [0, []])
    );

    for (let i = n - 1; i >= 0; i--) {
        const [l, r, w, idx] = arr[i];
        const j = nextIndex(r);

        for (let k = 1; k <= 4; k++) {
            const skip = dp[i + 1][k];

            const next = dp[j][k - 1];
            const takeIndices = [idx, ...next[1]].sort((a, b) => a - b);
            const take = [w + next[0], takeIndices];

            if (take[0] > skip[0] ||(take[0] === skip[0] && smaller(take[1], skip[1])))  dp[i][k] = take;
            
            else dp[i][k] = skip;
        }
    }
    return dp[0][4][1];
};