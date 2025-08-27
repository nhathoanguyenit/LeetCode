import { ListNode } from "../models/node-list.model";

// list1 = [1, 2, 4] list2 = [1, 3, 4]
export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const dummy = new ListNode();
    let current = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    if (list1 !== null) current.next = list1;
    if (list2 !== null) current.next = list2;

    return dummy.next;
}

export function generateParenthesis(n: number): string[] {
    const result: string[] = [];

    function backtrack(current: string, open: number, close: number) {
        if (open === close && open === n) {
            result.push(current);
            return;
        }

        if (open < n) {
            backtrack(current + "(", open + 1, close);
        }

        if (close < open) {
            backtrack(current + ")", open, close + 1);
        }
    }
    backtrack("", 0, 0);
    return result;
}

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const rec = (lists: Array<ListNode | null>, start: number, end: number): ListNode | null => {
        const len = end - start + 1;

        if (len < 2) return lists[start] || null;

        if (len > 2) {
            const mid = Math.floor((end + start) / 2);

            return merge(rec(lists, start, mid), rec(lists, mid + 1, end));
        }

        return merge(lists[start], lists[end]);
    };

    const merge = (l1: ListNode | null, l2: ListNode | null) => {
        const dummy = new ListNode();
        let curr = dummy;

        while (l1 && l2) {
            if (l1.val < l2.val) {
                curr.next = l1;
                l1 = l1.next;
                curr = curr.next;
                continue;
            }

            curr.next = l2;
            l2 = l2.next;
            curr = curr.next;
        }

        curr.next = l1 || l2 || null;

        return dummy.next;
    };

    return rec(lists, 0, lists.length - 1);
}

export function swapPairs(head: ListNode | null): ListNode | null {
    if (!head?.next) {
        return head;
    }

    const dummy = new ListNode();

    let current: ListNode | null = dummy;

    while (head?.next) {
        const thirdNode: ListNode | null = head?.next?.next ?? null;
        const secondNode: ListNode | null = new ListNode(head.val, thirdNode);
        const firstNode: ListNode | null = new ListNode(head?.next?.val, secondNode);
        current.next = firstNode;
        current = secondNode;
        head = head?.next?.next || null;
    }

    return dummy.next;
}

export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let count = 0;
    let current = head;
    while (count < k && current) {
        current = current.next;
        count++;
    }
    
    if (count < k) return head;
    
    let prev: ListNode | null = null;
    let curr = head;
    for (let i = 0; i < k; i++) {
        const next = curr!.next;
        curr!.next = prev;
        prev = curr;
        curr = next;
    }
    
    if (head) {
        head.next = reverseKGroup(curr, k);
    }
    
    return prev;

};

export function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0;

    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}

export function removeElement(nums: number[], val: number): number {
    let i = 0; 
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] !== val) {
            nums[i] = nums[j];
            i++;
        }
    }
    return i;
}

export function strStr(haystack: string, needle: string): number {
    const n = haystack.length;
    const m = needle.length;

    if (m === 0) return 0;

    for (let i = 0; i <= n - m; i++) {
        if (haystack.substring(i, i + m) === needle) {
            return i;
        }
    }
    return -1;
}

export function divide(dividend: number, divisor: number): number {
    let absDividend = Math.abs(dividend);
    const absDivisor = Math.abs(divisor);
    const isPos = dividend >= 0 === divisor >= 0;
  
    let quotient = 0;
    for (let i = 31; i >= 0; i--) {
      quotient <<= 1;
      if (absDividend >>> i >= absDivisor) {
        absDividend -= absDivisor << i;
        quotient += 1;
      }
    }
    if (quotient < 0) {
      return isPos ? 2 ** 31 - 1 : -(2 ** 31);
    }
    return isPos ? quotient : -quotient;
}

export function findSubstring(s: string, words: string[]): number[] {
    const wordLength = words[0].length;
    const numberOfWords = words.length;
    const wordCount: Map<string, number> = new Map();
    const result: number[] = [];

    for (const word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }

    for (let i = 0; i < wordLength; i++) {
        const seenWords: Map<string, number> = new Map();
        let left = i;
        let right = i;
        let count = 0;

        while (right + wordLength <= s.length) {
            const word = s.substring(right, right + wordLength);
            right += wordLength;

            if (wordCount.has(word)) {
                seenWords.set(word, (seenWords.get(word) || 0) + 1);
                count++;
                while (seenWords.get(word)! > wordCount.get(word)!) {
                    const leftWord = s.substring(left, left + wordLength);
                    seenWords.set(leftWord, seenWords.get(leftWord)! - 1);
                    count--;
                    left += wordLength;
                }

                if (count === numberOfWords) {
                    result.push(left);
                }
            } else {
                seenWords.clear();
                count = 0;
                left = right;
            }
        }
    }

    return result;
}

export function nextPermutation(nums: number[]): void {

    const n = nums.length;
    let i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    if (i >= 0) {
        let j = n - 1;
        // 2. Find element just larger than nums[i]
        while (nums[j] <= nums[i]) {
            j--;
        }
        // 3. Swap nums[i] and nums[j]
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // 4. Reverse suffix (i+1 to end)
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
}
