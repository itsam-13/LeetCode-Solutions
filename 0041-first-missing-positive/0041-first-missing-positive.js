/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    let i = 0;
    const n = nums.length;

    while (i < n) {
        let correct = nums[i] - 1;

        if (
            nums[i] > 0 &&
            nums[i] <= n &&
            nums[i] !== nums[correct]
        ) {
            [nums[i], nums[correct]] = [nums[correct], nums[i]];
        } else {
            i++;
        }
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    return n + 1;
};