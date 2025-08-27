import { ListNode } from "../models/node-list.model";

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
