import { nextPermutation } from "./lessons-21-to-30";
import {
    combinationSum,
    findFirstAndLastPositionSortedArray,
    isValidSudoku,
    longestValidParentheses,
    searchInRotatedSorted,
    searchInsertPosition,
    solveSudoku,
} from "./lessons-31-to-40";

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

describe("longestValidParentheses (stack method)", () => {
    test("LeetCode examples", () => {
        expect(longestValidParentheses("(()")).toBe(2);
        expect(longestValidParentheses(")()())")).toBe(4);
        expect(longestValidParentheses("")).toBe(0);
    });

    test("simple valids", () => {
        expect(longestValidParentheses("()")).toBe(2);
        expect(longestValidParentheses("()()")).toBe(4);
        expect(longestValidParentheses("(())")).toBe(4);
    });

    test("invalid-heavy strings", () => {
        expect(longestValidParentheses("((((")).toBe(0);
        expect(longestValidParentheses("))))")).toBe(0);
        expect(longestValidParentheses(")()(")).toBe(2);
    });

    test("mixed cases", () => {
        expect(longestValidParentheses("(()())")).toBe(6);
        expect(longestValidParentheses("()(()")).toBe(2);
        expect(longestValidParentheses(")(((((()())()()))()(()))(")).toBe(22);
    });

    test("edge lengths", () => {
        expect(longestValidParentheses("(")).toBe(0);
        expect(longestValidParentheses(")")).toBe(0);
        expect(longestValidParentheses("()(()())")).toBe(8);
    });
});

