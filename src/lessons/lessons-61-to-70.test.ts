import { ListNode } from "../models/node-list.model";
import { buildList, listToArray } from "../utills/jest.utils";
import { uniquePaths } from "./lessons-61-to-70";

export function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next || k === 0) return head;

    // 1. Find length and tail
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }

    // 2. Make it circular
    tail.next = head;

    // 3. Find new head
    k = k % length;
    let stepsToNewHead = length - k;
    let newTail = tail;

    while (stepsToNewHead > 0) {
        newTail = newTail.next!;
        stepsToNewHead--;
    }

    const newHead = newTail.next;
    newTail.next = null;

    return newHead;
}

describe("LeetCode 61 - Rotate List", () => {
    test("Example case 1", () => {
        const head = buildList([1, 2, 3, 4, 5]);
        const rotated = rotateRight(head, 2);
        expect(listToArray(rotated)).toEqual([4, 5, 1, 2, 3]);
    });

    test("Example case 2", () => {
        const head = buildList([0, 1, 2]);
        const rotated = rotateRight(head, 4);
        expect(listToArray(rotated)).toEqual([2, 0, 1]);
    });

    test("Rotate by 0 (no change)", () => {
        const head = buildList([1, 2, 3]);
        const rotated = rotateRight(head, 0);
        expect(listToArray(rotated)).toEqual([1, 2, 3]);
    });

    test("Rotate empty list", () => {
        const head = buildList([]);
        const rotated = rotateRight(head, 3);
        expect(listToArray(rotated)).toEqual([]);
    });

    test("Rotate single element list", () => {
        const head = buildList([1]);
        const rotated = rotateRight(head, 99);
        expect(listToArray(rotated)).toEqual([1]);
    });

    test("Rotate by multiple of list length", () => {
        const head = buildList([1, 2, 3, 4]);
        const rotated = rotateRight(head, 8); // same as rotate by 0
        expect(listToArray(rotated)).toEqual([1, 2, 3, 4]);
    });
});

describe("LeetCode 62 - Unique Paths", () => {
    test("Example case 1", () => {
        expect(uniquePaths(3, 7)).toBe(28);
    });

    test("Example case 2", () => {
        expect(uniquePaths(3, 2)).toBe(3);
    });

    test("1x1 grid (only one path)", () => {
        expect(uniquePaths(1, 1)).toBe(1);
    });

    test("1xN grid (only one path, straight right)", () => {
        expect(uniquePaths(1, 5)).toBe(1);
    });

    test("Mx1 grid (only one path, straight down)", () => {
        expect(uniquePaths(5, 1)).toBe(1);
    });

    test("Square grid 3x3", () => {
        expect(uniquePaths(3, 3)).toBe(6);
    });

    test("Square grid 4x4", () => {
        expect(uniquePaths(4, 4)).toBe(20);
    });

    test("Large grid 10x10", () => {
        expect(uniquePaths(10, 10)).toBe(48620);
    });
});
