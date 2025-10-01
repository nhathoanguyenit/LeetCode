import { ListNode } from "../models/node-list.model";

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

export function uniquePaths(m: number, n: number): number {
    const dp = Array(n).fill(1); // first row is all 1s

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1];
        }
    }

    return dp[n - 1];
}

export function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;

    const dp = Array(n).fill(0);
    dp[0] = obstacleGrid[0][0] === 0 ? 1 : 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[j] = 0;
            } else if (j > 0) {
                dp[j] += dp[j - 1];
            }
        }
    }

    return dp[n - 1];
}

export function minPathSum1D(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;

    const dp = Array(n).fill(0);
    dp[0] = grid[0][0];

    for (let j = 1; j < n; j++) {
        dp[j] = dp[j - 1] + grid[0][j];
    }

    for (let i = 1; i < m; i++) {
        dp[0] += grid[i][0];
        for (let j = 1; j < n; j++) {
            dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
        }
    }

    return dp[n - 1];
}

export function isNumber(s: string): boolean {
    s = s.trim();
    let seenDigit = false;
    let seenDot = false;
    let seenExp = false;

    for (let i = 0; i < s.length; i++) {
        const c = s[i];

        if (c >= "0" && c <= "9") {
            seenDigit = true;
        } else if (c === ".") {
            if (seenDot || seenExp) return false;
            seenDot = true;
        } else if (c === "e" || c === "E") {
            if (seenExp || !seenDigit) return false;
            seenExp = true;
            seenDigit = false; // need digits after exponent
        } else if (c === "+" || c === "-") {
            if (i > 0 && !(s[i - 1] === "e" || s[i - 1] === "E")) return false;
        } else {
            return false;
        }
    }

    return seenDigit;
}

export function plusOne(digits: number[]): number[] {
    let n = digits.length;

    for (let i = n - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }

    return [1, ...digits];
}

export function addBinary(a: string, b: string): string {
    let i = a.length - 1;
    let j = b.length - 1;
    let ans = [];
    let ansIndex = ans.length - 1;
    let sum = 0;
    let carry = 0;

    while (i >= 0 || j >= 0 || carry > 0) {
        sum = carry;

        if (i >= 0) {
            sum += Number(a[i]);
            i--;
        }

        if (j >= 0) {
            sum += Number(b[j]);
            j--;
        }

        carry = Math.floor(sum / 2);
        ans.push(sum % 2);
    }

    return ans.reverse().join("");
}

export function fullJustify(words: string[], maxWidth: number): string[] {
    const res: string[] = [];
    let line: string[] = [];
    let lineLength = 0;

    for (const word of words) {
        if (lineLength + line.length + word.length > maxWidth) {
            let spaces = maxWidth - lineLength;
            for (let i = 0; i < spaces; i++) {
                line[i % (line.length - 1 || 1)] += " ";
            }
            res.push(line.join(""));
            line = [];
            lineLength = 0;
        }
        line.push(word);
        lineLength += word.length;
    }

    const lastLine = line.join(" ");
    res.push(lastLine + " ".repeat(maxWidth - lastLine.length));

    return res;
}

export function mySqrt(x: number): number {
    let low = 0;
    let high = x; // search range is [0, x]

    while (low <= high) {
        const middle = Math.floor((low + high) / 2); // midpoint
        const cal = middle * middle; // square of midpoint

        if (cal > x) {
            high = middle - 1; // too large → shrink right bound
        } else if (cal < x) {
            low = middle + 1; // too small → move left bound up
        } else {
            return middle; // exact square root
        }
    }

    return high; // when loop ends, high is floor(sqrt(x))
}
