export class ListNode {

    val: number ;
    next: ListNode | null = null;

    constructor(val: number = 0, next: ListNode | null = null){
        this.val = val;
        this.next = next;
    }

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
