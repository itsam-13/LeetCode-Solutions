/**
 * @param {number[]} parent
 * @param {string} s
 * @return {number[]}
 */
var findSubtreeSizes = function (parent, s) {
    const n = parent.length;
    const tree = Array.from({ length: n }, () => []);

    for (let i = 1; i < n; i++) {
        tree[parent[i]].push(i);
    }

    const stacks = Array.from({ length: 26 }, () => []);
    const ans = new Array(n).fill(1);
    const stack = [[0, -1, 0]];

    while (stack.length) {
        const [u, p, state] = stack.pop();
        const c = s.charCodeAt(u) - 97;

        if (state === 0) {
            stacks[c].push(u);

            stack.push([u, p, 1]);

            for (const v of tree[u]) {
                stack.push([v, u, 0]);
            }
        } else {
            const ancestors = stacks[c];

            const newParent = ancestors.length > 1 ? ancestors[ancestors.length - 2] : p;

            if (newParent !== -1) ans[newParent] += ans[u];
            ancestors.pop();
        }
    }
    return ans;
};