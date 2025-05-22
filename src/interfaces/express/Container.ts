import {
  asClass,
  createContainer,
  asFunction,
  InjectionMode,
  AwilixContainer,
  asValue,
} from "awilix";
import { Server } from "./Server";
import { Router } from "./router";
import { ApiRouter } from "./router/api";
import { LoanController } from "./controllers/LoanController";
import { LoanApplicationService } from "../../application/services/LoanApplication";
import { LoanUsecase } from "../../domain/loanApplication/usecase";
import { InterestRateAPI } from "../../infra/apis/InterestRate";
import { Logger } from "../../infra/logger/";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import { createPrismaClient } from "../../infra/persistance/prisma/client";
import { PrismaCustomerRepository } from "../../infra/persistance/prisma/PrismaCustomerRepository";
import { PrismaLoanRepository } from "../../infra/persistance/prisma/PrismaLoanRepository";
import { config } from "../../config";

export class Container {
  private readonly container: AwilixContainer;

  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC,
    });

    this.register();
  }

  public register(): void {
    this.container
      .register({
        //core components
        logger: asClass(Logger).singleton(),
        config: asValue(config),
        server: asClass(Server).singleton(),
        router: asFunction(Router).singleton(),
        db: asFunction(createPrismaClient).singleton(),
      })
      .register({
        errorMiddleware: asClass(ErrorMiddleware).singleton(),
        apiRouter: asFunction(ApiRouter).singleton(),
      })
      .register({
        usecase: asClass(LoanUsecase).singleton(),
        loanController: asClass(LoanController).singleton(),
        interestRateApi: asClass(InterestRateAPI).singleton(),
        loanService: asClass(LoanApplicationService).singleton(),
        loanRepository: asClass(PrismaLoanRepository).singleton(),
        customerRepository: asClass(PrismaCustomerRepository).singleton(),
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}
