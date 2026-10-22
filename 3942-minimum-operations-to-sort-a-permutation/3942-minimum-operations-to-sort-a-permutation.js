/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function(nums) {
    const n = nums.length;
    const zero = nums.indexOf(0);

    const check = (step) => {
        for (let i = 1; i < n; i++) {
            const prev = (zero + (i - 1) * step + n) % n;
            const curr = (zero + i * step + n) % n;

            if (nums[prev] > nums[curr]) return false;
        }

        return true;
    };

    let ans = Infinity;

    if (check(1)) {
        ans = Math.min(ans, zero, n - zero + 2);
    }

    if (check(-1)) {
        ans = Math.min(ans, zero + 2, n - zero);
    }

    return ans === Infinity ? -1 : ans;
};