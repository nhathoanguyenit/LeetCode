import { ListNode } from "../models/node-list.model";
import {
    addTwoNumbers,
    findMedianSortedArrays,
    isPalindrome,
    lengthOfLongestSubstring,
    longestPalindrome,
    myAtoi,
    reverseInteger,
    twoSum,
    zigZagConversion,
} from "./leasons-1-to-10";

describe("twoSum", () => {
    it("returns [0, 1] for nums = [2,7,11,15] and target = 9", () => {
        expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    });

    it("returns [1, 2] for nums = [3, 2, 4] and target = 6", () => {
        expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    });

    it("returns [0, 1] for nums = [3, 3] and target = 6", () => {
        expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    });
});

describe("addTwoNumbers", () => {
    it("adds [2,4,3] and [5,6,4] to get [7,0,8]", () => {
        const l1 = ListNode.buildList([2, 4, 3]);
        const l2 = ListNode.buildList([5, 6, 4]);
        const result = addTwoNumbers(l1, l2);
        expect(ListNode.listToArray(result)).toEqual([7, 0, 8]);
    });

    it("adds [0] and [0] to get [0]", () => {
        const l1 = ListNode.buildList([0]);
        const l2 = ListNode.buildList([0]);
        const result = addTwoNumbers(l1, l2);
        expect(ListNode.listToArray(result)).toEqual([0]);
    });

    it("adds [9,9,9,9,9,9,9] and [9,9,9,9] to get [8,9,9,9,0,0,0,1]", () => {
        const l1 = ListNode.buildList([9, 9, 9, 9, 9, 9, 9]);
        const l2 = ListNode.buildList([9, 9, 9, 9]);
        const result = addTwoNumbers(l1, l2);
        expect(ListNode.listToArray(result)).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
    });
});

describe("lengthOfLongestSubstring", () => {
    it('returns 3 for "abcabcbb"', () => {
        expect(lengthOfLongestSubstring("acbbcca")).toBe(3);
    });

    it('returns 3 for "abcabcbb"', () => {
        expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
    });

    it('returns 1 for "bbbbb"', () => {
        expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
    });

    it('returns 3 for "pwwkew"', () => {
        expect(lengthOfLongestSubstring("pwwkew")).toBe(3);
    });

    it('returns 0 for ""', () => {
        expect(lengthOfLongestSubstring("")).toBe(0);
    });
});

describe("findMedianSortedArrays", () => {
    test("odd total length, simple case", () => {
        expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
    });

    test("even total length, simple case", () => {
        expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
    });

    test("one array empty", () => {
        expect(findMedianSortedArrays([], [1])).toBe(1);
        expect(findMedianSortedArrays([2], [])).toBe(2);
    });

    test("arrays of different lengths", () => {
        expect(findMedianSortedArrays([1, 3, 5], [2, 4])).toBe(3);
        expect(findMedianSortedArrays([1, 2, 3, 4, 5], [6, 7, 8])).toBe(4.5);
    });

    test("arrays with duplicate values", () => {
        expect(findMedianSortedArrays([1, 2, 2], [2, 2, 3])).toBe(2);
    });

    test("negative numbers", () => {
        expect(findMedianSortedArrays([-5, -3, -1], [-2, 0, 2])).toBe(-1.5);
    });

    test("both arrays contain same numbers", () => {
        expect(findMedianSortedArrays([1, 1, 1], [1, 1, 1, 1])).toBe(1);
    });

    test("one array much larger than the other", () => {
        expect(findMedianSortedArrays([1], [2, 3, 4, 5, 6])).toBe(3.5);
    });

    test("both arrays have 1 element", () => {
        expect(findMedianSortedArrays([1], [2])).toBe(1.5);
    });

    test("large sorted arrays", () => {
        const arrA = Array.from({ length: 1000 }, (_, i) => i * 2);
        const arrB = Array.from({ length: 1000 }, (_, i) => i * 2 + 1);
        expect(findMedianSortedArrays(arrA, arrB)).toBe(999.5);
    });

    describe("longestPalindrome", () => {
        it("should return 'bab' or 'aba' for 'babad'", () => {
            const result = longestPalindrome("babad");
            expect(["bab", "aba"]).toContain(result);
        });

        it("should return 'bb' for 'cbbd'", () => {
            expect(longestPalindrome("cbbd")).toBe("bb");
        });

        it("should return the entire string if already a palindrome", () => {
            expect(longestPalindrome("racecar")).toBe("racecar");
        });

        it("should handle string with length 1", () => {
            expect(longestPalindrome("a")).toBe("a");
        });

        it("should handle all characters different", () => {
            const result = longestPalindrome("abcdef");
            // Any single character is a valid palindrome here
            expect(result.length).toBe(1);
            expect("abcdef").toContain(result);
        });

        it("should return 'ababa' for 'ababa'", () => {
            expect(longestPalindrome("ababa")).toBe("ababa");
        });

        it("should handle even-length palindrome", () => {
            expect(longestPalindrome("abba")).toBe("abba");
        });
    });
});

