/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function(arr) {
    let sorted = [...arr].sort((a, b) => a - b);
    let map = new Map();
    let rank = 1;

    for (let num of sorted) {
        if (!map.has(num)) {
            map.set(num, rank++);
        }
    }
    return arr.map(num => map.get(num));
};