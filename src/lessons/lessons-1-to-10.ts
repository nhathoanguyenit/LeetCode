import { ListNode } from "../models/node-list.model";
import { findSubstring } from "./lessons-21-to-30";

export function twoSum(numbers: number[], targetSum: number): [number, number] {
    const seenNumbers = new Map<number, number>(); // value → index

    for (let currentIndex = 0; currentIndex < numbers.length; currentIndex++) {
        const currentNumber = numbers[currentIndex];
        const requiredNumber = targetSum - currentNumber;

        if (seenNumbers.has(requiredNumber)) {
            return [seenNumbers.get(requiredNumber)!, currentIndex];
        }

        seenNumbers.set(currentNumber, currentIndex);
    }

    throw new Error("No two numbers sum to the target");
}

export function addTwoNumbers(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const resultList = new ListNode(0);

    function addNodes(
        currentNode: ListNode | null,
        nodeA: ListNode | null,
        nodeB: ListNode | null,
        carryOver: number
    ): void {
        if (!nodeA && !nodeB && carryOver === 0) return;

        const valueA = nodeA?.val ?? 0;
        const valueB = nodeB?.val ?? 0;
        const sum = valueA + valueB + carryOver;

        if (currentNode) {
            currentNode.val = sum % 10;

            const nextCarryOver = Math.floor(sum / 10);
            const nextA = nodeA?.next ?? null;
            const nextB = nodeB?.next ?? null;

            if (nextA || nextB || nextCarryOver > 0) {
                currentNode.next = new ListNode(0);
                addNodes(currentNode.next, nextA, nextB, nextCarryOver);
            }
        }
    }

    addNodes(resultList, list1, list2, 0);
    return resultList;
}

export function lengthOfLongestSubstring(text: string): number {
    const uniqueChars = new Set<string>();
    let leftPointer = 0;
    let longestLength = 0;

    for (let rightPointer = 0; rightPointer < text.length; rightPointer++) {
        const currentChar = text[rightPointer];

        while (uniqueChars.has(currentChar)) {
            uniqueChars.delete(text[leftPointer]);
            leftPointer++;
        }

        uniqueChars.add(currentChar);
        longestLength = Math.max(longestLength, rightPointer - leftPointer + 1);
    }

    return longestLength;
}

export function findMedianSortedArrays(sortedArrayA: number[], sortedArrayB: number[]): number {
    if (sortedArrayA.length > sortedArrayB.length) {
        return findMedianSortedArrays(sortedArrayB, sortedArrayA);
    }

    const lengthA = sortedArrayA.length;
    const lengthB = sortedArrayB.length;

    let leftIndexA = 0;
    let rightIndexA = lengthA;

    while (leftIndexA <= rightIndexA) {
        const partitionA = Math.floor((leftIndexA + rightIndexA) / 2);
        const partitionB = Math.floor((lengthA + lengthB + 1) / 2) - partitionA;

        const minPartitionA = partitionA === 0 ? -Infinity : sortedArrayA[partitionA - 1];
        const maxPartitionA = partitionA === lengthA ? Infinity : sortedArrayA[partitionA];

        const minPartitionB = partitionB === 0 ? -Infinity : sortedArrayB[partitionB - 1];
        const maxPartitionB = partitionB === lengthB ? Infinity : sortedArrayB[partitionB];

        if (minPartitionA <= maxPartitionB && minPartitionB <= maxPartitionA) {
            const totalLength = lengthA + lengthB;
            if (totalLength % 2 === 0) {
                return (Math.max(minPartitionA, minPartitionB) + Math.min(maxPartitionA, maxPartitionB)) / 2;
            } else {
                return Math.max(minPartitionA, minPartitionB);
            }
        }

        if (minPartitionA > maxPartitionB) {
            rightIndexA = partitionA - 1;
        } else {
            leftIndexA = partitionA + 1;
        }
    }

    throw new Error("Input arrays must be sorted.");
}

function transformString(str: string): string[] {
    const transformed = ["^"];
    for (const ch of str) {
        transformed.push("#", ch);
    }
    transformed.push("#", "$");
    return transformed;
}

