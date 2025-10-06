import { combine, exist, minDistance, minWindow, removeDuplicates, searchMatrix, setZeroes, simplifyPath, sortColors } from "./lessons-71-to-80";

describe("LeetCode 71 - Simplify Path", () => {
    test("Root only", () => {
        expect(simplifyPath("/")).toBe("/");
    });

    test("Handles multiple slashes", () => {
        expect(simplifyPath("/home//foo/")).toBe("/home/foo");
    });

    test("Handles current directory '.'", () => {
        expect(simplifyPath("/a/./b/./c/")).toBe("/a/b/c");
    });

    test("Handles parent directory '..'", () => {
        expect(simplifyPath("/a/./b/../../c/")).toBe("/c");
    });

    test("Multiple .. leading beyond root", () => {
        expect(simplifyPath("/../../..")).toBe("/");
    });

    test("Trailing slash removal", () => {
        expect(simplifyPath("/a/b/c/")).toBe("/a/b/c");
    });

    test("Keeps valid folder names like '...'", () => {
        expect(simplifyPath("/a/.../b")).toBe("/a/.../b");
    });

    test("Complex mix", () => {
        expect(simplifyPath("/a//b////c/d//././/..")).toBe("/a/b/c");
    });
});

describe("LeetCode 72 - Edit Distance", () => {
  it("should return 3 for horse -> ros", () => {
    expect(minDistance("horse", "ros")).toBe(3);
  });

  it("should return 5 for intention -> execution", () => {
    expect(minDistance("intention", "execution")).toBe(5);
  });

  it("should return 0 when both strings are empty", () => {
    expect(minDistance("", "")).toBe(0);
  });

  it("should return length of word2 when word1 is empty", () => {
    expect(minDistance("", "abc")).toBe(3);
  });

  it("should return length of word1 when word2 is empty", () => {
    expect(minDistance("abc", "")).toBe(3);
  });

  it("should return 1 when only one replacement is needed", () => {
    expect(minDistance("a", "b")).toBe(1);
  });

  it("should return 1 when only one insertion is needed", () => {
    expect(minDistance("a", "ab")).toBe(1);
  });

  it("should return 1 when only one deletion is needed", () => {
    expect(minDistance("ab", "a")).toBe(1);
  });

  it("should return 2 for completely different strings of length 2", () => {
    expect(minDistance("ab", "cd")).toBe(2);
  });

  it("should handle longer identical strings with 0 operations", () => {
    expect(minDistance("longstring", "longstring")).toBe(0);
  });

  it("should handle prefix vs longer string", () => {
    expect(minDistance("abc", "abcdef")).toBe(3);
  });

  it("should handle suffix vs longer string", () => {
    expect(minDistance("def", "abcdef")).toBe(3);
  });
});

describe("LeetCode 73 - Set Matrix Zeroes", () => {
  test("Example 1", () => {
    const matrix = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ];
    setZeroes(matrix);
    expect(matrix).toEqual([
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ]);
  });

  test("Example 2", () => {
    const matrix = [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5]
    ];
    setZeroes(matrix);
    expect(matrix).toEqual([
      [0, 0, 0, 0],
      [0, 4, 5, 0],
      [0, 3, 1, 0]
    ]);
  });

  test("Matrix with no zero", () => {
    const matrix = [
      [1, 2],
      [3, 4]
    ];
    setZeroes(matrix);
    expect(matrix).toEqual([
      [1, 2],
      [3, 4]
    ]);
  });

  test("Matrix all zero", () => {
    const matrix = [
      [0, 0],
      [0, 0]
    ];
    setZeroes(matrix);
    expect(matrix).toEqual([
      [0, 0],
      [0, 0]
    ]);
  });
});

describe("searchMatrix (LeetCode 74) - correctness", () => {
  it("finds targets that exist (example matrix)", () => {
    const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ];
    expect(searchMatrix(matrix, 3)).toBe(true);
    expect(searchMatrix(matrix, 16)).toBe(true);
    expect(searchMatrix(matrix, 60)).toBe(true);
  });

  it("returns false when target does not exist (example matrix)", () => {
    const matrix = [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ];
    expect(searchMatrix(matrix, 13)).toBe(false);
    expect(searchMatrix(matrix, 61)).toBe(false);
    expect(searchMatrix(matrix, 0)).toBe(false);
  });

  it("handles empty matrix and [[]] correctly", () => {
    expect(searchMatrix([], 5)).toBe(false);
    expect(searchMatrix([[]], 5)).toBe(false);
  });

  it("works for single row", () => {
    const matrix = [[1, 2, 3, 4, 5]];
    expect(searchMatrix(matrix, 3)).toBe(true);
    expect(searchMatrix(matrix, 6)).toBe(false);
  });

  it("works for single column", () => {
    const matrix = [[1], [3], [5], [7]];
    expect(searchMatrix(matrix, 5)).toBe(true);
    expect(searchMatrix(matrix, 2)).toBe(false);
  });

  it("works for single element", () => {
    expect(searchMatrix([[7]], 7)).toBe(true);
    expect(searchMatrix([[7]], 5)).toBe(false);
  });
});

