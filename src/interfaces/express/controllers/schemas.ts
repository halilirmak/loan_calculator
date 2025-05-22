import { z } from "zod";

export const LoanApplySchema = z.object({
  body: z.object({
    termMonths: z.number(),
    amount: z.string(),
    customerId: z.string(),
  }),
});
