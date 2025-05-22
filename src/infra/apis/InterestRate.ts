import { ProblemDetails } from "../../common/problemDetails";

export interface IIterestRateAPI {
  getLatestInterestRate(term: number): number;
}

export class InterestRateAPI {
  // This is to simulate getting interest rates from a 3rd party api, just for simplicty returning number
  getLatestInterestRate(term: number): number {
    const fakeRates: Record<number, number> = {
      12: 3.5,
      24: 4.2,
      36: 5.0,
      48: 5.5,
      60: 6.0,
    };

    const rate = fakeRates[term];

    if (!rate)
      throw ProblemDetails.invalidInputError(
        `no interest rate available for term: ${term} months`,
      );

    return rate;
  }
}
