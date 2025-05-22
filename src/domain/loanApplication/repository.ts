import { LoanApplication } from "./entities/LoanApplication";

export type LoanApplicationParams = {
  id: string;
  amount: string;
  termMonths: number;
  annualInterestRate: number;
  customerId: string;
  monthlyPayments: string;
};

export interface ILoanApplicationRepository {
  create(params: LoanApplicationParams): Promise<{ id: string }>;
  getLoanApplicationById(id: string): Promise<LoanApplication | null>;
}

export interface ICustomerRepository {
  create(name: string): Promise<{ id: string }>;
}
