import {
    firstMissingPositive,
    groupAnagrams,
    isMatch,
    jump,
    multiply,
    permute,
    rotate,
    trappingRainWater,
} from "./lessons-41-to-50";

describe("firstMissingPositive", () => {
    it("example 1", () => {
        expect(firstMissingPositive([1, 2, 0])).toBe(3);
    });

    it("example 2", () => {
        expect(firstMissingPositive([3, 4, -1, 1])).toBe(2);
    });

    it("example 3", () => {
        expect(firstMissingPositive([7, 8, 9, 11, 12])).toBe(1);
    });

    it("all numbers from 1..n present", () => {
        expect(firstMissingPositive([1, 2, 3])).toBe(4);
    });

    it("unsorted with duplicates", () => {
        expect(firstMissingPositive([2, 2, 1])).toBe(3);
    });

    it("single element case", () => {
        expect(firstMissingPositive([1])).toBe(2);
        expect(firstMissingPositive([2])).toBe(1);
    });
});

describe("trap rain water", () => {
    it("example 1", () => {
        expect(trappingRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    });

    it("example 2", () => {
        expect(trappingRainWater([4, 2, 0, 3, 2, 5])).toBe(9);
    });

    it("no water when strictly increasing", () => {
        expect(trappingRainWater([1, 2, 3, 4, 5])).toBe(0);
    });

    it("no water when strictly decreasing", () => {
        expect(trappingRainWater([5, 4, 3, 2, 1])).toBe(0);
    });

    it("flat terrain", () => {
        expect(trappingRainWater([2, 2, 2, 2])).toBe(0);
    });
});

describe("multiply function", () => {
    it("should multiply single digits", () => {
        expect(multiply("2", "3")).toBe("6");
    });

    it("should multiply multi-digit numbers", () => {
        expect(multiply("123", "456")).toBe("56088");
        expect(multiply("999", "999")).toBe("998001");
    });

    it("should handle zeros", () => {
        expect(multiply("0", "12345")).toBe("0");
        expect(multiply("12345", "0")).toBe("0");
        expect(multiply("0", "0")).toBe("0");
    });

    it("should handle multiplication by one", () => {
        expect(multiply("1", "98765")).toBe("98765");
        expect(multiply("98765", "1")).toBe("98765");
    });

    it("should handle large numbers", () => {
        const num1 = "123456789";
        const num2 = "987654321";
        expect(multiply(num1, num2)).toBe("121932631112635269");
    });
});

describe("isMatch function", () => {
    it("should return false when string does not match pattern", () => {
        expect(isMatch("aa", "a")).toBe(false);
        expect(isMatch("cb", "?a")).toBe(false);
        expect(isMatch("acdcb", "a*c?b")).toBe(false);
    });

    it("should return true when pattern matches string", () => {
        expect(isMatch("aa", "*")).toBe(true);
        expect(isMatch("adceb", "*a*b")).toBe(true);
        expect(isMatch("", "*")).toBe(true);
        expect(isMatch("", "")).toBe(true);
    });

    it("should handle '?' wildcard correctly", () => {
        expect(isMatch("a", "?")).toBe(true);
        expect(isMatch("ab", "??")).toBe(true);
        expect(isMatch("abc", "??")).toBe(false);
    });

    it("should handle '*' wildcard correctly", () => {
        expect(isMatch("abc", "*")).toBe(true);
        expect(isMatch("abc", "a*")).toBe(true);
        expect(isMatch("abc", "*c")).toBe(true);
        expect(isMatch("abc", "*b*")).toBe(true);
        expect(isMatch("abc", "*d*")).toBe(false);
    });

    it("should handle combination of '*' and '?'", () => {
        expect(isMatch("abcde", "a*?e")).toBe(true);
        expect(isMatch("abcdef", "a*?e")).toBe(false);
    });
});

describe("Jump Game II", () => {
    it("Example 1: [2,3,1,1,4]", () => {
        expect(jump([2, 3, 1, 1, 4])).toBe(2);
    });

    it("Example 2: [2,3,0,1,4]", () => {
        expect(jump([2, 3, 0, 1, 4])).toBe(2);
    });

    it("Single element [1]", () => {
        expect(jump([1])).toBe(0); // already at the end
    });

    it("Simple increasing steps [1,2,3]", () => {
        expect(jump([1, 2, 3])).toBe(2);
    });

    it("Large jump at start [5,1,1,1,1]", () => {
        expect(jump([5, 1, 1, 1, 1])).toBe(1);
    });

    it("All 1's [1,1,1,1]", () => {
        expect(jump([1, 1, 1, 1])).toBe(3);
    });
});

describe("Permutations", () => {
    it("Example 1", () => {
        const result = permute([1, 2, 3]);
        expect(result).toEqual(
            expect.arrayContaining([
                [1, 2, 3],
                [1, 3, 2],
                [2, 1, 3],
                [2, 3, 1],
                [3, 1, 2],
                [3, 2, 1],
            ])
        );
        expect(result.length).toBe(6);
    });

    it("Example 2", () => {
        const result = permute([0, 1]);
        expect(result).toEqual(
            expect.arrayContaining([
                [0, 1],
                [1, 0],
            ])
        );
        expect(result.length).toBe(2);
    });

    it("Example 3", () => {
        expect(permute([1])).toEqual([[1]]);
    });

    it("Negative numbers", () => {
        const result = permute([-1, 0, 1]);
        expect(result.length).toBe(6);
    });
});

describe("rotate", () => {
    test("3x3 matrix", () => {
        const matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];

        rotate(matrix);

        expect(matrix).toEqual([
            [7, 4, 1],
            [8, 5, 2],
            [9, 6, 3],
        ]);
    });

    test("4x4 matrix", () => {
        const matrix = [
            [5, 1, 9, 11],
            [2, 4, 8, 10],
            [13, 3, 6, 7],
            [15, 14, 12, 16],
        ];

        rotate(matrix);

        expect(matrix).toEqual([
            [15, 13, 2, 5],
            [14, 3, 4, 1],
            [12, 6, 8, 9],
            [16, 7, 10, 11],
        ]);
    });

    test("1x1 matrix (edge case)", () => {
        const matrix = [[1]];
        rotate(matrix);
        expect(matrix).toEqual([[1]]);
    });

    test("2x2 matrix", () => {
        const matrix = [
            [1, 2],
            [3, 4],
        ];
        rotate(matrix);
        expect(matrix).toEqual([
            [3, 1],
            [4, 2],
        ]);
    });
});

