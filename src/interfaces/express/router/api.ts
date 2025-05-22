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

  return router;
};
