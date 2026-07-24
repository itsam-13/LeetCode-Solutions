/**
 * @param {number[]} nums
 * @return {number}
 */
var uniqueXorTriplets = function(nums) {
    const MAX = 2048;

    const pair = new Uint8Array(MAX);
    const triplet = new Uint8Array(MAX);

    const n = nums.length;

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            pair[nums[i] ^ nums[j]] = 1;
        }
    }

    for (let x = 0; x < MAX; x++) {
        if (!pair[x]) continue;

        for (const num of nums) {
            triplet[x ^ num] = 1;
        }
    }

    let ans = 0;

    for (let x = 0; x < MAX; x++) {
        ans += triplet[x];
    }
    return ans;
};