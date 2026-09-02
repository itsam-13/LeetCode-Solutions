/**
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function(classroom, energy) {
    const m = classroom.length;
    const n = classroom[0].length;

    let sr, sc;
    const id = Array.from({ length: m }, () => Array(n).fill(-1));
    let cnt = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (classroom[i][j] === 'S') {
                sr = i;
                sc = j;
            } else if (classroom[i][j] === 'L') id[i][j] = cnt++;
        }
    }

    if (cnt === 0) return 0;

    const full = (1 << cnt) - 1;
    const states = new Map();
    const queue = [[sr, sc, energy, full]];
    let head = 0;
    let steps = 0;

    states.set(`${sr},${sc},${full}`, energy);

    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

    while (head < queue.length) {
        const size = queue.length - head;

        for (let z = 0; z < size; z++) {
            const [r, c, e, mask] = queue[head++];

            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;

                if (
                    nr < 0 || nr >= m ||
                    nc < 0 || nc >= n ||
                    classroom[nr][nc] === 'X' ||
                    e === 0
                ) continue;

                let ne = e - 1;
                let nmask = mask;

                if (classroom[nr][nc] === 'L') {
                    nmask &= ~(1 << id[nr][nc]);
                    if (nmask === 0) return steps + 1;
                }

                if (classroom[nr][nc] === 'R') ne = energy;
                
                const key = `${nr},${nc},${nmask}`;
                const old = states.get(key);

                if (old === undefined || ne > old) {
                    states.set(key, ne);
                    queue.push([nr, nc, ne, nmask]);
                }
            }
        }
        steps++;
    }
    return -1;
};