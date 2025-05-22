import { z } from "zod";

export const LoanApplySchema = z.object({
  body: z.object({
    termMonths: z.number(),
    amount: z.string(),
    customerName: z.string(),
  }),
});

export const GetLoanByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