export function longestPalindrome(s: string): string {
    if (s.length < 2) return s;

    const transformed = transformString(s);
    const palindromeArrary = new Array(transformed.length).fill(0);

    let C = 0; // center
    let B = 0; // right boundary
    let maxB = 0;
    let maxC = 0;

    for (let i = 1; i < transformed.length - 1; i++) {
        //           C
        //               B ->
        // ... # a # b # b # a # ...
        //             ↑
        //             i

        const mirror = 2 * C - i;

        if (i < B) {
            palindromeArrary[i] = Math.min(B - i, palindromeArrary[mirror]);
        }

        while (transformed[i + 1 + palindromeArrary[i]] === transformed[i - 1 - palindromeArrary[i]]) {
            palindromeArrary[i]++;
        }

        if (i + palindromeArrary[i] > B) {
            C = i;
            B = i + palindromeArrary[i];
        }

        if (palindromeArrary[i] > maxB) {
            maxB = palindromeArrary[i];
            maxC = i;
        }
    }

    const startIndex = Math.floor((maxC - maxB) / 2);
    return s.substring(startIndex, startIndex + maxB);
}

export function zigZagConversion(s: string, numRows: number): string {
    if (numRows === 1 || s.length <= numRows) return s;

    const indexJump = numRows * 2 - 2;
    let result = "";

    for (let r = 0; r < numRows; r++) {
        for (let i = r; i < s.length; i += indexJump) {
            result += s[i];

            if (r > 0 && r < numRows - 1) {
                const goUpAndDownTime = 2 * r;
                const nextCharIndex = i + indexJump;
                const diagonalIndex = nextCharIndex - goUpAndDownTime;
                if (diagonalIndex < s.length) {
                    result += s[diagonalIndex];
                }
            }
        }
    }

    return result;
}

export function reverseInteger(x: number): number {
    const INT_MIN = -(2 ** 31);
    const INT_MAX = 2 ** 31 - 1;
    const MAX_LAST_DIGIT = INT_MAX % 10; // 7
    const MIN_LAST_DIGIT = INT_MIN % 10; // -8

    let rev = 0;

    while (x !== 0) {
        const pop = x % 10;
        x = Math.trunc(x / 10);

        if (rev > Math.floor(INT_MAX / 10) || (rev === Math.floor(INT_MAX / 10) && pop > MAX_LAST_DIGIT)) {
            return 0;
        }

        if (rev < Math.ceil(INT_MIN / 10) || (rev === Math.ceil(INT_MIN / 10) && pop < MIN_LAST_DIGIT)) {
            return 0;
        }

        rev = rev * 10 + pop;
    }

    return rev;
}

export function myAtoi(s: string): number {
    const INT_MAX = 2 ** 31 - 1; 
    const INT_MIN = -(2 ** 31); 
    const ZERO_CHAR_CODE = 48; 

    let i = 0;
    const n = s.length;

    while (i < n && s[i] === " ") i++;

    if (i === n) return 0;

    let sign = 1;
    if (s[i] === '+') {
        i++;
    } else if (s[i] === '-') {
        sign = -1;
        i++;
    }

    let res = 0;
    while (i < s.length && s[i] >= "0" && s[i] <= "9") {
        const digit = s.charCodeAt(i) - ZERO_CHAR_CODE;
        res = res * 10 + digit;

        if (sign * res <= INT_MIN) {
            return INT_MIN;
        }

        if (sign * res >= INT_MAX) {
            return INT_MAX;
        }
        
        i++;
    }
    return res * sign;
}

export function isPalindrome(x: number): boolean {

    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

    let reversedHalf = 0;
    let n = x;

    while (n > reversedHalf) {
        reversedHalf = reversedHalf * 10 + (n % 10);
        n = Math.trunc(n / 10);
    }
    return n === reversedHalf || n === Math.trunc(reversedHalf / 10);
}

export function regularExpressionMatching(s: string, p: string) {

    const m = s.length;
    const n = p.length;

    const dp: boolean[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));

    dp[0][0] = true;

    for (let j = 2; j <= n; j += 1) {
        if (p[j - 1] === '*' && dp[0][j - 2]) {
            dp[0][j] = true;
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2];
                if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }
    return dp[m][n];
}

