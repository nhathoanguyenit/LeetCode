import { ListNode } from "../models/node-list.model";

export function arrayToList(arr: number[]): ListNode | null {
    let dummy = new ListNode(0);
    let curr = dummy;
    for (const num of arr) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

export function listToArray(head: ListNode | null): number[] {
    const arr: number[] = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    return arr;
}

export function normalizeTriplets(arr: number[][]): number[][] {
    const innerSorted = arr.map((t) => [...t].sort((a, b) => a - b));
    innerSorted.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    return innerSorted;
}

export function buildList(arr: number[]): ListNode | null {
    const dummy = new ListNode(0);
    let curr = dummy;
    for (let num of arr) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}
