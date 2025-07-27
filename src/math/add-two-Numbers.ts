

var addTwoNumbers = function (l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const output = new ListNode(0);

    const calculate = function (
        node: ListNode | null,
        n1: ListNode | null | undefined,
        n2: ListNode | null | undefined,
        carry: number
    ) {
        if (!n1 && !n2 && carry === 0) {
            return;
        }

        const val1 = n1?.val ?? 0;
        const val2 = n2?.val ?? 0;
        const sum = val1 + val2 + carry;

        if (node) {
            node.val = sum % 10;

            const nextCarry = Math.floor(sum / 10);
            const next1 = n1?.next ?? null;
            const next2 = n2?.next ?? null;

            if (next1 || next2 || nextCarry > 0) {
                node.next = new ListNode(0);
                calculate(node.next, next1, next2, nextCarry);
            }
        }
    };

    calculate(output, l1, l2, 0);
    return output;
};

export default addTwoNumbers;