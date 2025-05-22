import { describe, it, expect } from "vitest";
import { LoanUsecase } from "./usecase";
import { ProblemDetails } from "../../common/problemDetails";

describe("LoanUsecase", () => {
  const usecase = new LoanUsecase();

  it("should calculate repayment correctly", () => {
    const result = usecase.calculateRepaymentAmount({
      amount: "10000.00",
      termMonths: 12,
      annualInterestRate: 12,
      customer: {
        customerId: "customer-123",
        customerName: "John Doe",
      },
    });

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("monthlyPayments");
    expect(result.monthlyPayments).equal("888.49");
    expect(result.termMonths).toBe(12);
    expect(result.annualInterestRate).toBe(12);
    expect(result.customer.customerId).toBe("customer-123");
  });

  it("should throw on zero term months", () => {
    expect(() =>
      usecase.calculateRepaymentAmount({
        amount: "10000.00",
        termMonths: 0,
        annualInterestRate: 10,
        customer: { customerId: "c123" },
      }),
    ).toThrowError(ProblemDetails.invalidInputError("termMonths can not be 0"));
  });

  it("should throw on zero interest rate", () => {
    expect(() =>
      usecase.calculateRepaymentAmount({
        amount: "10000.00",
        termMonths: 12,
        annualInterestRate: 0,
        customer: { customerId: "c123" },
      }),
    ).toThrowError(
      ProblemDetails.invalidInputError("invalid intererst rate, can not be 0"),
    );
  });
});
