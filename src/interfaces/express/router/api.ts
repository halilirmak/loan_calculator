import { Router } from "express";
import { LoanController } from "../controllers/LoanController";
import { requestValidator } from "../middleware/RequestValidationMiddleware";

export const ApiRouter = (loanController: LoanController) => {
  const router = Router();
  router.post(
    "/loan-application",
    requestValidator(loanController.applySchema),
    loanController.apply.bind(loanController),
  );

  router.get(
    "/loan-application/:id",
    requestValidator(loanController.getLoanByIdSchema),
    loanController.getById.bind(loanController),
  );

  return router;
};
