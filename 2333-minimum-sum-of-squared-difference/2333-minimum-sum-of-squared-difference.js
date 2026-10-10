/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */
var minSumSquareDiff = function(nums1, nums2, k1, k2) {
    const n = nums1.length;
    let k = k1 + k2;
    const diff = nums1.map((x, i) => Math.abs(x - nums2[i]));

    if (diff.reduce((sum, x) => sum + x, 0) <= k) return 0;

    let low = 0;
    let high = Math.max(...diff);

    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        let needed = 0;

        for (const d of diff) {
            needed += Math.max(0, d - mid);
            if (needed > k) break;
        }

        if (needed <= k) high = mid;
        else low = mid + 1;
    }

    let remaining = k;

    for (let i = 0; i < n; i++) {
        const reduction = Math.min(diff[i], Math.max(0, diff[i] - low));
        diff[i] -= reduction;
        remaining -= reduction;
    }

    diff.sort((a, b) => b - a);

    for (let i = 0; i < n && remaining > 0 && diff[i] === low; i++) {
        diff[i]--;
        remaining--;
    }

    return diff.reduce((sum, d) => sum + d * d, 0);
};