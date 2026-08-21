/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function(s) {
    const freq = new Array(26).fill(0);
    const seen = new Array(26).fill(false);
    const stack = [];

    for (const ch of s) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    for (const ch of s) {
        const idx = ch.charCodeAt(0) - 97;
        freq[idx]--;

        if (seen[idx]) continue;

        while (
            stack.length &&
            stack[stack.length - 1] > ch &&
            freq[stack[stack.length - 1].charCodeAt(0) - 97] > 0
        ) {
            const removed = stack.pop();
            seen[removed.charCodeAt(0) - 97] = false;
        }

        stack.push(ch);
        seen[idx] = true;
    }
    return stack.join("");
};