/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function(word1, word2) {
    const n = word1.length;
    const m = word2.length;

    const suf = new Int32Array(n + 1);
    suf[n] = m;

    let j = m - 1;

    for (let i = n - 1; i >= 0; i--) {
        if (j >= 0 && word1[i] === word2[j]) {
            j--;
        }

        suf[i] = j + 1;
    }

    const ans = [];
    let j2 = 0;
    let changed = false;

    for (let i = 0; i < n && j2 < m; i++) {
        if (word1[i] === word2[j2]) {
            ans.push(i);
            j2++;
        } else if (!changed && suf[i + 1] <= j2 + 1) {
            ans.push(i);
            changed = true;
            j2++;
        }
    }

    return j2 === m ? ans : [];
};