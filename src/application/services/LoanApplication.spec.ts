import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoanApplicationService } from "./LoanApplication";
import { ProblemDetails } from "../../common/problemDetails";
import { ILoanUsecase } from "../../domain/loanApplication/usecase";
import { IIterestRateAPI } from "../../infra/apis/InterestRate";
import {
  ILoanApplicationRepository,
  ICustomerRepository,
} from "../../domain/loanApplication/repository";
import { LoanApplyCommand } from "../commands/loan";
import { LoanApplication } from "../../domain/loanApplication/entities/LoanApplication";
import { Money } from "../../domain/loanApplication/valueObjects/Money";
import { AnnualInterestRate } from "../../domain/loanApplication/valueObjects/AnnualInterestRate";

const mockLoanApplication = new LoanApplication({
  id: "loan-1",
  amount: new Money("10000.00"),
  termMonths: 12,
  annualInterestRate: new AnnualInterestRate(12),
  monthlyPayments: "888.99",
  customer: {
    customerId: "customer-123",
    customerName: "Jane Doe",
  },
});

vi.mock("../../domain/loanApplication/entities/LoanApplication", () => {
  return {
    LoanApplication: vi.fn().mockImplementation(() => ({
      calculateRepayment: vi.fn(() => "888.99"),
      toJSON: vi.fn(() => ({
        id: "loan-1",
        amount: "10000.00",
        termMonths: 12,
        annualInterestRate: 12,
        monthlyPayments: "888.99",
        customer: {
          customerId: "customer-123",
          customerName: "Jane Doe",
        },
      })),
    })),
  };
});

describe("LoanApplicationService", () => {
  let service: LoanApplicationService;
  let usecase: ILoanUsecase;
  let interestRateApi: IIterestRateAPI;
  let loanRepository: ILoanApplicationRepository;
  let customerRepository: ICustomerRepository;

  beforeEach(() => {
    usecase = {
      calculateRepaymentAmount: vi.fn().mockReturnValue({
        id: "loan-1",
        amount: "10000.00",
        termMonths: 12,
        annualInterestRate: 12,
        monthlyPayments: "888.99",
        customer: {
          customerId: "customer-123",
        },
      }),
    };

    interestRateApi = {
      getLatestInterestRate: vi.fn().mockReturnValue(12),
    };

    loanRepository = {
      create: vi.fn().mockResolvedValue({ id: "loan-1" }),
      getLoanApplicationById: vi.fn().mockResolvedValue(mockLoanApplication),
    };

    customerRepository = {
      create: vi.fn().mockResolvedValue({
        id: "customer-123",
        name: "Jane Doe",
      }),
    };

    service = new LoanApplicationService(
      usecase,
      interestRateApi,
      loanRepository,
      customerRepository,
    );
  });

  it("should apply for a loan", async () => {
    const command: LoanApplyCommand = {
      customerName: "Jane Doe",
      amount: "10000.00",
      termMonths: 12,
    };

    const result = await service.apply(command);

    expect(interestRateApi.getLatestInterestRate).toHaveBeenCalledWith(12);
    expect(customerRepository.create).toHaveBeenCalledWith("Jane Doe");
    expect(usecase.calculateRepaymentAmount).toHaveBeenCalled();
    expect(loanRepository.create).toHaveBeenCalled();
    expect(result).toEqual({ loanId: "loan-1" });
  });

  it("should return loan by ID", async () => {
    const result = await service.getLoanApplicationById("loan-1");

    expect(loanRepository.getLoanApplicationById).toHaveBeenCalledWith(
      "loan-1",
    );
    expect(result).toHaveProperty("id", "loan-1");
    expect(result).toHaveProperty("monthlyPayments", "888.99");
  });

  it("should throw notFoundError if loan ID not found", async () => {
    vi.spyOn(loanRepository, "getLoanApplicationById").mockResolvedValue(null);

    await expect(service.getLoanApplicationById("invalid-id")).rejects.toEqual(
      ProblemDetails.notFoundError(
        "no loan application found with id: invalid-id",
      ),
    );
  });
});
