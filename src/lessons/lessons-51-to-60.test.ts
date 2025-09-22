import { solveNQueens, totalNQueens } from "./lessons-51-to-60";

describe("solveNQueens", () => {
    test("n = 1", () => {
        expect(solveNQueens(1)).toEqual([["Q"]]);
    });

    test("n = 2", () => {
        expect(solveNQueens(2)).toEqual([]);
    });

    test("n = 3", () => {
        expect(solveNQueens(3)).toEqual([]);
    });

    test("n = 4", () => {
        const solutions = solveNQueens(4);
        expect(solutions.length).toBe(2);

        const expected = [
            [".Q..", "...Q", "Q...", "..Q."],
            ["..Q.", "Q...", "...Q", ".Q.."],
        ];

        expect(new Set(solutions.map((sol) => JSON.stringify(sol)))).toEqual(
            new Set(expected.map((sol) => JSON.stringify(sol)))
        );
    });

    test("n = 5 should have 10 solutions", () => {
        const solutions = solveNQueens(5);
        expect(solutions.length).toBe(10);
    });

    test("n = 6 should have 4 solutions", () => {
        const solutions = solveNQueens(6);
        expect(solutions.length).toBe(4);
    });
});

describe("totalNQueens (backtracking with isSafe)", () => {
    test("small n", () => {
        expect(totalNQueens(1)).toBe(1);
        expect(totalNQueens(2)).toBe(0);
        expect(totalNQueens(3)).toBe(0);
    });

    test("n = 4", () => {
        expect(totalNQueens(4)).toBe(2);
    });

    test("n = 5", () => {
        expect(totalNQueens(5)).toBe(10);
    });

    test("n = 6", () => {
        expect(totalNQueens(6)).toBe(4);
    });

    test("n = 7", () => {
        expect(totalNQueens(7)).toBe(40);
    });

    test("n = 8", () => {
        expect(totalNQueens(8)).toBe(92);
    });

    test("n = 9", () => {
        expect(totalNQueens(9)).toBe(352);
    });
});
