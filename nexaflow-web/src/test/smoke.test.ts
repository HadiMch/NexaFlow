import { describe, expect, it } from "vitest";

describe("NexaFlow testing infrastructure", () => {
  it("performs basic calculations correctly", () => {
    expect(2 + 3).toBe(5);
  });

  it("handles array filtering correctly", () => {
    const values = [1, 2, 3, 4, 5];
    const evenNumbers = values.filter((value) => value % 2 === 0);

    expect(evenNumbers).toEqual([2, 4]);
  });

  it("supports asynchronous operations", async () => {
    const result = await Promise.resolve({
      success: true,
    });

    expect(result.success).toBe(true);
  });
});
