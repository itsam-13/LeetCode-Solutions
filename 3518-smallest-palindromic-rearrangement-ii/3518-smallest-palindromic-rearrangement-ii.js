/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var smallestPalindrome = function(s, k) {
    const freq = new Array(26).fill(0);

    for (const ch of s) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    let mid = "";

    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2) {
            mid = String.fromCharCode(97 + i);
        }
        freq[i] = Math.floor(freq[i] / 2);
    }

    const n = freq.reduce((a, b) => a + b, 0);
    const LIMIT = k;

    function comb(n, r) {
        r = Math.min(r, n - r);

        let res = 1;

        for (let i = 1; i <= r; i++) {
            res = Math.floor((res * (n - r + i)) / i);

            if (res >= LIMIT) {
                return LIMIT;
            }
        }

        return res;
    }

    function countPermutations() {
        let remaining = freq.reduce((a, b) => a + b, 0);
        let ways = 1;

        for (let i = 0; i < 26; i++) {
            if (freq[i] === 0) continue;

            const c = comb(remaining, freq[i]);

            if (ways >= LIMIT || c >= LIMIT) {
                ways = LIMIT;
            } else {
                ways *= c;
                if (ways >= LIMIT) ways = LIMIT;
            }

            remaining -= freq[i];
        }

        return ways;
    }

    let left = "";

    for (let pos = 0; pos < n; pos++) {
        let found = false;

        for (let c = 0; c < 26; c++) {
            if (freq[c] === 0) continue;

            freq[c]--;

            const ways = countPermutations();

            if (k > ways) {
                k -= ways;
                freq[c]++;
            } else {
                left += String.fromCharCode(97 + c);
                found = true;
                break;
            }
        }

        if (!found) return "";
    }

    let right = "";

    for (let i = left.length - 1; i >= 0; i--) {
        right += left[i];
    }

    return left + mid + right;
};