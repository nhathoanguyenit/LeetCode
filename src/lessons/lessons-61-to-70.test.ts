import { ListNode } from "../models/node-list.model";
import { buildList, listToArray } from "../utills/jest.utils";
import {
    addBinary,
    climbStairs,
    fullJustify,
    isNumber,
    minPathSum1D,
    mySqrt,
    plusOne,
    uniquePaths,
    uniquePathsWithObstacles,
} from "./lessons-61-to-70";

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

describe("LeetCode 63 - Unique Paths II", () => {
    test("Example case 1", () => {
        const grid = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
        ];
        expect(uniquePathsWithObstacles(grid)).toBe(2);
    });

    test("Example case 2", () => {
        const grid = [
            [0, 1],
            [0, 0],
        ];
        expect(uniquePathsWithObstacles(grid)).toBe(1);
    });

    test("Single cell with no obstacle", () => {
        const grid = [[0]];
        expect(uniquePathsWithObstacles(grid)).toBe(1);
    });

    test("Single cell with obstacle", () => {
        const grid = [[1]];
        expect(uniquePathsWithObstacles(grid)).toBe(0);
    });

    test("Obstacle at start position", () => {
        const grid = [
            [1, 0],
            [0, 0],
        ];
        expect(uniquePathsWithObstacles(grid)).toBe(0);
    });

    test("Obstacle at end position", () => {
        const grid = [
            [0, 0],
            [0, 1],
        ];
        expect(uniquePathsWithObstacles(grid)).toBe(0);
    });

    test("Row fully blocked", () => {
        const grid = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ];
        expect(uniquePathsWithObstacles(grid)).toBe(0);
    });

    test("Column fully blocked", () => {
        const grid = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
        ];
        expect(uniquePathsWithObstacles(grid)).toBe(0);
    });

    test("Larger grid without obstacles", () => {
        const grid = Array.from({ length: 3 }, () => Array(3).fill(0));
        expect(uniquePathsWithObstacles(grid)).toBe(6);
    });
});

describe("LeetCode 64 - Minimum Path Sum (1D DP)", () => {
    test("Example 1", () => {
        const grid = [
            [1, 3, 1],
            [1, 5, 1],
            [4, 2, 1],
        ];
        expect(minPathSum1D(grid)).toBe(7);
    });

    test("Example 2", () => {
        const grid = [
            [1, 2, 3],
            [4, 5, 6],
        ];
        expect(minPathSum1D(grid)).toBe(12);
    });

    test("Single cell grid", () => {
        expect(minPathSum1D([[5]])).toBe(5);
    });

    test("Single row grid", () => {
        expect(minPathSum1D([[1, 2, 3, 4]])).toBe(10);
    });

    test("Single column grid", () => {
        expect(minPathSum1D([[1], [2], [3], [4]])).toBe(10);
    });

    test("Larger 4x4 grid", () => {
        const grid = [
            [1, 3, 1, 2],
            [2, 1, 8, 1],
            [4, 2, 1, 3],
            [2, 3, 2, 1],
        ];
        expect(minPathSum1D(grid)).toBe(11);
    });
});

describe("LeetCode 65 - Valid Number", () => {
    test("Valid integers", () => {
        expect(isNumber("2")).toBe(true);
        expect(isNumber("0089")).toBe(true);
        expect(isNumber("-42")).toBe(true);
        expect(isNumber("+3")).toBe(true);
    });

    test("Valid decimals", () => {
        expect(isNumber("3.14")).toBe(true);
        expect(isNumber("-0.1")).toBe(true);
        expect(isNumber(".1")).toBe(true);
        expect(isNumber("2.")).toBe(true);
    });

    test("Valid scientific notation", () => {
        expect(isNumber("2e10")).toBe(true);
        expect(isNumber("-90E3")).toBe(true);
        expect(isNumber("53.5e93")).toBe(true);
        expect(isNumber("-123.456e789")).toBe(true);
    });

    test("Invalid numbers", () => {
        expect(isNumber("abc")).toBe(false);
        expect(isNumber("1a")).toBe(false);
        expect(isNumber("1e")).toBe(false);
        expect(isNumber("e3")).toBe(false);
        expect(isNumber("99e2.5")).toBe(false);
        expect(isNumber("--6")).toBe(false);
        expect(isNumber("-+3")).toBe(false);
        expect(isNumber("95a54e53")).toBe(false);
    });
});

