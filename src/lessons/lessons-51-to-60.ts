export function solveNQueens(n: number): string[][] {
    const board: string[] = Array(n).fill(".".repeat(n));
    const result: string[][] = [];

    function isSafe(proposedRow: number, proposedCol: number): boolean {
        for (let row = 0; row < proposedRow; row++) {
            if (board[row][proposedCol] === "Q") return false;
        }

        for (let row = proposedRow - 1, col = proposedCol - 1; row >= 0 && col >= 0; row--, col--) {
            if (board[row][col] === "Q") return false;
        }

        for (let row = proposedRow - 1, col = proposedCol + 1; row >= 0 && col < n; row--, col++) {
            if (board[row][col] === "Q") return false;
        }

        return true;
    }

    function backtrack(row: number): void {
        if (row === n) {
            result.push([...board]);
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row] = board[row].substring(0, col) + "Q" + board[row].substring(col + 1);
                backtrack(row + 1);
                board[row] = board[row].substring(0, col) + "." + board[row].substring(col + 1);
            }
        }
    }

    backtrack(0);

    return result;
}

export function totalNQueens(n: number): number {

    // Placed at row=0, col=0
    // Q . . .
    // * * . .
    // * . * .
    // * . . *

    const backtrack = (row: number, diagonals: Set<number>, antiDiagonals: Set<number>, cols: Set<number>) => {
        if (row === n) {
            return 1;
        }

        let results = 0;
        for (let col = 0; col < n; col++) {
            let currDiagonal = row - col; // [↘] Example: (0,0), (1,1), (2,2) all lie on the same diagonal → all have row - col = 0.
            let currAntiDiagonal = row + col; // [↙] Example: (0,2), (1,1), (2,0) all lie on the same diagonal → all have row + col = 2.

            if (cols.has(col) || diagonals.has(currDiagonal) || antiDiagonals.has(currAntiDiagonal)) {
                continue;
            }

            cols.add(col);
            diagonals.add(currDiagonal);
            antiDiagonals.add(currAntiDiagonal);

            results += backtrack(row + 1, diagonals, antiDiagonals, cols);

            cols.delete(col);
            diagonals.delete(currDiagonal);
            antiDiagonals.delete(currAntiDiagonal);
        }

        return results;
    };

    return backtrack(0, new Set(), new Set(), new Set());
}
