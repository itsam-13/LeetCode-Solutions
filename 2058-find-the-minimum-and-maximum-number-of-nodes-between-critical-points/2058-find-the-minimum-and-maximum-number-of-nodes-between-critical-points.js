/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function(head) {
    let prev = head;
    let curr = head.next;
    let index = 1;

    let first = -1;
    let last = -1;
    let minDist = Infinity;

    while (curr.next) {
        if (
            (curr.val > prev.val && curr.val > curr.next.val) ||
            (curr.val < prev.val && curr.val < curr.next.val)
        ) {
            if (first === -1) first = index;
            else minDist = Math.min(minDist, index - last);
            
            last = index;
        }

        prev = curr;
        curr = curr.next;
        index++;
    }
    if (first === -1 || first === last) return [-1, -1];
    
    return [minDist, last - first];
};