/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findMissingElements = function(nums) {
    let min = Infinity;
    let max = -Infinity;
    const set = new Set(nums);

    for (const num of nums) {
        min = Math.min(min, num);
        max = Math.max(max, num);
    }

    const ans = [];

    for (let num = min + 1; num < max; num++) {
        if (!set.has(num)) {
            ans.push(num);
        }
    }
    return ans;
};