/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const sign = Math.sign(x);

    let rev = Number(
        Math.abs(x)
            .toString()
            .split("")
            .reverse()
            .join("")
    ) * sign;

    return (rev < -(2 ** 31) || rev > (2 ** 31 - 1)) ? 0 : rev;
};