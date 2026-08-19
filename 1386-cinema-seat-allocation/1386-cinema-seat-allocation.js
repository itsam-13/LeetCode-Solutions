/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
    const map = new Map();

    for (const [row, seat] of reservedSeats) {
        if (!map.has(row)) {
            map.set(row, new Set());
        }

        map.get(row).add(seat);
    }

    let ans = (n - map.size) * 2;

    for (const seats of map.values()) {
        const left =
            !seats.has(2) &&
            !seats.has(3) &&
            !seats.has(4) &&
            !seats.has(5);

        const middle =
            !seats.has(4) &&
            !seats.has(5) &&
            !seats.has(6) &&
            !seats.has(7);

        const right =
            !seats.has(6) &&
            !seats.has(7) &&
            !seats.has(8) &&
            !seats.has(9);

        if (left && right) {
            ans += 2;
        } else if (left || middle || right) {
            ans += 1;
        }
    }
    return ans;
};