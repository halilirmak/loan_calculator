import { ProblemDetails } from "../../../common/problemDetails";
import { AnnualInterestRate } from "../valueObjects/AnnualInterestRate";
import { Money } from "../valueObjects/Money";

interface LoanApplicationProps {
  id: string;
  customerId: string;
  amount: Money;
  termMonths: number;
  annualInterestRate: AnnualInterestRate;
}

export class LoanApplication {
  constructor(private params: LoanApplicationProps) {
    if (params.termMonths <= 0)
      throw ProblemDetails.invalidInputError("termMonths can not be 0");
  }

  calculateRepayment() {
    const { amount, termMonths, annualInterestRate } = this.params;
    const interestRate = annualInterestRate.monthlyRate();

    const numerator =
      amount.toCent() * interestRate * Math.pow(1 + interestRate, termMonths);

    const denominator = Math.pow(1 + interestRate, termMonths) - 1;

    const monthlyPayment = numerator / denominator;

    return Money.from(monthlyPayment);
  }

  toJSON() {
    return {
      id: this.params.id,
      customerId: this.params.customerId,
      amount: this.params.amount.toString(),
      termMonths: this.params.termMonths,
      annualInterestRate: this.params.annualInterestRate.rate(),
    };
  }
}
