export function firstMissingPositive(nums: number[]): number {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const correctIdx = nums[i] - 1;
            [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
        }
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }

    return n + 1;
}

export function trappingRainWater(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }

    return water;
}

export function multiply(num1: string, num2: string): string {
    return (BigInt(num1) * BigInt(num2)).toString();
}

// export function isMatch(s: string, p: string): boolean {
//     const m = s.length;
//     const n = p.length;

//     const dp: boolean[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));

//     dp[0][0] = true;
//     for (let j = 1; j <= n; j++) {
//         if (p[j - 1] === "*") {
//             dp[0][j] = dp[0][j - 1];
//         }
//     }

//     for (let i = 1; i <= m; i++) {
//         for (let j = 1; j <= n; j++) {
//             if (p[j - 1] === "?" || p[j - 1] === s[i - 1]) {
//                 dp[i][j] = dp[i - 1][j - 1];
//             } else if (p[j - 1] === "*") {
//                 dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
//             }
//         }
//     }

//     //             0   1   2   3   4   5
//     //                 a   d   c   e   b
//     // 0           T   F   F   F   T   F
//     // 1   "*"     T   T   T   T   T   T
//     // 2   "a"     F   T   F   F   F   F
//     // 3   "*"     F   T   T   T   T   T
//     // 4   "b"     F   F   F   F   F   T

//     return dp[m][n];
// }

export function isMatch(s: string, p: string): boolean {
    let i = 0,
        j = 0,
        startIndex = -1,
        match = 0;

    while (i < s.length) {
        if (j < p.length && (p[j] === "?" || p[j] === s[i])) {
            i++;
            j++;
        } else if (j < p.length && p[j] === "*") {
            startIndex = j;
            match = i;
            j++;
        } else if (startIndex !== -1) {
            j = startIndex + 1;
            match++;
            i = match;
        } else {
            return false;
        }
    }

    while (j < p.length && p[j] === "*") {
        j++;
    }

    return j === p.length;
}

export function jump(nums: number[]): number {
    let steps = 0;
    let end = 0;
    let farthest = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);

        if (i === end) {
            steps++;
            end = farthest;
        }
    }

    return steps;
}

export function permute(nums: number[]): number[][] {
    const res: number[][] = [];
    const used: boolean[] = new Array(nums.length).fill(false);

    function backtrack(path: number[]) {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(nums[i]);
            backtrack(path);
            path.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return res;
}

export function permuteUnique(nums: number[]): number[][] {
    const result: number[][] = [];
    nums.sort((a, b) => a - b); // sort so duplicates are adjacent
    const used: boolean[] = new Array(nums.length).fill(false);

    function backtrack(path: number[]) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;

            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

            used[i] = true;
            path.push(nums[i]);
            backtrack(path);
            path.pop();
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
}

export function rotate(matrix: number[][]): void {
    const n = matrix.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

export function groupAnagrams(strs: string[]): string[][] {
    const map: Map<string, string[]> = new Map();

    for (const word of strs) {
        // sort word letters
        const key = word.split("").sort().join("");
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(word);
    }

    return Array.from(map.values());
}

export function myPow(x: number, n: number): number {
    function fastPow(base: number, exp: number): number {
        if (exp === 0) return 1;
        const half = fastPow(base, Math.floor(exp / 2));
        if (exp % 2 === 0) {
            return half * half;
        } else {
            return half * half * base;
        }
    }

    if (n < 0) {
        return 1 / fastPow(x, -n);
    }
    return fastPow(x, n);
}

describe("myPow", () => {
    test("positive exponent", () => {
        expect(myPow(2.0, 10)).toBeCloseTo(1024.0, 5);
        expect(myPow(2.1, 3)).toBeCloseTo(9.261, 5);
        expect(myPow(3, 5)).toBeCloseTo(243.0, 5);
    });

    test("negative exponent", () => {
        expect(myPow(2.0, -2)).toBeCloseTo(0.25, 5);
        expect(myPow(5.0, -1)).toBeCloseTo(0.2, 5);
    });

    test("zero exponent", () => {
        expect(myPow(2.0, 0)).toBe(1);
        expect(myPow(0.0, 0)).toBe(1);
    });

    test("fractional base", () => {
        expect(myPow(0.5, 2)).toBeCloseTo(0.25, 5);
        expect(myPow(0.5, -2)).toBeCloseTo(4.0, 5);
    });

    test("large exponent", () => {
        const result = myPow(1.0001, 10000);
        expect(result).toBeCloseTo(Math.exp(1), 1);
    });
});
