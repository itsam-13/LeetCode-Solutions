/**
 * @param {number[]} arr
 * @return {number}
 */
var numOfSubarrays = function(arr) {
    const MOD = 1e9 + 7;

    let even = 1;
    let odd = 0;
    let sum = 0;
    let ans = 0;

    for (const num of arr) {
        sum += num;

        if (sum % 2 === 0) {
            ans = (ans + odd) % MOD;
            even++;
        } else {
            ans = (ans + even) % MOD;
            odd++;
        }
    }

    return ans;
};