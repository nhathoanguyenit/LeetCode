import { ListNode } from "../models/node-list.model";

export function nextPermutation(nums: number[]): void {
    const n = nums.length;
    let i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    if (i >= 0) {
        let j = n - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    let left = i + 1;
    let right = n - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
}

export function longestValidParentheses(s: string): number {
    let maxLen = 0;
    const stack: number[] = [-1];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }

    return maxLen;
}

export function searchInRotatedSorted(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

export function findFirstAndLastPositionSortedArray(nums: number[], target: number): number[] {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            left = mid;
            right = mid;

            while (nums[left] === target && left >= 0) {
                left--;
            }
            while (nums[right] === target && right <= nums.length - 1) {
                right++;
            }
            return [left + 1, right - 1];
        }

        if (nums[mid] < target) {
            left = mid + 1;
        }

        if (nums[mid] > target) {
            right = mid - 1;
        }
    }
    return [-1, -1];
}

export function searchInsertPosition(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        if (nums[mid] < target) {
            left = mid + 1;
        }

        if (nums[mid] > target) {
            right = mid - 1;
        }

        if (left > right) {
            if (nums[left] < target) {
                return left + 1;
            } else {
                return left;
            }
        }
    }
    return 0;
}

export function isValidSudoku(board: string[][]): boolean {
    const rows: Array<Set<string>> = Array.from({ length: 9 }, () => new Set());
    const cols: Array<Set<string>> = Array.from({ length: 9 }, () => new Set());
    const boxes: Array<Set<string>> = Array.from({ length: 9 }, () => new Set());

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const ch = board[r][c];
            if (ch === ".") continue;

            const boxId = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            if (rows[r].has(ch) || cols[c].has(ch) || boxes[boxId].has(ch)) {
                return false;
            }

            rows[r].add(ch);
            cols[c].add(ch);
            boxes[boxId].add(ch);
        }
    }
    return true;
}

export function solveSudoku(board: string[][]): void {
    function isValid(board: string[][], row: number, col: number, char: string): boolean {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === char) return false;
            if (board[i][col] === char) return false;
            const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (board[boxRow][boxCol] === char) return false;
        }
        return true;
    }

    function solve(): boolean {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === ".") {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num.toString())) {
                            board[row][col] = num.toString();
                            if (solve()) return true;
                            board[row][col] = ".";
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    solve();
}

export function countAndSay(n: number): string {
    if (n === 1) return "1";

    const prev = countAndSay(n - 1);
    let result = "";

    let count = 1;
    for (let i = 1; i <= prev.length; i++) {
        if (prev[i] === prev[i - 1]) {
            count++;
        } else {
            result += count.toString() + prev[i - 1];
            count = 1;
        }
    }

    return result;
}

export function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];

    candidates.sort((a, b) => a - b);

    function backtrack(start: number, remain: number, path: number[]) {
        if (remain === 0) {
            result.push([...path]);
        }
        if (remain < 0) return;

        for (let i = start; i < candidates.length; i++) {
            const num = candidates[i];
            if (num > remain) break;
            path.push(candidates[i]);
            backtrack(i, remain - candidates[i], path);
            path.pop();
        }
    }

    backtrack(0, target, []);
    return result;
}

export function combinationSum2(candidates: number[], target: number): number[][] {
    const results: number[][] = [];
    candidates.sort((a, b) => a - b);

    function backtrack(start: number, remain: number, path: number[]) {
        if (remain === 0) {
            results.push([...path]);
            return;
        }
        if (remain < 0) return;

        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            const num = candidates[i];
            if (num > remain) break;

            path.push(num);
            backtrack(i + 1, remain - num, path);
            path.pop();
        }
    }

    backtrack(0, target, []);
    return results;
}
