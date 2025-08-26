import { ListNode } from "../models/node-list.model";
import { buildList, listToArray } from "../utills/jest.utils";
import { divide, generateParenthesis, mergeKLists, mergeTwoLists, removeDuplicates, removeElement, reverseKGroup, strStr, swapPairs } from "./lessons-21-to-30";

describe("mergeTwoLists", () => {
    test("Example 1: [1,2,4] and [1,3,4]", () => {
        const list1 = buildList([1, 2, 4]);
        const list2 = buildList([1, 3, 4]);
        const result = mergeTwoLists(list1, list2);
        expect(listToArray(result)).toEqual([1, 1, 2, 3, 4, 4]);
    });

    test("Example 2: both empty", () => {
        const list1 = buildList([]);
        const list2 = buildList([]);
        const result = mergeTwoLists(list1, list2);
        expect(listToArray(result)).toEqual([]);
    });

    test("Example 3: one empty, one non-empty", () => {
        const list1 = buildList([]);
        const list2 = buildList([0]);
        const result = mergeTwoLists(list1, list2);
        expect(listToArray(result)).toEqual([0]);
    });

    test("Custom: different lengths", () => {
        const list1 = buildList([1, 5, 7]);
        const list2 = buildList([2, 3, 6, 8]);
        const result = mergeTwoLists(list1, list2);
        expect(listToArray(result)).toEqual([1, 2, 3, 5, 6, 7, 8]);
    });

    test("Custom: negative values", () => {
        const list1 = buildList([-10, -3, 0]);
        const list2 = buildList([-5, -2, 1]);
        const result = mergeTwoLists(list1, list2);
        expect(listToArray(result)).toEqual([-10, -5, -3, -2, 0, 1]);
    });
});

describe("generateParenthesis", () => {
    it("should generate all valid parentheses for n = 1", () => {
        expect(generateParenthesis(1).sort()).toEqual(["()"]);
    });

    it("should generate all valid parentheses for n = 2", () => {
        const result = generateParenthesis(2).sort();
        expect(result).toEqual(["(())", "()()"]);
    });

    it("should generate all valid parentheses for n = 3", () => {
        const result = generateParenthesis(3).sort();
        expect(result).toEqual(["((()))", "(()())", "(())()", "()(())", "()()()"]);
    });

    it("should handle upper bound n = 8 (just check length)", () => {
        const result = generateParenthesis(8);
        // Catalan(8) = 1430 combinations
        expect(result.length).toBe(1430);
    });
});

describe("generateParenthesis", () => {
    test("mergeKLists example 1", () => {
        const lists = [buildList([1, 4, 5]), buildList([1, 3, 4]), buildList([2, 6])];
        const result = mergeKLists(lists);
        expect(listToArray(result)).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
    });

    test("mergeKLists empty lists", () => {
        const lists: (ListNode | null)[] = [];
        expect(mergeKLists(lists)).toBeNull();
    });

    test("mergeKLists [[]]", () => {
        const lists = [buildList([])];
        expect(mergeKLists(lists)).toBeNull();
    });

    test("mergeKLists with one list", () => {
        const lists = [buildList([1, 2, 3])];
        expect(listToArray(mergeKLists(lists))).toEqual([1, 2, 3]);
    });
});

describe("swapPairs", () => {
    it("should swap every two adjacent nodes in [1,2,3,4]", () => {
        const head = buildList([1, 2, 3, 4]);
        const result = swapPairs(head);
        expect(listToArray(result)).toEqual([2, 1, 4, 3]);
    });

    it("should return [] for empty list", () => {
        const head = buildList([]);
        const result = swapPairs(head);
        expect(listToArray(result)).toEqual([]);
    });

    it("should return [1] for single node list", () => {
        const head = buildList([1]);
        const result = swapPairs(head);
        expect(listToArray(result)).toEqual([1]);
    });

    it("should swap only the first pair in [1,2,3]", () => {
        const head = buildList([1, 2, 3]);
        const result = swapPairs(head);
        expect(listToArray(result)).toEqual([2, 1, 3]);
    });

    it("should work for longer lists", () => {
        const head = buildList([1, 2, 3, 4, 5, 6]);
        const result = swapPairs(head);
        expect(listToArray(result)).toEqual([2, 1, 4, 3, 6, 5]);
    });
});

describe("reverseKGroup", () => {
    it("Example 1: [1,2,3,4,5], k=2 -> [2,1,4,3,5]", () => {
        const head = buildList([1, 2, 3, 4, 5]);
        const res = reverseKGroup(head, 2);
        expect(listToArray(res)).toEqual([2, 1, 4, 3, 5]);
    });

    it("Example 2: [1,2,3,4,5], k=3 -> [3,2,1,4,5]", () => {
        const head = buildList([1, 2, 3, 4, 5]);
        const res = reverseKGroup(head, 3);
        expect(listToArray(res)).toEqual([3, 2, 1, 4, 5]);
    });

    it("Empty list stays empty", () => {
        const head = buildList([]);
        const res = reverseKGroup(head, 2);
        expect(listToArray(res)).toEqual([]);
    });

    it("Single node unchanged for any valid k", () => {
        const head = buildList([1]);
        const res = reverseKGroup(head, 1);
        expect(listToArray(res)).toEqual([1]);
    });

    it("k equals list length: full reversal", () => {
        const head = buildList([1, 2, 3, 4]);
        const res = reverseKGroup(head, 4);
        expect(listToArray(res)).toEqual([4, 3, 2, 1]);
    });

    it("k=1 should return the same list", () => {
        const head = buildList([1, 2, 3, 4, 5]);
        const res = reverseKGroup(head, 1);
        expect(listToArray(res)).toEqual([1, 2, 3, 4, 5]);
    });

    it("Not a multiple of k: tail remains as-is", () => {
        const head = buildList([1, 2, 3, 4, 5, 6, 7]);
        const res = reverseKGroup(head, 4);
        // [1,2,3,4] -> [4,3,2,1], remaining [5,6,7] unchanged
        expect(listToArray(res)).toEqual([4, 3, 2, 1, 5, 6, 7]);
    });

    it("All groups reversed when length is multiple of k", () => {
        const head = buildList([1, 2, 3, 4, 5, 6]);
        const res = reverseKGroup(head, 3);
        expect(listToArray(res)).toEqual([3, 2, 1, 6, 5, 4]);
    });

    it("Handles duplicates and zeros", () => {
        const head = buildList([0, 0, 1, 1, 2, 2]);
        const res = reverseKGroup(head, 2);
        expect(listToArray(res)).toEqual([0, 0, 1, 1, 2, 2]); // pairs swapped but same values
    });
});

