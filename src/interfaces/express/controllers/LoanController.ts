import { Request, Response } from "express";
import { ILoanApplicationService } from "~/application/services/LoanApplication";
import { LoanApplySchema } from "./schemas";

export class LoanController {
  constructor(private loanService: ILoanApplicationService) {}

  public applySchema = LoanApplySchema;

  async apply(req: Request, res: Response): Promise<void> {
    console.log(req.body.customerName, req.body);
    const loanApplication = await this.loanService.apply({
      customerName: req.body.customerName,
      amount: req.body.amount,
      termMonths: req.body.termMonths,
    });

    res.json(loanApplication).status(201);
    return;
  }
}
