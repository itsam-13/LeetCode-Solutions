/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var resultArray = function(nums, k) {
    const result = Array(k).fill(0);
    let dp = Array(k).fill(0);

    for (const num of nums) {
        const x = num % k;
        const next = Array(k).fill(0);

        next[x]++;

        for (let r = 0; r < k; r++) {

            if (dp[r] > 0)  next[(r * x) % k] += dp[r];
        }

        for (let r = 0; r < k; r++) result[r] += next[r];
        
        dp = next;
    }
    return result;
};