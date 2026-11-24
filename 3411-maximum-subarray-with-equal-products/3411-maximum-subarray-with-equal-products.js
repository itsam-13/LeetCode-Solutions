var maxLength = function (nums) {
    const gcd = (a, b) => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    };

    const lcm = (a, b) => (a / gcd(a, b)) * b;

    let ans = 0;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        let product = 1;
        let g = 0;
        let l = 1;

        for (let j = i; j < n; j++) {
            product *= nums[j];
            g = gcd(g, nums[j]);
            l = lcm(l, nums[j]);

            if (product === g * l) ans = Math.max(ans, j - i + 1)
        }
    }
    return ans;
};