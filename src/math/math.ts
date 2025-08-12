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

export function addTwoNumbers(
    list1: ListNode | null,
    list2: ListNode | null
): ListNode | null {
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

export function findMedianSortedArrays(
    sortedArrayA: number[],
    sortedArrayB: number[]
): number {
    // Always work on the smaller array for efficiency
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

        const maxLeftA = partitionA === 0 ? -Infinity : sortedArrayA[partitionA - 1];
        const minRightA = partitionA === lengthA ? Infinity : sortedArrayA[partitionA];

        const maxLeftB = partitionB === 0 ? -Infinity : sortedArrayB[partitionB - 1];
        const minRightB = partitionB === lengthB ? Infinity : sortedArrayB[partitionB];

        if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
            const totalLength = lengthA + lengthB;
            if (totalLength % 2 === 0) {
                return (
                    (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2
                );
            } else {
                return Math.max(maxLeftA, maxLeftB);
            }
        }

        // Adjust partition in array A
        if (maxLeftA > minRightB) {
            rightIndexA = partitionA - 1;
        } else {
            leftIndexA = partitionA + 1;
        }
    }

    throw new Error("Input arrays must be sorted.");
}
