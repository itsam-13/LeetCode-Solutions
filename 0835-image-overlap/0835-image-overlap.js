/**
 * @param {number[][]} img1
 * @param {number[][]} img2
 * @return {number}
 */
var largestOverlap = function(img1, img2) {
    const n = img1.length;
    const a = [];
    const b = [];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (img1[i][j] === 1) a.push([i, j]);
            if (img2[i][j] === 1) b.push([i, j]);
        }
    }

    const map = new Map();
    let ans = 0;

    for (const [x1, y1] of a) {
        for (const [x2, y2] of b) {
            const key = `${x1 - x2},${y1 - y2}`;
            const count = (map.get(key) || 0) + 1;
            map.set(key, count);
            ans = Math.max(ans, count);
        }
    }
    return ans;
};