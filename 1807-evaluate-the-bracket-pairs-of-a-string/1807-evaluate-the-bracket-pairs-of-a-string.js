/**
 * @param {string} s
 * @param {string[][]} knowledge
 * @return {string}
 */
var evaluate = function(s, knowledge) {
    const map = new Map(knowledge);
    let ans = "";

    for (let i = 0; i < s.length; i++) {
        if (s[i] !== '(') {
            ans += s[i];
            continue;
        }

        let j = i + 1;

        while (s[j] !== ')') j++;

        const key = s.slice(i + 1, j);
        ans += map.get(key) ?? '?';
        i = j;
    }
    return ans;
};