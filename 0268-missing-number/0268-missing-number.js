/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    const n = nums.length;
    let Sum = (n * (n + 1)) / 2;

    for (let num of nums) {
        Sum -= num;
    }
    return Sum;
};