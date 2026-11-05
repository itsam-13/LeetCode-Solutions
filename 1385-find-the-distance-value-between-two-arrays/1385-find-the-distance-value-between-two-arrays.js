/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
var findTheDistanceValue = function(arr1, arr2, d) {
    let count = 0;

    for (const a of arr1) {
        let valid = true;

        for (const b of arr2) {
            if (Math.abs(a - b) <= d) {
                valid = false;
                break;
            }
        }
        if (valid) count++;
    }
    return count;
};