describe("zigZagConversion", () => {
    test("Example 1", () => {
        expect(zigZagConversion("PAYPALISHIRING", 3)).toBe("PAHNAPLSIIGYIR");
    });

    test("Example 2", () => {
        expect(zigZagConversion("PAYPALISHIRING", 4)).toBe("PINALSIGYAHRPI");
    });

    test("Single char", () => {
        expect(zigZagConversion("A", 1)).toBe("A");
    });

    test("One row", () => {
        expect(zigZagConversion("AB", 1)).toBe("AB");
    });

    test("Two rows", () => {
        expect(zigZagConversion("ABCD", 2)).toBe("ACBD");
    });
});

describe("reverseInteger", () => {
    test("Positive number", () => {
        expect(reverseInteger(123)).toBe(321);
    });

    test("Negative number", () => {
        expect(reverseInteger(-123)).toBe(-321);
    });

    test("Trailing zero", () => {
        expect(reverseInteger(120)).toBe(21);
    });

    test("Zero", () => {
        expect(reverseInteger(0)).toBe(0);
    });

    test("Overflow positive", () => {
        expect(reverseInteger(1534236469)).toBe(0);
    });

    test("Near overflow negative", () => {
        expect(reverseInteger(-2147483412)).toBe(-2143847412);
    });
});

describe("myAtoi", () => {
    test("Simple number", () => {
        expect(myAtoi("42")).toBe(42);
    });

    test("Leading spaces + negative", () => {
        expect(myAtoi("   -042")).toBe(-42);
    });

    test("Stop at non-digit", () => {
        expect(myAtoi("1337c0d3")).toBe(1337);
    });

    test("Stop after zero", () => {
        expect(myAtoi("0-1")).toBe(0);
    });

    test("Non-digit start", () => {
        expect(myAtoi("words and 987")).toBe(0);
    });

    test("Overflow negative", () => {
        expect(myAtoi("-91283472332")).toBe(-2147483648);
    });

    test("Overflow positive", () => {
        expect(myAtoi("91283472332")).toBe(2147483647);
    });

    test("Empty string", () => {
        expect(myAtoi("")).toBe(0);
    });

    test("Invalid sign", () => {
        expect(myAtoi("+-12")).toBe(0);
    });

    test("Plus sign", () => {
        expect(myAtoi("+1")).toBe(1);
    });
});


describe("isPalindrome", () => {
    test("Positive palindrome", () => {
      expect(isPalindrome(121)).toBe(true);
    });
  
    test("Negative number", () => {
      expect(isPalindrome(-121)).toBe(false);
    });
  
    test("Number ending with 0", () => {
      expect(isPalindrome(10)).toBe(false);
    });
  
    test("Zero", () => {
      expect(isPalindrome(0)).toBe(true);
    });
  
    test("Odd-length palindrome", () => {
      expect(isPalindrome(12321)).toBe(true);
    });
  
    test("Non-palindrome number", () => {
      expect(isPalindrome(123)).toBe(false);
    });
  
    test("Even-length palindrome", () => {
      expect(isPalindrome(1221)).toBe(true);
    });
  
    test("Single digit", () => {
      expect(isPalindrome(7)).toBe(true);
    });
  
    test("Large palindrome", () => {
      expect(isPalindrome(123454321)).toBe(true);
    });
  
    test("Large non-palindrome", () => {
      expect(isPalindrome(123456789)).toBe(false);
    });
  });