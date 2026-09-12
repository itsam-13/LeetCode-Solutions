/**
 * @param {number[]} digits
 * @return {number}
 */
var totalNumbers = function(digits) {
    const freq = Array(10).fill(0);

    for (const d of digits) freq[d]++;
    
    let ans = 0;

    for (let a = 1; a <= 9; a++) {
        if (freq[a] === 0) continue;
        freq[a]--;

        for (let b = 0; b <= 9; b++) {
            if (freq[b] === 0) continue;
            freq[b]--;

            for (let c = 0; c <= 8; c += 2) {
                if (freq[c] > 0) ans++;
            }
            freq[b]++;
        }
        freq[a]++;
    }
    return ans;
};