import { ProblemDetails } from "../../../common/problemDetails";
import { AnnualInterestRate } from "../valueObjects/AnnualInterestRate";
import { Money } from "../valueObjects/Money";

interface LoanApplicationProps {
  id: string;
  amount: Money;
  termMonths: number;
  annualInterestRate: AnnualInterestRate;
  monthlyPayments?: string;
  customer: {
    customerId: string;
    customerName?: string;
  };
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
      amount: this.params.amount.toString(),
      termMonths: this.params.termMonths,
      annualInterestRate: this.params.annualInterestRate.rate(),
      monthlyPayments: this.params.monthlyPayments,
      customer: {
        customerId: this.params.customer.customerId,
        customerName: this.params.customer.customerName,
      },
    };
  }
}
