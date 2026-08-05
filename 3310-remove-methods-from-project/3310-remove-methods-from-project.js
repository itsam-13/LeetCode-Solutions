/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function(n, k, invocations) {
    const g = Array.from({ length: n }, () => []);
    const ug = Array.from({ length: n }, () => []);

    for (const [u, v] of invocations) {
        g[u].push(v);
        ug[u].push(v);
        ug[v].push(u);
    }

    const suspicious = new Array(n).fill(false);

    function dfs(u) {
        suspicious[u] = true;
        for (const v of g[u]) {
            if (!suspicious[v]) dfs(v);
        }
    }

    dfs(k);

    const vis = new Array(n).fill(false);

    function dfs2(u) {
        vis[u] = true;
        for (const v of ug[u]) {
            if (!vis[v]) {
                suspicious[v] = false;
                dfs2(v);
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (!suspicious[i] && !vis[i]) {
            dfs2(i);
        }
    }

    const ans = [];

    for (let i = 0; i < n; i++) {
        if (!suspicious[i]) {
            ans.push(i);
        }
    }

    return ans;
};