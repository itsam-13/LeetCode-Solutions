/**
 * @param {number[]} nums
 * @return {boolean}
 */
var predictTheWinner = function(nums) {
    const n = nums.length;
    const dp = [...nums];

    for (let i = n - 2; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            dp[j] = Math.max(
                nums[i] - dp[j],
                nums[j] - dp[j - 1]
            );
        }
    }
    return dp[n - 1] >= 0;
};