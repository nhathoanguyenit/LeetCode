import { ListNode } from "../models/node-list.model";
import { buildList, listToArray } from "../utills/jest.utils";
import { divide, generateParenthesis, mergeKLists, mergeTwoLists, nextPermutation, removeDuplicates, removeElement, reverseKGroup, strStr, swapPairs } from "./lessons-21-to-30";

describe("nextPermutation", () => {
    test("basic examples", () => {
      const a1 = [1, 2, 3];
      nextPermutation(a1);
      expect(a1).toEqual([1, 3, 2]);
  
      const a2 = [3, 2, 1];
      nextPermutation(a2);
      expect(a2).toEqual([1, 2, 3]);
  
      const a3 = [1, 1, 5];
      nextPermutation(a3);
      expect(a3).toEqual([1, 5, 1]);
    });
  
    test("in-place mutation (same array reference)", () => {
      const arr = [1, 4, 3, 2];
      const ref = arr;
      nextPermutation(arr);
      expect(arr).toBe(ref); 
    });
  
    test("longer arrays and duplicates", () => {
      const a = [1, 2, 3, 6, 5, 4];
      nextPermutation(a);
     
      expect(a).toEqual([1, 2, 4, 3, 5, 6]);
  
      const b = [2, 2, 0, 4, 3];
      nextPermutation(b);
      expect(b).toEqual([2, 2, 3, 0, 4]);
    });
  
    test("single element and empty", () => {
      const single = [42];
      nextPermutation(single);
      expect(single).toEqual([42]);
  
      const empty: number[] = [];
      nextPermutation(empty);
      expect(empty).toEqual([]);
    });
  
    test("already-last -> becomes first", () => {
      const last = [5, 4, 3, 2, 1];
      nextPermutation(last);
      expect(last).toEqual([1, 2, 3, 4, 5]);
    });
});