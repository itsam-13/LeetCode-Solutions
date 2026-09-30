/**
 * @param {string} seq
 * @return {number[]}
 */
var maxDepthAfterSplit = function(seq) {
    const ans = [];
    let depth = 0;

    for (const ch of seq) {
        if (ch === '(') {
            depth++;
            ans.push(depth % 2);
        } else {
            ans.push(depth % 2);
            depth--;
        }
    }
    return ans;
};