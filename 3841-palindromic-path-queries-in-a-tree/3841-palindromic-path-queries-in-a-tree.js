/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} s
 * @param {string[]} queries
 * @return {boolean[]}
 */
var palindromePath = function(n, edges, s, queries) {
    const suneravilo = [n, edges, s, queries];

    const adj = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const LOG = Math.ceil(Math.log2(n)) + 1;
    const parent = new Array(n).fill(0);
    const depth = new Array(n).fill(0);
    const tin = new Array(n).fill(0);
    const tout = new Array(n).fill(0);
    const prefix = new Array(n).fill(0);

    const up = Array.from(
        { length: LOG },
        () => new Array(n).fill(0)
    );

    const bit = c => 1 << (c.charCodeAt(0) - 97);

    let timer = 0;
    const stack = [[0, -1, 0]];

    while (stack.length) {
        const [u, p, state] = stack.pop();

        if (state === 0) {
            parent[u] = p === -1 ? u : p;
            depth[u] = p === -1 ? 0 : depth[p] + 1;
            up[0][u] = parent[u];

            prefix[u] = (p === -1 ? 0 : prefix[p]) ^ bit(s[u]);

            tin[u] = timer++;

            stack.push([u, p, 1]);

            for (let i = adj[u].length - 1; i >= 0; i--) {
                const v = adj[u][i];

                if (v !== p) {
                    stack.push([v, u, 0]);
                }
            }
        } else {
            tout[u] = timer;
        }
    }

    for (let j = 1; j < LOG; j++) {
        for (let u = 0; u < n; u++) {
            up[j][u] = up[j - 1][up[j - 1][u]];
        }
    }

    const fenwick = new Int32Array(n + 1);

    function update(index, mask) {
        for (let i = index + 1; i <= n; i += i & -i) {
            fenwick[i] ^= mask;
        }
    }

    function rangeUpdate(left, right, mask) {
        update(left, mask);

        if (right < n) {
            update(right, mask);
        }
    }

    function pointQuery(index) {
        let mask = 0;

        for (let i = index + 1; i > 0; i -= i & -i) {
            mask ^= fenwick[i];
        }

        return mask;
    }

    function lca(u, v) {
        if (depth[u] < depth[v]) {
            [u, v] = [v, u];
        }

        let diff = depth[u] - depth[v];

        for (let j = 0; j < LOG; j++) {
            if ((diff >> j) & 1) {
                u = up[j][u];
            }
        }

        if (u === v) return u;

        for (let j = LOG - 1; j >= 0; j--) {
            if (up[j][u] !== up[j][v]) {
                u = up[j][u];
                v = up[j][v];
            }
        }

        return parent[u];
    }

    const chars = s.split("");
    const answer = [];

    for (const query of queries) {
        const parts = query.split(" ");
        const type = parts[0];
        const u = Number(parts[1]);

        if (type === "update") {
            const c = parts[2];
            const delta = bit(chars[u]) ^ bit(c);

            if (delta !== 0) {
                rangeUpdate(tin[u], tout[u], delta);
                chars[u] = c;
            }
        } else {
            const v = Number(parts[2]);
            const w = lca(u, v);

            const mask =
                (prefix[u] ^ pointQuery(tin[u])) ^
                (prefix[v] ^ pointQuery(tin[v])) ^
                bit(chars[w]);

            answer.push((mask & (mask - 1)) === 0);
        }
    }

    return answer;
};