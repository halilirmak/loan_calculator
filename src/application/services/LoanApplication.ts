import { ILoanUsecase } from "../../domain/loanApplication/usecase";
import { IIterestRateAPI } from "../../infra/apis/InterestRate";
import { LoanApplyCommand, LoanApplyResponse } from "../commands/loan";

export interface ILoanApplicationService {
  apply(command: LoanApplyCommand): Promise<LoanApplyResponse>;
}

export class LoanApplicationService implements ILoanApplicationService {
  constructor(
    private usecase: ILoanUsecase,
    private interestRateApi: IIterestRateAPI,
  ) {}

  async apply(command: LoanApplyCommand): Promise<LoanApplyResponse> {
    const rate = this.interestRateApi.getLatestInterestRate(command.termMonths);

    const loan = this.usecase.calculateRepaymentAmount({
      annualInterestRate: rate,
      ...command,
    });

    return {
      loanId: loan.id,
    };
  }
}
