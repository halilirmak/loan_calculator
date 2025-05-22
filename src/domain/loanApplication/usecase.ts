import { Money } from "./valueObjects/Money";
import { AnnualInterestRate } from "./valueObjects/AnnualInterestRate";
import { LoanApplication } from "./entities/LoanApplication";
import { v4 as uuid } from "uuid";

type calculateRepaymentProps = {
  amount: string;
  termMonths: number;
  annualInterestRate: number;
  customer: {
    customerId: string;
    customerName?: string;
  };
};

type calculateRepaymentResult = calculateRepaymentProps & {
  id: string;
  monthlyPayments: string;
};

export interface ILoanUsecase {
  calculateRepaymentAmount(
    params: calculateRepaymentProps,
  ): calculateRepaymentResult;
}

export class LoanUsecase implements ILoanUsecase {
  calculateRepaymentAmount(
    params: calculateRepaymentProps,
  ): calculateRepaymentResult {
    const applicationId = uuid();

    const loan = new LoanApplication({
      id: applicationId,
      amount: new Money(params.amount),
      termMonths: params.termMonths,
      annualInterestRate: new AnnualInterestRate(params.annualInterestRate),
      customer: {
        customerId: params.customer.customerId,
      },
    });

    const monthlyPayments = loan.calculateRepayment();

    return {
      ...loan.toJSON(),
      monthlyPayments,
    };
  }
}
