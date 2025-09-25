export function solveNQueens(n: number): string[][] {
    const board: string[] = Array(n).fill(".".repeat(n));
    const result: string[][] = [];

    function isSafe(proposedRow: number, proposedCol: number): boolean {
        for (let row = 0; row < proposedRow; row++) {
            if (board[row][proposedCol] === "Q") return false;
        }

        for (let row = proposedRow - 1, col = proposedCol - 1; row >= 0 && col >= 0; row--, col--) {
            if (board[row][col] === "Q") return false;
        }

        for (let row = proposedRow - 1, col = proposedCol + 1; row >= 0 && col < n; row--, col++) {
            if (board[row][col] === "Q") return false;
        }

        return true;
    }

    function backtrack(row: number): void {
        if (row === n) {
            result.push([...board]);
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row] = board[row].substring(0, col) + "Q" + board[row].substring(col + 1);
                backtrack(row + 1);
                board[row] = board[row].substring(0, col) + "." + board[row].substring(col + 1);
            }
        }
    }

    backtrack(0);

    return result;
}

export function totalNQueens(n: number): number {
    // Placed at row=0, col=0
    // Q . . .
    // * * . .
    // * . * .
    // * . . *

    const backtrack = (row: number, diagonals: Set<number>, antiDiagonals: Set<number>, cols: Set<number>) => {
        if (row === n) {
            return 1;
        }

        let results = 0;
        for (let col = 0; col < n; col++) {
            let currDiagonal = row - col; // [↘] Example: (0,0), (1,1), (2,2) all lie on the same diagonal → all have row - col = 0.
            let currAntiDiagonal = row + col; // [↙] Example: (0,2), (1,1), (2,0) all lie on the same diagonal → all have row + col = 2.

            if (cols.has(col) || diagonals.has(currDiagonal) || antiDiagonals.has(currAntiDiagonal)) {
                continue;
            }

            cols.add(col);
            diagonals.add(currDiagonal);
            antiDiagonals.add(currAntiDiagonal);

            results += backtrack(row + 1, diagonals, antiDiagonals, cols);

            cols.delete(col);
            diagonals.delete(currDiagonal);
            antiDiagonals.delete(currAntiDiagonal);
        }

        return results;
    };

    return backtrack(0, new Set(), new Set(), new Set());
}

export function maxSubArray(nums: number[]): number {
    let currSum = nums[0];
    let maxSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currSum = Math.max(nums[i], currSum + nums[i]);
        maxSum = Math.max(maxSum, currSum);
    }

    return maxSum;
}

export function spiralOrder(matrix: number[][]): number[] {
    let res: number[] = [];
    if (matrix.length === 0) return res;

    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i]);
        }
        top++;

        for (let i = top; i <= bottom; i++) {
            res.push(matrix[i][right]);
        }
        right--;

        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                res.push(matrix[bottom][i]);
            }
            bottom--;
        }

        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                res.push(matrix[i][left]);
            }
            left++;
        }
    }

    return res;
}

export function canJump(nums: number[]): boolean {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) return false; // can't reach this position
        maxReach = Math.max(maxReach, i + nums[i]);
    }

    return true;
}

export function merge(intervals: number[][]): number[][] {
    if (intervals.length <= 1) return intervals;

    intervals.sort((a, b) => a[0] - b[0]);

    const res: number[][] = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const current = intervals[i];
        const lastMerged = res[res.length - 1];

        if (current[0] <= lastMerged[1]) {
            lastMerged[1] = Math.max(lastMerged[1], current[1]);
        } else {
            res.push(current);
        }
    }

    return res;
}

export function insert(intervals: number[][], newInterval: number[]): number[][] {
    const res: number[][] = [];
    let i = 0;
    const n = intervals.length;

    // 1. Add all intervals before newInterval
    while (i < n && intervals[i][1] < newInterval[0]) {
        res.push(intervals[i]);
        i++;
    }

    // 2. Merge overlapping intervals
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.push(newInterval);

    // 3. Add remaining intervals
    while (i < n) {
        res.push(intervals[i]);
        i++;
    }

    return res;
}

export function lengthOfLastWord(s: string): number {
    let i = s.length - 1;

    while (i >= 0 && s[i] === " ") {
        i--;
    }

    let length = 0;
    while (i >= 0 && s[i] !== " ") {
        length++;
        i--;
    }

    return length;
}

export function generateMatrix(n: number): number[][] {
    const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

    let top = 0,
        bottom = n - 1;
    let left = 0,
        right = n - 1;
    let num = 1;

    while (top <= bottom && left <= right) {
        // left → right
        for (let j = left; j <= right; j++) {
            matrix[top][j] = num++;
        }
        top++;

        // top → bottom
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;

        if (top <= bottom) {
            // right → left
            for (let j = right; j >= left; j--) {
                matrix[bottom][j] = num++;
            }
            bottom--;
        }

        if (left <= right) {
            // bottom → top
            for (let i = bottom; i >= top; i--) {
                matrix[i][left] = num++;
            }
            left++;
        }
    }

    return matrix;
}
