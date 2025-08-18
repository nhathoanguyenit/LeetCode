import { ListNode } from "../models/node-list.model";

export function containerWithMostWater(height: number[]): number {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const area = width * minHeight;
        maxWater = Math.max(maxWater, area);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

export function intToRoman(num: number): string {
    const values = [
        1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
    ];
    const symbols = [
        "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"
    ];

    let result = "";

    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            num -= values[i];
            result += symbols[i];
        }
    }

    return result;
}

export function romanToInt(s: string): number {
    const map: Record<string, number> = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };

    let total = 0;

    for (let i = 0; i < s.length; i++) {
        const current = map[s[i]];
        const next = map[s[i + 1]];

        if (next && current < next) {
            total -= current;
        } else {
            total += current;
        }
    }

    return total;
}

export function longestCommonPrefix(strs: string[]): string {

    if (strs.length === 0) return "";

    let prefix = strs[0];

    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (prefix === "") return "";
        }
    }

    return prefix;
}

export function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b); 
    const res: number[][] = [];

    // sorted [-1,   -1,    -1,    0,    2,    2]
    //          i    left                      right
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; 
        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                res.push([nums[i], nums[left], nums[right]]);

                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return res;
}

export function threeSumClosest(nums: number[], target: number): number {
    if (!nums || nums.length === 0) return 0;

    nums.sort((a, b) => a - b);

    let minDiff = Number.POSITIVE_INFINITY;
    let result = 0;
    
    // sorted [-1,   -1,    -1,    0,    2,    2]
    //          i    left                      right
    for (let index = 0; index < nums.length - 2; index++) {
        
        let startIndex = index + 1;
        let endIndex = nums.length - 1;

        while (startIndex < endIndex) {
            const currentSum = nums[index] + nums[startIndex] + nums[endIndex];

            const currentDiff = Math.abs(currentSum - target);
            if (currentDiff < minDiff) {
                minDiff = currentDiff;
                result = currentSum;
            }

            if (currentSum === target) {
                return currentSum;
            } else if (currentSum < target) {
                startIndex++;
            } else {
                endIndex--;
            }
        }
    }

    return result;
};

export function letterCombinations(digits: string): string[] {
    if(!digits.length) return [];

    const digitLetterMap: Record<string, string[]> = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    };

    const res: string[] = [];

    function backtrack(i: number, str: string){
        if(i === digits.length){
            res.push(str);
            return;
        }

        for(let j = 0; j < digitLetterMap[digits[i]].length; j++){
            backtrack(i + 1, str + digitLetterMap[digits[i]][j]);
        }
    }
    
    backtrack(0, "");

    return res;
};

export function fourSum(nums: number[], target: number): number[][] {
    const res: number[][] = [];
    const n = nums.length;

    nums.sort((a, b) => a - b);

    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; 

        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue; 
            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    res.push([nums[i], nums[j], nums[left], nums[right]]);

                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;

                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return res;
}

export function removeNthFromEnd(head: ListNode | null, n: number ): ListNode | null {

    //List: 1 → 2 → 3 → 4 → 5 ,  n = 2 (from end)
    //dummy: 1 → 2 → 3 → 4 → 5
    const dummy = new ListNode(0, head);
    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

    //fast: dummy → 1 → 2 → 3 ;
    for (let i = 0; i <= n; i++) {
        if (!fast) throw new Error("Out of index");
        fast = fast.next;
    }


    //fast: 3 → 4 → 5 -> null;
    //slow: dummy → 1 → 2 → 3

    while (fast) {
        fast = fast.next;
        slow = slow!.next;
    }

    //repalce slow.next (4 → 5)
    slow!.next = slow!.next!.next;

    //result 1 → 2 → 3 → 5
    return dummy.next;
}

export function isValueParentheses(s: string): boolean {
    const stack: string[] = [];
    const map: Record<string, string> = {
        ")": "(",
        "}": "{",
        "]": "[",
    };

    for (const char of s) {
        if (char === "(" || char === "{" || char === "[") {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}