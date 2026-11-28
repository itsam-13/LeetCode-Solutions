/**
 * @param {number[][]} items
 * @param {number} budget
 * @return {number}
 */
var maximumSaleItems = function (items, budget) {
    const n = items.length;
    const freq = new Array(n + 1).fill(0);

    let minPrice = Infinity;

    for (const [factor, price] of items) {
        freq[factor]++;
        minPrice = Math.min(minPrice, price);
    }

    const gain = new Array(n + 1).fill(0);

    for (let f = 1; f <= n; f++) {
        for (let multiple = f; multiple <= n; multiple += f) {
            gain[f] += freq[multiple];
        }

        gain[f]--; 
    }

    items.sort((a, b) => a[1] - b[1]);

    let answer = 0;

    for (const [factor, price] of items) {
        if (price >= 2 * minPrice) break;

        const quantity = Math.min(gain[factor], Math.floor(budget / price));

        budget -= quantity * price;
        answer += quantity * 2;
    }
    answer += Math.floor(budget / minPrice);

    return answer;
};