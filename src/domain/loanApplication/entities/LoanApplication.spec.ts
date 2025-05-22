import { describe, it, expect } from "vitest";
import { LoanApplication } from "./LoanApplication";
import { Money } from "../valueObjects/Money";
import { AnnualInterestRate } from "../valueObjects/AnnualInterestRate";
import { ProblemDetails } from "../../../common/problemDetails";

describe("LoanApplication", () => {
  const baseProps = {
    id: "loan-123",
    amount: new Money("1000.00"),
    termMonths: 12,
    annualInterestRate: new AnnualInterestRate(12.0),
    customer: {
      customerId: "cust-001",
      customerName: "Alice",
    },
  };

  it("should calculate monthly repayment correctly", () => {
    const application = new LoanApplication(baseProps);

    const repayment = application.calculateRepayment();
    const repaymentAmount = parseFloat(repayment.toString());

    expect(repaymentAmount).toEqual(88.85);
  });

  it("should throw if termMonths is zero or negative", () => {
    expect(() => {
      new LoanApplication({
        ...baseProps,
        termMonths: 0,
      });
    }).toThrowError(
      ProblemDetails.invalidInputError("termMonths can not be 0"),
    );
  });

  it("should serialize to JSON properly", () => {
    const application = new LoanApplication(baseProps);
    const result = application.toJSON();

    expect(result).toEqual({
      id: "loan-123",
      amount: "1000.00",
      termMonths: 12,
      annualInterestRate: 12,
      monthlyPayments: undefined,
      customer: {
        customerId: "cust-001",
        customerName: "Alice",
      },
    });
  });
});
