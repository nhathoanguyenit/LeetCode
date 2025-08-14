import { arrayToList, listToArray, normalizeTriplets } from "../utills/jest.utils";
import { containerWithMostWater, fourSum, intToRoman, letterCombinations, longestCommonPrefix, removeNthFromEnd, romanToInt, threeSum, threeSumClosest } from "./lessons-11-to-20";

describe("maxArea", () => {
    it("Example 1", () => {
        expect(containerWithMostWater([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    });

    it("Example 2", () => {
        expect(containerWithMostWater([1, 1])).toBe(1);
    });

    it("Handles large heights", () => {
        expect(containerWithMostWater([4, 3, 2, 1, 4])).toBe(16);
    });

    it("Handles tall peak in middle", () => {
        expect(containerWithMostWater([1, 2, 1])).toBe(2);
    });
});

describe("Integer to Roman", () => {
    test("Example 1", () => {
        expect(intToRoman(3749)).toBe("MMMDCCXLIX");
    });

    test("Example 2", () => {
        expect(intToRoman(58)).toBe("LVIII");
    });

    test("Example 3", () => {
        expect(intToRoman(1994)).toBe("MCMXCIV");
    });

    test("Minimum value", () => {
        expect(intToRoman(1)).toBe("I");
    });

    test("Maximum value", () => {
        expect(intToRoman(3999)).toBe("MMMCMXCIX");
    });
});

describe("Roman to Integer", () => {
    test("Example 1", () => {
        expect(romanToInt("III")).toBe(3);
    });

    test("Example 2", () => {
        expect(romanToInt("LVIII")).toBe(58);
    });

    test("Example 3", () => {
        expect(romanToInt("MCMXCIV")).toBe(1994);
    });

    test("Min value", () => {
        expect(romanToInt("I")).toBe(1);
    });

    test("Max value", () => {
        expect(romanToInt("MMMCMXCIX")).toBe(3999);
    });
});

describe("Longest Common Prefix", () => {
    test("Example 1", () => {
        expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
    });

    test("Example 2", () => {
        expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
    });

    test("All identical", () => {
        expect(longestCommonPrefix(["test", "test", "test"])).toBe("test");
    });

    test("Single element", () => {
        expect(longestCommonPrefix(["alone"])).toBe("alone");
    });

    test("Empty list", () => {
        expect(longestCommonPrefix([])).toBe("");
    });
});

describe("threeSum", () => {

    test("Example 1", () => {
        const input = [-1, 0, 1, 2, -1, -4];
        const expected = [
            [-1, -1, 2],
            [-1, 0, 1],
        ];
        expect(normalizeTriplets(threeSum(input))).toEqual(normalizeTriplets(expected));
    });

    test("Example 2", () => {
        const input = [0, 1, 1];
        const expected: number[][] = [];
        expect(normalizeTriplets(threeSum(input))).toEqual(normalizeTriplets(expected));
    });

    test("Example 3", () => {
        const input = [0, 0, 0];
        const expected = [[0, 0, 0]];
        expect(normalizeTriplets(threeSum(input))).toEqual(normalizeTriplets(expected));
    });

    test("Handles duplicates correctly (multiple zeros)", () => {
        const input = [0, 0, 0, 0];
        const expected = [[0, 0, 0]];
        expect(normalizeTriplets(threeSum(input))).toEqual(normalizeTriplets(expected));
    });

    test("No solution when all positive", () => {
        const input = [1, 2, 3, 4];
        const expected: number[][] = [];
        expect(normalizeTriplets(threeSum(input))).toEqual(normalizeTriplets(expected));
    });

    test("No solution when all negative", () => {
        const input = [-5, -2, -1, -9];
        const expected: number[][] = [];
        expect(normalizeTriplets(threeSum(input))).toEqual(normalizeTriplets(expected));
    });

    test("Mixed numbers with multiple answers", () => {
        const input = [-2, 0, 1, 1, 2, -1, -4];
        // Possible valid triplets: [-2,0,2], [-2,1,1], [-1,0,1]
        const expected = [
            [-2, 0, 2],
            [-2, 1, 1],
            [-1, 0, 1],
        ];
        expect(normalizeTriplets(threeSum(input))).toEqual(normalizeTriplets(expected));
    });

    test("Edge: length exactly 3 (either sums to zero or not)", () => {
        expect(threeSum([1, -1, 0])).toEqual([[-1, 0, 1]]);
        expect(threeSum([2, -1, 0])).toEqual([]);
    });

    test("Large values within constraints", () => {
        const input = [100000, -100000, 0, -100000, 100000];
        const expected = [
            [-100000, 0, 100000],
            [-100000, 100000, 0],
        ]; // duplicates collapse to one triplet
        // After normalization, duplicates are removed by algorithm anyway
        expect(normalizeTriplets(threeSum(input))).toEqual(normalizeTriplets([[-100000, 0, 100000]]));
    });
});

describe('threeSumClosest', () => {
    test('Example 1', () => {
        expect(threeSumClosest([-1, 2, 1, -4], 1)).toBe(2);
    });

    test('Example 2', () => {
        expect(threeSumClosest([0, 0, 0], 1)).toBe(0);
    });

    test('Mixed positives and negatives', () => {
        expect(threeSumClosest([1, 1, 1, 0], -100)).toBe(2);
    });

    test('Large numbers', () => {
        expect(threeSumClosest([100, 200, 300, 400], 1000)).toBe(900);
    });
});

describe("letterCombinations", () => {
    test("Example 1: digits = '23'", () => {
        expect(letterCombinations("23").sort()).toEqual(
            ["ad","ae","af","bd","be","bf","cd","ce","cf"].sort()
        );
    });

    test("Example 2: digits = '' (empty)", () => {
        expect(letterCombinations("")).toEqual([]);
    });

    test("Example 3: digits = '2'", () => {
        expect(letterCombinations("2").sort()).toEqual(
            ["a","b","c"].sort()
        );
    });

    test("digits = '79' (4 letters × 4 letters)", () => {
        const output = letterCombinations("79");
        expect(output.length).toBe(16);
    });
});

describe("fourSum", () => {
    it("example 1", () => {
        expect(fourSum([1, 0, -1, 0, -2, 2], 0)).toEqual([
            [-2, -1, 1, 2],
            [-2, 0, 0, 2 ],
            [-1, 0, 0, 1]
        ]);
    });

    it("example 2", () => {
        expect(fourSum([2, 2, 2, 2, 2], 8)).toEqual([
            [2, 2, 2, 2]
        ]);
    });

    it("no solution", () => {
        expect(fourSum([1, 2, 3], 100)).toEqual([]);
    });
});

describe('removeNthFromEnd', () => {
    it('Example 1: [1,2,3,4,5], n=2 → [1,2,3,5]', () => {
        const head = arrayToList([1, 2, 3, 4, 5]);
        const result = removeNthFromEnd(head, 2);
        expect(listToArray(result)).toEqual([1, 2, 3, 5]);
    });

    it('Example 2: [1], n=1 → []', () => {
        const head = arrayToList([1]);
        const result = removeNthFromEnd(head, 1);
        expect(listToArray(result)).toEqual([]);
    });

    it('Example 3: [1,2], n=1 → [1]', () => {
        const head = arrayToList([1, 2]);
        const result = removeNthFromEnd(head, 1);
        expect(listToArray(result)).toEqual([1]);
    });

    it('Remove head node when n equals list length', () => {
        const head = arrayToList([10, 20, 30]);
        const result = removeNthFromEnd(head, 3);
        expect(listToArray(result)).toEqual([20, 30]);
    });
});