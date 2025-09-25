import {
    canJump,
    generateMatrix,
    insert,
    lengthOfLastWord,
    maxSubArray,
    merge,
    solveNQueens,
    totalNQueens,
} from "./lessons-51-to-60";

describe("solveNQueens", () => {
    test("n = 1", () => {
        expect(solveNQueens(1)).toEqual([["Q"]]);
    });

    test("n = 2", () => {
        expect(solveNQueens(2)).toEqual([]);
    });

    test("n = 3", () => {
        expect(solveNQueens(3)).toEqual([]);
    });

    test("n = 4", () => {
        const solutions = solveNQueens(4);
        expect(solutions.length).toBe(2);

        const expected = [
            [".Q..", "...Q", "Q...", "..Q."],
            ["..Q.", "Q...", "...Q", ".Q.."],
        ];

        expect(new Set(solutions.map((sol) => JSON.stringify(sol)))).toEqual(
            new Set(expected.map((sol) => JSON.stringify(sol)))
        );
    });

    test("n = 5 should have 10 solutions", () => {
        const solutions = solveNQueens(5);
        expect(solutions.length).toBe(10);
    });

    test("n = 6 should have 4 solutions", () => {
        const solutions = solveNQueens(6);
        expect(solutions.length).toBe(4);
    });
});

describe("totalNQueens (backtracking with isSafe)", () => {
    test("small n", () => {
        expect(totalNQueens(1)).toBe(1);
        expect(totalNQueens(2)).toBe(0);
        expect(totalNQueens(3)).toBe(0);
    });

    test("n = 4", () => {
        expect(totalNQueens(4)).toBe(2);
    });

    test("n = 5", () => {
        expect(totalNQueens(5)).toBe(10);
    });

    test("n = 6", () => {
        expect(totalNQueens(6)).toBe(4);
    });

    test("n = 7", () => {
        expect(totalNQueens(7)).toBe(40);
    });

    test("n = 8", () => {
        expect(totalNQueens(8)).toBe(92);
    });

    test("n = 9", () => {
        expect(totalNQueens(9)).toBe(352);
    });
});

describe("LeetCode 53 - Maximum Subarray", () => {
    test("Example case: [-2,1,-3,4,-1,2,1,-5,4]", () => {
        expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    });

    test("Single element array", () => {
        expect(maxSubArray([5])).toBe(5);
        expect(maxSubArray([-1])).toBe(-1);
    });

    test("All positive numbers", () => {
        expect(maxSubArray([1, 2, 3, 4])).toBe(10);
    });

    test("All negative numbers", () => {
        expect(maxSubArray([-2, -3, -1, -5])).toBe(-1);
    });

    test("Mixed numbers with maximum at the end", () => {
        expect(maxSubArray([-1, -2, 3, 4, 5])).toBe(12);
    });

    test("Mixed numbers with maximum in the middle", () => {
        expect(maxSubArray([4, -1, 2, 1, -5, 4])).toBe(6);
    });
});

describe("LeetCode 55 - Jump Game", () => {
    test("Example case 1: [2,3,1,1,4]", () => {
        expect(canJump([2, 3, 1, 1, 4])).toBe(true);
    });

    test("Example case 2: [3,2,1,0,4]", () => {
        expect(canJump([3, 2, 1, 0, 4])).toBe(false);
    });

    test("Single element array", () => {
        expect(canJump([0])).toBe(true); // already at last index
    });

    test("All large jumps", () => {
        expect(canJump([5, 4, 3, 2, 1, 0])).toBe(true);
    });

    test("Zero at the end is fine", () => {
        expect(canJump([2, 3, 1, 0, 0])).toBe(true);
    });

    test("Cannot reach last index", () => {
        expect(canJump([1, 0, 2])).toBe(false);
    });

    test("Edge case: very large first jump", () => {
        expect(canJump([100, 0, 0, 0, 0])).toBe(true);
    });

    test("Edge case: trapped before last index", () => {
        expect(canJump([2, 0, 0, 0])).toBe(false);
    });
});

