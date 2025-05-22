import { Money } from "./valueObjects/Money";
import { AnnualInterestRate } from "./valueObjects/AnnualInterestRate";
import { LoanApplication } from "./entities/LoanApplication";
import { v4 as uuid } from "uuid";

type calculateRepaymentProps = {
  customerId: string;
  amount: string;
  termMonths: number;
  annualInterestRate: number;
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
      customerId: params.customerId,
      amount: new Money(params.amount),
      termMonths: params.termMonths,
      annualInterestRate: new AnnualInterestRate(params.annualInterestRate),
    });

    const monthlyPayments = loan.calculateRepayment();

    return {
      ...loan.toJSON(),
      monthlyPayments,
    };
  }
}
