import { firstMissingPositive, trappingRainWater } from "./lessons-41-to-50";

describe("firstMissingPositive", () => {
    it("example 1", () => {
        expect(firstMissingPositive([1, 2, 0])).toBe(3);
    });

    it("example 2", () => {
        expect(firstMissingPositive([3, 4, -1, 1])).toBe(2);
    });

    it("example 3", () => {
        expect(firstMissingPositive([7, 8, 9, 11, 12])).toBe(1);
    });

    it("all numbers from 1..n present", () => {
        expect(firstMissingPositive([1, 2, 3])).toBe(4);
    });

    it("unsorted with duplicates", () => {
        expect(firstMissingPositive([2, 2, 1])).toBe(3);
    });

    it("single element case", () => {
        expect(firstMissingPositive([1])).toBe(2);
        expect(firstMissingPositive([2])).toBe(1);
    });
});

describe("trap rain water", () => {
    it("example 1", () => {
        expect(trappingRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    });

    it("example 2", () => {
        expect(trappingRainWater([4, 2, 0, 3, 2, 5])).toBe(9);
    });

    it("no water when strictly increasing", () => {
        expect(trappingRainWater([1, 2, 3, 4, 5])).toBe(0);
    });

    it("no water when strictly decreasing", () => {
        expect(trappingRainWater([5, 4, 3, 2, 1])).toBe(0);
    });

    it("flat terrain", () => {
        expect(trappingRainWater([2, 2, 2, 2])).toBe(0);
    });
});
