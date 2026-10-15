/**
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function(nums) {
    let ans = 0;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        const seen = new Set();

        for (let j = i; j < n; j++) {
            seen.add(nums[j]);
            ans += seen.size * seen.size;
        }
    }
    return ans;
};