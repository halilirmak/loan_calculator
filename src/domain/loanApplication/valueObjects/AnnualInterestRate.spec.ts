import { describe, it, expect } from "vitest";
import { AnnualInterestRate } from "./AnnualInterestRate";
import { ProblemDetails } from "../../../common/problemDetails";

describe("AnnualInterestRate", () => {
  it("should construct with a valid interest rate", () => {
    const rate = new AnnualInterestRate(12);
    expect(rate.rate()).toBe(12);
  });

  it("should throw if interest rate is 0", () => {
    expect(() => new AnnualInterestRate(0)).toThrowError(
      ProblemDetails.invalidInputError("invalid intererst rate, can not be 0"),
    );
  });

  it("should throw if interest rate is negative", () => {
    expect(() => new AnnualInterestRate(-5)).toThrowError();
  });

  it("should return correct monthly rate", () => {
    const rate = new AnnualInterestRate(12);
    expect(rate.monthlyRate()).toEqual(0.01);
  });
});
