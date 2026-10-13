/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function(nums) {
    nums = nums.map(x => x * x).sort((a, b) => a - b);

    let ans = 0;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        if (i < Math.floor(n / 2)) ans -= nums[i];
        else ans += nums[i];
    }
    return ans;
};