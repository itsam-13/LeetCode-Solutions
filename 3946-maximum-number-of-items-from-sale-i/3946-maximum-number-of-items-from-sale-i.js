/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function (items, budget) {
    const n = items.length;
    let minPrice = Infinity;

    const freeCount = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        minPrice = Math.min(minPrice, items[i][1]);

        for (let j = 0; j < n; j++) {
            if (i !== j && items[j][0] % items[i][0] === 0) freeCount[i]++;
        }
    }

    const dp = new Array(budget + 1).fill(0);

    for (let i = 0; i < n; i++) {
        const price = items[i][1];
        const gain = freeCount[i] + 1;

        for (let b = budget; b >= price; b--) {
            dp[b] = Math.max(dp[b], dp[b - price] + gain);
        }
    }

    let answer = 0;

    for (let spent = 0; spent <= budget; spent++) {
        const extra = Math.floor((budget - spent) / minPrice);
        answer = Math.max(answer, dp[spent] + extra);
    }
    return answer;
};