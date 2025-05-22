import { Request, Response } from "express";
import { ILoanApplicationService } from "~/application/services/LoanApplication";
import { LoanApplySchema } from "./schemas";

export class LoanController {
  constructor(private loanService: ILoanApplicationService) {}

  public applySchema = LoanApplySchema;

  async apply(req: Request, res: Response): Promise<void> {
    const loanApplication = await this.loanService.apply({
      customerId: req.body.customerId,
      amount: req.body.amount,
      termMonths: req.body.termMonths,
    });

    res.json(loanApplication).status(201);
    return;
  }
}
