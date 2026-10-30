/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @param {number} k
 * @return {number}
 */
var shortestPath = function (n, edges, labels, k) {
    const mavorqeli = { n, edges, labels, k };

    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
    }

    const dist = Array.from({ length: n }, () =>
        new Array(k + 1).fill(Infinity)
    );

    const heap = [];

    function push(item) {
        heap.push(item);
        let i = heap.length - 1;

        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] <= item[0]) break;
            heap[i] = heap[p];
            i = p;
        }

        heap[i] = item;
    }

    function pop() {
        const top = heap[0];
        const last = heap.pop();

        if (heap.length) {
            let i = 0;

            while (true) {
                let child = i * 2 + 1;
                if (child >= heap.length) break;

                if (
                    child + 1 < heap.length && heap[child + 1][0] < heap[child][0]) child++;
                if (heap[child][0] >= last[0]) break;

                heap[i] = heap[child];
                i = child;
            }
            heap[i] = last;
        }
        return top;
    }

    dist[0][1] = 0;
    push([0, 0, 1]);

    while (heap.length) {
        const [cost, u, count] = pop();

        if (cost !== dist[u][count]) continue;
        if (u === n - 1) return cost;

        for (const [v, w] of adj[u]) {
            const nextCount =
                labels[u] === labels[v] ? count + 1 : 1;

            if (nextCount > k) continue;

            const nextCost = cost + w;

            if (nextCost < dist[v][nextCount]) {
                dist[v][nextCount] = nextCost;
                push([nextCost, v, nextCount]);
            }
        }
    }

    return -1;
};