describe("LeetCode 66 - Plus One", () => {
    test("Simple increment", () => {
        expect(plusOne([1, 2, 3])).toEqual([1, 2, 4]);
    });

    test("Carryover with last digit 9", () => {
        expect(plusOne([1, 2, 9])).toEqual([1, 3, 0]);
    });

    test("Multiple carryovers", () => {
        expect(plusOne([9, 9, 9])).toEqual([1, 0, 0, 0]);
    });

    test("Single digit", () => {
        expect(plusOne([0])).toEqual([1]);
        expect(plusOne([9])).toEqual([1, 0]);
    });
});

describe("LeetCode 67 - Add Binary", () => {
    test("Basic cases", () => {
        expect(addBinary("11", "1")).toBe("100");
        expect(addBinary("1010", "1011")).toBe("10101");
    });

    test("Different lengths", () => {
        expect(addBinary("1", "111")).toBe("1000");
        expect(addBinary("0", "101")).toBe("101");
    });

    test("Edge cases", () => {
        expect(addBinary("0", "0")).toBe("0");
        expect(addBinary("111", "111")).toBe("1110");
    });
});

describe("LeetCode 68 - Text Justification", () => {
    test("Example case 1", () => {
        const words = ["This", "is", "an", "example", "of", "text", "justification."];
        const maxWidth = 16;
        expect(fullJustify(words, maxWidth)).toEqual(["This    is    an", "example  of text", "justification.  "]);
    });

    test("Example case 2", () => {
        const words = ["What", "must", "be", "acknowledgment", "shall", "be"];
        const maxWidth = 16;
        expect(fullJustify(words, maxWidth)).toEqual(["What   must   be", "acknowledgment  ", "shall be        "]);
    });

    test("Single word per line", () => {
        const words = ["Single", "Word", "Lines"];
        const maxWidth = 10;
        expect(fullJustify(words, maxWidth)).toEqual(["Single    ", "Word      ", "Lines     "]);
    });

    test("Last line left-justified", () => {
        const words = ["a", "b", "c", "d", "e"];
        const maxWidth = 3;
        expect(fullJustify(words, maxWidth)).toEqual(["a b", "c d", "e  "]);
    });

    test("Edge case: one word fits exactly", () => {
        const words = ["perfect"];
        const maxWidth = 7;
        expect(fullJustify(words, maxWidth)).toEqual(["perfect"]);
    });
});

describe("LeetCode 69 - Sqrt(x)", () => {
    test("Small numbers", () => {
        expect(mySqrt(0)).toBe(0);
        expect(mySqrt(1)).toBe(1);
        expect(mySqrt(2)).toBe(1); // sqrt(2) ≈ 1.41
        expect(mySqrt(3)).toBe(1); // sqrt(3) ≈ 1.73
        expect(mySqrt(4)).toBe(2);
    });

    test("Perfect squares", () => {
        expect(mySqrt(9)).toBe(3);
        expect(mySqrt(16)).toBe(4);
        expect(mySqrt(25)).toBe(5);
        expect(mySqrt(100)).toBe(10);
    });

    test("Non-perfect squares", () => {
        expect(mySqrt(8)).toBe(2); // sqrt(8) ≈ 2.82
        expect(mySqrt(15)).toBe(3); // sqrt(15) ≈ 3.87
        expect(mySqrt(26)).toBe(5); // sqrt(26) ≈ 5.09
    });

    test("Large input", () => {
        expect(mySqrt(2147395599)).toBe(46339); // max near sqrt(INT_MAX)
    });
});

describe("LeetCode 70 - Climbing Stairs", () => {
  test("n = 1", () => {
    expect(climbStairs(1)).toBe(1);
  });

  test("n = 2", () => {
    expect(climbStairs(2)).toBe(2);
  });

  test("n = 3", () => {
    expect(climbStairs(3)).toBe(3); // [1+1+1], [1+2], [2+1]
  });

  test("n = 4", () => {
    expect(climbStairs(4)).toBe(5); 
  });

  test("n = 5", () => {
    expect(climbStairs(5)).toBe(8); 
  });

  test("n = 10", () => {
    expect(climbStairs(10)).toBe(89);
  });

  test("large n = 45", () => {
    expect(climbStairs(45)).toBe(1836311903); // known Fibonacci number
  });
});
