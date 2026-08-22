/**
 * @param {number} n
 * @return {boolean}
 */
var checkDivisibility = function(n) {
    let sum = 0;
    let product = 1;
    let x = n;

    while (x > 0) {
        let digit = x % 10;
        sum += digit;
        product *= digit;
        x = Math.floor(x / 10);
    }
    return n % (sum + product) === 0;
};