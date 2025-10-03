export function simplifyPath(path: string): string {
    const parts = path.split("/");
    const stack: string[] = [];

    for (const part of parts) {
        if (part === "" || part === ".") {
            continue; // skip empty or current directory
        } else if (part === "..") {
            if (stack.length > 0) {
                stack.pop(); // go up one directory
            }
        } else {
            stack.push(part); // valid directory name
        }
    }

    return "/" + stack.join("/");
}

export function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    // Fill table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // chars match
            } else {
                dp[i][j] =
                    1 +
                    Math.min(
                        dp[i - 1][j], // delete
                        dp[i][j - 1], // insert
                        dp[i - 1][j - 1] // replace
                    );
            }
        }
    }

    return dp[m][n];
}

export function setZeroes(matrix: number[][]): void {
    const rowCount = matrix.length;
    const colCount = matrix[0].length;

    const zeroRows: boolean[] = Array(rowCount).fill(false);
    const zeroCols: boolean[] = Array(colCount).fill(false);

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (matrix[row][col] === 0) {
                zeroRows[row] = true;
                zeroCols[col] = true;
            }
        }
    }

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (zeroRows[row] || zeroCols[col]) {
                matrix[row][col] = 0;
            }
        }
    }
}

export function searchMatrix(matrix: number[][], target: number): boolean {
    if (!matrix.length || !matrix[0].length) return false;

    const m = matrix.length;
    const n = matrix[0].length;

    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        const midVal = matrix[row][col];

        if (midVal === target) {
            return true;
        } else if (midVal < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

export function sortColors(nums: number[]): void {
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
        }
    }
}

export function minWindow(s: string, t: string): string {
    const countT: Record<string, number> = {};
    const window: Record<string, number> = {};

    // Count characters in t
    for (const c of t) {
        if (!countT[c]) countT[c] = 0;
        countT[c] += 1;
    }

    let have = 0;
    const need = Object.keys(countT).length;

    let L = 0;
    let start = -1;
    let end = -1;
    let resultLength = Infinity;

    for (let R = 0; R < s.length; R++) {
        const c = s[R];
        if (!window[c]) window[c] = 0;
        window[c] += 1;

        // if the frequency matches, we "have" one requirement
        if (countT[c] && window[c] === countT[c]) {
            have += 1;
        }

        // Try to shrink window while valid
        while (have === need) {
            if (R - L + 1 < resultLength) {
                start = L;
                end = R;
                resultLength = R - L + 1;
            }

            const leftChar = s[L];
            window[leftChar] -= 1;

            if (countT[leftChar] && window[leftChar] < countT[leftChar]) {
                have -= 1;
            }
            L++;
        }
    }

    return resultLength === Infinity ? "" : s.substring(start, end + 1);
}
