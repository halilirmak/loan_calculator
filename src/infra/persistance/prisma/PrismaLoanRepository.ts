import { PrismaClient } from "@prisma/client";
import { LoanApplicationParams } from "../../../domain/loanApplication/repository";
import { LoanApplication } from "../../../domain/loanApplication/entities/LoanApplication";
import { AnnualInterestRate } from "../../../domain/loanApplication/valueObjects/AnnualInterestRate";
import { Money } from "../../../domain/loanApplication/valueObjects/Money";

export class PrismaLoanRepository {
  constructor(private db: PrismaClient) {}

  async create(application: LoanApplicationParams): Promise<{ id: string }> {
    const loan = await this.db.loanApplication.create({
      data: {
        ...application,
      },
    });

    return { id: loan.id };
  }

  async getLoanApplicationById(id: string): Promise<LoanApplication | null> {
    const record = await this.db.loanApplication.findUnique({
      where: { id },
      include: {
        customer: true,
      },
    });

    if (!record) return null;

    return new LoanApplication({
      id: record.id,
      customer: {
        customerId: record.customer.id,
        customerName: record.customer.name,
      },
      amount: new Money(record.amount),
      termMonths: record.termMonths,
      annualInterestRate: new AnnualInterestRate(record.annualInterestRate),
      monthlyPayments: record.monthlyPayments,
    });
  }
}
