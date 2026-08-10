/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countCompleteComponents = function(n, edges) {
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const visited = new Array(n).fill(false);
    let ans = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;

        let nodes = 0;
        let edgeCount = 0;
        const stack = [i];
        visited[i] = true;

        while (stack.length) {
            const node = stack.pop();

            nodes++;
            edgeCount += graph[node].length;

            for (const next of graph[node]) {
                if (!visited[next]) {
                    visited[next] = true;
                    stack.push(next);
                }
            }
        }

        edgeCount /= 2;

        if (edgeCount === nodes * (nodes - 1) / 2) {
            ans++;
        }
    }
    return ans;
};