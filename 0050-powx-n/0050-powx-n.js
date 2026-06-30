/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */

var myPow = function(x, n) {
    let y = BigInt(n);

    if (y < 0n) {
        x = 1 / x;
        y = -y;
    }
    let ans = 1;

    while (y > 0n) {
        if (y % 2n === 1n) {
            ans *= x;
        }
        x *= x;
        y /= 2n;
    }
    return ans;
};