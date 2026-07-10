/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    let i = 0;

    while (i < nums.length) {
        let correct = nums[i] - 1;

        if (nums[i] !== nums[correct]) {
            [nums[i], nums[correct]] = [nums[correct], nums[i]];
        } else {
            i++;
        }
    }

    let ans = [];

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
            ans.push(i + 1);
        }
    }
    return ans;
};