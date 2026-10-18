/**
 * @param {number[]} nums
 * @return {number}
 */
var numOfWays = function(nums) {
    const MOD = 1000000007n;
    const n = nums.length;

    const fact = Array(n + 1).fill(1n);
    const invFact = Array(n + 1).fill(1n);

    for (let i = 1; i <= n; i++) {
        fact[i] = fact[i - 1] * BigInt(i) % MOD;
    }

    const modPow = (a, b) => {
        let result = 1n;

        while (b > 0n) {
            if (b & 1n) result = result * a % MOD;
            a = a * a % MOD;
            b >>= 1n;
        }

        return result;
    };

    invFact[n] = modPow(fact[n], MOD - 2n);

    for (let i = n; i > 0; i--) {
        invFact[i - 1] = invFact[i] * BigInt(i) % MOD;
    }

    const choose = (a, b) =>
        fact[a] * invFact[b] % MOD * invFact[a - b] % MOD;

    const dfs = (arr) => {
        if (arr.length <= 2) return 1n;

        const root = arr[0];
        const left = [];
        const right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) left.push(arr[i]);
            else right.push(arr[i]);
        }

        const ways = choose(left.length + right.length, left.length);

        return ways * dfs(left) % MOD * dfs(right) % MOD;
    };
    return Number((dfs(nums) - 1n + MOD) % MOD);
};