describe("removeDuplicates", () => {
    it("should handle [1,1,2]", () => {
        const nums = [1, 1, 2];
        const k = removeDuplicates(nums);
        expect(k).toBe(2);
        expect(nums.slice(0, k)).toEqual([1, 2]);
    });

    it("should handle [0,0,1,1,1,2,2,3,3,4]", () => {
        const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
        const k = removeDuplicates(nums);
        expect(k).toBe(5);
        expect(nums.slice(0, k)).toEqual([0, 1, 2, 3, 4]);
    });

    it("should handle array with no duplicates", () => {
        const nums = [1, 2, 3, 4, 5];
        const k = removeDuplicates(nums);
        expect(k).toBe(5);
        expect(nums.slice(0, k)).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle array with all same numbers", () => {
        const nums = [7, 7, 7, 7];
        const k = removeDuplicates(nums);
        expect(k).toBe(1);
        expect(nums.slice(0, k)).toEqual([7]);
    });

    it("should handle single element array", () => {
        const nums = [42];
        const k = removeDuplicates(nums);
        expect(k).toBe(1);
        expect(nums.slice(0, k)).toEqual([42]);
    });
});


describe("removeElement", () => {
  it("should remove all occurrences of val (example 1)", () => {
      const nums = [3, 2, 2, 3];
      const k = removeElement(nums, 3);
      expect(k).toBe(2);
      expect(nums.slice(0, k).sort()).toEqual([2, 2]);
  });

  it("should remove all occurrences of val (example 2)", () => {
      const nums = [0, 1, 2, 2, 3, 0, 4, 2];
      const k = removeElement(nums, 2);
      expect(k).toBe(5);
      expect(nums.slice(0, k).sort()).toEqual([0, 0, 1, 3, 4]);
  });

  it("should handle array with no val", () => {
      const nums = [1, 2, 3, 4];
      const k = removeElement(nums, 5);
      expect(k).toBe(4);
      expect(nums.slice(0, k)).toEqual([1, 2, 3, 4]);
  });

  it("should handle array where all elements equal val", () => {
      const nums = [7, 7, 7];
      const k = removeElement(nums, 7);
      expect(k).toBe(0);
  });

  it("should handle empty array", () => {
      const nums: number[] = [];
      const k = removeElement(nums, 1);
      expect(k).toBe(0);
  });
});


describe("strStr", () => {
  it("should return index of first occurrence (example 1)", () => {
      expect(strStr("sadbutsad", "sad")).toBe(0);
  });

  it("should return -1 if not found (example 2)", () => {
      expect(strStr("leetcode", "leeto")).toBe(-1);
  });

  it("should return 2 when needle is found in middle", () => {
      expect(strStr("hello", "ll")).toBe(2);
  });

  it("should return 0 when needle equals haystack", () => {
      expect(strStr("abc", "abc")).toBe(0);
  });

  it("should return last index if needle occurs at end", () => {
      expect(strStr("abc", "c")).toBe(2);
  });

  it("should return -1 when needle longer than haystack", () => {
      expect(strStr("ab", "abc")).toBe(-1);
  });
});

describe("divide", () => {
    it("should divide positive numbers correctly", () => {
      expect(divide(10, 3)).toBe(3);   // 10/3 = 3.333 → 3
      expect(divide(15, 5)).toBe(3);   // 15/5 = 3
      expect(divide(1, 1)).toBe(1);    // 1/1 = 1
    });
  
    it("should divide with negative divisor correctly", () => {
      expect(divide(7, -3)).toBe(-2);  // 7 / -3 = -2.333 → -2
      expect(divide(-7, 3)).toBe(-2);  // -7 / 3 = -2.333 → -2
      expect(divide(-10, -2)).toBe(5); // -10 / -2 = 5
    });
  
    it("should handle dividend smaller than divisor", () => {
      expect(divide(2, 3)).toBe(0);    // 2/3 = 0.666 → 0
      expect(divide(-2, 3)).toBe(0);   // -2/3 = -0.666 → 0
    });
  
    it("should handle edge cases with overflow", () => {
      const INT_MIN = -(2 ** 31);
      const INT_MAX = 2 ** 31 - 1;
  
      expect(divide(INT_MIN, -1)).toBe(INT_MAX); // overflow case
      expect(divide(INT_MIN, 1)).toBe(INT_MIN);  // no overflow
    });
  
    it("should handle divisor = 1 or -1", () => {
      expect(divide(12345, 1)).toBe(12345);
      expect(divide(12345, -1)).toBe(-12345);
    });
  
    it("should handle large numbers correctly", () => {
      expect(divide(2 ** 30, 2)).toBe(2 ** 29);
      expect(divide(-(2 ** 30), 2)).toBe(-(2 ** 29));
    });
  });