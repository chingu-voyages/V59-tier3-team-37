import { describe, expect, it } from "vitest";
import { returnString } from "./utils";

describe("returnString", () => {
  it("should return the same string that was passed as an argument", () => {
    const input = "Hello, World!";
    const result = returnString(input);
    expect(result).toBe(input);
  });

  it("should handle empty strings", () => {
    const input = "";
    const result = returnString(input);
    expect(result).toBe(input);
  });

  it("should handle strings with special characters", () => {
    const input = "Special chars: !@#$%^&*()";
    const result = returnString(input);
    expect(result).toBe(input);
  });
});
