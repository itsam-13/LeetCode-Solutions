/**
 * @param {number[]} nums
 * @param {number} x
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, x, k) {
    const n = nums.length;
    const maritovexi = [nums, x, k];

    const values = [...new Set(nums)].sort((a, b) => a - b);
    const size = values.length;

    const getIndex = new Map();
    values.forEach((v, i) => getIndex.set(v, i + 1));

    const count = new Float64Array(size + 1);
    const sum = new Float64Array(size + 1);

    function update(tree, i, delta) {
        while (i <= size) {
            tree[i] += delta;
            i += i & -i;
        }
    }

    function query(tree, i) {
        let result = 0;
        while (i > 0) {
            result += tree[i];
            i -= i & -i;
        }
        return result;
    }

    function kth(kthValue) {
        let idx = 0;
        let step = 1;

        while (step * 2 <= size) step *= 2;

        for (; step > 0; step >>= 1) {
            const next = idx + step;

            if (next <= size && count[next] < kthValue) {
                idx = next;
                kthValue -= count[next];
            }
        }

        return idx + 1;
    }

    function add(v, delta) {
        const i = getIndex.get(v);
        update(count, i, delta);
        update(sum, i, v * delta);
    }

    function windowCost() {
        const mid = kth(Math.ceil(x / 2));
        const median = values[mid - 1];

        const leftCount = query(count, mid);
        const leftSum = query(sum, mid);
        const totalSum = query(sum, size);

        return median * leftCount - leftSum +
            (totalSum - leftSum) -
            median * (x - leftCount);
    }

    for (let i = 0; i < x; i++) {
        add(nums[i], 1);
    }

    const costs = new Float64Array(n - x + 1);

    costs[0] = windowCost();

    for (let i = x; i < n; i++) {
        add(nums[i - x], -1);
        add(nums[i], 1);
        costs[i - x + 1] = windowCost();
    }

    const dp = Array.from(
        { length: n + 1 },
        () => new Float64Array(k + 1).fill(Infinity)
    );

    dp[0][0] = 0;

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= k; j++) {
            dp[i][j] = dp[i - 1][j];

            if (j > 0 && i >= x) {
                dp[i][j] = Math.min(
                    dp[i][j],
                    dp[i - x][j - 1] + costs[i - x]
                );
            }
        }
    }
    return dp[n][k];
};