describe("groupAnagrams", () => {

    function sortGroups(groups: string[][]): string[][] {
        const sortedGroups = groups.map((g) => g.slice().sort());
        sortedGroups.sort((a, b) => a[0].localeCompare(b[0]));
        return sortedGroups;
    }

    test("example 1", () => {
        const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
        const result = groupAnagrams(strs);
        expect(sortGroups(result)).toEqual(sortGroups([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]));
    });

    test("example 2", () => {
        const strs = [""];
        expect(groupAnagrams(strs)).toEqual([[""]]);
    });

    test("example 3", () => {
        const strs = ["a"];
        expect(groupAnagrams(strs)).toEqual([["a"]]);
    });

    test("all unique words (no anagrams)", () => {
        const strs = ["abc", "def", "ghi"];
        const result = groupAnagrams(strs);
        expect(sortGroups(result)).toEqual(sortGroups([["abc"], ["def"], ["ghi"]]));
    });

    test("all identical words", () => {
        const strs = ["aaa", "aaa", "aaa"];
        const result = groupAnagrams(strs);
        expect(sortGroups(result)).toEqual([["aaa", "aaa", "aaa"]]);
    });

    test("mixed with different lengths", () => {
        const strs = ["ab", "ba", "abc", "cab", "bca", "xy"];
        const result = groupAnagrams(strs);
        expect(sortGroups(result)).toEqual(sortGroups([["ab", "ba"], ["abc", "cab", "bca"], ["xy"]]));
    });
});