describe("Rotated Binary Search", () => {
    test("Example 1: nums = [4,5,6,7,0,1,2], target = 0", () => {
        expect(searchInRotatedSorted([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
    });

    test("Example 2: nums = [4,5,6,7,0,1,2], target = 3", () => {
        expect(searchInRotatedSorted([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
    });

    test("Example 3: nums = [1], target = 0", () => {
        expect(searchInRotatedSorted([1], 0)).toBe(-1);
    });

    test("Target is first element", () => {
        expect(searchInRotatedSorted([6, 7, 0, 1, 2, 3, 4, 5], 6)).toBe(0);
    });

    test("Target is last element", () => {
        expect(searchInRotatedSorted([6, 7, 0, 1, 2, 3, 4, 5], 5)).toBe(7);
    });

    test("Array without rotation", () => {
        expect(searchInRotatedSorted([1, 2, 3, 4, 5, 6, 7], 4)).toBe(3);
    });

    test("Single element array - target exists", () => {
        expect(searchInRotatedSorted([9], 9)).toBe(0);
    });

    test("Single element array - target does not exist", () => {
        expect(searchInRotatedSorted([9], 1)).toBe(-1);
    });
});

describe("findFirstAndLastPositionSortedArray", () => {
    it("should return [3,4] when target appears in the middle", () => {
        expect(findFirstAndLastPositionSortedArray([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4]);
    });

    it("should return [-1,-1] when target does not exist", () => {
        expect(findFirstAndLastPositionSortedArray([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1]);
    });

    it("should return [-1,-1] for empty array", () => {
        expect(findFirstAndLastPositionSortedArray([], 0)).toEqual([-1, -1]);
    });

    it("should handle single element matching target", () => {
        expect(findFirstAndLastPositionSortedArray([1], 1)).toEqual([0, 0]);
    });

    it("should handle single element not matching target", () => {
        expect(findFirstAndLastPositionSortedArray([1], 2)).toEqual([-1, -1]);
    });

    it("should handle target at the start of array", () => {
        expect(findFirstAndLastPositionSortedArray([2, 2, 2, 3, 4], 2)).toEqual([0, 2]);
    });

    it("should handle target at the end of array", () => {
        expect(findFirstAndLastPositionSortedArray([1, 3, 5, 5, 5], 5)).toEqual([2, 4]);
    });

    it("should handle array with all elements equal to target", () => {
        expect(findFirstAndLastPositionSortedArray([7, 7, 7, 7, 7], 7)).toEqual([0, 4]);
    });
});

describe("searchInsertPosition", () => {
    it("should return index when target is found", () => {
        expect(searchInsertPosition([1, 3, 5, 6], 5)).toBe(2);
    });

    it("should return insert position when target is smaller than first element", () => {
        expect(searchInsertPosition([1, 3, 5, 6], 0)).toBe(0);
    });

    it("should return insert position when target fits in the middle", () => {
        expect(searchInsertPosition([1, 3, 5, 6], 2)).toBe(1);
    });

    it("should return insert position when target is larger than all elements", () => {
        expect(searchInsertPosition([1, 3, 5, 6], 7)).toBe(4);
    });

    it("should handle empty array", () => {
        expect(searchInsertPosition([], 5)).toBe(0);
    });

    it("should handle single element array when target equals element", () => {
        expect(searchInsertPosition([2], 2)).toBe(0);
    });

    it("should handle single element array when target is smaller", () => {
        expect(searchInsertPosition([2], 1)).toBe(0);
    });

    it("should handle single element array when target is larger", () => {
        expect(searchInsertPosition([2], 3)).toBe(1);
    });
});

describe("isValidSudoku", () => {
    it("returns true for a valid partial board (example 1)", () => {
        const board = [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ];
        expect(isValidSudoku(board)).toBe(true);
    });

    it("returns false for an invalid board (example 2: duplicate in a sub-box)", () => {
        const board = [
            ["8", "3", ".", ".", "7", ".", ".", ".", "."], // changed 5 -> 8
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ];
        expect(isValidSudoku(board)).toBe(false);
    });

    it("detects duplicates in a row", () => {
        const board = [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            ["5", ".", ".", ".", "8", ".", ".", "7", "9"], // duplicate 5 in row 8
        ];
        expect(isValidSudoku(board)).toBe(false);
    });

    it("detects duplicates in a column", () => {
        const board = [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            ["5", "9", "8", ".", ".", ".", ".", "6", "."], // duplicate 5 in column 0
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ];
        expect(isValidSudoku(board)).toBe(false);
    });

    it("ignores dots and validates only filled cells", () => {
        const board = Array.from({ length: 9 }, () => Array(9).fill("."));
        board[0][0] = "1";
        board[1][1] = "1"; // same digit but different row/col/box OK? No -> same sub-box? (0,0) and (1,1) are same box
        expect(isValidSudoku(board)).toBe(false);
    });
});

describe("solveSudoku", () => {
    it("should solve the provided Sudoku puzzle", () => {
        const board: string[][] = [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
        ];

        const expected: string[][] = [
            ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
            ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
            ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
            ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
            ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
            ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
            ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
            ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
            ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
        ];

        solveSudoku(board);

        expect(board).toEqual(expected);
    });

    it("should handle an already solved board", () => {
        const solved: string[][] = [
            ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
            ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
            ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
            ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
            ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
            ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
            ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
            ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
            ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
        ];

        const input = solved.map((row) => [...row]); // copy

        solveSudoku(input);

        expect(input).toEqual(solved);
    });
});

describe("combinationSum", () => {
    it("example 1", () => {
        expect(combinationSum([2, 3, 6, 7], 7)).toEqual(expect.arrayContaining([[2, 2, 3], [7]]));
    });

    it("example 2", () => {
        expect(combinationSum([2, 3, 5], 8)).toEqual(
            expect.arrayContaining([
                [2, 2, 2, 2],
                [2, 3, 3],
                [3, 5],
            ])
        );
    });

    it("example 3", () => {
        expect(combinationSum([2], 1)).toEqual([]);
    });

    it("should handle single candidate equal to target", () => {
        expect(combinationSum([4], 4)).toEqual([[4]]);
    });

    it("should handle multiple solutions", () => {
        const result = combinationSum([2, 4, 6, 8], 8);
        expect(result).toEqual(expect.arrayContaining([[2, 2, 2, 2], [2, 6], [4, 4], [8]]));
    });
});
