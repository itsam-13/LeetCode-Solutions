/**
 * @param {number} num
 * @param {number} sum
 * @return {string}
 */
var maxSumOfSquares = function(num, sum) {
    if (sum > 9 * num) return "";

    const nines = Math.floor(sum / 9);
    const remainder = sum % 9;

    let result = "9".repeat(nines);

    if (remainder > 0) result += remainder;
    
    result += "0".repeat(num - result.length);
    return result;
};