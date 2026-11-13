/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countNonDecreasingSubarrays = function (nums, k) {
    const n = nums.length;
    const dq = new Int32Array(n);

    let head = 0;
    let tail = 0;
    let right = n - 1;
    let cost = 0;
    let ans = 0;

    for (let left = n - 1; left >= 0; left--) {
        while (tail > head && nums[dq[tail - 1]] < nums[left]) {
            const p = dq[--tail];
            const r = tail > head ? dq[tail - 1] : right + 1;

            cost += (r - p) * (nums[left] - nums[p]);
        }

        dq[tail++] = left;

        while (cost > k) {
            cost -= nums[dq[head]] - nums[right];

            if (dq[head] === right) head++;

            right--;
        }
        ans += right - left + 1;
    }
    return ans;
};