describe("LeetCode 56 - Merge Intervals", () => {
    test("Example case 1: overlapping intervals", () => {
        const intervals = [
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18],
        ];
        expect(merge(intervals)).toEqual([
            [1, 6],
            [8, 10],
            [15, 18],
        ]);
    });

    test("Example case 2: touching intervals", () => {
        const intervals = [
            [1, 4],
            [4, 5],
        ];
        expect(merge(intervals)).toEqual([[1, 5]]);
    });

    test("No intervals", () => {
        expect(merge([])).toEqual([]);
    });

    test("Single interval", () => {
        expect(merge([[5, 7]])).toEqual([[5, 7]]);
    });

    test("Already non-overlapping", () => {
        const intervals = [
            [1, 2],
            [3, 4],
            [5, 6],
        ];
        expect(merge(intervals)).toEqual([
            [1, 2],
            [3, 4],
            [5, 6],
        ]);
    });

    test("All overlapping into one", () => {
        const intervals = [
            [1, 5],
            [2, 6],
            [3, 7],
            [4, 8],
        ];
        expect(merge(intervals)).toEqual([[1, 8]]);
    });

    test("Unsorted input", () => {
        const intervals = [
            [6, 8],
            [1, 9],
            [2, 4],
            [4, 7],
        ];
        expect(merge(intervals)).toEqual([[1, 9]]);
    });

    test("Intervals with same start", () => {
        const intervals = [
            [1, 3],
            [1, 4],
            [1, 2],
        ];
        expect(merge(intervals)).toEqual([[1, 4]]);
    });
});

describe("LeetCode 57 - Insert Interval", () => {
    test("Example case 1", () => {
        const intervals = [
            [1, 3],
            [6, 9],
        ];
        const newInterval = [2, 5];
        expect(insert(intervals, newInterval)).toEqual([
            [1, 5],
            [6, 9],
        ]);
    });

    test("Example case 2", () => {
        const intervals = [
            [1, 2],
            [3, 5],
            [6, 7],
            [8, 10],
            [12, 16],
        ];
        const newInterval = [4, 8];
        expect(insert(intervals, newInterval)).toEqual([
            [1, 2],
            [3, 10],
            [12, 16],
        ]);
    });

    test("Insert at beginning with no overlap", () => {
        const intervals = [
            [5, 7],
            [8, 10],
        ];
        const newInterval = [1, 2];
        expect(insert(intervals, newInterval)).toEqual([
            [1, 2],
            [5, 7],
            [8, 10],
        ]);
    });

    test("Insert at end with no overlap", () => {
        const intervals = [
            [1, 2],
            [3, 4],
        ];
        const newInterval = [6, 7];
        expect(insert(intervals, newInterval)).toEqual([
            [1, 2],
            [3, 4],
            [6, 7],
        ]);
    });
});

describe("LeetCode 58 - Length of Last Word", () => {
    test("Example case 1", () => {
        const s = "Hello World";
        expect(lengthOfLastWord(s)).toBe(5);
    });

    test("Example case 2", () => {
        const s = "   fly me   to   the moon  ";
        expect(lengthOfLastWord(s)).toBe(4);
    });

    test("Example case 3", () => {
        const s = "luffy is still joyboy";
        expect(lengthOfLastWord(s)).toBe(6);
    });

    test("Single word string", () => {
        const s = "OpenAI";
        expect(lengthOfLastWord(s)).toBe(6);
    });

    test("String with trailing spaces", () => {
        const s = "day   ";
        expect(lengthOfLastWord(s)).toBe(3);
    });

    test("String with only spaces", () => {
        const s = "     ";
        expect(lengthOfLastWord(s)).toBe(0);
    });

    test("Word at beginning with spaces after", () => {
        const s = "hello   ";
        expect(lengthOfLastWord(s)).toBe(5);
    });

    test("Word in middle and spaces after", () => {
        const s = "hi there   ";
        expect(lengthOfLastWord(s)).toBe(5);
    });
});

describe("LeetCode 59 - Spiral Matrix II", () => {
    test("n = 1", () => {
        expect(generateMatrix(1)).toEqual([[1]]);
    });

    test("n = 2", () => {
        expect(generateMatrix(2)).toEqual([
            [1, 2],
            [4, 3],
        ]);
    });

    test("n = 3", () => {
        expect(generateMatrix(3)).toEqual([
            [1, 2, 3],
            [8, 9, 4],
            [7, 6, 5],
        ]);
    });

    test("n = 4", () => {
        expect(generateMatrix(4)).toEqual([
            [1, 2, 3, 4],
            [12, 13, 14, 5],
            [11, 16, 15, 6],
            [10, 9, 8, 7],
        ]);
    });

    test("n = 5", () => {
        expect(generateMatrix(5)).toEqual([
            [1, 2, 3, 4, 5],
            [16, 17, 18, 19, 6],
            [15, 24, 25, 20, 7],
            [14, 23, 22, 21, 8],
            [13, 12, 11, 10, 9],
        ]);
    });
});
