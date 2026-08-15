/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubsequence = function(nums) {
    let xor = 0;
    let zeros = 0;
    const n = nums.length;

    for (const num of nums) {
        xor ^= num;

        if (num === 0) zeros++;
        
    }

    if (xor !== 0) return n;

    if (zeros === n) return 0;
    
    return n - 1;
};