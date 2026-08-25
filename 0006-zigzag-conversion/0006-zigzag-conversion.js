/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1 || numRows >= s.length) {
        return s;
    }

    const rows = Array.from({ length: numRows }, () => "");
    let row = 0;
    let direction = 1;

    for (const ch of s) {
        rows[row] += ch;

        if (row === 0) {
            direction = 1;
        } else if (row === numRows - 1) {
            direction = -1;
        }

        row += direction;
    }

    return rows.join("");
};