describe("searchMatrix - randomized tests vs linear reference", () => {

  function makeSortedMatrix(m: number, n: number, start = 1, step = 1): number[][] {
    const matrix: number[][] = Array.from({ length: m }, () => Array.from({ length: n }, () => 0));
    let val = start;
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        matrix[i][j] = val;
        val += step;
      }
      // ensure gap between rows if step is 1 it's already strictly increasing
      val += 0;
    }
    return matrix;
  }

  function linearSearch(matrix: number[][], target: number): boolean {
    if (!matrix.length) return false;
    // handle [[]] case
    if (matrix.length === 1 && matrix[0].length === 0) return false;
    return [].concat(...matrix as any).some(x => x === target);
  }
  
  const RNG_TRIES = 20;

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  for (let t = 0; t < RNG_TRIES; t++) {
    const m = randomInt(1, 8); // keep sizes small for test speed but varied
    const n = randomInt(1, 8);
    const start = randomInt(-50, 50);
    const step = randomInt(1, 5);
    const matrix = makeSortedMatrix(m, n, start, step);

    it(`matches linear search for ${m}x${n} matrix (trial ${t + 1})`, () => {
      // test multiple targets: existing, non-existing, extremes
      const allValues = ([] as number[]).concat(...matrix);
      // choose 5 targets: some from matrix, some random outside
      const targets = new Set<number>();
      // pick up to 3 existing
      for (let i = 0; i < Math.min(3, allValues.length); i++) {
        targets.add(allValues[Math.floor(Math.random() * allValues.length)]);
      }
      // add some outside values
      targets.add(start - 10);
      targets.add(allValues[allValues.length - 1] + 10);

      for (const target of targets) {
        expect(searchMatrix(matrix, target)).toBe(linearSearch(matrix, target));
      }
    });
  }
});

describe("sortColors (LeetCode 75)", () => {
  it("sorts mixed array", () => {
    const arr = [2, 0, 2, 1, 1, 0];
    sortColors(arr);
    expect(arr).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it("handles already sorted array", () => {
    const arr = [0, 0, 1, 1, 2, 2];
    sortColors(arr);
    expect(arr).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it("handles reverse sorted array", () => {
    const arr = [2, 2, 1, 1, 0, 0];
    sortColors(arr);
    expect(arr).toEqual([0, 0, 1, 1, 2, 2]);
  });

  it("handles single element arrays", () => {
    const arr1 = [0];
    sortColors(arr1);
    expect(arr1).toEqual([0]);

    const arr2 = [1];
    sortColors(arr2);
    expect(arr2).toEqual([1]);

    const arr3 = [2];
    sortColors(arr3);
    expect(arr3).toEqual([2]);
  });

  it("handles arrays with only one type of color", () => {
    const arr = [1, 1, 1, 1];
    sortColors(arr);
    expect(arr).toEqual([1, 1, 1, 1]);
  });

  it("handles empty array", () => {
    const arr: number[] = [];
    sortColors(arr);
    expect(arr).toEqual([]);
  });
});

describe("minWindow", () => {
  it("should return the minimum window substring", () => {
    expect(minWindow("ADOBECODEBANC", "ABC")).toBe("BANC");
  });

  it("should return empty string if no valid window", () => {
    expect(minWindow("A", "AA")).toBe("");
  });

  it("should handle single char match", () => {
    expect(minWindow("a", "a")).toBe("a");
  });

  it("should handle multiple same chars", () => {
    expect(minWindow("aa", "aa")).toBe("aa");
  });

  it("should return correct window with overlapping", () => {
    expect(minWindow("aaflslflsldkalskaaa", "aaa")).toBe("aaa");
  });
});

describe("LeetCode 77 - Combinations", () => {
  test("n = 4, k = 2", () => {
    const result = combine(4, 2);
    const expected = [
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4],
    ];
    expect(result).toEqual(expected);
  });

  test("n = 4, k = 3", () => {
    const result = combine(4, 3);
    const expected = [
      [1, 2, 3],
      [1, 2, 4],
      [1, 3, 4],
      [2, 3, 4],
    ];
    expect(result).toEqual(expected);
  });

  test("edge case: n = 1, k = 1", () => {
    expect(combine(1, 1)).toEqual([[1]]);
  });

  test("edge case: n = 3, k = 0 (empty combination)", () => {
    expect(combine(3, 0)).toEqual([[]]);
  });
});

describe("LeetCode 79 - Word Search", () => {
  test("example case 1", () => {
    const board = [
      ["A","B","C","E"],
      ["S","F","C","S"],
      ["A","D","E","E"]
    ];
    expect(exist(board, "ABCCED")).toBe(true);
  });

  test("example case 2", () => {
    const board = [
      ["A","B","C","E"],
      ["S","F","C","S"],
      ["A","D","E","E"]
    ];
    expect(exist(board, "SEE")).toBe(true);
  });

  test("example case 3", () => {
    const board = [
      ["A","B","C","E"],
      ["S","F","C","S"],
      ["A","D","E","E"]
    ];
    expect(exist(board, "ABCB")).toBe(false);
  });

  test("single letter match", () => {
    const board = [["A"]];
    expect(exist(board, "A")).toBe(true);
  });

  test("single letter mismatch", () => {
    const board = [["A"]];
    expect(exist(board, "B")).toBe(false);
  });
});


describe("LeetCode 80 - Remove Duplicates from Sorted Array II", () => {
  test("example case 1", () => {
    const nums = [1,1,1,2,2,3];
    const k = removeDuplicates(nums);
    expect(k).toBe(5);
    expect(nums.slice(0, k)).toEqual([1,1,2,2,3]);
  });

  test("example case 2", () => {
    const nums = [0,0,1,1,1,1,2,3,3];
    const k = removeDuplicates(nums);
    expect(k).toBe(7);
    expect(nums.slice(0, k)).toEqual([0,0,1,1,2,3,3]);
  });

  test("all unique", () => {
    const nums = [1,2,3,4];
    const k = removeDuplicates(nums);
    expect(k).toBe(4);
    expect(nums.slice(0, k)).toEqual([1,2,3,4]);
  });

  test("all same", () => {
    const nums = [5,5,5,5,5];
    const k = removeDuplicates(nums);
    expect(k).toBe(2);
    expect(nums.slice(0, k)).toEqual([5,5]);
  });
});