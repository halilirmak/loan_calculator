import { ILoanUsecase } from "../../domain/loanApplication/usecase";
import { IIterestRateAPI } from "../../infra/apis/InterestRate";
import { LoanApplyCommand, LoanApplyResponse } from "../commands/loan";
import {
  ILoanApplicationRepository,
  ICustomerRepository,
} from "../../domain/loanApplication/repository";

export interface ILoanApplicationService {
  apply(command: LoanApplyCommand): Promise<LoanApplyResponse>;
}

export class LoanApplicationService implements ILoanApplicationService {
  constructor(
    private usecase: ILoanUsecase,
    private interestRateApi: IIterestRateAPI,
    private loanRepository: ILoanApplicationRepository,
    private customerRepository: ICustomerRepository,
  ) {}

  async apply(command: LoanApplyCommand): Promise<LoanApplyResponse> {
    const rate = this.interestRateApi.getLatestInterestRate(command.termMonths);

    const user = await this.customerRepository.create(command.customerName);

    const loan = this.usecase.calculateRepaymentAmount({
      annualInterestRate: rate,
      customerId: user.id,
      ...command,
    });

    const application = await this.loanRepository.create({
      id: loan.id,
      amount: command.amount,
      termMonths: command.termMonths,
      annualInterestRate: rate,
      customerId: user.id,
      monthlyPayments: loan.monthlyPayments,
    });

    return {
      loanId: application.id,
    };
  }
}
