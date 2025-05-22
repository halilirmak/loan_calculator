import { ProblemDetails } from "../../../common/problemDetails";

export class AnnualInterestRate {
  constructor(private interestRate: number) {
    if (interestRate <= 0) {
      throw ProblemDetails.invalidInputError(
        "invalid intererst rate, can not be 0",
      );
    }
  }
  monthlyRate() {
    return this.interestRate / 12 / 100;
  }

  rate() {
    return this.interestRate;
  }
}
