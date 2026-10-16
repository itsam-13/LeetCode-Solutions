/**
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function(nums) {
    const MOD = 1000000007;
    const n = nums.length;

    const sum = new Array(4 * n).fill(0);
    const sq = new Array(4 * n).fill(0);
    const lazy = new Array(4 * n).fill(0);
    const last = new Map();

    function apply(node, left, right, delta) {
        const len = right - left + 1;

        sq[node] = (
            sq[node] +
            2 * delta * sum[node] +
            delta * delta * len
        ) % MOD;

        sum[node] = (sum[node] + delta * len) % MOD;
        lazy[node] += delta;
    }

    function push(node, left, right) {
        if (lazy[node] === 0 || left === right) return;

        const mid = Math.floor((left + right) / 2);
        apply(node * 2, left, mid, lazy[node]);
        apply(node * 2 + 1, mid + 1, right, lazy[node]);
        lazy[node] = 0;
    }

    function update(node, left, right, ql, qr) {
        if (ql <= left && right <= qr) {
            apply(node, left, right, 1);
            return;
        }

        push(node, left, right);

        const mid = Math.floor((left + right) / 2);

        if (ql <= mid) {
            update(node * 2, left, mid, ql, qr);
        }

        if (qr > mid) {
            update(node * 2 + 1, mid + 1, right, ql, qr);
        }

        sum[node] = (sum[node * 2] + sum[node * 2 + 1]) % MOD;
        sq[node] = (sq[node * 2] + sq[node * 2 + 1]) % MOD;
    }

    let answer = 0;

    for (let r = 0; r < n; r++) {
        const previous = last.has(nums[r]) ? last.get(nums[r]) : -1;
        const left = previous + 1;

        update(1, 0, n - 1, left, r);

        last.set(nums[r], r);
        answer = (answer + sq[1]) % MOD;
    }

    return answer;
};