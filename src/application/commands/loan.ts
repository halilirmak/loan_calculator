export interface LoanApplyCommand {
  customerId: string;
  amount: string;
  termMonths: number;
}

export interface LoanApplyResponse {
  loanId: string;
}
