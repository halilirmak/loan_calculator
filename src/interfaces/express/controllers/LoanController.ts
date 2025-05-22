import { Request, Response } from "express";
import { ILoanApplicationService } from "~/application/services/LoanApplication";
import { LoanApplySchema, GetLoanByIdSchema } from "./schemas";

export class LoanController {
  constructor(private loanService: ILoanApplicationService) {}

  public applySchema = LoanApplySchema;

  async apply(req: Request, res: Response): Promise<void> {
    const loanApplication = await this.loanService.apply({
      customerName: req.body.customerName,
      amount: req.body.amount,
      termMonths: req.body.termMonths,
    });

    res.json(loanApplication).status(201);
  }

  public getLoanByIdSchema = GetLoanByIdSchema;
  async getById(req: Request, res: Response): Promise<void> {
    const loanApplication = await this.loanService.getLoanApplicationById(
      req.params.id,
    );

    res.json(loanApplication).status(201);
  }
}
