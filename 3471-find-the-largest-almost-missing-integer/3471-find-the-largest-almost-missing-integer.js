/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function(nums, k) {
    const n = nums.length;
    const freq = new Array(51).fill(0);

    for (const num of nums) {
        freq[num]++;
    }

    if (k === n) {
        return Math.max(...nums);
    }

    if (k === 1) {
        let ans = -1;

        for (const num of nums) {
            if (freq[num] === 1) {
                ans = Math.max(ans, num);
            }
        }
        return ans;
    }

    let ans = -1;

    if (freq[nums[0]] === 1) {
        ans = Math.max(ans, nums[0]);
    }

    if (freq[nums[n - 1]] === 1) {
        ans = Math.max(ans, nums[n - 1]);
    }
    return ans;
};