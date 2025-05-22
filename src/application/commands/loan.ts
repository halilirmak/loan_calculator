export interface LoanApplyCommand {
  amount: string;
  termMonths: number;
  customerName: string;
}

export interface LoanApplyResponse {
  loanId: string;
}

export interface GetLoanByIdResponse {
  id: string;
  amount: string;
  termMonths: number;
  annualInterestRate: number;
  monthlyPayments?: string;
  customer: {
    customerId: string;
    customerName?: string;
  };
}
