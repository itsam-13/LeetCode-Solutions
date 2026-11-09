/**
 * @param {number} k
 * @param {number[]} arrival
 * @param {number[]} load
 * @return {number[]}
 */
var busiestServers = function(k, arrival, load) {
    const n = arrival.length;
    const bit = new Int32Array(k + 1);
    const count = new Int32Array(k);
    const busy = [];

    function update(i, val) {
        for (i++; i <= k; i += i & -i) {
            bit[i] += val;
        }
    }

    function query(i) {
        let s = 0;
        for (; i > 0; i -= i & -i) s += bit[i];
        return s;
    }

    function kth(target) {
        let idx = 0;
        let step = 1;

        while (step * 2 <= k) step *= 2;

        for (; step; step >>= 1) {
            const next = idx + step;

            if (next <= k && bit[next] < target) {
                idx = next;
                target -= bit[next];
            }
        }
        return idx;
    }

    function push(item) {
        let i = busy.length;
        busy.push(item);

        while (i > 0) {
            const p = (i - 1) >> 1;
            if (busy[p][0] <= item[0]) break;
            busy[i] = busy[p];
            i = p;
        }
        busy[i] = item;
    }

    function pop() {
        const result = busy[0];
        const last = busy.pop();

        if (busy.length) {
            let i = 0;

            while (i * 2 + 1 < busy.length) {
                let c = i * 2 + 1;

                if (
                    c + 1 < busy.length &&
                    busy[c + 1][0] < busy[c][0]
                ) c++;

                if (busy[c][0] >= last[0]) break;

                busy[i] = busy[c];
                i = c;
            }
            busy[i] = last;
        }
        return result;
    }

    for (let i = 0; i < k; i++) update(i, 1);

    for (let i = 0; i < n; i++) {
        while (busy.length && busy[0][0] <= arrival[i]) {
            const [, server] = pop();
            update(server, 1);
        }

        if (query(k) === 0) continue;

        const start = i % k;
        const before = query(start);
        const total = query(k);

        const server = before < total ? kth(before + 1): kth(1);

        update(server, -1);
        count[server]++;

        push([arrival[i] + load[i], server]);
    }

    let max = 0;

    for (const c of count) {
        if (c > max) max = c;
    }

    const ans = [];

    for (let i = 0; i < k; i++) {
        if (count[i] === max) ans.push(i);
    }
    return ans;
};