/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
    const isValid = (str) => {
        let balance = 0;

        for (const ch of str) {
            if (ch === '(') balance++;
            else if (ch === ')') {
                if (balance === 0) return false;
                balance--;
            }
        }

        return balance === 0;
    };

    let level = new Set([s]);

    while (level.size > 0) {
        const result = [];

        for (const str of level) 
            if (isValid(str)) result.push(str);
        

        if (result.length > 0) return result;

        const next = new Set();

        for (const str of level) {
            for (let i = 0; i < str.length; i++) {
                if (str[i] !== '(' && str[i] !== ')') continue;
                if (i > 0 && str[i] === str[i - 1]) continue;

                next.add(str.slice(0, i) + str.slice(i + 1));
            }
        }
        level = next;
    }
    return [""];
};