export interface LoanApplyCommand {
  amount: string;
  termMonths: number;
  customerName: string;
}

export interface LoanApplyResponse {
  loanId: string;
}
