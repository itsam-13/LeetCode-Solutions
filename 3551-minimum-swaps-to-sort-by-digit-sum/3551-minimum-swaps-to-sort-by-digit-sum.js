/**
 * @param {number[]} nums
 * @return {number}
 */
var minSwaps = function(nums) {
    const digitSum = (num) => {
        let sum = 0;

        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }

        return sum;
    };

    const n = nums.length;

    const arr = nums.map((num, index) => ({
        num,
        index,
        sum: digitSum(num)
    }));

    arr.sort((a, b) => a.sum - b.sum || a.num - b.num);

    const target = new Array(n);

    for (let i = 0; i < n; i++) target[arr[i].index] = i;
    

    const visited = new Array(n).fill(false);
    let swaps = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;

        let j = i;
        let cycleSize = 0;

        while (!visited[j]) {
            visited[j] = true;
            j = target[j];
            cycleSize++;
        }

        if (cycleSize > 1) swaps += cycleSize - 1;
    }
    return swaps;
};