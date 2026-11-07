/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
var assignTasks = function(servers, tasks) {
    class Heap {
        constructor(compare) {
            this.a = [];
            this.compare = compare;
        }

        push(x) {
            const a = this.a;
            a.push(x);
            let i = a.length - 1;

            while (i > 0) {
                let p = (i - 1) >> 1;
                if (this.compare(a[p], x) <= 0) break;
                a[i] = a[p];
                i = p;
            }

            a[i] = x;
        }

        pop() {
            const a = this.a;
            const top = a[0];
            const last = a.pop();

            if (a.length) {
                let i = 0;

                while (true) {
                    let c = i * 2 + 1;
                    if (c >= a.length) break;

                    if (
                        c + 1 < a.length &&
                        this.compare(a[c + 1], a[c]) < 0
                    ) c++;

                    if (this.compare(last, a[c]) <= 0) break;

                    a[i] = a[c];
                    i = c;
                }

                a[i] = last;
            }

            return top;
        }

        peek() {
            return this.a[0];
        }

        get size() {
            return this.a.length;
        }
    }

    const available = new Heap(
        (a, b) => a[0] - b[0] || a[1] - b[1]
    );

    const busy = new Heap(
        (a, b) => a[0] - b[0] ||
                 a[1] - b[1] ||
                 a[2] - b[2]
    );

    servers.forEach((weight, i) => {
        available.push([weight, i]);
    });

    const ans = [];
    let time = 0;

    for (let i = 0; i < tasks.length; i++) {
        time = Math.max(time, i);

        while (busy.size && busy.peek()[0] <= time) {
            const [end, weight, index] = busy.pop();
            available.push([weight, index]);
        }

        if (!available.size) {
            time = busy.peek()[0];

            while (busy.size && busy.peek()[0] <= time) {
                const [end, weight, index] = busy.pop();
                available.push([weight, index]);
            }
        }

        const [weight, index] = available.pop();
        ans.push(index);

        busy.push([
            time + tasks[i],
            weight,
            index
        ]);
    }
    return ans;
};