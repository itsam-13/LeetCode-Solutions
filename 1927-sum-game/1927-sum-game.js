/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function(num) {
    const n = num.length;

    let leftSum = 0;
    let rightSum = 0;
    let leftQ = 0;
    let rightQ = 0;

    for (let i = 0; i < n / 2; i++) {
        if (num[i] === '?') {
            leftQ++;
        } else {
            leftSum += Number(num[i]);
        }
    }

    for (let i = n / 2; i < n; i++) {
        if (num[i] === '?') {
            rightQ++;
        } else {
            rightSum += Number(num[i]);
        }
    }

    if ((leftQ + rightQ) % 2 === 1) {
        return true;
    }

    return 2 * (leftSum - rightSum) !== 9 * (rightQ - leftQ);
};