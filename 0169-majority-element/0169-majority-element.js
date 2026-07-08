var majorityElement = function(nums) {
    let count = 0;
    let ans = 0;

    for (const num of nums) {
        if (count === 0) {
            ans = num;
            count = 1;
        } else if (ans === num) {
            count++;
        } else {
            count--;
        }
    }
    return ans;
};