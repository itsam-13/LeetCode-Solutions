/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestUniqueSubarray = function (nums) {
    const n = nums.length;

    const MOD1 = 1000000007;
    const MOD2 = 1000000009;
    const BASE = 131;

    const check = (len) => {
        const count = new Map();

        let h1 = 0;
        let h2 = 0;
        let power1 = 1;
        let power2 = 1;

        for (let i = 0; i < len; i++) {
            h1 = (h1 * BASE + nums[i]) % MOD1;
            h2 = (h2 * BASE + nums[i]) % MOD2;

            power1 = (power1 * BASE) % MOD1;
            power2 = (power2 * BASE) % MOD2;
        }

        const add = () => {
            const key = `${h1},${h2}`;
            count.set(key, (count.get(key) || 0) + 1);
        };

        add();

        for (let i = len; i < n; i++) {
            h1 = (
                (h1 * BASE - nums[i - len] * power1 + nums[i]) % MOD1 + MOD1) % MOD1;

            h2 = (
                (h2 * BASE - nums[i - len] * power2 + nums[i]) % MOD2 + MOD2) % MOD2;

            add();
        }

        for (const frequency of count.values()) {
            if (frequency === 1) return true;
        }

        return false;
    };

    let left = 1;
    let right = n;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (check(mid)) right = mid;
        else left = mid + 1;

    }

    return left;
};