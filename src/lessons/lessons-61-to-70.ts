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
    dp[0] = obstacleGrid[0][0] === 0 ? 1 : 0; // start cell
  
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (obstacleGrid[i][j] === 1) {
          dp[j] = 0; // obstacle → no path
        } else if (j > 0) {
          dp[j] += dp[j - 1]; // paths from left + paths from above
        }
      }
    }
  
    return dp[n - 1];
  }