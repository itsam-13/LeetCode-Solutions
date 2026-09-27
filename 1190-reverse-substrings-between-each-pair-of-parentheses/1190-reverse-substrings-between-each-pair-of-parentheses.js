/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
    const stack = [""];
    
    for (const ch of s) {
        if (ch === '(') stack.push("");
        
         else if (ch === ')') {
            const cur = stack.pop().split('').reverse().join('');
            stack[stack.length - 1] += cur;

        } else stack[stack.length - 1] += ch;
        
    }
    return stack[0];
};