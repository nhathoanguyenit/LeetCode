declare class ListNode {

    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null);

    static buildList(arr: number[]): ListNode | null {
        let dummy = new ListNode(0);
        let current = dummy;
        for (const num of arr) {
            current.next = new ListNode(num);
            current = current.next;
        }
        return dummy.next;
    }

    static listToArray(node: ListNode | null): number[] {
        const result: number[] = [];
        while (node) {
            result.push(node.val);
            node = node.next;
        }
        return result;
    }
}
