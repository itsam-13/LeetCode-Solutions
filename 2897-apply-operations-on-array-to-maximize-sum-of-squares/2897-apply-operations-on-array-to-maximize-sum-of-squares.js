/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSum = function(nums, k) {
    const MOD = 1000000007n;
    const count = Array(31).fill(0);

    for (const num of nums) {
        for (let bit = 0; bit < 31; bit++) {
            if ((num >> bit) & 1) count[bit]++;
 
        }
    }

    let ans = 0n;

    for (let i = 0; i < k; i++) {
        let x = 0;

        for (let bit = 0; bit < 31; bit++) {
            if (count[bit] > 0) {
                x |= (1 << bit);
                count[bit]--;
            }
        }

        const num = BigInt(x);
        ans = (ans + num * num) % MOD;
    }
    return Number(ans);
};