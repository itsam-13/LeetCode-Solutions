/**
 * @param {string} expression
 * @return {string[]}
 */
var braceExpansionII = function(expression) {
    let i = 0;

    function expr() {
        let res = new Set(exprTerm());

        while (i < expression.length && expression[i] === ',') {
            i++;
            for (const x of exprTerm()) res.add(x);
        }
        return [...res];
    }

    function exprTerm() {
        let res = new Set(['']);

        while (i < expression.length && expression[i] !== '}' && expression[i] !== ',') {
            const cur = factor();
            const next = new Set();

            for (const a of res) {
                for (const b of cur) {
                    next.add(a + b);
                }
            }
            res = next;
        }
        return [...res];
    }

    function factor() {
        if (expression[i] === '{') {
            i++;
            const res = expr();
            i++;
            return res;
        }
        return [expression[i++]];
    }
    return expr().sort();
};