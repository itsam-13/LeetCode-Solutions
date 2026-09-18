/**
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function(s) {
    const n = s.length;
    const first = Array(26).fill(n);
    const last = Array(26).fill(-1);

    for (let i = 0; i < n; i++) {
        const x = s.charCodeAt(i) - 97;
        first[x] = Math.min(first[x], i);
        last[x] = i;
    }

    const intervals = [];

    for (let c = 0; c < 26; c++) {
        if (last[c] === -1) continue;

        let l = first[c];
        let r = last[c];
        let valid = true;

        for (let i = l; i <= r; i++) {
            const x = s.charCodeAt(i) - 97;

            if (first[x] < l) {
                valid = false;
                break;
            }
            r = Math.max(r, last[x]);
        }

        if (valid) intervals.push([l, r]);
        
    }

    intervals.sort((a, b) => a[1] - b[1]);

    const ans = [];
    let end = -1;

    for (const [l, r] of intervals) {
        if (l > end) {
            ans.push(s.slice(l, r + 1));
            end = r;
        }
    }
    return ans;
};