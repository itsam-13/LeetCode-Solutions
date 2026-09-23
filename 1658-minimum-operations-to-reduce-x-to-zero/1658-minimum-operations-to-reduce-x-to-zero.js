/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function(nums, x) {
    const target = nums.reduce((a, b) => a + b, 0) - x;

    if (target === 0) return nums.length;

    let left = 0;
    let sum = 0;
    let maxLen = -1;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum > target && left <= right) {
            sum -= nums[left++];
        }

        if (sum === target) {
            maxLen = Math.max(maxLen, right - left + 1);
        }
    }
    return maxLen === -1 ? -1 : nums.length - maxLen;
};