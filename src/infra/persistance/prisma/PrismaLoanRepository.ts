import { PrismaClient } from "@prisma/client";
import { LoanApplicationParams } from "../../../domain/loanApplication/repository";

export class PrismaLoanRepository {
  constructor(private db: PrismaClient) {}

  async create(application: LoanApplicationParams): Promise<{ id: string }> {
    console.log(application, "-----------------");
    const loan = await this.db.loanApplication.create({
      data: {
        ...application,
      },
    });

    return { id: loan.id };
  }
}
