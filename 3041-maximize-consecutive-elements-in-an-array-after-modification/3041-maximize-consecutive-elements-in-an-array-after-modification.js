/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSelectedElements = function(nums) {
    nums.sort((a, b) => a - b);

    const dp = new Map();
    let ans = 0;

    for (const x of nums) {
        const a = dp.get(x) || 0;
        const b = dp.get(x + 1) || 0;

        dp.set(x + 1, Math.max(b, a + 1));
        dp.set(x + 2, Math.max(dp.get(x + 2) || 0, b + 1));

        ans = Math.max(ans, dp.get(x + 1), dp.get(x + 2));
    }
    return ans;
};